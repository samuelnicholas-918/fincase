import { notFound } from "next/navigation";
import { ChapterShell } from "@/components/story/ChapterShell";
import { chapterSlugs, getChapter } from "@/lib/data";

export function generateStaticParams() {
  return chapterSlugs.map((chapter) => ({ chapter }));
}

export function generateMetadata({ params }: { params: { chapter: string } }) {
  const chapter = getChapter(params.chapter);
  if (!chapter) return { title: "Chapter not found" };
  return {
    title: `Chapter ${chapter.id}: ${chapter.title} · FinCase`,
    description: chapter.question,
  };
}

export default function StoryChapterPage({ params }: { params: { chapter: string } }) {
  const chapter = getChapter(params.chapter);
  if (!chapter) notFound();
  return <ChapterShell chapter={chapter} />;
}
