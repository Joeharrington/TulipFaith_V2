import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STILL_WATERS, formatDate } from "@/lib/still-waters";

export const metadata = {
  title:       "Still Waters — Tulip Faith",
  description: "Meditations on faith, life, and the quiet things that shape a soul.",
};

export default function StillWatersPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section
          className="px-6 py-28 md:py-40 text-center"
          style={{ background: "linear-gradient(to bottom, #EAF0F6, var(--color-parchment))" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
            Still Waters
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--color-warm-gray)" }}>
            Reflections on faith, life, and the small things that shape a soul.
            Written slowly, meant to be read the same way.
          </p>
        </section>

        {/* ── Scripture ─────────────────────────────────────────── */}
        <section className="py-12 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <blockquote className="max-w-xl mx-auto text-lg italic font-light"
            style={{ fontFamily: "var(--font-display)", color: "#4A7FA5" }}>
            "He leads me beside still waters. He restores my soul."
          </blockquote>
          <cite className="block mt-3 text-xs not-italic tracking-widest uppercase"
            style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}>
            Psalm 23:2–3
          </cite>
        </section>

        {/* ── Pieces ────────────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "white" }}>
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            {STILL_WATERS.map((post) => (
              <Link
                key={post.slug}
                href={`/still-waters/${post.slug}`}
                className="group flex flex-col gap-3 p-8 rounded-2xl transition-shadow hover:shadow-md"
                style={{
                  background:  "var(--color-parchment)",
                  border:      "1px solid #DDE8F0",
                  boxShadow:   "0 2px 12px rgba(74,127,165,0.06)",
                  textDecoration: "none",
                }}
              >
                <p className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "#4A7FA5", letterSpacing: "0.2em" }}>
                  {formatDate(post.date)}
                </p>
                <h2 className="text-2xl font-bold group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
                  {post.title}
                </h2>
                <p className="text-base leading-relaxed"
                  style={{ color: "var(--color-warm-gray)" }}>
                  {post.excerpt}
                </p>
                <span className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: "#4A7FA5", letterSpacing: "0.2em" }}>
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
