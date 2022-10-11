/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "nordiccoder.com",
      "cdn.tgdd.vn",
      "wiki.tino.org",
      "www.sysleaf.com",
      "product.bachkhoa-aptech.edu.vn",
    ],
    loader: "default",
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
