# Ventic HVAC Website Handoff

## Production

- Repository: `https://github.com/rawdre/mass-hvac-landing.git`
- Production site: `https://ventichvac.com/`
- Production branch: `main`
- Hosting: GitHub Pages, deploying from the repository root on `main`
- Current release: `v1.2.0`

## Important Files

| Purpose | File |
| --- | --- |
| Article library and SEO metadata | `articles-data.js` |
| Shared article rendering | `article.js` and `article.html` |
| Clean article route templates | `blog/<slug>/index.html` |
| Blog index | `blog.html` and `blog.js` |
| Public URLs for search engines | `sitemap.xml` |
| English, Spanish, and Portuguese UI strings | `site-ui.js` |
| Release history and rollback tags | `RELEASES.md` |
| Article-content validation | `tests/article-library.test.js` |

## Local Preview

From the repository root, run:

```powershell
python -m http.server 8788
```

Then open `http://localhost:8788/blog.html`.

## Adding an Article

1. Add one complete object to `window.HVAC_ARTICLES` in `articles-data.js`.
2. Include a title, slug, title tag, meta description, category, excerpt, clean `path`, CTA text, CTA link, and structured HTML content.
3. Copy an existing clean route file into `blog/<slug>/index.html`.
4. Update that route file&apos;s canonical URL, Open Graph URL, `data-article-slug`, and `data-article-url`.
5. Add the clean public URL to `sitemap.xml` using the actual publish date.
6. Extend `tests/article-library.test.js` for the article before treating it as ready.
7. Run the checks below and review the local route on desktop and mobile.

## Required Checks Before a Release

```powershell
node tests/article-library.test.js
node --check articles-data.js
node --check site-ui.js
```

Also validate `sitemap.xml`, run `git diff --check`, and inspect every new article route in a browser. Do not publish content containing internal notes, unsupported pricing claims, or unverified rebate promises.

## Versioning and Release

Use semantic versions:

- `v1.x.0` for an approved content or feature batch.
- `v1.2.x` for a small backwards-compatible correction.
- `v2.0.0` only for a breaking redesign or material architecture change.

For every release:

1. Update `RELEASES.md` with date and scope.
2. Review the full diff and run the required checks.
3. Commit with a specific message.
4. Create an annotated matching Git tag, for example `v1.3.0`.
5. Push `main` and the tag together.
6. Verify the live URLs return `200 OK` after GitHub Pages deploys.

Never force-push `main` or use `git reset --hard` to roll back production. If a release must be reversed, use the prior tag as the known-good reference and create a new revert release.

## Content and SEO Rules

- Write for a real homeowner with an active question, not a keyword list.
- One article should own one main search intent and link naturally to related service and article pages.
- Use only accurate service-area references. Confirm whether the legacy Fitchburg article matches Ventic&apos;s active service area before expanding location content.
- Treat Mass Save details as time-sensitive. Link to Mass Save&apos;s official current program page and review that article at least yearly.
- Keep safety guidance conservative: when gas, carbon monoxide, fire, smoke, or sparking is suspected, direct the homeowner to leave and call 911 or the utility emergency line first.
