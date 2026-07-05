export default function HistorySkeleton() {
    const placeholderRows = Array.from({ length: 5 });
  
    return (
      <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased relative select-none">
        <div className="h-16 border-b border-zinc-900 flex items-center px-8 shrink-0 bg-black">
          <div className="h-4 w-24 bg-zinc-900 rounded animate-pulse" />
        </div>
  
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
          
          <div className="flex flex-col gap-2 border-b border-zinc-900 pb-5">
            <div className="h-6 w-64 bg-zinc-900 rounded-sm animate-pulse mb-1" />
            <div className="h-3 w-96 bg-zinc-900 rounded-sm animate-pulse" />
          </div>
  
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="h-9 w-full sm:w-80 bg-zinc-950 border border-zinc-900 rounded-md animate-pulse" />
            <div className="h-9 w-full sm:w-48 bg-zinc-950 border border-zinc-900 rounded-md animate-pulse" />
          </div>
  
          <div className="w-full flex-1 flex flex-col">
            <div className="h-3 w-36 bg-zinc-900 rounded-sm animate-pulse mb-5" />
  
            <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden shadow-md">
              
              <div className="grid grid-cols-7 p-4 border-b border-zinc-900 text-xs font-mono text-zinc-600 uppercase tracking-wider font-semibold bg-zinc-950">
                <div>Asset / Risk</div>
                <div>Action / Size</div>
                <div>Entry / Exit</div>
                <div>Targets (SL/TP)</div>
                <div>P&L / Pips</div>
                <div>Status / Notes</div>
                <div className="text-right">Actions</div>
              </div>
  
              <div className="divide-y divide-zinc-900">
                {placeholderRows.map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid grid-cols-7 p-4 items-center bg-black/20"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-16 bg-zinc-900 rounded animate-pulse" />
                      <div className="h-3 w-10 bg-zinc-950 rounded animate-pulse" />
                    </div>
  
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-12 bg-zinc-900 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-zinc-950 rounded animate-pulse" />
                    </div>
  
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-20 bg-zinc-900 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-zinc-950 rounded animate-pulse" />
                    </div>
  
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-20 bg-zinc-900 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-zinc-950 rounded animate-pulse" />
                    </div>
  
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-14 bg-zinc-900 rounded animate-pulse" />
                      <div className="h-3 w-8 bg-zinc-950 rounded animate-pulse" />
                    </div>
  
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-16 bg-zinc-900 rounded-sm animate-pulse" />
                    </div>
  
                    <div className="flex justify-end">
                      <div className="h-7 w-14 bg-zinc-900 border border-zinc-950 rounded-md animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }