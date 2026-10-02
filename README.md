# Fill My Cup

A small personal lifestyle and experience tracker for October–December 2026.

## Current foundation

The application uses React, TypeScript, Vite, Tailwind CSS, React Router, Zustand, Lucide React, and Framer Motion. This setup intentionally includes only the application shell, route placeholders, and a small UI store—there is no dashboard, activity implementation, backend, authentication, or database yet.

## Architecture

- `src/components/layout`: shared application framing (`AppShell`).
- `src/components/ui`, `activity`, `book`, and `dashboard`: reserved component areas for future UI.
- `src/pages`: route-level page components.
- `src/stores`: small client-side Zustand stores.
- `src/types`, `data`, `utils`, and `hooks`: shared application concerns as they are needed.

## Routes

- `/` — landing placeholder
- `/experiences` — experiences placeholder
- `/reading` — reading placeholder
- `/memories` — memories placeholder

## Run locally

```bash
npm install
npm run dev
```

Run `npm run build` for the TypeScript and production-build check.
