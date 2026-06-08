import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChapterReader from "@/components/story/ChapterReader";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchStory(track, slug) {
  try {
    const res = await fetch(`${API}/api/stories/${track}/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { track, slug } = await params;
  const story = await fetchStory(track, slug);
  return {
    title:       story ? `${story.title} — Tulip Faith` : "Story — Tulip Faith",
    description: story?.description || "A faith-based story on Tulip Faith.",
  };
}

export default async function StoryReaderPage({ params }) {
  const { track, slug } = await params;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />
      <ChapterReader track={track} slug={slug} />
      <Footer />
    </div>
  );
}
