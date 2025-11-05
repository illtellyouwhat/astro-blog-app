# OPERATIONS

## Deployment Model
- Target: GitHub Pages workflow for `illitelyouwhat/astro-blog-app` with artifact upload + deploy.
- Custom domain: `blog.automationarchitech.com` with canonical host `https://automationarchitech.com`.

## CI Variables
- `SITE_URL` (Repository Variable): canonical host used in builds and sitemap.
- `PUBLIC_ENABLE_COMMENTS`: defaults to `true`; set to `false` to disable Utterances globally.
- `PUBLIC_UTTERANCES_REPO`: (required when comments enabled) e.g., `illtellyouwhat/astro-blog-app`.
- `PUBLIC_UTTERANCES_LABEL`: optional GitHub issue label for new threads.
- `PUBLIC_UTTERANCES_THEME`: customise Utterances appearance.
- `BASE_PATH`: defaults to `/blog`. Set to `/astro-blog-app/blog` when testing on GitHub Pages, or `/blog` for production domains.
- `PUBLIC_PLAUSIBLE_DOMAIN`: required to enable Plausible analytics (e.g., `automationarchitech.com`).
- `PUBLIC_PLAUSIBLE_API`: optional custom API endpoint for self-hosted Plausible.
- `PUBLIC_PLAUSIBLE_SCRIPT`: optional custom script URL.
- `PUBLIC_PLAUSIBLE_DNT`: defaults to `true`; set `false` to ignore browser Do Not Track.

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

Per-post override: set `comments: false` in front matter to hide Utterances for individual articles.

## Rollback & Cache
- **Rollback:** revert or cherry-pick fixes on `main`; Pages workflow redeploys automatically.
- **Emergency fixes:** push a hotfix branch or use `git revert` to roll back.
- **Cache:** GitHub Pages handles cache headers; asset filenames are hashed so redeploying updates references automatically. For manual busting, append query strings or rename assets.
