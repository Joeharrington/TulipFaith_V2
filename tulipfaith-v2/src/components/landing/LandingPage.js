import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--color-parchment)' }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40"
          style={{ background: 'linear-gradient(to bottom, var(--color-lavender-pale) 0%, var(--color-parchment) 100%)' }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: 'var(--color-violet-primary)', letterSpacing: '0.2em' }}
          >
            Story · Scripture · Hope
          </p>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-violet-deep)' }}
          >
            Where grief, love, and Scripture meet the hope of Christ.
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
            style={{ color: 'var(--color-warm-gray)', fontFamily: 'var(--font-body)' }}
          >
            Tulip Faith is a story-led Bible study platform born from love, loss, and an unshakeable faith.
            It is offered to God — and to anyone willing to look for Jesus in the pages of an honest story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stories/adult" className="btn-primary">Begin Reading</Link>
            <Link href="/our-story"     className="btn-secondary">Our Story</Link>
          </div>
        </section>

        {/* ── Scripture ────────────────────────────────────────────── */}
        <section className="py-16 px-6 text-center" style={{ background: 'var(--color-parchment)' }}>
          <blockquote
            className="max-w-2xl mx-auto text-xl md:text-2xl italic font-light leading-relaxed"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-violet-primary)' }}
          >
            "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live."
          </blockquote>
          <cite
            className="block mt-4 text-sm not-italic tracking-widest uppercase"
            style={{ color: 'var(--color-warm-gray)', letterSpacing: '0.15em' }}
          >
            John 11:25
          </cite>
        </section>

        {/* ── Story Tracks ─────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: 'white' }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-violet-deep)' }}
            >
              Find Your Story
            </h2>
            <p className="text-center mb-14 max-w-xl mx-auto"
              style={{ color: 'var(--color-warm-gray)' }}>
              Three tracks — one truth. Every story leads to Christ.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {TRACKS.map(({ href, badge, badgeClass, title, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col gap-4 p-8 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background:  'var(--color-parchment)',
                    border:      '1px solid var(--color-lavender-pale)',
                    boxShadow:   '0 2px 12px rgba(78,32,96,0.06)',
                  }}
                >
                  <span className={badgeClass}>{badge}</span>
                  <h3
                    className="text-xl font-semibold"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-violet-deep)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1"
                    style={{ color: 'var(--color-warm-gray)' }}>
                    {description}
                  </p>
                  <span
                    className="text-sm font-medium transition-colors"
                    style={{ color: 'var(--color-violet-primary)' }}
                  >
                    Read stories →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Susan's Story ────────────────────────────────────────── */}
        <section
          className="py-24 px-6 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-fall-rust) 0%, var(--color-fall-amber) 40%, var(--color-violet-deep) 100%)',
          }}
        >
          <div className="max-w-2xl mx-auto">
            <p
              className="text-sm uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2em' }}
            >
              In Memoriam
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Susan lives in Christ.
            </h2>
            <p
              className="text-lg leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}
            >
              This platform exists because of her — and because of a love that does not end.
              Come and read their story. It may help you understand yours.
            </p>
            <Link
              href="/our-story"
              className="inline-block px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border:     '1px solid rgba(255,255,255,0.4)',
                color:      'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              Read Our Story
            </Link>
          </div>
        </section>

        {/* ── Purpose ──────────────────────────────────────────────── */}
        <section className="py-20 px-6 text-center" style={{ background: 'var(--color-parchment)' }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-violet-deep)' }}
            >
              For the believer, the returning, the searching, and the unsure.
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--color-warm-gray)' }}>
              Whether you carry grief, carry questions, or carry a quiet longing you have never been able to name —
              you are welcome here. Come and find Jesus through storytelling, Biblical truth, honest reflection, and prayer.
            </p>
            <Link href="/about" className="btn-secondary">About Tulip Faith</Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
