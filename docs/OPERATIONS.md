# OPERATIONS

## Deployment Model
- Target: GitHub Pages workflow for `illitelyouwhat/astro-blog-app` with artifact upload + deploy.
- Custom domain: `blog.automationarchitech.com` with canonical host `https://automationarchitech.com`.

## TODO
- [ ] Add runbook for CI variables (`SITE_URL`, Plausible, Utterances).
- [ ] Capture rollback and cache-invalidation procedures.

## Local Theme Overrides
- Keep the git-tagged dependency `@aa/astro-yi@git+https://github.com/illtellyouwhat/astro-yi_theme.git#v1.0.0` committed to `package.json`.
- To test local theme changes without altering CI:
  1. `cd ../astro-yi-theme`
  2. `npm link`
  3. `cd ../astro-blog-app`
  4. `npm link @aa/astro-yi`
  5. Restart the dev server (`npm run dev`) to pick up the linked package.
- Before pushing, undo the link to restore the tagged dependency:
  1. `npm unlink @aa/astro-yi`
  2. `npm install`

## Dependency Notes
- `@aa/astro-yi` currently pulls in `astro-expressive-code@0.33.5`, which lists a peer dependency on Astro `^4.x`. Our project runs Astro 5.x without runtime issues, but npm will warn about the version mismatch during install. Until the theme updates, treat this as cosmetic.
- If a future Astro upgrade breaks the theme, either pin Astro to a known-good version or fork `@aa/astro-yi`/`astro-expressive-code` and adjust the peer dependency.

## Feature Toggles (Env Vars)
- `PUBLIC_ENABLE_COMMENTS` (`"true"` default) — set to `"false"` to remove Utterances globally.
- `PUBLIC_UTTERANCES_REPO` (`required`) — GitHub repo used for Utterances, e.g. `illtellyouwhat/astro-blog-app`.
- `PUBLIC_UTTERANCES_LABEL` (optional) — custom label applied to created issues.
- `PUBLIC_UTTERANCES_THEME` (optional) — Utterances theme (`github-light`, `github-dark`, etc.).
- `PUBLIC_PLAUSIBLE_DOMAIN` (`required` to enable analytics) — domain name registered with Plausible.
- `PUBLIC_PLAUSIBLE_API` (optional) — Plausible API endpoint (defaults to `https://plausible.io/api/event`).
- `PUBLIC_PLAUSIBLE_SCRIPT` (optional) — Plausible script URL (defaults to `https://plausible.io/js/script.js`).
- `PUBLIC_PLAUSIBLE_DNT` (optional) — set to `"true"` to respect Do Not Track (default), `"false"` to disable.

Per-post override: set `comments: false` in front matter to hide Utterances for individual articles.
