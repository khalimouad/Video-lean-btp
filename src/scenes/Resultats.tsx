import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

const STATS = [
  { emoji: "📉", label: "Réduction des retards de livraison",  value: 25, prefix: "-", color: "#22c55e",  start: 40  },
  { emoji: "📉", label: "Réduction des coûts de construction",  value: 20, prefix: "-", color: "#3b82f6",  start: 105 },
  { emoji: "📈", label: "Gain de productivité sur le terrain",  value: 30, prefix: "+", color: "#f97316",  start: 170 },
];

const StatBlock: React.FC<{ s: (typeof STATS)[0] }> = ({ s }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op    = interpolate(frame, [s.start, s.start + 22], [0, 1], clamp);
  const y     = interpolate(frame, [s.start, s.start + 22], [40, 0], clamp);
  const count = Math.round(interpolate(frame, [s.start + 18, s.start + 72], [0, s.value], clamp));
  const barW  = interpolate(frame, [s.start + 18, s.start + 80], [0, s.value * 3], clamp); // max 90%

  const glowScale = spring({ fps, frame: Math.max(0, frame - (s.start + 18)), config: { stiffness: 60, damping: 14 }, durationInFrames: 40 });

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px)`,
        marginBottom: 32,
      }}
    >
      {/* Stat row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 36 }}>{s.emoji}</span>
          <span style={{ color: C.white, fontSize: 22, fontWeight: 600 }}>{s.label}</span>
        </div>

        {/* Counter */}
        <div
          style={{
            color: s.color,
            fontSize: 72,
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
            transform: `scale(${glowScale})`,
            transformOrigin: "right center",
            textShadow: `0 0 40px ${s.color}88`,
          }}
        >
          {s.prefix}{count}%
        </div>
      </div>

      {/* Animated bar */}
      <div
        style={{
          height: 18,
          background: `${s.color}1a`,
          borderRadius: 9,
          overflow: "hidden",
          border: `1px solid ${s.color}44`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barW}%`,
            background: `linear-gradient(90deg, ${s.color}66, ${s.color})`,
            borderRadius: 9,
            boxShadow: `0 0 20px ${s.color}88`,
          }}
        />
      </div>
    </div>
  );
};

export const ResultatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 278, 300], [0, 1, 1, 0], clamp);

  const conclusionOp = interpolate(frame, [240, 265], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #0c1a0e 100%)`,
        padding: "0 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 60% 50%, ${C.green}0c 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          color: C.green,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: interpolate(frame, [5, 25], [0, 1], clamp),
        }}
      >
        Résultats mesurés
      </div>

      <div
        style={{
          color: C.white,
          fontSize: 52,
          fontWeight: 900,
          marginBottom: 52,
          opacity: interpolate(frame, [5, 28], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [5, 28], [28, 0], clamp)}px)`,
        }}
      >
        Le Lean Six Sigma transforme vos chantiers
      </div>

      {STATS.map((s, i) => (
        <StatBlock key={i} s={s} />
      ))}

      {/* Closing line */}
      <div
        style={{
          opacity: conclusionOp,
          marginTop: 24,
          padding: "18px 28px",
          background: `linear-gradient(90deg, ${C.orange}18, ${C.purple}18)`,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          color: C.text,
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        🏗️ Le Lean Six Sigma transforme les chantiers en systèmes{" "}
        <span style={{ color: C.orange }}>prévisibles</span>,{" "}
        <span style={{ color: C.blue }}>collaboratifs</span> et{" "}
        <span style={{ color: C.green }}>performants</span>.
      </div>
    </AbsoluteFill>
  );
};
