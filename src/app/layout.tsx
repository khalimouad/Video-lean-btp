import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lean Six Sigma dans le BTP",
  description:
    "Vidéo animée Remotion — 90 secondes pour comprendre le Lean Six Sigma appliqué au secteur de la construction",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, background: "#0a0f1e" }}>
        {children}
      </body>
    </html>
  );
}
