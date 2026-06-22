interface StatsGridProps {
    totalExecutions: number;
  }
  
  export default function StatsGrid({ totalExecutions }: StatsGridProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Total Executions</span>
          <span className="text-2xl font-mono font-bold text-white">{totalExecutions}</span>
        </div>
        <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Active Margin</span>
          <span className="text-2xl font-mono font-bold text-white">--</span>
        </div>
        <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Win Rate</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">--</span>
        </div>
        <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Net Return</span>
          <span className="text-2xl font-mono font-bold text-white">--</span>
        </div>
      </div>
    );
  }