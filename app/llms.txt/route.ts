import { llms } from 'fumadocs-core/source';

import {
  llmMarkdownContentType,
  rewriteDocLinksToMarkdown,
} from '@/lib/get-llm-text';
import { siteMetadata } from '@/site.config';
import { source } from '@/lib/source';

export const revalidate = false;

export function GET() {
  const docsRootPage = source.getPage([]);
  const title = docsRootPage?.data.title
    ? `${docsRootPage.data.title} Documentation`
    : 'Documentation';
  const description =
    docsRootPage?.data.description ?? siteMetadata.description ?? '';
  const index = llms(source, {
    renderDescription(node) {
      return typeof node.description === 'string' ? node.description : '';
    },
  }).index();
  const markdownIndex = rewriteDocLinksToMarkdown(index);
  const [, ...rest] = markdownIndex.split('\n');
  const body = `# ${title}

${description}

${rest.join('\n')}`;

  return new Response(`${body.trimEnd()}\n`, {
    headers: {
      'Content-Type': llmMarkdownContentType,
    },
  });
}