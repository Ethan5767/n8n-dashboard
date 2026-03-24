# ⚡ n8n Dashboard

> A clean, local-first dashboard for **monitoring your n8n instance** without digging through the full editor.

**Connect in minutes.**
Just add:
- `N8N_BASE_URL`
- `N8N_API_KEY`

And get a smoother way to track:
- ✅ workflow health
- 📈 recent executions
- 🚨 failures that need attention
- 🌙 dark mode / ☀️ light mode
- 🔐 server-side API key handling

---

## ✨ Why this exists

n8n is powerful, but sometimes you do not want to jump straight into the full workflow builder just to answer simple questions like:

- Is my instance healthy?
- Which workflows are active?
- What failed recently?
- What needs my attention right now?

**n8n Dashboard** is built to be a fast, clean, local-first operational view for your automations.

It is **not** trying to replace the n8n editor.
It is built to make monitoring feel lighter, calmer, and faster.

---

## 🚀 Features

### Current MVP
- ⚡ Fast local-first setup
- 🔗 Connect using only `n8n URL + API key`
- 🏠 Overview dashboard for quick health checks
- 🧩 Workflows table for scanning your automations
- 🧾 Executions table for recent run visibility
- 🩺 Instance diagnostics view
- 🌙 Dark / ☀️ light theme toggle
- 🔐 Tiny local proxy so the API key stays server-side

### Designed for
- solo builders
- indie hackers
- automation operators
- teams who want a cleaner monitoring layer for n8n

---

## 🖼️ Product direction

This project is designed around a simple idea:

> **Make n8n easier to monitor than to explain.**

That means:
- less dashboard fluff
- fewer noisy charts
- more useful tables
- better scanability
- faster triage
- a setup flow that does not fight you

---

## 🛠️ Tech stack

- **React**
- **TypeScript**
- **Vite**
- **Express** (tiny local proxy)
- **TanStack Query**

Simple, boring, reliable.
Exactly what a local ops dashboard should be.

---

## ⚡ Quick start

```bash
git clone git@github.com:Ethan5767/n8n-dashboard.git
cd n8n-dashboard
npm install
cp .env.example .env.local
# fill in N8N_BASE_URL and N8N_API_KEY
npm run dev
```

Open:
- `http://localhost:5173`

Ports used:
- frontend: `5173`
- local proxy: `3001`

---

## 🔑 Requirements

You only need:
- **Node.js 22+**
- **npm**
- a reachable **n8n instance**
- an **n8n API key** from:
  - `Settings -> n8n API`

---

## ⚙️ Environment setup

Create `.env.local`:

```bash
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your_real_key_here
PORT=3001
```

---

## 📜 Scripts

- `npm run dev` — run frontend + local proxy
- `npm run build` — production build + server compile
- `npm run typecheck` — TypeScript validation
- `npm run lint` — lint the codebase
- `npm run verify` — typecheck + build
- `npm run smoke` — test direct API connectivity to your n8n instance

---

## 🔐 Security note

Your `N8N_API_KEY` is meant to stay **server-side** in `.env.local`.
The frontend talks to the local proxy through `/api`.

That means this project is safer than dropping your key directly into a browser-only frontend.

---

## 🎯 MVP scope

This version focuses on the essentials:
- connect and validate n8n access
- home overview
- workflows table
- executions table
- instance diagnostics
- settings with theme toggle

The goal is to ship something **useful immediately**, then expand carefully.

---

## 🧠 Roadmap

Planned improvements:
- richer filtering
- workflow and execution detail drilldowns
- derived health views
- retry / stop actions
- saved views
- smarter attention surfaces

---

## 🤝 Contributing

Ideas, feedback, and pull requests are welcome.

If you use n8n regularly and want a cleaner operational dashboard, this repo is for you.

---

## ⭐ If this helps you

Give it a star, share it with other n8n builders, and help shape a better local monitoring experience for automations.

**Less digging. More signal.**
