# AI Agent Instructions for Solenergy Codebase

## Project Overview
Solenergy is a Next.js-based website showcasing solar energy solutions, backup generators, and energy management systems. Key characteristics:
- Built with Next.js 16.0.0 App Router and TypeScript
- TailwindCSS for styling with custom solar/energy design system
- Dynamic routes for solutions and industry insights content
- Focus on Lebanese market energy independence solutions

## Architecture Patterns

### Data Flow
- Content is managed through TypeScript data files in `/data/`
  - `solutions.ts` defines solar systems, generators, and energy solutions
  - `insights.ts` contains educational articles on solar, energy storage, and Industry 4.0
- Meta information and site constants in `lib/site.ts`

### Component Structure
- Layout components in root `/components/`
- Reusable UI components in `/components/ui/`
- Page templates follow Next.js App Router conventions in `/app/`

### Styling Conventions
- TailwindCSS with custom theme in `tailwind.config.ts`
- Brand-specific styles:
  - Solar energy color scheme: Yellow (#F4B41A), Orange (#E8952F)
  - 40px rounded corners for cards
  - Soft shadows with solar-themed gradients
- Font: Poppins 700 for headings

## Development Workflow

### Setup
```bash
npm install
npm run dev    # Start dev server on port 3001
npm run build  # Production build
npm start      # Run production server
```

### Key Files to Understand
- `app/layout.tsx` - Root layout with providers and metadata
- `data/solutions.ts` - Solar energy solutions catalog (generators, solar systems, maintenance, etc.)
- `data/insights.ts` - Educational content about solar and energy solutions
- `lib/site.ts` - Site metadata and contact information

### Common Tasks
1. Adding a new solution:
   - Add entry to `data/solutions.ts` following the `Solution` type
   - Create corresponding images in `/public/images/`
   - Solution categories: generators, solar-services, energy-management, maintenance-services

2. Adding new insights:
   - Add entry to `data/insights.ts` following the `Insight` type
   - Include solar energy focused content
   - Tags: "Solar Energy", "Energy Storage", "Generators", "Industry 4.0", etc.

3. SEO updates:
   - Base configuration in `app/layout.tsx` metadata
   - Page-specific metadata in respective page components
   - Focus keywords: solar energy Lebanon, backup generators, hybrid solar systems

## Contact Information
- Email: solenergysarl@gmail.com
- Phone: +961 71 654 956
- Location: Adonis, Lebanon
- Social: @solenergy

## Integration Points
- Email notifications via Resend API
- Image domains whitelisted in `next.config.mjs`
- Google Analytics integration in `app/layout.tsx`

## Testing
- Manual testing through development server
- Build verification with `npm run build`
- Port 3001 for local development