import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FiGrid, FiClock, FiShield, FiZap, FiDollarSign } from "react-icons/fi";

interface RiskAnalysisMatrixProps {
  summary: {
    average_win: string;
    average_loss: string;
    max_win_streak: number;
    max_loss_streak: number;
  };
  timelineData: any[];
  CustomChartTooltip: any;
  formatCurrency: (val: number | string) => string;
}

export default function RiskAnalysisMatrix({ summary, timelineData, CustomChartTooltip, formatCurrency }: RiskAnalysisMatrixProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Return Distribution Frequency */}
      <div className="lg:col-span-2 border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FiGrid className="text-zinc-500" size={14} />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
            Daily Return Distribution Frequency
          </span>
        </div>

        <div className="w-full h-56 pt-2">
          {timelineData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-600">
              Awaiting system ledger data compilation.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="date" stroke="#52525b" fontSize={10} fontFamily="monospace" tickLine={false} axisLine={{ stroke: "#18181b" }} />
                <YAxis stroke="#52525b" fontSize={10} fontFamily="monospace" tickLine={false} axisLine={{ stroke: "#18181b" }} tickFormatter={(v) => `$${formatCurrency(v)}`} />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: '#27272a', opacity: 0.1 }} />
                <Bar name="Delta Realized Return" dataKey="daily_pnl">
                  {timelineData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.daily_pnl >= 0 ? "#10b981" : "#f43f5e"} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Advanced Parameters */}
      <div className="border border-zinc-900 bg-zinc-950 rounded-md p-5 flex flex-col gap-4">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
          Advanced Risk Matrices
        </span>

        <div className="flex flex-col divide-y divide-zinc-900 font-mono text-xs text-zinc-400">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-zinc-500"><FiClock size={14} /><span>Average Winning Run</span></div>
            <span className="text-emerald-400 font-medium">${formatCurrency(summary.average_win)}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-zinc-500"><FiShield size={14} /><span>Average Drawdown Slip</span></div>
            <span className="text-rose-400 font-medium">${formatCurrency(summary.average_loss)}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-zinc-500"><FiZap size={14} /><span>Peak Win Sequence</span></div>
            <span className="text-white font-medium">{summary.max_win_streak} Consecutive</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-zinc-500"><FiDollarSign size={14} /><span>Peak Drawdown Sequence</span></div>
            <span className="text-white font-medium">{summary.max_loss_streak} Consecutive</span>
          </div>
        </div>
      </div>
    </div>
  );
}