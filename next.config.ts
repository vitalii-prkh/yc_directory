import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "placecats.com",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
  devIndicators: {
    position: "bottom-left",
  },
};

export default nextConfig;
