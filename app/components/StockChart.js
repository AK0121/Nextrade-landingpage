"use client";

import { ResponsiveLine } from "@nivo/line";
import { generateStockData } from "@/utils/stockdata";
import { useState, useMemo, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}


const StockChart = () => {
  
  const width = useWindowWidth();
  const data = useMemo(() => {
    const days = width < 480 ? 7 : width < 768 ? 10 : 14;
    return generateStockData(days);
  }, [width]);

  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  
  // Calculate price change and percentage
  const priceData = data[0].data;
  const currentPrice = priceData[priceData.length - 1].y;
  const previousPrice = priceData[priceData.length - 2].y;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);
  const isPositive = priceChange >= 0;
  
  // Calculate additional metrics
  const prices = priceData.map(d => d.y);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const volume = Math.floor(Math.random() * 1000000 + 500000);
  
  const timeframes = ["1D", "1W", "1M", "3M", "1Y"];
  
  // Professional color scheme
  const chartColors = isPositive ? ["#00c896"] : ["#ff6b6b"];
  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.70) 0px 12px 70px 8px"}} className="w-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header with price info */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white text-2xl sm:text-3xl font-bold">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className={`text-sm sm:text-base font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
                </span>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                H: ${high.toFixed(2)} • L: ${low.toFixed(2)} • Vol: {(volume/1000).toFixed(0)}K
              </div>
            </div>
          </div>
          
          {/* Timeframe selector */}
          <div className="flex bg-gray-800 rounded-lg p-1 gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                  selectedTimeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chart container */}
      <div className="h-[350px] sm:h-[450px] p-4 sm:p-6 relative">
        {/* Price level indicators */}
        <div className="absolute right-0 top-6 bottom-6 w-16 pointer-events-none z-10">
          <div className="relative h-full">
            <div 
              className="absolute right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg"
              style={{ top: '10%' }}
            >
              ${high.toFixed(2)}
            </div>
            <div 
              className="absolute right-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg"
              style={{ bottom: '10%' }}
            >
              ${low.toFixed(2)}
            </div>
          </div>
        </div>
        
        {data?.[0]?.data?.length > 0 && (
        <ResponsiveLine
          data={data}
          margin={{ top: 20, right: 70, bottom: 60, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: low * 0.995,
            max: high * 1.005,
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={{
            tickSize: 0,
            tickPadding: 8,
            tickRotation: 0,
            format: (v) => `$${v.toFixed(0)}`,
            tickValues: 5,
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
            tickRotation: 0,
            tickValues: width < 480 ? 3 : width < 768 ? 5 : 7,
            format: (v) => v.replace("Day ", ""),
          }}
          useMesh={width > 500}
          axisLeft={{
            tickSize: 0,
            tickPadding: 8,
            tickRotation: 0,
            format: (v) => `$${v.toFixed(0)}`,
            tickValues: 5,
          }}
          enableGridX={false}
          enableGridY={true}
          colors={chartColors}
          lineWidth={2}
          pointSize={0}
          pointColor="#fff"
          pointBorderWidth={0}
          pointBorderColor={{ from: "serieColor" }}
          enableArea={true}
          areaBaselineValue={low * 0.995}
          areaOpacity={0.1}
          crosshairType="cross"
          enableSlices="x"
          sliceTooltip={({ slice }) => (
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
              <div className="text-white text-sm font-medium mb-1">
                {slice.points[0].data.x}
              </div>
              <div className="text-green-400 text-lg font-bold">
                ${slice.points[0].data.y.toFixed(2)}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                Vol: {Math.floor(Math.random() * 100 + 50)}K
              </div>
            </div>
          )}
          theme={{
            background: "transparent",
            textColor: "#9ca3af",
            fontSize: 11,
            axis: {
              domain: { line: { stroke: "#374151", strokeWidth: 1 } },
              ticks: { 
                line: { stroke: "transparent" },
                text: { fill: "#6b7280", fontSize: 11 }
              },
              legend: { text: { fill: "#9ca3af", fontSize: 12 } },
            },
            grid: {
              line: { 
                stroke: "#374151", 
                strokeWidth: 1,
                strokeDasharray: "2 4"
              },
            },
            crosshair: {
              line: {
                stroke: "#60a5fa",
                strokeWidth: 1,
                strokeDasharray: "4 4"
              }
            }
          }}
          animate={true}
          motionConfig="gentle"
        />
      )}
      </div>
      
      {/* Footer with additional info */}
      <div className="px-4 sm:px-6 py-3 bg-gray-800 border-t border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Market Cap: $2.1B</span>
            <span>P/E: 24.5</span>
            <span className="hidden sm:inline">52W Range: $45.20 - $89.40</span>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;