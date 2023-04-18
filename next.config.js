/** @type {import('next').NextConfig} */

const { version } = require('./package.json')

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

const nextConfig = {
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
  async headers() {
    return [
      {
        // Apply these headers to all routes.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
