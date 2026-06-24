"use client";

import { Player } from "@remotion/player";
import { LeanSixSigmaVideo } from "../Video";

const F =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TAGS = [
  "8 Gaspillages",
  "DMAIC",
  "Last Planner System",
  "5S Chantier",
  "Kanban",
  "Takt Planning",
  "Gemba Walk",
];

export default function PlayerWrapper() {
  return (
    <main
      style={{
        background: "linear-gradient(135deg, #0a0f1e 0%, #1e2d45 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "52px 24px 64px",
        fontFamily: F,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "44px" }}>
        <div
          style={{
            color: "#f97316",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "5px",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          Animation Remotion · BTP & Construction
        </div>
        <h1
          style={{
            color: "#f8fafc",
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 900,
            margin: 0,
            letterSpacing: "-2px",
            lineHeight: 1.05,
          }}
        >
          Lean Six Sigma
          <br />
          <span style={{ color: "#3b82f6" }}>dans le BTP</span>
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            marginTop: "16px",
            marginBottom: 0,
          }}
        >
          5 min 45 sec · 8 scènes · Avant / Après Lean Six Sigma
        </p>
      </div>

      {/* Remotion Player */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 30px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <Player
          component={LeanSixSigmaVideo}
          durationInFrames={10350}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{ width: "100%" }}
          controls
          autoPlay
          loop
          clickToPlay
          acknowledgeRemotionLicense
        />
      </div>

      {/* Scene overview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          width: "100%",
          maxWidth: "1280px",
          marginTop: "36px",
        }}
      >
        {[
          { t: "01 · Accroche", s: "0:00–0:20", c: "#f97316" },
          { t: "02 · Constat BTP", s: "0:20–1:05", c: "#3b82f6" },
          { t: "03 · Avant Chantier", s: "1:05–2:10", c: "#ef4444" },
          { t: "04 · DMAIC", s: "2:10–3:10", c: "#a855f7" },
          { t: "05 · Outils Lean", s: "3:10–4:10", c: "#f59e0b" },
          { t: "06 · Après Chantier", s: "4:10–4:45", c: "#22c55e" },
          { t: "07 · KPIs Avant/Après", s: "4:45–5:20", c: "#06b6d4" },
          { t: "08 · Conclusion", s: "5:20–5:45", c: "#a855f7" },
        ].map((item) => (
          <div
            key={item.t}
            style={{
              padding: "16px 20px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              border: `1px solid rgba(255,255,255,0.1)`,
              borderTop: `3px solid ${item.c}`,
            }}
          >
            <div
              style={{
                color: item.c,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {item.s}
            </div>
            <div style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: 700 }}>
              {item.t}
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "28px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {TAGS.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#94a3b8",
              padding: "7px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <p
        style={{
          color: "#475569",
          fontSize: "13px",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        Construit avec{" "}
        <span style={{ color: "#3b82f6" }}>Remotion</span> &amp;{" "}
        <span style={{ color: "#3b82f6" }}>Next.js</span> · Déployé sur Vercel
      </p>
    </main>
  );
}
