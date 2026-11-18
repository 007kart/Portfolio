# Kartikey Sharma — Portfolio

A handcrafted editorial-style **light-theme developer portfolio** in plain HTML, CSS and JavaScript.

**Designed for:** Next.js full-stack job applications and one-page ATS resume.

## Features

- Responsive portfolio with custom hero, product mockups, professional timeline and accessibility-conscious motion
- Keyboard-accessible, deep-linkable project selector modal
- **Three interactive browser previews:** E-Commerce and ERP use synthetic data and browser localStorage; the AI preview uses local keyword-based document retrieval
- Real AI Document Assistant source uses Next.js + FastAPI + PostgreSQL/pgvector and an OpenAI API key
- Updated ATS-readable resume in `resume.html` with print-to-PDF support
- No JS frameworks or build tooling needed for portfolio hosting

## Important: live previews vs. full-stack deployment

The demos at `/demos/ecommerce/` and `/demos/erp/` are **interactive browser-only previews using synthetic data**. CRUD operations, filters, report export and dashboard state run locally in JavaScript. They **do not call PostgreSQL**.

E-Commerce and ERP linked GitHub repositories contain separate **Next.js + JavaScript + PostgreSQL** applications with server-side APIs. The AI project uses a Next.js/TypeScript frontend and a Python/FastAPI backend with pgvector. `/demos/ai/` is a keyword-search preview, not an LLM or vector retrieval deployment. To show recruiters a fully deployed database-backed app, that Next.js repository still needs hosting on Vercel / Railway / Render and a hosted PostgreSQL database. When deployed, update `script.js` `demo` URLs to the real application URLs; leave the GitHub `repo` URLs unchanged.

## Project deep links (for resume PDF)

- E-Commerce: `https://007kart.github.io/Portfolio/?project=ecommerce`
- ERP Inventory: `https://007kart.github.io/Portfolio/?project=erp`
- AI prototype: `https://007kart.github.io/Portfolio/?project=ai`

Visiting a deep link opens the project selector. Recruiters can choose either **Launch interactive demo** or **View GitHub source code**.

## Getting the portfolio live on GitHub Pages

GitHub repository: `https://github.com/007kart/Portfolio`

1. Go to repository **Settings → Pages**.
2. Under *Build and deployment*, choose **Deploy from a branch**.
3. Select branch **main**, folder **/(root)**, then **Save**.
4. Confirm successful publishing at `https://007kart.github.io/Portfolio/` and verify the project deep links.

If Pages is not enabled, the resume's portfolio and project links cannot work until it is published.

## Local use

Run `python3 -m http.server 8000` in this repository, then open `http://localhost:8000`. The demo pages require no API key or database.

## File map

- `index.html`, `styles.css`, `script.js`: portfolio and project selector
- `demos/ecommerce/index.html`: CommercePulse preview
- `demos/erp/index.html`: StockPilot preview
- `demos/ai/index.html`: browser-only document search concept preview
- `demo.css`, `demo.js`: shared interactive preview engine
- `resume.html`: current printable resume (linked by portfolio navigation)
- `resume.pdf`: legacy archive PDF; not the current linked resume
- `favicon.svg`: icon

Everything showcased as sample data uses synthetic records; no employer or client information is included.
