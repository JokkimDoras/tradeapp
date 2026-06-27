import { useState, useMemo } from 'react';
import { type MonthData } from '../types/calendar';
import { MetricCards } from '../component/calendar/MetricCards';
import { TradeInspector } from '../component/calendar/TradeInspector';
import Navbar from '../component/ui/NavBar';
import useTrade from '../hooks/useTrade';
import { useSidebar } from '../hooks/useSidebar';

export default function Calendar() {
  const { toggleSidebar } = useSidebar();
  const { trades } = useTrade();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  console.log(trades,'totest')

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const blankCells = Array(firstDayIndex).fill(null);
  const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
  const totalGridCells = [...blankCells, ...monthDays];

  const monthsList = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Build tradeData from real trades
  const tradeData = useMemo<MonthData>(() => {
    const map: MonthData = {};

    trades.forEach((trade: any) => {
      if (!trade.trade_date) return;

      const dateStr = new Date(trade.trade_date).toISOString().split('T')[0];

      if (!map[dateStr]) {
        map[dateStr] = {
          tradeCount: 0,
          netPnL: 0,
          status: 'breakeven',
          trades: []
        };
      }

      map[dateStr].tradeCount += 1;

      // only add P&L for closed trades
      if (trade.status === 'closed') {
        map[dateStr].netPnL += Number(trade.profit_loss || 0);
      }

      map[dateStr].trades?.push({
        id: trade.id,
        pair: trade.currency_pair,
        type: trade.trade_type,
        pips: trade.pips,
        pnl: trade.profit_loss
      });
    });

    // set status based on netPnL
    Object.keys(map).forEach((dateStr) => {
      const day = map[dateStr];
      const closedTrades = trades.filter((t: any) => {
        const d = new Date(t.trade_date).toISOString().split('T')[0];
        return d === dateStr && t.status === 'closed';
      });

      if (closedTrades.length === 0) {
        day.status = 'breakeven'; 
      } else if (day.netPnL > 0) {
        day.status = 'profitable';
      } else if (day.netPnL < 0) {
        day.status = 'unprofitable';
      } else {
        day.status = 'breakeven';
      }

      const wins = closedTrades.filter((t: any) => t.result === 'win').length;
      day.winRate = closedTrades.length > 0
        ? Math.round((wins / closedTrades.length) * 100)
        : 0;

      day.totalPips = closedTrades.reduce((sum: number, t: any) => sum + (t.pips || 0), 0);

      day.netPnL = Math.round(day.netPnL * 100) / 100;
    });

    return map;
  }, [trades]);

  const handleDateClick = (targetStr: string) => {
    setSelectedDateStr(targetStr);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-black text-white font-sans overflow-hidden select-none relative">
      <div className="flex-1 flex flex-col min-w-0">

        <Navbar toggleSidebar={toggleSidebar}>Trade Calendar</Navbar>

        <div className="flex flex-1 overflow-hidden relative">
          <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold tracking-tight text-zinc-100">
                {monthsList[month]} {year}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                  className="w-9 h-9 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-300 flex items-center justify-center text-lg hover:border-zinc-700 hover:text-white transition-all"
                >‹</button>
                <button
                  onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                  className="w-9 h-9 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-300 flex items-center justify-center text-lg hover:border-zinc-700 hover:text-white transition-all"
                >›</button>
              </div>
            </div>

            <MetricCards tradeData={tradeData} />

            <div className="flex-1 flex flex-col gap-2 min-h-[500px]">
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest pb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-stretch">
                {totalGridCells.map((day, idx) => {
                  if (day === null) return <div key={`empty-${idx}`} className="bg-transparent border border-transparent" />;

                  const targetStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const summary = tradeData[targetStr];
                  const isSelected = selectedDateStr === targetStr;
                  const isToday = targetStr === new Date().toISOString().split('T')[0];

                  let itemStyle = "bg-zinc-950/40 border-zinc-900 hover:bg-zinc-900/30 shadow-sm border";
                  if (summary?.status === 'profitable') itemStyle = "bg-emerald-500/[0.04] border-emerald-500/20 hover:bg-emerald-500/[0.08] shadow-sm border";
                  if (summary?.status === 'unprofitable') itemStyle = "bg-rose-500/[0.04] border-rose-500/20 hover:bg-rose-500/[0.08] shadow-sm border";
                  if (summary?.status === 'breakeven' && summary?.tradeCount > 0) itemStyle = "bg-yellow-500/[0.03] border-yellow-500/20 hover:bg-yellow-500/[0.07] shadow-sm border";
                  if (isSelected) itemStyle += " ring-2 ring-zinc-400 border-transparent shadow-md";

                  return (
                    <div
                      key={targetStr}
                      onClick={() => handleDateClick(targetStr)}
                      className={`rounded-xl p-3 flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${itemStyle}`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-sm ${
                          summary?.tradeCount > 0
                            ? summary.status === 'profitable' ? 'text-emerald-300 font-semibold'
                            : summary.status === 'unprofitable' ? 'text-rose-300 font-semibold'
                            : 'text-yellow-300 font-semibold'
                            : 'text-zinc-400'
                        }`}>
                          {day}
                        </span>
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 block" />}
                      </div>

                      {summary && summary.tradeCount > 0 && (
                        <div className="flex flex-col items-end w-full mt-3 gap-0.5">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                            summary.status === 'profitable'
                              ? 'text-emerald-400/90 bg-emerald-950/40 border-emerald-500/20'
                              : summary.status === 'unprofitable'
                              ? 'text-rose-400/90 bg-rose-950/40 border-rose-500/20'
                              : 'text-yellow-400/90 bg-yellow-950/40 border-yellow-500/20'
                          }`}>
                            {summary.tradeCount} {summary.tradeCount === 1 ? 'trade' : 'trades'}
                          </span>
                          <span className={`text-xs tracking-tight font-bold ${
                            summary.status === 'profitable' ? 'text-emerald-400'
                            : summary.status === 'unprofitable' ? 'text-rose-400'
                            : 'text-yellow-400'
                          }`}>
                            {summary.netPnL >= 0
                              ? `+$${summary.netPnL}`
                              : `-$${Math.abs(summary.netPnL)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {isOpen ? (
            <TradeInspector
              setIsOpen={setIsOpen}
              selectedDateStr={selectedDateStr}
              activeDayData={tradeData[selectedDateStr]}
            />
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-24 border border-zinc-800 rounded-l-xl bg-zinc-950 text-zinc-400 flex flex-col items-center justify-center gap-1 hover:border-zinc-700 hover:text-white shadow-xl group transition-all"
              title="Open Inspector"
            >
              <span className="text-sm group-hover:-translate-x-0.5 transition-transform">‹</span>
              <span className="text-[9px] font-bold uppercase tracking-widest [writing-mode:vertical-lr] select-none">Inspect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}