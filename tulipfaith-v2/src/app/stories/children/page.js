import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Children's Stories — Tulip Faith",
  description: "Gentle faith parables for little hearts, with questions for families to explore together.",
};

const COMING_SOON = [
  {
    slug:        "the-shepherd-who-searched",
    title:       "The Shepherd Who Searched",
    description: "A little lamb wanders far from the flock — and discovers just how far the Shepherd will go.",
    tag:         "God's Love",
  },
  {
    slug:        "the-seed-that-waited",
    title:       "The Seed That Waited",
    description: "Underground and unseen, a tiny seed learns that growth often happens in the dark.",
    tag:         "Faith & Patience",
  },
  {
    slug:        "starlight-on-the-water",
    title:       "Starlight on the Water",
    description: "A child grieving a grandparent finds comfort in a very old promise written in the sky.",
    tag:         "Grief & Heaven",
  },
];

export default function ChildrenStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative px-6 py-28 md:py-40 text-center"
          style={{ background: "linear-gradient(to bottom, #FFF3E8, var(--color-parchment))" }}
        >
          <span className="badge-children mb-6 inline-block">Children</span>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
          >
            Parables for Little Hearts
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-warm-gray)" }}
          >
            Gentle faith stories with moral lessons and questions for parents and children
            to explore together. Because the biggest questions deserve the simplest words.
          </p>
        </section>

        {/* ── Scripture ─────────────────────────────────────────────── */}
        <section className="py-12 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <blockquote
            className="max-w-xl mx-auto text-lg italic font-light"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-fall-amber)" }}
          >
            "Let the little children come to me, and do not hinder them,
            for the kingdom of heaven belongs to such as these."
          </blockquote>
          <cite className="block mt-3 text-xs not-italic tracking-widest uppercase"
            style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}>
            Matthew 19:14
          </cite>
        </section>

        {/* ── Stories grid ─────────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "white" }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {COMING_SOON.map((story) => (
                <div
                  key={story.slug}
                  className="flex flex-col gap-4 p-8 rounded-2xl"
                  style={{
                    background:  "var(--color-parchment)",
                    border:      "1px solid #FFF3E8",
                    boxShadow:   "0 2px 12px rgba(196,118,58,0.07)",
                    opacity:     0.75,
                  }}
                >
                  <span className="badge-children self-start">{story.tag}</span>
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
                  >
                    {story.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-warm-gray)" }}>
                    {story.description}
                  </p>
                  <Link
                    href={`/stories/children/${story.slug}`}
                    className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-fall-amber)", letterSpacing: "0.15em" }}
                  >
                    Coming Soon
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center max-w-lg mx-auto">
              <p
                className="text-lg italic mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-primary)" }}
              >
                These stories are being written with little ones in mind. Coming soon.
              </p>
              <Link href="/our-story" className="btn-secondary">Read Our Story</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
