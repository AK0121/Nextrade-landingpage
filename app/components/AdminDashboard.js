"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Search,
  Download,
  RefreshCw,
  Eye,
  ExternalLink,
  X,
  MoreVertical,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import ConfirmModal from "./ConfirmModal";

export default function AdminDashboard({ userEmail }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("nextrade_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateStats = (leadsData) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const thisWeek = leadsData.filter(
      (lead) => new Date(lead.created_at) > weekAgo
    ).length;
    const thisMonth = leadsData.filter(
      (lead) => new Date(lead.created_at) > monthAgo
    ).length;

    setStats({
      total: leadsData.length,
      thisWeek,
      thisMonth,
    });
  };

  const confirmDelete = (id) => {
    setLeadToDelete(id);
    setIsModalOpen(true);
  };

  const deleteLead = async () => {
    try {
      const { error } = await supabase
        .from("nextrade_leads")
        .delete()
        .eq("id", leadToDelete);

      if (error) throw error;

      const updatedLeads = leads.filter((lead) => lead.id !== leadToDelete);
      setLeads(updatedLeads);
      calculateStats(updatedLeads);
      setIsModalOpen(false);
      setLeadToDelete(null);
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Message", "Created At"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.message,
        new Date(lead.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nextrade-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NT</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Nextrade</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={fetchLeads}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome back, {userEmail?.split('@')[0]}
          </h2>
          <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your leads today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Leads</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </motion.div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredLeads.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {lead.name}
                            </div>
                            <div className="text-sm text-gray-500 space-y-1 mt-1">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="hover:text-blue-600"
                                >
                                  {lead.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="hover:text-green-600 cursor-pointer"
                                >
                                  {lead.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs cursor-pointer">
                            {lead.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="text-blue-600 cursor-pointer hover:text-blue-900 p-1 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => confirmDelete(lead.id)}
                              className="text-red-600 cursor-pointer hover:text-red-900 p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Lead Details
                </h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 cursor-pointer hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <p className="text-sm text-gray-900">{selectedLead.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {selectedLead.email}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      {selectedLead.phone}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedLead.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {selectedLead.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selectedLead.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    confirmDelete(selectedLead.id);
                    setSelectedLead(null);
                  }}
                  className="px-4 py-2 text-sm text-white cursor-pointer bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteLead}
      />
    </div>
  );
}