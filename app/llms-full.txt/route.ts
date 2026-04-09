import { getLLMText, llmMarkdownContentType } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const documents = await Promise.all(source.getPages().map((page) => getLLMText(page)));

  return new Response(documents.join('\n\n'), {
    headers: {
      'Content-Type': llmMarkdownContentType,
    },
  });
}