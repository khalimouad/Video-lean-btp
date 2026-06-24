import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Accroche } from "./scenes/Accroche";
import { ConstatBTP } from "./scenes/ConstatBTP";
import { AvantChantier } from "./scenes/AvantChantier";
import { DMAICScene } from "./scenes/DMAIC";
import { OutilsLean } from "./scenes/OutilsLean";
import { ApresChantier } from "./scenes/ApresChantier";
import { ResultatsAvantApres } from "./scenes/ResultatsAvantApres";
import { Conclusion } from "./scenes/Conclusion";

// 5 minutes 45 secondes — 10 350 frames @ 30 fps
// Scène 1 — Accroche           :  0    –  600   (20 s)
// Scène 2 — Constat BTP        :  600  – 1 950  (45 s)
// Scène 3 — AVANT le chantier  : 1 950 – 4 050  (70 s)
// Scène 4 — DMAIC              : 4 050 – 5 850  (60 s)
// Scène 5 — Outils Lean        : 5 850 – 7 650  (60 s)
// Scène 6 — APRÈS le chantier  : 7 650 – 8 700  (35 s)
// Scène 7 — Résultats KPI      : 8 700 – 9 750  (35 s)
// Scène 8 — Conclusion         : 9 750 – 10 350 (20 s)

export const LeanSixSigmaVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0a0f1e" }}>
    <Sequence from={0}    durationInFrames={600}>  <Accroche />          </Sequence>
    <Sequence from={600}  durationInFrames={1350}> <ConstatBTP />        </Sequence>
    <Sequence from={1950} durationInFrames={2100}> <AvantChantier />     </Sequence>
    <Sequence from={4050} durationInFrames={1800}> <DMAICScene />        </Sequence>
    <Sequence from={5850} durationInFrames={1800}> <OutilsLean />        </Sequence>
    <Sequence from={7650} durationInFrames={1050}> <ApresChantier />     </Sequence>
    <Sequence from={8700} durationInFrames={1050}> <ResultatsAvantApres /></Sequence>
    <Sequence from={9750} durationInFrames={600}>  <Conclusion />        </Sequence>
  </AbsoluteFill>
);
