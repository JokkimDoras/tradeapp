import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ClipboardList, Save, Target } from "lucide-react";
import Navbar from "../component/ui/NavBar";
import { useSidebar } from "../hooks/useSidebar";
import useAccount from "../hooks/useAccount";
import useTrade from "../hooks/useTrade";

type JournalEntry = { focus: string; reflection: string; rating: number; updatedAt: string };

const focusOptions = ["Process", "Patience", "Risk control", "Execution", "Review"];
const blankEntry = (): JournalEntry => ({ focus: "Process", reflection: "", rating: 0, updatedAt: "" });
const formatDateKey = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};
const dateKeyFromTrade = (value: unknown) => {
  if (!value) return "";
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? "" : formatDateKey(parsed);
};
const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

export default function TradeJournal() {
  const { toggleSidebar } = useSidebar();
  const { selectedAccount } = useAccount();
  const { trades, fetchTradesData, loading } = useTrade();
  const [selectedDate, setSelectedDate] = useState(() => formatDateKey(new Date()));
  const [entry, setEntry] = useState<JournalEntry>(blankEntry);
  const [saved, setSaved] = useState(false);
  const storageKey = `trade-journal:${selectedAccount?.id ?? "personal"}:${selectedDate}`;

  useEffect(() => {
    if (!selectedAccount?.id || selectedAccount.id === "undefined") return;
    fetchTradesData(selectedAccount.id).catch(() => undefined);
  }, [fetchTradesData, selectedAccount?.id]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) { setEntry(blankEntry()); return; }
    try { setEntry(JSON.parse(stored) as JournalEntry); } catch { setEntry(blankEntry()); }
    setSaved(false);
  }, [storageKey]);

  const dayTrades = useMemo(() => trades.filter((trade: Record<string, unknown>) => dateKeyFromTrade(trade.trade_date) === selectedDate), [selectedDate, trades]);
  const summary = useMemo(() => {
    const closed = dayTrades.filter((trade: Record<string, unknown>) => String(trade.status).toLowerCase() === "closed");
    const pnl = closed.reduce((total: number, trade: Record<string, unknown>) => total + Number(trade.profit_loss ?? 0), 0);
    const wins = closed.filter((trade: Record<string, unknown>) => Number(trade.profit_loss ?? 0) > 0).length;
    return { pnl, closed: closed.length, wins, total: dayTrades.length };
  }, [dayTrades]);
  const prettyDate = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(`${selectedDate}T12:00:00`));
  const changeDate = (amount: number) => {
    const next = new Date(`${selectedDate}T12:00:00`);
    next.setDate(next.getDate() + amount);
    setSelectedDate(formatDateKey(next));
  };
  const saveEntry = () => {
    const nextEntry = { ...entry, updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(nextEntry));
    setEntry(nextEntry); setSaved(true); window.setTimeout(() => setSaved(false), 1800);
  };

  return <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
    <Navbar toggleSidebar={toggleSidebar}>Trade Journal</Navbar>
    <main className="w-full max-w-7xl mx-auto px-6 py-8 pb-20">
      <div className="flex flex-col gap-5 border-b border-zinc-900 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Execution / Reflection log</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Trade Journal</h1><p className="mt-1 text-sm text-zinc-500">Record the decisions behind the numbers, one session at a time.</p></div>
        <div className="flex items-center gap-2 self-start sm:self-auto"><button onClick={() => changeDate(-1)} aria-label="Previous day" className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-700 hover:text-white"><ChevronLeft size={16} /></button><input aria-label="Journal date" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="h-9 rounded-md border border-zinc-800 bg-zinc-950 px-3 font-mono text-xs text-zinc-300 outline-none [color-scheme:dark] focus:border-zinc-600" /><button onClick={() => changeDate(1)} aria-label="Next day" className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:border-zinc-700 hover:text-white"><ChevronRight size={16} /></button></div>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3"><Metric label="Trades logged" value={String(summary.total)} detail={summary.closed ? `${summary.closed} closed` : "No positions closed"} /><Metric label="Net P&L" value={summary.closed ? formatCurrency(summary.pnl) : "—"} detail={summary.closed ? `${summary.wins}/${summary.closed} profitable exits` : "Awaiting closed trades"} tone={summary.pnl > 0 ? "positive" : summary.pnl < 0 ? "negative" : "neutral"} /><Metric label="Journal score" value={entry.rating ? `${entry.rating}/5` : "—"} detail={entry.rating ? "Session self-assessment" : "Rate your process below"} /></div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section className="rounded-lg border border-zinc-900 bg-zinc-950/70 shadow-sm"><div className="flex flex-col gap-4 border-b border-zinc-900 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-black text-zinc-400"><ClipboardList size={17} /></div><div><h2 className="font-mono text-sm font-semibold text-zinc-200">{prettyDate}</h2><p className="mt-0.5 text-xs text-zinc-500">Daily session record</p></div></div>{entry.updatedAt && <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">Saved {new Date(entry.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>}</div>
          <div className="space-y-6 p-5"><div><label className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Primary focus</label><div className="mt-3 flex flex-wrap gap-2">{focusOptions.map((option) => <button key={option} onClick={() => setEntry((current) => ({ ...current, focus: option }))} className={`rounded-md border px-3 py-1.5 font-mono text-xs transition ${entry.focus === option ? "border-zinc-500 bg-zinc-800 text-white" : "border-zinc-800 bg-black text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"}`}>{option}</button>)}</div></div><div><label htmlFor="reflection" className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Session reflection</label><textarea id="reflection" value={entry.reflection} onChange={(event) => setEntry((current) => ({ ...current, reflection: event.target.value }))} placeholder="What did you see? What did you execute well? What deserves adjustment next session?" className="mt-3 min-h-56 w-full resize-y rounded-md border border-zinc-800 bg-black p-4 text-sm leading-6 text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-zinc-600" /></div><div className="flex flex-col gap-4 border-t border-zinc-900 pt-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Process rating</p><div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} onClick={() => setEntry((current) => ({ ...current, rating }))} aria-label={`Rate session ${rating} of 5`} className={`h-7 w-7 rounded border font-mono text-xs transition ${rating <= entry.rating ? "border-zinc-400 bg-zinc-200 text-black" : "border-zinc-800 bg-black text-zinc-600 hover:border-zinc-700"}`}>{rating}</button>)}</div></div><button onClick={saveEntry} className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white active:scale-[0.98]"><Save size={15} />{saved ? "Saved" : "Save entry"}</button></div></div>
        </section>
        <aside className="space-y-4"><section className="rounded-lg border border-zinc-900 bg-zinc-950/70 p-5"><div className="flex items-center gap-2 text-zinc-300"><Target size={16} /><h2 className="font-mono text-xs font-semibold uppercase tracking-widest">Session snapshot</h2></div><div className="mt-5 space-y-3 font-mono text-xs"><SnapshotRow label="Account" value={selectedAccount?.name ?? "Personal journal"} /><SnapshotRow label="Focus" value={entry.focus} /><SnapshotRow label="Win rate" value={summary.closed ? `${Math.round((summary.wins / summary.closed) * 100)}%` : "—"} /><SnapshotRow label="Status" value={loading.fetchTrades ? "Syncing trades" : "Ready"} /></div></section><section className="rounded-lg border border-zinc-900 bg-zinc-950/70 p-5"><h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-400">Recorded executions</h2>{dayTrades.length === 0 ? <p className="mt-4 text-sm leading-6 text-zinc-600">No trades are attached to this date. Use this space to prepare or review your process.</p> : <div className="mt-4 divide-y divide-zinc-900">{dayTrades.slice(0, 5).map((trade: Record<string, unknown>, index: number) => { const pnl = Number(trade.profit_loss ?? 0); return <div key={String(trade.id ?? index)} className="flex items-center justify-between py-3"><div><p className="font-mono text-xs font-semibold text-zinc-300">{String(trade.currency_pair ?? "Untitled trade")}</p><p className="mt-1 font-mono text-[10px] uppercase text-zinc-600">{String(trade.trade_type ?? "Trade")} · {String(trade.status ?? "open")}</p></div><span className={`font-mono text-xs ${pnl > 0 ? "text-emerald-400" : pnl < 0 ? "text-rose-400" : "text-zinc-500"}`}>{String(trade.status).toLowerCase() === "closed" ? formatCurrency(pnl) : "Open"}</span></div>; })}</div>}</section></aside>
      </div>
    </main>
  </div>;
}

function Metric({ label, value, detail, tone = "neutral" }: { label: string; value: string; detail: string; tone?: "positive" | "negative" | "neutral" }) {
  const valueTone = tone === "positive" ? "text-emerald-400" : tone === "negative" ? "text-rose-400" : "text-zinc-100";
  return <div className="rounded-lg border border-zinc-900 bg-zinc-950/70 p-4"><p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{label}</p><p className={`mt-2 font-mono text-xl font-semibold ${valueTone}`}>{value}</p><p className="mt-1 text-xs text-zinc-600">{detail}</p></div>;
}

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4"><span className="text-zinc-600">{label}</span><span className="max-w-44 truncate text-right text-zinc-300">{value}</span></div>;
}
