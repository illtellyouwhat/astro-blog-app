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
