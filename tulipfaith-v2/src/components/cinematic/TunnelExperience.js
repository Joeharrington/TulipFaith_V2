"use client";

import { useRef, useEffect, useMemo } from 'react';
import { gsap } from '@/lib/gsap';

// Each phrase: 1.2s in + 2.2s hold + 1.2s out = 4.6s — spaced 5.5s apart so no overlap
const TUNNEL_PHRASES = [
  { at: 2,   text: "Susan went toward the Light.", color: "#ffffff", shadow: "0 2px 10px rgba(0,0,0,0.5)" },
  { at: 7.5, text: "The same Light that spoke the world into being.", color: "#ffffff", shadow: "0 2px 10px rgba(0,0,0,0.5)" },
  { at: 13,  text: "The same Light that walked out of a tomb.", color: "#2b0c3b", shadow: "0 0 20px rgba(255,255,255,1)" },
  { at: 18,  text: "Love never ends.", ref: "1 Corinthians 13:8", color: "#2b0c3b", shadow: "none" },
  { at: 23,  text: "I am the resurrection and the life.", ref: "John 11:25", color: "#2b0c3b", shadow: "none" },
];

const FADE_IN    = 1.2;
const HOLD       = 2.2;
const FADE_OUT   = 1.2;
const TOTAL      = 30;
const RING_COUNT = 10;
const SOUL_COUNT = 30;

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const SOULS = Array.from({ length: SOUL_COUNT }, (_, i) => ({
  x:        15 + pseudoRandom(i + 1) * 70,
  y:        10 + pseudoRandom(i + 101) * 80,
  size:     1.5 + pseudoRandom(i + 201) * 2.5,
  duration: 2 + pseudoRandom(i + 301) * 3,
  delay:    pseudoRandom(i + 401) * 6,
}));

export default function TunnelExperience({ onComplete }) {
  const containerRef = useRef(null);
  const ringsRef     = useRef([]);
  const lightRef     = useRef(null);
  const burstRef     = useRef(null);
  const phrasesRef   = useRef([]);
  const souls = useMemo(() => SOULS, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial states — everything hidden before timeline starts
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(lightRef.current,     { scale: 0.01, opacity: 0 });
      gsap.set(burstRef.current,     { opacity: 0, scale: 0.01 });
      phrasesRef.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 14 }));
      ringsRef.current.forEach((r, i) => r && gsap.set(r, {
        scale: 1,
        opacity: 0.14 - i * 0.008,
        willChange: 'transform, opacity',
      }));
      gsap.set(lightRef.current,  { willChange: 'transform, opacity' });
      gsap.set(burstRef.current,  { willChange: 'transform, opacity' });

      // Main timeline
      const tl = gsap.timeline({ onComplete: () => onComplete && onComplete() });

      // Fade container in — eliminates entry flash
      tl.to(containerRef.current, { opacity: 1, duration: 1.0, ease: 'power1.out' }, 0);

      // Light: pinprick → consuming — scale only, no box-shadow scaling jank
      tl.to(lightRef.current, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 0.4);
      tl.to(lightRef.current, { scale: 5, duration: TOTAL - 1, ease: 'power2.in' }, 1);

      // Rings — scale + opacity, all identical ease, will-change set above
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return;
        const depth = i / RING_COUNT;
        tl.to(ring, {
          scale:    22 - depth * 7,
          opacity:  0,
          duration: TOTAL,
          ease:     'power1.inOut',
        }, 0);
      });

      // Phrases — guaranteed no overlap (each takes 4.6s, spaced 5.5s+)
      TUNNEL_PHRASES.forEach(({ at }, i) => {
        const el = phrasesRef.current[i];
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0,   duration: FADE_IN,  ease: 'power1.out' }, at);
        tl.to(el, { opacity: 0, y: -10, duration: FADE_OUT, ease: 'power1.in'  }, at + FADE_IN + HOLD);
      });

      // Final burst — starts after last phrase clears (23 + 4.6 = 27.6, burst at 27)
      tl.to(burstRef.current, {
        opacity:  1,
        scale:    5,
        duration: 3,
        ease:     'power1.inOut',
      }, TOTAL - 3);

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, souls]);

  return (
    <>
      {/* CSS keyframe twinkle for souls — zero GSAP overhead */}
      <style>{`
        @keyframes soul-twinkle {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.75; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #0d0520 0%, #030108 100%)' }}
      >
        {/* Souls — CSS animation only, no GSAP tweens */}
        {souls.map((soul, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:     `${soul.size}px`,
              height:    `${soul.size}px`,
              left:      `${soul.x}%`,
              top:       `${soul.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #ffffff 0%, #c8a8ff 70%, transparent 100%)',
              animation: `soul-twinkle ${soul.duration}s ease-in-out ${soul.delay}s infinite`,
            }}
          />
        ))}

        {/* Tunnel rings */}
        {Array.from({ length: RING_COUNT }).map((_, i) => {
          const size = 6 + i * 9;
          return (
            <div
              key={i}
              ref={el => ringsRef.current[i] = el}
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  `${size}vmin`,
                height: `${size}vmin`,
                border: `${i < 3 ? 2 : 1}px solid rgba(200,180,255,${0.18 - i * 0.012})`,
              }}
            />
          );
        })}

        {/* Pinprick of light — no box-shadow so scale stays smooth */}
        <div
          ref={lightRef}
          className="absolute pointer-events-none"
          style={{
            width:        '100vmin',
            height:       '100vmin',
            borderRadius: '50%',
            background:   'radial-gradient(circle, #ffffff 0%, #ffffff 15%, #e2d1f0 40%, rgba(13,5,32,0.8) 65%, transparent 100%)',
            transformOrigin: 'center center',
          }}
        />

        {/* Phrases — no backdrop, dark text-shadow keeps them readable */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {TUNNEL_PHRASES.map((phrase, i) => (
            <div
              key={i}
              ref={el => phrasesRef.current[i] = el}
              className="absolute text-center px-8 max-w-2xl"
              style={{ opacity: 0 }}
            >
              <p
                style={{
                  color:      phrase.color,
                  fontSize:   'clamp(1.2rem, 3vw, 2rem)',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1.6,
                  textShadow: phrase.shadow,
                  fontWeight: 400,
                }}
              >
                {phrase.text}
              </p>
              {phrase.ref && (
                <p
                  className="mt-3 tracking-widest uppercase"
                  style={{
                    color:         phrase.color,
                    fontSize:      'clamp(0.8rem, 1.6vw, 1rem)',
                    letterSpacing: '0.25em',
                    textShadow:    phrase.shadow,
                    opacity:       0.9,
                    fontWeight:    500,
                  }}
                >
                  {phrase.ref}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Final burst */}
        <div
          ref={burstRef}
          className="absolute pointer-events-none z-20"
          style={{
            width:        '100vmin',
            height:       '100vmin',
            borderRadius: '50%',
            background:   'radial-gradient(circle, #ffffff 0%, #ffffff 40%, rgba(240,224,255,0.8) 70%, transparent 100%)',
            transformOrigin: 'center center',
          }}
        />
      </div>
    </>
  );
}
