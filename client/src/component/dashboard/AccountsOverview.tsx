// src/component/dashboard/AccountsOverview.tsx
import useAccount from "../../hooks/useAccount";
import useTrade from "../../hooks/useTrade";
import { useMemo } from "react";

export default function AccountsOverview() {
  const { accounts, selectedAccount, setSelectedAccount } = useAccount();
  const { trades } = useTrade();

  const accountStats = useMemo(() => {
    return accounts.map((account: any) => {
      const accountTrades = trades.filter((t: any) => t.account_id === account.id);
      const closedTrades = accountTrades.filter((t: any) => t.status === "closed");
      const wins = closedTrades.filter((t: any) => t.result === "win").length;
      const netPnL = closedTrades.reduce((sum: number, t: any) => sum + (t.profit_loss || 0), 0);
      const winRate = closedTrades.length > 0
        ? ((wins / closedTrades.length) * 100).toFixed(0)
        : "0";

      return {
        ...account,
        totalTrades: accountTrades.length,
        winRate,
        netPnL: Math.round(netPnL * 100) / 100,
      };
    });
  }, [accounts, trades]);

  if (accounts.length <= 1) return null;

  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">
        All Accounts
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accountStats.map((account: any) => {
          const isSelected = selectedAccount?.id === account.id;
          const isPositive = account.netPnL >= 0;

          return (
            <div
              key={account.id}
              onClick={() => setSelectedAccount(account)}
              className={`border rounded-lg p-4 flex flex-col gap-3 cursor-pointer transition-all ${
                isSelected
                  ? "border-zinc-600 bg-zinc-900"
                  : "border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/50"
              }`}
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <div className="flex flex-col">
                  <span className="text-sm font-mono font-bold text-zinc-100 truncate">
                    {account.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                    {account.account_type} · {account.currency}
                  </span>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider">Active</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">Trades</span>
                  <span className="text-sm font-mono font-bold text-zinc-300">{account.totalTrades}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">Win Rate</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{account.winRate}%</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">Net P&L</span>
                  <span className={`text-sm font-mono font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                    {isPositive ? "+" : ""}${Math.abs(account.netPnL)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}