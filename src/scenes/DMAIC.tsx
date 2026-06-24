import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

// Storyboard Plan 3 (0:55–1:18) + Plan 4 (1:18–1:58) — DMAIC
const PHASES = [
  {
    letter: "D", color: "#3b82f6", label: "DÉFINIR",
    title: "Définir le problème",
    desc: "Cartographier la chaîne de valeur (VSM). Identifier le problème précis et les objectifs chiffrés.",
    btp: "Problème : le bétonnage d'un plancher prend 40% de temps en plus que prévu. Objectif : cycle 12j → 8j.",
    window: [55, 390],
  },
  {
    letter: "M", color: "#22c55e", label: "MESURER",
    title: "Mesurer les données réelles",
    desc: "Chronométrer, relever, quantifier. Ne pas deviner — chiffrer les délais, les attentes, les reprises.",
    btp: "Mesure terrain : 3h/jour d'attente béton, 8% du temps en reprises, planning tenu à 54% seulement.",
    window: [390, 750],
  },
  {
    letter: "A", color: "#f97316", label: "ANALYSER",
    title: "Analyser les causes racines",
    desc: "Diagramme d'Ishikawa, 5 Pourquoi. On ne traite pas les symptômes — on remonte à la source.",
    btp: "Cause racine identifiée : manque de coordination entre le fournisseur béton et le chef de chantier.",
    window: [750, 1100],
  },
  {
    letter: "I", color: "#a855f7", label: "INNOVER",
    title: "Innover & améliorer",
    desc: "Déployer les solutions sur le terrain. Last Planner System, 5S, micro-zoning, commande anticipée.",
    btp: "Solution : Last Planner System + commande béton 24h à l'avance via Kanban. Point 15min quotidien.",
    window: [1100, 1440],
  },
  {
    letter: "C", color: "#f59e0b", label: "CONTRÔLER",
    title: "Contrôler & pérenniser",
    desc: "Mesurer les gains, standardiser ce qui fonctionne. Ancrer dans la culture du chantier.",
    btp: "KPI : PPC hebdomadaire — objectif >80% des tâches planifiées complétées. Réunion de rétro.",
    window: [1440, 1760],
  },
];

const R = 195;
const ANGLES = [-90, -18, 54, 126, 198];
const toRad = (d: number) => (d * Math.PI) / 180;
const gp = (a: number) => ({ x: Math.cos(toRad(a)) * R, y: Math.sin(toRad(a)) * R });
const activeIdx = (f: number) => PHASES.reduce((a, p, i) => (f >= p.window[0] ? i : a), -1);

export const DMAICScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 22, 1758, 1800], [0, 1, 1, 0], cl);
  const circSc  = spring({ fps, frame: Math.max(0, frame - 20), config: { stiffness: 90, damping: 14 }, durationInFrames: 35 });
  const active  = activeIdx(frame);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #0a0f1e 0%, #1a0f2e 100%)",
      display: "flex", flexDirection: "row", alignItems: "center",
      justifyContent: "space-between", padding: "60px 90px",
      opacity: sceneOp, fontFamily: F,
    }}>
      {/* LEFT */}
      <div style={{ flex: 1, maxWidth: 660, paddingRight: 40 }}>
        <div style={{ color: C.purple, fontSize: 14, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 12, opacity: interpolate(frame, [5, 25], [0, 1], cl) }}>
          Six Sigma
        </div>
        <div style={{ color: C.white, fontSize: 54, fontWeight: 900, marginBottom: 8, lineHeight: 1, opacity: interpolate(frame, [5, 28], [0, 1], cl), transform: `translateY(${interpolate(frame, [5, 28], [28, 0], cl)}px)` }}>
          Cycle DMAIC
        </div>
        <div style={{ color: C.gray, fontSize: 19, marginBottom: 38, opacity: interpolate(frame, [10, 32], [0, 1], cl) }}>
          Du diagnostic terrain à l'amélioration durable
        </div>

        {/* Active phase card */}
        {active >= 0 && PHASES.map((p, i) => {
          if (i !== active) return null;
          const op = interpolate(frame, [p.window[0], p.window[0] + 22], [0, 1], cl);
          const y  = interpolate(frame, [p.window[0], p.window[0] + 22], [28, 0], cl);
          return (
            <div key={p.letter} style={{ opacity: op, transform: `translateY(${y}px)`, padding: "26px 28px", background: `${p.color}15`, border: `2px solid ${p.color}`, borderRadius: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: p.color, color: "#fff", fontSize: 26, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{p.letter}</div>
                <div>
                  <div style={{ color: p.color, fontSize: 12, fontWeight: 700, letterSpacing: "3px" }}>{p.label}</div>
                  <div style={{ color: C.white, fontSize: 24, fontWeight: 800 }}>{p.title}</div>
                </div>
              </div>
              <div style={{ color: C.gray, fontSize: 17, lineHeight: 1.55, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ padding: "12px 18px", background: `${p.color}0d`, border: `1px solid ${p.color}44`, borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>🏗️</span>
                <span style={{ color: C.text, fontSize: 16, lineHeight: 1.5 }}>{p.btp}</span>
              </div>
            </div>
          );
        })}

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {PHASES.map((p, i) => (
            <div key={i} style={{ width: active > i ? 28 : 10, height: 10, borderRadius: 5, background: active >= i ? p.color : `${p.color}33` }} />
          ))}
        </div>
      </div>

      {/* RIGHT: Pentagon */}
      <div style={{ width: 500, height: 500, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="500" height="500" viewBox="-250 -250 500 500" style={{ transform: `scale(${circSc})`, overflow: "visible" }}>
          {PHASES.map((_, i) => {
            const p1 = gp(ANGLES[i]); const p2 = gp(ANGLES[(i + 1) % 5]);
            return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.border} strokeWidth="1.5" />;
          })}
          <circle cx="0" cy="0" r="58" fill={`${C.blue}18`} stroke={`${C.blue}44`} strokeWidth="2" />
          <text x="0" y="-7" textAnchor="middle" fill={C.gray} fontSize="13" fontFamily={F} fontWeight="700">Six Sigma</text>
          <text x="0" y="11" textAnchor="middle" fill={C.blue} fontSize="19" fontFamily={F} fontWeight="900">DMAIC</text>
          {PHASES.map((p, i) => {
            const pos = gp(ANGLES[i]);
            const isA = active === i, isP = active > i;
            const sc = isA ? 1.18 : 1;
            return (
              <g key={p.letter} transform={`translate(${pos.x},${pos.y}) scale(${sc})`}>
                {isA && <circle r="50" fill="none" stroke={p.color} strokeWidth="3" opacity={0.5} />}
                <circle r="40" fill={isA || isP ? p.color : `${p.color}33`} stroke={p.color} strokeWidth="2.5" />
                <text y="12" textAnchor="middle" fill={isA || isP ? "#fff" : p.color} fontSize="30" fontWeight="900" fontFamily={F}>{p.letter}</text>
                <text y="58" textAnchor="middle" fill={isA ? p.color : C.gray} fontSize="11" fontWeight="700" fontFamily={F} letterSpacing="1">{p.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
