import React, { useState } from 'react';
import { 
  Terminal, 
  Image as ImageIcon,
  Sliders, 
  Activity,
  ArrowUpRight,
  Menu, 
  X 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router'; // Added useNavigate

export default function TradeVaultLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(""); // State to capture the bottom input
  const navigate = useNavigate();

  const handleInitializeSystem = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      // Save the email to localStorage so the login page can auto-grab it
      localStorage.setItem("email", emailInput.trim());
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-black tracking-[0.3em] uppercase">TRADEVAULT</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#system" className="hover:text-white transition-colors">The Workspace</a>
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
          </nav>

          {/* FIXED: Replaced standard href with react-router Links to stop page reloads */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
              Access
            </Link>
            <Link to="/login" className="bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-zinc-200 transition-colors">
              Start Journaling
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-zinc-400 hover:text-white">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-zinc-900 py-8 space-y-6 text-[11px] uppercase tracking-[0.2em] px-6">
            <a href="#philosophy" onClick={() => setIsMenuOpen(false)} className="block text-zinc-400">Philosophy</a>
            <a href="#system" onClick={() => setIsMenuOpen(false)} className="block text-zinc-400">The Workspace</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-zinc-400">Capabilities</a>
            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-4">
              {/* FIXED: Clean mobile routing */}
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-left text-zinc-400">Access Portal</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-white text-black text-center font-bold py-3 block">Start Journaling</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 sm:px-12 pt-20 pb-24 md:pt-36 md:pb-40 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-zinc-400">
              <span>FOREX COMMAND SYSTEM</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] text-white">
              Your records <br className="hidden sm:block"/>
              are your truth.<br/>
              <span className="text-zinc-600">Face them daily.</span>
            </h1>
            
            <p className="max-w-lg text-zinc-400 text-sm font-light leading-relaxed">
              Amateurs track profits. Professionals track processes. TradeVault eliminates fragile Excel sheets, replacing them with an immutable environment built to isolate your true edge.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
              {/* FIXED: Link component integration */}
              <Link to="/login" className="bg-white text-black px-8 py-4 flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all group text-center">
                Deploy Your Vault <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href="#system" className="border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 px-8 py-4 text-center transition-colors">
                Explore The Schema
              </a>
            </div>
          </div>

          {/* ASYMMETRICAL TRADING QUOTE SIDEBAR */}
          <div id="philosophy" className="lg:col-span-4 border-l-2 border-white/10 pl-6 lg:pl-8 lg:mt-12 space-y-6">
            <span className="text-[24px] font-serif italic text-zinc-500 block">“</span>
            <p className="text-base font-medium tracking-tight text-zinc-300 leading-snug">
              "It's not about predicting what the market will do next. It's about protecting your capital when it does what you didn't expect."
            </p>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-mono">
              — Market Axiom // Risk Management
            </div>
          </div>

        </div>
      </section>

      {/* CORE TERMINAL MOCKUP */}
      <section id="system" className="bg-black py-24 md:py-32 px-6 sm:px-12 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-2">INTERFACE PREVIEW</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">The Trading Command Center</h2>
            </div>
            <div className="text-xs text-zinc-500 tracking-wider font-mono">
              [ SCHEMA: V1.0.4 ]
            </div>
          </div>

          <div className="border border-zinc-800 bg-[#050505] overflow-hidden shadow-2xl">
            <div className="bg-black border-b border-zinc-900 px-4 py-3 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-6">
                <span className="text-white font-bold tracking-widest">TRADEVAULT // DASHBOARD</span>
                <span className="hidden sm:inline text-emerald-500">● LIVE DATA LAYER</span>
              </div>
            </div>

            <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-black border border-zinc-900 p-6 space-y-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Historical Metric Ratio</div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-light tracking-tighter text-white">2.41</span>
                  </div>
                  <div className="text-[11px] text-zinc-600 leading-relaxed">
                    Profit Factor calculates total gross profits divided by gross losses. Steady expansion signals strict execution discipline.
                  </div>
                </div>

                <div className="bg-black border border-zinc-900 p-6 space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Average R:R Target</div>
                  <div className="text-2xl font-bold tracking-tight text-white">1 : 3.52</div>
                </div>
              </div>

              <div className="lg:col-span-8 bg-black border border-zinc-900 p-4 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-zinc-900 text-zinc-600">
                        <th className="pb-3">PAIR</th>
                        <th className="pb-3">STRATEGY</th>
                        <th className="pb-3 text-right">RETURN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-950 text-zinc-300">
                      <tr>
                        <td className="py-4 font-bold text-white">EUR/USD</td>
                        <td>Order Block Refinement</td>
                        <td className="text-emerald-500 text-right font-bold">+3.20R</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-bold text-white">XAU/USD</td>
                        <td>Liquidity Sweep Out</td>
                        <td className="text-zinc-500 text-right font-bold">BE (0.00)</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-bold text-white">GBP/JPY</td>
                        <td>H4 Breakout Test</td>
                        <td className="text-rose-500 text-right font-bold">-1.00R</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MID-WAY PHRASE BREAK */}
      <section className="bg-zinc-950 py-16 text-center border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-sm font-serif italic text-zinc-400 block mb-3">“The market teaches, TradeVault organizes.”</span>
          <div className="h-px w-12 bg-zinc-800 mx-auto" />
        </div>
      </section>

      {/* SYSTEM CAPABILITIES GRID */}
      <section id="features" className="py-24 md:py-32 px-6 sm:px-12 bg-black">
        <div className="max-w-5xl mx-auto">
          
          <div className="max-w-2xl mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-2">SYSTEM PARAMETERS</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Engineered for the disciplined minority.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-400">
                <Terminal className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Flawless Trade History</h3>
              </div>
              <p className="text-sm text-zinc-400 font-light font-sans leading-relaxed">
                Log every single execution detail, from slippage parameters to stop loss placement. Build a dataset tailored specifically to currency fluctuation.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-400">
                <ImageIcon className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Visual Context Stacking</h3>
              </div>
              <p className="text-sm text-zinc-400 font-light font-sans leading-relaxed">
                Upload cleanly isolated multi-timeframe chart snapshots straight into individual records via Supabase Storage nodes. Review internal logic visually.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-400">
                <Sliders className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Dynamic Strategy Segregation</h3>
              </div>
              <p className="text-sm text-zinc-400 font-light font-sans leading-relaxed">
                Isolate specific trading parameters. Compare session mechanics (London liquidity vs. New York expansions) to confidently scale what makes profit.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-400">
                <Activity className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Risk-to-Reward Telemetry</h3>
              </div>
              <p className="text-sm text-zinc-400 font-light font-sans leading-relaxed">
                Evaluate expected values vs actual metrics. Stop cutting winners short or extending loss levels out of raw emotional hesitation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS STRIP LAYER */}
      <section className="bg-[#050505] border-y border-zinc-900 py-12 px-6 sm:px-12 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-12 text-[10px] font-mono tracking-widest text-zinc-600 whitespace-nowrap">
          <span>STACK // REACT 19</span>
          <span>TAILWIND UTILITIES</span>
          <span>NODE DESKTOP LAYER</span>
          <span>POSTGRESQL INSTANCE</span>
          <span>SUPABASE COMPLIANT</span>
        </div>
      </section>

      {/* FINAL REGISTRATION INITIALIZATION UNIT */}
      <section className="py-24 md:py-36 px-6 sm:px-12 bg-black text-center relative">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <span className="text-[32px] font-serif italic text-zinc-600 block">“</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight max-w-xl mx-auto leading-tight">
            Consistency is born in the logs.
          </h2>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 max-w-md mx-auto">
            Stop flying blind. Establish rules. Measure parameters. Document your trajectory.
          </p>

          <div className="pt-4 max-w-md mx-auto">
            {/* FIXED: Form now catches the email typed by the user, saves it, and pushes them instantly to /login */}
            <form onSubmit={handleInitializeSystem} className="flex flex-col sm:flex-row items-stretch justify-center border border-zinc-800 bg-black p-1.5">
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="OPERATOR_EMAIL@DOMAIN.COM" 
                className="px-4 py-3 bg-zinc-950 text-white placeholder:text-zinc-700 focus:outline-none text-xs font-mono grow border-none"
              />
              <button type="submit" className="bg-white text-black font-bold text-xs tracking-widest uppercase px-6 py-4 hover:bg-zinc-200 transition-all shrink-0">
                Initialize System
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* CLEAN CORE FOOTER */}
      <footer className="border-t border-zinc-900 bg-black py-12 px-6 sm:px-12 text-[11px] text-zinc-600 font-mono">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="tracking-widest">
            &copy; {new Date().getFullYear()} TRADEVAULT SYSTEMS LLC. RETAIL CAPITAL ARCHITECTURE.
          </div>
          <div className="flex gap-8 tracking-wider">
            <a href="#" className="hover:text-white transition-colors">[ PRIVACY_VAULT ]</a>
            <a href="#" className="hover:text-white transition-colors">[ CORE_TERMS ]</a>
          </div>
        </div>
      </footer>

    </div>
  );
}