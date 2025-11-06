# CHANGELOG_Codex

> Record every change with timestamps, repositories, file paths, and exact line numbers.

## 2025-11-05

### 2025-11-05T14:17Z — chore: scaffold astro foundation
- `package.json:1` establish Astro project manifest, scripts, and Node 20 engine constraint.
- `package-lock.json:1` lock dependency tree for reproducible installs (npm generated).
- `astro.config.mjs:1` configure site metadata, `/blog` base path, trailing slash policy, and MDX/sitemap integrations.
- `tsconfig.json:1` extend Astro strict config with `~/*` path alias.
- `.editorconfig:1` standardize editors on UTF-8, LF, and 2-space indentation.
- `.gitignore:1` ignore Node outputs, Astro artifacts, and editor configs.
- `prettier.config.cjs:1` define formatting guardrails for the repo.
- `src/env.d.ts:1` register Astro client types for TypeScript tooling.
- `src/layouts/BaseLayout.astro:1` add foundational layout with semantic skeleton and metadata slots.
- `src/pages/blog/index.astro:1` scaffold `/blog` index with placeholder messaging.
- `src/pages/blog/[slug].astro:1` stub dynamic route with static paths placeholder ahead of content collections.
- `public/robots.txt:1` expose sitemap location and crawl policy for the blog.

### 2025-11-05T14:25Z — chore: pin node runtime
- `.nvmrc:1` document Node.js 20 baseline to avoid engine mismatch warnings locally.

### 2025-11-05T14:27Z — feat: define content collections
- `src/content/config.ts:1` declare typed content collection schema for posts.
- `src/content/posts/hello-world.mdx:1` seed initial published post with front matter contract.
- `src/pages/blog/index.astro:1` list published posts with draft filtering, sorting, and metadata.
- `src/pages/blog/[slug].astro:1` render individual posts via static paths and MDX content.
- `docs/AUTHORING.md:1` document authoring workflow, front matter requirements, and publishing steps.

### 2025-11-05T14:42Z — feat: integrate astro-yi theme styling
- `package.json:16` add astro-yi theme, tailwind integration, and align dependencies.
- `package-lock.json:1` refresh lockfile with theme + tailwind packages.
- `astro.config.mjs:1` enable tailwind plugin and alias theme modules with local overrides.
- `tsconfig.json:1` mirror alias mappings for TypeScript tooling.
- `tailwind.config.mjs:1` register theme-aware token mapping and scan dependency templates.
- `src/styles/tokens.css:1` define brand color variables consumed by the theme.
- `src/theme/consts.ts:1` override theme metadata (site, nav, analytics) while keeping defaults inert.
- `src/layouts/BaseLayout.astro:1` wrap pages with astro-yi components and themed shell.
- `src/components/ThemePostListItem.astro:1` adapt post listings through theme typography.
- `src/utils/themeAdapter.ts:1` normalize collection entries for theme-friendly consumption.
- `src/pages/blog/index.astro:1` render listings via themed layout with sidebar widgets.
- `src/pages/blog/[slug].astro:1` present article view with themed metadata panels and TOC.
- `public/toggle-theme.js:1` ship lightweight theme toggle script expected by astro-yi header.
- `public/favicon.svg:1` add Automation Architech icon aligned with new styling.
- `public/images/blog-avatar.svg:1` provide avatar asset referenced by theme profile.
- `docs/OPERATIONS.md:1` document `npm link` workflow for local theme overrides.

### 2025-11-05T14:54Z — feat: harden seo and metadata
- `docs/OPERATIONS.md:23` capture peer dependency warning for future reference.
- `src/components/SeoHead.astro:1` centralize canonical, OG/Twitter, analytics, and JSON-LD handling.
- `src/layouts/BaseLayout.astro:1` pass structured metadata to the new SEO head component.
- `src/pages/blog/index.astro:1` add blog + breadcrumb JSON-LD and themed summaries.
- `src/pages/blog/[slug].astro:1` emit article JSON-LD, canonical metadata, and enriched sidebar details.

### 2025-11-05T14:58Z — chore: add github pages workflow
- `.github/workflows/deploy.yml:1` configure CI to build with Node 20 and deploy artifacts via Pages (updated to remove unsupported `deployments` block).
- `docs/DEPLOY_GUIDE.md:1` document first deploy, DNS cutover, and rollback guidance for Pages model.

### 2025-11-05T15:02Z — chore: surface blog link in marketing nav
- `architech-web-forge/src/components/Navigation.tsx:33` add `/blog/` entry to desktop navigation.
- `architech-web-forge/src/components/Navigation.tsx:62` mirror `/blog/` link in mobile drawer menu.

### 2025-11-05T15:08Z — docs: local setup walkthrough
- `docs/LOCAL_SETUP_AND_TEST.md:1` publish step-by-step local install, QA content workflow, validation, and cleanup guidance.

### 2025-11-05T15:15Z — feat: add comments and analytics toggles
- `src/env.d.ts:1` declare public env variables for comments and Plausible.
- `src/content/config.ts:1` add `comments` boolean to post schema.
- `docs/AUTHORING.md:1` document `comments` front matter override.
- `src/components/UtterancesComments.astro:1` render Utterances with GitHub Issue labels when enabled.
- `src/pages/blog/[slug].astro:1` gate comments per post and append Utterances widget.
- `src/components/SeoHead.astro:1` load Plausible script based on env configuration.
- `docs/OPERATIONS.md:23` outline environment toggles for comments and analytics.

### 2025-11-05T15:30Z — chore: allow base path overrides
- `astro.config.mjs:1` derive deployment base from `SITE_URL` (default `/`) with optional `BASE_PATH`.
- `src/components/SeoHead.astro:1` prefix static asset URLs with the computed base path.
- `src/components/ThemePostListItem.astro:1` and `src/pages/blog/index.astro:1` generate blog links with repo base awareness.
- `src/pages/blog/[slug].astro:1` align Utterances issue terms with base-aware routes.
- `docs/LOGIC.md:1` document application entry points, environment variables, and URL resolution.
