import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
import type { Heading, Nodes, RootContent } from 'mdast';
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx';
import type { Info, State } from 'mdast-util-to-markdown';

type MdxElement = MdxJsxFlowElement | MdxJsxTextElement;

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: {
        headingIds: false,
        handlers: {
          heading(node: Heading, _parent: unknown, state: State, info: Info) {
            // Keep section structure as markdown headings instead of flattened text.
            const content = state.containerPhrasing(node, info);
            return `${'#'.repeat(node.depth)} ${content}`;
          },
        },
        onStringify(node: Nodes) {
          // Drop raw html images e.g. <img src="..." />
          if (node.type === 'html' && /^\s*<img\b/i.test(node.value)) {
            node.data ??= {};
            node.data._stringify = { text: '' };
            return;
          }

          // Only MDX JSX elements need the custom Card / Cards handling below.
          if (!isMdxElement(node)) {
            return;
          }

          node.data ??= {};

          // Drop markdown images e.g. ![alt](src)
          if (node.name === 'img') {
            node.data._stringify = { text: '' };
            return;
          }

          // Unwrap the container so each Card controls its own output.
          if (node.name === 'Cards') {
            node.data._stringify = 'children-only';
            return;
          }

          // Render cards as simple bullet links with optional descriptions.
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
