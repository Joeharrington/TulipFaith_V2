"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const STORAGE_KEY = "tulipfaith_journal";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export default function JournalPage() {
  const [entries, setEntries]     = useState([]);
  const [title, setTitle]         = useState("");
  const [scripture, setScripture] = useState("");
  const [body, setBody]           = useState("");
  const [expanded, setExpanded]   = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) queueMicrotask(() => setEntries(JSON.parse(saved)));
    } catch { /* ignore */ }

    // Pre-fill from a story highlight
    try {
      const pending = sessionStorage.getItem("tulipfaith_journal_pending");
      if (pending) {
        const entry = JSON.parse(pending);
        sessionStorage.removeItem("tulipfaith_journal_pending");
        queueMicrotask(() => {
          if (entry.scripture) setScripture(entry.scripture);
          if (entry.body)      setBody(entry.body);
        });
        // Scroll to form
        setTimeout(() => document.getElementById("j-body")?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
      }
    } catch { /* ignore */ }
  }, []);

  function saveEntries(next) {
    setEntries(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;
    const entry = {
      id:        crypto.randomUUID(),
      title:     title.trim() || null,
      scripture: scripture.trim() || null,
      body:      body.trim(),
      createdAt: new Date().toISOString(),
    };
    saveEntries([entry, ...entries]);
    setTitle("");
    setScripture("");
    setBody("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function deleteEntry(id) {
    saveEntries(entries.filter((e) => e.id !== id));
    if (expanded === id) setExpanded(null);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0f0c18" }}>
      <Header />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative px-6 py-28 md:py-40 text-center"
          style={{
            background: "linear-gradient(to bottom, #1a1228 0%, #0f0c18 100%)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-6 font-medium"
            style={{ color: "var(--color-fall-amber)", letterSpacing: "0.2em" }}
          >
            Personal Faith Journal
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "#f5efe8" }}
          >
            Write What God Is Doing
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#a89fbc" }}
          >
            A quiet place to record your prayers, reflections, and what you are
            hearing from Scripture. These words stay on your device alone.
          </p>

          {/* decorative line */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div style={{ width: 60, height: 1, background: "rgba(196,118,58,0.3)" }} />
            <span style={{ color: "var(--color-fall-amber)", fontSize: 18 }}>✦</span>
            <div style={{ width: 60, height: 1, background: "rgba(196,118,58,0.3)" }} />
          </div>
        </section>

        {/* ── New Entry Form ────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "#130f1e" }}>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)", color: "#f5efe8" }}
            >
              New Entry
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="j-title"
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "#a89fbc", letterSpacing: "0.15em" }}
                >
                  Title <span style={{ opacity: 0.5 }}>(optional)</span>
                </label>
                <input
                  id="j-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A word or phrase for this moment…"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background:  "rgba(255,255,255,0.05)",
                    border:      "1px solid rgba(168,159,188,0.2)",
                    color:       "#f5efe8",
                    fontFamily:  "var(--font-body)",
                  }}
                />
              </div>

              {/* Scripture */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="j-scripture"
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "#a89fbc", letterSpacing: "0.15em" }}
                >
                  Scripture Reference <span style={{ opacity: 0.5 }}>(optional)</span>
                </label>
                <input
                  id="j-scripture"
                  type="text"
                  value={scripture}
                  onChange={(e) => setScripture(e.target.value)}
                  placeholder="e.g. John 11:25"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background:  "rgba(255,255,255,0.05)",
                    border:      "1px solid rgba(168,159,188,0.2)",
                    color:       "#f5efe8",
                    fontFamily:  "var(--font-body)",
                  }}
                />
              </div>

              {/* Body */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="j-body"
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "#a89fbc", letterSpacing: "0.15em" }}
                >
                  Your Reflection
                </label>
                <textarea
                  id="j-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What is God placing on your heart today?"
                  rows={7}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background:  "rgba(255,255,255,0.05)",
                    border:      "1px solid rgba(168,159,188,0.2)",
                    color:       "#f5efe8",
                    fontFamily:  "var(--font-body)",
                    lineHeight:  "1.7",
                  }}
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{
                    background:    "var(--color-fall-amber)",
                    color:         "#fff",
                    letterSpacing: "0.15em",
                  }}
                >
                  Save Entry
                </button>
                {submitted && (
                  <span
                    className="text-sm italic"
                    style={{ color: "var(--color-fall-amber)" }}
                  >
                    Entry saved.
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div
          className="mx-auto"
          style={{ maxWidth: 640, height: 1, background: "rgba(168,159,188,0.12)" }}
        />

        {/* ── Entries ──────────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: "#0f0c18" }}>
          <div className="max-w-2xl mx-auto">
            {entries.length === 0 ? (
              <div className="text-center py-16">
                <p
                  className="text-lg italic"
                  style={{ fontFamily: "var(--font-display)", color: "#a89fbc" }}
                >
                  Your journal is empty. The first word is yours to write.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-semibold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "#f5efe8" }}
                >
                  Your Entries
                </h2>
                {entries.map((entry) => {
                  const open = expanded === entry.id;
                  return (
                    <div
                      key={entry.id}
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border:     "1px solid rgba(168,159,188,0.14)",
                      }}
                    >
                      {/* entry header — always visible */}
                      <button
                        onClick={() => setExpanded(open ? null : entry.id)}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                        style={{ background: "transparent" }}
                      >
                        <div className="flex flex-col gap-1">
                          <span
                            className="text-base font-semibold"
                            style={{ fontFamily: "var(--font-display)", color: "#f5efe8" }}
                          >
                            {entry.title || <em style={{ opacity: 0.5 }}>Untitled</em>}
                          </span>
                          <span className="text-xs" style={{ color: "#a89fbc" }}>
                            {formatDate(entry.createdAt)}
                            {entry.scripture && (
                              <span style={{ color: "var(--color-fall-amber)", marginLeft: 10 }}>
                                {entry.scripture}
                              </span>
                            )}
                          </span>
                        </div>
                        <span style={{ color: "#a89fbc", fontSize: 18, flexShrink: 0, marginTop: 2 }}>
                          {open ? "−" : "+"}
                        </span>
                      </button>

                      {/* expanded body */}
                      {open && (
                        <div className="px-6 pb-6 flex flex-col gap-4">
                          <p
                            className="text-sm leading-relaxed whitespace-pre-wrap"
                            style={{ color: "#d4ccdf", lineHeight: "1.85" }}
                          >
                            {entry.body}
                          </p>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="self-start text-xs uppercase tracking-widest transition-opacity hover:opacity-80"
                            style={{
                              color:         "rgba(168,159,188,0.45)",
                              letterSpacing: "0.15em",
                              background:    "transparent",
                              border:        "none",
                              cursor:        "pointer",
                            }}
                          >
                            Delete entry
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Scripture footer ─────────────────────────────────── */}
        <section
          className="py-12 px-6 text-center"
          style={{ background: "#130f1e" }}
        >
          <blockquote
            className="max-w-xl mx-auto text-lg italic font-light"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-fall-amber)" }}
          >
            "Write the vision; make it plain on tablets, so he may run who reads it."
          </blockquote>
          <cite
            className="block mt-3 text-xs not-italic tracking-widest uppercase"
            style={{ color: "#a89fbc", letterSpacing: "0.15em" }}
          >
            Habakkuk 2:2
          </cite>
        </section>

      </main>

      <Footer />
    </div>
  );
}
