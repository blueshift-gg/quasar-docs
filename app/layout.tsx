import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Quasar',
    default: 'Quasar — Zero-Copy Solana Framework',
  },
  description: 'Zero-copy, zero-allocation Solana programs with Anchor-level developer experience.',
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
      >
        <RootProvider
          search={{ enabled: true }}
          theme={{ defaultTheme: 'dark' }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
