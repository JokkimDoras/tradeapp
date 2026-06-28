import React from 'react';
import type { MonthData } from '../../types/calendar';

interface MetricCardsProps {
  tradeData: MonthData;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ tradeData }) => {
  const stats = Object.values(tradeData);
  const tradingDaysCount = stats.filter(d => d.tradeCount > 0).length;
  const netMonthlyPnL = stats.reduce((acc, curr) => acc + curr.netPnL, 0);
  const bestDay = Math.max(...stats.map(d => d.netPnL), 0);
  const worstDay = Math.min(...stats.map(d => d.netPnL), 0);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 shadow-sm">
        <p className="text-xs text-zinc-500 font-medium tracking-wide mb-1">Trading Days</p>
        <p className="text-2xl font-bold text-zinc-100">{tradingDaysCount}</p>
      </div>
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 shadow-sm">
        <p className="text-xs text-zinc-500 font-medium tracking-wide mb-1">Best Day Performance</p>
        <p className="text-2xl font-bold text-emerald-400">+${bestDay}</p>
      </div>
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 shadow-sm">
        <p className="text-xs text-zinc-500 font-medium tracking-wide mb-1">Worst Day Performance</p>
        <p className="text-2xl font-bold text-rose-400">-${Math.abs(worstDay)}</p>
      </div>
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 shadow-sm">
        <p className="text-xs text-zinc-500 font-medium tracking-wide mb-1">Cumulative Monthly P&L</p>
        <p className={`text-2xl font-bold ${netMonthlyPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {netMonthlyPnL >= 0 ? `+$${netMonthlyPnL}` : `-$${Math.abs(netMonthlyPnL)}`}
        </p>
      </div>
    </div>
  );
};