import type { AnalyticsDataType } from "../../types/analytics.types";

interface StatsGridProps {
  totalExecutions: number;
  analyticsData?: AnalyticsDataType | null; 
}

export default function StatsGrid({ totalExecutions, analyticsData }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Total Executions
        </span>
        <span className="text-2xl font-mono font-bold text-white">
          {totalExecutions}
        </span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Active Margin
        </span>
        <span className="text-2xl font-mono font-bold text-white">--</span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Win Rate
        </span>
        <span className="text-2xl font-mono font-bold text-emerald-400">
          {analyticsData?.summary?.average_win ?? "--"}
        </span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Net Return
        </span>
        <span className="text-2xl font-mono font-bold text-white">
          {analyticsData?.summary?.profit_factor ?? "--"}
        </span>
      </div>
    </div>
  );
}