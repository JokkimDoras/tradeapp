interface RiskConfigurationPanelProps {
    formData: {
      stop_loss: string;
      take_profit: string;
      risk_percentage: string;
      pips: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function RiskConfigurationPanel({ formData, handleChange }: RiskConfigurationPanelProps) {
    return (
      <div className="p-6 flex flex-col gap-5 bg-zinc-900/5">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest font-mono text-zinc-500">
          03 // Risk Configuration
        </h3>
  
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 tracking-tight">Stop Loss</label>
            <input
              type="number"
              step="any"
              name="stop_loss"
              placeholder="None"
              value={formData.stop_loss}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 tracking-tight">Take Profit</label>
            <input
              type="number"
              step="any"
              name="take_profit"
              placeholder="None"
              value={formData.take_profit}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none transition-colors"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 tracking-tight">Risk Delta (%)</label>
            <input
              type="number"
              step="any"
              name="risk_percentage"
              placeholder="0.00%"
              value={formData.risk_percentage}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 tracking-tight">Pips Count</label>
            <input
              type="number"
              step="any"
              name="pips"
              placeholder="0.0"
              value={formData.pips}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    );
  }