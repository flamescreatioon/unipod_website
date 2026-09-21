# Manu-Tech UniPod website

React/Vite website with an Express API that stores enquiries in PostgreSQL.

## Run locally

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to the pooled Neon connection string and `DATABASE_URL_UNPOOLED` to the direct connection string for migrations.
3. Run `npm run db:migrate` if the contact table has not been created.
4. Run `npm run dev`.

The frontend runs on Vite's local URL. Its `/api` requests are proxied to port 8787. A frontend hosted on another origin needs `VITE_CONTACT_API_URL`; list its permitted origin in `CONTACT_APP_ORIGIN`.

## Verification

- `npm test` checks API validation, enquiry context, rate limits, readiness and errors with isolated in-memory storage. It never uses the configured database or sends email.
- `npm run build` generates the website and a separate HTML entry with search/share metadata for every public route.
- `npm run preview` previews the production frontend. The API must run separately; for a complete preview, configure the API origin before building.

## Page structure

- `src/pages/`: one component per route.
- `src/components/SiteShell.jsx`: shared accessible navigation, main landmark and footer.
- `src/components/RouteEffects.jsx`: titles, metadata, page/anchor scrolling and history scroll restoration.
- `src/data/`: programme, facility, enterprise and metadata records.
- `src/styles/`: base styles, inner pages, responsive styles and shared components.
- `shared/enquiries.js`: common enquiry categories and contextual contact links.

The former facility-tour route is a visit-planning page. Real facility photographs, programme dates/fees/eligibility and dated news/impact content remain to be supplied. No dates, fees or outcomes have been invented.

## Enquiries and follow-up

Submissions retain the selected programme/service and optional visit date/group size in the stored message. The existing database schema is unchanged. The form shows success only after storage confirms the write. It does not confirm a booking or programme place.

The API validates input, uses a honeypot and limits submissions to 10 per connection in 15 minutes. This limiter is process-local. If deploying behind a reverse proxy, configure trust only for the known proxy topology; do not blindly trust forwarded IP headers. Multiple API instances should share a rate-limit store.

`GET /api/health` checks database connectivity and returns HTTP 503 when unavailable. Pool and query timeouts bound failures.

Official email/telephone, visiting hours and staff notification recipients are intentionally unset. No email notification integration is active. An authorised staff workflow for reviewing stored enquiries still needs to be connected before depending on the form for operational follow-up.

## CMS

Sanity is the content system. `/admin` links to Studio, and public pages read published programmes, facilities, enterprise services, news, event galleries, team profiles, page copy and site settings. Follow [the setup guide](docs/SANITY.md) to connect your project, seed drafts and deploy Studio. Run `npm run studio:dev` for local editing. The old SQL CMS API is retired; its tables are preserved.

## Production metadata and hosting

Set `VITE_SITE_URL` to the actual public origin before building, such as your HTTPS website origin. Without it, the build deliberately omits canonical URLs and the sitemap. With it, the build includes canonical URLs and `sitemap.xml`.

Serve the emitted route directories at their public paths. Configure the host's fallback so unknown page URLs can reach the app's not-found screen and return HTTP 404 where supported. Keep `/api` routed to the API service. The React fallback alone cannot control a static host's HTTP status.

## Images

The original source PNGs are retained. The site uses compressed WebP hero variants (1600px desktop, 800px mobile) and a 200px Abia logo. Partner logos below the hero are lazy-loaded. Keep image descriptions and captions tied to verified content when replacing assets.
