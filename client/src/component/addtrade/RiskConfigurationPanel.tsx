import { useState } from "react";

interface RiskConfigurationPanelProps {
  formData: {
    stop_loss: string;
    take_profit: string;
    risk_percentage: string;
    strategy: string; 
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;}

export default function RiskConfigurationPanel({ 
  formData, 
  handleChange, 
  setFormData
}: RiskConfigurationPanelProps) {

  const [isOpen, setIsOpen] = useState(false);

  const strategies = [
    "Moving Average Crossover",
    "Support & Resistance Bounce",
    "Breakout",
    "Trendline Bounce",
    "Supply & Demand / Order Block",
    "Fibonacci Retracement",
    "RSI Overbought / Oversold",
    "MACD Divergence",
    "Double Top / Double Bottom",
    "Head and Shoulders",
    "Candlestick Price Action",
    "VWAP Scalping",
    "Mean Reversion",
    "News / Fundamental Catalyst"
  ];

  // filters using the parent state directly
  const filteredStrategies = strategies.filter((strategie) => 
    strategie.toLowerCase().includes(formData.strategy.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col gap-5 bg-zinc-900/5 border border-zinc-900/10 rounded-sm">
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
      </div>

      <div className="flex flex-col gap-1.5 relative">
        <label className="text-xs font-semibold text-zinc-500 tracking-tight">Strategies</label>
        <input
          type="text"
          name="strategy" 
          placeholder="Select or type setup..."
          value={formData.strategy}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onChange={handleChange} 
          className="w-full bg-transparent border-b border-zinc-900 focus:border-zinc-700 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none transition-colors"
        />

        {isOpen && filteredStrategies.length > 0 && (
          <ul className="absolute top-[100%] left-0 right-0 mt-1 bg-zinc-950 border border-zinc-800 rounded-sm max-h-48 overflow-y-auto z-50 shadow-xl shadow-black/40 divide-y divide-zinc-900 scrollbar-thin scrollbar-thumb-zinc-800">
            {filteredStrategies.map((item, index) => (
              <li 
                key={index}
                onMouseDown={() => setFormData((prev:any) => ({ ...prev, strategy: item }))}                className="px-3 py-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}