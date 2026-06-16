import FormField from "./FormField";

interface PricingPanelProps {
formData: {
status: "open" | "closed";
entry_price: string;
lot_size: string;
exit_price: string;
};
handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PricingPanel({
formData,
handleChange,
}: PricingPanelProps) {
return ( 
<div className="p-6 flex flex-col gap-5"> 
<h3 className="text-[11px] font-semibold uppercase tracking-widest font-mono text-zinc-500">02 // Entry</h3>
  <FormField label="Entry Price">
    <input
      type="number"
      step="any"
      name="entry_price"
      required
      placeholder="0.00000000"
      value={formData.entry_price}
      onChange={handleChange}
      className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-sm text-zinc-100 font-mono focus:outline-none transition-colors"
    />
  </FormField>

  <FormField label="Lot Volume Size">
    <input
      type="number"
      step="any"
      name="lot_size"
      required
      placeholder="1.00"
      value={formData.lot_size}
      onChange={handleChange}
      className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-sm text-zinc-100 font-mono focus:outline-none transition-colors"
    />
  </FormField>

  <div
    className={`transition-all duration-300 overflow-hidden flex flex-col gap-1.5 ${
      formData.status === "closed"
        ? "max-h-24 opacity-100 mt-1"
        : "max-h-0 opacity-0 pointer-events-none"
    }`}
  >
    <FormField label="Settlement Exit Price">
      <input
        type="number"
        step="any"
        name="exit_price"
        required={formData.status === "closed"}
        placeholder="0.00000000"
        value={formData.exit_price}
        onChange={handleChange}
        className="w-full bg-transparent border-b border-zinc-800 focus:border-zinc-600 py-1.5 text-sm text-zinc-100 font-mono focus:outline-none transition-colors"
      />
    </FormField>
  </div>
</div>


);
}
