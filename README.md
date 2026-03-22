# ShipShelter

Next.js site for premium covered boat houses. See [`.env.example`](.env.example) for environment variables.

## Deploy on Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com), choose **Add New → Project** and import the repo.
3. Vercel detects **Next.js**; keep the default **Build Command** (`npm run build`) and **Output** (handled by Next.js).
4. Under **Environment Variables**, add every variable from `.env.example` for **Production** (and **Preview** if you want the same behavior on preview URLs):
   - `NEXT_PUBLIC_SITE_URL` — set to your production URL (no trailing slash), e.g. `https://your-domain.com`. Update when you attach a custom domain.
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — if using Sanity for listings.
   - `NEXT_PUBLIC_MAPBOX_TOKEN` — for interactive maps on listing pages.
   - `RESEND_API_KEY`, `RESEND_FROM`, `INQUIRY_TO_EMAIL` — for the inquiry form (server-only keys stay without the `NEXT_PUBLIC_` prefix).
5. Deploy. Connect a **custom domain** under **Project → Settings → Domains** if needed, then set `NEXT_PUBLIC_SITE_URL` to match.

### Sanity Studio (`/studio`)

Uses the same `NEXT_PUBLIC_SANITY_*` variables. In the [Sanity project](https://sanity.io/manage), add your Vercel URL under **API → CORS origins** so the Studio and browser client can talk to the API.

### Local preview of the production build

```bash
npm install
npm run build
npm start
```
