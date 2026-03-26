import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    qualities: [95],
  
  }
};

const withMDX = createMDX();
export default withMDX(config);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
