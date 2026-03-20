import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const aspekta = localFont({
  src: [
    {
      path: './fonts/Aspekta-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Aspekta-450.woff2',
      weight: '450',
      style: 'normal',
    },
    {
      path: './fonts/Aspekta-500.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
});


export const metadata: Metadata = {
  title: {
    template: '%s | Quasar',
    default: 'Quasar — Zero-Copy Solana Framework',
  },
  description: 'Zero-copy, zero-allocation Solana programs with Anchor-level developer experience.',
  openGraph: {
    type: 'website',
    url: 'https://quasar-lang.com',
    title: 'Quasar — Zero-Copy Solana Framework',
    description: 'Zero-copy, zero-allocation Solana programs with Anchor-level developer experience.',
    images: [
      { url: 'https://quasar-lang.com/meta-image.png' },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        className={aspekta.className}
      >
        <RootProvider
          search={{ enabled: true }}
          theme={{ forcedTheme: 'dark' }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
