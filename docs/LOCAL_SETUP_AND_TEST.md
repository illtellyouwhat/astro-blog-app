# LOCAL_SETUP_AND_TEST

## Prerequisites
- Node.js 20.x (use `.nvmrc` or `nvm install 20 && nvm use`)
- npm 10+
- Git CLI
- Repositories cloned under `~/github/doug-web/`:
  - `architech-web-forge`
  - `astro-blog-app`
  - `astro-yi-theme`

## Initial Setup
1. Confirm the directory layout:
   ```bash
   tree -L 1 ~/github/doug-web/
   ```
2. Install blog dependencies:
   ```bash
   cd ~/github/doug-web/astro-blog-app
   npm ci
   ```
3. (Optional) Link local theme for rapid iteration:
   ```bash
   cd ~/github/doug-web/astro-yi-theme
   npm install
   npm link
   cd ~/github/doug-web/astro-blog-app
   npm link @aa/astro-yi
   ```
   Exit the link before committing:
   ```bash
   npm unlink @aa/astro-yi
   npm install
   ```

## Running the Blog Locally
1. Start dev server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:4321/blog/` and verify:
   - Blog index renders with Automation Architech copy.
   - `/blog/hello-world/` loads with themed layout.
3. Stop dev server when finished (`Ctrl+C`).

## Adding Sample Content for QA
1. Create a Markdown post:
   ```bash
   cat <<'POST' > src/content/posts/sample-checklist.md
   ---
   title: "QA Checklist"
   date: 2025-11-05
   tags:
     - qa
     - automation
   excerpt: "What we verify before shipping new blog features."
   draft: false
   ---
   
   ## Steps
   
   - Run end-to-end smoke tests.
   - Confirm sitemap updates.
   - Validate canonical URLs.
   
   ```
   POST
   ```
2. Create an MDX post with embeds:
   ```bash
   cat <<'POST' > src/content/posts/embedded-demo.mdx
   ---
   title: "Embed Demo"
   date: 2025-11-05
   tags:
     - mdx
     - demo
   excerpt: "Demonstrating images and YouTube embeds in MDX."
   hero: "/blog/images/demo-hero.png"
   draft: false
   ---
   
   <figure>
     <img src="/blog/images/demo-hero.png" alt="Automation pipeline" loading="lazy" decoding="async" />
     <figcaption>Automation Architech pipeline snapshot.</figcaption>
   </figure>
   
   <iframe
     title="Automation Walkthrough"
     src="https://www.youtube.com/embed/dQw4w9WgXcQ"
     loading="lazy"
     allowfullscreen
   />
   ```
3. Add a placeholder image to avoid broken references:
   ```bash
   cp public/images/blog-avatar.svg public/images/demo-hero.png
   ```
4. Restart dev server and confirm both posts render in the list and detail pages.

## Local Production Preview
1. Build with canonical URLs:
   ```bash
   SITE_URL=http://localhost:4321 npm run build
   ```
2. Preview the static output:
   ```bash
   npm run preview
   ```
3. Browse to `http://localhost:4173/blog/` and verify:
   - Canonical link tags display `http://localhost:4321/...`.
   - Sitemap lives at `/blog/sitemap-index.xml`.
   - JSON-LD script appears on post pages.
4. Stop preview (`Ctrl+C`).

## Validation Checks
- Lint (schema/type checks):
  ```bash
  npm run lint
  ```
  > First run prompts for `@astrojs/check` + `typescript`. Install once via `npm i -D @astrojs/check typescript` or supply `-- --skip-install`.
- Build (ensures content collection integrity):
  ```bash
  npm run build
  ```
- Manual link spot-check:
  - Confirm `/blog/` link exists in `architech-web-forge` header.
  - Visit `/blog/hello-world/` and `/blog/sample-checklist/`.

## Cleanup
- Remove QA sample posts if they should not ship:
  ```bash
  rm src/content/posts/sample-checklist.md src/content/posts/embedded-demo.mdx public/images/demo-hero.png
  ```
- Re-run `npm run build` to confirm clean state.
