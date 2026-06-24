import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

// Storyboard Plan 5 (1:58–2:22) — "Le chantier APRÈS"
const GAINS = [
  { icon: "✅", text: "Les corps de métier s'enchaînent sans rupture", color: C.green, start: 80 },
  { icon: "🧹", text: "Zones propres, circulation dégagée, tout est à sa place", color: "#22c55e", start: 160 },
  { icon: "🤝", text: "Les équipes ne s'attendent plus — flux synchronisé", color: "#3b82f6", start: 240 },
  { icon: "📉", text: "Les reprises deviennent rares — qualité du premier coup", color: "#a855f7", start: 320 },
  { icon: "📅", text: "Le planning est tenu à 86% — objectif >80% atteint", color: "#f59e0b", start: 400 },
];

export const ApresChantier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp = interpolate(frame, [0, 22, 1020, 1050], [0, 1, 1, 0], cl);

  // Big quote spring
  const quoteSc = spring({ fps, frame: Math.max(0, frame - 18), config: { stiffness: 80, damping: 13 }, durationInFrames: 38 });

  const line1Op = interpolate(frame, [15, 42], [0, 1], cl);
  const line1Y  = interpolate(frame, [15, 42], [48, 0], cl);
  const line2Op = interpolate(frame, [38, 62], [0, 1], cl);
  const lineW   = interpolate(frame, [55, 88], [0, 800], cl);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #081408 0%, #0a1e0a 100%)",
      display: "flex", flexDirection: "row",
      alignItems: "stretch",
      opacity: sceneOp, fontFamily: F,
    }}>
      {/* Left: APRÈS badge + message */}
      <div style={{ flex: 1, padding: "60px 70px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 20,
          opacity: interpolate(frame, [5, 25], [0, 1], cl),
        }}>
          <div style={{ background: C.green, color: "#fff", fontSize: 13, fontWeight: 900, letterSpacing: "4px", padding: "6px 20px", borderRadius: 20 }}>APRÈS</div>
          <div style={{ color: C.green, fontSize: 14, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>
            Le chantier transformé
          </div>
        </div>

        <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px) scale(${quoteSc})`, marginBottom: 8 }}>
          <div style={{ color: C.white, fontSize: 52, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1 }}>
            Même chantier.
          </div>
        </div>
        <div style={{ opacity: line2Op, marginBottom: 20 }}>
          <div style={{ color: C.green, fontSize: 46, fontWeight: 900, lineHeight: 1.1 }}>
            Même équipe.
          </div>
          <div style={{ color: C.gray, fontSize: 36, fontWeight: 600 }}>
            Autre organisation.
          </div>
        </div>

        {/* Gradient line */}
        <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg,${C.green},${C.blue})`, borderRadius: 2, marginBottom: 36 }} />

        {/* Italic quote from storyboard */}
        <div style={{ opacity: interpolate(frame, [70, 100], [0, 1], cl), color: C.gray, fontSize: 19, fontStyle: "italic", lineHeight: 1.6, borderLeft: `3px solid ${C.green}`, paddingLeft: 20 }}>
          "Quelques semaines plus tard, le même chantier respire. Les tâches s'enchaînent, les équipes ne s'attendent plus, les reprises deviennent rares. Rien de magique : juste une organisation pensée autour du flux et des personnes."
        </div>
      </div>

      {/* Right: Gain list */}
      <div style={{ width: 520, background: "rgba(34,197,94,0.05)", borderLeft: `1px solid ${C.green}33`, padding: "60px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ color: C.green, fontSize: 13, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 24, opacity: interpolate(frame, [30, 50], [0, 1], cl) }}>
          Ce qui change concrètement
        </div>
        {GAINS.map((g, i) => {
          const op = interpolate(frame, [g.start, g.start + 25], [0, 1], cl);
          const x  = interpolate(frame, [g.start, g.start + 25], [40, 0], cl);
          return (
            <div key={i} style={{
              opacity: op, transform: `translateX(${x}px)`,
              display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
              padding: "16px 20px",
              background: `${g.color}0e`,
              borderRadius: 12, border: `1px solid ${g.color}33`,
            }}>
              <span style={{ fontSize: 26 }}>{g.icon}</span>
              <span style={{ color: C.white, fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}>{g.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
