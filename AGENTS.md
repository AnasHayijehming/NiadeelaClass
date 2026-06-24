# Repository Guidelines

## Project Structure & Module Organization

This repository is a static Thai classroom portfolio for elementary math learning apps. The landing gallery lives in `index.html`, with shared gallery behavior in `script.js` and page styling in `styles.css`. Individual games are under `apps/<game>/`, for example `apps/addition/index.html` with `apps/addition/addition.js`. Shared game styling is in `apps/app.css`. Generated or curated images belong in `assets/`, and visual QA evidence belongs in `qa-screenshots/`. `design-qa.md` records the latest design review and screenshot checklist.

## Build, Test, and Development Commands

There is no package manifest or build step. Serve the repository root with any static server:

```powershell
py -m http.server 4173
```

Then open `http://127.0.0.1:4173/`. Check app routes such as `http://127.0.0.1:4173/apps/addition/index.html`. Before committing, run:

```powershell
git status --short
```

Use Playwright or a browser to refresh screenshots when UI changes, matching the viewports documented in `design-qa.md`.

## Coding Style & Naming Conventions

Use two-space indentation for HTML, CSS, and JavaScript. Keep HTML semantic and accessible with useful `aria-*` labels where controls update content. Use kebab-case for folders, CSS classes, and file names such as `word-problems.js`; use camelCase for JavaScript variables and functions. Keep colors, spacing, radius, and font tokens in `:root` where practical. Thai copy should use the existing `Noto Sans Thai` font stack and stay concise enough for mobile layouts.

## Testing Guidelines

No automated test framework is configured. Validate changes by serving locally, clicking the gallery filters, opening every app card, and completing at least one interaction in each changed game. For layout changes, check desktop and mobile widths and update relevant files under `qa-screenshots/`. Record notable visual or interaction findings in `design-qa.md`.

## Commit & Pull Request Guidelines

Git history currently has only `Initial commit`, so no strict project convention exists yet. Use short imperative commit subjects, for example `Add word problem feedback guard` or `Update gallery mobile filters`. Pull requests should include a brief summary, changed routes, manual test results, and before/after screenshots for visual changes. Mention any sample teacher profile content that still needs replacement.

## Security & Configuration Tips

Do not commit secrets, logs, temporary files, or editor folders; `.gitignore` already excludes common local artifacts. External resources currently come from Google Fonts and Font Awesome CDNs, so verify pages still render acceptably if those requests fail.
