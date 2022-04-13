/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        sw: "serviceWorker.js",
      },
    },
  ],
  nextConfig,
]);
