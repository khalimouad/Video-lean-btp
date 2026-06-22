import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "../colors";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const helmetScale = spring({
    fps,
    frame,
    config: { stiffness: 110, damping: 10 },
    durationInFrames: 32,
  });

  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const titleY       = interpolate(frame, [12, 45], [80, 0],   clamp);
  const titleOp      = interpolate(frame, [12, 45], [0, 1],    clamp);
  const subOp        = interpolate(frame, [38, 62], [0, 1],    clamp);
  const lineW        = interpolate(frame, [52, 83], [0, 700],  clamp);
  const taglineOp    = interpolate(frame, [65, 82], [0, 1],    clamp);
  const sceneOp      = interpolate(frame, [275, 300], [1, 0],    clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, ${C.bgMid} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Grid background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={C.blue} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Helmet icon */}
      <div style={{ transform: `scale(${helmetScale})`, marginBottom: 48 }}>
        <svg width="150" height="130" viewBox="0 0 150 130" fill="none">
          <ellipse cx="75" cy="116" rx="68" ry="14" fill={C.orange} opacity="0.2" />
          <path d="M 12 82 Q 12 26 75 12 Q 138 26 138 82 Z" fill={C.orange} />
          <path
            d="M 12 82 Q 12 26 75 12 Q 138 26 138 82 Z"
            fill="url(#hg)"
            opacity="0.4"
          />
          <rect x="4" y="78" width="142" height="18" rx="9" fill={C.orangeDk} />
          <rect x="68" y="12" width="14" height="22" rx="5" fill="white" opacity="0.55" />
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="150" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="0.3" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main title */}
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: C.white,
            fontSize: 102,
            fontWeight: 900,
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          LEAN SIX SIGMA
        </div>
      </div>

      {/* Subtitle */}
      <div style={{ opacity: subOp, marginTop: 22 }}>
        <div
          style={{
            color: C.orange,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "7px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          dans le BTP &amp; Construction
        </div>
      </div>

      {/* Gradient line */}
      <div
        style={{
          width: lineW,
          height: 5,
          background: `linear-gradient(90deg, ${C.orange}, ${C.blue})`,
          marginTop: 28,
          borderRadius: 3,
        }}
      />

      {/* Tagline */}
      <div style={{ opacity: taglineOp, marginTop: 22 }}>
        <div
          style={{
            color: C.gray,
            fontSize: 22,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Performance · Qualité · Excellence
        </div>
      </div>
    </AbsoluteFill>
  );
};
