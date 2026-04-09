import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://quasar-lang.com'),
  title: {
    template: '%s | quasar',
    default: 'quasar 💫 — Build blazing fast Solana programs.',
  },
  description: 'A high-performance framework for building, testing and optimizing Solana programs.',
  openGraph: {
    type: 'website',
    url: 'https://quasar-lang.com',
    title: 'quasar 💫 — Build blazing fast Solana programs',
    description: 'A high-performance framework for building, testing and optimizing Solana programs.',
    images: [{ url: 'https://quasar-lang.com/meta-image.png' }],
  },
};