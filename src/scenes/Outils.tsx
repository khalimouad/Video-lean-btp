import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

const TOOLS = [
  {
    id: "5S",
    color: C.orange,
    title: "5S — Organisation du chantier",
    items: ["Seiri — Trier", "Seiton — Ranger", "Seiso — Nettoyer", "Seiketsu — Standardiser", "Shitsuke — Pérenniser"],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="15" height="15" rx="3" fill={C.orange} />
        <rect x="27" y="6" width="15" height="15" rx="3" fill={C.orange} opacity="0.5" />
        <rect x="6" y="27" width="15" height="15" rx="3" fill={C.orange} opacity="0.5" />
        <rect x="27" y="27" width="15" height="15" rx="3" fill={C.orange} opacity="0.7" />
      </svg>
    ),
    window: [30, 130],
  },
  {
    id: "LPS",
    color: C.blue,
    title: "Last Planner System",
    items: ["Planning collaboratif pull", "Engagement des équipes terrain", "Réunions hebdomadaires Look Ahead", "Suivi du PPC (Pourcentage Plans Complétés)"],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="32" rx="4" stroke={C.blue} strokeWidth="2.5" fill="none" />
        <path d="M14 8 L14 4" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 8 L34 4" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 18 L42 18" stroke={C.blue} strokeWidth="2" />
        <rect x="13" y="24" width="7" height="7" rx="1.5" fill={C.blue} />
        <rect x="27" y="24" width="7" height="7" rx="1.5" fill={C.blue} opacity="0.5" />
      </svg>
    ),
    window: [130, 220],
  },
  {
    id: "Kanban",
    color: C.green,
    title: "Kanban — Flux visuels",
    items: ["Tableau visuel À faire / En cours / Terminé", "Limitation des travaux en cours (WIP)", "Livraison juste-à-temps des matériaux", "Réduction des stocks sur chantier"],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="10" width="11" height="28" rx="3" fill={C.green} opacity="0.8" />
        <rect x="18.5" y="10" width="11" height="20" rx="3" fill={C.green} opacity="0.5" />
        <rect x="33" y="10" width="11" height="14" rx="3" fill={C.green} opacity="0.3" />
        <path d="M4 6 L44 6" stroke={C.green} strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    window: [220, 310],
  },
  {
    id: "Takt",
    color: C.purple,
    title: "Takt Time — Rythme de production",
    items: ["Synchroniser le rythme de chaque équipe", "Temps disponible ÷ Demande client", "Éviter les goulots d'étranglement", "Flux régulier et prévisible sur le chantier"],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="26" r="18" stroke={C.purple} strokeWidth="2.5" fill="none" />
        <path d="M24 14 L24 26 L32 26" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 4 L26 8 L22 8 Z" fill={C.purple} />
      </svg>
    ),
    window: [310, 380],
  },
];

const ToolCard: React.FC<{ tool: (typeof TOOLS)[0]; idx: number }> = ({ tool, idx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [wStart, wEnd] = tool.window;
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op    = interpolate(frame, [wStart, wStart + 25], [0, 1], clamp);
  const y     = interpolate(frame, [wStart, wStart + 25], [40, 0], clamp);
  const isActive = frame >= wStart && frame < wEnd + 30;

  const itemsVisible = tool.items.map((_, i) => {
    const itemStart = wStart + 30 + i * 15;
    return interpolate(frame, [itemStart, itemStart + 15], [0, 1], clamp);
  });

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px)`,
        padding: "24px 32px",
        background: isActive ? `${tool.color}12` : C.bgCard,
        border: `2px solid ${isActive ? tool.color : C.border}`,
        borderRadius: 16,
        transition: "all 0.3s",
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        marginBottom: 16,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 12,
          background: `${tool.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: `1px solid ${tool.color}44`,
        }}
      >
        {tool.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ color: tool.color, fontSize: 11, fontWeight: 700, letterSpacing: "3px", marginBottom: 6 }}>
          {tool.id}
        </div>
        <div style={{ color: C.white, fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
          {tool.title}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {tool.items.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: itemsVisible[i],
                background: `${tool.color}18`,
                color: tool.color,
                fontSize: 15,
                fontWeight: 600,
                padding: "5px 14px",
                borderRadius: 20,
                border: `1px solid ${tool.color}44`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OutilsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 368, 390], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, ${C.bgMid} 100%)`,
        padding: "60px 130px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      <div
        style={{
          color: C.yellow,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: interpolate(frame, [5, 25], [0, 1], clamp),
        }}
      >
        La boîte à outils
      </div>

      <div
        style={{
          color: C.white,
          fontSize: 46,
          fontWeight: 900,
          marginBottom: 36,
          opacity: interpolate(frame, [5, 28], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [5, 28], [30, 0], clamp)}px)`,
        }}
      >
        Outils Lean Six Sigma dans le BTP
      </div>

      {TOOLS.map((t, i) => (
        <ToolCard key={t.id} tool={t} idx={i} />
      ))}
    </AbsoluteFill>
  );
};
