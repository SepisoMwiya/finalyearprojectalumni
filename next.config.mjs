/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pbs.twimg.com",
      "encrypted-tbn0.gstatic.com",
      "images.pexels.com",
      "i.pinimg.com",
      "via.placeholder.com",
      "images.unsplash.com",
      "randomuser.me",
      "plus.unsplash.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
