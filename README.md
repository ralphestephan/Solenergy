# Solenergy — Next.js + Tailwind

This repo creates **solenergy.com** as a statically rendered Next.js app using the App Router and TailwindCSS.

## Tech
- Next.js 14 (App Router)
- TailwindCSS
- TypeScript
- Simple dynamic route for solutions

## Routes
- `/` — Home
- `/solutions` — Solutions index
- `/solutions/[slug]` — Lighting, Climate, Safety, Studio, Utility
- `/contact` — Contact form (mailto)

## Content
Meta titles, descriptions, and images were parsed from the uploaded HTML pages. You can edit content in `data/solutions.ts`.

## Run
```bash
npm i
npm run dev
```

## Build
```bash
npm run build && npm start
```

## Notes
- Remote images are whitelisted in `next.config.mjs`.
- Styling matches Solenergy: 40px rounded cards, soft shadows, solar-themed gradients.
