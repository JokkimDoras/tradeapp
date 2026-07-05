import { useState } from "react";

interface MetricCardGridProps {
  summary: {
    net_profit_loss: number;
    profit_factor: string;
    win_rate: string;
    overall_wins: number;
    overall_losses: number;
    max_drawdown: number;
    total_trades: number;
    closed_trades_count: number;
    open_trades: number;
  };
  formatCurrency: (val: number | string) => string;
}

export default function MetricCardGrid({ summary, formatCurrency }: MetricCardGridProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const metrics = [
    {
      id: "net_pnl",
      label: "Net Compounding P&L",
      value: `${summary.net_profit_loss >= 0 ? "+" : ""}${formatCurrency(summary.net_profit_loss)}`,
      sub: `PF: ${summary.profit_factor || "0.00"} Factor`,
      color: summary.net_profit_loss >= 0 ? "text-white" : "text-rose-500"
    },
    {
      id: "win_rate",
      label: "Mathematical Win Rate",
      value: `${summary.win_rate || "0.0"}%`,
      sub: `${summary.overall_wins || 0} Wins / ${summary.overall_losses || 0} Losses`,
      color: Number(summary.win_rate) >= 50 ? "text-emerald-400" : "text-rose-400"
    },
    {
      id: "drawdown",
      label: "Maximum System Drawdown",
      value: formatCurrency(summary.max_drawdown),
      sub: "Absolute Peak-to-Valley Deficit",
      color: "text-zinc-400"
    },
    {
      id: "executions",
      label: "Total Account Volume",
      value: summary.total_trades || 0,
      sub: `${summary.closed_trades_count || 0} Settled / ${summary.open_trades || 0} Active`,
      color: "text-zinc-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((card) => (
        <div 
          key={card.id}
          onMouseEnter={() => setHoveredMetric(card.id)}
          onMouseLeave={() => setHoveredMetric(null)}
          className={`p-5 rounded-md border bg-zinc-950 flex flex-col gap-1 transition-all duration-200 ${
            hoveredMetric === card.id ? "border-zinc-700 bg-zinc-900/20" : "border-zinc-900"
          }`}
        >
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-medium">
            {card.label}
          </span>
          <span className={`text-2xl font-mono font-medium mt-1 tracking-tight ${card.color}`}>
            {card.value}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
            {card.sub}
          </span>
        </div>
      ))}
    </div>
  );
}