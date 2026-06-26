import React from 'react';
import type { DaySummary } from '../../types/calendar';

interface TradeInspectorProps {
  selectedDateStr: string;
  activeDayData?: DaySummary;
}

export const TradeInspector: React.FC<TradeInspectorProps> = ({ selectedDateStr, activeDayData }) => {
  const parsedDate = new Date(selectedDateStr + 'T00:00:00');
  const humanDate = parsedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const weekday = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="w-[320px] border-l border-zinc-900 p-6 flex flex-col gap-5 overflow-y-auto flex-shrink-0 bg-black">
      <div>
        <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">{humanDate}</h3>
        <p className="text-xs text-zinc-500 mt-1 font-medium">{weekday} · {activeDayData?.tradeCount || 0} executions</p>
      </div>

      <div className="flex flex-col gap-2.5 bg-zinc-950/40 p-3.5 border border-zinc-900 rounded-xl">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-zinc-500">Net P&L</span>
          <span className={`font-bold ${activeDayData ? (activeDayData.netPnL >= 0 ? 'text-emerald-400' : 'text-rose-400') : 'text-zinc-400'}`}>
            {activeDayData ? (activeDayData.netPnL >= 0 ? `+$${activeDayData.netPnL}` : `-$${Math.abs(activeDayData.netPnL)}`) : '$0.00'}
          </span>
        </div>
        <div className="flex justify-between text-xs font-medium">
          <span className="text-zinc-500">Win Rate</span>
          <span className="text-zinc-200">{activeDayData?.winRate ? `${activeDayData.winRate}%` : '0%'}</span>
        </div>
        <div className="flex justify-between text-xs font-medium">
          <span className="text-zinc-500">Total Pips</span>
          <span className={`font-bold ${activeDayData ? ((activeDayData.totalPips || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400') : 'text-zinc-400'}`}>
            {activeDayData?.totalPips || 0} pips
          </span>
        </div>
      </div>

      <div className="h-[1px] bg-zinc-900 w-full" />
      
      <div className="flex flex-col gap-2">
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Execution History</span>
        {activeDayData?.trades?.map((trade) => (
          <div key={trade.id} className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col gap-2 shadow-sm hover:border-zinc-800 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-zinc-200">{trade.pair}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase ${trade.type === 'Buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {trade.type}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium">
              <span className="text-zinc-500">{trade.pips >= 0 ? `+${trade.pips}` : trade.pips} pips</span>
              <span className={`font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trade.pnl >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`}
              </span>
            </div>
          </div>
        )) || (
          <div className="text-xs text-zinc-600 text-center py-8 bg-zinc-950/20 border border-dashed border-zinc-900 rounded-xl">
            No execution logs for this session
          </div>
        )}
      </div>
    </div>
  );
};