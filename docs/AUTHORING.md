# AUTHORING

## Content Locations
- Write posts in `src/content/posts/` using `.md` or `.mdx`. Each file becomes a routed entry under `/blog/{slug}/`.
- Store shared assets in `public/images/`. Reference them with absolute paths (e.g., `/blog/images/diagram.png`) so they deploy correctly under the `/blog` base path.

## Front Matter Contract
Every post must include the following fields:

```yaml
---
title: "Readable, public-facing title"          # Required
date: 2025-11-05                                # Required; ISO, coercible to Date
tags:                                           # Required; stays theme-agnostic
  - automation
excerpt: "120–160 character summary."           # Optional; surfaces in listings and meta
hero: "/blog/images/feature.png"                # Optional; keep under /public/images
draft: false                                    # Required; set true to hide from production
canonical: "https://automationarchitech.com/blog/custom-url/"  # Optional override
---
```

Guidelines:
- Use lowercase, hyphenated filenames (`2025-11-hello-world.mdx`) to keep slugs stable.
- `draft: true` hides a post from the build; it remains visible in local development.
- Keep `excerpt` concise—it feeds list summaries and meta tags.
- If specifying `canonical`, ensure it matches the published URL exactly.

## MDX Usage
MDX is available for rich content:

```mdx
```ts
export const pipeline = ["ingest", "transform", "ship"];
```

<figure>
  <img src="/blog/images/pipeline.png" alt="Pipeline overview" loading="lazy" decoding="async" />
  <figcaption>Automation Architech deployment pipeline.</figcaption>
</figure>

<iframe
  title="YouTube walkthrough"
  src="https://www.youtube.com/embed/example"
  loading="lazy"
  allowfullscreen
/>
```

Prefer semantic HTML (`figure`, `figcaption`, `h2`) to maintain accessibility.

## Local Preview Workflow
1. Install dependencies: `npm ci`
2. Start the dev server: `npm run dev` (visit `http://localhost:4321/blog/`)
3. Build locally with canonical URLs: `SITE_URL=http://localhost:4321 npm run build`
4. Preview static output: `npm run preview` and browse to `/blog/`

Draft posts (`draft: true`) render during steps 2 and 4 when `NODE_ENV=development`, but they remain excluded from production builds.

## Publishing Checklist
1. Create a feature branch in `astro-blog-app`.
2. Author or update posts under `src/content/posts/`.
3. Add any required assets to `public/images/` and reference them with absolute paths.
4. Run `npm run build` to ensure the static output succeeds.
5. Commit with descriptive messages (e.g., `feat: add zero-trust pipeline post`).
6. Open a PR against `main`; upon merge, CI deploys the blog to GitHub Pages.

Questions or change requests for the editorial workflow should be logged as GitHub Issues in `illtellyouwhat/astro-blog-app`.
