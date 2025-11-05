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
