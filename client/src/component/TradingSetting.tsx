export default function TradingSetting() {
   return (
        <div className="flex flex-col gap-px">

          {[
            {
              label: "Account currency",
              desc: "Base currency used for all P&L calculations.",
              control: (
                <select className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
                  <option>USD — US Dollar</option>
                  <option>EUR — Euro</option>
                  <option>GBP — British Pound</option>
                  <option>JPY — Japanese Yen</option>
                  <option>AUD — Australian Dollar</option>
                </select>
              ),
            },
            {
              label: "Timezone",
              desc: "Timestamps and sessions are displayed in this timezone.",
              control: (
                <select className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
                  <option>Asia/Kolkata (IST)</option>
                  <option>Europe/London (GMT)</option>
                  <option>America/New_York (EST)</option>
                  <option>Asia/Tokyo (JST)</option>
                  <option>Australia/Sydney (AEST)</option>
                </select>
              ),
            },
            {
              label: "Default lot size",
              desc: "Pre-filled when you create a new trade.",
              control: (
                <input
                  type="number"
                  defaultValue="0.01"
                  step="0.01"
                  className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all"
                />
              ),
            },
            {
              label: "Default risk per trade",
              desc: "Risk % pre-filled when logging a new trade.",
              control: (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="1"
                    step="0.5"
                    className="w-56 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all"
                  />
                  <span className="text-sm text-zinc-600">%</span>
                </div>
              ),
            },
            {
              label: "Trading experience",
              desc: "Helps TradeVault tailor insights for your level.",
              control: (
                <select className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </select>
              ),
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">{row.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{row.desc}</p>
              </div>
              {row.control}
            </div>
          ))}

          <div className="flex items-center justify-between pt-6">
            <button className="text-sm text-zinc-600 hover:text-zinc-400 transition-all">
              Reset to defaults
            </button>
            <button className="h-9 px-5 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all">
              Save settings
            </button>
          </div>

        </div>
      )
    }
