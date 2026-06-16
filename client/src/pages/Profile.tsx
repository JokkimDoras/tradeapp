import { useSidebar } from "../hooks/useSidebar";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { toggleSidebar } = useSidebar();
  const {user} = useUser()

  const fullname = user.full_name
  const country = user.country
  const bio = user.bio
  console.log(user)
  
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
    <div className="flex flex-col w-full min-h-screen bg-black text-white antialiased">

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
            <span>Profile Overview</span>
          </div>
        </div>
      </header>

      {/* ── PROFILE CONTAINER WITH EXTRA SCREEN WIDTH ── */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        
        {/* Bordered Vault Wrapper */}
        <div className="border border-zinc-900 rounded-xl bg-zinc-950/50 backdrop-blur-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
          
          {/* Left Panel: Primary Identity */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-900 flex flex-col items-center md:items-start text-center md:text-left justify-between bg-black/40">
            <div className="flex flex-col items-center md:items-start gap-4 w-full">
              <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-bold text-zinc-200 tracking-wider shadow-inner">
                {initials}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">{fullname}</h1>
                <p className="text-xs text-zinc-500 mt-1 selection:bg-zinc-800">{email}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-900/60 w-full hidden md:block">
              <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-mono">Account Security</p>
              <p className="text-xs text-emerald-500 mt-1.5 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                End-to-End Encrypted
              </p>
            </div>
          </div>

          {/* Right Panel: Vault Metadata Grid */}
          <div className="col-span-2 p-8 flex flex-col justify-between gap-8">
            
            <div className="flex flex-col text-sm divide-y divide-zinc-900">
              
              {/* Trading Bio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 pb-4 items-start gap-2">
                <span className="text-zinc-500 font-medium">Trading Bio</span>
                <span className="sm:col-span-2 text-zinc-300 text-xs sm:text-sm leading-relaxed">{bio || 'ADD BIO'}</span>
              </div>

              {/* Country */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-2">
                <span className="text-zinc-500 font-medium">Location</span>
                <span className="sm:col-span-2 text-zinc-300">{country || "ADD LOCATION"}</span>
              </div>

              {/* Preferences Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-2">
                <span className="text-zinc-500 font-medium">Base Currency</span>
                <span className="sm:col-span-2 text-zinc-300 font-mono text-xs tracking-wide">{user.account_currency}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-2">
                <span className="text-zinc-500 font-medium">Preferred Timezone</span>
                <span className="sm:col-span-2 text-zinc-300">{user.timezone || "Asia/Kolkata (IST)"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 py-4 gap-2">
                <span className="text-zinc-500 font-medium">Experience Level</span>
                <span className="sm:col-span-2 text-zinc-300">{user.trading_experience}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 pt-4 gap-2">
                <span className="text-zinc-500 font-medium">Tier Status</span>
                <span className="sm:col-span-2 inline-flex items-center">
                  <span className="text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-md font-medium tracking-wide">
                    Free Forever
                  </span>
                </span>
              </div>

            </div>

            {/* Bottom Footer Info Section inside the box */}
            <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-600">
              <span>Verified Registry Node</span>
              <span>Registered: June 1, 2025</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}