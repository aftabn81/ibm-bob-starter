# Champion Copilot — Champion Impact Tracker

> **Track your IBM Champion contributions, visualise your impact, and build nomination-ready evidence — all in your browser, with no login required.**

![Dashboard screenshot](screenshots/dashboard.png)

---

## What it helps Champions do

IBM Champions are expected to demonstrate consistent, meaningful community contributions across speaking, writing, mentoring, open source, training, and community work. Keeping that evidence organised and nomination-ready is harder than it sounds.

Champion Copilot gives you a single place to:

- **Log every contribution** with category, date, people reached, hours, technology, organisation, and an evidence link
- **See your impact at a glance** — summary cards, quarterly filters, a bar chart of hours by month, and a pie chart of contributions by category
- **Prepare for nominations** — copy a formatted contribution summary to your clipboard in one click
- **Get personalised nudges** — next-step suggestions based on what you've already logged
- **Browse the Idea Vault** — 15 curated contribution ideas across five categories, with the ability to save favourites

---

## Key features

| Feature | Detail |
|---|---|
| My Impact dashboard | Summary cards, quarterly filter, hours and category charts, recent contributions |
| Contributions page | Add / edit / delete entries, search, quarter and category filters |
| Idea Vault | 15 filtered contribution ideas with save-to-vault |
| Profile card | Name, region, expertise, URL, and optional photo — stored locally |
| Demo mode | Load realistic sample data without touching your own records |
| Data safety | Type `DELETE` confirmation required before clearing all data |
| Keyboard navigation | Full keyboard support and ARIA roles throughout |
| Mobile responsive | Single-column layout on small screens |

---

## No login · browser storage

Champion Copilot has no backend, no database, and no telemetry. Everything — your contributions, profile, and saved ideas — lives in your browser's `localStorage`. Nothing ever leaves your device.

**Back up your data:** open your browser's DevTools console and run:

```js
copy(localStorage.getItem('impact_dashboard_contributions'))
```

Paste the output into a text file and keep it safe.

---

## Live app

> 🔗 **[Live app placeholder — add your deployed URL here]**

---

## Quick start for builders

```bash
# Clone
git clone https://github.com/aftabn81/ibm-bob-starter.git
cd ibm-bob-starter

# Install
npm install

# Develop
npm run dev

# Type-check
npx tsc --noEmit

# Production build
npm run build

# Preview production build locally
npm run preview
```

Requirements: **Node 18+** and **npm 9+**.

---

## Built with IBM Bob — Plan → Build → Test → Publish

This project was built from start to finish using [IBM Bob](https://bob.ibm.com), IBM's AI software engineering assistant.

| Stage | What IBM Bob did |
|---|---|
| **Plan** | Designed the application architecture, data model, and component hierarchy |
| **Build** | Generated accessible React + TypeScript components, CSS layout, and localStorage persistence |
| **Test** | Ran TypeScript checks, identified and fixed edge-case behaviour across all pages |
| **Publish** | Prepared the production build, wrote this README, and validated the project for public release |

The result is a fully client-side, privacy-first tracker with no backend or telemetry — built in a fraction of the time it would take from scratch.

---

## Screenshots

| Page | Description |
|---|---|
| `screenshots/dashboard.png` | My Impact — summary cards, charts, next steps |
| `screenshots/contributions.png` | Contributions page — form, list, search, filters |
| `screenshots/idea-vault.png` | Idea Vault — category filters, saved ideas |

> Add your own screenshots to the `screenshots/` directory.

---

## Technology stack

| Technology | Role |
|---|---|
| [React 18](https://react.dev) | UI components |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Vite 5](https://vitejs.dev) | Build tool and dev server |
| [Recharts](https://recharts.org) | Bar and pie charts |
| Browser `localStorage` | Client-side data persistence |

No framework, no database, no backend. One `npm install` and it runs.

---

## Privacy and data backup

- All data is stored in **your browser only** — `localStorage` under the keys `impact_dashboard_contributions`, `impact_dashboard_profile`, and `idea_vault_saved`
- Clearing browser data or switching browsers will remove your records
- **To back up:** copy the raw JSON from DevTools (see above) and store it somewhere safe
- **To restore:** paste the JSON back with `localStorage.setItem('impact_dashboard_contributions', '<your JSON>')`

---

## Disclaimer

This is an independent community-built project created by Noor Aftab, IBM Champion. It is not an official IBM product.

---

## Links

| | |
|---|---|
| IBM Bob | [bob.ibm.com](https://bob.ibm.com) |
| IBM Bob on LinkedIn | [linkedin.com/company/ibmbob](https://www.linkedin.com/company/ibmbob/) |
| Noor Aftab | [linkedin.com/in/nooraftab](https://www.linkedin.com/in/nooraftab) |
| Skilium | [skilium.ai](https://skilium.ai) |
| Skilium on LinkedIn | [linkedin.com/company/skiliumai](https://www.linkedin.com/company/skiliumai/) |
| GitHub | [aftabn81/ibm-bob-starter](https://github.com/aftabn81/ibm-bob-starter) |
