import {  useState } from "react";
import useProfile from "../hooks/useUserSettings";
import { toast } from "sonner";
import { useUser } from "../hooks/useUser";
export default function TradingSetting() {
  const { updateSettings,loading } = useProfile();
  const { setUser,user } = useUser()
  
  const [formTrade, setFormTrade] = useState({
    account_currency: user.account_currency,
    default_lot_size: user.default_lot_size,
    risk_per_trade: user.risk_per_trade,
    trading_experience: user.trading_experience,
    timezone: user.timezone,
  });

  const handleChange = (e:any) => {
    const { value,name } = e.target;

    setFormTrade((prev) => ({
      ...prev,
      [name]:value
    }))

  }
  const handleSubmit = async() => {
    try{
      await updateSettings(formTrade)
      setUser((prev) => ({
        ...prev,
        ...formTrade
      }))
      toast.success('Changed Successfully')
    }catch(error:any){
      const serverMessage = error?.response?.data?.message;
      const generalMessage = error?.message;

      toast.error(
        serverMessage || generalMessage || "An unexpected error occurred"
      )
    }
  }


   return (
        <div className="flex flex-col gap-px">

          {[
            {
              label: "Account currency",
              desc: "Base currency used for all P&L calculations.",
              control: (
                <select name="account_currency" onChange={e => handleChange(e)} value={formTrade.account_currency} className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
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
                <select name="timezone" onChange={e => handleChange(e)} value={formTrade.timezone} className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
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
                name="default_lot_size"
                onChange={e => handleChange(e)}
                  value={formTrade.default_lot_size}
                  type="number"
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
                    onChange={e => handleChange(e)}
                    name="risk_per_trade"
                    value={formTrade.risk_per_trade}
                    type="number"
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
                <select onChange={e => handleChange(e)} name="trading_experience" value={formTrade.trading_experience} className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none">
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
            <div className="flex justify-end pt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center gap-2 h-9 px-5 bg-white hover:bg-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-black text-sm font-medium rounded-lg transition-all"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
          </div>

        </div>
      )
    }
