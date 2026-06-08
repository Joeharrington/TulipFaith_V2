import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HighlightToJournal from "@/components/story/HighlightToJournal";
import { getPost, formatDate } from "@/lib/still-waters";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title:       `${post.title} — Still Waters — Tulip Faith`,
    description: post.excerpt,
  };
}

export default async function StillWatersPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />
      <HighlightToJournal />

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-32 text-center"
          style={{ background: "linear-gradient(to bottom, #EAF0F6, var(--color-parchment))" }}>
          <Link href="/still-waters"
            className="text-xs uppercase tracking-widest mb-6 inline-block transition-opacity hover:opacity-60"
            style={{ color: "#4A7FA5", letterSpacing: "0.2em" }}>
            ← Still Waters
          </Link>
          <p className="text-xs uppercase tracking-widest mb-4 font-medium"
            style={{ color: "#4A7FA5", letterSpacing: "0.2em" }}>
            {formatDate(post.date)}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
            {post.title}
          </h1>
          <p className="text-lg max-w-xl mx-auto leading-relaxed italic"
            style={{ color: "var(--color-warm-gray)", fontFamily: "var(--font-display)" }}>
            {post.excerpt}
          </p>
        </section>

        {/* ── Body ──────────────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "white" }}>
          <article className="max-w-2xl mx-auto">
            {post.body.map((paragraph, i) => (
              <p
                key={i}
                className="selectable-text"
                style={{
                  fontFamily:   "var(--font-body)",
                  fontSize:     "1.1rem",
                  lineHeight:   "1.95",
                  color:        "var(--color-warm-gray)",
                  marginBottom: "1.6rem",
                  fontStyle:    paragraph.length < 60 ? "italic" : "normal",
                }}
              >
                {paragraph}
              </p>
            ))}
          </article>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-16 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <div className="max-w-lg mx-auto flex flex-col gap-4 items-center">
            <p className="text-lg italic mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-primary)" }}>
              Something worth sitting with? Write it down.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/journal" className="btn-primary">Open My Journal</Link>
              <Link href="/prayer-wall" className="btn-secondary">Visit the Prayer Wall</Link>
            </div>
            <Link href="/still-waters"
              className="mt-4 text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: "#4A7FA5", letterSpacing: "0.2em" }}>
              ← More Still Waters
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
