import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "../colors";

export const Accroche: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const sceneOp = interpolate(frame, [560, 600], [1, 0], cl);

  // Helmet spring
  const helmSc = spring({ fps, frame, config: { stiffness: 100, damping: 10 }, durationInFrames: 30 });

  // Title
  const titleY  = interpolate(frame, [12, 45], [80, 0], cl);
  const titleOp = interpolate(frame, [12, 45], [0, 1], cl);

  // Subtitle "Avant / Après"
  const subOp = interpolate(frame, [38, 62], [0, 1], cl);

  // Big shocking stat
  const statOp  = interpolate(frame, [100, 130], [0, 1], cl);
  const statY   = interpolate(frame, [100, 130], [40, 0], cl);
  const pct     = Math.round(interpolate(frame, [130, 220], [0, 15], cl));
  const pct2    = Math.round(interpolate(frame, [200, 280], [0, 30], cl));

  // Tagline
  const tagOp = interpolate(frame, [290, 330], [0, 1], cl);

  // Line
  const lineW = interpolate(frame, [60, 95], [0, 700], cl);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(140deg, #0a0f1e 0%, #1e2d45 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="acc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke={C.blue} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#acc-grid)" />
        </svg>
      </div>

      {/* Helmet */}
      <div style={{ transform: `scale(${helmSc})`, marginBottom: 36 }}>
        <svg width="130" height="112" viewBox="0 0 130 112" fill="none">
          <ellipse cx="65" cy="100" rx="58" ry="12" fill={C.orange} opacity="0.2" />
          <path d="M 10 70 Q 10 22 65 10 Q 120 22 120 70 Z" fill={C.orange} />
          <rect x="3" y="66" width="124" height="16" rx="8" fill={C.orangeDk} />
          <rect x="59" y="10" width="12" height="20" rx="4" fill="white" opacity="0.5" />
        </svg>
      </div>

      {/* Main title */}
      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
        <div style={{ color: C.white, fontSize: 88, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1 }}>
          LEAN SIX SIGMA
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ opacity: subOp, marginTop: 16, textAlign: "center" }}>
        <div style={{ color: C.orange, fontSize: 30, fontWeight: 700, letterSpacing: "6px", textTransform: "uppercase" }}>
          sur le chantier — Avant / Après
        </div>
      </div>

      {/* Gradient line */}
      <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg,${C.orange},${C.blue})`, marginTop: 22, borderRadius: 2 }} />

      {/* Shocking stat */}
      <div style={{ opacity: statOp, transform: `translateY(${statY}px)`, marginTop: 44, textAlign: "center" }}>
        <div style={{ color: C.gray, fontSize: 22, marginBottom: 8 }}>Sur la plupart des chantiers</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 16 }}>
          <div style={{ color: C.orange, fontSize: 96, fontWeight: 900, lineHeight: 1, textShadow: `0 0 40px ${C.orange}66` }}>
            {pct}
          </div>
          <div style={{ color: C.gray, fontSize: 48, fontWeight: 700 }}>à</div>
          <div style={{ color: C.green, fontSize: 96, fontWeight: 900, lineHeight: 1, textShadow: `0 0 40px ${C.green}66` }}>
            {pct2}
          </div>
          <div style={{ color: C.white, fontSize: 56, fontWeight: 700 }}>%</div>
        </div>
        <div style={{ color: C.white, fontSize: 26, fontWeight: 600, marginTop: 8 }}>
          des activités <span style={{ color: C.green }}>créent de la valeur</span>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ opacity: tagOp, marginTop: 36, textAlign: "center" }}>
        <div style={{ color: C.gray, fontSize: 20, fontStyle: "italic" }}>
          Attentes · Reprises · Déplacements inutiles… Et si on changeait de regard ?
        </div>
      </div>
    </AbsoluteFill>
  );
};
