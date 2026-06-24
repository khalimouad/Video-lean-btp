import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

// Storyboard data: Plan 2 (0:18-0:55) — "Le chantier AVANT"
const PROBLEMS = [
  {
    icon: "⏳",
    color: "#ef4444",
    title: "Attente",
    desc: "Le béton sèche, et tout le monde attend. Les étais restent en place, les équipes sont bloquées.",
    stat: "35%", statLabel: "du temps en attente",
    start: 80,
  },
  {
    icon: "🔍",
    color: "#f97316",
    title: "Désorganisation",
    desc: "Les matériaux sont partout, sauf là où il faut. On passe 10 minutes à chercher un outil.",
    stat: "–", statLabel: "Outils introuvables",
    start: 380,
  },
  {
    icon: "🚶",
    color: "#f59e0b",
    title: "Déplacements inutiles",
    desc: "Un coffreur traverse tout le chantier pour récupérer du matériel. 40 à 60 m non-valeur.",
    stat: "40m", statLabel: "de déplacements inutiles",
    start: 680,
  },
  {
    icon: "❌",
    color: "#a855f7",
    title: "Défauts & reprises",
    desc: "Un voile mal coffré, on le reprend au burin. Chaque reprise consomme du temps et de la ressource.",
    stat: "8%", statLabel: "du temps en reprises",
    start: 980,
  },
  {
    icon: "📋",
    color: "#3b82f6",
    title: "Coordination défaillante",
    desc: "La réunion de coordination arrive toujours trop tard, tendue, et sans décisions claires.",
    stat: "54%", statLabel: "des plannings sont tenus",
    start: 1280,
  },
];

const ProblemCard: React.FC<{ p: (typeof PROBLEMS)[0]; wide?: boolean }> = ({ p }) => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op = interpolate(frame, [p.start, p.start + 28], [0, 1], cl);
  const y  = interpolate(frame, [p.start, p.start + 28], [36, 0], cl);

  return (
    <div style={{
      opacity: op, transform: `translateY(${y}px)`,
      display: "flex", gap: 20, alignItems: "flex-start",
      padding: "20px 26px",
      background: `${p.color}0e`,
      borderRadius: 14,
      border: `1px solid ${p.color}44`,
      borderLeft: `4px solid ${p.color}`,
      marginBottom: 14,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: `${p.color}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26, flexShrink: 0,
      }}>{p.icon}</div>

      <div style={{ flex: 1 }}>
        <div style={{ color: p.color, fontSize: 14, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 4 }}>
          Gaspillage — {p.title}
        </div>
        <div style={{ color: C.white, fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{p.desc}</div>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ color: p.color, fontSize: 34, fontWeight: 900, lineHeight: 1 }}>{p.stat}</div>
        <div style={{ color: C.gray, fontSize: 12, marginTop: 4, maxWidth: 100 }}>{p.statLabel}</div>
      </div>
    </div>
  );
};

export const AvantChantier: React.FC = () => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp = interpolate(frame, [0, 22, 2060, 2100], [0, 1, 1, 0], cl);

  // Big summary stats at the end
  const summaryOp = interpolate(frame, [1600, 1650], [0, 1], cl);
  const cycle     = Math.round(interpolate(frame, [1660, 1760], [0, 12], cl));
  const valeur    = Math.round(interpolate(frame, [1680, 1780], [0, 25], cl));

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #1a0808 0%, #0d0a0f 100%)",
      padding: "50px 120px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      opacity: sceneOp, fontFamily: F,
    }}>
      {/* AVANT badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, opacity: interpolate(frame, [5, 25], [0, 1], cl) }}>
        <div style={{
          background: "#ef4444", color: "#fff",
          fontSize: 13, fontWeight: 900, letterSpacing: "4px",
          padding: "6px 20px", borderRadius: 20,
        }}>AVANT</div>
        <div style={{ color: "#ef4444", fontSize: 14, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>
          Les gaspillages sur le chantier
        </div>
      </div>

      <div style={{
        color: C.white, fontSize: 46, fontWeight: 900, marginBottom: 32,
        opacity: interpolate(frame, [5, 30], [0, 1], cl),
        transform: `translateY(${interpolate(frame, [5, 30], [24, 0], cl)}px)`,
      }}>
        Ce qui se passe vraiment sur le chantier
      </div>

      {/* 5 problems */}
      {PROBLEMS.map((p, i) => <ProblemCard key={i} p={p} />)}

      {/* Big summary stats (frame 1600+) */}
      <div style={{
        opacity: summaryOp,
        display: "flex", gap: 24, marginTop: 18,
      }}>
        {[
          { val: `${cycle} jours`, label: "cycle d'un niveau", color: "#ef4444" },
          { val: `${valeur}%`, label: "de valeur ajoutée seulement", color: "#f97316" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "20px 28px",
            background: `${s.color}12`,
            border: `2px solid ${s.color}`,
            borderRadius: 14, textAlign: "center",
          }}>
            <div style={{ color: s.color, fontSize: 52, fontWeight: 900 }}>{s.val}</div>
            <div style={{ color: C.gray, fontSize: 17, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
