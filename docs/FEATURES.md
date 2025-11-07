# FEATURES

## Platform Overview
We built `astro-blog-app` as a production-grade Astro project that separates content, presentation, and deployment:
- **Content Collections** enforce typed front matter (`title`, `date`, `tags`, `excerpt`, `hero`, `draft`, `comments`, `canonical`). That keeps the blog theme-agnostic—you can swap themes without rewriting data.
- **Theme Overrides** wrap the open-source `@aa/astro-yi` theme. We override its config in `src/theme/consts.ts` so branding, navigation, and feature toggles live in one place instead of being hard-coded. Drop in a different theme later by changing the dependency and const overrides.
- **Deployability**: GitHub Pages workflow (`.github/workflows/deploy.yml`) outputs a static build under `/blog`, `/astro-blog-app`, or any future base path. `docs/LOGIC.md` explains the boot flow for new maintainers.

> Why not use a “drop-in” Astro starter? Simple starters hard-wire metadata, ignore base paths, and mix content with theme markup. Our structure adds a reusable content schema, environment-aware metadata, feature toggles, and documentation so the blog survives theme swaps and hosting migrations.

## SEO Head & Metadata
`src/components/SeoHead.astro` centralizes everything in `<head>`:
- Computes canonical URLs, OG/Twitter tags, JSON-LD, and sitemap references.
- Derives the correct base path (`/blog`, `/astro-blog-app`, apex) so assets and scripts always load—even on GitHub Pages.
- Injects analytics scripts (see below) only when env variables are set.

This keeps search engines and social previews consistent, avoids duplicate URL issues, and removes the need to hand-edit `<head>` tags across multiple pages.

## Feature Toggles

### Comments (Utterances)
Library: [utteranc.es](https://utteranc.es/) – GitHub Issues–backed comments.

Enable/disable globally via env vars:
```
PUBLIC_ENABLE_COMMENTS=true
PUBLIC_UTTERANCES_REPO=illtellyouwhat/astro-blog-app        # required when true
PUBLIC_UTTERANCES_LABEL=blog-comment                        # optional
PUBLIC_UTTERANCES_THEME=github-light                        # optional
```
Per-post override in front matter:
```yaml
comments: false   # hides Utterances even if global toggle is on
```
Toggling only requires updating variables (or front matter); rerun the deploy workflow afterwards.

### Analytics (Plausible)
Library: [plausible.io](https://plausible.io/) (hosted or self-hosted).

Env-driven setup:
```
PUBLIC_PLAUSIBLE_DOMAIN=automationarchitech.com
PUBLIC_PLAUSIBLE_SCRIPT=https://plausible.io/js/script.js    # optional override
PUBLIC_PLAUSIBLE_API=https://plausible.io/api/event          # optional override
PUBLIC_PLAUSIBLE_DNT=true                                    # respect Do Not Track
```
If `PUBLIC_PLAUSIBLE_DOMAIN` is unset, the script never loads. All analytics reporting stays in the Plausible dashboard—no visible widget on the site.

### Marketing Site Integration
- `architech-web-forge` reads `VITE_BLOG_URL` so the **Blog** button can point to the live blog (GitHub Pages today, Hostinger tomorrow). Example dev value: `http://localhost:4321/blog/`.
- `astro-blog-app` reads `PUBLIC_MARKETING_URL` for the **Home** link (defaults to `/`). For local integration set `PUBLIC_MARKETING_URL=http://localhost:8080/`.

## Key Doc References
- `docs/LOGIC.md` – bootstrapping flow, env handling, path resolution.
- `docs/OPERATIONS.md` – deploy guide, env variable descriptions, comments/analytics toggles.
- `docs/AUTHORING.md` – content locations, front matter contract, author workflow.

Together these pieces give the client a modular, host-agnostic blog pipeline that plugs into their existing site and can grow without rewriting theme-specific glue.
