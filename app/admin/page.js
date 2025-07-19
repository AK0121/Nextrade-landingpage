import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminDashboard from "@/app/components/AdminDashboard.js";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Suspense fallback={<AdminSkeleton />}>
        <AdminDashboard userEmail={session.user.email} />
      </Suspense>
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}