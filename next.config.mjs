/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pbs.twimg.com",
      "encrypted-tbn0.gstatic.com",
      "images.pexels.com",
      "i.pinimg.com",
      "via.placeholder.com",
      "images.unsplash.com", // Add this line
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
