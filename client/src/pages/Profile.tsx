import { useSidebar } from "../hooks/useSidebar";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { toggleSidebar } = useSidebar();
  const { user } = useUser();

  const fullname = user.full_name;
  const country = user.country;
  const bio = user.bio;
  
  const email = localStorage.getItem("email") || "trader@tradevault.app";

  // Dynamic initials generator
  const initials = fullname
    ? fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "TR";

  return (
    // Changed to flex-1 font-sans to scale with full widescreen layouts and inherit Geist typography
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">

      {/* ── TOPBAR ── */}
      <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path d="M2 4.5h11M2 7.5h11M2 10.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-2 text-base font-medium tracking-tight text-zinc-400">
            <span>Profile Overview</span>
          </div>
        </div>
      </header>

      {/* ── PROFILE CONTAINER WITH FULL SCREEN WIDTH ── */}
      {/* Swapped max-w-5xl mx-auto out for w-full flex-1 edge-to-edge tracking layout */}
      <div className="w-full flex-1 px-8 py-12 flex flex-col gap-10">
        
        {/* Page Header matched cleanly to Settings spacing */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight sm:text-4xl">
            Account Profile
          </h1>
          <p className="text-base text-zinc-400 font-normal leading-relaxed tracking-normal max-w-2xl">
            Review your public identity details, trade vault configuration, and platform credentials.
          </p>
        </div>

        {/* Bordered Vault Wrapper stretching full bleed */}
        <div className="border border-zinc-900 rounded-xl bg-zinc-950/40 backdrop-blur-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
          
          {/* Left Panel: Primary Identity */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-900 flex flex-col items-center md:items-start text-center md:text-left justify-between bg-zinc-900/10">
            <div className="flex flex-col items-center md:items-start gap-5 w-full">
              <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-semibold text-zinc-100 tracking-wider shadow-inner">
                {initials}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">{fullname}</h2>
                <p className="text-sm font-normal text-zinc-400 tracking-normal selection:bg-zinc-800">{email}</p>
              </div>
            </div>
            <div className="w-full py-4 px-4 rounded-lg bg-zinc-900/30 border border-zinc-900/80 flex flex-col gap-1 items-center md:items-start">
              <span className="text-[15px] uppercase font-mono font-bold tracking-widest text-red-600">Remember</span>
              <p className="text-[15px] font-medium tracking-tight bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent italic leading-snug">
                "The winner takes it all"
              </p>
            </div>
            <div className="mt-12 pt-6 border-t border-zinc-900 w-full hidden md:block">
              <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono font-semibold">Account Security</p>
              <p className="text-sm text-emerald-400 mt-2 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Right Panel: Vault Metadata Grid */}
          <div className="col-span-2 p-8 flex flex-col justify-between gap-10">
            
            <div className="flex flex-col text-base divide-y divide-zinc-900">
              
              {/* Trading Bio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 pb-5 items-start gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Trading Bio</span>
                <span className="sm:col-span-2 text-zinc-300 font-normal leading-relaxed text-base">{bio || 'ADD BIO'}</span>
              </div>

              {/* Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-5 items-center gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Location</span>
                <span className="sm:col-span-2 text-zinc-300 font-normal">{country || "ADD LOCATION"}</span>
              </div>

              {/* Preferences Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-5 items-center gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Base Currency</span>
                <span className="sm:col-span-2 text-zinc-300 font-mono text-sm tracking-wide font-medium">{user.account_currency}</span>
              </div>

              {/* Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-5 items-center gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Preferred Timezone</span>
                <span className="sm:col-span-2 text-zinc-300 font-normal">{user.timezone || "Asia/Kolkata (IST)"}</span>
              </div>

              {/* Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-5 items-center gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Experience Level</span>
                <span className="sm:col-span-2 text-zinc-300 font-normal">{user.trading_experience}</span>
              </div>

              {/* Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 pt-5 items-center gap-2">
                <span className="text-zinc-400 font-semibold tracking-tight text-base">Tier Status</span>
                <span className="sm:col-span-2 inline-flex items-center">
                  <span className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-md font-semibold tracking-wide">
                    Free Forever
                  </span>
                </span>
              </div>

            </div>

            {/* Bottom Footer Info Section inside the box */}
            <div className="pt-5 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-zinc-500 font-medium">
              <span>Verified Registry Node</span>
              <span>Registered: June 1, 2025</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}