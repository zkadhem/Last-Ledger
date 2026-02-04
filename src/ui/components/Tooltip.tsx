import React from "react";

export function Tooltip(props: { title: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {props.children}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl bg-slate-900/95 p-3 text-xs text-slate-200 opacity-0 shadow-soft ring-1 ring-slate-700 transition group-hover:opacity-100">
        {props.title}
      </span>
    </span>
  );
}
