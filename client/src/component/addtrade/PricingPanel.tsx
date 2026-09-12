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
    <div className="w-full rounded-xl border border-zinc-900 bg-zinc-950/60 p-5 flex flex-col gap-6 select-none antialiased shadow-sm">
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-4">
        <span className="text-[10px] font-mono font-semibold tracking-[0.16em] text-zinc-500 uppercase">
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
            className="bg-black"
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
            className="bg-black"
          />
        </div>
      </FormField>

      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden flex flex-col ${
          formData.status === "closed"
            ? "max-h-28 opacity-100 border-t border-zinc-900 pt-5 mt-1"
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
              className="bg-black"
            />
          </div>
        </FormField>
      </div>
    </div>
  );
}
