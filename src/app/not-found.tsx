import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontFamily: "system-ui, sans-serif",
          background: "#0f0f0f",
          color: "#fafafa",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>404 - Page not found</h1>
        <Link href="/" style={{ color: "#e05a78" }}>
          ← Home
        </Link>
      </body>
    </html>
  );
}
