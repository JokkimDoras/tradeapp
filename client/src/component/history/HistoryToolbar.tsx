import { FiSearch } from "react-icons/fi";

interface HistoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export default function HistoryToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: HistoryToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-xs group">
        <FiSearch 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" 
          size={14} 
        />
        <input 
          type="text"
          placeholder="Search Asset (e.g. EURUSD)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-900 focus:border-zinc-700 text-zinc-200 placeholder-zinc-600 font-mono text-xs rounded pl-9 pr-4 py-2.5 outline-none transition-all"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-zinc-950 p-1 border border-zinc-900 rounded w-full sm:w-auto">
        {["all", "open", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 sm:flex-none font-mono text-[11px] uppercase tracking-wider px-4 py-1.5 rounded font-medium transition-all cursor-pointer ${
              statusFilter === status 
                ? "bg-zinc-900 text-white font-bold" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}