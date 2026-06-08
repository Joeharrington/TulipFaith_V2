import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About — Tulip Faith",
  description: "A story-led Bible study platform born from love, loss, and an unshakeable faith in Christ.",
};

const PILLARS = [
  {
    number: "01",
    title:  "To Remember",
    body:   "TulipFaith is a living tribute to Susan — a space to honor her memory and let her faith continue to speak. Her love for Christ is the foundational light of everything here.",
  },
  {
    number: "02",
    title:  "To Serve",
    body:   "This platform is an act of love for anyone who is lost, hurting, or spiritually disconnected. It was built to gently guide the searching back toward the flock — and to welcome anyone who has never been part of it.",
  },
  {
    number: "03",
    title:  "To Teach",
    body:   "Through storytelling, Scripture, reflection, and prayer, TulipFaith is a place of mutual growth. Every story is a vessel for encountering Jesus in a way that is honest, accessible, and personal.",
  },
];

const TRACKS = [
  {
    href:        "/stories/adult",
    badge:       "Adult",
    badgeClass:  "badge-adult",
    title:       "Faith Stories for Adults",
    description: "Stories of grief, marriage, loss, hope, and walking with Christ. Each chapter pairs narrative with Scripture, reflection, and prayer.",
  },
  {
    href:        "/stories/teen",
    badge:       "Teen & Young Adult",
    badgeClass:  "badge-teen",
    title:       "Stories for the Search",
    description: "Identity, shame, culture, pressure, and the battle between worldly confusion and the truth found in Christ.",
  },
  {
    href:        "/stories/children",
    badge:       "Children",
    badgeClass:  "badge-children",
    title:       "Parables for Little Hearts",
    description: "Gentle faith stories with moral lessons and questions for parents and children to explore together.",
  },
];

const AUDIENCE = [
  "The committed believer who wants to go deeper.",
  "The returning prodigal who isn't sure they're welcome.",
  "The grief-walker who is holding faith with both hands.",
  "The teenager who suspects there is something more real than what the world is selling.",
  "The Jesus-curious who has questions and no safe place to ask them.",
  "The parent who wants to give their child a foundation that lasts.",
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40"
          style={{ background: "linear-gradient(to bottom, var(--color-lavender-pale) 0%, var(--color-parchment) 100%)" }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: "var(--color-violet-primary)", letterSpacing: "0.2em" }}
          >
            Story · Scripture · Hope
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-4xl leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
          >
            A digital sanctuary for the seeking soul.
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--color-warm-gray)", fontFamily: "var(--font-body)" }}
          >
            TulipFaith is a story-led Bible study platform born from love, loss, and an unshakeable
            faith in Christ. It rejects noise and spectacle in favor of genuine, heartfelt connection
            — with God, with Scripture, and with others who are searching.
          </p>
        </section>

        {/* ── Three Pillars ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "white" }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              Why This Exists
            </h2>
            <p className="text-center mb-14 max-w-xl mx-auto" style={{ color: "var(--color-warm-gray)" }}>
              TulipFaith was built with three intertwined purposes.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {PILLARS.map(({ number, title, body }) => (
                <div key={number} className="flex flex-col gap-4">
                  <span
                    className="text-5xl font-bold"
                    style={{ color: "var(--color-lavender)", fontFamily: "var(--font-display)" }}
                  >
                    {number}
                  </span>
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-warm-gray)" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scripture ────────────────────────────────────────────── */}
        <section className="py-16 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <blockquote
            className="max-w-2xl mx-auto text-xl md:text-2xl italic font-light leading-relaxed"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-primary)" }}
          >
            "Ask, and it will be given to you; seek, and you will find;
            knock, and it will be opened to you."
          </blockquote>
          <cite
            className="block mt-4 text-sm not-italic tracking-widest uppercase"
            style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}
          >
            Matthew 7:7
          </cite>
        </section>

        {/* ── Who It's For ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "white" }}>
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-10"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              Who This Is For
            </h2>
            <ul className="flex flex-col gap-5">
              {AUDIENCE.map((line, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-1 flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: "var(--color-lavender)", marginTop: "0.55rem" }}
                  />
                  <p className="text-lg leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                    {line}
                  </p>
                </li>
              ))}
            </ul>
            <p
              className="mt-10 text-lg font-medium"
              style={{ color: "var(--color-violet-primary)", fontFamily: "var(--font-display)" }}
            >
              Wherever you are in your walk — you are welcome here.
            </p>
          </div>
        </section>

        {/* ── Story Tracks ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "var(--color-parchment)" }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              Three Tracks. One Truth.
            </h2>
            <p className="text-center mb-14 max-w-xl mx-auto" style={{ color: "var(--color-warm-gray)" }}>
              Every story leads to Christ. Choose the track that fits where you are.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {TRACKS.map(({ href, badge, badgeClass, title, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col gap-4 p-8 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: "white",
                    border:     "1px solid var(--color-lavender-pale)",
                    boxShadow:  "0 2px 12px rgba(78,32,96,0.06)",
                  }}
                >
                  <span className={badgeClass}>{badge}</span>
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-warm-gray)" }}>
                    {description}
                  </p>
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: "var(--color-violet-primary)" }}
                  >
                    Read stories →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6 text-center"
          style={{
            background: "linear-gradient(135deg, var(--color-violet-deep) 0%, #2b0c3b 100%)",
          }}
        >
          <div className="max-w-xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to begin?
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              The stories are waiting. Come and find Jesus through storytelling, Scripture,
              honest reflection, and the hope that still speaks beyond this life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stories/adult" className="btn-primary">Begin Reading</Link>
              <Link
                href="/our-story"
                className="inline-block px-8 py-3 rounded-full text-sm font-medium tracking-wide border transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border:  "1px solid rgba(255,255,255,0.4)",
                  color:   "white",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
