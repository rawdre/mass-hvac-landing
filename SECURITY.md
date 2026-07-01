# Security posture — Ventic HVAC site

This is a **static website** (plain HTML/CSS/JS) served by **GitHub Pages** at
https://ventichvac.com. There is **no server, no backend, no database, no admin
panel, no login, no API, and no environment variables**. Understanding that is
the whole security model: GitHub Pages only serves files read-only, and visitors
cannot write to anything.

## Rules — do NOT break these (for any developer or AI tool)

1. **Never put secrets in this repo or in frontend code.** No API keys, tokens,
   passwords, Supabase service-role keys, or private URLs. Everything here ships
   to the browser. If you need a secret, you need a backend (see below) and the
   secret lives there, server-side only.
2. **If you add a backend later** (Vercel function, Cloudflare Worker, Supabase):
   - Put it behind authentication and server-side validation.
   - Keep the service-role key server-side only; the browser may only use the
     public anon key, and only with Row Level Security enabled.
   - Move secrets into the host's encrypted env vars, never into committed files.
3. **Keep the Content-Security-Policy meta tag** in `index.html`, `blog.html`,
   and `article.html`. It restricts scripts to first-party files. If you add a
   third-party script, add its origin explicitly — do **not** add `'unsafe-inline'`
   or `'unsafe-eval'` to `script-src`.
4. **No inline event handlers** (`onclick=`, etc.) and **no `eval`/`new Function`**.
   They are blocked by CSP and will silently break. Put behavior in `.js` files.
5. **Forms collect nothing server-side today.** The booking form and ComfortFit
   advisor run entirely in the browser; the file input is only counted, never
   uploaded. If you wire a real submission, add server-side validation, rate
   limiting, spam protection (honeypot/CAPTCHA), and never trust client input.
6. **Treat all article content as trusted authored content.** `article.js` /
   `blog.js` render `articles-data.js` via `innerHTML`. Do not feed user input
   into those `innerHTML` sinks — render untrusted text with `textContent`.

## What protects this site

- Read-only static hosting (no write path for visitors).
- HTTPS enforced; `http://` and `www` redirect to `https://ventichvac.com`.
- CSP + `referrer` meta tags (the only header-level controls GitHub Pages allows).
- No secrets, no external scripts, no user-generated content rendered as HTML.

## Known limitation on GitHub Pages

GitHub Pages cannot set custom HTTP response headers, so these cannot be applied
here and require a proxy (Cloudflare, free) or a move to Vercel/Netlify:
`X-Frame-Options` / CSP `frame-ancestors` (clickjacking), `X-Content-Type-Options`,
`Permissions-Policy`, and `Strict-Transport-Security` (HSTS). See the launch
checklist in the security report if you want full headers.

## Reporting

Security questions: info@ventichvac.com
