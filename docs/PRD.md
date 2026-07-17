# IBM Bob Starter Kit — Impact Dashboard
## Product Requirements Document

> Created by Noor Aftab, IBM Champion.
> A Skilium learning initiative.

---

## 1. Product Vision

The IBM Bob Starter Kit Impact Dashboard gives professionals a single place to track the community and technical impact they create outside of their day job. It transforms scattered notes, spreadsheets, and memory into a clean, exportable record that can be used for performance reviews, award nominations, conference bios, and personal reflection.

The dashboard is the first guided project in the Skilium IBM Bob learning track. Every feature, file, and decision is deliberately explained so that a learner using IBM Bob can follow along, prompt their way through construction, and understand why each choice was made.

---

## 2. User Problem

Professionals — especially those active in tech communities — do a significant amount of visible work outside their formal job description: speaking at conferences, mentoring colleagues, writing articles, running workshops, contributing to open source, and organising community events. This work is:

- **Invisible by default** — it is not tracked in any HR or project management system
- **Forgotten over time** — impact from six months ago is hard to recall at review time
- **Hard to summarise** — when asked "what have you done this year?", people consistently underestimate their contributions
- **Difficult to export** — there is no standard format to share or submit this record to managers, award panels, or nomination committees

The Impact Dashboard solves this by giving users a low-friction way to log contributions as they happen, view them visually, and export them when needed.

---

## 3. Target Users

### Primary
- IBM Champions and IBM employees active in technical communities
- Developers, advocates, and engineers who contribute to open source, events, and mentoring

### Secondary
- Students and early-career professionals building a portfolio of community contributions
- Anyone learning IBM Bob who needs a real, meaningful first project to build

### Persona: The Community Contributor
> "I spoke at three conferences this year, mentored two junior developers, and published four blog posts — but when my manager asked what I had done beyond my regular work, I struggled to remember the specifics, the dates, or how many people I had reached."

---

## 4. User Stories

### Version 1

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-01 | contributor | add a new contribution with title, category, date, description, people reached, hours contributed, organisation or event, technology used, and an evidence URL | I can log a complete record of my work as it happens |
| US-02 | contributor | view all my contributions in a dashboard | I can see an overview of everything I have done |
| US-03 | contributor | edit an existing contribution | I can fix mistakes or add details later |
| US-04 | contributor | delete a contribution | I can remove entries that no longer apply |
| US-05 | contributor | filter contributions by category | I can focus on a specific type of impact |
| US-06 | contributor | see summary metric cards for total contributions, total people reached, and total hours contributed | I can immediately understand my overall impact |
| US-07 | contributor | see a monthly activity bar chart | I can understand the pace and distribution of my contributions across the year |
| US-08 | contributor | see a contribution category donut chart | I can see how my effort is balanced across different types of work |
| US-09 | contributor | export my contributions to CSV | I can include them in a report, performance review, or award nomination |

### Version 2

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-10 | contributor | tag contributions with free-text keywords | I can search and group them in flexible ways beyond category |
| US-11 | contributor | attach a file or image to a contribution | I can store proof or supporting material alongside the record |
| US-12 | contributor | set a numeric goal for each category | I can track progress against a personal target for the year |
| US-13 | contributor | share a read-only link to my dashboard | I can send my impact record to a manager or award panel |
| US-14 | contributor | import contributions from a CSV file | I can migrate historical data into the dashboard |
| US-15 | contributor | sign in and sync my data across devices | my record is not tied to a single browser or machine |
| US-16 | contributor | receive a regular reminder to log contributions | I do not fall behind on recording my work |

---

## 5. Minimum Useful Features (Version 1)

These are the features that must exist for the dashboard to be useful at all.

### Contribution Record
Each contribution stores the following fields:

| Field | Type | Required |
|-------|------|----------|
| Title | Short text | Yes |
| Category | Dropdown — Speaking, Mentoring, Writing, Training, Open Source, Community | Yes |
| Date | Date picker | Yes |
| Description | Long text | No |
| People Reached | Number | No |
| Hours Contributed | Number | No |
| Organisation or Event | Short text | No |
| Technology Used | Short text | No |
| Evidence URL | URL | No |

### Views and Interactions
1. **Contribution form** — add a new entry with all fields above; required fields are validated before submission
2. **Contributions list** — scrollable view of all contributions sorted by most recent date
3. **Edit and delete** — edit pre-fills the form; delete requires a confirmation prompt
4. **Category filter** — filter the list by one or more categories
5. **Summary metric cards** — three stat cards displaying: Total Contributions, Total People Reached, Total Hours Contributed
6. **Monthly activity bar chart** — bar chart showing count of contributions per month for the current year
7. **Contribution category donut chart** — donut chart showing the proportion of contributions per category
8. **CSV export** — download all currently visible contributions as a timestamped CSV file
9. **Persistent local storage** — all data survives a page refresh with no backend or login required

---

## 6. Features for Version 2

These features add meaningful depth but are explicitly out of scope for the initial build.

1. **Tagging and keyword search** — free-text tags on each contribution with a full-text search box
2. **Category goals** — set a numeric target per category (e.g. "10 talks this year") with a progress bar
3. **File attachments** — upload a photo, slide deck, or document linked to a contribution entry
4. **Read-only share link** — generate a URL that displays contributions in a view-only mode
5. **CSV import** — bulk-load historical contributions from a CSV file
6. **Authentication and cloud sync** — sign in to sync data across devices (requires a backend)
7. **Dark mode** — theme toggle for accessibility and personal preference
8. **Print or PDF export** — formatted printable view or PDF download of the full record
9. **Email or push reminders** — periodic nudges to log recent contributions

---

## 7. Acceptance Criteria

### AC-01: Add Contribution
- When the user fills in all required fields (Title, Category, Date) and submits, a new entry appears at the top of the list with the correct data
- Submission is blocked if any required field is empty, with a visible error message per field
- Optional fields may be blank; their columns are empty (not errored) in the exported CSV

### AC-02: View Dashboard
- The dashboard loads and displays all stored contributions on page open
- Each list entry shows at minimum: title, category badge, and date
- Summary metric cards display accurate totals for contributions, people reached, and hours contributed
- The monthly activity bar chart and category donut chart render correctly on first load

### AC-03: Edit Contribution
- Clicking edit on any entry pre-fills the form with all of that entry's existing values
- On save, the updated values replace the original without creating a duplicate entry
- Cancelling an edit leaves the original data unchanged

### AC-04: Delete Contribution
- Clicking delete shows a confirmation prompt before any data is removed
- Confirming permanently removes the entry and updates the list, metric cards, and charts
- Cancelling leaves the entry intact

### AC-05: Category Filter
- Selecting a category shows only entries of that category in the list
- Selecting "All" restores the full list
- The metric cards and charts continue to reflect totals across all contributions regardless of the active filter (filtered view affects the list and export only)

### AC-06: Summary Metric Cards
- Card 1 shows the total number of contributions stored
- Card 2 shows the sum of all People Reached values across all contributions
- Card 3 shows the sum of all Hours Contributed values across all contributions
- All three cards update immediately when entries are added, edited, or deleted

### AC-07: Monthly Activity Bar Chart
- The chart displays one bar per month for the twelve months of the current calendar year
- Bar height represents the count of contributions with a date falling in that month
- Months with zero contributions render as empty (zero-height) bars, not gaps

### AC-08: Contribution Category Donut Chart
- Each slice represents one of the six categories
- Slice size is proportional to the count of contributions in that category
- Categories with zero contributions are omitted from the chart
- A legend maps each slice colour to its category label

### AC-09: CSV Export
- Clicking export downloads a valid, parseable CSV file
- The CSV includes headers: Title, Category, Date, Description, People Reached, Hours Contributed, Organisation or Event, Technology Used, Evidence URL
- The file contains all currently visible (filtered or full) contributions
- The filename includes a date stamp, e.g. `impact-export-2025-07-04.csv`

### AC-10: Data Persistence
- All contributions survive a full browser page refresh
- No backend, server, or user login is required
- Data is stored in the browser's localStorage

---

## 8. Risks and Assumptions

### Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-01 | localStorage has a ~5 MB storage cap, which limits the volume of entries | Low for typical use | Low | Document the limit; Version 2 can offer cloud sync |
| R-02 | Learners using IBM Bob may generate code that conflicts with chosen patterns | Medium | Medium | Provide clear starter prompts and a defined data model in the Starter Kit |
| R-03 | Scope creep — learners may attempt Version 2 features before Version 1 is stable | High | Medium | Explicitly label all features as V1 or V2 in documentation |
| R-04 | The chosen tech stack may be unfamiliar to some learners | Medium | Medium | Choose a stack with broad beginner accessibility; document the choice and rationale |
| R-05 | The project is too simple to be interesting, or too complex to finish | Medium | High | Keep V1 tightly scoped to the features above; make V2 the growth path |
| R-06 | Chart rendering library adds unexpected complexity for beginners | Low | Medium | Choose a chart library with a minimal, declarative API |

### Assumptions

- Users will run this as a local web application (browser-based; no server required for V1)
- Data does not need to sync across devices in Version 1
- One user per browser — no multi-user or authentication requirements for V1
- IBM Bob is available in whatever IDE or environment the learner is using
- The six contribution categories (Speaking, Mentoring, Writing, Training, Open Source, Community) are hard-coded in V1 and not user-configurable
- The project will be accompanied by IBM Bob prompts and explanations so a beginner can follow along step by step

---

## 9. Recommended Build Sequence

Each step is designed to be a self-contained IBM Bob task with a clear prompt, clear inputs, and a verifiable output.

```
Step 1 — Project scaffold
  Set up the project structure, install dependencies, confirm the app runs in a browser

Step 2 — Data model and storage layer
  Define the Contribution object shape and implement localStorage helpers (create, read, update, delete)

Step 3 — Contribution form (add)
  Build the form UI with all V1 fields and validation; write to localStorage on submit

Step 4 — Contributions list
  Read from localStorage and render entries as cards or table rows; show title, category badge, date

Step 5 — Edit and delete
  Wire up edit (pre-fill form) and delete (confirmation prompt, then remove from storage)

Step 6 — Category filter
  Add the filter control; reactively filter the rendered list

Step 7 — Summary metric cards
  Calculate and display total contributions, total people reached, total hours contributed

Step 8 — Monthly activity bar chart
  Render a bar chart of contributions per month for the current calendar year

Step 9 — Contribution category donut chart
  Render a donut chart showing the proportion of contributions per category

Step 10 — CSV export
  Generate and trigger download of a correctly formatted CSV from the current list

Step 11 — Polish and accessibility
  Responsive layout, keyboard navigation, empty states, loading states, error messages

Step 12 — Starter Kit documentation
  Write the README, a prompt guide showing how to use IBM Bob for each step, and a learner walkthrough
```

---

## 10. Technical Decisions

All questions from the planning phase are answered. These decisions are final for Version 1.

| ID | Question | Decision |
|----|----------|----------|
| Q-01 | Tech stack | **React, TypeScript, and Vite** — component-based, type-safe, and the most common modern stack learners will encounter in real projects |
| Q-02 | Project structure | **Proper multi-file project** — separate components, types, hooks, and utilities; reflects how IBM Bob is used on real codebases |
| Q-03 | Visual design | **Clean, friendly, and professional** — IBM-inspired colour palette and spacing without copying any protected IBM visual assets; approachable for a complete beginner |
| Q-04 | Chart library | **Recharts** — declarative React components, minimal configuration, good documentation, beginner-friendly API |
| Q-05 | IBM Bob prompts | **Yes, included for every build step** — each step in the build sequence will include the exact IBM Bob prompt used to produce that step's output |
| Q-06 | Deployment | **Local-first, publicly deployable** — runs with `npm run dev` locally; production build must be deployable to GitHub Pages or Vercel without additional configuration |
| Q-07 | Target learner | **Complete beginner** — no assumed coding knowledge; every file, command, and concept is explained in plain language |

---

## 11. Recommended Project Structure

```
ibm-bob-starter/
├── public/                   # Static assets served as-is
├── src/
│   ├── components/           # React UI components (form, list, cards, charts)
│   ├── hooks/                # Custom React hooks (e.g. useContributions)
│   ├── types/                # TypeScript type definitions (Contribution, Category)
│   ├── utils/                # Pure helper functions (storage, CSV export, chart data)
│   ├── App.tsx               # Root component and layout
│   ├── main.tsx              # Vite entry point
│   └── index.css             # Global styles
├── docs/
│   └── PRD.md                # This document
├── index.html                # Vite HTML entry
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## 12. IBM Bob Prompt Guide (per Build Step)

Each prompt below is the exact instruction to give IBM Bob to produce the output for that step. Prompts are written for a complete beginner — they include context, constraints, and expected output so IBM Bob has everything it needs.

> **How to use these prompts:** Open IBM Bob in your IDE. Copy the prompt exactly. Review the output before accepting it. If something looks wrong, ask IBM Bob to explain or revise.

---

### Step 1 — Project Scaffold
**Goal:** A working Vite + React + TypeScript project that runs in the browser.

**IBM Bob Prompt:**
```
I am building a personal Impact Dashboard using React, TypeScript, and Vite.
It is a beginner learning project.

Scaffold a new Vite project with the following:
- React and TypeScript template
- A src/ folder containing App.tsx, main.tsx, and index.css
- A public/ folder
- A docs/ folder (leave it empty for now)
- A package.json with react, react-dom, typescript, vite, and recharts as dependencies

Do not add any application logic yet. The app should render a single heading that says "Impact Dashboard" so I can confirm it runs.

Show me every file you create and explain what each one does in plain language.
```

---

### Step 2 — Data Model and Storage Layer
**Goal:** A TypeScript type for Contribution and localStorage helper functions.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

Create a TypeScript type called Contribution with these fields:
- id: string (a unique identifier, generated automatically)
- title: string (required)
- category: one of "Speaking" | "Mentoring" | "Writing" | "Training" | "Open Source" | "Community"
- date: string in ISO format YYYY-MM-DD (required)
- description: string (optional)
- peopleReached: number (optional)
- hoursContributed: number (optional)
- organisation: string (optional)
- technologyUsed: string (optional)
- evidenceUrl: string (optional)

Then create a utility file called src/utils/storage.ts with four functions:
- getContributions(): returns all contributions from localStorage
- saveContribution(contribution): adds a new contribution and saves it
- updateContribution(contribution): replaces an existing contribution by id and saves it
- deleteContribution(id): removes a contribution by id and saves the result

Use localStorage with the key "impact-contributions".
Explain every line in plain language as if I have never written TypeScript before.
```

---

### Step 3 — Contribution Form
**Goal:** A React form component that adds a new contribution to localStorage.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

I already have a Contribution type and localStorage helper functions in src/utils/storage.ts.

Create a React component called ContributionForm in src/components/ContributionForm.tsx.

The form must have these fields:
- Title (text input, required)
- Category (dropdown with options: Speaking, Mentoring, Writing, Training, Open Source, Community — required)
- Date (date picker, required)
- Description (textarea, optional)
- People Reached (number input, optional)
- Hours Contributed (number input, optional)
- Organisation or Event (text input, optional)
- Technology Used (text input, optional)
- Evidence URL (URL input, optional)

Rules:
- Show a visible error message under each required field if the user tries to submit without filling it in
- On successful submission, save the contribution using saveContribution() and reset the form
- Accept an optional prop called editingContribution — if provided, pre-fill the form with that contribution's values for editing

Style the form to look clean and readable. Explain every decision in plain language.
```

---

### Step 4 — Contributions List
**Goal:** A React component that reads from localStorage and renders all contributions.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

Create a React component called ContributionList in src/components/ContributionList.tsx.

It receives an array of Contribution objects as a prop called contributions.

For each contribution, display a card showing:
- Title (prominent)
- Category as a coloured badge (each category has a distinct colour)
- Date (formatted as a human-readable date, e.g. 4 July 2025)
- Description (if present, truncated to two lines)
- Organisation or Event (if present)
- People Reached and Hours Contributed as small stats (if present)
- An Evidence URL displayed as a clickable link labelled "View Evidence" (if present)
- Edit and Delete buttons

If there are no contributions yet, show a friendly empty state message.

Explain every decision in plain language.
```

---

### Step 5 — Edit and Delete
**Goal:** Wire up the Edit and Delete actions from the contributions list.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

I have a ContributionList component with Edit and Delete buttons on each card.
I have a ContributionForm component that accepts an editingContribution prop.
I have updateContribution() and deleteContribution() helper functions in src/utils/storage.ts.

In App.tsx, wire up the following behaviour:

Edit:
- When the user clicks Edit on a card, pass that contribution to ContributionForm via the editingContribution prop
- When the form is saved, call updateContribution() and clear the editing state
- When the user cancels, clear the editing state without saving

Delete:
- When the user clicks Delete on a card, show a browser confirm() dialog with the message: "Are you sure you want to delete this contribution? This cannot be undone."
- If the user confirms, call deleteContribution() and refresh the list
- If the user cancels, do nothing

After any add, edit, or delete, re-read contributions from localStorage and update the displayed list.

Explain every step in plain language.
```

---

### Step 6 — Category Filter
**Goal:** A filter control that narrows the contributions list by category.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

Create a React component called CategoryFilter in src/components/CategoryFilter.tsx.

It should display a row of clickable buttons — one for each category (Speaking, Mentoring, Writing, Training, Open Source, Community) plus an "All" button.

Rules:
- The currently active filter button should look visually selected
- Clicking a category button shows only contributions of that category
- Clicking "All" shows all contributions
- The filter only affects the contributions list and the CSV export
- The summary metric cards and charts always reflect all contributions regardless of the filter

Pass the active filter state up to App.tsx and apply it when rendering ContributionList.

Explain every decision in plain language.
```

---

### Step 7 — Summary Metric Cards
**Goal:** Three stat cards showing total contributions, total people reached, and total hours contributed.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

Create a React component called MetricCards in src/components/MetricCards.tsx.

It receives the full array of all contributions (unfiltered) as a prop.

Display three cards side by side (stacking on mobile):
- Card 1: Total Contributions — the count of all contributions
- Card 2: People Reached — the sum of all peopleReached values (treat missing values as 0)
- Card 3: Hours Contributed — the sum of all hoursContributed values (treat missing values as 0)

Each card should have a large number, a label, and a small icon or emoji to make it visually clear.

The cards should update automatically whenever the contributions array changes.

Explain every decision in plain language.
```

---

### Step 8 — Monthly Activity Bar Chart
**Goal:** A Recharts bar chart showing contribution count per month for the current year.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.
I am using the Recharts library for charts.

Create a React component called MonthlyBarChart in src/components/MonthlyBarChart.tsx.

It receives the full array of all contributions as a prop.

Display a bar chart with:
- One bar per month for all twelve months of the current calendar year
- The x-axis shows month abbreviations (Jan, Feb, Mar, etc.)
- The y-axis shows the count of contributions
- Months with zero contributions show an empty (zero-height) bar, not a gap
- A tooltip that shows the count when hovering over a bar

Use only contributions whose date falls in the current calendar year.

Explain every decision in plain language, including how Recharts works.
```

---

### Step 9 — Contribution Category Donut Chart
**Goal:** A Recharts donut chart showing the proportion of contributions per category.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.
I am using the Recharts library for charts.

Create a React component called CategoryDonutChart in src/components/CategoryDonutChart.tsx.

It receives the full array of all contributions as a prop.

Display a donut chart (a PieChart with an inner radius) where:
- Each slice represents one category
- Slice size is proportional to the count of contributions in that category
- Categories with zero contributions are omitted from the chart
- Each category has a distinct, consistent colour across the whole application
- A legend below the chart maps each colour to its category name and count
- A tooltip shows the category name and count when hovering over a slice

If there are no contributions yet, show a friendly placeholder message instead of an empty chart.

Explain every decision in plain language.
```

---

### Step 10 — CSV Export
**Goal:** A button that downloads all visible contributions as a timestamped CSV file.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.

Create a utility function called exportToCSV in src/utils/exportToCSV.ts.

It accepts an array of Contribution objects and triggers a CSV file download in the browser.

The CSV must:
- Include a header row: Title, Category, Date, Description, People Reached, Hours Contributed, Organisation or Event, Technology Used, Evidence URL
- Include one row per contribution in the order they appear in the array
- Handle missing optional fields as empty cells (not the word "undefined")
- Use a filename in the format: impact-export-YYYY-MM-DD.csv using today's date

Then add an Export CSV button to the dashboard. It should export only the currently filtered contributions (or all contributions if no filter is active).

Explain every decision in plain language.
```

---

### Step 11 — Polish and Accessibility
**Goal:** Responsive layout, accessible markup, empty states, and a production-ready build.

**IBM Bob Prompt:**
```
I am building an Impact Dashboard in React and TypeScript.
The application is feature-complete. I now want to polish it.

Please review the existing components and make the following improvements:

1. Responsive layout — the dashboard should look good on mobile, tablet, and desktop
2. Accessibility — all form inputs must have associated labels; all interactive elements must be keyboard-focusable; colour is never the only way to convey meaning
3. Empty states — if there are no contributions yet, the list and charts should show a helpful, friendly message rather than blank space
4. Button states — the Export CSV button should be disabled (and show a tooltip explaining why) when there are no contributions to export
5. Consistent spacing and typography — use a clean type scale and consistent spacing throughout

Do not change any data logic. Only change the visual presentation and accessibility of existing components.

Explain every change you make.
```

---

### Step 12 — Starter Kit Documentation
**Goal:** A README and learner walkthrough that lets a complete beginner build the app from scratch using IBM Bob.

**IBM Bob Prompt:**
```
I have finished building an Impact Dashboard using React, TypeScript, Vite, and Recharts.
It is the first project in the IBM Bob Starter Kit, a Skilium learning initiative created by Noor Aftab, IBM Champion.

Write a README.md for this project that includes:
1. What the project is and why it was built
2. What IBM Bob is and how it was used to build this project
3. Prerequisites (Node.js, an IDE with IBM Bob)
4. How to run the project locally (step by step, for a complete beginner)
5. How to deploy to GitHub Pages or Vercel
6. A summary of what was built in each step
7. Tips for using IBM Bob effectively (e.g. how to ask follow-up questions, how to ask for explanations)
8. Attribution: "Created by Noor Aftab, IBM Champion. A Skilium learning initiative."

Write in plain, friendly language. Assume the reader has never built a web application before.
```
