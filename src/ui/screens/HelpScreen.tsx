import React from "react";
import { Card } from "../components/Card";
import { useGameStore } from "../../store/useGameStore";

export function HelpScreen() {
  const go = useGameStore(s => s.go);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Header */}
      <Card className="md:col-span-2" ornate>
        <div className="text-center py-4">
          <div className="text-4xl mb-3">📜</div>
          <h1 className="font-display text-2xl font-bold text-gold-400 tracking-wide">
            The Royal Codex
          </h1>
          <p className="mt-3 text-sm text-parchment-300 font-body max-w-2xl mx-auto">
            A guide for the aspiring Royal Accountant. Master these principles to extend thy reign.
          </p>
        </div>
      </Card>

      {/* Core Concept */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⚖️</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">The Art of Ledger-Keeping</h2>
        </div>
        <div className="space-y-3 text-sm text-parchment-300 font-body leading-relaxed">
          <p>
            Thou art not a warrior, nor a mage, nor a diplomat. Thou art an <span className="text-gold-400 font-semibold">accountant</span>. 
            Thy power lies in approving budgets, securing loans, and occasionally... creative bookkeeping.
          </p>
          <p>
            Each reign lasts <span className="text-gold-400 font-semibold">52 weeks</span>. Survive them all to achieve victory. 
            Fail through bankruptcy, collapse, or coup, and thy name shall be forgotten.
          </p>
          <p>
            Every decision is seeded—share thy royal seal to let others experience thy exact reign.
          </p>
        </div>
      </Card>

      {/* Stats Explanation */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📊</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Kingdom Statistics</h2>
        </div>
        <div className="space-y-3">
          {[
            { icon: "💰", name: "Treasury", desc: "Thy gold reserves. Below -200 means bankruptcy." },
            { icon: "📜", name: "Debt", desc: "Loans accrue 3% weekly interest. Above 1400 triggers spiral." },
            { icon: "⚖️", name: "Stability", desc: "Social order. Reaching 0 causes realm collapse." },
            { icon: "🐀", name: "Corruption", desc: "Rot within. Increases income but damages stability." },
            { icon: "📈", name: "Inflation", desc: "Currency debasement. Reduces tax income over time." },
            { icon: "⚔️", name: "Coup Risk", desc: "Likelihood of overthrow. At 50%+, the dice are cast." }
          ].map(stat => (
            <div key={stat.name} className="scroll-panel rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="font-display font-semibold text-parchment-200">{stat.name}</span>
              </div>
              <p className="text-xs text-parchment-400 pl-6">{stat.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Factions */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⚜️</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">The Five Factions</h2>
        </div>
        <div className="space-y-3">
          {[
            { icon: "🌾", name: "Peasants", desc: "The common folk. Low loyalty breeds unrest." },
            { icon: "🏰", name: "Nobles", desc: "The aristocracy. They fund armies and expect favors." },
            { icon: "🔮", name: "Mages", desc: "Wielders of arcane power. Expensive but powerful." },
            { icon: "⚔️", name: "Army", desc: "The military. Essential for stability and coups." },
            { icon: "🗡️", name: "Underworld", desc: "Thieves and spies. Useful for dirty work." }
          ].map(faction => (
            <div key={faction.name} className="scroll-panel rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>{faction.icon}</span>
                <span className="font-display font-semibold text-parchment-200">{faction.name}</span>
              </div>
              <p className="text-xs text-parchment-400 pl-6">{faction.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-parchment-500 font-body italic">
          ⚠️ Faction loyalty decays weekly. Approve their petitions or bribe them to maintain order.
        </p>
      </Card>

      {/* Actions */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🎭</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Dark Arts Available</h2>
        </div>
        <div className="space-y-3 text-sm text-parchment-300 font-body">
          <div className="request-card rounded-lg p-3">
            <span className="font-display font-semibold text-parchment-200">💰 Secure a Loan</span>
            <p className="text-xs text-parchment-400 mt-1">Instant gold, but debt accrues interest and increases coup risk.</p>
          </div>
          <div className="request-card rounded-lg p-3">
            <span className="font-display font-semibold text-parchment-200">🔥 Debase Currency</span>
            <p className="text-xs text-parchment-400 mt-1">Print money. Causes inflation and corruption.</p>
          </div>
          <div className="request-card rounded-lg p-3">
            <span className="font-display font-semibold text-parchment-200">🤫 Embezzle Funds</span>
            <p className="text-xs text-parchment-400 mt-1">Steal from the treasury. Highly corrupt and risky.</p>
          </div>
          <div className="request-card rounded-lg p-3">
            <span className="font-display font-semibold text-parchment-200">🏗️ Public Works</span>
            <p className="text-xs text-parchment-400 mt-1">Invest now for stability and future returns.</p>
          </div>
          <div className="request-card rounded-lg p-3">
            <span className="font-display font-semibold text-parchment-200">🎁 Bribe a Faction</span>
            <p className="text-xs text-parchment-400 mt-1">Buy loyalty directly. Increases corruption.</p>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💡</span>
          <h2 className="font-display text-lg font-semibold text-gold-400">Words of Wisdom</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Balance is key. A rich kingdom with no stability will crumble.",
            "Debt is a tool, not a trap—unless it exceeds 1400 gold.",
            "Coups only trigger when risk reaches 50%. Keep it below.",
            "Denying petitions damages faction loyalty. Choose wisely.",
            "Edicts (policies) can dramatically alter thy strategy.",
            "Story events offer risk and reward. Fortune favors the bold.",
            "Corruption boosts income but erodes stability over time.",
            "Inflation reduces tax revenue. Avoid excessive currency debasement."
          ].map((tip, i) => (
            <div key={i} className="scroll-panel rounded-lg p-3 flex items-start gap-2">
              <span className="text-gold-500">⚜️</span>
              <p className="text-sm text-parchment-300 font-body">{tip}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button
            className="gold-btn rounded-lg px-8 py-3 font-display font-semibold text-parchment-900"
            onClick={() => go("title")}
          >
            ← Return to the Hall
          </button>
        </div>
      </Card>
    </div>
  );
}
