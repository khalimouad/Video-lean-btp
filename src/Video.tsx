import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Intro } from "./scenes/Intro";
import { Probleme } from "./scenes/Probleme";
import { HuitGaspillages } from "./scenes/HuitGaspillages";
import { DMAICScene } from "./scenes/DMAIC";
import { OutilsScene } from "./scenes/Outils";
import { ResultatsScene } from "./scenes/Resultats";

// 90 secondes @ 30fps = 2700 frames
// Scène 1 — Intro:           0    – 300   (10s)
// Scène 2 — Problèmes BTP:   300  – 750   (15s)
// Scène 3 — 8 Gaspillages:   750  – 1350  (20s)
// Scène 4 — DMAIC:           1350 – 1950  (20s)
// Scène 5 — Outils:          1950 – 2400  (15s)
// Scène 6 — Résultats:       2400 – 2700  (10s)

export const LeanSixSigmaVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0a0f1e" }}>
    <Sequence from={0} durationInFrames={300}>
      <Intro />
    </Sequence>
    <Sequence from={300} durationInFrames={450}>
      <Probleme />
    </Sequence>
    <Sequence from={750} durationInFrames={600}>
      <HuitGaspillages />
    </Sequence>
    <Sequence from={1350} durationInFrames={600}>
      <DMAICScene />
    </Sequence>
    <Sequence from={1950} durationInFrames={450}>
      <OutilsScene />
    </Sequence>
    <Sequence from={2400} durationInFrames={300}>
      <ResultatsScene />
    </Sequence>
  </AbsoluteFill>
);
