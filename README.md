# FinCase: Raymond Edition

> FinCase turns a real corporate event into an interactive lesson. Edition #1: Raymond's 2024 demerger — one company splitting into three, told through its own numbers.

Interactive case-study engine built from Raymond Limited's public filings (FY17–FY26).

**Live:** [fincase.vercel.app](https://fincase.vercel.app)

## Why I built this

During a B.Com internship at Raymond, I was not assigned a project — so I built one. FinCase turns the FY2023–24 demerger into a teachable case study: Story Mode for novices, The Terminal for analysts, and an AI Analyst grounded only in Raymond's numbers.

## Modes

- **Learn the Story** — five chapters (predict-before-reveal, charts, glossary, quizzes). Chapter 4 is a scroll-driven demerger sequence.
- **The Terminal** — overview, revenue, working capital, demerger, realty, AI Analyst, methodology. Press `⌘K` to jump.

## Stack

Next.js 14 · TypeScript strict · Tailwind · Framer Motion · Recharts · cmdk · Anthropic API · Vercel Analytics

Static typed data in `lib/data/*` — no database, no auth.

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

## Structure

```
app/                  landing, story, terminal, methodology, about, API
components/loaders/   PageLoader · InlineRing · ChartSkeleton · TerminalCursor
components/story/     chapters, predict-reveal, glossary, quiz
components/scrolly/   DemergerSequence (Ch. 4)
components/terminal/  tabs, Cmd+K, AI Analyst, citations
lib/data/             typed financials (Edition #2 seam)
```

## Data

Figures are in ₹ crore. Sources and limitations: `/methodology` and the Terminal methodology tab.

## Deploy

```bash
npx vercel
```

Set `ANTHROPIC_API_KEY` and optionally `NEXT_PUBLIC_SITE_URL` in the Vercel project.
