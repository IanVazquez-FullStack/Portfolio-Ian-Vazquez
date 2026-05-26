export function readingTime(text: string): number {
  const trimmed = text.trim();
  const wordCount = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(minutes, 1);
}
