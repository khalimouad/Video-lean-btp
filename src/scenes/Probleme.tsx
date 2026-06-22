import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { C, F } from "../colors";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  icon: React.ReactNode;
  startFrame: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  suffix,
  label,
  sublabel,
  color,
  icon,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  const slideX  = interpolate(frame, [startFrame, startFrame + 30], [-120, 0], clamp);
  const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1],    clamp);
  const count   = Math.round(interpolate(frame, [startFrame + 20, startFrame + 70], [0, value], clamp));

  return (
    <div
      style={{
        transform: `translateX(${slideX}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "28px 40px",
        background: C.bgCard,
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        borderLeft: `5px solid ${color}`,
        backdropFilter: "blur(8px)",
        marginBottom: 20,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `${color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Stat number */}
      <div
        style={{
          color,
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1,
          minWidth: 160,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        {suffix}
      </div>

      {/* Text */}
      <div>
        <div style={{ color: C.white, fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
          {label}
        </div>
        <div style={{ color: C.gray, fontSize: 18, marginTop: 6 }}>{sublabel}</div>
      </div>
    </div>
  );
};

export const Probleme: React.FC = () => {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 250, 270], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${C.bg} 0%, #1a0f2e 100%)`,
        padding: "0 140px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        opacity: sceneOp,
        fontFamily: F,
      }}
    >
      {/* Section badge */}
      <div
        style={{
          color: C.orange,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: interpolate(frame, [5, 25], [0, 1], clamp),
        }}
      >
        Le constat
      </div>

      {/* Title */}
      <div
        style={{
          color: C.white,
          fontSize: 54,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 52,
          opacity: interpolate(frame, [5, 30], [0, 1], clamp),
          transform: `translateY(${interpolate(frame, [5, 30], [30, 0], clamp)}px)`,
        }}
      >
        Le secteur BTP face à ses défis
      </div>

      {/* Stat cards */}
      <StatCard
        value={57}
        suffix="%"
        label="du temps est improductif"
        sublabel="Gaspillages, attentes, retouches sur les chantiers"
        color={C.orange}
        startFrame={30}
        icon={
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15" stroke={C.orange} strokeWidth="2.5" />
            <path d="M18 10 L18 18 L24 18" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        }
      />
      <StatCard
        value={30}
        suffix="%"
        label="de dépassements budgétaires"
        sublabel="En moyenne sur les projets de construction"
        color={C.blue}
        startFrame={85}
        icon={
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="8" y="10" width="20" height="16" rx="3" stroke={C.blue} strokeWidth="2.5" />
            <path d="M12 10 L12 7" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 10 L24 7" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 16 L28 16" stroke={C.blue} strokeWidth="2" />
          </svg>
        }
      />
      <StatCard
        value={20}
        suffix="%"
        label="des projets livrés avec retard"
        sublabel="Manque de coordination et de planification efficace"
        color={C.purple}
        startFrame={140}
        icon={
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 6 L30 28 L6 28 Z" stroke={C.purple} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M18 16 L18 21" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="18" cy="24" r="1.5" fill={C.purple} />
          </svg>
        }
      />
    </AbsoluteFill>
  );
};
