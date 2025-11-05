# Astro Blog Pipeline — LLM‑Facing Reference (Up‑to‑Date)

> Purpose: a single source of truth for generating a **deployable Astro blog at `/blog`** that accepts Markdown/MDX in a repo and auto‑deploys via CI. This doc is written for an LLM to follow precisely, with current, standards‑based Astro practices (v5‑ready).

---

## 0) Project assumptions
- Repos (siblings):
  - **Site**: `architech-web-forge` (React/Vite). Only links to `/blog`.
  - **Blog**: `astro-blog-app` (Astro SSG). Output is fully static.
  - **Theme**: `astro-yi_theme` (wrapper/fork of `cirry/astro-yi`).
- Deploy target: path `/blog` under the primary domain (or subdomain now, path later).
- No vendor lock‑in; everything must work as static files (`dist/`).

---

## 1) Astro core config you must set
Create `astro.config.mjs` in **blog** with:
```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',  // set via env at build time
  base: '/blog',                                        // ensures assets/links work under /blog
  trailingSlash: 'always',                              // pick: 'always' | 'never' | 'ignore'
  integrations: [mdx(), sitemap()],
});
```
**Notes**
- `site` is required for canonical URLs and sitemap generation. Make it configurable via env (`SITE_URL`).
- `base: '/blog'` guarantees correct asset paths when mounted under `/blog`.
- `trailingSlash` should match your canonical URL policy. Use `'always'` to avoid mixed URL variants.

Env usage:
```bash
# staging
SITE_URL=https://staging.example.com npm run build
# prod
SITE_URL=https://automationarchitech.com npm run build
```

---

## 2) Content Collections (typed Markdown/MDX)
Create `src/content/config.ts` with a stable schema:
```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    hero: z.string().url().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
  }),
});

export const collections = { posts };
```
Place posts in `src/content/posts/*.mdx` (or `.md`).

Querying in pages/components:
```ts
import { getCollection } from 'astro:content';
const allPosts = await getCollection('posts', ({ data }) => !data.draft);
const sorted = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
```

---

## 3) Routes: index & dynamic post page
- **List page**: `src/pages/blog/index.astro`
```astro
---
import { getCollection } from 'astro:content';
const posts = (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a,b)=> b.data.date.getTime()-a.data.date.getTime());
---
<html lang="en">
  <head>
    <title>Blog</title>
  </head>
  <body>
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map(p => (
          <li>
            <a href={`/blog/${p.slug}/`}>{p.data.title}</a>
            <time datetime={p.data.date.toISOString()}>{p.data.date.toDateString()}</time>
          </li>
        ))}
      </ul>
    </main>
  </body>
</html>
```

- **Detail page**: `src/pages/blog/[slug].astro`
```astro
---
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

const { post } = Astro.props as { post: CollectionEntry<'posts'> };
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<html lang="en">
  <head>
    <title>{post.data.title}</title>
    <link rel="canonical" href={canonicalURL.href} />
    <meta name="description" content={post.data.excerpt} />
    <!-- OG/Twitter basic set -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.data.title} />
    <meta property="og:description" content={post.data.excerpt} />
    {post.data.hero && <meta property="og:image" content={post.data.hero} />}
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.data.title, datePublished: post.data.date,
      image: post.data.hero || undefined, mainEntityOfPage: canonicalURL.href,
    })}</script>
  </head>
  <body>
    <article>
      <h1>{post.data.title}</h1>
      <time datetime={post.data.date.toISOString()}>{post.data.date.toDateString()}</time>
      <post.Content />
    </article>
  </body>
</html>
```

---

## 4) MDX usage
- Enable with `@astrojs/mdx` (already integrated in `astro.config.mjs`).
- Author posts as `.mdx` with frontmatter matching the schema. Example:
```mdx
---
 title: "Hello World"
 date: 2025-11-05
 tags: [intro]
 excerpt: "First post"
 hero: "https://example.com/hero.jpg"
 draft: false
---

Welcome to **MDX**.
```

---

## 5) Theme integration (astro‑yi)
**Dependency strategy** (recommended):
- In blog `package.json`, depend on the theme by **git tag** for CI stability:
```json
{
  "dependencies": {
    "@aa/astro-yi": "git+https://github.com/<your-user>/astro-yi_theme.git#v1.0.0"
  }
}
```
- For fast local iteration, override with `npm link`:
```bash
# in theme repo
npm link
# in blog repo
npm link @aa/astro-yi
```

**Using the theme**
- Import theme layouts/components and wrap pages (example):
```astro
---
import BlogLayout from '@aa/astro-yi/layouts/BlogLayout.astro';
---
<BlogLayout>
  <!-- page content here -->
</BlogLayout>
```
- If the theme expects different frontmatter keys, add a tiny adapter utility when mapping data to components.

---

## 6) SEO, sitemap, robots
- Canonicals: `new URL(Astro.url.pathname, Astro.site)`
- Sitemap: use `@astrojs/sitemap` integration (auto‑generates at build using `site`).
- Robots: create `/public/robots.txt` manually (keep it simple):
```
User-agent: *
Allow: /
Sitemap: https://YOURDOMAIN/sitemap-index.xml
```

---

## 7) Images & performance
- Prefer plain `<img loading="lazy" decoding="async" alt="...">` to avoid extra deps.
- Store images under `public/images/` and refer to absolute `/blog/images/...` or canonical URLs.
- Keep images compressed; avoid layout shift by setting `width`/`height` when possible.

---

## 8) Build scripts
`package.json` (blog):
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "echo 'add your linter here'"
  }
}
```
Output: `dist/` (fully static). You can upload to any host or serve behind a reverse proxy at `/blog`.

---

## 9) GitHub Actions (separate blog deploy)
`.github/workflows/deploy.yml` in **blog**:
```yaml
name: Deploy Blog
on:
  push:
    branches: [ main ]
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: SITE_URL=${{ vars.SITE_URL }} npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
**Note**: Set `Repository → Settings → Variables → SITE_URL` to your canonical domain.

---

## 10) Single‑artifact deploy (optional)
If the site must publish the blog under `/blog` in one artifact:
- Add the blog as a submodule `vendor/blog` in the site repo.
- Site CI builds blog first, then `cp -r vendor/blog/dist/* site/dist/blog/` before publishing.
- The blog repo remains independent; this is a build‑time coupling only.

---

## 11) Authoring & drafts (ops expectations)
- Authors add `.mdx` files in `src/content/posts/` on `main` (or via PRs).
- Drafts: set `draft: true`; filtered out in production build.
- Images: commit to `public/images/` or reference external CDN URLs.
- On push to `main`, CI builds and deploys automatically.

---

## 12) Quality bars (always)
- **Perf**: static first, lazy images, avoid heavy JS.
- **A11y**: semantic headings, focus states, alt text, color contrast.
- **SEO**: canonical, OG/Twitter, JSON‑LD; valid sitemap; robots present.
- **Reproducibility**: lockfile committed; Node 20; no global installs.

---

## 13) Minimal file tree (blog)
```
astro-blog-app/
├─ astro.config.mjs
├─ package.json
├─ public/
│  └─ robots.txt
├─ src/
│  ├─ content/
│  │  ├─ config.ts
│  │  └─ posts/
│  │     └─ hello-world.mdx
│  ├─ pages/
│  │  └─ blog/
│  │     ├─ index.astro
│  │     └─ [slug].astro
│  └─ styles/
│     └─ tokens.css (optional for theme variables)
└─ .github/workflows/deploy.yml (if deploying blog separately)
```

---

## 14) Cut‑over plan (subdomain → path)
1) Go live at `blog.domain` (independent hosting/CI).
2) When the main host is ready, add a reverse proxy so `/blog` maps to the blog origin.
3) Flip `SITE_URL` to the apex domain and redeploy; add 301 redirects from subdomain to `/blog`.

---

## 15) Optional extras
- RSS feed via `@astrojs/rss` (generate from `getCollection('posts')`).
- Breadcrumb list JSON‑LD on post pages.
- Comments: `utterances` (GH Issues‑backed) — script tag on post pages.
- Analytics: Plausible/Umami; respect Do‑Not‑Track and only load in production.

---

### Ready‑to‑ask checklist for the user (LLM should prompt once)
- Domain(s) and canonical policy (www vs non‑www; trailing slash always/never).
- Deploy model now (subdomain) vs later (path), and final goal.
- Theme repo URL & tag (e.g., `v1.0.0`).
- Comments/analytics choices.
- Image/CDN policy (local vs CDN).
- Any nav/footer integration rules in the site repo.

---

**Outcome:** Following this reference, the LLM can scaffold, theme, SEO‑harden, and deploy a portable, static Astro blog at `/blog`, with CI, content collections, and minimal host assumptions.

