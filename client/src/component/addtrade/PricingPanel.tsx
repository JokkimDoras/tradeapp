import Input from "../ui/Input";
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
    <div className="w-full bg-black border border-zinc-900 rounded-lg p-5 flex flex-col gap-5 select-none antialiased">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-mono font-medium tracking-wider text-zinc-600 uppercase">
          02 // Entry & Volume
        </span>
      </div>

      <FormField label="Entry Price">
        <div className="relative w-full">
          <Input
            type="number"
            step="any"
            name="entry_price"
            required
            placeholder="0.00000000"
            value={formData.entry_price}
            onChange={handleChange}
            className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
          />
        </div>
      </FormField>

      {/* Lot Volume Size Field */}
      <FormField label="Lot Volume Size">
        <div className="relative w-full">
          <Input
            type="number"
            step="any"
            name="lot_size"
            required
            placeholder="1.00"
            value={formData.lot_size}
            onChange={handleChange}
            className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
          />
        </div>
      </FormField>

      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden flex flex-col ${
          formData.status === "closed"
            ? "max-h-24 opacity-100 border-t border-zinc-900/60 pt-4 mt-1"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <FormField label="Settlement Exit Price">
          <div className="relative w-full">
            <Input
              type="number"
              step="any"
              name="exit_price"
              required={formData.status === "closed"}
              placeholder="0.00000000"
              value={formData.exit_price}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm"
            />
          </div>
        </FormField>
      </div>
    </div>
  );
}