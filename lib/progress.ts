const KEY = "fincase-chapter-progress";

export function getCompletedChapters(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function markChapterComplete(id: number): number[] {
  const current = getCompletedChapters();
  if (current.includes(id)) return current;
  const next = [...current, id].sort((a, b) => a - b);
  sessionStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
