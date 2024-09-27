/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nextui.org',"upload.wikimedia.org","img-new.cgtrader.com"], // Add the domain here
  },
};

module.exports = nextConfig;
