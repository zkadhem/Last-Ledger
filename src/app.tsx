import React from "react";
import { Shell } from "./ui/layout/Shell";
import { TitleScreen } from "./ui/screens/TitleScreen";
import { MetaScreen } from "./ui/screens/MetaScreen";
import { RunScreen } from "./ui/screens/RunScreen";
import { GameOverScreen } from "./ui/screens/GameOverScreen";
import { HelpScreen } from "./ui/screens/HelpScreen";
import { Toasts } from "./ui/components/Toasts";
import { EffectPopup } from "./ui/components/EffectPopup";
import { useGameStore } from "./store/useGameStore";

export function App() {
  const screen = useGameStore(s => s.screen);

  return (
    <Shell>
      {screen === "title" && <TitleScreen />}
      {screen === "meta" && <MetaScreen />}
      {screen === "run" && <RunScreen />}
      {screen === "gameover" && <GameOverScreen />}
      {screen === "help" && <HelpScreen />}
      <Toasts />
      <EffectPopup />
    </Shell>
  );
}
