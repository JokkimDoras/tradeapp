import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FiTrendingUp, FiPieChart } from "react-icons/fi";

interface PerformanceChartsProps {
  summary: {
    overall_wins: number;
    overall_losses: number;
    closed_trades_count: number;
    win_rate: string;
  };
  timelineData: any[];
  CustomChartTooltip: any;
  formatCurrency: (val: number | string) => string;
}

export default function PerformanceCharts({ summary, timelineData, CustomChartTooltip, formatCurrency }: PerformanceChartsProps) {
  const pieChartDistribution = [
    { name: "Profitable Trades", value: summary.overall_wins || 0, color: "#10b981" },
    { name: "Unprofitable Trades", value: summary.overall_losses || 0, color: "#f43f5e" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Equity Curve */}
      <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-zinc-500" size={14} />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              Compounding Equity Curve ($)
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded uppercase">
            Chronological Timeline
          </span>
        </div>
        
        <div className="w-full h-72 pt-4">
          {timelineData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-600">
              Insufficient distribution data points to compute continuous curve sequence.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.06}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="date" stroke="#52525b" fontSize={10} fontFamily="monospace" tickLine={false} axisLine={{ stroke: "#18181b" }} />
                <YAxis stroke="#52525b" fontSize={10} fontFamily="monospace" tickLine={false} axisLine={{ stroke: "#18181b" }} tickFormatter={(v) => `$${formatCurrency(v)}`} />
                <Tooltip content={<CustomChartTooltip />} cursor={{ stroke: '#27272a', strokeWidth: 1 }} />
                <Area name="Equity Valuation" type="monotone" dataKey="equity_curve" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#equityGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Distribution Ratio */}
      <div className="border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiPieChart className="text-zinc-500" size={14} />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
            Distribution Ratio
          </span>
        </div>
        
        <div className="w-full h-48 flex items-center justify-center relative mt-4">
          {summary.closed_trades_count === 0 ? (
            <div className="font-mono text-xs text-zinc-600">No settled executions recorded.</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieChartDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                    {pieChartDistribution.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} stroke="#09090b" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} positions`, 'Distribution']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center font-mono">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Win Rate</span>
                <span className="text-white text-lg font-medium">{summary.win_rate || "0.0"}%</span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-2 font-mono text-xs text-zinc-400">
          <div className="flex items-center justify-between p-2 rounded border border-zinc-900 bg-zinc-900/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Profitable Targets Met</span>
            </div>
            <span className="text-white font-medium">{summary.overall_wins || 0}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded border border-zinc-900 bg-zinc-900/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Risk Invalidations Hit</span>
            </div>
            <span className="text-white font-medium">{summary.overall_losses || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}