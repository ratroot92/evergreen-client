/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_AUTH_SERVICE_API_URL: 'http://0.0.0.0:8081/api',
    publicAssetsUrl: 'http://0.0.0.0:8080',
  },
  images: {
    domains: ['0.0.0.0:8080', '0.0.0.0'],
    // formats: ['image/avif', 'image/webp'],
  },
};
