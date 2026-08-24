import { useState,useRef } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const inputRef = useRef<HTMLInputElement | null>(null);


  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) return;
    if(formData.password.length < 8) {
      toast.error('Password contains atleast 8 char')
     inputRef.current?.focus()
     return;
    }
    try {
      await register(formData);
      navigate('/login')
    } catch {
      toast.error('Failed to Register')
    }
  };

  return (
    <div className="min-h-screen bg-black grid grid-cols-1 md:grid-cols-2">

      {/* ── LEFT: FORM ── */}
      <div className="flex flex-col justify-between px-8 py-8 border-r border-zinc-900">

        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-white font-semibold text-sm tracking-tight">TradeVault</span>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Create an account</h1>
            <p className="text-sm text-zinc-500">Start journaling your trades professionally.</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Full name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Alex Kumar"
                value={formData.fullName}
                onChange={handleInput}
                className="h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
              />
            </div>

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
              <label className="text-xs font-medium text-zinc-400">Password</label>
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
              <p className="text-xs text-zinc-700">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-9 w-full bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-600">
            Already have an account?{" "}
            <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-700">
          By creating an account, you agree to our{" "}
          <span className="text-zinc-500 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          {" "}and{" "}
          <span className="text-zinc-500 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>.
        </p>
      </div>

      {/* ── RIGHT: QUOTE ── */}
      <div className="hidden md:flex flex-col justify-between px-16 py-16 bg-black">
        <div />

        <div className="flex flex-col gap-6 max-w-md">
          <p className="text-2xl font-semibold text-white leading-snug tracking-tight">
            "An edge is not a magical formula. It is a statistical probability
            that plays out over{" "}
            <span className="text-zinc-500">a massive sample size of disciplined executions.</span>"
          </p>
          <div>
            <p className="text-sm font-medium text-white">The Law of Large Numbers</p>
            <p className="text-xs text-zinc-600 mt-0.5">TradeVault</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-700">
          <span>Without archives, performance is a myth.</span>
          <span>TradeVault © 2025</span>
        </div>
      </div>

    </div>
  );
}