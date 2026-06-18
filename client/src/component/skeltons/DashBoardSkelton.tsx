export default function DashboardSkeleton() {
    return (
      <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased animate-pulse">
        {/* ── NAVBAR SKELETON ── */}
        <div className="h-16 border-b border-zinc-900 bg-zinc-950/50 w-full" />
  
        {/* ── MAIN LAYOUT CONTAINER ── */}
        <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
          
          {/* ── TOP: 4 METRIC BOXES ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3 shadow-sm">
                <div className="h-3 w-24 bg-zinc-800 rounded font-mono" />
                <div className="h-7 w-12 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
  
          {/* ── MIDDLE: ANALYSIS PANEL SKELETON ── */}
          <div className="w-full p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3">
            <div className="h-3 w-32 bg-zinc-800 rounded" />
            <div className="min-h-[50px] flex items-center">
              <div className="h-4 w-2/3 bg-zinc-900 rounded" />
            </div>
          </div>
  
          {/* ── BOTTOM: LINE-BY-LINE TRADES LEDGER ── */}
          <div className="w-full flex-1 flex flex-col">
            <div className="h-3 w-36 bg-zinc-800 rounded mb-5" />
  
            <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg overflow-hidden shadow-md">
              {/* Table Header Structure */}
              <div className="grid grid-cols-7 p-4 border-b border-zinc-900 bg-zinc-950">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 w-16 bg-zinc-900 rounded" />
                ))}
                <div className="h-3 w-12 bg-zinc-900 rounded justify-self-end" />
              </div>
  
              {/* Simulated Trade Rows (5 Mock Items) */}
              <div className="divide-y divide-zinc-900">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="grid grid-cols-7 p-4 items-center gap-4">
                    {/* 1. Asset & Risk */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-20 bg-zinc-900 rounded" />
                      <div className="h-3 w-12 bg-zinc-900/60 rounded" />
                    </div>
  
                    {/* 2. Action & Size */}
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-12 bg-zinc-900 rounded" />
                      <div className="h-3 w-14 bg-zinc-900/60 rounded" />
                    </div>
  
                    {/* 3. Entry & Exit Price */}
                    <div className="flex flex-col gap-2">
                      <div className="h-3.5 w-16 bg-zinc-900 rounded" />
                      <div className="h-3 w-14 bg-zinc-900/60 rounded" />
                    </div>
  
                    {/* 4. SL / TP */}
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-16 bg-zinc-900/70 rounded" />
                      <div className="h-3 w-16 bg-zinc-900/70 rounded" />
                    </div>
  
                    {/* 5. PnL & Pips */}
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-14 bg-zinc-900 rounded" />
                      <div className="h-3 w-12 bg-zinc-900/60 rounded" />
                    </div>
  
                    {/* 6. Status & Notes */}
                    <div className="flex flex-col gap-2">
                      <div className="h-3.5 w-12 bg-zinc-900 rounded" />
                      <div className="h-3 w-16 bg-zinc-900/60 rounded" />
                    </div>
  
                    {/* 7. Actions Controller Block */}
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-7 h-7 rounded bg-zinc-900" />
                      <div className="w-7 h-7 rounded bg-zinc-900" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* ── FIXED FAB SKELETON ── */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="h-12 w-32 bg-zinc-800 rounded-full shadow-2xl" />
        </div>
      </div>
    );
  }