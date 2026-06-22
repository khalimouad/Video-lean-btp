import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

const KEY_POINTS = [
  { icon: "🚀", text: "Démarrez par un projet pilote sur un chantier ciblé" },
  { icon: "👥", text: "Impliquez vos équipes terrain dès le départ" },
  { icon: "📊", text: "Mesurez, apprenez et améliorez en continu" },
];

export const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 25, 188, 210], [0, 1, 1, 0], clamp);

  const titleScale = spring({
    fps,
    frame: Math.max(0, frame - 15),
    config: { stiffness: 80, damping: 12 },
    durationInFrames: 40,
  });

  const line1Op = interpolate(frame, [15, 45], [0, 1], clamp);
  const line1Y  = interpolate(frame, [15, 45], [50, 0], clamp);
  const line2Op = interpolate(frame, [40, 68], [0, 1], clamp);
  const line2Y  = interpolate(frame, [40, 68], [40, 0], clamp);

  const ctaOp = interpolate(frame, [130, 158], [0, 1], clamp);
  const ctaY  = interpolate(frame, [130, 158], [30, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${C.bg} 0%, #1e1545 50%, ${C.bgMid} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 120px",
        opacity: sceneOp,
        fontFamily: F,
        textAlign: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${C.purple}12 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={C.purple} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg)" />
        </svg>
      </div>

      {/* Headline */}
      <div
        style={{
          opacity: line1Op,
          transform: `translateY(${line1Y}px) scale(${titleScale})`,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            color: C.white,
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          Transformez
        </div>
      </div>

      <div
        style={{
          opacity: line2Op,
          transform: `translateY(${line2Y}px)`,
          marginBottom: 32,
        }}
      >
        <span style={{ color: C.orange, fontSize: 72, fontWeight: 900, letterSpacing: "-2px" }}>
          vos chantiers
        </span>
        <br />
        <span style={{ color: C.gray, fontSize: 38, fontWeight: 600 }}>
          avec le Lean Six Sigma
        </span>
      </div>

      {/* Gradient divider */}
      <div
        style={{
          width: interpolate(frame, [65, 95], [0, 600], clamp),
          height: 3,
          background: `linear-gradient(90deg, ${C.orange}, ${C.purple})`,
          borderRadius: 2,
          marginBottom: 40,
        }}
      />

      {/* Key points */}
      {KEY_POINTS.map((kp, i) => {
        const op = interpolate(frame, [78 + i * 18, 96 + i * 18], [0, 1], clamp);
        const x  = interpolate(frame, [78 + i * 18, 96 + i * 18], [40, 0], clamp);
        return (
          <div
            key={i}
            style={{
              opacity: op,
              transform: `translateX(${x}px)`,
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 14,
              padding: "14px 28px",
              background: C.bgCard,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              width: "100%",
              maxWidth: 780,
            }}
          >
            <span style={{ fontSize: 28 }}>{kp.icon}</span>
            <span style={{ color: C.text, fontSize: 20, fontWeight: 600, textAlign: "left" }}>
              {kp.text}
            </span>
          </div>
        );
      })}

      {/* CTA */}
      <div
        style={{
          opacity: ctaOp,
          transform: `translateY(${ctaY}px)`,
          marginTop: 32,
          padding: "20px 52px",
          background: `linear-gradient(90deg, ${C.orange}, ${C.purple})`,
          borderRadius: 50,
          fontSize: 24,
          fontWeight: 800,
          color: C.white,
          letterSpacing: "1px",
          boxShadow: `0 8px 40px ${C.orange}44`,
        }}
      >
        🏗️ Passez à l'action sur votre chantier dès aujourd'hui
      </div>
    </AbsoluteFill>
  );
};
