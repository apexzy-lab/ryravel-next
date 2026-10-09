/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/contact", destination: "/request", permanent: true },
      { source: "/contact-us", destination: "/request", permanent: true },
      { source: "/forms", destination: "/request", permanent: true },
      { source: "/services", destination: "/journeys", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/tours/stillness", destination: "/journeys/stillness", permanent: true },
      { source: "/journeys/renewed", destination: "/journeys/exhausted", permanent: true },
      { source: "/journeys/ex11", destination: "/journeys/ex6", permanent: true },
      { source: "/journeys/yakushima-silence", destination: "/journeys/ex6", permanent: true },
    ];
  },
};

export default nextConfig;
