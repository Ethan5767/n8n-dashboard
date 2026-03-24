# n8n Dashboard

A clean, local-first dashboard for monitoring an n8n instance with only two required inputs:
- `N8N_BASE_URL`
- `N8N_API_KEY`

This app is intentionally simple:
- overview of instance health
- workflows list
- recent executions
- dark and light mode
- local-first setup
- server-side API key handling via a tiny local proxy

## What it is
This is an operations dashboard for n8n.
It is **not** trying to replace the n8n editor.

## Requirements
- Node.js 22+
- npm
- a reachable n8n instance
- an n8n API key from `Settings -> n8n API`

## Quick start
```bash
git clone git@github.com:Ethan5767/n8n-dashboard.git
cd n8n-dashboard
npm install
cp .env.example .env.local
# fill in N8N_BASE_URL and N8N_API_KEY
npm run dev
```

Then open:
- `http://localhost:5173`

The frontend runs on port `5173` and the local proxy runs on port `3001`.

## Environment
Create `.env.local`:
```bash
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your_real_key_here
PORT=3001
```

## Scripts
- `npm run dev` — run frontend and local proxy together
- `npm run build` — production build + server compile
- `npm run typecheck` — TypeScript checks
- `npm run lint` — lint the codebase
- `npm run verify` — typecheck + build
- `npm run smoke` — test direct API connectivity to your n8n instance

## Security note
The API key is meant to stay server-side in `.env.local`.
The frontend talks to the local proxy under `/api`.

## MVP scope
- connect and validate n8n access
- home overview
- workflows table
- executions table
- instance diagnostics
- settings with theme toggle

## Known next steps
- richer filtering
- workflow and execution detail drilldowns
- derived health views
- retry/stop actions
- saved views
