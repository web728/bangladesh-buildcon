
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

// Initialize Cloudflare bindings during local Next.js development.
import("@opennextjs/cloudflare").then((m) =>
  m.initOpenNextCloudflareForDev()
);
