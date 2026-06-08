import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Adult Stories — Tulip Faith",
  description: "Stories of grief, marriage, loss, hope, and walking with Christ.",
};

const COMING_SOON = [
  {
    slug:        "where-the-light-goes",
    title:       "Where the Light Goes",
    description: "A story of love, loss, and the faith that refused to let go.",
    tag:         "Grief & Hope",
    status:      "coming-soon",
  },
  {
    slug:        "the-long-way-home",
    title:       "The Long Way Home",
    description: "When the prodigal returns — not to a party, but to a quiet kitchen and a waiting father.",
    tag:         "Redemption",
    status:      "coming-soon",
  },
  {
    slug:        "bread-on-the-water",
    title:       "Bread on the Water",
    description: "A marriage, a diagnosis, and two people learning what covenant really means.",
    tag:         "Marriage & Suffering",
    status:      "coming-soon",
  },
];

export default function AdultStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative px-6 py-28 md:py-40 text-center"
          style={{ background: "linear-gradient(to bottom, var(--color-lavender-pale), var(--color-parchment))" }}
        >
          <span className="badge-adult mb-6 inline-block">Adult</span>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
          >
            Faith Stories for Adults
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-warm-gray)" }}
          >
            Stories of grief, marriage, loss, hope, and walking with Christ through all of it.
            Each chapter pairs honest narrative with Scripture, reflection, and prayer.
          </p>
        </section>

        {/* ── Scripture ─────────────────────────────────────────────── */}
        <section className="py-12 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <blockquote
            className="max-w-xl mx-auto text-lg italic font-light"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-primary)" }}
          >
            "Even though I walk through the valley of the shadow of death, I will fear no evil,
            for you are with me."
          </blockquote>
          <cite className="block mt-3 text-xs not-italic tracking-widest uppercase"
            style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}>
            Psalm 23:4
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
                    border:      "1px solid var(--color-lavender-pale)",
                    boxShadow:   "0 2px 12px rgba(78,32,96,0.05)",
                    opacity:     0.75,
                  }}
                >
                  <span className="badge-adult self-start">{story.tag}</span>
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
                    href={`/stories/adult/${story.slug}`}
                    className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-lavender)", letterSpacing: "0.15em" }}
                  >
                    Coming Soon
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty state message */}
            <div className="mt-16 text-center max-w-lg mx-auto">
              <p
                className="text-lg italic mb-6"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-primary)" }}
              >
                The first chapter is being written. Come back soon — or lift a prayer while you wait.
              </p>
              <Link href="/prayer-wall" className="btn-secondary">Visit the Prayer Wall</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
