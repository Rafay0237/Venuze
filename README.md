# Venuze

Frontend assessment app for Hashed System — a venue marketplace built with Next.js 15, TypeScript, and Tailwind CSS.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form + Zod
- Axios
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to login first.

## Demo login

- Email: `eve.holt@reqres.in`
- Password: `cityslicka`
- API: `POST https://reqres.in/api/login`

## Routes

| Route | Description |
| --- | --- |
| `/login` | Authentication (public) |
| `/` | Homepage (requires login) |
| `/search` | Venue search results + map (requires login) |

## Images

Add homepage and other assets under `public/images/`. The hero currently uses `public/images/celebration-venue.jpg`.

## Notes

- Auth token is persisted in Zustand and mirrored to a `venuze_auth` cookie for Next.js middleware.
- All app pages except `/login` require authentication.
- Venue data uses mocked services with artificial latency, fetched via TanStack Query.
