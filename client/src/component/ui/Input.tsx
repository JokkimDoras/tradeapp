import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        onWheel={(e) => e.currentTarget.blur()}
        className={`w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2.5 font-mono text-[13px] text-zinc-100 shadow-sm outline-none transition-all duration-150 placeholder:text-zinc-700 hover:border-zinc-700 focus:border-zinc-500 focus:bg-black focus:ring-2 focus:ring-zinc-800/70 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
      />
    </div>
  );
}
