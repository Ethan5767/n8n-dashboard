# ⚡ n8n Dashboard

> A sleek, local-first operational dashboard for **monitoring, reviewing, and controlling your n8n instance** without living inside the full editor.

**Built for builders who want more signal, less digging.**

With only:
- `N8N_BASE_URL`
- `N8N_API_KEY`

You get a cleaner way to:
- ✅ monitor workflow health
- 📈 inspect recent executions
- 🚨 catch failures faster
- 🎛️ activate or deactivate workflows
- 🔁 retry or stop executions
- 🌙 work in a polished dark-first UI

---

## ✨ Why this repo matters

n8n is powerful, but the day-to-day operational experience can still feel heavier than it needs to be.

This project focuses on the part that matters most when you are actually running automations:

- What is active?
- What failed?
- What is running right now?
- What needs attention?
- What can I do immediately from the dashboard?

**n8n Dashboard** is designed to be a calm, modern control layer for your automation engine.

---

## 🚀 Features

### Current capabilities
- ⚡ Fast local-first setup
- 🔗 Connect with only `n8n URL + API key`
- 🏠 Dashboard overview with operational KPIs
- 🧩 Workflows inventory with activate / deactivate actions
- 🧾 Execution logs with retry / stop actions
- 🩺 Instance diagnostics
- 🎨 Dark / light mode
- 🔐 Server-side API key handling through a local proxy
- 📘 Project-level `DESIGN.md` for reusable UI direction

### Built for
- n8n power users
- solo builders
- indie hackers
- automation operators
- developers who want a better operational UI around self-hosted n8n

---

## 🖼️ Design direction

This repo is intentionally inspired by premium dark operational dashboards:
- dense but readable
- strong hierarchy
- minimal visual noise
- warm coral action accents
- fast scanability for failures, workflow state, and execution health

The goal is simple:

> **Make n8n operations feel fast, modern, and actually enjoyable to use.**

---

## 🛠️ Tech stack

- **React**
- **TypeScript**
- **Vite**
- **Express**
- **TanStack Query**

Simple enough to run locally.
Flexible enough to grow.

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

Ports:
- frontend: `5173`
- proxy: `3001`

---

## 🔑 Requirements

- **Node.js 22+**
- **npm**
- a reachable **n8n instance**
- an **n8n API key** from:
  - `Settings -> n8n API`

---

## ⚙️ Environment

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
- `npm run smoke` — verify direct connectivity to n8n

---

## 🔐 Security note

The `N8N_API_KEY` is intended to stay **server-side** in `.env.local`.
The frontend talks to the local proxy under `/api`.

That means this project is safer than dropping your key directly into a browser-only frontend.

---

## 🎯 MVP scope

This version focuses on practical operations value:
- connect and validate n8n access
- overview dashboard
- workflows table
- executions table
- workflow activate / deactivate
- execution retry / stop
- instance diagnostics
- theme settings

---

## 🧠 Roadmap

Planned upgrades:
- richer filtering
- deeper workflow / execution drill-downs
- stronger health views
- better timeline and trace surfaces
- saved views
- multi-instance support

---

## 🤝 Contributing

Ideas, feedback, issues, and pull requests are welcome.

If you run n8n in production or for serious side projects, this repo is meant to become a genuinely useful companion tool.

---

## ⭐ If you like this project

Give it a star, share it with other n8n builders, and help make local-first automation tooling better.

**Less editor hopping. More operational clarity.**
