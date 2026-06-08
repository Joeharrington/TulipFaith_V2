import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Teen & Young Adult Stories — Tulip Faith",
  description: "Stories for the search — identity, faith, and finding what is real.",
};

const COMING_SOON = [
  {
    slug:        "something-real",
    title:       "Something Real",
    description: "In a world full of noise, one question keeps coming back: is any of this actually true?",
    tag:         "Faith & Doubt",
    status:      "coming-soon",
  },
  {
    slug:        "the-weight-you-carry",
    title:       "The Weight You Carry",
    description: "Shame is a heavy thing. But it was never meant to be yours to carry alone.",
    tag:         "Identity & Shame",
    status:      "coming-soon",
  },
  {
    slug:        "not-what-they-told-me",
    title:       "Not What They Told Me",
    description: "Everything she believed about God came from other people. Then she met Him herself.",
    tag:         "Searching",
    status:      "coming-soon",
  },
];

export default function TeenStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative px-6 py-28 md:py-40 text-center"
          style={{ background: "linear-gradient(to bottom, #E8F5E2, var(--color-parchment))" }}
        >
          <span className="badge-teen mb-6 inline-block">Teen & Young Adult</span>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
          >
            Stories for the Search
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-warm-gray)" }}
          >
            Identity, shame, culture, pressure, and the battle between worldly confusion
            and the truth found in Christ. You are not the only one asking these questions.
          </p>
        </section>

        {/* ── Scripture ─────────────────────────────────────────────── */}
        <section className="py-12 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <blockquote
            className="max-w-xl mx-auto text-lg italic font-light"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-green-vine)" }}
          >
            "Do not be conformed to this world, but be transformed by the renewal of your mind."
          </blockquote>
          <cite className="block mt-3 text-xs not-italic tracking-widest uppercase"
            style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}>
            Romans 12:2
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
                    border:      "1px solid #E8F5E2",
                    boxShadow:   "0 2px 12px rgba(74,124,63,0.06)",
                    opacity:     0.75,
                  }}
                >
                  <span className="badge-teen self-start">{story.tag}</span>
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
                    href={`/stories/teen/${story.slug}`}
                    className="text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-green-leaf)", letterSpacing: "0.15em" }}
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
                These stories are still being shaped. Check back soon.
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
