import { useState } from 'react';
import {type MonthData } from '../types/calendar';
import { MetricCards } from '../component/calendar/MetricCards';
import { TradeInspector } from '../component/calendar/TradeInspector';
import Navbar from '../component/ui/NavBar';
import { useSidebar } from '../hooks/useSidebar';

const INITIAL_MOCK_DATA: MonthData = {
  "2026-06-02": { tradeCount: 2, netPnL: 245, status: 'profitable' },
  "2026-06-03": { tradeCount: 1, netPnL: -90, status: 'unprofitable' },
  "2026-06-05": { tradeCount: 3, netPnL: 380, status: 'profitable' },
  "2026-06-06": { tradeCount: 1, netPnL: 120, status: 'profitable' },
  "2026-06-09": { tradeCount: 2, netPnL: 620, status: 'profitable' },
  "2026-06-10": { tradeCount: 1, netPnL: 0, status: 'breakeven' },
  "2026-06-11": { tradeCount: 2, netPnL: -180, status: 'unprofitable' },
  "2026-06-12": { tradeCount: 1, netPnL: 178, status: 'profitable' },
  "2026-06-13": { tradeCount: 2, netPnL: 290, status: 'profitable' },
  "2026-06-16": { tradeCount: 1, netPnL: -92, status: 'unprofitable' },
  "2026-06-17": { tradeCount: 3, netPnL: 410, status: 'profitable' },
  "2026-06-19": { tradeCount: 2, netPnL: 155, status: 'profitable' },
  "2026-06-20": { 
    tradeCount: 2, 
    netPnL: -88, 
    status: 'unprofitable',
    winRate: 50,
    totalPips: -8.8,
    trades: [
      { id: 't1', pair: 'EUR/USD', type: 'Buy', pips: 12, pnl: 120 },
      { id: 't2', pair: 'GBP/JPY', type: 'Sell', pips: -20.8, pnl: -208 }
    ]
  }
};

export default function Calendar() {
    const { toggleSidebar } = useSidebar()
  const [tradeData] = useState<MonthData>(INITIAL_MOCK_DATA);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); 
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-06-20');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const blankCells = Array(firstDayIndex).fill(null);
  const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
  const totalGridCells = [...blankCells, ...monthDays];

  const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex min-h-screen w-full bg-black text-white font-sans overflow-hidden select-none">
      <div className="flex-1 flex flex-col min-w-0">
        
        <Navbar toggleSidebar={toggleSidebar}>Trade Calendar</Navbar>
        {/* <div className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 flex-shrink-0">
          <span className="text-lg font-semibold tracking-wide">Trading Journal Matrix</span>
          <div className="flex gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500/40 block" /> Profit</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/40 block" /> Loss</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded bg-yellow-500/30 border border-yellow-500/40 block" /> Breakeven</div>
          </div>
        </div> */}

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
            
            {/* MONTH SWITCH NAV CONTROLS */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold tracking-tight text-zinc-100">{monthsList[month]} {year}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="w-9 h-9 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-300 flex items-center justify-center text-lg hover:border-zinc-700 hover:text-white transition-all">‹</button>
                <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="w-9 h-9 border border-zinc-800 rounded-lg bg-zinc-950 text-zinc-300 flex items-center justify-center text-lg hover:border-zinc-700 hover:text-white transition-all">›</button>
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

                  let itemStyle = "bg-zinc-950/40 border-zinc-900 hover:bg-zinc-900/30 shadow-sm border";
                  if (summary?.status === 'profitable') itemStyle = "bg-emerald-500/[0.04] border-emerald-500/20 hover:bg-emerald-500/[0.08] shadow-sm border";
                  if (summary?.status === 'unprofitable') itemStyle = "bg-rose-500/[0.04] border-rose-500/20 hover:bg-rose-500/[0.08] shadow-sm border";
                  if (summary?.status === 'breakeven') itemStyle = "bg-yellow-500/[0.03] border-yellow-500/20 hover:bg-yellow-500/[0.07] shadow-sm border";
                  if (isSelected) itemStyle += " ring-2 ring-zinc-400 border-transparent shadow-md";

                  return (
                    <div key={targetStr} onClick={() => setSelectedDateStr(targetStr)} className={`rounded-xl p-3 flex flex-col justify-between transition-all cursor-pointer min-h-[90px] ${itemStyle}`}>
                      <div className="flex justify-between items-center w-full">
                        <span className={`text-sm ${summary ? (summary.status === 'profitable' ? 'text-emerald-300 font-semibold' : summary.status === 'unprofitable' ? 'text-rose-300 font-semibold' : 'text-yellow-300 font-semibold') : 'text-zinc-400'}`}>{day}</span>
                        {day === 22 && month === 5 && year === 2026 && <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 block" />}
                      </div>

                      {summary && (
                        <div className="flex flex-col items-end w-full mt-3 gap-0.5">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${summary.status === 'profitable' ? 'text-emerald-400/90 bg-emerald-950/40 border-emerald-500/20' : summary.status === 'unprofitable' ? 'text-rose-400/90 bg-rose-950/40 border-rose-500/20' : 'text-yellow-400/90 bg-yellow-950/40 border-yellow-500/20'}`}>
                            {summary.tradeCount} {summary.tradeCount === 1 ? 'trade' : 'trades'}
                          </span>
                          <span className={`text-xs tracking-tight font-bold ${summary.status === 'profitable' ? 'text-emerald-400' : summary.status === 'unprofitable' ? 'text-rose-400' : 'text-yellow-400'}`}>
                            {summary.netPnL >= 0 ? `+$${summary.netPnL}` : `-$${Math.abs(summary.netPnL)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* INSPECTOR PANEL SIDEBAR VIEW */}
          <TradeInspector selectedDateStr={selectedDateStr} activeDayData={tradeData[selectedDateStr]} />

        </div>
      </div>
    </div>
  );
};