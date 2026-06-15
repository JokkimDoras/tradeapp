import { useState } from "react";
import { useSidebar } from "../hooks/useSidebar";
import axios from "axios";

const tabs = ["General", "Trading", "Security"] as const;
type Tab = typeof tabs[number];

export default function Settings() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState<Tab>("General");
  const [formProfile,setFormProfile] = useState({
    fullname:'',
    country:'',
    bio:''
  })

  const fullname = localStorage.getItem("fullname");
  const email = localStorage.getItem("email");
  const initials = fullname ? fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "OP";
const handleChange = (e) => {
    const { name,value } =e.target;
    setFormProfile((prev) => ({
        ...prev,
        [name]:value
    }))

}

const handleSubmit = async() => {
 const res =  await axios.post('http://localhost:8000/updateuser',formProfile)
 const data = await res.json();
 console.log(data)
}
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
              <path d="M2 4.5h11M2 7.5h11M2 10.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
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
          <h1 className="text-xl font-semibold text-white tracking-tight">Settings</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your account and trading preferences.</p>
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

        
        {activeTab === "General" && (
          <div className="flex flex-col gap-px">

            {/* Avatar */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div>
                <p className="text-sm font-medium text-white">Avatar</p>
                <p className="text-xs text-zinc-500 mt-0.5">Click to upload a profile picture.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-semibold text-white">
                {initials}
              </div>
            </div>

            {/* Full name */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Full name</p>
                <p className="text-xs text-zinc-500 mt-0.5">Your display name across TradeVault.</p>
              </div>
              <input
                onChange={e => handleChange(e)}
                name="fullname"
                value={formProfile.fullname || fullname}
                type="text"
                placeholder="Your full name"
                className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
              />
            </div>

            {/* Country */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Country</p>
                <p className="text-xs text-zinc-500 mt-0.5">Your region for localization.</p>
              </div>
              <select name="country" onChange={e => handleChange(e)} value={formProfile.country} className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer">
                <option value="">Select country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Singapore</option>
                <option>UAE</option>
              </select>
            </div>

            {/* Bio */}
            <div className="flex items-start justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Bio</p>
                <p className="text-xs text-zinc-500 mt-0.5">A short description about your trading style.</p>
              </div>
              <textarea
              onChange={e => handleChange(e)}
              name="bio"
              value={formProfile.bio}
                rows={3}
                placeholder="e.g. London session breakout trader, 3 years experience."
                className="w-64 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Save */}
            <div className="flex justify-end pt-6">
              <button onClick={handleSubmit} className="h-9 px-5 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all">
                Save changes
              </button>
            </div>

          </div>
        )}

        {/* ══════════════════════════
            TRADING TAB
        ══════════════════════════ */}
        {activeTab === "Trading" && (
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
        )}

        {/* ══════════════════════════
            SECURITY TAB
        ══════════════════════════ */}
        {activeTab === "Security" && (
          <div className="flex flex-col gap-px">

            {/* Email */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Email address</p>
                <p className="text-xs text-zinc-500 mt-0.5">{email || "—"}</p>
              </div>
              <button className="h-9 px-4 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm rounded-lg transition-all">
                Change email
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Password</p>
                <p className="text-xs text-zinc-500 mt-0.5">Last updated 30 days ago.</p>
              </div>
              <button className="h-9 px-4 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm rounded-lg transition-all">
                Change password
              </button>
            </div>

            {/* Plan */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Plan</p>
                <p className="text-xs text-zinc-500 mt-0.5">You are on the Free plan.</p>
              </div>
              <span className="h-9 px-4 flex items-center text-xs text-zinc-500 border border-zinc-900 rounded-lg">
                Free
              </span>
            </div>

            {/* Member since */}
            <div className="flex items-center justify-between py-6 border-b border-zinc-900">
              <div className="flex-1 max-w-xs">
                <p className="text-sm font-medium text-white">Member since</p>
                <p className="text-xs text-zinc-500 mt-0.5">June 1, 2025</p>
              </div>
            </div>

            {/* Danger zone */}
            <div className="mt-8 border border-red-950 rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-red-950">
                <p className="text-sm font-medium text-red-500">Delete account</p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Permanently deletes your account and all trade data. This cannot be undone.
                </p>
              </div>
              <div className="px-5 py-4 flex items-center justify-between bg-red-950/10">
                <p className="text-xs text-zinc-600">Type your email to confirm deletion.</p>
                <button className="h-9 px-4 border border-red-900 hover:bg-red-950/40 text-red-500 text-sm rounded-lg transition-all">
                  Delete account
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}