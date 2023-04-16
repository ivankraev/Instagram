/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')
const { version } = require('./package.json')
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  i18n,
  reactStrictMode: false,
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_VERSION: version,
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    UNSPLASH_API_URL: process.env.UNSPLASH_API_URL,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
  },
  images: {
    domains: [process.env.IMAGE_HOST ?? 'localhost', 'images.unsplash.com'],
  },
}

module.exports = withPWA(nextConfig)
