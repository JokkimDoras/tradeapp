// import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import { useNavigate } from "react-router";

// interface ExecutionHistoryTableProps {
//   recentTrade: any[];
//   deleteingId: number | null;
//   setFormState: (state: any) => void;
//   handleDelete: (id: number) => void;
// }

// export default function ExecutionHistoryTable({
//   recentTrade,
//   deleteingId,
//   setFormState,
//   handleDelete,
// }: ExecutionHistoryTableProps) {
//   const navigate = useNavigate();

//   console.log('to test')
//   return (
//     <div className="w-full bg-black border border-zinc-900 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
//       {/* Table Header: Pure 4-Column Layout */}
//       <div className="grid grid-cols-4 px-6 py-3.5 border-b border-zinc-900 text-[11px] font-medium text-zinc-500 uppercase tracking-wider bg-zinc-950/40 selection:bg-transparent">
//         <div>Asset / Risk</div>
//         <div>Side / Size</div>
//         <div>Entry / Exit</div>
//         <div className="text-right">Targets / Actions</div>
//       </div>

//       {/* Table Body */}
//       <div className="divide-y divide-zinc-900">
//         {recentTrade.map((trade: any, idx: number) => {
//           const isBuy = trade.trade_type?.toLowerCase() === "buy";
//           const isDeleting = deleteingId === trade.id;

//           return (
//             <div
//               key={trade.id || idx}
//               onClick={() => !isDeleting && navigate(`/trade/${trade.id}`)}
//               className={`grid grid-cols-4 px-6 py-4 items-center hover:bg-zinc-900/30 transition-all duration-200 group cursor-pointer ${
//                 isDeleting ? "opacity-35 pointer-events-none select-none" : ""
//               }`}
//             >
//               {/* Column 1: Asset & Risk */}
//               <div className="flex flex-col gap-1">
//                 <span className="font-semibold text-zinc-100 text-sm tracking-tight group-hover:text-white transition-colors">
//                   {trade.currency_pair || "—"}
//                 </span>
//                 <span className="text-xs text-zinc-500 font-mono">
//                   Risk {trade.risk_percentage != null ? `${trade.risk_percentage}%` : "—"}
//                 </span>
//               </div>

//               {/* Column 2: Side & Size */}
//               <div className="flex flex-col gap-1 items-start">
//                 <span
//                   className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide border ${
//                     isBuy
//                       ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
//                       : "bg-rose-500/5 border-rose-500/10 text-rose-400"
//                   }`}
//                 >
//                   {trade.trade_type || "POSITION"}
//                 </span>
//                 <span className="text-xs text-zinc-400 font-mono">
//                   {trade.lot_size ?? "—"} Lots
//                 </span>
//               </div>

//               {/* Column 3: Entry & Exit */}
//               <div className="flex flex-col gap-0.5 font-mono text-xs">
//                 <div className="flex items-center gap-1.5 text-zinc-300">
//                   <span className="text-zinc-600 text-[10px] font-sans uppercase">En</span>
//                   <span>{trade.entry_price ?? "—"}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-zinc-500">
//                   <span className="text-zinc-600 text-[10px] font-sans uppercase">Ex</span>
//                   <span>{trade.exit_price ?? "—"}</span>
//                 </div>
//               </div>

//               {/* Column 4: Targets & Hover Actions */}
//               <div className="flex items-center justify-end text-right relative min-h-[32px]">
//                 {/* Targets (SL/TP) - Hidden on row hover */}
//                 <div className="flex flex-col gap-0.5 font-mono text-xs opacity-80 group-hover:opacity-0 transition-opacity duration-150 text-right">
//                   <div className="flex items-center justify-end gap-1.5 text-rose-400/90">
//                     <span className="text-zinc-600 text-[10px] font-sans uppercase">SL</span>
//                     <span>{trade.stop_loss ?? "—"}</span>
//                   </div>
//                   <div className="flex items-center justify-end gap-1.5 text-emerald-400/90">
//                     <span className="text-zinc-600 text-[10px] font-sans uppercase">TP</span>
//                     <span>{  "nigger"}</span>
//                   </div>
//                 </div>

//                 {/* Actions - Revealed smoothly over the targets on hover */}
//                 <div className="absolute right-0 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
//                   <button
//                     disabled={isDeleting}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setFormState(trade);
//                     }}
//                     className="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
//                     title="Edit"
//                   >
//                     <FiEdit2 size={11} />
//                   </button>
//                   <button
//                     disabled={isDeleting}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(trade.id);
//                     }}
//                     className="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-500 hover:text-rose-400 hover:border-rose-950/60 transition-all active:scale-95 cursor-pointer disabled:opacity-30"
//                     title="Delete"
//                   >
//                     {isDeleting ? (
//                       <div className="w-3 h-3 border border-zinc-500 border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <FiTrash2 size={11} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }