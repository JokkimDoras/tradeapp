import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import TradingSetting from "../component/settings/TradingSetting";
import GeneralSetting from "../component/settings/GeneralSetting";
import SecuritySetting from "../component/settings/SecuritySetting";

const tabs = ["General", "Trading", "Security"] as const;
type Tab = (typeof tabs)[number];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("General");
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* ── TOPBAR ── */}
      <header className="h-16  border-b border-zinc-900 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path
                d="M2 4.5h11M2 7.5h11M2 10.5h11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-base font-medium tracking-tight text-zinc-400">
            <span>Settings</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="w-full flex-1 px-8 py-12 flex flex-col gap-10">
        
        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight sm:text-4xl">
            Settings
          </h1>
          <p className="text-base text-zinc-400 font-normal leading-relaxed tracking-normal max-w-2xl">
            Manage your account and trading preferences.
          </p>
        </div>

        {/* ── TABS ── */}
        <div className="flex items-center gap-2 border-b border-zinc-900">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-base font-semibold tracking-tight transition-all relative ${
                activeTab === tab
                  ? "text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100" />
              )}
            </button>
          ))}
        </div>

        {/* ── SUB-COMPONENTS CONTENT AREA ── */}
        <div className="w-full text-base text-zinc-300 tracking-normal leading-relaxed">
          {activeTab === "General" && <GeneralSetting/>}
          {activeTab === "Trading" && <TradingSetting />}
          {activeTab === "Security" && <SecuritySetting/>}
        </div>

      </div>
    </div>
  );
}