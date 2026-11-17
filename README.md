# Kartikey Sharma — Portfolio

A handcrafted editorial-style **light-theme developer portfolio** in plain HTML, CSS and JavaScript.

**Designed for:** Next.js full-stack job applications and one-page ATS resume.

## Features

- Responsive portfolio with custom hero, product mockups, professional timeline and accessibility-conscious motion
- Keyboard-accessible, deep-linkable project selector modal
- **Two interactive browser previews:** sales analytics and ERP inventory; data persists in the current browser through localStorage
- A third AI Document Assistant (source-only prototype)
- Downloadable resume PDF
- No JS frameworks or build tooling needed for portfolio hosting

## Important: live previews vs. full-stack deployment

The demos at `/demos/ecommerce/` and `/demos/erp/` are **interactive browser-only previews using synthetic data**. CRUD operations, filters, report export and dashboard state run locally in JavaScript. They **do not call PostgreSQL**.

Each linked GitHub repository contains a separate **Next.js + JavaScript + PostgreSQL** application with server-side APIs. To show recruiters a fully deployed database-backed app, that Next.js repository still needs hosting on Vercel / Railway / Render and a hosted PostgreSQL database. When deployed, update `script.js` `demo` URLs to the real application URLs; leave the GitHub `repo` URLs unchanged.

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
- `demo.css`, `demo.js`: shared interactive preview engine
- `resume.pdf`: resume PDF
- `favicon.svg`: icon

Everything showcased as sample data uses synthetic records; no employer or client information is included.
