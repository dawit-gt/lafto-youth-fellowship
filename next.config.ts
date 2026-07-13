import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cmwrkylbscmjflixrnaj.supabase.co",
      },
    ],
  },
};

export default nextConfig;