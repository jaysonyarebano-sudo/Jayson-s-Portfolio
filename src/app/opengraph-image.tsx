import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Text-only social card: no photos, logos or dashboard imagery.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1628",
          color: "#f7f5f0",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#8fd0bf" }}>JAYSON BANO</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            {profile.heroHeadline}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#c4ccd8" }}>{profile.titleLong}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#2c7364", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
