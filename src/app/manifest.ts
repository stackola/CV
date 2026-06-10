import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Willi Krappen - Fullstack Product Engineer",
    short_name: "Willi Krappen",
    description:
      "Portfolio and CV of Willi Krappen, fullstack product engineer based in Münster, Germany.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#0f0f0f",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
