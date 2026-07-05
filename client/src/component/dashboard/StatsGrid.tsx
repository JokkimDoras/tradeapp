import type { AnalyticsDataType } from "../../types/analytics.types";
import useAccount from "../../hooks/useAccount";

interface StatsGridProps {
  totalExecutions: number;
  analyticsData?: AnalyticsDataType | null; 
  margin: number;
  currentBalance: number;
  totalwin:number | undefined;
  totalLosses:number | undefined;
  avgWin:string | undefined;
  avgLoss:string | undefined
}

export default function StatsGrid({ 
  totalExecutions, 
  analyticsData, 
  margin, 
  currentBalance,
  totalwin,
  totalLosses,
  avgWin,
  avgLoss
}: StatsGridProps) {

  const { selectedAccount } = useAccount();
  const netPnL = currentBalance - margin;
  const growthPercent = margin > 0 ? (netPnL / margin) * 100 : 0;
  const isPositive = netPnL >= 0;
  const statusColorClass = isPositive ? 'text-emerald-400' : 'text-rose-400';

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const winRate = analyticsData?.summary?.average_win ?? "--"; 
  const profitFactor = analyticsData?.summary?.profit_factor ?? "--";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3 shadow-sm justify-between">
        <div className="flex flex-col border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Total Executions
          </span>
          <span className="text-lg font-mono font-bold text-white">
            {totalExecutions}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Type
            </span>
            <span className="text-sm font-mono font-bold text-zinc-400">{selectedAccount?.account_type.toUpperCase()}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Currency
            </span>
            <span className="text-sm font-mono font-bold text-emerald-500">{selectedAccount?.currency}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3 shadow-sm justify-between">
        <div className="flex justify-between items-start border-b border-zinc-900 pb-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Active Margin
            </span>
            <span className="text-lg font-mono font-bold text-white">
              {formatCurrency(margin)}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Current Bal
            </span>
            <span className="text-lg font-mono font-bold text-white">
              {formatCurrency(currentBalance)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Net P&L
            </span>
            <span className={`text-sm font-mono font-bold ${statusColorClass}`}>
              {isPositive ? '+' : ''}{formatCurrency(netPnL)}
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Growth
            </span>
            <span className={`text-sm font-mono font-bold ${statusColorClass}`}>
              {isPositive ? '+' : ''}{growthPercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3 shadow-sm justify-between">
        <div className="flex flex-col border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Win Rate
          </span>
          <span className="text-lg font-mono font-bold text-emerald-400">
            {winRate}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Wins
            </span>
            <span className="text-sm font-mono font-bold text-emerald-500">{totalwin??'--'}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Losses
            </span>
            <span className="text-sm font-mono font-bold text-rose-500">{totalLosses??"--"}</span>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-3 shadow-sm justify-between">
        <div className="flex flex-col border-b border-zinc-900 pb-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Net Return
          </span>
          <span className="text-lg font-mono font-bold text-white">
            {profitFactor}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Avg Win
            </span>
            <span className="text-sm font-mono font-bold text-zinc-400">{avgWin??'--'}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Avg Loss
            </span>
            <span className="text-sm font-mono font-bold text-zinc-400">{avgLoss??'--'}</span>
          </div>
        </div>
      </div>

    </div>
  );
}