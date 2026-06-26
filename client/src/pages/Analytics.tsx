import { useEffect, useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import { useAnalytics } from "../hooks/useAnalytics";
import Navbar from "../component/ui/NavBar";
import AnalyticsSkeleton from "../component/skeltons/AnalyticsSkelton";
import MetricCardGrid from "../component/analytics/MetricCardGrid";
import PerformanceCharts from "../component/analytics/PerformanceCharts";
import RiskAnalysisMatrix from "../component/analytics/RiskAnalysisMatrix";
import type { Summary } from "../types/analytics.types";
import { useLocation } from "react-router";
import { FiActivity, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import useAccount from "../hooks/useAccount";

// interface AnalyticsSummary {
//   total_trades: number;
//   closed_trades_count: number;
//   open_trades: number;
//   net_profit_loss: number;
//   overall_wins: number;
//   overall_losses: number;
//   profit_factor: string;
//   win_rate: string;
//   average_win: string;
//   average_loss: string;
//   best_trade: number;
//   worst_trade: number;
//   max_drawdown: number;
//   max_win_streak: number;
//   max_loss_streak: number;
// }

const formatCurrency = (val: number | string) => {
  const num = Number(val || 0);
  if (Math.abs(num) >= 1.0e9) return `${(num / 1.0e9).toFixed(2)}B`;
  if (Math.abs(num) >= 1.0e6) return `${(num / 1.0e6).toFixed(2)}M`;
  if (Math.abs(num) >= 1.0e3) return `${(num / 1.0e3).toFixed(2)}K`;
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 p-3 rounded shadow-xl font-mono text-xs">
        <p className="text-zinc-500 mb-1">{payload[0].payload.date}</p>
        <div className="flex flex-col gap-1">
          {payload.map((item: any, idx: number) => (
            <span key={idx} style={{ color: item.color || item.fill }}>
              {item.name}: ${formatCurrency(item.value)}
            </span>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const { toggleSidebar } = useSidebar();
  const { getAnalyticsData, analyticsData, loading } = useAnalytics();
  const { selectedAccount } = useAccount()
  const [activeTimeframe, setActiveTimeframe] = useState<"ALL" | "MTD" | "YTD">("ALL");
  const location = useLocation()
  useEffect(() => {
    
    getAnalyticsData(undefined,selectedAccount?.id);
  }, [location.pathname]);


  if (loading) return <AnalyticsSkeleton />;

  const summary = (analyticsData?.summary || {}) as Summary;
  const timelineData = analyticsData?.chart_data || [];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white relative">
      <Navbar toggleSidebar={toggleSidebar} >Analytics</Navbar>

      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto flex-1 p-6 pb-24">
        {/* Header Block Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-mono font-medium tracking-tight text-white flex items-center gap-2">
              <FiActivity className="text-zinc-400 animate-pulse" size={18} />
              SYSTEM_EXECUTION_ANALYTICS
            </h1>
            <p className="text-xs font-mono text-zinc-500">
              Quantitative overview of distribution patterns, compounding equity metrics, and system drawdowns.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 border border-zinc-900 rounded font-mono text-xs">
            {(["ALL", "MTD", "YTD"] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setActiveTimeframe(timeframe)}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeTimeframe === timeframe ? "bg-zinc-900 text-white font-medium" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Modularized Dash System Blocks */}
        <MetricCardGrid summary={summary} formatCurrency={formatCurrency} />
        <PerformanceCharts summary={summary} timelineData={timelineData} CustomChartTooltip={CustomChartTooltip} formatCurrency={formatCurrency} />
        <RiskAnalysisMatrix summary={summary} timelineData={timelineData} CustomChartTooltip={CustomChartTooltip} formatCurrency={formatCurrency} />

        {/* Level 4 Outliers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="border border-zinc-900 bg-zinc-950 rounded-md p-4 flex items-center justify-between transition-all hover:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-emerald-950/40 border border-emerald-900 flex items-center justify-center text-emerald-400"><FiArrowUpRight size={16} /></div>
              <div className="flex flex-col font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Extreme Delta Maxima (Best Outlier)</span>
                <span className="text-zinc-400 text-xs mt-0.5">Peak distribution anomaly vector</span>
              </div>
            </div>
            <span className="text-base font-mono font-medium text-emerald-400">+{formatCurrency(summary.best_trade)}</span>
          </div>

          <div className="border border-zinc-900 bg-zinc-950 rounded-md p-4 flex items-center justify-between transition-all hover:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-rose-950/40 border border-rose-900 flex items-center justify-center text-rose-400"><FiArrowDownRight size={16} /></div>
              <div className="flex flex-col font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Extreme Delta Minima (Worst Outlier)</span>
                <span className="text-zinc-400 text-xs mt-0.5">Deepest strategy invalidation point</span>
              </div>
            </div>
            <span className="text-base font-mono font-medium text-rose-400">{formatCurrency(summary.worst_trade)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}