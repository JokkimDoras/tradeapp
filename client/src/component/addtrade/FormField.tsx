import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export default function FormField({
  label,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 select-none antialiased">
      <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </label>

      {children}
    </div>
  );
}
