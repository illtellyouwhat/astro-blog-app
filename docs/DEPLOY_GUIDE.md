# DEPLOY_GUIDE

## Deployment Targets
- Primary: GitHub Pages for `illitelyouwhat/astro-blog-app`.
- DNS: `blog.automationarchitech.com` CNAME to GitHub Pages host, HTTPS enforced.

## First Deploy Checklist
1. Configure repository → Settings → Pages:
   - Source: GitHub Actions.
   - Custom domain: `blog.automationarchitech.com` (after DNS change below).
2. Add repository variable `SITE_URL=https://automationarchitech.com` for canonical URLs & sitemap.
3. Ensure GitHub Pages is enabled for the repo.
4. Push to `main` or manually trigger “Deploy Blog” workflow.
5. Monitor workflow until `deploy` job reports success.
6. Visit the temporary Pages URL (e.g., `https://<org>.github.io/astro-blog-app/`) to confirm rendering under `/blog/`.

## DNS Cutover
1. In DNS provider, create CNAME `blog.automationarchitech.com` → `<username>.github.io`.
2. Wait for propagation (TTL dependent; typically < 1 hour).
3. In GitHub Pages settings, enable “Enforce HTTPS” once certificate is issued.
4. Re-run the workflow or wait for the next deploy to ensure canonical URLs resolve to the apex.

## Operational Notes
- `SITE_URL` controls canonical URLs and sitemap entries. Update it when switching from subdomain to apex routing.
- Keep `dist/` static; GitHub Pages serves from uploaded artifact.
- Rollback: revert the offending commit on `main`; CI will rebuild and redeploy the previous version.
- Cache headers: GitHub Pages manages caching; for critical fixes, push a change to bust cached assets or rename hashed assets as needed.

