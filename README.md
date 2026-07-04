# FinCase: Raymond Edition

> FinCase turns a real corporate event into an interactive lesson. Edition #1: Raymond's 2024 demerger — one company splitting into three, told through its own numbers.

Interactive case-study engine built from Raymond Limited's public filings (FY17–FY26). Two modes:

- **Learn the Story** — five guided chapters (narrative → chart → concept → quiz)
- **The Terminal** — analyst dashboard with six tabs, including an AI Analyst grounded in the dataset

## Stack

- Next.js 14 (App Router) · TypeScript strict · Tailwind CSS
- Recharts · Anthropic API (one route handler)
- Static typed data in `lib/data/*` — no database, no auth

## Setup

```bash
npm install
cp .env.example .env.local
# add ANTHROPIC_API_KEY for the AI Analyst
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint |

## Project structure

```
app/                  landing, story chapters, terminal, methodology, API
components/charts/    Recharts wrappers
components/story/     Chapter shell, concept cards, quiz
components/terminal/  Tab shell, AI Analyst chat
lib/data/             Typed financials + chapter content (Edition #2 seam)
lib/types.ts          Shared types
```

## Data

Figures are in ₹ crore. Sources and limitations are documented on `/methodology`.

## Roadmap

Revamp phases SP-1 → SP-9 (foundation through portfolio packaging). This commit is **SP-1 · Foundation**.
