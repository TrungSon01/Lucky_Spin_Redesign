export function process_name(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
}
