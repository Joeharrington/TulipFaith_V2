# TulipFaith V2 Cinematic Hero Overlay

This plan outlines the steps to take the original "Shatter to Doves" sequence from V1 and rebuild it natively in Next.js V2 using your new, high-quality vector and image assets.

## User Review Required

Please review the proposed approach below. We will use GSAP to handle the complex timelines and Canvas to ensure the shattering is performant even with high-quality assets.

## Open Questions

> [!IMPORTANT]
> 1. **Asset Selection**: I see you uploaded `dove-01` through `dove-12`. Are these 12 frames of an animation sequence (like a flipbook of a dove flying)? Or are they 12 distinct, different doves? For the shatter effect, do you want the shattered pieces to turn into one static dove image that flies away, or an animated sequence of a dove flapping its wings?
> 2. **Colors & Aesthetics**: The original V1 sequence used a solid dark violet (`#2b0c3b`) background for the shatter effect. Should we keep this deep violet, or transition to a different premium gradient/color palette for V2?
> 3. **Audio**: The original used `/audio/doves-flight.mp3`. Do you have a premium audio file for this, or should we port the old one over for now?

## Proposed Changes

We will execute the following steps to build out the front page:

### 1. Install Dependencies
We will install `gsap` for all timeline animations, which is required for the complex staggered shattering and flight paths.

#### [MODIFY] package.json
- Add `"gsap": "^3.12.5"`
- Add `"lucide-react"` for basic UI icons.

### 2. Scaffold the Cinematic Component

#### [NEW] src/components/cinematic/IntroOverlay.js
We will create a modernized version of the V1 `IntroOverlay`. 
- **Next.js App Router Compat**: We will ensure it runs exclusively on the client using `"use client"`.
- **Canvas Shattering**: The screen will still "shatter" using HTML5 Canvas, but instead of turning into emojis (`🕊️`), the shards will morph into your new SVG/PNG dove assets.

#### [NEW] src/lib/gsap/index.js
We will set up a GSAP utility file to register standard plugins and store reusable animation timelines (like `useIsomorphicLayoutEffect` for SSR compatibility).

### 3. Integrate into the Main Page

#### [MODIFY] src/app/page.js
We will remove the default Next.js boilerplate and drop in the `IntroOverlay` component so that it is the very first thing the user sees when they load the site.

## Verification Plan

### Manual Verification
- Run `npm run dev`.
- Load `http://localhost:3000`.
- Verify the intro text sequences correctly.
- Click the "Knock" button.
- Ensure the ripple effect happens, the screen shatters flawlessly without frame drops, and the pieces morph into the new premium Dove assets that fly upwards.
