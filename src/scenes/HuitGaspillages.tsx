import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "../colors";

const WASTES = [
  { label: "Attente",        emoji: "⏳", color: "#f97316", angle: -90,  desc: "Équipes qui attendent les matériaux, la grue ou les instructions" },
  { label: "Transport",      emoji: "🚛", color: "#3b82f6", angle: -45,  desc: "Déplacements inutiles de matériaux et d'équipements sur site" },
  { label: "Mouvement",      emoji: "🚶", color: "#22c55e", angle: 0,    desc: "Déplacements non-valeur des ouvriers sur le chantier" },
  { label: "Défauts",        emoji: "❌", color: "#ef4444", angle: 45,   desc: "Reprises, corrections et non-conformités à reconstruire" },
  { label: "Surproduction",  emoji: "📈", color: "#a855f7", angle: 90,   desc: "Travailler plus ou plus tôt que ce que le client demande" },
  { label: "Stocks",         emoji: "📦", color: "#f59e0b", angle: 135,  desc: "Matériaux en excès immobilisés et encombrés sur le chantier" },
  { label: "Surtraitement",  emoji: "⚙️", color: "#06b6d4", angle: 180,  desc: "Procédés ou finitions plus complexes que nécessaire" },
  { label: "Talents",        emoji: "🧠", color: "#84cc16", angle: 225,  desc: "Compétences et idées des équipes terrain non exploitées" },
];

const R = 268;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const pos = (angle: number) => ({
  x: Math.cos(toRad(angle)) * R,
  y: Math.sin(toRad(angle)) * R,
});

// Each waste gets a start frame, staggered by 48 frames
const STAGGER = 48;
const FIRST = 60;
const wasteStart = (i: number) => FIRST + i * STAGGER;

const WasteNode: React.FC<{
  w: (typeof WASTES)[0];
  idx: number;
  active: number;
}> = ({ w, idx, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = wasteStart(idx);
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const nodeScale = spring({
    fps,
    frame: Math.max(0, frame - start),
    config: { stiffness: 130, damping: 10 },
    durationInFrames: 28,
  });

  const lineLen = interpolate(frame, [start, start + 28], [0, 1], clamp);
  const labelOp = interpolate(frame, [start + 20, start + 40], [0, 1], clamp);

  const { x, y } = pos(w.angle);
  const isActive = active === idx;

  // Label position — push label further out from center
  const lx = Math.cos(toRad(w.angle)) * (R + 80);
  const ly = Math.sin(toRad(w.angle)) * (R + 80);

  return (
    <g>
      {/* Line from center to node */}
      <line
        x1={0}
        y1={0}
        x2={x * lineLen}
        y2={y * lineLen}
        stroke={w.color}
        strokeWidth="2"
        strokeOpacity="0.4"
        strokeDasharray="6 4"
      />

      {/* Node circle */}
      <g transform={`translate(${x}, ${y}) scale(${nodeScale})`}>
        {isActive && (
          <circle r="62" fill="none" stroke={w.color} strokeWidth="3" opacity={0.5} />
        )}
        <circle
          r="50"
          fill={isActive ? w.color : `${w.color}44`}
          stroke={w.color}
          strokeWidth="2.5"
        />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="30"
          fontFamily={F}
        >
          {w.emoji}
        </text>
      </g>

      {/* Label outside the node */}
      <text
        x={lx}
        y={ly + 5}
        textAnchor="middle"
        dominantBaseline="central"
        fill={isActive ? w.color : C.gray}
        fontSize="18"
        fontWeight={isActive ? "800" : "600"}
        fontFamily={F}
        opacity={labelOp}
      >
        {w.label}
      </text>
    </g>
  );
};

export const HuitGaspillages: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp   = interpolate(frame, [0, 22, 572, 600], [0, 1, 1, 0], clamp);
  const titleOp   = interpolate(frame, [5, 28], [0, 1], clamp);
  const titleY    = interpolate(frame, [5, 28], [30, 0], clamp);
  const centerSc  = spring({ fps, frame: Math.max(0, frame - 30), config: { stiffness: 90, damping: 12 }, durationInFrames: 35 });

  // Determine which waste is currently being introduced
  const lastVisible = WASTES.reduce((acc, _, i) => (frame >= wasteStart(i) ? i : acc), -1);

  // Description card fades in after each node
  const descOp = interpolate(frame, [wasteStart(lastVisible) + 20, wasteStart(lastVisible) + 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #0f1825 100%)`,
        opacity: sceneOp,
        fontFamily: F,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Left panel */}
      <div
        style={{
          width: 380,
          padding: "0 0 0 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            color: C.orange,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: titleOp,
          }}
        >
          Lean Muda
        </div>
        <div
          style={{
            color: C.white,
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 8,
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Les 8 gaspillages
        </div>
        <div
          style={{
            color: C.gray,
            fontSize: 20,
            marginBottom: 40,
            opacity: titleOp,
          }}
        >
          à éliminer sur le chantier
        </div>

        {/* Active waste description card */}
        {lastVisible >= 0 && (
          <div
            style={{
              opacity: descOp,
              padding: "22px 24px",
              background: `${WASTES[lastVisible].color}18`,
              border: `2px solid ${WASTES[lastVisible].color}`,
              borderRadius: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{WASTES[lastVisible].emoji}</span>
              <span
                style={{
                  color: WASTES[lastVisible].color,
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                {WASTES[lastVisible].label}
              </span>
            </div>
            <div style={{ color: C.gray, fontSize: 17, lineHeight: 1.5 }}>
              {WASTES[lastVisible].desc}
            </div>
          </div>
        )}

        {/* Progress counter */}
        <div style={{ marginTop: 28, color: C.gray, fontSize: 15 }}>
          {lastVisible >= 0 && (
            <span>
              <span style={{ color: C.white, fontWeight: 700, fontSize: 20 }}>
                {lastVisible + 1}
              </span>
              /8 gaspillages identifiés
            </span>
          )}
        </div>
      </div>

      {/* Right: SVG radial diagram */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg
          width="860"
          height="860"
          viewBox="-430 -430 860 860"
          style={{ overflow: "visible" }}
        >
          {/* Outer dashed ring */}
          <circle
            cx="0"
            cy="0"
            r={R + 30}
            fill="none"
            stroke={`${C.blue}22`}
            strokeWidth="1"
            strokeDasharray="8 8"
          />

          {/* Center circle */}
          <g transform={`scale(${centerSc})`}>
            <circle cx="0" cy="0" r="85" fill={`${C.blue}18`} stroke={`${C.blue}55`} strokeWidth="2.5" />
            <text
              x="0"
              y="-12"
              textAnchor="middle"
              fill={C.white}
              fontSize="22"
              fontWeight="900"
              fontFamily={F}
            >
              8
            </text>
            <text
              x="0"
              y="12"
              textAnchor="middle"
              fill={C.blue}
              fontSize="18"
              fontWeight="700"
              fontFamily={F}
            >
              MUDA
            </text>
          </g>

          {/* 8 waste nodes */}
          {WASTES.map((w, i) => (
            <WasteNode key={i} w={w} idx={i} active={lastVisible} />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
