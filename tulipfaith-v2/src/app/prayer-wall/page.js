"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CATEGORIES = ["Healing", "Grief", "Marriage & Family", "Guidance", "Provision", "Salvation", "Gratitude", "Other"];

const PARTICLES = [
  { id:  0, left:  "2%",  size: 2,   dur: "14s", delay:  "0s"   },
  { id:  1, left:  "6%",  size: 1.5, dur: "11s", delay:  "2.3s" },
  { id:  2, left: "11%",  size: 2.5, dur: "16s", delay:  "0.7s" },
  { id:  3, left: "15%",  size: 1.5, dur:  "9s", delay:  "4.1s" },
  { id:  4, left: "19%",  size: 2,   dur: "13s", delay:  "1.5s" },
  { id:  5, left: "24%",  size: 1.5, dur: "10s", delay:  "6.2s" },
  { id:  6, left: "28%",  size: 3,   dur: "17s", delay:  "0.3s" },
  { id:  7, left: "33%",  size: 2,   dur: "12s", delay:  "3.8s" },
  { id:  8, left: "37%",  size: 1.5, dur:  "8s", delay:  "1.1s" },
  { id:  9, left: "41%",  size: 2,   dur: "15s", delay:  "5.5s" },
  { id: 10, left: "45%",  size: 1.5, dur: "11s", delay:  "2.9s" },
  { id: 11, left: "49%",  size: 2.5, dur: "13s", delay:  "0.2s" },
  { id: 12, left: "53%",  size: 2,   dur:  "9s", delay:  "4.7s" },
  { id: 13, left: "57%",  size: 1.5, dur: "16s", delay:  "1.8s" },
  { id: 14, left: "62%",  size: 3,   dur: "12s", delay:  "3.3s" },
  { id: 15, left: "66%",  size: 2,   dur: "10s", delay:  "6.8s" },
  { id: 16, left: "70%",  size: 1.5, dur: "14s", delay:  "0.6s" },
  { id: 17, left: "74%",  size: 2,   dur:  "8s", delay:  "2.2s" },
  { id: 18, left: "78%",  size: 1.5, dur: "15s", delay:  "5.0s" },
  { id: 19, left: "82%",  size: 2.5, dur: "11s", delay:  "1.4s" },
  { id: 20, left: "86%",  size: 2,   dur: "13s", delay:  "3.9s" },
  { id: 21, left: "90%",  size: 1.5, dur:  "9s", delay:  "0.9s" },
  { id: 22, left: "94%",  size: 2,   dur: "16s", delay:  "4.4s" },
  { id: 23, left: "98%",  size: 1.5, dur: "12s", delay:  "2.7s" },
];

function formatSessionTime(isoString, dayName) {
  if (!isoString) return null;
  try {
    const date     = new Date(isoString);
    const localDay = date.toLocaleDateString("en-US", { weekday: "long" });
    const time     = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short" });
    return localDay !== dayName ? `${localDay} at ${time}` : time;
  } catch { return null; }
}

function categoryToSlug(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function PrayerWallPage() {
  const [prayerFor,   setPrayerFor]   = useState("");
  const [anonymous,   setAnonymous]   = useState(false);
  const [category,    setCategory]    = useState("");
  const [text,        setText]        = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [prayers,     setPrayers]     = useState([]);
  const [categories,  setCategories]  = useState([]);
  const [prayedSlugs, setPrayedSlugs] = useState({});  // { slug: true } — already prayed
  const [session,     setSession]     = useState(null);

  useEffect(() => {
    fetch(`${API}/api/prayers`)
      .then(r => r.ok ? r.json() : []).catch(() => []).then(setPrayers);

    fetch(`${API}/api/prayer/categories`)
      .then(r => r.ok ? r.json() : []).catch(() => []).then(setCategories);

    fetch(`${API}/api/prayer/session`)
      .then(r => r.ok ? r.json() : null).catch(() => null).then(setSession);

    try {
      const saved = JSON.parse(localStorage.getItem("tf_prayed_cats") || "{}");
      queueMicrotask(() => setPrayedSlugs(saved));
    } catch { /* ignore */ }
  }, []);

  function getCategoryData(name) {
    return categories.find(c => c.name === name) || null;
  }

  async function handlePrayed(cat) {
    const data = getCategoryData(cat);
    if (!data || prayedSlugs[data.slug]) return;
    try {
      const res = await fetch(`${API}/api/prayer/categories/${data.slug}/prayed`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setCategories(prev => prev.map(c => c.slug === data.slug ? { ...c, prayed_count: json.prayed_count } : c));
        const next = { ...prayedSlugs, [data.slug]: true };
        setPrayedSlugs(next);
        try { localStorage.setItem("tf_prayed_cats", JSON.stringify(next)); } catch { /* ignore */ }
      }
    } catch { /* offline */ }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !category) return;
    setSubmitError("");
    setSubmitting(true);
    const body = {
      name:         anonymous ? "" : prayerFor.trim(),
      is_anonymous: anonymous,
      category,
      category_slug: categoryToSlug(category),
      content:      text.trim(),
    };
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`${API}/api/prayers`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
        signal:  controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Prayer request was not accepted.");
      const saved = await res.json().catch(() => null);
      if (saved) setPrayers(prev => [saved, ...prev]);
    } catch {
      setSubmitError("We could not submit this prayer yet. Please try again in a moment.");
      setSubmitting(false);
      return;
    }
    setPrayerFor("");
    setAnonymous(false);
    setCategory("");
    setText("");
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => setSubmitted(false), 5000);
  }

  const inputStyle = {
    background:  "rgba(255,255,255,0.05)",
    border:      "1px solid rgba(200,170,255,0.18)",
    color:       "rgba(255,255,255,0.88)",
    fontFamily:  "var(--font-body)",
    borderRadius: "0.75rem",
    padding:     "0.75rem 1.1rem",
    width:       "100%",
    fontSize:    "0.9rem",
    outline:     "none",
  };

  return (
    <>
      <style>{`
        @keyframes particle-rise {
          0%   { transform: translateY(0);      opacity: 0;   }
          12%  {                                opacity: 1;   }
          80%  {                                opacity: 0.9; }
          100% { transform: translateY(-110vh); opacity: 0;   }
        }
        select option { background: #1a1030; color: white; }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: "#06010f", color: "white" }}>
        <Header />

        {/* ── Golgotha image ─────────────────────────────────────── */}
        <section style={{ position: "relative", overflow: "hidden", height: "58vh", minHeight: "360px", background: "#06010f" }}>
          <Image
            src="/images/golgotha-scene.png"
            alt="The crucifixion at Golgotha"
            fill
            priority
            sizes="100vw"
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", filter: "brightness(0.30) saturate(0.5)" }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to bottom, transparent, #06010f)" }} />
        </section>

        {/* ── Particles ──────────────────────────────────────────── */}
        <div className="pointer-events-none" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 10, overflow: "hidden" }}>
          {PARTICLES.map(p => (
            <div key={p.id} style={{
              position: "absolute", bottom: 0, left: p.left,
              width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(210,185,255,0.5)`,
              animation: `particle-rise ${p.dur} ${p.delay} infinite linear`,
            }} />
          ))}
        </div>

        <div className="relative flex-1" style={{ zIndex: 20 }}>
          <div className="flex flex-col items-center px-6 py-14 md:py-20">

            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.3em" }}>
              Lift Your Voice to Heaven
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 max-w-2xl" style={{ fontFamily: "var(--font-display)" }}>
              The Prayer Wall
            </h1>
            <p className="italic text-center mb-12 max-w-md" style={{ color: "rgba(200,170,255,0.65)", fontFamily: "var(--font-display)", fontSize: "1rem" }}>
              "He always lives to make intercession for them."
              <br />
              <span className="not-italic text-xs tracking-widest" style={{ opacity: 0.65, letterSpacing: "0.2em" }}>HEBREWS 7:25</span>
            </p>

            {/* ── Community prayer callout ───────────────────────── */}
            {session?.scheduled && (
              <div className="w-full max-w-xl mb-12 rounded-2xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap"
                style={{ background: "rgba(123,63,140,0.18)", border: "1px solid rgba(200,170,255,0.18)" }}>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.2em" }}>Community Prayer Hour</p>
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Every {session.day_name} — {formatSessionTime(session.next_session_iso, session.day_name) || "see schedule"}
                  </p>
                </div>
                <Link href="/community-prayer"
                  className="text-xs uppercase tracking-widest whitespace-nowrap"
                  style={{ color: "var(--color-fall-amber)", letterSpacing: "0.15em" }}>
                  Join the Gathering →
                </Link>
              </div>
            )}

            {/* ── Submit form ────────────────────────────────────── */}
            <div className="w-full max-w-xl mb-16">
              <h2 className="text-lg font-semibold mb-6" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.7)" }}>
                Submit a Prayer Request
              </h2>

              {submitted ? (
                <div className="rounded-2xl px-6 py-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,170,255,0.12)" }}>
                  <p style={{ fontFamily: "var(--font-display)", color: "rgba(200,170,255,0.8)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                    Your prayer has been lifted.
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                    He hears. He intercedes. He is faithful.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Who is this prayer for */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.15em" }}>
                      Who is this prayer for?
                    </label>
                    <input
                      type="text"
                      value={anonymous ? "" : prayerFor}
                      onChange={e => setPrayerFor(e.target.value)}
                      disabled={anonymous}
                      placeholder={anonymous ? "Posted anonymously" : "A name, a family, a group…"}
                      style={{ ...inputStyle, opacity: anonymous ? 0.4 : 1 }}
                    />
                    <label className="flex items-center gap-2 cursor-pointer" style={{ color: "rgba(200,170,255,0.5)", fontSize: "0.8rem" }}>
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={e => setAnonymous(e.target.checked)}
                        style={{ accentColor: "var(--color-fall-amber)" }}
                      />
                      Post anonymously
                    </label>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.15em" }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      required
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Select a category…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Prayer text */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.15em" }}>
                      Prayer Request
                    </label>
                    <textarea
                      value={text}
                      onChange={e => setText(e.target.value)}
                      placeholder="Share what you are believing God for…"
                      rows={4}
                      required
                      style={{ ...inputStyle, resize: "none", lineHeight: "1.7" }}
                    />
                  </div>

                  {submitError && (
                    <p className="text-sm text-center px-4 py-3 rounded-xl" style={{ background: "rgba(185,28,28,0.16)", color: "#fecaca", border: "1px solid rgba(248,113,113,0.35)" }}>
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!text.trim() || !category || submitting}
                    className="w-full py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-200"
                    style={{
                      background:    text.trim() && category && !submitting ? "rgba(123,63,140,0.85)" : "rgba(123,63,140,0.25)",
                      color:         text.trim() && category && !submitting ? "white" : "rgba(255,255,255,0.3)",
                      border:        "1px solid rgba(200,170,255,0.22)",
                      cursor:        text.trim() && category && !submitting ? "pointer" : "default",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {submitting ? "Lifting…" : "Lift This Prayer ↑"}
                  </button>
                </form>
              )}
            </div>

            {/* ── Category prayer tiles ──────────────────────────── */}
            <div className="w-full max-w-xl">
              <p className="text-xs uppercase tracking-widest text-center mb-6" style={{ color: "rgba(200,170,255,0.35)", letterSpacing: "0.25em" }}>
                Pray With Us
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.filter(c => c !== "Other").map(cat => {
                  const data       = getCategoryData(cat);
                  const reqCount   = prayers.filter(p => p.category === cat).length;
                  const prayCount  = data?.prayed_count || 0;
                  const hasPrayed  = data ? !!prayedSlugs[data.slug] : false;
                  return (
                    <div key={cat} className="rounded-2xl px-5 py-4 flex flex-col gap-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,170,255,0.10)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.85)" }}>{cat}</p>
                        {reqCount > 0 && (
                          <p className="text-xs mt-0.5" style={{ color: "rgba(200,170,255,0.4)" }}>
                            {reqCount} {reqCount === 1 ? "request" : "requests"}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handlePrayed(cat)}
                        disabled={hasPrayed}
                        className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                        style={{
                          background:    "rgba(255,255,255,0.05)",
                          border:        "1px solid rgba(200,170,255,0.15)",
                          borderRadius:  "9999px",
                          padding:       "0.3rem 0.8rem",
                          color:         hasPrayed ? "var(--color-fall-amber)" : "rgba(200,170,255,0.5)",
                          cursor:        hasPrayed ? "default" : "pointer",
                          alignSelf:     "flex-start",
                          letterSpacing: "0.05em",
                          opacity:       hasPrayed ? 0.8 : 1,
                        }}
                      >
                        🙏 {hasPrayed ? `Prayed${prayCount > 0 ? ` · ${prayCount}` : ""}` : `I prayed for this${prayCount > 0 ? ` · ${prayCount}` : ""}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Prayer request cards ───────────────────────────── */}
            {prayers.length > 0 && (
              <div className="w-full max-w-xl mt-12 flex flex-col gap-4">
                <p className="text-xs uppercase tracking-widest text-center mb-2" style={{ color: "rgba(200,170,255,0.35)", letterSpacing: "0.25em" }}>
                  Prayers Rising
                </p>
                {prayers.slice(0, 20).map(p => (
                  <div key={p.id} className="rounded-xl px-6 py-5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,170,255,0.10)" }}>
                    <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                      <span className="text-xs font-medium" style={{ color: "var(--color-fall-amber)" }}>
                        Praying for {p.name || "Anonymous"}
                      </span>
                      {p.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(200,170,255,0.1)", color: "rgba(200,170,255,0.6)", border: "1px solid rgba(200,170,255,0.15)" }}>
                          {p.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
                      "{p.content}"
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
