import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

// Storyboard Plan 6 (2:22–2:45) — KPIs animés avant/après
const KPIS = [
  { label: "Cycle d'un niveau",    unit: "jours",  avant: 12, apres: 8,  gain: "-33%", start: 35  },
  { label: "Valeur ajoutée",       unit: "%",      avant: 25, apres: 50, gain: "×2",   start: 250 },
  { label: "Temps d'attente",      unit: "%",      avant: 35, apres: 15, gain: "-57%", start: 465 },
  { label: "Taux de reprises",     unit: "%",      avant: 8,  apres: 2,  gain: "-75%", start: 680 },
  { label: "Planning tenu (PPC)",  unit: "%",      avant: 54, apres: 86, gain: "+59%", start: 895 },
];

const KpiRow: React.FC<{ k: (typeof KPIS)[0] }> = ({ k }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const rowOp   = interpolate(frame, [k.start, k.start + 22], [0, 1], cl);
  const rowY    = interpolate(frame, [k.start, k.start + 22], [24, 0], cl);

  // Avant counter stays at avant value until transition, then transitions to apres
  const transStart = k.start + 55;
  const avantVal = Math.round(interpolate(frame, [k.start + 20, k.start + 55], [0, k.avant], cl));
  const apresVal = Math.round(interpolate(frame, [transStart, transStart + 60], [k.avant, k.apres], cl));

  // Arrow animation
  const arrowSc = spring({ fps, frame: Math.max(0, frame - transStart), config: { stiffness: 120, damping: 10 }, durationInFrames: 25 });

  const isPositive = k.apres > k.avant;
  const gainColor  = isPositive ? C.green : "#ef4444";

  return (
    <div style={{
      opacity: rowOp, transform: `translateY(${rowY}px)`,
      display: "grid",
      gridTemplateColumns: "260px 1fr 60px 1fr 90px",
      alignItems: "center", gap: 16,
      padding: "16px 20px",
      background: C.bgCard,
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      marginBottom: 12,
    }}>
      {/* Label */}
      <div style={{ color: C.white, fontSize: 17, fontWeight: 700 }}>{k.label}</div>

      {/* Avant */}
      <div style={{
        textAlign: "center", padding: "10px 14px",
        background: "rgba(239,68,68,0.12)",
        border: "1px solid rgba(239,68,68,0.4)",
        borderRadius: 10,
      }}>
        <div style={{ color: C.gray, fontSize: 11, fontWeight: 700, letterSpacing: "2px", marginBottom: 2 }}>AVANT</div>
        <div style={{ color: "#ef4444", fontSize: 30, fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>
          {frame < transStart ? avantVal : k.avant}{k.unit === "jours" ? " j" : "%"}
        </div>
      </div>

      {/* Arrow */}
      <div style={{ textAlign: "center", transform: `scale(${arrowSc})`, fontSize: 26, color: gainColor }}>→</div>

      {/* Après */}
      <div style={{
        textAlign: "center", padding: "10px 14px",
        background: "rgba(34,197,94,0.12)",
        border: "1px solid rgba(34,197,94,0.4)",
        borderRadius: 10,
      }}>
        <div style={{ color: C.gray, fontSize: 11, fontWeight: 700, letterSpacing: "2px", marginBottom: 2 }}>APRÈS</div>
        <div style={{ color: C.green, fontSize: 30, fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>
          {apresVal}{k.unit === "jours" ? " j" : "%"}
        </div>
      </div>

      {/* Gain badge */}
      <div style={{
        textAlign: "center", padding: "8px 12px",
        background: `${gainColor}20`,
        border: `1px solid ${gainColor}66`,
        borderRadius: 10,
        color: gainColor, fontSize: 20, fontWeight: 900,
      }}>
        {k.gain}
      </div>
    </div>
  );
};

export const ResultatsAvantApres: React.FC = () => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 22, 1020, 1050], [0, 1, 1, 0], cl);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #080e08 0%, #0a1a14 100%)",
      padding: "50px 120px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      opacity: sceneOp, fontFamily: F,
    }}>
      <div style={{ color: C.green, fontSize: 13, fontWeight: 700, letterSpacing: "5px", textTransform: "uppercase", marginBottom: 12, opacity: interpolate(frame, [5, 22], [0, 1], cl) }}>
        Résultats mesurés
      </div>
      <div style={{ color: C.white, fontSize: 46, fontWeight: 900, marginBottom: 36,
        opacity: interpolate(frame, [5, 28], [0, 1], cl),
        transform: `translateY(${interpolate(frame, [5, 28], [24, 0], cl)}px)`,
      }}>
        Les KPIs — Avant / Après Lean Six Sigma
      </div>

      {KPIS.map((k, i) => <KpiRow key={i} k={k} />)}

      {/* Source note */}
      <div style={{ color: C.gray, fontSize: 13, marginTop: 16, opacity: interpolate(frame, [950, 980], [0, 1], cl) }}>
        * Cas pédagogique représentatif — cohérent avec la littérature (Glenn Ballard, Last Planner Institute, OPPBTP)
      </div>
    </AbsoluteFill>
  );
};
