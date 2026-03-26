import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import logoFull from '@/app/images/logo-full.webp';

const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Image src={logoFull} alt="Quasar" width={300} height={200} className='w-32 mb-2' />,
    url: "/docs"
  },
  githubUrl: 'https://github.com/blueshift-gg/quasar',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout themeSwitch={{enabled: false}} tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
