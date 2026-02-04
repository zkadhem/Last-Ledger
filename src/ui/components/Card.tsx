import React from "react";
import clsx from "clsx";

export function Card(props: { className?: string; children: React.ReactNode; ornate?: boolean }) {
  return (
    <div className={clsx(
      "parchment rounded-lg p-5 relative",
      props.ornate && "ornate-border",
      props.className
    )}>
      {props.children}
    </div>
  );
}
