# Ventic HVAC Release History

This file records production releases for the public Ventic HVAC website. Every release is also marked with a matching Git tag, allowing a safe rollback to a known version.

## v2.0.0 - 2026-11-03

- Redesigned the homepage ("New England editorial" direction): full-bleed hero with a Higgsfield Seedance 2.5 video loop and a blue-hour Ventic van photo fallback, serif display typography (self-hosted Fraunces + Inter), and the van livery's blue and orange as brand accents.
- Added ten Higgsfield-generated (GPT Image 2.5) photos across services, heat pumps, fleet, and ComfortFit sections; services are now a photo bento grid.
- New layer files: `styles-v2.css` and `v2.js` (hero video, sticky-header state, scroll reveal), scoped to the homepage via `body.v2`. Original `styles.css` is unchanged, so blog and article pages keep their current look.
- Mobile: one-line urgency bar, solid branded hamburger menu, compact pricing popup, header no longer clips the brand.
- Hero video respects reduced-motion and data-saver settings; images ship as optimized WebP (hero also has a JPG fallback). Added a visible site version in the footer.
- All copy, EN/ES/PT translations, forms, request links, ComfortFit advisor, and phone numbers are unchanged.

## v1.2.0 - 2026-10-06

- Published ten homeowner-focused HVAC articles with clean, indexable URLs.
- Added heating repair, heat pump repair, maintenance, safety, comfort, and Mass Save 2026 content.
- Added clean route pages, canonical URLs, Open Graph URLs, sitemap entries, and booking CTAs for every new article.
- Updated the Learning Center overview to accurately describe the 31-article-and-FAQ library.

## v1.1.0 - 2026-08-21

- Added customer-facing HVAC FAQ page with mobile-friendly accordions and relevant internal links.
- Published the approved AC "running but not cooling" article at a clean URL.
- Moved the public Privacy Policy to `https://ventichvac.com/privacy/`.
- Updated site-wide Privacy Policy links to use the clean URL.
- Preserved `privacy.html` as a compatibility redirect for previously shared links.

## v1.0.0 - Baseline

- Baseline Ventic HVAC production website before tracked release versioning.
