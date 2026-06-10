/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    // /experience/[slug] was merged into /projects/[slug]; keep old URLs alive.
    return [
      {
        source: "/:locale(de|en)/experience/:slug",
        destination: "/:locale/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
