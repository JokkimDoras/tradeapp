import {type ReactNode } from "react";

interface StatCardProps {
  label: string;
  icon: ReactNode;
  value: any;
  isValueColored?: boolean;
  colorClass?: string;
  prefix?: string;
  suffix?: string;
  valueColorOverride?: string;
}

export default function StatCard({
  label,
  icon,
  value,
  isValueColored = false,
  colorClass = "",
  prefix = "",
  suffix = "",
  valueColorOverride = "text-white"
}: StatCardProps) {
  return (
    <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2">
      <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
        {icon} {label}
      </span>
      <span className={`text-2xl font-bold ${isValueColored ? colorClass : valueColorOverride}`}>
        {value != null ? `${prefix}${value}${suffix}` : "—"}
      </span>
    </div>
  );
}