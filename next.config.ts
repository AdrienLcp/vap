import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        pathname: '**',
        protocol: 'https'
      },
      {
        hostname: '**',
        pathname: '**',
        protocol: 'http'
      }
    ]
  }
}

export default nextConfig
