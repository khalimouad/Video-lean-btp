import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Intro } from "./scenes/Intro";
import { Probleme } from "./scenes/Probleme";
import { LeanConstruction } from "./scenes/LeanConstruction";
import { DMAICScene } from "./scenes/DMAIC";
import { OutilsScene } from "./scenes/Outils";
import { ResultatsScene } from "./scenes/Resultats";
import { ConclusionScene } from "./scenes/Conclusion";

// Total: 1800 frames = 60 seconds @ 30fps
// 0    – 90   : Intro            (3s)
// 90   – 360  : Le Problème      (9s)
// 360  – 600  : Lean Construction (8s)
// 600  – 930  : DMAIC            (11s)
// 930  – 1320 : Outils           (13s)
// 1320 – 1590 : Résultats        (9s)
// 1590 – 1800 : Conclusion       (7s)

export const LeanSixSigmaVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0a0f1e" }}>
    <Sequence from={0} durationInFrames={90}>
      <Intro />
    </Sequence>
    <Sequence from={90} durationInFrames={270}>
      <Probleme />
    </Sequence>
    <Sequence from={360} durationInFrames={240}>
      <LeanConstruction />
    </Sequence>
    <Sequence from={600} durationInFrames={330}>
      <DMAICScene />
    </Sequence>
    <Sequence from={930} durationInFrames={390}>
      <OutilsScene />
    </Sequence>
    <Sequence from={1320} durationInFrames={270}>
      <ResultatsScene />
    </Sequence>
    <Sequence from={1590} durationInFrames={210}>
      <ConclusionScene />
    </Sequence>
  </AbsoluteFill>
);
