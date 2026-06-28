import { useMemo } from "react";
import  useTrade  from "../hooks/useTrade";
import { BarChart2 } from "lucide-react";
import Navbar from "../component/ui/NavBar";
import { useSidebar } from "../hooks/useSidebar";

export default function StrategiesPage() {
  const { trades } = useTrade();
  const { toggleSidebar } = useSidebar()

  const processedStrategies = useMemo(() => {
    const statsMap: Record<string, { name: string; total: number; wins: number; pnl: number }> = {};
  
    trades.forEach((trade) => {
      const stratName = trade.strategy || trade.strategyName || trade.setup;
      if (!stratName || stratName.trim() === "") return;
  
      if (!statsMap[stratName]) {
        statsMap[stratName] = {
          name: stratName,
          total: 0,
          wins: 0,
          pnl: 0,
        };
      }
  
      statsMap[stratName].total += 1;
  
      const pnlValue = trade.pnl ?? trade.netPnL ?? trade.net_pnl ?? trade.profit_loss ?? trade.amount ?? 0;
      statsMap[stratName].pnl += Number(pnlValue);
  
      const isWin = 
        trade.isWin === true || 
        trade.is_win === true ||
        trade.status === "WIN" || 
        trade.status === "Win" ||
        trade.outcome === "WIN" ||
        Number(pnlValue) > 0;
  
      if (isWin) {
        statsMap[stratName].wins += 1;
      }
    });
  
    return Object.values(statsMap).sort((a, b) => b.total - a.total);
  }, [trades]);

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#ffffff] font-sans antialiased selection:bg-[#333333]">
        <Navbar toggleSidebar={toggleSidebar}>Strategies</Navbar>
      <div className="w-full px-8 py-10">
        
        <div className="w-full flex items-center justify-between border-b border-zinc-900 pb-6 mb-8">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-[#ffffff]">Strategies</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Performance metrics aggregated dynamically from your trade logs.
            </p>
          </div>
        </div>

        {processedStrategies.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center border border-dashed border-zinc-900 rounded-lg p-24 text-center bg-[#050505]">
            <BarChart2 className="w-8 h-8 text-zinc-700 mb-3" />
            <p className="text-sm font-medium text-zinc-200">No active strategies detected</p>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              Assign a strategy setup inside your Risk Configuration panel when adding a trade to compile metadata.
            </p>
          </div>
        ) : (
          <div className="w-full border border-zinc-900 rounded-lg overflow-hidden bg-[#050505]">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 bg-[#0a0a0a] text-[11px] font-mono font-medium tracking-wider text-zinc-500 uppercase">
                    <th className="py-3.5 px-6">Strategy Configuration</th>
                    <th className="py-3.5 px-6 text-center w-32">Total Trades</th>
                    <th className="py-3.5 px-6 text-center w-32">Win Rate</th>
                    <th className="py-3.5 px-6 text-right w-44">Net P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-950 text-sm">
                  {processedStrategies.map((strategy, idx) => {
                    const winRate = strategy.total > 0 ? Math.round((strategy.wins / strategy.total) * 100) : 0;
                    const isPositive = strategy.pnl >= 0;

                    return (
                      <tr key={idx} className="hover:bg-zinc-900/30 transition-colors group">
                        <td className="py-4 px-6 font-medium text-zinc-200">
                          {strategy.name}
                        </td>
                        <td className="py-4 px-6 text-center text-zinc-400 font-mono text-xs">
                          {strategy.total}
                        </td>
                        <td className="py-4 px-6 text-center text-zinc-200 font-mono text-xs">
                          {winRate}%
                        </td>
                        <td className={`py-4 px-6 text-right font-mono text-xs font-medium ${
                          isPositive ? "text-emerald-400" : "text-rose-500"
                        }`}>
                          {isPositive ? "+" : ""}${strategy.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}