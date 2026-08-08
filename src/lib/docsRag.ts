import { docsKnowledgeBase, type DocsChunk } from "@/lib/docsKnowledgeBase";

// Keyword-overlap retrieval. DeepSeek doesn't expose an embeddings endpoint,
// and the docs corpus is small enough that a simple term-match score is a
// reasonable substitute for vector similarity — no vector store needed.
const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "to",
  "of",
  "in",
  "on",
  "for",
  "and",
  "or",
  "it",
  "this",
  "that",
  "how",
  "what",
  "do",
  "does",
  "i",
  "my",
  "can",
  "you",
  "your",
  "with",
  "if",
  "when",
  "not",
  "will",
  "use",
  "using",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

function scoreChunk(queryTokens: string[], chunk: DocsChunk): number {
  const body = chunk.content.toLowerCase();
  const title = chunk.title.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (body.includes(token)) score += 1;
    if (title.includes(token)) score += 1; // title matches count extra
  }
  return score;
}

export function retrieveRelevantChunks(query: string, k = 4): DocsChunk[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return docsKnowledgeBase
    .map((chunk) => ({ chunk, score: scoreChunk(tokens, chunk) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((entry) => entry.chunk);
}
