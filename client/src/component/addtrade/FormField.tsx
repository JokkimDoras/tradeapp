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
    <div className="flex flex-col gap-1.5 select-none antialiased">
      <label className="text-[12px] font-medium text-zinc-400 tracking-tight">
        {label}
      </label>

      {children}
    </div>
  );
}