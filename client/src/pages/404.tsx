import { useNavigate } from "react-router"; 
import Navbar from "../component/ui/NavBar";
import { useSidebar } from "../hooks/useSidebar";

export default function Page404() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-white font-sans antialiased selection:bg-zinc-800 selection:text-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        <Navbar toggleSidebar={toggleSidebar}>404</Navbar>

        <div className="flex flex-col items-center justify-center flex-1 max-w-7xl mx-auto w-full p-6 text-center">
          <div className="flex flex-col items-center max-w-xl">
            
            <div className="flex items-center gap-4 font-mono mb-6">
              <span className="text-xl font-bold tracking-tight text-white">404</span>
              <div className="h-6 w-[1px] bg-zinc-800" />
              <span className="text-xs text-zinc-400 tracking-wide font-semibold">BAD_OR_STALE_QUOTE</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white mb-3">
              Execution Route Terminated.
            </h1>
            
            <p className="text-sm font-mono text-zinc-400 max-w-md leading-relaxed mb-8">
              The contract or asset pair you are seeking doesn't exist on this matrix. The bridge to this liquidity pool may have expired.
            </p>

            <div className="w-full text-left font-mono border border-zinc-900 bg-zinc-950/50 p-4 rounded mb-8 max-w-md">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">
                Risk Management Note:
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Trading off unverified paths or stale order books increases your exposure to slippage. Stick to your defined execution plan and maintain strict stop-loss protocols.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/account-selector")}
                className="h-10 px-4 bg-white hover:bg-zinc-200 text-black font-medium text-xs rounded border border-white transition-all duration-150 cursor-pointer"
              >
                Return to Terminal
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="h-10 px-4 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white font-medium text-xs rounded border border-zinc-800 transition-all duration-150 cursor-pointer"
              >
                Go Back
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}