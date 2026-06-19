export default function AnalyticsSkeleton() {
    return (
      <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased animate-pulse">
        {/* Top Border Navbar Placeholder */}
        <div className="w-full h-14 border-b border-zinc-900 bg-zinc-950/40" />
  
        {/* Main Container */}
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
          
          {/* Header Block Section Placeholder */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div className="flex flex-col gap-2 w-full max-w-md">
              <div className="h-5 bg-zinc-900 rounded w-1/2" />
              <div className="h-3 bg-zinc-900 rounded w-3/4" />
            </div>
            {/* Timeframe Selectors Placeholder */}
            <div className="h-8 bg-zinc-950 border border-zinc-900 rounded w-32" />
          </div>
  
          {/* Level 1 Macro Cards System Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-md border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
                <div className="h-3 bg-zinc-900 rounded w-1/3" />
                <div className="h-7 bg-zinc-900 rounded w-2/3 my-1" />
                <div className="h-3 bg-zinc-900 rounded w-1/2" />
              </div>
            ))}
          </div>
  
          {/* Level 2 Charts Matrix Block Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            {/* Equity Curve Area Chart Placeholder */}
            <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-zinc-900 rounded w-1/4" />
                <div className="h-4 bg-zinc-900 rounded w-16" />
              </div>
              <div className="w-full h-72 border border-dashed border-zinc-900/60 rounded bg-zinc-950/20 flex items-center justify-center">
                <div className="w-11/12 h-5/6 flex items-end gap-2 px-4">
                  {/* Simulated wavy area chart structure */}
                  <div className="bg-zinc-900/40 w-full h-[20%] rounded-t" />
                  <div className="bg-zinc-900/40 w-full h-[35%] rounded-t" />
                  <div className="bg-zinc-900/40 w-full h-[25%] rounded-t" />
                  <div className="bg-zinc-900/40 w-full h-[55%] rounded-t" />
                  <div className="bg-zinc-900/40 w-full h-[45%] rounded-t" />
                  <div className="bg-zinc-900/40 w-full h-[75%] rounded-t" />
                </div>
              </div>
            </div>
  
            {/* Metric Distribution Ratio Pie Piece Placeholder */}
            <div className="border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col justify-between gap-4">
              <div className="h-4 bg-zinc-900 rounded w-1/3" />
              
              {/* Simulated Donut Chart Ring */}
              <div className="w-full h-48 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-zinc-900 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-2 bg-zinc-900 rounded w-8" />
                    <div className="h-4 bg-zinc-900 rounded w-12" />
                  </div>
                </div>
              </div>
  
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-8 bg-zinc-900/40 border border-zinc-900 rounded" />
                <div className="h-8 bg-zinc-900/40 border border-zinc-900 rounded" />
              </div>
            </div>
          </div>
  
          {/* Level 3 Secondary Distribution Logs Row Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            {/* Daily Bar Chart Volatility Log Placeholder */}
            <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-6">
              <div className="h-4 bg-zinc-900 rounded w-1/3" />
              <div className="w-full h-56 flex items-end gap-3 px-2 border border-dashed border-zinc-900/60 rounded bg-zinc-950/20">
                {[...Array(12)].map((_, idx) => (
                  <div 
                    key={idx} 
                    className="bg-zinc-900/40 w-full rounded-t"
                    style={{ height: `${Math.floor(Math.random() * 60) + 15}%` }} 
                  />
                ))}
              </div>
            </div>
  
            {/* Matrix Core Statistical Attributes Breakdown Panel Placeholder */}
            <div className="border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-4">
              <div className="h-4 bg-zinc-900 rounded w-1/2 mb-2" />
              <div className="flex flex-col divide-y divide-zinc-900">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3.5">
                    <div className="h-3 bg-zinc-900 rounded w-1/3" />
                    <div className="h-3 bg-zinc-900 rounded w-14" />
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Level 4 Outlier Extremity Matrix Cards Block Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[1, 2].map((i) => (
              <div key={i} className="border border-zinc-900 bg-zinc-950 rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 w-full max-w-xs">
                  <div className="w-8 h-8 rounded bg-zinc-900 shrink-0" />
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-2.5 bg-zinc-900 rounded w-3/4" />
                    <div className="h-2 bg-zinc-900 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-4 bg-zinc-900 rounded w-16 shrink-0" />
              </div>
            ))}
          </div>
  
        </div>
      </div>
    );
  }