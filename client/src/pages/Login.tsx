// src/pages/Login.tsx
import { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading, error } = useAuth();

  // Lifecycle hook for local email cache checking
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail, 
      }));
    }
  }, []); 

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    try {
      await login(formData);
    } catch (err) {
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://tradeapp-43tb.onrender.com/auth/google";
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono antialiased selection:bg-white selection:text-black grid grid-cols-1 md:grid-cols-12">
      
      {/* ================= LEFT PANELS: LOGIN INPUTS ================= */}
      <div className="md:col-span-5 flex flex-col justify-between p-6 sm:p-12 bg-black border-r border-zinc-900 relative z-10">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> [ ESC_BASE ]
          </a>
          <div className="flex items-center gap-2 text-[10px] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-none bg-emerald-500 animate-pulse" />
            SECURE_NODE
          </div>
        </div>

        {/* Core Input Form Workspace */}
        <div className="max-w-sm w-full mx-auto my-auto py-12 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block">SYSTEM GATEWAY</span>
            <h1 className="text-2xl font-black tracking-[0.15em] uppercase text-white">
              INITIALIZE_SESSION
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="text-xs text-red-500 font-bold uppercase tracking-wide border border-red-950 bg-red-950/20 px-3 py-2">
                ⚠️ {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                Operator Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@mail.com"
                value={formData.email}
                onChange={handleInput}
                className="w-full bg-zinc-950 border border-zinc-900 px-4 py-3.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                Secret Passphrase
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleInput}
                className="w-full bg-zinc-950 border border-zinc-900 px-4 py-3.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold text-xs tracking-widest uppercase py-4 mt-2 hover:bg-zinc-200 transition-colors disabled:bg-zinc-900 disabled:text-zinc-700 rounded-none"
            >
              {loading ? "Verifying..." : "Connect To Network"}
            </button>
          </form>

          {/* Minimalist Splitter Line */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-900"></div>
            <span className="flex-shrink mx-4 text-[9px] text-zinc-700 tracking-[0.3em] uppercase">OR</span>
            <div className="flex-grow border-t border-zinc-900"></div>
          </div>

          <Link 
            to="/register"
            className="w-full border border-zinc-900 bg-zinc-950 text-zinc-400 font-bold text-xs tracking-widest uppercase py-4 hover:text-white hover:border-zinc-700 transition-all rounded-none flex items-center justify-center gap-2"
          >
            Create Account
          </Link>

          {/* Google Sign In Component */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-zinc-900 bg-zinc-950 text-zinc-400 font-bold text-xs tracking-widest uppercase py-4 hover:text-white hover:border-zinc-700 transition-all rounded-none flex items-center justify-center gap-2"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.41 0-6.145-2.786-6.145-6.222 0-3.435 2.735-6.222 6.145-6.222 1.557 0 2.964.57 4.044 1.51l2.427-2.427C18.69 2.603 15.65 1.5 12.24 1.5 6.583 1.5 2 6.083 2 11.75s4.583 10.25 10.24 10.25c5.795 0 10.254-4.074 10.254-10.25 0-.695-.081-1.355-.232-1.965H12.24z" />
            </svg>
            Sign In with Google
          </button>
        </div>

        {/* Info Base */}
        <div className="text-[10px] text-zinc-600 flex items-center gap-2 tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" /> 
          <span>IDENTITY ARRAYS HARDENED VIA SUPABASE</span>
        </div>
      </div>

      {/* ================= RIGHT PANELS: FOREX QUOTE BLOCK ================= */}
      <div className="hidden md:flex md:col-span-7 bg-black flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        
        <div className="flex justify-between items-center text-[10px] tracking-widest text-zinc-700 font-mono">
          <span>SYSTEM // BROADCAST_ONLINE</span>
          <span>DATASTREAM: FOREX_PRIME</span>
        </div>

        {/* Core Trading Text Context Quote */}
        <div className="max-w-xl space-y-8 my-auto pr-6 lg:pr-12">
          <span className="text-[64px] font-serif italic text-zinc-800 leading-none block -mb-6">“</span>
          
          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-zinc-100 leading-[1.2]">
            The market doesn’t care about your feelings, your entry price, or your bias. <br/>
            <span className="text-zinc-600">It only respects risk parameters.</span>
          </h2>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-white">
              — The Axiom of Capital Preservation
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              TradeVault Infrastructure Protocols
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-950 pt-8 flex items-center justify-between text-[10px] text-zinc-600 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-zinc-700" />
            <span>METRIC MATRIX: ACTIVE</span>
          </div>
          <span>EDGE IS MEASURED, NOT GUESSED.</span>
        </div>

      </div>

    </div>
  );
}

export default Login;