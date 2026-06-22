import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "../colors";

const DMAIC_DATA = [
  {
    letter: "D",
    color: "#3b82f6",
    label: "DÉFINIR",
    title: "Définir",
    desc: "Définir le problème, le périmètre et les objectifs du projet",
    btpExample: "Problème : le bétonnage d'un plancher prend 40% de temps en plus que prévu",
    window: [60, 180],
  },
  {
    letter: "M",
    color: "#22c55e",
    label: "MESURER",
    title: "Mesurer",
    desc: "Mesurer les données actuelles : délais, coûts, taux de défauts",
    btpExample: "Mesure : 3h d'attente/jour pour la livraison du béton et 1h de nettoyage évitable",
    window: [180, 300],
  },
  {
    letter: "A",
    color: "#f97316",
    label: "ANALYSER",
    title: "Analyser",
    desc: "Analyser les causes racines des gaspillages et des écarts",
    btpExample: "Cause racine : manque de coordination entre le fournisseur et le chef de chantier",
    window: [300, 420],
  },
  {
    letter: "I",
    color: "#a855f7",
    label: "INNOVER",
    title: "Innover",
    desc: "Développer et déployer les solutions d'amélioration sur le terrain",
    btpExample: "Solution : Last Planner System + commande béton 24h à l'avance via Kanban",
    window: [420, 520],
  },
  {
    letter: "C",
    color: "#f59e0b",
    label: "CONTRÔLER",
    title: "Contrôler",
    desc: "Contrôler les résultats et pérenniser les gains obtenus",
    btpExample: "KPI : PPC hebdomadaire — objectif >80% des tâches planifiées complétées",
    window: [520, 580],
  },
];

const R = 200;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const getPos = (angle: number) => ({
  x: Math.cos(toRad(angle)) * R,
  y: Math.sin(toRad(angle)) * R,
});
const ANGLES = [-90, -18, 54, 126, 198];

const activeIdx = (frame: number): number => {
  for (let i = DMAIC_DATA.length - 1; i >= 0; i--) {
    if (frame >= DMAIC_DATA[i].window[0]) return i;
  }
  return -1;
};

export const DMAICScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp   = interpolate(frame, [0, 22, 572, 600], [0, 1, 1, 0], clamp);
  const circSc    = spring({ fps, frame: Math.max(0, frame - 22), config: { stiffness: 90, damping: 14 }, durationInFrames: 35 });
  const active    = activeIdx(frame);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #1a0f2e 100%)`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 100px",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Left panel */}
      <div style={{ flex: 1, maxWidth: 660, paddingRight: 40 }}>
        <div
          style={{
            color: C.purple,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: interpolate(frame, [5, 25], [0, 1], clamp),
          }}
        >
          Six Sigma
        </div>

        <div
          style={{
            color: C.white,
            fontSize: 58,
            fontWeight: 900,
            marginBottom: 10,
            lineHeight: 1,
            opacity: interpolate(frame, [5, 30], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [5, 30], [30, 0], clamp)}px)`,
          }}
        >
          Cycle DMAIC
        </div>

        <div
          style={{
            color: C.gray,
            fontSize: 20,
            marginBottom: 40,
            opacity: interpolate(frame, [10, 35], [0, 1], clamp),
          }}
        >
          Appliqué à un chantier de bétonnage
        </div>

        {/* Active phase card */}
        {active >= 0 &&
          DMAIC_DATA.map((d, i) => {
            if (i !== active) return null;
            const [ws] = d.window;
            const op = interpolate(frame, [ws, ws + 22], [0, 1], clamp);
            const y  = interpolate(frame, [ws, ws + 22], [30, 0], clamp);
            return (
              <div
                key={d.letter}
                style={{
                  opacity: op,
                  transform: `translateY(${y}px)`,
                  padding: "28px 32px",
                  background: `${d.color}15`,
                  border: `2px solid ${d.color}`,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
              >
                {/* Phase header */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: d.color,
                      color: "#fff",
                      fontSize: 28,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {d.letter}
                  </div>
                  <div>
                    <div
                      style={{ color: d.color, fontSize: 13, fontWeight: 700, letterSpacing: "3px" }}
                    >
                      {d.label}
                    </div>
                    <div style={{ color: C.white, fontSize: 26, fontWeight: 800 }}>
                      {d.title}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ color: C.gray, fontSize: 19, marginBottom: 16, lineHeight: 1.5 }}>
                  {d.desc}
                </div>

                {/* BTP example box */}
                <div
                  style={{
                    padding: "14px 20px",
                    background: `${d.color}0d`,
                    border: `1px solid ${d.color}44`,
                    borderRadius: 10,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>🏗️</span>
                  <span style={{ color: C.text, fontSize: 17, lineHeight: 1.5 }}>
                    {d.btpExample}
                  </span>
                </div>
              </div>
            );
          })}

        {/* Phase progress dots */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {DMAIC_DATA.map((d, i) => (
            <div
              key={i}
              style={{
                width: active > i ? 32 : 12,
                height: 12,
                borderRadius: 6,
                background: active >= i ? d.color : `${d.color}33`,
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right: Pentagon diagram */}
      <div
        style={{
          width: 520,
          height: 520,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="520"
          height="520"
          viewBox="-260 -260 520 520"
          style={{ transform: `scale(${circSc})`, overflow: "visible" }}
        >
          {/* Connecting lines between nodes */}
          {DMAIC_DATA.map((_, i) => {
            const p1 = getPos(ANGLES[i]);
            const p2 = getPos(ANGLES[(i + 1) % 5]);
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={C.border}
                strokeWidth="1.5"
              />
            );
          })}

          {/* Center */}
          <circle cx="0" cy="0" r="60" fill={`${C.blue}18`} stroke={`${C.blue}44`} strokeWidth="2" />
          <text x="0" y="-8" textAnchor="middle" fill={C.gray} fontSize="14" fontFamily={F} fontWeight="700">
            Six Sigma
          </text>
          <text x="0" y="12" textAnchor="middle" fill={C.blue} fontSize="20" fontFamily={F} fontWeight="900">
            DMAIC
          </text>

          {/* Each node */}
          {DMAIC_DATA.map((d, i) => {
            const p = getPos(ANGLES[i]);
            const isPast   = active > i;
            const isActive = active === i;
            const scale    = isActive ? 1.18 : 1;

            return (
              <g key={d.letter} transform={`translate(${p.x}, ${p.y}) scale(${scale})`}>
                {isActive && (
                  <circle r="52" fill="none" stroke={d.color} strokeWidth="3" opacity={0.5} />
                )}
                <circle
                  r="42"
                  fill={isActive || isPast ? d.color : `${d.color}33`}
                  stroke={d.color}
                  strokeWidth="3"
                />
                <text
                  y="13"
                  textAnchor="middle"
                  fill={isActive || isPast ? "#fff" : d.color}
                  fontSize="32"
                  fontWeight="900"
                  fontFamily={F}
                >
                  {d.letter}
                </text>
                <text
                  y="62"
                  textAnchor="middle"
                  fill={isActive ? d.color : C.gray}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily={F}
                  letterSpacing="1"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
