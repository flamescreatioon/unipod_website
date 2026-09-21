import React from "react";

export default function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow mb-5 flex items-center gap-[9px] font-mono text-[11px] uppercase tracking-[.08em] ${light ? "text-white" : "text-blue"}`}>
      <span className="inline-block h-px w-[18px] bg-current" />
      {children}
    </p>
  );
}
