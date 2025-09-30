/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",                 // emit static site to ./out
  images: { unoptimized: true },    // needed for GitHub Pages
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // No basePath/assetPrefix for username.github.io root
};