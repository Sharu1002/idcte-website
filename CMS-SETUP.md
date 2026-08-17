# Editing the site content after deployment

This site is wired for [Decap CMS](https://decapcms.org) — a free visual editor that lets
you edit text and photos at `yourdomain.com/admin` without touching code. Every edit is
saved as a commit to the GitHub repo, and Vercel redeploys automatically.

## One-time setup (5–10 minutes)

The config already points at the `Sharu1002/idcte-website` repo, and the admin page works
out any URL it's served from on its own — so there is nothing left to edit in
`config.yml`. Only the GitHub login needs connecting, and that has to be done from your
own GitHub account:

1. **Create a GitHub OAuth App** (this lets the CMS log in as you):
   - Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
   - **Homepage URL**: your live site URL (e.g. `https://idcte.org`)
   - **Authorization callback URL**: your live site URL + `/api/callback`
     (e.g. `https://idcte.org/api/callback`)
   - Save it, then generate a **Client Secret**.

2. **Add environment variables in Vercel** (Project Settings → Environment Variables):
   - `OAUTH_CLIENT_ID` — the Client ID from the GitHub OAuth App
   - `OAUTH_CLIENT_SECRET` — the Client Secret from the GitHub OAuth App

   Redeploy after adding them so they take effect.

3. Visit `yourdomain.com/admin` and click "Login with GitHub".

If you later move to a custom domain, update the two URLs in the GitHub OAuth App to
match. Nothing in this repo needs changing.

## What's editable from the CMS

Everything is split into English and Tamil sections, since the site keeps a separate file
per language.

| Section | Covers |
| --- | --- |
| **Pages (English)** | Home, About, Our Work, Get Involved, Contact, Donate |
| **Blog (English)** | Add / edit / delete posts, with tags, author, image |
| **News & Press (English)** | Statements, with an optional PDF attachment |
| **Learn More (English)** | Background topics, reorderable via the Order field |
| **பக்கங்கள் / வலைப்பதிவு / செய்தி / மேலும் அறிய** | The Tamil counterpart of each of the above |
| **Site Settings** | Org info, email, address, socials, nav, the two pillars, achievements, ways to help, "Where We've Engaged", gallery captions, and Thuyilum Illam sites — each in both languages |

## How the two languages fit together

- Every piece of content exists twice: `about.md` (English) and `about.ta.md` (Tamil).
- The CMS shows these as two separate entries. **Editing the English one does not change
  the Tamil one** — you have to edit both, or the Tamil side keeps the old wording.
- If a Tamil file doesn't exist yet, the site quietly falls back to English. So a new blog
  post added in English only will still work everywhere; it just won't be translated.
- Folder collections (blog, news, learn-more) use a hidden `lang` field to tell the two
  languages apart. It's set automatically when you create an entry — leave it alone.

## Notes

- Only people you invite as collaborators on the GitHub repo can log in and edit.
- Uploaded images go to `public/images/uploads/`.
- Saving in the CMS commits straight to `main` and triggers a Vercel deploy, so changes go
  live within a minute or two. There is no draft/review step (`publish_mode: simple`).
