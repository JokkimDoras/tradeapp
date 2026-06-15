import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import TradingSetting from "../component/TradingSetting";
import GeneralSetting from "../component/GeneralSetting";
import SecuritySetting from "../component/SecuritySetting";


const tabs = ["General", "Trading", "Security"] as const;
type Tab = (typeof tabs)[number];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("General");
  const { toggleSidebar } = useSidebar();


 

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* ── TOPBAR ── */}
      <header className="h-14 border-b border-zinc-900 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M2 4.5h11M2 7.5h11M2 10.5h11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span>Settings</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10">
        {/* ── PAGE HEADER ── */}
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your account and trading preferences.
          </p>
        </div>

        {/* ── TABS ── */}
        <div className="flex items-center gap-0 border-b border-zinc-900">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm transition-all relative ${
                activeTab === tab
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "General" && <GeneralSetting/>}
        {activeTab === "Trading" && <TradingSetting />}
        {activeTab === "Security" && <SecuritySetting/>}
      </div>
    </div>
  );
}
