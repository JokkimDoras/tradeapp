import { useState } from "react";
import axios from "axios";
import { Terminal, ArrowLeft, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface ResponseDetails {
  data: {
    data: {
      email: string;
      full_name: string;
      id: string;
    };
  };
}
export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response: ResponseDetails = await axios.post(
        "https://tradeapp-43tb.onrender.com/auth/register",
        {
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
        }
      );
      localStorage.setItem("email", response.data.data.email);
      navigate('/login')
      // Optional: Add redirect logic or success state notification here
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message;
      console.log("Server rejected transaction:", backendMessage);
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white font-mono antialiased selection:bg-white selection:text-black grid grid-cols-1 md:grid-cols-12">
      {/* ================= LEFT PANELS: REGISTRATION INPUTS ================= */}
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
            NEW_NODE
          </div>
        </div>

        {/* Core Registration Input Form */}
        <div className="max-w-sm w-full mx-auto my-auto py-12 space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block">
              PROVISION ACCOUNT
            </span>
            <h1 className="text-2xl font-black tracking-[0.15em] uppercase text-white">
              CREATE_VAULT
            </h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error ? <div className="text-red-600">{error}</div> : ""}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                Operator Name
              </label>
              <input
                type="name"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInput}
                className="w-full bg-zinc-950 border border-zinc-900 px-4 py-3.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                Assign Operator Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="OPERATOR@DOMAIN.COM"
                value={formData.email}
                onChange={handleInput}
                className="w-full bg-zinc-950 border border-zinc-900 px-4 py-3.5 text-xs text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-colors rounded-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block">
                Define Secret Passphrase
              </label>
              <input
                type="password"
                name="password"
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
              {loading
                ? "Allocating Infrastructure..."
                : "Initialize Free Account"}
            </button>
          </form>

          {/* Subdued Redirect Link */}
          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-wider transition-colors"
            >
              Already verified? Sign in to terminal →
            </Link>
          </div>
        </div>

        {/* Info Base */}
        <div className="text-[10px] text-zinc-600 flex items-center gap-2 tracking-wider">
          <Terminal className="h-3.5 w-3.5 text-zinc-700" />
          <span>REGISTRATION DISPATCH COMPLIANT WITH POSTGRES CORE</span>
        </div>
      </div>

      {/* ================= RIGHT PANELS: FOREX QUOTE BLOCK ================= */}
      <div className="hidden md:flex md:col-span-7 bg-black flex-col justify-between p-12 lg:p-16 relative overflow-hidden">
        <div className="flex justify-between items-center text-[10px] tracking-widest text-zinc-700 font-mono">
          <span>SECURE_SIGNUP // BLOCK_ONLINE</span>
          <span>DATASTREAM: RISK_MGMT</span>
        </div>

        {/* Core Trading Text Context Quote */}
        <div className="max-w-xl space-y-8 my-auto pr-6 lg:pr-12">
          <span className="text-[64px] font-serif italic text-zinc-800 leading-none block -mb-6">
            “
          </span>

          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-zinc-100 leading-[1.2]">
            An edge is not a magical formula. It is simply a statistical
            probability that plays out over a massive sample size of disciplined
            executions. <br />
            <span className="text-zinc-600">
              If you don't log it, you don't own it.
            </span>
          </h2>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-white">
              — The Law of Large Numbers
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              TradeVault Infrastructure Protocols
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-950 pt-8 flex items-center justify-between text-[10px] text-zinc-600 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-zinc-700" />
            <span>METRIC MATRIX: SETUP_STAGE</span>
          </div>
          <span>WITHOUT ARCHIVES, PERFORMANCE IS A MYTH.</span>
        </div>
      </div>
    </div>
  );
}
