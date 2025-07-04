/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3-alpha.figma.com"],
  },
  // 기본 최적화 설정만 유지
  optimizeFonts: true,
};

module.exports = nextConfig;
 