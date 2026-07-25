import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { login, loading, error } = useAuth();

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) setFormData((prev) => ({ ...prev, email: savedEmail }));
    } catch (err) {
      console.warn('localStorage not available');
    }
  }, []);



  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    if (formData.password.length < 8) {
      toast.error('Password contain atleast 8 char')
      inputRef.current?.focus();
      return
    }
    try {
      await login(formData);

    } catch { }
  };

  return (
    <div className="min-h-screen bg-black grid grid-cols-1 md:grid-cols-2">

      <div className="flex flex-col justify-between px-8 py-8 border-r border-zinc-900">

        <div>
          <span className="text-white font-semibold text-sm tracking-tight">TradeVault</span>
        </div>

        <div className="w-full max-w-sm mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Welcome back</h1>
            <p className="text-sm text-zinc-500">Sign in to your TradeVault account.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInput}
                className="h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-400">Password</label>
                <span className="text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                name="password"
                ref={inputRef}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInput}
                className="h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-9 w-full bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-900" />
              <span className="text-xs text-zinc-700">or</span>
              <div className="flex-1 h-px bg-zinc-900" />
            </div>

            <button
              onClick={() => window.location.href = "https://tradeapp-43tb.onrender.com/auth/google"}
              className="h-9 w-full flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-white text-sm rounded-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.41 0-6.145-2.786-6.145-6.222 0-3.435 2.735-6.222 6.145-6.222 1.557 0 2.964.57 4.044 1.51l2.427-2.427C18.69 2.603 15.65 1.5 12.24 1.5 6.583 1.5 2 6.083 2 11.75s4.583 10.25 10.24 10.25c5.795 0 10.254-4.074 10.254-10.25 0-.695-.081-1.355-.232-1.965H12.24z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-zinc-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-zinc-400 hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-zinc-600">Backed by Supabase</span>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-between px-16 py-16 bg-black">
        <div />

        <div className="flex flex-col gap-6 max-w-md">
          <p className="text-2xl font-semibold text-white leading-snug tracking-tight">
            "The market doesn't care about your feelings. It only respects{" "}
            <span className="text-zinc-500">risk parameters.</span>"
          </p>
          <div>
            <p className="text-sm font-medium text-white">The Axiom of Capital Preservation</p>
            <p className="text-xs text-zinc-600 mt-0.5">TradeVault</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-700">
          <span>Edge is measured, not guessed.</span>
          <span>TradeVault © 2025</span>
        </div>
      </div>

    </div>
  );
}