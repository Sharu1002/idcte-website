# Editing the site content after deployment

This site is wired for [Decap CMS](https://decapcms.org) — a free visual editor that lets
you edit text and photos at `yourdomain.com/admin` without touching code. Every edit is
saved as a commit to the GitHub repo, and Vercel redeploys automatically.

## One-time setup (5–10 minutes)

1. **Push this project to GitHub** (if you haven't already).

2. **Deploy it to Vercel**, pointing at the `idcte-site` folder as the project root.

3. **Create a GitHub OAuth App** (this lets the CMS log in as you):
   - Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   - **Homepage URL**: your live site URL (e.g. `https://idcte.org`)
   - **Authorization callback URL**: `https://idcte.org/api/callback`
   - Save it, then generate a **Client Secret**.

4. **Add environment variables in Vercel** (Project Settings → Environment Variables):
   - `OAUTH_CLIENT_ID` — the Client ID from the GitHub OAuth App
   - `OAUTH_CLIENT_SECRET` — the Client Secret from the GitHub OAuth App

5. **Edit `public/admin/config.yml`** and replace the two placeholders at the top:
   ```yaml
   backend:
     repo: your-github-username/your-repo-name
     base_url: https://idcte.org   # your real deployed URL
   ```
   Commit and push — Vercel will redeploy.

6. Visit `https://idcte.org/admin`, click "Login with GitHub", and you'll see a visual
   editor for every page, news post, Learn More topic, and the "3 Pillars" / "Ways to
   Help" / "Milestones" lists — no code required.

## What's editable from the CMS

- **Pages** — Home, About, Our Work, Get Involved, Contact (hero text, photos, body copy)
- **News & Press** — add/edit/delete statements, with an optional PDF attachment
- **Learn More** — add/edit/delete background topics, reorder them
- **Site Settings** — org info, email, address, social links, nav, the 3 pillars,
  the impact/achievements list, the "ways to help" list, and the history timeline

## Notes

- Only people you invite as collaborators on the GitHub repo can log in and edit.
- Uploaded images go to `public/images/uploads/`.
- If you'd rather use WordPress instead of this Next.js + Vercel setup, this CMS layer
  doesn't apply — WordPress has its own built-in editor instead.
