import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../colors";

// Storyboard Plan 4 (1:18–1:58) + extended
const OUTILS = [
  {
    id: "LPS", emoji: "📅", color: "#3b82f6",
    title: "Last Planner System",
    desc: "Chaque chef d'équipe s'engage sur ce qui est réellement faisable. Planning pull collaboratif construit ensemble.",
    tags: ["Planning pull", "Engagement terrain", "Look Ahead 6 semaines"],
    start: 35,
  },
  {
    id: "5S", emoji: "🧹", color: "#f97316",
    title: "5S Chantier",
    desc: "Trier · Ranger · Nettoyer · Standardiser · Pérenniser. Les zones sont rangées et standardisées.",
    tags: ["Seiri", "Seiton", "Seiso", "Seiketsu", "Shitsuke"],
    start: 320,
  },
  {
    id: "ZONE", emoji: "🗺️", color: "#22c55e",
    title: "Micro-zoning",
    desc: "Le chantier est découpé en micro-zones colorées par corps d'état — les équipes ne se gênent plus.",
    tags: ["Zones dédiées", "Flux séparés", "0 conflit"],
    start: 605,
  },
  {
    id: "JIT", emoji: "🚛", color: "#a855f7",
    title: "Juste-à-Temps",
    desc: "Le béton et les matériaux arrivent pile au bon moment — plus de stocks inutiles, plus d'attentes.",
    tags: ["0 stock excédentaire", "Livraison synchronisée", "Kanban fournisseur"],
    start: 890,
  },
  {
    id: "STAND", emoji: "🧍", color: "#f59e0b",
    title: "Point quotidien 15 min",
    desc: "Chaque matin, debout devant le tableau Last Planner. Synchronisation, blocages, décisions immédiates.",
    tags: ["15 minutes debout", "Tableau visuel", "Décision immédiate"],
    start: 1175,
  },
  {
    id: "KPI", emoji: "📊", color: "#06b6d4",
    title: "Management visuel & PPC",
    desc: "Le Pourcentage de Plans Complétés (PPC) mesure la fiabilité du planning. Objectif > 80%.",
    tags: ["PPC hebdomadaire", "Tableau de bord", "Causes d'écart"],
    start: 1460,
  },
];

const Card: React.FC<{ o: (typeof OUTILS)[0] }> = ({ o }) => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const op = interpolate(frame, [o.start, o.start + 25], [0, 1], cl);
  const y  = interpolate(frame, [o.start, o.start + 25], [32, 0], cl);

  return (
    <div style={{
      opacity: op, transform: `translateY(${y}px)`,
      padding: "18px 22px",
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderTop: `3px solid ${o.color}`,
      borderRadius: 14,
      display: "flex", gap: 16, alignItems: "flex-start",
    }}>
      <div style={{ width: 52, height: 52, borderRadius: 10, background: `${o.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1px solid ${o.color}44` }}>
        {o.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: o.color, fontSize: 10, fontWeight: 700, letterSpacing: "3px", marginBottom: 3 }}>{o.id}</div>
        <div style={{ color: C.white, fontSize: 17, fontWeight: 800, marginBottom: 5 }}>{o.title}</div>
        <div style={{ color: C.gray, fontSize: 14, lineHeight: 1.5, marginBottom: 8 }}>{o.desc}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {o.tags.map(t => (
            <span key={t} style={{ background: `${o.color}18`, color: o.color, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 12, border: `1px solid ${o.color}44` }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const OutilsLean: React.FC = () => {
  const frame = useCurrentFrame();
  const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  const sceneOp = interpolate(frame, [0, 20, 1758, 1800], [0, 1, 1, 0], cl);
  const left = OUTILS.filter((_, i) => i % 2 === 0);
  const right = OUTILS.filter((_, i) => i % 2 === 1);

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(140deg, #0a0f1e 0%, #1e2d45 100%)",
      padding: "46px 90px",
      display: "flex", flexDirection: "column",
      opacity: sceneOp, fontFamily: F,
    }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: C.yellow, fontSize: 13, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", marginBottom: 10, opacity: interpolate(frame, [5, 25], [0, 1], cl) }}>
          La mise en œuvre — Plan 4 du storyboard
        </div>
        <div style={{ color: C.white, fontSize: 42, fontWeight: 900, opacity: interpolate(frame, [5, 28], [0, 1], cl), transform: `translateY(${interpolate(frame, [5, 28], [22, 0], cl)}px)` }}>
          Les 6 outils Lean déployés sur le chantier
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {left.map(o => <Card key={o.id} o={o} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {right.map(o => <Card key={o.id} o={o} />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
