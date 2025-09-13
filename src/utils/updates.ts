const formatUpdatesContent = (content: string): string => {
  if (!content) return "";

  return content
    .replace(/^-+\s*/, "")
    .split(" - ")
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => `- ${line}`)
    .join("\n");
};

export { formatUpdatesContent };
