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

  webpack: (config, { dev }) => {
    const terserOptions = {
      compress: {
        // Example: disable console.log removal
        drop_console: false,
      },
    }
    // Customize minification plugin - next already comes with that plugin, but if we want to customize
    // it we can do that...
    if (!dev) {
      // Minify JavaScript in production
      const TerserPlugin = require('terser-webpack-plugin')
      config.optimization.minimizer.push(new TerserPlugin({ terserOptions }))
    }

    return config
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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'my-company-os',
    project: 'javascript-nextjs',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
)
