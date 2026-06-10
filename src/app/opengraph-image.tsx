import { ImageResponse } from "next/og";
import { personalInfo } from "@/data/cv";

export const alt = "Willi Krappen - Fullstack Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "hsl(0, 0%, 6%)",
          color: "hsl(0, 0%, 98%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 820,
            height: 480,
            borderRadius: 9999,
            background: "hsl(348, 60%, 48%)",
            opacity: 0.25,
            filter: "blur(120px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "hsl(348, 60%, 48%)",
            }}
          />
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>prototyp.ms</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {personalInfo.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              color: "hsl(0, 0%, 64%)",
            }}
          >
            {`${personalInfo.role.en} · ${personalInfo.location}`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
