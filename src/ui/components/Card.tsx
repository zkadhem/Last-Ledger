import React from "react";
import clsx from "clsx";

export function Card(props: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("glass rounded-2xl p-4 shadow-soft", props.className)}>
      {props.children}
    </div>
  );
}
