# Gambia Flyaway Apartments

Premium apartment rentals in The Gambia. A modern booking platform showcasing luxury apartments across Banjul, Kololi, Serrekunda, Bakau, Juffureh, and Fajara.

## Features

- **6 Premium Apartments** — Ocean View, Beachfront Villa, City Center Loft, Sunset Paradise Villa, Traditional Compound, Luxury Penthouse
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Image Optimization** — WebP + JPG with multiple resolutions (400px, 600px, 800px, 1280px, 1920px)
- **Authentication** — Supabase-powered login and user dashboard
- **Booking System** — Apartment booking with date selection and guest management
- **Local Attractions** — Beaches, national parks, and cultural highlights

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router (HashRouter) |
| Backend | Supabase (Auth + Database) |
| UI Components | Radix UI primitives |
| Forms | React Hook Form + Zod |
| Deployment | GitHub Pages / Netlify |

## Pages

| Route | Description |
|-------|-------------|
| / | Home -- hero, apartments, features, attractions |
| /auth | Login / Sign up |
| /dashboard | User bookings and profile |
| /contact | Contact form and information |

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

### GitHub Pages (auto)

Push to `main` -- GitHub Actions deploys to:
```
https://codesleeps.github.io/gambia-flyaway-apartments/
```

### Netlify

Manual deploy via `netlify.toml` config or drag-and-drop the `dist/` folder.

## Project Structure

```
src/
  components/       Reusable UI components
    ui/             shadcn/ui primitives
    ApartmentCard.tsx
    BookingModal.tsx
    Header.tsx
    Footer.tsx
    OptimizedImage.tsx
  contexts/         React contexts (Auth)
  hooks/            Custom hooks (useApartments, useBookings)
  integrations/     Supabase client
  lib/              Utilities
  pages/            Route pages
    Index.tsx       Homepage
    Auth.tsx        Login/Signup
    Dashboard.tsx   User dashboard
    Contact.tsx     Contact form
    NotFound.tsx    404 page
  utils/            Image utilities
```

## License

MIT
