# Ayushman Sathi

A companion app concept for India's national health-cover scheme (PM-JAY) — eligibility
checks across schemes, a cashless hospital admission walkthrough, a card wallet, a
hospital finder with cost estimates, and claims/grievance filing.

Full-stack demo app: an Express API backed by in-memory data, and a React (Vite)
client that consumes it.

## Structure

```
server/   Express API (port 4000)
client/   React + Vite frontend (port 5173)
```

## Prerequisites

- Node.js 18+ (uses `node --watch` for the server dev script)
- npm

## Setup

From the repo root:

```bash
npm install
```

This installs dependencies for both workspaces (`server` and `client`).

## Running in development

From the repo root, this starts both the API and the client together:

```bash
npm run dev
```

- API: http://localhost:4000
- Client: http://localhost:5173 (proxies `/api/*` to the server)

Open http://localhost:5173 in your browser.

To run them separately instead:

```bash
npm run dev -w server   # API only, http://localhost:4000
npm run dev -w client   # client only, http://localhost:5173
```

## Building for production

```bash
npm run build
```

Builds the client into `client/dist`. Serve `server/` alongside it (e.g. behind a
reverse proxy, or by adding static-file serving to `server/src/index.js`) for a
production deployment.

## API overview

All routes are under `/api`:

| Route | Description |
|---|---|
| `GET /api/profile` | Cards, ABHA record, private cover |
| `GET /api/eligibility/questions` | The eligibility quiz questions |
| `POST /api/eligibility/check` | Submit answers, get matching schemes |
| `GET /api/hospitals` | Hospital directory |
| `GET /api/hospitals/:id` | Hospital detail |
| `GET /api/hospitals/:id/cost` | HBP package cost estimate for a procedure |
| `POST /api/cases` | Start a cashless admission case |
| `GET /api/cases/:id` | Current case status |
| `POST /api/cases/:id/advance` | Advance the case to its next step |
| `POST /api/cases/:id/lang` | Switch the case's language (`en`/`hi`) |
| `GET /api/claims` | Claim history |
| `GET /api/claims/requirements` | Required reimbursement documents |
| `POST /api/claims` | Submit a reimbursement claim |
| `GET /api/grievances/options` | Grievance reason options |
| `POST /api/grievances` | File a grievance |

Data lives in memory (`server/src/data.js`) and resets whenever the server restarts —
there's no database in this demo.

## Notes

- Sample data (Sunita Devi, hospitals, claim history) is illustrative, modelled on
  real PM-JAY mechanics: HBP 2022 package rates, SHA pre-authorisation, ABHA records,
  and the 14555 / CGRMS grievance route.
- Supports light and dark themes, following the system preference.
