import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'gongbu',
    short_name: 'gongbu',
    description: 'Korean word study app',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f5',
    theme_color: '#f5f5f5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
