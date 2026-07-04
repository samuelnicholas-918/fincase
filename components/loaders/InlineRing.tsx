export function InlineRing({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-4 w-4 animate-spin rounded-full border border-gold/20 border-t-gold ${className}`}
      style={{ animationDuration: "1.2s" }}
      role="status"
      aria-label="Loading"
    />
  );
}
