import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

// Storyboard Plan 7 (2:45–3:05) — Conclusion & call-to-action
const PILLARS = [
  { icon: "🔍", label: "Diagnostic", desc: "Observez, mesurez, ne présumez pas.", color: "#3b82f6", start: 160 },
  { icon: "🤝", label: "Collaboration", desc: "Le terrain sait — impliquez-le.", color: "#22c55e", start: 240 },
  { icon: "📈", label: "Amélioration", desc: "Petits gains répétés = grande transformation.", color: "#f97316", start: 320 },
  { icon: "🔄", label: "Pérennisation", desc: "Standardisez ce qui fonctionne, ancrez la culture.", color: "#a855f7", start: 400 },
];

export const Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp = interpolate(frame, [0, 22, 560, 600], [0, 1, 1, 0], cl);

  const titleSc = spring({ fps, frame: Math.max(0, frame - 15), config: { stiffness: 80, damping: 13 }, durationInFrames: 40 });

  const line1Op = interpolate(frame, [15, 45], [0, 1], cl);
  const line1Y  = interpolate(frame, [15, 45], [40, 0], cl);
  const line2Op = interpolate(frame, [35, 62], [0, 1], cl);
  const line2Y  = interpolate(frame, [35, 62], [30, 0], cl);
  const quoteOp = interpolate(frame, [75, 105], [0, 1], cl);
  const lineW   = interpolate(frame, [60, 100], [0, 900], cl);

  // "Commencer maintenant" CTA fade-in late
  const ctaOp = interpolate(frame, [480, 520], [0, 1], cl);
  const ctaY  = interpolate(frame, [480, 520], [28, 0], cl);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #0a0f1e 0%, #1a0a2e 50%, #0f1a0a 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 140px",
      opacity: sceneOp, fontFamily: F,
      textAlign: "center",
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 50% 40%, ${C.green}0e 0%, transparent 60%)`,
      }} />

      {/* Badge */}
      <div style={{ opacity: interpolate(frame, [5, 22], [0, 1], cl), marginBottom: 20 }}>
        <span style={{ background: C.green, color: "#fff", fontSize: 12, fontWeight: 900, letterSpacing: "5px", padding: "6px 24px", borderRadius: 20 }}>
          CONCLUSION
        </span>
      </div>

      {/* Main headline */}
      <div style={{ opacity: line1Op, transform: `translateY(${line1Y}px) scale(${titleSc})`, marginBottom: 6 }}>
        <div style={{ color: C.white, fontSize: 68, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05 }}>
          Le Lean n'est pas une
        </div>
      </div>
      <div style={{ opacity: line2Op, transform: `translateY(${line2Y}px)`, marginBottom: 28 }}>
        <div style={{ color: C.green, fontSize: 68, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05 }}>
          boîte à outils.
        </div>
      </div>

      {/* Gradient line */}
      <div style={{
        width: lineW, height: 4,
        background: `linear-gradient(90deg, ${C.green}, ${C.blue})`,
        borderRadius: 2, marginBottom: 32,
      }} />

      {/* Storyboard quote */}
      <div style={{
        opacity: quoteOp, maxWidth: 900, marginBottom: 44,
        color: C.gray, fontSize: 24, lineHeight: 1.65, fontStyle: "italic",
        borderLeft: `3px solid ${C.green}`, paddingLeft: 24, textAlign: "left",
      }}>
        "C'est une culture d'amélioration continue. Et ça commence sur votre prochain chantier."
      </div>

      {/* 4 pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 18, width: "100%", marginBottom: 40 }}>
        {PILLARS.map((p) => {
          const op = interpolate(frame, [p.start, p.start + 28], [0, 1], cl);
          const y  = interpolate(frame, [p.start, p.start + 28], [32, 0], cl);
          return (
            <div key={p.label} style={{
              opacity: op, transform: `translateY(${y}px)`,
              padding: "22px 20px",
              background: `${p.color}10`,
              border: `1px solid ${p.color}44`,
              borderTop: `3px solid ${p.color}`,
              borderRadius: 14, textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ color: p.color, fontSize: 14, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>{p.label}</div>
              <div style={{ color: C.gray, fontSize: 15, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)` }}>
        <div style={{
          padding: "22px 60px",
          background: `linear-gradient(90deg, ${C.green}, ${C.blue})`,
          borderRadius: 50,
          fontSize: 24, fontWeight: 800, color: "#fff",
          letterSpacing: "0.5px",
          boxShadow: `0 12px 50px ${C.green}44`,
        }}>
          🏗️ Démarrez votre chantier pilote dès demain
        </div>
        <div style={{ color: C.gray, fontSize: 14, marginTop: 18, letterSpacing: "1px" }}>
          Lean Six Sigma · Last Planner System · Amélioration continue en BTP
        </div>
      </div>
    </AbsoluteFill>
  );
};
