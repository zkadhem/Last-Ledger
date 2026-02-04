import React from "react";
import { motion } from "framer-motion";

export function Modal(props: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!props.open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
      <motion.div
        initial={{ y: 10, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0, scale: 0.98 }}
        className="glass w-full max-w-xl rounded-2xl p-4 shadow-soft"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold">{props.title}</div>
          <button
            onClick={props.onClose}
            className="rounded-lg px-2 py-1 text-xs ring-1 ring-slate-700 hover:bg-slate-900/60"
          >
            Close
          </button>
        </div>
        <div className="mt-3">{props.children}</div>
      </motion.div>
    </div>
  );
}
