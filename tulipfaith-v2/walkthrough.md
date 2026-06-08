# Cinematic Hero Component Migrated

The original V1 Doves sequence has been successfully ported over to the new V2 Next.js architecture and wired up to use your high-quality SVG files!

## What was Accomplished

1. **GSAP Integration**: Installed GSAP and set up a utility wrapper (`src/lib/gsap/index.js`) to handle isomorphic layout effects safely during Server-Side Rendering (SSR).
2. **IntroOverlay Component**: Created `src/components/cinematic/IntroOverlay.js`. This is a fully modernized "use client" component.
3. **Dynamic Dove Selection**: The canvas shattering effect now creates standard `<img>` elements that randomly select from your uploaded SVG files (`dove-01.svg` to `dove-12.svg`). Because they are high-quality SVGs, they will look stunning and crisp on retina displays.
4. **App Initialization**: Swapped out the default Next.js homepage in `src/app/page.js` to immediately render the `IntroOverlay` on load.

## Testing it Out

You can now test this live in your browser:
1. Open your terminal in VS Code.
2. Ensure you are in the `tulipfaith-v2` directory.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

You should see the text fade in sequentially, and when you click "Knock To Begin Your Journey", the screen will shatter and your custom SVGs will fly up to reveal the new V2 homepage underneath!

> [!TIP]
> If you notice the doves are too big or small, we can easily adjust the `size` variable in `IntroOverlay.js`. We can also swap the dark violet background out for any color you choose.
