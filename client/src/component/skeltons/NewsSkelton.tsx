export default function NewsSkeleton() {
    return (
      <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased animate-pulse">
        {/* Top Border Navbar Placeholder */}
        <div className="w-full h-14 border-b border-zinc-900 bg-zinc-950/40 flex items-center px-6 justify-between">
          <div className="h-4 bg-zinc-900 rounded w-24" />
          <div className="w-8 h-8 rounded-full bg-zinc-900" />
        </div>
  
        {/* Main Container */}
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
          
          {/* Section Header Block Placeholder */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div className="flex flex-col gap-2 w-full max-w-md">
              <div className="h-6 bg-zinc-900 rounded w-1/3" />
              <div className="h-3.5 bg-zinc-900/60 rounded w-2/3" />
            </div>
            {/* Action / Search Placeholder */}
            <div className="h-9 bg-zinc-950 border border-zinc-900 rounded-md w-48" />
          </div>
  
          {/* News Feed Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-zinc-900 bg-zinc-950 rounded-lg p-5 flex flex-col gap-4 overflow-hidden"
              >
                {/* Image Skeleton Box (Reflects item.image_url / w-80 h-50 aspect) */}
                <div className="w-full h-48 bg-zinc-900/80 rounded-md border border-zinc-900/40 shrink-0" />
  
                {/* Title & Metadata Skeleton */}
                <div className="flex flex-col gap-2.5 pt-1">
                  {/* Category / Date Tag */}
                  <div className="h-2.5 bg-zinc-900 rounded w-1/4 mb-1" />
                  
                  {/* Headline / Title Lines (Reflects item.title) */}
                  <div className="h-4 bg-zinc-900 rounded w-11/12" />
                  <div className="h-4 bg-zinc-900 rounded w-3/4" />
                </div>
  
                {/* Card Footer Placeholder */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-zinc-900/60">
                  <div className="h-3 bg-zinc-900/60 rounded w-20" />
                  <div className="w-4 h-4 bg-zinc-900 rounded-full" />
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </div>
    );
  }