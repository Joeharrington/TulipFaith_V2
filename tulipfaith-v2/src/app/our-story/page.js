import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Our Story — Tulip Faith",
  description: "A tribute to Susan, and the love that gave this place its light.",
};

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-parchment)" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-6 py-32 md:py-48"
          style={{
            background: "linear-gradient(160deg, #2b0c3b 0%, #4E2060 50%, var(--color-fall-rust) 100%)",
          }}
        >
          <p
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.25em" }}
          >
            In Memoriam
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-4xl leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Susan lives in Christ.
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
          >
            This is her story — and ours. I offer it to God with gratitude, love, and trust.
          </p>
        </section>

        {/* ── The Story ────────────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "var(--color-parchment)" }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              Who She Was
            </h2>

            {/*
              ── PERSONAL CONTENT NEEDED ──────────────────────────────
              Replace the paragraphs below with your own words about Susan.
              Who she was. What she loved. Her faith. Your life together.
              ─────────────────────────────────────────────────────── */}
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
              Susan was my beloved — a woman of deep and quiet faith, warmth that filled every room she entered,
              and a love that asked nothing and gave everything. She walked through this world with a gentle certainty
              that God was present in all of it: in the ordinary days, in the hard ones, and in the ones she could not see coming.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
              She loved Scripture not as a set of rules but as a living conversation — a voice she returned to in the
              morning, in grief, in gratitude, and in wonder. She believed in the resurrection not as a distant doctrine
              but as the most personal and present truth she knew.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              She was also, simply, my person. And then she was gone — and I was left holding everything she had
              quietly taught me about God, love, and what it means to keep walking toward the light even when you
              cannot see where you are going.
            </p>
          </div>
        </section>

        {/* ── Scripture ────────────────────────────────────────────── */}
        <section className="px-6 pb-4" style={{ background: "var(--color-parchment)" }}>
          <div className="max-w-2xl mx-auto">
            <blockquote className="scripture-block text-lg">
              "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live,
              and everyone who lives and believes in me shall never die."
            </blockquote>
            <cite
              className="block mt-2 mb-10 text-sm not-italic tracking-widest uppercase"
              style={{ color: "var(--color-warm-gray)", letterSpacing: "0.15em" }}
            >
              John 11:25–26
            </cite>
          </div>
        </section>

        {/* ── How This Began ───────────────────────────────────────── */}
        <section className="py-20 px-6" style={{ background: "white" }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              How This Began
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
              In the months after Susan passed, I found myself doing what grief forces you to do: sitting still
              long enough to ask the questions you have been too busy to ask. Who was she to me? Who was God to her?
              Who is He to me now? And what do I do with all of this love that has nowhere left to go?
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--color-charcoal)" }}>
              TulipFaith began as an answer to that last question. A way to take what Susan left behind — her faith,
              her gentleness, her belief that Jesus was the truest thing in any room — and offer it to the world in
              the form of stories. Stories for adults walking through grief or doubt. Stories for teenagers who are
              searching for something real. Stories for children who are only just beginning to ask the biggest questions.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
              I offer it to God. I offer it to her memory. And I offer it to you — wherever you are in your walk,
              whatever you are carrying — in the hope that Christ meets you here, just as He met her.
            </p>
          </div>
        </section>

        {/* ── Dedication ───────────────────────────────────────────── */}
        <section
          className="py-24 px-6 text-center"
          style={{
            background: "linear-gradient(135deg, var(--color-fall-rust) 0%, var(--color-fall-amber) 40%, var(--color-violet-deep) 100%)",
          }}
        >
          <div className="max-w-xl mx-auto">
            <p
              className="text-xl md:text-2xl italic font-light leading-relaxed text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              In remembrance of my beloved, beautiful Susan.
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
            >
              May she keep a light lit for me in our Heavenly Home,
              until we are reunited in Christ.
            </p>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 text-center" style={{ background: "var(--color-parchment)" }}>
          <div className="max-w-xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}
            >
              Come and read.
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: "var(--color-warm-gray)" }}>
              The stories are waiting. Some will make you cry. Some will make you wonder.
              All of them point toward the same Light.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/stories/adult" className="btn-primary">Begin Reading</Link>
              <Link href="/about" className="btn-secondary">About Tulip Faith</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
