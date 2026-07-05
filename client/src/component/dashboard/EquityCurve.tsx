// // src/component/dashboard/EquityCurve.tsx
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
// import { useAnalytics } from "../../hooks/useAnalytics";
// import type { ChartData } from "../../types/analytics.types"; 
// import { useEffect } from "react";
// import useAccount from "../../hooks/useAccount";

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     const value = payload[0].value;
//     const isPositive = value >= 0;
//     return (
//       <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
//         <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">{label}</p>
//         <p className={`text-sm font-mono font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
//           {isPositive ? "+" : ""}${Number(value).toFixed(2)}
//         </p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function EquityCurve() {
//   const { analyticsData, getAnalyticsData, loading } = useAnalytics();
//   const { selectedAccount } = useAccount(); 
//   const accountId = selectedAccount?.id;
  
//   useEffect(() => {
//     if (accountId) {
//       getAnalyticsData(false, accountId);
//     }
//   }, [accountId]);

//   const chartData = analyticsData?.chart_data ?? [];

//   if (loading) {
//     return (
//       <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg p-6 flex flex-col gap-2">
//         <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">
//           Equity Curve
//         </span>
//         <div className="flex items-center justify-center h-32 text-zinc-500 text-sm font-mono animate-pulse">
//           Loading analytics...
//         </div>
//       </div>
//     );
//   }

//   if (chartData.length === 0) {
//     return (
//       <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg p-6 flex flex-col gap-2">
//         <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">
//           Equity Curve
//         </span>
//         <div className="flex items-center justify-center h-32 text-zinc-700 text-sm font-mono">
//           No closed trades to display
//         </div>
//       </div>
//     );
//   }

//   // Pure data parsing without trying to manipulate any math fields
//   const formattedData = chartData.map((d: ChartData) => {
//     const dateObj = new Date(d.date);
//     return {
//       date: isNaN(dateObj.getTime()) 
//         ? String(d.date) 
//         : dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//       equity: Number(d.equity_curve),
//     };
//   });

//   const finalEquity = formattedData[formattedData.length - 1]?.equity ?? 0;
//   const isPositive = finalEquity >= 0;

//   return (
//     <div className="w-full border border-zinc-900 bg-zinc-950 rounded-lg p-5 flex flex-col gap-4">
//       <div className="flex items-center justify-between">
//         <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">
//           Equity Curve
//         </span>
//         <span className={`text-xs font-mono font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
//           {isPositive ? "+" : ""}${finalEquity.toFixed(2)}
//         </span>
//       </div>

//       <ResponsiveContainer width="100%" height={140}>
//         <LineChart data={formattedData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
//           <XAxis
//             dataKey="date"
//             tick={{ fontSize: 9, fill: "#52525b", fontFamily: "monospace" }}
//             axisLine={false}
//             tickLine={false}
//           />
//           <YAxis
//             // Reverts to stable auto configuration to prevent breaking layouts
//             domain={['auto', 'auto']}
//             tick={{ fontSize: 9, fill: "#52525b", fontFamily: "monospace" }}
//             axisLine={false}
//             tickLine={false}
//             tickFormatter={(v) => `$${Number(v).toFixed(0)}`}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <ReferenceLine y={0} stroke="#27272a" strokeDasharray="3 3" />
//           <Line
//             type="monotone"
//             dataKey="equity"
//             stroke={isPositive ? "#34d399" : "#f43f5e"}
//             strokeWidth={1.5}
//             dot={false}
//             activeDot={{ r: 3, fill: isPositive ? "#34d399" : "#f43f5e", strokeWidth: 0 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }