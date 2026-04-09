import type { InferPageType } from 'fumadocs-core/source';

import { source } from '@/lib/source';

type DocsPage = InferPageType<typeof source>;

const llmMarkdownContentType = 'text/markdown; charset=utf-8';

export { llmMarkdownContentType, rewriteDocLinksToMarkdown, toLLMMarkdownPath };

export async function getLLMText(page: DocsPage) {
  const processed = rewriteDocLinksToMarkdown(normalizeMarkdownSpacing(await page.data.getText('processed')));
  const description = normalizeText(page.data.description);
  const lines = [`# ${page.data.title} (${toLLMMarkdownPath(page.url)})`];

  if (description) {
    lines.push('', `> ${description}`);
  }

  if (processed) {
    lines.push('', processed);
  }

  return lines.join('\n');
}

function normalizeText(text?: string | null) {
  return text?.replace(/\s+/g, ' ').trim() ?? '';
}

function toLLMMarkdownPath(url: string) {
  if (url === '/docs') {
    return url;
  }

  return url.endsWith('.mdx') ? url : `${url}.mdx`;
}

function rewriteDocLinksToMarkdown(text: string) {
  return text.replace(/\]\((\/docs(?:\/[^)\s]*)?)\)/g, (_match, url: string) => {
    return `](${toLLMMarkdownPath(url)})`;
  });
}

function normalizeMarkdownSpacing(text: string) {
  return text.replace(/\n{3,}/g, '\n\n').trim();
}