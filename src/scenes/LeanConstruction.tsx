import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

const principles = [
  {
    icon: "🚫",
    color: C.orange,
    title: "Éliminer les 7 gaspillages (Muda)",
    desc: "Attentes, surproduction, stocks, défauts, transports inutiles…",
  },
  {
    icon: "💎",
    color: C.blue,
    title: "Créer de la valeur pour le client",
    desc: "Ne réaliser que ce qui apporte réellement de la valeur au maître d'ouvrage",
  },
  {
    icon: "→",
    color: C.green,
    title: "Flux continu de production",
    desc: "Coordonner les corps de métier pour éviter ruptures et files d'attente",
  },
  {
    icon: "⬅",
    color: C.purple,
    title: "Production tirée — Pull Flow",
    desc: "Chaque tâche est déclenchée par la demande, pas par une planification push",
  },
  {
    icon: "🔄",
    color: C.yellow,
    title: "Kaizen — Amélioration continue",
    desc: "Apprendre de chaque chantier et améliorer les processus en permanence",
  },
];

const Principle: React.FC<{
  p: (typeof principles)[0];
  idx: number;
}> = ({ p, idx }) => {
  const frame = useCurrentFrame();
  const startFrame = 30 + idx * 38;
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const op  = interpolate(frame, [startFrame, startFrame + 22], [0, 1], clamp);
  const x   = interpolate(frame, [startFrame, startFrame + 22], [-60, 0], clamp);

  return (
    <div
      style={{
        opacity: op,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "18px 28px",
        background: C.bgCard,
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${p.color}`,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 32,
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${p.color}22`,
          borderRadius: "50%",
          flexShrink: 0,
          color: p.color,
          fontWeight: 900,
          fontFamily: F,
        }}
      >
        {p.icon}
      </div>
      <div>
        <div style={{ color: C.white, fontSize: 22, fontWeight: 700 }}>{p.title}</div>
        <div style={{ color: C.gray, fontSize: 17, marginTop: 4 }}>{p.desc}</div>
      </div>
    </div>
  );
};

export const LeanConstruction: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 218, 240], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #0f1e10 100%)`,
        padding: "0 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      <div
        style={{
          color: C.green,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: interpolate(frame, [5, 25], [0, 1], clamp),
        }}
      >
        Les fondements
      </div>

      <div
        style={{
          color: C.white,
          fontSize: 50,
          fontWeight: 900,
          marginBottom: 40,
          opacity: interpolate(frame, [5, 30], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [5, 30], [30, 0], clamp)}px)`,
        }}
      >
        Le Lean Construction
      </div>

      {principles.map((p, i) => (
        <Principle key={i} p={p} idx={i} />
      ))}
    </AbsoluteFill>
  );
};
