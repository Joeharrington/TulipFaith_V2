"use client";

import React, { useRef, useState, useEffect } from 'react';
import { gsap, useIsomorphicLayoutEffect } from '@/lib/gsap';

const MESSAGE_LINES = [
  "Susan lives in Christ.",
  "This is her story, and ours.",
  "I offer it to God with gratitude, love, and trust.",
  "Some come through grief, some through questions, and some through a quiet longing they have never been able to name.",
  "Wherever you are in your walk, you are welcome here.",
  "Come and find Jesus through storytelling, Biblical Truth, honest reflection, prayer, and the hope that still speaks beyond this life.",
  "For the believer, the returning, the searching, the wounded, the unsure, and the Jesus-curious.",
  "Knock, and it shall be opened to you.",
];

export default function IntroOverlay({ onReveal, onComplete }) {
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const dovesLayerRef = useRef(null);
  const tlRef = useRef();
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const violet = '#2b0c3b'; // deep, dark violet

  useIsomorphicLayoutEffect(() => {
    if (!rootRef.current) return;
    
    // Store context so we can add to it dynamically later
    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tlRef.current = tl;

      // start fully blank
      gsap.set(rootRef.current, { opacity: 1, backgroundColor: violet });
      if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 0, y: 8, pointerEvents: 'none' });

      // lines: slide in word-by-word from left, one line at a time
      const lineEls = gsap.utils.toArray(rootRef.current.querySelectorAll('[data-line]'));
      lineEls.forEach((lineEl, i) => {
        const words = lineEl.querySelectorAll('.word');
        gsap.set(words, { opacity: 0, x: -40 });
        tl.to(
          words,
          { opacity: 1, x: 0, duration: 0.85, stagger: 0.24, ease: 'power2.out' },
          i === 0 ? '+=0.8' : '+=0.6'
        );
      });

      // small pause for reading
      tl.to({}, { duration: 1.6 });

      // show button
      if (buttonRef.current) {
        tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6 }, '>-0.1');
        tl.call(() => {
          if (buttonRef.current) buttonRef.current.style.pointerEvents = 'auto';
        });
      }
    }, rootRef);

    return () => ctxRef.current.revert();
  }, []);

  // audio and motion preferences
  useEffect(() => {
    try {
      const mql = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mql) queueMicrotask(() => setPrefersReduced(!!mql.matches));
    } catch {}
    try {
      const stored = localStorage.getItem('tf_mute');
      if (stored === '1') queueMicrotask(() => setMuted(true));
    } catch {}
    try {
      // NOTE: Update this path if a new premium audio file is provided
      const audio = new Audio('/audio/doves-flight.mp3');
      audio.preload = 'auto';
      audio.volume = 0.5;
      audioRef.current = audio;
    } catch {}
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = !!muted;
    try { localStorage.setItem('tf_mute', muted ? '1' : '0'); } catch {}
  }, [muted]);

  // ripple effect: concentric circles on click/touch (splash-like)
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    
    const makeRippleRings = (x, y) => {
      // Safety check in case the component unmounts mid-click
      if (!ctxRef.current) return;

      const rect = btn.getBoundingClientRect();
      const centerX = x - rect.left;
      const centerY = y - rect.top;
      const base = Math.max(rect.width, rect.height) * 0.25;
      const rings = 3;
      
      for (let i = 0; i < rings; i++) {
        const ring = document.createElement('span');
        ring.className = 'pointer-events-none absolute block rounded-full';
        ring.style.left = `${centerX - base / 2}px`;
        ring.style.top = `${centerY - base / 2}px`;
        ring.style.width = `${base}px`;
        ring.style.height = `${base}px`;
        ring.style.border = '2px solid rgba(255,255,255,0.35)';
        ring.style.borderRadius = '9999px';
        ring.style.opacity = '0.6';
        btn.appendChild(ring);
        
        ctxRef.current.add(() => {
          gsap.fromTo(
            ring,
            { scale: 0.2, opacity: 0.6 },
            {
              scale: 1.8,
              opacity: 0,
              duration: 0.9 + i * 0.12,
              ease: 'sine.out',
              delay: i * 0.06,
              onComplete: () => ring.remove(),
            }
          );
        });
      }
    };
    
    const onDown = (e) => makeRippleRings(e.clientX, e.clientY);
    btn.addEventListener('pointerdown', onDown);
    return () => {
      btn.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const handleShatter = async () => {
    const root = rootRef.current;
    const cvs = canvasRef.current;
    const dovesLayer = dovesLayerRef.current;
    if (!root || !cvs || !dovesLayer || !ctxRef.current) return;

    // Respect prefers-reduced-motion: fast crossfade, no shards/doves
    if (prefersReduced) {
      if (onReveal) onReveal(1.2);
      ctxRef.current.add(() => {
        gsap.to(root, { opacity: 0, duration: 1.2, ease: 'sine.inOut', onComplete: () => onComplete && onComplete() });
      });
      return;
    }

    // freeze current overlay height to avoid layout shift
    root.style.willChange = 'transform, opacity';
    const { width, height } = root.getBoundingClientRect();
    cvs.width = Math.ceil(width);
    cvs.height = Math.ceil(height);

    // draw a simple solid background capture (text fades; we simulate shatter over a violet plane)
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = violet;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // add animations to context for cleanup
    ctxRef.current.add(() => {
      // hide text/button for the shatter stage
      gsap.to(root.querySelectorAll('[data-line]'), { opacity: 0, duration: 0.2 });
      if (buttonRef.current) gsap.to(buttonRef.current, { opacity: 0, duration: 0.2 });

      // generate polygon "shards"
      const shards = generateShards(cvs.width, cvs.height, 80); // 80 shards feels nice
      // draw initial shards
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      shards.forEach((s) => drawShard(ctx, s, violet));

      // animate shards "breaking" upward a bit, then transforming into doves that fly to the top
      const shardEls = [];

      shards.forEach((s) => {
        const size = 160 + Math.random() * 80;

        // Outer wrapper handles position, flight, opacity — no transform conflict
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.width = `${size}px`;
        wrapper.style.left = `${s.cx - size / 2}px`;
        wrapper.style.top = `${s.cy - size / 2}px`;
        wrapper.style.opacity = '0';

        // Inner img handles only the wing-flap scaleY
        const dove = document.createElement('img');
        const doveIndex = Math.floor(Math.random() * 12) + 1;
        dove.src = `/assets/svgs/dove-${doveIndex.toString().padStart(2, '0')}.svg`;
        dove.style.width = '100%';
        dove.style.height = 'auto';
        dove.style.display = 'block';
        dove.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 3px white)';

        wrapper.appendChild(dove);
        dovesLayer.appendChild(wrapper);
        shardEls.push(wrapper);
      });

      // timeline for shards + doves
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // stage 1: slight explosion + gravity
      tl.to(
        shards,
        {
          duration: 0.9,
          ease: 'power3.out',
          onUpdate() {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            shards.forEach((s) => {
              s.cx += s.vx;
              s.cy += s.vy;
              s.vy += 0.5;
              s.rot += s.vr;
              drawShard(ctx, s, violet);
            });
          },
        },
        0
      );

      // stage 2: subtle canvas fade overlay while transitioning
      tl.to(
        {},
        {
          duration: 1.2,
          onUpdate() {
            // dim shards visually by overlay tint
            ctx.fillStyle = 'rgba(43,12,59,0.35)';
            ctx.fillRect(0, 0, cvs.width, cvs.height);
          },
        },
        '>-0.6'
      );

      // lift doves and fly toward heaven
      const doveFlightStartDelay = 0.4;
      let maxEnd = 0;
      shardEls.forEach((el, i) => {
        const delay = doveFlightStartDelay + 0.05 * (i % 12);
        const dx = (Math.random() - 0.5) * 160;
        const baseTop = parseFloat(el.style.top || '0');
        const yOut = -(baseTop + 300 + Math.random() * 200);

        // fade in quickly
        gsap.fromTo(
          el,
          { opacity: 0, y: 0, x: 0, rotate: -10 + Math.random() * 20 },
          { opacity: 1, duration: 0.5, delay, ease: 'sine.out' }
        );

        const flyDur = 2.2 + Math.random() * 0.8; // fast, purposeful ascent

        // wing flap on inner img only — isolated from flight transforms
        const img = el.querySelector('img');
        gsap.to(img, {
          scaleY: 0.45,
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay,
          transformOrigin: 'center center',
        });

        // ascent
        gsap.to(el, {
          y: yOut,
          x: dx,
          duration: flyDur,
          delay,
          ease: 'power1.in',
          onComplete: () => el.remove(),
        });

        // gentle lateral weave
        gsap.to(el, {
          x: `+=${18 + Math.random() * 20}`,
          duration: 0.6 + Math.random() * 0.3,
          repeat: Math.ceil(flyDur / 0.6),
          yoyo: true,
          ease: 'sine.inOut',
          delay,
        });

        // fade near exit
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          delay: delay + Math.max(0.3, flyDur - 0.6),
          ease: 'sine.in',
        });

        const end = delay + flyDur;
        if (end > maxEnd) maxEnd = end;
      });

      // fade the canvas element across the full dove flight span
      gsap.to(cvs, { opacity: 0, duration: maxEnd, ease: 'sine.inOut', delay: 0 });

      // trigger page reveal at dove takeoff; crossfade lasts until last dove exits
      if (onReveal) onReveal(Math.max(1.8, maxEnd));

      // play audio, respecting the mute toggle
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
        setTimeout(() => {
          try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch {}
        }, 5200);
      }

      // fade out whole overlay so it completes when the last dove exits
      const overlayFadeDur = 1.0;
      gsap.delayedCall(Math.max(0, maxEnd - overlayFadeDur), () => {
        gsap.to(root, {
          opacity: 0,
          duration: overlayFadeDur,
          ease: 'power2.inOut',
          onComplete: () => onComplete && onComplete(),
        });
      });
    });
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#2b0c3b', color: 'white' }}
    >
      {/* mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="absolute top-4 right-4 rounded-full border border-white/40 px-3 py-1 text-sm text-white/80 hover:bg-white/10"
        aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {muted ? 'Sound Off' : 'Sound On'}
      </button>
      {/* message lines */}
      <div className="mx-auto max-w-3xl px-6 text-center leading-relaxed z-10">
        {MESSAGE_LINES.map((line, i) => (
          <div key={i} data-line={i} className="text-xl md:text-3xl font-light select-none mb-2">
            {line.split(' ').map((w, wi) => (
              <span key={wi} className="inline-block word mr-2" style={{ opacity: 0 }}>{w}</span>
            ))}
          </div>
        ))}

        {/* Knock button */}
        <div className="mt-12 flex justify-center">
          <button
            ref={buttonRef}
            onClick={handleShatter}
            className="relative overflow-hidden rounded-full border border-white/60 px-8 py-4 text-lg md:text-xl font-medium tracking-wide hover:shadow-lg transition-shadow duration-200 [filter:url(#gooey)]"
            aria-label="Knock to begin your journey"
            style={{ opacity: 0 }}
          >
            Knock To Begin Your Journey
          </button>
        </div>
      </div>

      {/* canvas for shatter stage */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full z-0" />
      {/* doves layer */}
      <div ref={dovesLayerRef} className="pointer-events-none absolute inset-0 z-20" />

      {/* SVG filter for gooey/liquid look on the button */}
      <svg className="absolute opacity-0">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ---------- helpers ----------

function generateShards(width, height, count) {
  const shards = [];
  const rand = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < count; i++) {
    const cx = rand(0, width);
    const cy = rand(0, height);
    const numVerts = Math.floor(rand(4, 8));
    const baseR = rand(28, 72);
    const verts = [];

    for (let v = 0; v < numVerts; v++) {
      const angle = (v / numVerts) * Math.PI * 2 + rand(-0.4, 0.4);
      const r = baseR * rand(0.45, 1.2);
      verts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }

    const speed = rand(3, 8);
    // bias strongly upward so shards scatter toward heaven
    const angle = rand(-Math.PI, 0);
    shards.push({
      cx, cy, verts,
      rot: rand(-Math.PI, Math.PI),
      vx: Math.cos(angle) * speed * 0.6,
      vy: Math.sin(angle) * speed - 4,
      vr: rand(-0.12, 0.12),
    });
  }
  return shards;
}

function drawShard(ctx, s, color) {
  ctx.save();
  ctx.translate(s.cx, s.cy);
  ctx.rotate(s.rot);

  ctx.beginPath();
  s.verts.forEach((v, i) => i === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y));
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  // glass-edge highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // inner light catch
  const grad = ctx.createLinearGradient(
    s.verts[0].x, s.verts[0].y,
    s.verts[Math.floor(s.verts.length / 2)].x,
    s.verts[Math.floor(s.verts.length / 2)].y
  );
  grad.addColorStop(0, 'rgba(255,255,255,0.18)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.restore();
}
