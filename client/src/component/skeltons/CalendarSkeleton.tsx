
export default function CalendarSkeleton() {
  const skeletonGridCells = Array(35).fill(null);

  return (
    <div className="flex min-h-screen w-full bg-black text-white font-sans overflow-hidden select-none relative animate-pulse">
      <div className="flex-1 flex flex-col min-w-0">
        
        <div className="h-16 border-b border-zinc-900 bg-zinc-950/50 flex items-center px-8 justify-between w-full">
          <div className="h-5 w-32 bg-zinc-800 rounded-md" />
          <div className="h-8 w-8 bg-zinc-800 rounded-full" />
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">

            <div className="flex justify-between items-center">
              <div className="h-7 w-44 bg-zinc-800 rounded-lg" />
              <div className="flex gap-2">
                <div className="w-9 h-9 border border-zinc-900 rounded-lg bg-zinc-950/40" />
                <div className="w-9 h-9 border border-zinc-900 rounded-lg bg-zinc-950/40" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array(4).fill(null).map((_, idx) => (
                <div key={idx} className="h-24 rounded-xl border border-zinc-900 bg-zinc-950/40 p-4 flex flex-col justify-between">
                  <div className="h-4 w-20 bg-zinc-800 rounded" />
                  <div className="h-6 w-28 bg-zinc-800 rounded mt-2" />
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-2 min-h-[500px]">
              <div className="grid grid-cols-7 gap-2 text-center pb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((_, idx) => (
                  <div key={idx} className="flex justify-center">
                    <div className="h-3 w-8 bg-zinc-800/60 rounded" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-stretch">
                {skeletonGridCells.map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-3 flex flex-col justify-between border border-zinc-900 bg-zinc-950/20 min-h-[90px]"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="h-4 w-4 bg-zinc-800 rounded" />
                    </div>
                    {idx % 4 === 0 && (
                      <div className="flex flex-col items-end w-full mt-3 gap-1.5">
                        <div className="h-4 w-12 bg-zinc-800/70 rounded" />
                        <div className="h-3 w-10 bg-zinc-800/50 rounded" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80 border-l border-zinc-900 bg-zinc-950/30 h-full p-6 flex flex-col gap-6 hidden lg:flex">
            <div className="flex justify-between items-center">
              <div className="h-5 w-28 bg-zinc-800 rounded" />
              <div className="h-5 w-5 bg-zinc-800 rounded" />
            </div>
            <div className="h-px bg-zinc-900 w-full" />
            <div className="flex flex-col gap-4 flex-1">
              <div className="h-12 bg-zinc-900/50 rounded-xl w-full" />
              <div className="h-32 bg-zinc-900/30 rounded-xl w-full" />
              <div className="h-20 bg-zinc-900/30 rounded-xl w-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}