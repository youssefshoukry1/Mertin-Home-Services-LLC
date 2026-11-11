# EdgeBannerCard

Unzip this into the root of your project. It holds the component and every file it loads at runtime, at the paths the code expects.

## Files

- `src/components/EdgeBannerCard.tsx`: the component. Move it to wherever your components live and render `<EdgeBannerCard />`.
- `public/`: 1 image (20 KB) in `public/heros/`. Merge this folder into your project's public folder and keep the paths. The code requests them from the site root, for example `/heros/editorial-sprinter-crimson-motion.webp`, so a file in any other place returns 404.

## Dependencies

The source imports `framer-motion` and `lucide-react`. Install what your project lacks: `npm install framer-motion lucide-react`.

Styling uses Tailwind CSS v4 utility classes.

## Fonts

Fonts are not part of the package. The design uses Albert Sans, IBM Plex Mono and Manrope. Load them in your project, or the browser falls back to a default font.
The classes `font-display`, `font-body` and `font-kicker` are theme fonts: define `--font-display`, `--font-body` and `--font-kicker` in your Tailwind theme (`@theme`), or they have no effect.
