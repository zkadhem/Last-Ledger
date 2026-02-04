import React from "react";
import { Card } from "../components/Card";
import type { EventCard as E } from "../../types";

export function EventCard(props: { event?: E }) {
  return (
    <Card>
      <div className="text-sm font-semibold">This Week’s Event</div>
      {!props.event ? (
        <div className="mt-2 text-xs text-slate-400">No event yet. Start the week.</div>
      ) : (
        <>
          <div className="mt-2 text-sm font-semibold text-indigo-200">{props.event.title}</div>
          <div className="mt-1 text-xs text-slate-300">{props.event.body}</div>
          <div className="mt-2 text-[11px] text-slate-400">
            Effects apply automatically at week start.
          </div>
        </>
      )}
    </Card>
  );
}
