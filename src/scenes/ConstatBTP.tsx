import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

const STATS = [
  {
    pct: 57, label: "du temps est improductif", sub: "Gaspillages, attentes et retouches sur les chantiers",
    color: C.orange, icon: "⏳", start: 40,
  },
  {
    pct: 30, label: "de dépassements budgétaires", sub: "En moyenne sur les projets de construction",
    color: C.blue,   icon: "💰", start: 370,
  },
  {
    pct: 20, label: "des projets livrés en retard", sub: "Manque de coordination et de planification efficace",
    color: C.purple, icon: "📅", start: 700,
  },
  {
    pct: 40, label: "de temps à valeur non ajoutée", sub: "Selon Glenn Ballard — fondateur du Lean Construction",
    color: "#ef4444", icon: "📉", start: 1030,
  },
];

const StatCard: React.FC<{ s: (typeof STATS)[0] }> = ({ s }) => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op    = interpolate(frame, [s.start, s.start + 25], [0, 1], cl);
  const x     = interpolate(frame, [s.start, s.start + 25], [-100, 0], cl);
  const count = Math.round(interpolate(frame, [s.start + 20, s.start + 80], [0, s.pct], cl));

  return (
    <div style={{
      opacity: op, transform: `translateX(${x}px)`,
      display: "flex", alignItems: "center", gap: 28,
      padding: "22px 36px",
      background: C.bgCard,
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      borderLeft: `5px solid ${s.color}`,
      marginBottom: 18,
    }}>
      <div style={{
        width: 66, height: 66, borderRadius: "50%",
        background: `${s.color}22`, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontSize: 32, flexShrink: 0,
      }}>{s.icon}</div>

      <div style={{ color: s.color, fontSize: 62, fontWeight: 900, minWidth: 130, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {count}%
      </div>

      <div>
        <div style={{ color: C.white, fontSize: 22, fontWeight: 700 }}>{s.label}</div>
        <div style={{ color: C.gray, fontSize: 16, marginTop: 4 }}>{s.sub}</div>
      </div>
    </div>
  );
};

export const ConstatBTP: React.FC = () => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 1320, 1350], [0, 1, 1, 0], cl);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #0a0f1e 0%, #1a0f2e 100%)",
      padding: "0 130px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      opacity: sceneOp, fontFamily: F,
    }}>
      <div style={{ color: C.orange, fontSize: 14, fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase", marginBottom: 14, opacity: interpolate(frame, [5, 25], [0, 1], cl) }}>
        Le constat
      </div>
      <div style={{
        color: C.white, fontSize: 50, fontWeight: 900, marginBottom: 48,
        opacity: interpolate(frame, [5, 30], [0, 1], cl),
        transform: `translateY(${interpolate(frame, [5, 30], [28, 0], cl)}px)`,
      }}>
        Le secteur BTP face à ses défis
      </div>
      {STATS.map((s, i) => <StatCard key={i} s={s} />)}
    </AbsoluteFill>
  );
};
