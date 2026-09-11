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
    <div className="flex flex-col gap-2 select-none antialiased">
      <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Order Action
      </label>

      <div className="grid grid-cols-2 gap-1 rounded-md border border-zinc-800 bg-black p-1">
        <button
          type="button"
          onClick={() => onChange("buy")}
          className={`py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            isthatSell === "buy"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Buy / Long
        </button>

        <button
          type="button"
          onClick={() => onChange("sell")}
          className={`py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all duration-150 cursor-pointer ${
            isthatSell === "sell"
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm"
              : "text-zinc-500 hover:text-zinc-400 border border-transparent"
          }`}
        >
          Sell / Short
        </button>
      </div>
    </div>
  );
}
