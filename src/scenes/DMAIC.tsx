import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

const DMAIC_DATA = [
  {
    letter: "D",
    color: "#3b82f6",
    label: "DÉFINIR",
    desc: "Définir le problème, le périmètre et les objectifs du projet chantier",
    angle: -90,
  },
  {
    letter: "M",
    color: "#22c55e",
    label: "MESURER",
    desc: "Mesurer les données actuelles : délais, coûts, taux de défauts",
    angle: -18,
  },
  {
    letter: "A",
    color: "#f97316",
    label: "ANALYSER",
    desc: "Analyser les causes racines des gaspillages et des écarts",
    angle: 54,
  },
  {
    letter: "I",
    color: "#a855f7",
    label: "INNOVER",
    desc: "Développer et déployer les solutions d'amélioration sur le terrain",
    angle: 126,
  },
  {
    letter: "C",
    color: "#f59e0b",
    label: "CONTRÔLER",
    desc: "Contrôler les résultats et pérenniser les gains obtenus",
    angle: 198,
  },
];

const R = 200;
const toRad = (deg: number) => (deg * Math.PI) / 180;

const getPos = (angle: number) => ({
  x: Math.cos(toRad(angle)) * R,
  y: Math.sin(toRad(angle)) * R,
});

// Activation windows (local frame)
const WINDOWS = [
  [50, 110],
  [110, 175],
  [175, 235],
  [235, 285],
  [285, 330],
];

const activeIndex = (frame: number): number => {
  for (let i = WINDOWS.length - 1; i >= 0; i--) {
    if (frame >= WINDOWS[i][0]) return i;
  }
  return -1;
};

export const DMAICScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 310, 330], [0, 1, 1, 0], clamp);
  const active = activeIndex(frame);

  const circleScale = spring({ fps, frame: Math.max(0, frame - 22), config: { stiffness: 90, damping: 14 }, durationInFrames: 35 });

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
      {/* Left: title + active description */}
      <div style={{ flex: 1, maxWidth: 640, paddingRight: 40 }}>
        <div
          style={{
            color: C.purple,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: interpolate(frame, [5, 25], [0, 1], clamp),
          }}
        >
          La méthode
        </div>
        <div
          style={{
            color: C.white,
            fontSize: 56,
            fontWeight: 900,
            marginBottom: 16,
            opacity: interpolate(frame, [5, 30], [0, 1], clamp),
          }}
        >
          Cycle DMAIC
        </div>
        <div
          style={{
            color: C.gray,
            fontSize: 20,
            marginBottom: 48,
            opacity: interpolate(frame, [10, 35], [0, 1], clamp),
          }}
        >
          Six Sigma appliqué aux projets BTP
        </div>

        {/* Active phase card */}
        {DMAIC_DATA.map((d, i) => {
          const isActive = active === i;
          const phaseOp = interpolate(
            frame,
            [WINDOWS[i][0], WINDOWS[i][0] + 20],
            [0, 1],
            clamp
          );
          if (!isActive) return null;
          return (
            <div
              key={d.letter}
              style={{
                opacity: phaseOp,
                background: `${d.color}18`,
                border: `2px solid ${d.color}`,
                borderRadius: 16,
                padding: "28px 32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: d.color,
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {d.letter}
                </div>
                <div>
                  <div style={{ color: d.color, fontSize: 14, fontWeight: 700, letterSpacing: "3px" }}>
                    {d.label}
                  </div>
                  <div style={{ color: C.white, fontSize: 26, fontWeight: 800, lineHeight: 1 }}>
                    {d.letter === "D" ? "Définir" : d.letter === "M" ? "Mesurer" : d.letter === "A" ? "Analyser" : d.letter === "I" ? "Innover" : "Contrôler"}
                  </div>
                </div>
              </div>
              <div style={{ color: C.gray, fontSize: 20, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Right: Pentagon diagram */}
      <div
        style={{
          width: 540,
          height: 540,
          position: "relative",
          transform: `scale(${circleScale})`,
          flexShrink: 0,
        }}
      >
        <svg
          width="540"
          height="540"
          viewBox="-270 -270 540 540"
          style={{ overflow: "visible" }}
        >
          {/* Pentagon connecting lines */}
          {DMAIC_DATA.map((d, i) => {
            const next = DMAIC_DATA[(i + 1) % DMAIC_DATA.length];
            const p1 = getPos(d.angle);
            const p2 = getPos(next.angle);
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={C.border}
                strokeWidth="2"
              />
            );
          })}

          {/* Center circle */}
          <circle cx="0" cy="0" r="60" fill={`${C.blue}18`} stroke={`${C.blue}44`} strokeWidth="2" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fill={C.blue}
            fontSize="24"
            fontWeight="900"
            fontFamily={F}
          >
            DMAIC
          </text>

          {/* Each DMAIC node */}
          {DMAIC_DATA.map((d, i) => {
            const pos = getPos(d.angle);
            const isActive = active === i;
            const isPast = active > i;
            const nodeScale = isActive
              ? interpolate(frame, [WINDOWS[i][0], WINDOWS[i][0] + 20], [1, 1.2], clamp)
              : 1;

            return (
              <g key={d.letter} transform={`translate(${pos.x}, ${pos.y}) scale(${nodeScale})`}>
                {/* Glow ring for active */}
                {isActive && (
                  <circle
                    cx="0"
                    cy="0"
                    r="52"
                    fill="none"
                    stroke={d.color}
                    strokeWidth="3"
                    opacity={0.5}
                  />
                )}

                {/* Main circle */}
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill={isActive || isPast ? d.color : `${d.color}33`}
                  stroke={d.color}
                  strokeWidth="3"
                />

                {/* Letter */}
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fill={isActive || isPast ? "#fff" : d.color}
                  fontSize="34"
                  fontWeight="900"
                  fontFamily={F}
                >
                  {d.letter}
                </text>

                {/* Label below */}
                <text
                  x="0"
                  y="66"
                  textAnchor="middle"
                  fill={isActive ? d.color : C.gray}
                  fontSize="14"
                  fontWeight="700"
                  fontFamily={F}
                  letterSpacing="2"
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
