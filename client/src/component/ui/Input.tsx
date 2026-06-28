import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        onWheel={(e) => e.currentTarget.blur()}
        className={`w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-md px-3 py-2 text-[13px] font-mono text-zinc-100 placeholder-zinc-800 focus:outline-none transition-colors duration-150 shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
      />
    </div>
  );
}