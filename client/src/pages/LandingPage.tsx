import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

// const quotes = [
//   {
//     text: "It's not about predicting what the market will do next. It's about protecting your capital when it does what you didn't expect.",
//     author: "Market Axiom",
//     sub: "Risk Management"
//   },
//   {
//     text: "The goal of a successful trader is to make the best trades. Money is secondary.",
//     author: "Alexander Elder",
//     sub: "Trading Psychology"
//   },
//   {
//     text: "In trading, the man who can be wrong the least amount of time wins.",
//     author: "Jesse Livermore",
//     sub: "Speculation"
//   },
//   {
//     text: "Every trader has strengths and weakness. Some are good holders of winners, but may hold their losers a little too long.",
//     author: "Steve Cohen",
//     sub: "Risk Discipline"
//   },
// ];

export default function TradeVaultLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900 px-6">
        <div className="max-w-5xl mx-auto h-16 flex items-center justify-between">
          <span className="text-sm font-semibold text-white tracking-tight">TradeVault</span>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#quotes" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              to="/register"
              className="h-9 px-4 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all flex items-center"
            >
              Get started
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-zinc-400 hover:text-white">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 py-4 flex flex-col gap-4 text-sm">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#quotes" onClick={() => setIsMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors">Philosophy</a>
            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
              <Link to="/login" className="text-zinc-400">Sign in</Link>
              <Link to="/register" className="h-9 bg-white text-black text-sm font-medium rounded-lg flex items-center justify-center">Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="px-6 pt-24 pb-32 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          <div className="inline-flex items-center gap-2 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-500">Now in beta — free for early traders</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05] max-w-3xl">
            Your trades deserve better than a spreadsheet.
          </h1>

          <p className="text-lg text-zinc-500 max-w-xl leading-relaxed">
            TradeVault is a professional trade journal built for Forex traders. Log, review, and improve every trade — in one clean workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/register"
              className="h-11 px-6 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              Start for free
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            
            <a  href="#features"
              className="h-11 px-6 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm rounded-lg transition-all flex items-center justify-center"
            >
              See how it works
            </a>
          </div>

          <p className="text-xs text-zinc-700">No credit card required · Free plan available</p>

        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-b border-zinc-900 py-5 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-8 overflow-x-auto text-xs text-zinc-600 whitespace-nowrap">
          <span className="text-zinc-800">·</span>
          <span className="text-zinc-800">·</span>
          <span className="text-zinc-800">·</span>
          <span className="text-zinc-800">·</span>
          <span className="text-zinc-800">·</span>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section className="px-6 py-24 border-b border-zinc-900 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">The workspace</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Everything in one place.</h2>
            <p className="text-sm text-zinc-500 max-w-md">
              Log your trades, track performance, review patterns — all from a single clean dashboard.
            </p>
          </div>

          <div className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950">
            <div className="border-b border-zinc-900 px-4 py-3 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="text-xs text-zinc-600 ml-2">tradevault.app/dashboard</span>
            </div>

            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-zinc-900">
              {[
                { label: "Total trades", value: "47" },
                { label: "Win rate", value: "62%" },
                { label: "Net P&L", value: "+$1,842" },
                { label: "Avg RR", value: "1:2.4" },
              ].map((stat) => (
                <div key={stat.label} className="bg-black border border-zinc-900 rounded-lg p-4">
                  <p className="text-xs text-zinc-600 mb-1">{stat.label}</p>
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-zinc-600 border-b border-zinc-900">
                    <th className="text-left pb-3 font-medium">Pair</th>
                    <th className="text-left pb-3 font-medium">Type</th>
                    <th className="text-left pb-3 font-medium">Strategy</th>
                    <th className="text-left pb-3 font-medium">Session</th>
                    <th className="text-right pb-3 font-medium">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {[
                    { pair: "EUR/USD", type: "Buy", strategy: "Order Block", session: "London", pnl: "+$245", pos: true },
                    { pair: "XAU/USD", type: "Buy", strategy: "Breakout", session: "NY", pnl: "+$620", pos: true },
                    { pair: "GBP/JPY", type: "Sell", strategy: "Liquidity Sweep", session: "Tokyo", pnl: "-$92", pos: false },
                    { pair: "USD/CHF", type: "Buy", strategy: "Trend Follow", session: "London", pnl: "+$178", pos: true },
                  ].map((row) => (
                    <tr key={row.pair}>
                      <td className="py-3 text-white font-medium">{row.pair}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.type === "Buy" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3 text-zinc-500 text-xs">{row.strategy}</td>
                      <td className="py-3 text-zinc-600 text-xs">{row.session}</td>
                      <td className={`py-3 text-right font-medium text-sm ${row.pos ? "text-emerald-400" : "text-red-400"}`}>
                        {row.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-6 py-24 border-b border-zinc-900 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Capabilities</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Built for serious traders.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                title: "Complete trade logging",
                desc: "Record every detail — pair, direction, entry, exit, stop loss, take profit, lot size, risk %, and notes. Nothing slips through."
              },
              {
                title: "Strategy performance",
                desc: "Tag trades by strategy and session. Discover which setups actually make you money and which ones you should stop taking."
              },
              {
                title: "RR & win rate tracking",
                desc: "See your real risk-to-reward ratio, win rate, profit factor, and average gain per trade — updated automatically with every log."
              },
              {
                title: "Trade history & filters",
                desc: "Filter by pair, session, strategy, date range, or outcome. Find patterns in your trading that spreadsheets could never reveal."
              },
              {
                title: "Monthly reports",
                desc: "Review your performance month by month. Understand your best sessions, worst drawdowns, and where your edge actually lives."
              },
              {
                title: "Clean, fast interface",
                desc: "No clutter. No noise. Just the tools you need to log, review, and improve — designed to get out of your way."
              },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col gap-2 border-t border-zinc-900 pt-6">
                <p className="text-sm font-medium text-white">{feature.title}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTES WALL ── */}
      <section id="quotes" className="px-6 py-24 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Philosophy</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Words the market lives by.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                text: "The goal of a successful trader is to make the best trades. Money is secondary.",
                author: "Alexander Elder",
              },
              {
                text: "It's not about predicting what the market will do. It's about protecting your capital when it does what you didn't expect.",
                author: "Market Axiom",
              },
              {
                text: "In trading, the man who can be wrong the least amount of time wins.",
                author: "Jesse Livermore",
              },
              {
                text: "An edge is not a formula. It is a statistical probability that plays out over a massive sample size of disciplined executions.",
                author: "TradeVault",
              },
              {
                text: "Amateurs want to be right. Professionals want to make money. The difference is in the process.",
                author: "Mark Douglas",
              },
              {
                text: "The market teaches. TradeVault organizes. You evolve.",
                author: "TradeVault",
              },
              {
                text: "Risk management is the only part of trading that is entirely within your control.",
                author: "Van Tharp",
              },
              {
                text: "Without a journal, you are not a trader. You are a gambler with a trading account.",
                author: "TradeVault",
              },
            ].map((quote, i) => (
              <div key={i} className="bg-black border border-zinc-900 rounded-xl p-6 flex flex-col gap-4">
                <p className="text-sm text-zinc-300 leading-relaxed">"{quote.text}"</p>
                <p className="text-xs text-zinc-600">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="px-6 py-24 border-b border-zinc-900 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Pricing</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight">Simple, transparent pricing.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="border border-zinc-900 rounded-xl p-6 flex flex-col gap-5">
              <div>
                <p className="text-sm font-medium text-white">Free</p>
                <p className="text-3xl font-semibold text-white mt-2">$0 <span className="text-sm font-normal text-zinc-600">/ month</span></p>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-zinc-500">
                {["Up to 50 trades", "Basic analytics", "Trade journal", "1 strategy"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="h-9 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-white text-sm rounded-lg transition-all flex items-center justify-center mt-auto">
                Get started free
              </Link>
            </div>

            <div className="border border-white/20 rounded-xl p-6 flex flex-col gap-5 relative">
              <div className="absolute -top-3 left-4">
                <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-medium">Popular</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Pro</p>
                <p className="text-3xl font-semibold text-white mt-2">$12 <span className="text-sm font-normal text-zinc-600">/ month</span></p>
              </div>
              <ul className="flex flex-col gap-2.5 text-sm text-zinc-400">
                {["Unlimited trades", "Advanced analytics", "All strategies & sessions", "Export CSV & PDF", "Monthly reports", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="h-9 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all flex items-center justify-center mt-auto">
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-32 bg-black text-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Consistency is born in the logs.
          </h2>
          <p className="text-sm text-zinc-500">
            Stop flying blind. Log every trade. Find your edge. Scale what works.
          </p>

          <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2 mt-2">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 h-10 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="h-10 px-5 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-all whitespace-nowrap"
            >
              Get started
            </button>
          </form>
          <p className="text-xs text-zinc-700">Free forever. No credit card needed.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 bg-black py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-white">TradeVault</span>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <span className="text-xs text-zinc-700">© {new Date().getFullYear()} TradeVault</span>
        </div>
      </footer>

    </div>
  );
}