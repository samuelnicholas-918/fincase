import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FinCase Raymond Edition — one company splitting into three";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0E1A",
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            color: "#C9A84C",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          FinCase · Edition #1
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, color: "#FFFFFF", lineHeight: 1.15, maxWidth: 900 }}>
            In 2024, one of India&apos;s oldest companies split itself in three.
          </div>
          <div style={{ fontSize: 28, color: "#A8B0C0", maxWidth: 800 }}>
            Raymond&apos;s demerger — told through its own numbers.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            fontFamily: "monospace",
            fontSize: 22,
            color: "#C9A84C",
          }}
        >
          <span>₹8,215 Cr</span>
          <span>82% debt cut</span>
          <span>850× Realty</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
