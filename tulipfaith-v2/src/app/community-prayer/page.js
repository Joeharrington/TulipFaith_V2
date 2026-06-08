"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ── Prayer script — unfolds on screen during the live session ──────────────
const PRAYER_SCRIPT = [
  { id:  0, delay:      0, text: "Lord, we come." },
  { id:  1, delay:   6000, text: "From different homes. Different struggles. Different names." },
  { id:  2, delay:  14000, text: "But gathered before You as one." },
  { id:  3, delay:  22000, text: "You know every heart in this room." },
  { id:  4, delay:  30000, text: "Every name. Every need.", },
  { id:  5, delay:  40000, text: "H E A L I N G", isCategory: true },
  { id:  6, delay:  47000, text: "We lift those asking for healing." },
  { id:  7, delay:  55000, text: "Bodies broken. Diagnoses feared. Pain carried in silence." },
  { id:  8, delay:  64000, text: "You are the God who heals. Heal now, Lord — according to Your will." },
  { id:  9, delay:  75000, text: "G R I E F", isCategory: true },
  { id: 10, delay:  82000, text: "We hold those walking through loss." },
  { id: 11, delay:  90000, text: "The grief is real. The ache is real." },
  { id: 12, delay:  98000, text: "You are acquainted with grief. Comfort them with what only You can give." },
  { id: 13, delay: 110000, text: "M A R R I A G E  &  F A M I L Y", isCategory: true },
  { id: 14, delay: 117000, text: "For marriages holding on. Families pulled apart." },
  { id: 15, delay: 125000, text: "What You have joined, strengthen. What is broken, restore." },
  { id: 16, delay: 135000, text: "G U I D A N C E", isCategory: true },
  { id: 17, delay: 142000, text: "For those standing at crossroads, waiting on You." },
  { id: 18, delay: 150000, text: "Make the path plain, Lord. Speak into the silence." },
  { id: 19, delay: 160000, text: "P R O V I S I O N", isCategory: true },
  { id: 20, delay: 167000, text: "For those in need — the ones too ashamed to say it out loud." },
  { id: 21, delay: 175000, text: "You own everything. Meet every need." },
  { id: 22, delay: 185000, text: "S A L V A T I O N", isCategory: true },
  { id: 23, delay: 192000, text: "For the ones who have walked away. The ones who have never known You." },
  { id: 24, delay: 200000, text: "Pursue them, Father. Do what only You can do." },
  { id: 25, delay: 212000, text: "We are grateful." },
  { id: 26, delay: 220000, text: "Even in the waiting. Even in the hard things. Even now." },
  { id: 27, delay: 229000, text: "You are good." },
  { id: 28, delay: 237000, text: "You have always been good." },
  { id: 29, delay: 246000, text: "We believe You." },
  { id: 30, delay: 256000, text: "Amen.", isAmen: true },
];

const SCRIPT_END = PRAYER_SCRIPT[PRAYER_SCRIPT.length - 1].delay + 8000;

const CATEGORIES = ["Healing", "Grief", "Marriage & Family", "Guidance", "Provision", "Salvation"];

function formatCountdown(ms) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(ms / 86400000),
    hours:   Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

function formatCentralTime(hour, minute) {
  const h    = hour % 12 || 12;
  const ampm = hour < 12 ? "AM" : "PM";
  const m    = minute === 0 ? "" : `:${String(minute).padStart(2, "0")}`;
  return `${h}${m} ${ampm} Central Time`;
}

function getUserLocalTime(isoString, sessionDayName) {
  if (!isoString) return null;
  try {
    const date       = new Date(isoString);
    const localDay   = date.toLocaleDateString("en-US", { weekday: "long" });
    const localTime  = date.toLocaleTimeString("en-US", {
      hour:           "numeric",
      minute:         "2-digit",
      hour12:         true,
      timeZoneName:   "short",
    });
    const isDifferentDay = localDay !== sessionDayName;
    return isDifferentDay ? `${localDay} at ${localTime}` : localTime;
  } catch {
    return null;
  }
}

// ── Particle layer ────────────────────────────────────────────────────────
const PARTICLES = [
  { id:  0, left:  "4%",  size: 2,   dur: "13s", delay:  "0s"   },
  { id:  1, left:  "9%",  size: 1.5, dur: "10s", delay:  "2.1s" },
  { id:  2, left: "15%",  size: 2.5, dur: "15s", delay:  "0.7s" },
  { id:  3, left: "21%",  size: 1.5, dur:  "9s", delay:  "4.3s" },
  { id:  4, left: "27%",  size: 2,   dur: "12s", delay:  "1.5s" },
  { id:  5, left: "33%",  size: 1.5, dur: "11s", delay:  "6.0s" },
  { id:  6, left: "39%",  size: 3,   dur: "16s", delay:  "0.3s" },
  { id:  7, left: "45%",  size: 2,   dur: "13s", delay:  "3.5s" },
  { id:  8, left: "51%",  size: 1.5, dur:  "8s", delay:  "1.0s" },
  { id:  9, left: "57%",  size: 2,   dur: "14s", delay:  "5.2s" },
  { id: 10, left: "63%",  size: 1.5, dur: "11s", delay:  "2.7s" },
  { id: 11, left: "69%",  size: 2.5, dur: "12s", delay:  "0.2s" },
  { id: 12, left: "75%",  size: 2,   dur:  "9s", delay:  "4.6s" },
  { id: 13, left: "81%",  size: 1.5, dur: "15s", delay:  "1.4s" },
  { id: 14, left: "87%",  size: 2,   dur: "12s", delay:  "3.8s" },
  { id: 15, left: "93%",  size: 1.5, dur:  "8s", delay:  "0.8s" },
];

export default function CommunityPrayerPage() {
  const [session, setSession]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const [countdown, setCountdown]       = useState(null);
  const [isLive, setIsLive]             = useState(false);
  const [currentSegment, setSegment]    = useState(null);
  const [scriptDone, setScriptDone]     = useState(false);
  const timersRef                       = useRef([]);

  // Fetch session on mount
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${base}/api/prayer/session`)
      .then((r) => r.ok ? r.json() : null)
      .catch(() => null)
      .then((data) => {
        setSession(data);
        setLoading(false);
        if (data?.is_live) setIsLive(true);
      });
  }, []);

  // Countdown ticker
  useEffect(() => {
    if (!session?.scheduled || session.is_live) return;
    const target = new Date(session.next_session_iso).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setIsLive(true); return; }
      setCountdown(formatCountdown(diff));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session]);

  // Prayer script — fires when session goes live
  useEffect(() => {
    if (!isLive) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    PRAYER_SCRIPT.forEach((seg) => {
      const t = setTimeout(() => setSegment(seg), seg.delay);
      timersRef.current.push(t);
    });
    const done = setTimeout(() => setScriptDone(true), SCRIPT_END);
    timersRef.current.push(done);

    return () => timersRef.current.forEach(clearTimeout);
  }, [isLive]);

  // ── Loading ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen" style={{ background: "#06010f", color: "white" }}>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p style={{ color: "rgba(200,170,255,0.5)" }}>Gathering…</p>
        </main>
        <Footer />
      </div>
    );
  }

  // ── No session scheduled ──────────────────────────────────────────────
  if (!session?.scheduled) {
    return (
      <div className="flex flex-col min-h-screen" style={{ background: "#06010f", color: "white" }}>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Community Prayer
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 400 }}>
            No prayer session is currently scheduled. Check back soon — or lift a prayer now.
          </p>
          <Link href="/prayer-wall" className="btn-secondary">Visit the Prayer Wall</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // ── LIVE — prayer unfolding ───────────────────────────────────────────
  if (isLive) {
    return (
      <>
        <style>{`
          @keyframes fade-word {
            0%   { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0);    }
          }
          @keyframes particle-rise {
            0%   { transform: translateY(0);      opacity: 0;   }
            12%  {                                opacity: 0.9; }
            80%  {                                opacity: 0.7; }
            100% { transform: translateY(-110vh); opacity: 0;   }
          }
        `}</style>

        <div style={{ position: "fixed", inset: 0, background: "#03000a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 50 }}>

          {/* Particles */}
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true">
            {PARTICLES.map((p) => (
              <div key={p.id} style={{
                position: "absolute", bottom: 0, left: p.left,
                width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(210,185,255,0.5)`,
                animation: `particle-rise ${p.dur} ${p.delay} infinite linear`,
              }} />
            ))}
          </div>

          {/* Prayer text */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", maxWidth: 560 }}>
            {!scriptDone && currentSegment && (
              <p
                key={currentSegment.id}
                style={{
                  fontFamily:  currentSegment.isCategory ? "var(--font-body)" : "var(--font-display)",
                  fontSize:    currentSegment.isAmen ? "3rem" : currentSegment.isCategory ? "0.85rem" : "1.6rem",
                  fontWeight:  currentSegment.isAmen ? 700 : currentSegment.isCategory ? 500 : 300,
                  color:       currentSegment.isCategory ? "var(--color-fall-amber)" : currentSegment.isAmen ? "white" : "rgba(255,255,255,0.88)",
                  letterSpacing: currentSegment.isCategory ? "0.35em" : "0.02em",
                  lineHeight:  1.6,
                  animation:   "fade-word 1.4s ease forwards",
                }}
              >
                {currentSegment.text}
              </p>
            )}

            {scriptDone && (
              <div style={{ animation: "fade-word 2s ease forwards" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "rgba(200,170,255,0.7)", marginBottom: "2rem", lineHeight: 1.8 }}>
                  The prayer has been lifted.<br />Continue in your own words.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2.5rem" }}>
                  {CATEGORIES.map((c) => (
                    <span key={c} style={{
                      padding: "0.4rem 1rem", borderRadius: "9999px", fontSize: "0.75rem",
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,170,255,0.2)",
                      color: "rgba(200,170,255,0.7)", letterSpacing: "0.1em",
                    }}>{c}</span>
                  ))}
                </div>
                <Link href="/prayer-wall" style={{ color: "rgba(200,170,255,0.5)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  ← Return to the Prayer Wall
                </Link>
              </div>
            )}

            {!currentSegment && !scriptDone && (
              <p style={{ color: "rgba(200,170,255,0.4)", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                Be still…
              </p>
            )}
          </div>
        </div>
      </>
    );
  }

  // ── Countdown ─────────────────────────────────────────────────────────
  const ct = countdown || formatCountdown(0);

  return (
    <>
      <style>{`
        @keyframes particle-rise {
          0%   { transform: translateY(0);      opacity: 0;   }
          12%  {                                opacity: 0.9; }
          80%  {                                opacity: 0.7; }
          100% { transform: translateY(-110vh); opacity: 0;   }
        }
      `}</style>

      <div className="flex flex-col min-h-screen" style={{ background: "#06010f", color: "white" }}>
        <Header />

        {/* Particles */}
        <div className="pointer-events-none" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 1, overflow: "hidden" }}>
          {PARTICLES.map((p) => (
            <div key={p.id} style={{
              position: "absolute", bottom: 0, left: p.left,
              width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(210,185,255,0.45)`,
              animation: `particle-rise ${p.dur} ${p.delay} infinite linear`,
            }} />
          ))}
        </div>

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(200,170,255,0.5)", letterSpacing: "0.3em" }}>
            Community Prayer Hour
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            We Gather Together
          </h1>

          <p className="mb-2 text-base" style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480 }}>
            Every {session.day_name} at {formatCentralTime(session.hour, session.minute)}
          </p>
          {session.next_session_iso && (() => {
            const local = getUserLocalTime(session.next_session_iso, session.day_name);
            return local ? (
              <p className="mb-3 text-sm" style={{ color: "rgba(200,170,255,0.45)", maxWidth: 480 }}>
                That&apos;s {local} where you are
              </p>
            ) : null;
          })()}
          {session.leader_name && (
            <p className="mb-10 text-sm italic" style={{ color: "rgba(200,170,255,0.5)", fontFamily: "var(--font-display)" }}>
              Led by {session.leader_name}
            </p>
          )}

          {/* Countdown */}
          <div className="flex gap-4 md:gap-8 mb-14">
            {[
              { label: "Days",    value: ct.days    },
              { label: "Hours",   value: ct.hours   },
              { label: "Minutes", value: ct.minutes },
              { label: "Seconds", value: ct.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span
                  className="text-5xl md:text-7xl font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-display)", color: "white", minWidth: "2ch", display: "block", textAlign: "center" }}
                >
                  {String(value).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(200,170,255,0.4)", letterSpacing: "0.2em" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12" style={{ opacity: 0.3 }}>
            <div style={{ width: 60, height: 1, background: "rgba(200,170,255,0.5)" }} />
            <span style={{ color: "var(--color-fall-amber)", fontSize: 16 }}>✦</span>
            <div style={{ width: 60, height: 1, background: "rgba(200,170,255,0.5)" }} />
          </div>

          {/* What we'll pray for */}
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "rgba(200,170,255,0.4)", letterSpacing: "0.2em" }}>
            We will pray together for
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-14" style={{ maxWidth: 480 }}>
            {CATEGORIES.map((c) => (
              <span key={c} style={{
                padding: "0.45rem 1.1rem", borderRadius: "9999px", fontSize: "0.8rem",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,170,255,0.15)",
                color: "rgba(200,170,255,0.65)", letterSpacing: "0.08em",
              }}>{c}</span>
            ))}
          </div>

          {/* Scripture */}
          <blockquote
            className="max-w-md italic text-base mb-10"
            style={{ fontFamily: "var(--font-display)", color: "rgba(200,170,255,0.55)", lineHeight: 1.8 }}
          >
            "Where two or three are gathered in my name, there am I among them."
          </blockquote>
          <cite className="text-xs not-italic tracking-widest uppercase mb-10 block" style={{ color: "rgba(200,170,255,0.3)", letterSpacing: "0.2em" }}>
            Matthew 18:20
          </cite>

          <Link href="/prayer-wall" style={{ color: "rgba(200,170,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Submit a prayer before we gather →
          </Link>

        </main>

        <Footer />
      </div>
    </>
  );
}
