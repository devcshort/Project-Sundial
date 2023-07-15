/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['purecatamphetamine.github.io'],
  },
};

module.exports = nextConfig;
