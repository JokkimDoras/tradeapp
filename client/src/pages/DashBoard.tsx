import SideBar from "../component/SideBar";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { token, fullname, loading, logout } = useAuth();

  const handleLogout = () => {
    if (token) {
      logout(token);
    }
  };

  const name = localStorage.getItem('fullname')
  const email = localStorage.getItem('email')

  console.log(name)
  console.log(token)
  console.log(email)

  return (
    <div className="flex min-h-screen bg-[#121212] text-white font-mono overflow-x-hidden relative">
      
      {/* MOBILE DRAW BACKGROUND ACCENTS */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
        />
      )}

      {/* TAILWIND LAYERED RESPONSIVE SIDEBAR */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 h-screen bg-[#161616] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
          ${isOpen ? "w-64 p-4 border-r border-zinc-800" : "w-0 p-0 border-r-0"}
          md:relative md:w-64 md:border-r md:border-zinc-800 md:p-4 md:z-0
        `}
      >
        <div className="w-[240px]">
          <SideBar />
        </div>
      </div>

      {/* CORE ENVIRONMENT CANVAS INTERFACE */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            
            {/* TOGGLE NAVIGATION INTERACTION */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-xs transition-colors"
            >
              {isOpen ? "[ CLOSE_MENU ]" : "[ OPEN_MENU ]"}
            </button>

            <div>
              <h1 className="text-xl font-bold">[ DASHBOARD_SECURE_NODE ]</h1>
              
              {/* FIXED: Listens seamlessly to your state-driven updates! */}
              <p className="text-sm text-zinc-400 mt-1">
                Operator: {fullname || "ESTABLISHING_IDENTITY_STREAM..."}
              </p>
              
            </div>
          </div>
          
          <button 
            onClick={handleLogout} 
            disabled={loading} 
            className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "TERMINATING_SESSION..." : "Logout"}
          </button>
        </div>

        <div className="mt-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
            <p className="text-zinc-300">Secure Environment Access Granted. Session configuration synced successfully.</p>
          </div>
        </div>
      </div>
    </div>
  );
}