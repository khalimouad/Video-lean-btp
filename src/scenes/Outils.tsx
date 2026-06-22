import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

const TOOLS = [
  {
    id: "LPS",
    color: "#3b82f6",
    emoji: "📅",
    title: "Last Planner System",
    desc: "Planning collaboratif pull — engagement et responsabilisation des équipes terrain",
    startFrame: 35,
  },
  {
    id: "5S",
    color: "#f97316",
    emoji: "🧹",
    title: "5S Chantier",
    desc: "Trier · Ranger · Nettoyer · Standardiser · Pérenniser l'organisation du site",
    startFrame: 105,
  },
  {
    id: "Kanban",
    color: "#22c55e",
    emoji: "📋",
    title: "Kanban",
    desc: "Gestion visuelle des flux matières — livraison juste-à-temps, zéro stock inutile",
    startFrame: 175,
  },
  {
    id: "Visuel",
    color: "#f59e0b",
    emoji: "👁️",
    title: "Management Visuel",
    desc: "Tableaux de bord chantier, indicateurs affichés, anomalies visibles au premier coup d'œil",
    startFrame: 245,
  },
  {
    id: "Gemba",
    color: "#a855f7",
    emoji: "🚶",
    title: "Gemba Walk",
    desc: "Aller sur le terrain observer, comprendre, améliorer — par les managers et chefs d'équipe",
    startFrame: 315,
  },
  {
    id: "Takt",
    color: "#06b6d4",
    emoji: "🎵",
    title: "Takt Planning",
    desc: "Synchroniser le rythme de production de chaque corps de métier pour un flux régulier",
    startFrame: 385,
  },
];

const ToolCard: React.FC<{ tool: (typeof TOOLS)[0] }> = ({ tool }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op = interpolate(frame, [tool.startFrame, tool.startFrame + 25], [0, 1], clamp);
  const y  = interpolate(frame, [tool.startFrame, tool.startFrame + 25], [32, 0], clamp);

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px)`,
        padding: "22px 24px",
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderTop: `3px solid ${tool.color}`,
        borderRadius: 14,
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: `${tool.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          flexShrink: 0,
          border: `1px solid ${tool.color}44`,
        }}
      >
        {tool.emoji}
      </div>
      <div>
        <div
          style={{
            color: tool.color,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "3px",
            marginBottom: 4,
          }}
        >
          {tool.id}
        </div>
        <div style={{ color: C.white, fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
          {tool.title}
        </div>
        <div style={{ color: C.gray, fontSize: 15, lineHeight: 1.5 }}>{tool.desc}</div>
      </div>
    </div>
  );
};

export const OutilsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 425, 450], [0, 1, 1, 0], clamp);

  const left  = TOOLS.filter((_, i) => i % 2 === 0);
  const right = TOOLS.filter((_, i) => i % 2 === 1);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, ${C.bgMid} 100%)`,
        padding: "50px 100px",
        display: "flex",
        flexDirection: "column",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 30 }}>
        <div
          style={{
            color: C.yellow,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 10,
            opacity: interpolate(frame, [5, 25], [0, 1], clamp),
          }}
        >
          Boîte à outils
        </div>
        <div
          style={{
            color: C.white,
            fontSize: 44,
            fontWeight: 900,
            opacity: interpolate(frame, [5, 28], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [5, 28], [25, 0], clamp)}px)`,
          }}
        >
          6 outils Lean Construction
        </div>
      </div>

      {/* 2-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {left.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {right.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
