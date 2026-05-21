/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "endlesstrips.in", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "endlesstrips.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
