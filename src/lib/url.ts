export function normalizeUrl(url: string): string {
  if (!url.startsWith("http")) {
    return `https://${url}`;
  }

  return url;
}

export function cleanWebsiteContent(
  headings: string[],
  paragraphs: string[],
): string {
  const combined = [...headings, ...paragraphs];

  // Remove duplicate content
  const uniqueContent = [...new Set(combined)];

  // Join text
  let content = uniqueContent.join("\n");

  // Remove extra spaces
  content = content.replace(/\s+/g, " ").trim();

  // Limit token size
  content = content.slice(0, 5000);

  return content;
}