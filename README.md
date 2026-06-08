# Hireloop

A minimal job application tracker built with React, TypeScript, and Vite. Keep tabs on every role you've applied for — all stored locally in your browser, no account required.

## Features

- **Add applications** — log a company, job title, date applied, status, and optional job description or notes
- **Track status** — update each application through five stages: Applied, Interview, Offer, Rejected, No Answer
- **Expandable descriptions** — paste full job descriptions and toggle them open/closed on each card
- **Delete entries** — remove applications you no longer need to track
- **Persistent storage** — everything lives in `localStorage`, so your data survives page refreshes

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for dev server and bundling
- No external state library — custom `useApplications` hook manages state and syncs to `localStorage`

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Available scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server with HMR    |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project structure

```
src/
  components/
    ApplicationCard.tsx   # Individual job card with status controls
    ApplicationForm.tsx   # Form to add a new application
    Dashboard.tsx         # Grid of all application cards
  hooks/
    useApplications.ts    # State management + localStorage persistence
  types.ts                # JobApplication and Status types
  App.tsx                 # Root layout
```

## Data model

```ts
interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  dateApplied: string; // YYYY-MM-DD
  status: "Applied" | "Interview" | "Offer" | "Rejected" | "No Answer";
  description: string;
}
```

Data is stored under the `hireloop_applications` key in `localStorage`.
