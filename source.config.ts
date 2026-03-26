import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkImage],
    rehypeCodeOptions: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'dracula-soft',
      },
    },
  },
});
