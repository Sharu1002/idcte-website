# Restricting the site to colleagues only

The site is gated behind a single shared password. Anyone without it is
redirected to a login screen — nothing is publicly reachable, and search
engines won't index it either as long as it's not deployed to your real
public domain yet.

## How it works

- `src/proxy.ts` checks every request for a cookie proving the visitor
  entered the right password. If missing, they're sent to `/preview-login`.
- The password is read from the `PREVIEW_PASSWORD` environment variable —
  it is never hardcoded in the code.
- If `PREVIEW_PASSWORD` is not set at all, the gate is automatically off
  (so local development with `npm run dev` is unaffected).

## Setting it up

1. **Locally** (optional, only if you want to test the gate): add to
   `idcte-site/.env.local`:
   ```
   PREVIEW_PASSWORD=whatever-you-want
   ```

2. **On Vercel** (or wherever you deploy): Project Settings → Environment
   Variables → add `PREVIEW_PASSWORD` with the password you'll share with
   colleagues. Redeploy for it to take effect.

3. Share the deployed URL and the password with your colleagues directly
   (email, Slack, etc.) — not anywhere public.

## Removing the gate later

When you're ready to make the site public, just delete the
`PREVIEW_PASSWORD` environment variable in your hosting provider's settings
(no code change needed) and redeploy.

## Deploying so there's a URL to share

This project has no hosting connected yet. The fastest option:

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com), sign in, and "Import" the repo —
   Vercel auto-detects Next.js, no config needed. Set the `PREVIEW_PASSWORD`
   env var during import (or after, then redeploy).
3. Vercel gives you a URL like `idcte-site.vercel.app` — share that plus the
   password with your colleagues.

Alternatively, if you'd rather not push to GitHub yet, the
[Vercel CLI](https://vercel.com/docs/cli) (`npx vercel`) can deploy directly
from your machine — it'll prompt you to log in (or create a free account)
the first time.
