/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.myntassets.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "constant.myntassets.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
