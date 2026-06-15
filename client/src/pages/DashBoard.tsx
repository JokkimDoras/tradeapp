// src/pages/DashBoard.tsx
import useAuth from "../hooks/useAuth";
import { useSidebar } from "../hooks/useSidebar";

export default function DashBoard() {
  const { token, fullname, loading, logout } = useAuth();
  
  // Hook directly into your global sidebar context engine
  const { isOpen, toggleSidebar } = useSidebar(); 

  const handleLogout = () => {
    if (token) {
      logout(token);
    }
  };

  return (
    <>
      {/* HEADER CONTROLLER NODE */}
      <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-4">
          
          {/* GLOBAL MENU TOGGLE TRIGGER (Works on Laptop and Mobile) */}
          <button 
            onClick={toggleSidebar} 
            className="border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer"
          >
            {isOpen ? "[ HIDE_SIDEBAR ]" : "[ SHOW_SIDEBAR ]"}
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-wider text-zinc-100">[ DASHBOARD_SECURE_NODE ]</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Operator: <span className="text-indigo-400 font-medium">{fullname || "ESTABLISHING_IDENTITY..."}</span>
            </p>
          </div>
        </div>
        
        {/* SESSION TERMINATION INTERFACE */}
        <button 
          onClick={handleLogout} 
          disabled={loading} 
          className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm font-mono"
        >
          {loading ? "TERMINATING..." : "Logout"}
        </button>
      </div>

      {/* CORE CANVAS ENVIRONMENT WORKSPACE */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sample Metric Terminal Card 1 */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-md">
          <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase font-mono">System Integrity</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-400 font-mono">SECURE_98%</p>
        </div>

        {/* Sample Metric Terminal Card 2 */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-md">
          <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase font-mono">Active Streams</h3>
          <p className="text-2xl font-bold mt-2 text-indigo-400 font-mono">4_NODES_ONLINE</p>
        </div>

        {/* Sample Metric Terminal Card 3 */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-md">
          <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase font-mono">Session Uptime</h3>
          <p className="text-2xl font-bold mt-2 text-zinc-300 font-mono">02:45:12</p>
        </div>

      </div>

      <div className="mt-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-md">
          <h2 className="text-sm font-bold text-zinc-300 mb-2 font-mono uppercase">// Operational Logs</h2>
          <p className="text-sm text-zinc-400 leading-relaxed font-mono">
            Secure Environment Access Granted. All trading systems are synced to the primary datastore cluster. Toggle the navigation layout stream anytime using the workspace header control node above.
          </p>
        </div>
      </div>
    </>
  );
}