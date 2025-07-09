/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s3-alpha.figma.com"],
  },
  // 기본 최적화 설정만 유지
  optimizeFonts: true,
  async headers() {
    return [
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
