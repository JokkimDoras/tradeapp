function AccountSelectorSkeleton() {
    return (
      <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans antialiased animate-pulse">
        <div className="h-16 border-b border-zinc-900 w-full bg-[#030303]" />
  
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-36 bg-zinc-800 rounded-md" />
              <div className="h-4 w-64 bg-zinc-900 rounded-md" />
            </div>
            <div className="h-8 w-28 bg-zinc-800 rounded-md" />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="w-full h-32 bg-black border border-zinc-900 rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col gap-2 min-w-0 w-1/2">
                    <div className="h-4 bg-zinc-800 rounded w-full" />
                    <div className="h-3 bg-zinc-900 rounded w-2/3" />
                  </div>
                  <div className="h-5 w-14 bg-zinc-900 rounded" />
                </div>
  
                <div className="flex items-end justify-between w-full mt-auto">
                  <div className="flex flex-col gap-2 min-w-0 w-1/3">
                    <div className="h-3 bg-zinc-900 rounded w-full" />
                    <div className="h-5 bg-zinc-800 rounded w-5/6" />
                  </div>
                  <div className="h-6 w-6 bg-zinc-900 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
  
  export default AccountSelectorSkeleton;