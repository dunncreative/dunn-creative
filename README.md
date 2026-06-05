# Dunn Creative

Marketing site for Dunn Creative — built with [Astro](https://astro.build) and
Tailwind, deployed to Hostinger via GitHub Actions.

## Quick start

```bash
npm install      # requires Node 20+
npm run dev      # http://localhost:4321
```

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

## Structure

```
src/
├── components/
│   ├── cards/        ServiceCard, ProjectCard
│   └── layout/       Header, Nav, Footer
├── content/
│   ├── services/     8 service pages (.md)
│   ├── work/         case studies (.md)
│   └── config.ts     content collection schemas
├── layouts/          Base, Page, Service, Project
├── pages/            routes (index, work, services, about, contact, 404)
└── styles/           tokens.css, global.css
```

## Content

Add a **service** → new `.md` in `src/content/services/` (live at
`/services/<slug>`). Add a **project** → new `.md` in `src/content/work/` (live
at `/work/<slug>`). Schemas are enforced in `src/content/config.ts`.

## Images

Content references images under `public/images/`. Dark placeholders are checked
in. To regenerate placeholders for any new image paths:

```bash
npm install -D sharp
node scripts/gen-placeholders.js
```

Replace the files in `public/images/` with real assets when ready.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and uploads `./dist/` to Hostinger over FTP. Configure these repo secrets under
**Settings → Secrets and variables → Actions**:

| Secret            | Value                                          |
| ----------------- | ---------------------------------------------- |
| `FTP_SERVER`      | Hostinger FTP hostname                          |
| `FTP_USERNAME`    | Hostinger FTP username                          |
| `FTP_PASSWORD`    | Hostinger FTP password                          |
| `PUBLIC_SITE_URL` | `https://dunncreative.net`                      |

## Contact form

`src/pages/contact.astro` runs in local-dev mode (simulated success) until you
add a Formspree form ID — set `FORMSPREE_ID` in the page's inline script, then
deploy.

## To customize before launch

- **Founder bio** — `src/pages/about.astro` (`TODO` marker)
- **Social links** — `src/components/layout/Footer.astro` (LinkedIn / Instagram)
- **Contact email** — `hello@dunncreative.net` in `contact.astro` / `Footer.astro`
- **Real images** — drop into `public/images/`
