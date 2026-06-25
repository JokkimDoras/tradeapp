type TradeType = "buy" | "sell";

interface TradeTypeSelectorProps {
  value: TradeType;
  onChange: (type: TradeType) => void;
  isthatSell: TradeType;
}

export default function TradeTypeSelector({
  onChange,
  isthatSell
}: TradeTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5 select-none antialiased">
      <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
        Order Action
      </label>

      <div className="grid grid-cols-2 p-1 bg-[#050505] border border-zinc-900 rounded-lg">
        <button
          type="button"
          onClick={() => onChange("buy")}
          className={`py-1.5 text-[11px] font-mono font-bold uppercase tracking-tight rounded-md transition-all duration-150 cursor-pointer ${
            isthatSell === "buy"
              ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Buy / Long
        </button>

        <button
          type="button"
          onClick={() => onChange("sell")}
          className={`py-1.5 text-[11px] font-mono font-bold uppercase tracking-tight rounded-md transition-all duration-150 cursor-pointer ${
            isthatSell === "sell"
              ? "bg-red-950/40 text-red-400 border border-red-900/50 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Sell / Short
        </button>
      </div>
    </div>
  );
}