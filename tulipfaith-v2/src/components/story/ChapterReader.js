"use client";

import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HighlightToJournal from "@/components/story/HighlightToJournal";

const FlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TRACK_COLOR = {
  adult:    "var(--color-violet-primary)",
  teen:     "var(--color-green-vine)",
  children: "var(--color-fall-amber)",
};

const SECTIONS = [
  { key: "narrative", label: "Story",   icon: "📖" },
  { key: "study",     label: "Study",   icon: "✝️" },
  { key: "prayer",    label: "Prayer",  icon: "🙏" },
  { key: "morning",   label: "Morning", icon: "☀️" },
  { key: "evening",   label: "Evening", icon: "🌙" },
];

// No scrolling — overflow is clipped, content flows to the next page
const BookPage = forwardRef(({ children, accent, pageIndex, isMobile }, ref) => {
  const sideClass = isMobile ? "book-page-mobile" : pageIndex % 2 === 0 ? "book-page-left" : "book-page-right";

  return (
  <div ref={ref} className={`book-page ${sideClass}`} style={{ "--book-accent": accent }}>
    <div className="book-page-accent" />
    <div className="book-page-content">
      {children}
    </div>
  </div>
  );
});
BookPage.displayName = "BookPage";

// Two-pass paginator: first page can use a different max height than continuation pages
function paginateHtmlFirstAndRest(html, firstMaxH, contMaxH, width, fontCss) {
  if (!html || typeof document === "undefined") return [html || ""];
  const firstSplit = paginateHtml(html, firstMaxH, width, fontCss);
  if (firstSplit.length <= 1) return firstSplit;
  const remaining = firstSplit.slice(1).join("");
  return [firstSplit[0], ...paginateHtml(remaining, contMaxH, width, fontCss)];
}

// When a single <p> is taller than maxH, split it at sentence boundaries
function splitPBySentence(innerHtml, maxH, host) {
  const marked = innerHtml.replace(/([.!?])\s+(?=[A-Z])/g, "$1\x00");
  const sentences = marked.split("\x00").filter((s) => s.trim());
  if (sentences.length <= 1) return [`<p>${innerHtml}</p>`];
  const chunks = [];
  let cur = "";
  for (const sent of sentences) {
    const next = cur ? cur + " " + sent : sent;
    host.innerHTML = `<p>${next}</p>`;
    if (host.scrollHeight > maxH && cur) {
      chunks.push(`<p>${cur}</p>`);
      cur = sent;
    } else {
      cur = next;
    }
  }
  if (cur) chunks.push(`<p>${cur}</p>`);
  return chunks.length ? chunks : [`<p>${innerHtml}</p>`];
}

// Splits an HTML string into page-height chunks.
// Splits at paragraph boundaries first; if a single paragraph still exceeds maxH,
// falls back to sentence-boundary splitting within that paragraph.
function paginateHtml(html, maxH, width, fontCss) {
  if (!html || typeof document === "undefined") return [html || ""];
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = `position:absolute;top:-9999px;left:-9999px;width:${width}px;overflow:hidden;${fontCss}`;
  document.body.appendChild(host);

  const temp = document.createElement("div");
  temp.innerHTML = html;
  const nodes = Array.from(temp.childNodes).filter(
    (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())
  );

  const pages = [];
  let acc = "";

  for (const node of nodes) {
    const chunk = node.outerHTML ?? node.textContent ?? "";
    if (!chunk.trim()) continue;

    host.innerHTML = acc + chunk;
    if (host.scrollHeight <= maxH) { acc += chunk; continue; }

    // Adding chunk overflows — save current page
    if (acc) { pages.push(acc); acc = ""; }

    // Check if chunk alone fits
    host.innerHTML = chunk;
    if (host.scrollHeight <= maxH) { acc = chunk; continue; }

    // Chunk alone is too big — split at sentence boundaries if it is a <p>
    const subChunks = node.tagName?.toLowerCase() === "p" && node.innerHTML
      ? splitPBySentence(node.innerHTML, maxH, host)
      : [chunk];
    for (let i = 0; i < subChunks.length - 1; i++) pages.push(subChunks[i]);
    acc = subChunks[subChunks.length - 1];
  }

  if (acc) pages.push(acc);
  document.body.removeChild(host);
  return pages.length ? pages : [html];
}

// ── Page content renderers ────────────────────────────────────────────────────

function VerseList({ verses, heading, accent }) {
  if (!verses?.length) return null;
  return (
    <div className="mb-4">
      <h4 className="text-xs uppercase tracking-widest mb-2 font-medium"
        style={{ color: accent, letterSpacing: "0.2em" }}>{heading}</h4>
      <div className="flex flex-col gap-3">
        {verses.map((v, i) => (
          <blockquote key={i} className="pl-3" style={{ borderLeft: `3px solid ${accent}55` }}>
            {v.text && (
              <p className="text-sm italic mb-0.5 leading-relaxed selectable-text"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
                {v.text}
              </p>
            )}
            <cite className="text-xs not-italic font-medium uppercase tracking-widest"
              style={{ color: accent }}>{v.reference}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

function renderPageContent(page, accent, storyChapters, chapterPageStarts, bookRef) {
  switch (page.type) {

    case "preface":
      return (
        <div>
          <p className="text-xs uppercase tracking-widest mb-5 font-medium"
            style={{ color: accent, letterSpacing: "0.25em" }}>Preface</p>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.9", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      );

    case "preface-cont":
      return (
        <div>
          <p className="text-xs italic mb-3" style={{ color: accent, opacity: 0.5 }}>— continued —</p>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.9", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      );

    case "toc":
      return (
        <div>
          <p className="text-xs uppercase tracking-widest mb-6 font-medium"
            style={{ color: accent, letterSpacing: "0.25em" }}>Table of Contents</p>
          <div className="flex flex-col gap-1">
            {(storyChapters || []).map((ch) => {
              const pageIdx = chapterPageStarts?.[ch.id];
              return (
                <div key={ch.id}
                  onClick={() => ch.unlocked && pageIdx != null && bookRef.current?.pageFlip()?.flip(pageIdx, "top")}
                  className="flex items-baseline gap-3 py-2"
                  style={{
                    borderBottom: `1px solid ${accent}18`,
                    cursor: ch.unlocked ? "pointer" : "default",
                    opacity: ch.unlocked ? 1 : 0.45,
                  }}>
                  <span className="text-xs font-medium flex-shrink-0"
                    style={{ color: accent }}>Ch. {ch.chapter_number}</span>
                  <span className="text-sm flex-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
                    {ch.title}
                  </span>
                  {!ch.unlocked && (
                    <span className="text-xs italic flex-shrink-0" style={{ color: "var(--color-warm-gray)" }}>
                      Coming soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );

    case "nar-first":
      return (
        <>
          <div className="mb-4 pb-3" style={{ borderBottom: `2px solid ${accent}22` }}>
            <p className="text-xs uppercase tracking-widest mb-1 font-medium"
              style={{ color: accent, letterSpacing: "0.2em" }}>
              Chapter {page.chapterNumber}
            </p>
            <h2 className="text-xl font-bold mb-1 leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
              {page.chapterTitle}
            </h2>
            {page.periodSetting && (
              <p className="text-xs italic" style={{ color: "var(--color-warm-gray)" }}>{page.periodSetting}</p>
            )}
          </div>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.9", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </>
      );

    case "nar-cont":
      return (
        <>
          <p className="text-xs italic mb-3" style={{ color: accent, opacity: 0.5 }}>— continued —</p>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.9", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </>
      );

    case "study-header":
      return (
        <>
          {page.subtitle && (
            <h2 className="text-lg font-bold mb-4 leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
              {page.subtitle}
            </h2>
          )}
          <VerseList verses={page.foundationVerses} heading="Foundation" accent={accent} />
          <VerseList verses={page.fulfillmentVerses} heading="Fulfillment" accent={accent} />
        </>
      );

    case "ref-first":
      return (
        <>
          <h4 className="text-xs uppercase tracking-widest mb-3 font-medium"
            style={{ color: accent, letterSpacing: "0.2em" }}>Reflection</h4>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.85", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </>
      );

    case "ref-cont":
      return (
        <>
          <p className="text-xs italic mb-3" style={{ color: accent, opacity: 0.5 }}>— continued —</p>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: "1.85", color: "var(--color-warm-gray)" }}
            dangerouslySetInnerHTML={{ __html: page.html }} />
        </>
      );

    case "questions":
      return (
        <div>
          <h4 className="text-xs uppercase tracking-widest mb-3 font-medium"
            style={{ color: accent, letterSpacing: "0.2em" }}>Questions for Reflection</h4>
          <ol className="flex flex-col gap-3">
            {page.questions.map((q, i) => (
              <li key={i} className="flex gap-2 selectable-text">
                <span className="text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: accent }}>{i + 1}.</span>
                <p className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-warm-gray)" }}>{q}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "prayer":
      return (
        <div className="flex flex-col items-center text-center pt-4">
          <p className="text-xs uppercase tracking-widest mb-5 font-medium"
            style={{ color: accent, letterSpacing: "0.25em" }}>A Prayer</p>
          <div className="selectable-text"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", lineHeight: "2",
              color: "var(--color-violet-primary)", fontStyle: "italic", whiteSpace: "pre-wrap" }}>
            {page.prayer}
          </div>
        </div>
      );

    case "morning":
    case "evening": {
      const isM = page.type === "morning";
      const devAccent = isM ? "#4A7FA5" : accent;
      return (
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${devAccent}33` }}>
            <span style={{ fontSize: "1.25rem" }}>{isM ? "☀️" : "🌙"}</span>
            <h2 className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
              {isM ? "Morning" : "Evening"} Devotional
            </h2>
          </div>
          {page.scripture && (
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest mb-1 font-medium"
                style={{ color: devAccent, letterSpacing: "0.2em" }}>Scripture</p>
              <p className="text-sm selectable-text"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)", fontStyle: "italic" }}>
                {page.scripture}
              </p>
            </div>
          )}
          {page.meditation && (
            <div className="mb-4 pl-3" style={{ borderLeft: `3px solid ${devAccent}44` }}>
              <p className="text-xs uppercase tracking-widest mb-1 font-medium"
                style={{ color: devAccent, letterSpacing: "0.2em" }}>Meditation</p>
              <p className="text-sm leading-relaxed selectable-text"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-warm-gray)" }}>{page.meditation}</p>
            </div>
          )}
          {page.journalPrompt && (
            <div className="mt-3 p-4 rounded-xl" style={{ background: `${devAccent}10`, border: `1px solid ${devAccent}22` }}>
              <p className="text-xs uppercase tracking-widest mb-1 font-medium"
                style={{ color: devAccent, letterSpacing: "0.2em" }}>Journal Prompt</p>
              <p className="text-sm leading-relaxed selectable-text"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-warm-gray)" }}>{page.journalPrompt}</p>
              <Link href="/journal"
                className="inline-block mt-3 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-70"
                style={{ color: devAccent, letterSpacing: "0.15em" }}>
                Open Journal →
              </Link>
            </div>
          )}
        </div>
      );
    }

    case "blank":
      return <div />;

    default:
      return null;
  }
}

// ── Build flat page descriptor array from story + loaded chapters ─────────────
function buildPageDescriptors(story, chapters, pageSize) {
  const padTop    = 28;
  const padBot    = 48; // exact padding bottom
  const padSides  = 64;
  const contentH  = pageSize.height - padTop - padBot;
  const contentW  = pageSize.width - padSides;
  // headerH must cover: chapter label + possibly 2-line title + possibly 2-line period + all margins
  const headerH   = 170;
  // contLabel covers the small "— continued —" line + its mb-3
  const contLabel = 36;
  // labelH covers "Preface" / "Reflection" headings + their bottom margin
  const labelH    = 44;
  // SAFE: one full line at 1rem * 1.9 line-height = ~31px, gives real clearance
  const SAFE      = 32;
  const prose     = "font-size:1rem;line-height:1.9;font-family:var(--font-body)";

  const descs = [];
  const chapterPageStarts = {};
  const chapterSectionStarts = {};

  // Preface — subtract label height so label + content never exceed the page
  if (story.prologue) {
    const prefaceParts = paginateHtmlFirstAndRest(
      story.prologue,
      contentH - labelH - SAFE,
      contentH - contLabel - SAFE,
      contentW,
      prose
    );
    prefaceParts.forEach((html, i) => descs.push({
      type: i === 0 ? "preface" : "preface-cont",
      html 
    }));
  }

  // Table of contents
  descs.push({ type: "toc" });

  // Chapter pages
  for (const ch of chapters) {
    // First narrative page carries the chapter header; continuation pages carry only the small label
    const narParts = paginateHtmlFirstAndRest(
      ch.narrative_body || "",
      contentH - headerH - SAFE,
      contentH - contLabel - SAFE,
      contentW,
      prose
    );
    // First reflection page carries the "Reflection" heading; continuation pages carry only the small label
    const refParts = ch.reflection
      ? paginateHtmlFirstAndRest(
          ch.reflection,
          contentH - labelH - SAFE,
          contentH - contLabel - SAFE,
          contentW,
          prose
        )
      : [];

    chapterPageStarts[ch.id] = descs.length;
    chapterSectionStarts[ch.id] = {};

    // Narrative
    chapterSectionStarts[ch.id].narrative = descs.length;
    descs.push({ type: "nar-first", html: narParts[0],
      chapterNumber: ch.chapter_number, chapterTitle: ch.title, periodSetting: ch.period_setting });
    for (let i = 1; i < narParts.length; i++) descs.push({ type: "nar-cont", html: narParts[i] });

    // Study
    chapterSectionStarts[ch.id].study = descs.length;
    descs.push({ type: "study-header",
      subtitle: ch.reflection_subtitle,
      foundationVerses: ch.foundation_verses,
      fulfillmentVerses: ch.fulfillment_verses });

    if (refParts.length) {
      descs.push({ type: "ref-first", html: refParts[0] });
      for (let i = 1; i < refParts.length; i++) descs.push({ type: "ref-cont", html: refParts[i] });
    }
    if (ch.reflection_questions?.length) descs.push({ type: "questions", questions: ch.reflection_questions });

    // Prayer
    chapterSectionStarts[ch.id].prayer = descs.length;
    descs.push({ type: "prayer", prayer: ch.prayer });

    // Morning
    chapterSectionStarts[ch.id].morning = descs.length;
    descs.push({ type: "morning",
      scripture: ch.morning_scripture, meditation: ch.morning_meditation, journalPrompt: ch.morning_journal });

    // Evening
    chapterSectionStarts[ch.id].evening = descs.length;
    descs.push({ type: "evening",
      scripture: ch.evening_scripture, meditation: ch.evening_meditation, journalPrompt: ch.evening_journal });
  }

  // Pad to even number for spread view
  if (descs.length % 2 !== 0) descs.push({ type: "blank" });

  return { descs, chapterPageStarts, chapterSectionStarts };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ChapterReader({ track, slug }) {
  const router  = useRouter();
  const bookRef = useRef(null);

  const [story,              setStory]              = useState(null);
  const [chapters,           setChapters]           = useState([]);
  const [loadingStory,       setLoadingStory]       = useState(true);
  const [loadingCh,          setLoadingCh]          = useState(false);
  const [isMobile,           setIsMobile]           = useState(false);
  const [pageSize,           setPageSize]           = useState({ width: 420, height: 620 });
  const [pageDescriptors,    setPageDescriptors]    = useState([]);
  const [chapterPageStarts,  setChapterPageStarts]  = useState({});
  const [chapterSecStarts,   setChapterSecStarts]   = useState({});
  const [currentChapterId,   setCurrentChapterId]   = useState(null);
  const [currentSectionKey,  setCurrentSectionKey]  = useState("narrative");

  const accent = TRACK_COLOR[track] || TRACK_COLOR.adult;

  // Responsive sizing
  useEffect(() => {
    let t;
    function calc() {
      const w = window.innerWidth;
      if (w < 700) {
        setIsMobile(true);
        setPageSize({ width: Math.min(w - 32, 380), height: 560 });
      } else {
        setIsMobile(false);
        const pw = Math.min(Math.floor((w - 80) / 2), 460);
        setPageSize({ width: pw, height: Math.round(pw * 1.48) });
      }
    }
    function onResize() { clearTimeout(t); t = setTimeout(calc, 150); }
    calc();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  // Load story
  useEffect(() => {
    fetch(`${API}/api/stories/${track}/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setStory(data); setLoadingStory(false); })
      .catch(() => { setStory(null); setLoadingStory(false); });
  }, [track, slug]);

  // Load all unlocked chapters when story is ready
  useEffect(() => {
    if (!story) return;
    const unlocked = story.chapters?.filter((c) => c.unlocked) || [];
    if (!unlocked.length) return;
    queueMicrotask(() => setLoadingCh(true));
    Promise.all(unlocked.map((c) =>
      fetch(`${API}/api/chapters/${c.id}`).then((r) => r.ok ? r.json() : null)
    ))
      .then((results) => {
        setChapters(results.filter(Boolean));
        setLoadingCh(false);
        if (results[0]) setCurrentChapterId(results[0].id);
      })
      .catch(() => setLoadingCh(false));
  }, [story]);

  // Rebuild pages when chapters or page size changes
  useEffect(() => {
    if (!story || !chapters.length || !pageSize.height) return;
    const { descs, chapterPageStarts: cps, chapterSectionStarts: css } =
      buildPageDescriptors(story, chapters, pageSize);
    queueMicrotask(() => {
      setPageDescriptors(descs);
      setChapterPageStarts(cps);
      setChapterSecStarts(css);
    });
  }, [story, chapters, pageSize.width, pageSize.height]);

  function onFlip(e) {
    const p = e.data;
    // Determine which chapter and section we're on
    let foundChId = currentChapterId;
    let foundSec  = currentSectionKey;

    for (const [chId, secStarts] of Object.entries(chapterSecStarts)) {
      const chStart = chapterPageStarts[chId];
      const nextChStart = Math.min(...Object.values(chapterPageStarts).filter(v => v > chStart).concat([Infinity]));
      if (p >= chStart && p < nextChStart) {
        foundChId = parseInt(chId);
        const secEntries = Object.entries(secStarts).sort((a, b) => b[1] - a[1]);
        for (const [key, start] of secEntries) {
          if (p >= start) { foundSec = key; break; }
        }
        break;
      }
    }

    setCurrentChapterId(foundChId);
    setCurrentSectionKey(foundSec);
  }

  function jumpToSection(sectionKey) {
    if (!currentChapterId || !chapterSecStarts[currentChapterId]) return;
    const target = chapterSecStarts[currentChapterId][sectionKey];
    if (target != null) {
      setCurrentSectionKey(sectionKey);
      bookRef.current?.pageFlip()?.flip(target, "top");
    }
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loadingStory) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{ borderColor: accent, borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: "var(--color-warm-gray)" }}>Opening the book…</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
        <h1 className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-violet-deep)" }}>
          This story is still being written.
        </h1>
        <p style={{ color: "var(--color-warm-gray)" }}>Come back soon — or lift a prayer while you wait.</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href={`/stories/${track}`} className="btn-secondary">← Back</Link>
          <Link href="/prayer-wall" className="btn-secondary">Prayer Wall</Link>
        </div>
      </div>
    );
  }

  const bookReady  = pageDescriptors.length > 0;
  const bookWidth  = isMobile ? pageSize.width : pageSize.width * 2;
  const currentCh  = chapters.find((c) => c.id === currentChapterId);
  const chapterMeta = story.chapters?.find((c) => c.id === currentChapterId);

  return (
    <div className="flex-1 flex flex-col" style={{ background: "var(--color-parchment)" }}>
      <HighlightToJournal />

      {/* Top bar */}
      <div className="sticky top-[85px] z-30 w-full"
        style={{ background: "rgba(250,248,245,0.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--color-lavender-pale)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href={`/stories/${track}`}
            className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60 flex-shrink-0"
            style={{ color: accent, letterSpacing: "0.15em" }}>
            ← {track.charAt(0).toUpperCase() + track.slice(1)} Stories
          </Link>
          <p className="text-xs text-center font-medium truncate" style={{ color: "var(--color-warm-gray)" }}>
            {story.title}{chapterMeta && ` · Ch. ${chapterMeta.chapter_number}`}
          </p>
          <div className="flex-shrink-0 w-24" />
        </div>

        {/* Section shortcut tabs — jump within current chapter */}
        <div className="max-w-5xl mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
          {SECTIONS.map((s) => {
            const active = s.key === currentSectionKey;
            return (
              <button key={s.key} onClick={() => jumpToSection(s.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  background: active ? accent : "transparent",
                  color:      active ? "white" : "var(--color-warm-gray)",
                  border:     `1px solid ${active ? accent : "transparent"}`,
                }}>
                <span>{s.icon}</span><span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book */}
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        {loadingCh || !bookReady ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 rounded-full border-2 animate-spin"
              style={{ borderColor: accent, borderTopColor: "transparent" }} />
          </div>
        ) : (
          <div className={`open-book-shell ${isMobile ? "open-book-shell-mobile" : ""}`}>
            <FlipBook
              ref={bookRef}
              width={pageSize.width}
              height={pageSize.height}
              size="fixed"
              minWidth={pageSize.width}
              maxWidth={pageSize.width}
              minHeight={pageSize.height}
              maxHeight={pageSize.height}
              showCover={false}
              drawShadow={true}
              maxShadowOpacity={0.55}
              flippingTime={1050}
              usePortrait={isMobile}
              startPage={0}
              startZIndex={10}
              autoSize={false}
              mobileScrollSupport={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
              onFlip={onFlip}
            >
              {pageDescriptors.map((page, i) => (
                <BookPage key={i} accent={accent} pageIndex={i} isMobile={isMobile}>
                  {renderPageContent(page, accent, story.chapters, chapterPageStarts, bookRef)}
                </BookPage>
              ))}
            </FlipBook>
          </div>
        )}

        {/* Simple prev / next — one page at a time, like a real book */}
        {bookReady && (
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => bookRef.current?.pageFlip()?.flipPrev("bottom")}
              className="px-5 py-2 rounded-xl text-sm transition-all"
              style={{ background: "white", border: `1px solid ${accent}44`, color: accent }}>
              ← Previous
            </button>
            <button
              onClick={() => bookRef.current?.pageFlip()?.flipNext("bottom")}
              className="px-5 py-2 rounded-xl text-sm transition-all"
              style={{ background: accent, border: `1px solid ${accent}`, color: "white" }}>
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
