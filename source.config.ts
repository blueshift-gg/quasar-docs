import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
import type { Nodes, RootContent } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx';

type MdxElement = MdxJsxFlowElement | MdxJsxTextElement;

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: {
        headingIds: false,
        onStringify(node: Nodes) {
          if (!isMdxElement(node)) {
            return;
          }

          node.data ??= {};

          if (node.name === 'Cards') {
            node.data._stringify = 'children-only';
            return;
          }

          if (node.name === 'Card') {
            node.data._stringify = {
              text: formatCard(node),
            };
          }
        },
      },
    },
  },
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

function isMdxElement(node: Nodes): node is MdxElement {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
}

function formatCard(node: MdxElement) {
  const title = readAttribute(node, 'title');
  const href = readAttribute(node, 'href');
  const description = normalizeText(extractText(node));
  const parts = [];

  if (title && href) {
    parts.push(`- [${title}](${href})`);
  } else if (title) {
    parts.push(`- ${title}`);
  } else if (href) {
    parts.push(`- ${href}`);
  }

  if (description) {
    if (parts.length > 0) {
      parts[0] = `${parts[0]}: ${description}`;
    } else {
      parts.push(`- ${description}`);
    }
  }

  return parts.join('');
}

function readAttribute(node: MdxElement, name: string) {
  const attribute = node.attributes.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name
  );

  if (!attribute || typeof attribute.value !== 'string') {
    return '';
  }

  return attribute.value;
}

function extractText(node: { children?: RootContent[] } | RootContent): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if (!('children' in node) || !node.children) {
    return '';
  }

  return node.children.map((child) => extractText(child)).join(' ');
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}
