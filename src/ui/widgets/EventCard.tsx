import React from "react";
import { Card } from "../components/Card";
import type { EventCard as E } from "../../types";

export function EventCard(props: { event?: E }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">📰</span>
        <h3 className="font-display text-lg font-semibold text-gold-400">Herald's Report</h3>
      </div>
      
      {!props.event ? (
        <div className="scroll-panel rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🕯️</div>
          <p className="text-sm text-parchment-400 font-body italic">
            The herald awaits. Begin the week to receive tidings.
          </p>
        </div>
      ) : (
        <div className="scroll-panel rounded-lg p-4">
          <h4 className="font-display font-semibold text-parchment-200 text-base">
            {props.event.title}
          </h4>
          <p className="mt-2 text-sm text-parchment-400 font-body leading-relaxed">
            {props.event.body}
          </p>
          <div className="mt-3 pt-3 border-t border-parchment-800/30">
            <p className="text-[11px] text-parchment-500 font-body italic flex items-center gap-1">
              <span>⚡</span> Effects applied upon the week's commencement.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
