import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

const RESULTS = [
  { label: "Réduction des délais de livraison",  value: -35, color: C.green,  icon: "⏱", prefix: "-" },
  { label: "Réduction des coûts de construction", value: -28, color: C.blue,   icon: "💰", prefix: "-" },
  { label: "Gain de productivité terrain",         value: 42,  color: C.orange, icon: "⚡", prefix: "+" },
  { label: "Satisfaction client",                  value: 60,  color: C.purple, icon: "⭐", prefix: "+" },
];

const ResultBar: React.FC<{
  r: (typeof RESULTS)[0];
  startFrame: number;
}> = ({ r, startFrame }) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const op        = interpolate(frame, [startFrame, startFrame + 20], [0, 1], clamp);
  const y         = interpolate(frame, [startFrame, startFrame + 20], [30, 0], clamp);
  const count     = Math.round(interpolate(frame, [startFrame + 20, startFrame + 70], [0, Math.abs(r.value)], clamp));
  const barWidth  = interpolate(frame, [startFrame + 20, startFrame + 75], [0, Math.abs(r.value)], clamp);

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px)`,
        marginBottom: 28,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28 }}>{r.icon}</span>
          <span style={{ color: C.white, fontSize: 20, fontWeight: 600 }}>{r.label}</span>
        </div>
        <div
          style={{
            color: r.color,
            fontSize: 42,
            fontWeight: 900,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {r.prefix}{count}%
        </div>
      </div>

      {/* Bar track */}
      <div
        style={{
          height: 16,
          background: `${r.color}22`,
          borderRadius: 8,
          overflow: "hidden",
          border: `1px solid ${r.color}44`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${barWidth}%`,
            background: `linear-gradient(90deg, ${r.color}88, ${r.color})`,
            borderRadius: 8,
            boxShadow: `0 0 16px ${r.color}66`,
          }}
        />
      </div>
    </div>
  );
};

export const ResultatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 248, 270], [0, 1, 1, 0], clamp);

  const windows = [25, 90, 150, 205];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #0f1e12 100%)`,
        padding: "0 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${C.green}0a 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

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
        Bénéfices mesurés
      </div>

      <div
        style={{
          color: C.white,
          fontSize: 52,
          fontWeight: 900,
          marginBottom: 52,
          opacity: interpolate(frame, [5, 28], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [5, 28], [30, 0], clamp)}px)`,
        }}
      >
        Résultats concrets sur chantier
      </div>

      {RESULTS.map((r, i) => (
        <ResultBar key={i} r={r} startFrame={windows[i]} />
      ))}

      {/* Source note */}
      <div
        style={{
          color: C.gray,
          fontSize: 15,
          marginTop: 24,
          opacity: interpolate(frame, [220, 240], [0, 1], clamp),
        }}
      >
        * Moyennes observées sur des projets BTP ayant adopté le Lean Six Sigma — McKinsey, OPPBTP, études terrain
      </div>
    </AbsoluteFill>
  );
};
