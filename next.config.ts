import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.dneskoucuju.cz" }],
        destination: "https://dneskoucuju.cz/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dneskoucuju.cz" }],
        destination: "https://dneskoucuju.cz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
