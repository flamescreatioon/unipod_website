# Sanity CMS

The website reads published content from Sanity. Studio manages programmes, facilities, enterprise services, news, gallery images, team profiles, page introductions, SEO descriptions and site contact details. Enquiries remain in the existing private PostgreSQL service; they must not be placed in the public CMS dataset.

## Connect an account

1. Create or select a project at https://www.sanity.io/manage and create a **public** dataset named production (or use your existing public dataset). Public datasets must contain only website content.
2. Add the public identifiers to root .env.local:

   VITE_SANITY_PROJECT_ID=your_actual_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_STUDIO_URL=http://localhost:3333

3. Add matching identifiers to studio/.env:

   SANITY_STUDIO_PROJECT_ID=your_actual_project_id
   SANITY_STUDIO_DATASET=production

4. In the project's API settings add http://localhost:5173 and your deployed website origin as CORS origins without credentials. Add http://localhost:3333 and your deployed Studio origin with credentials enabled for authenticated editing.
5. Install dependencies with npm install and npm install --prefix studio. Use Node 24 LTS.
6. Run npm run studio:dev and sign in with an account that has editor access to this project. Restart npm run dev after changing environment variables.
7. Run npm run cms:seed after authenticating the CLI (from studio, run npx sanity login if needed). This imports starter content as drafts using stable IDs, skipping existing published or draft documents. It does not import or overwrite the retired SQL CMS.
8. Review each draft in Studio and publish. Once configured, an empty collection stays empty on the website; deleted or unpublished content is not replaced with starter records.

Never put a Sanity token in VITE_ or SANITY_STUDIO_ variables. Public website reads require no token. Studio uses Sanity authentication and project roles.

## Publishing and deployment

Run npm run studio:build to validate Studio, then npm --prefix studio run deploy to deploy it after selecting a Studio hostname. Set VITE_SANITY_STUDIO_URL to that HTTPS address on the frontend host and rebuild. Deploy the frontend using npm run build and serve dist with SPA fallback for article routes.

Published content refreshes on page load, window focus and every 60 seconds while visible, subject to Sanity CDN propagation. Drafts are excluded. Network failures show a retry message on content listings and retain the last successfully loaded content.

Website builds also fetch published page SEO fields and news paths for route HTML and sitemap generation. If Sanity is temporarily unreachable, the build continues with local page metadata; retry the build after service is restored so new article routes and CMS SEO changes are included. Set VITE_SITE_URL to the public website origin to generate the sitemap. Trigger a new website build after publishing news or changing SEO fields so link previews and the sitemap update; on-page content updates without a build.

## Editorial workflow

- Site settings: homepage hero, opportunity message, facility slideshow images and rotation interval (3–120 seconds), official email, phone, visiting hours and address. Contact fields start blank.
- Page introductions: page heading, emphasis, lead and supporting rich text; SEO title and description. Programme notices are editable here.
- Programmes: title, summary, category, topics, images, rich text, dates, duration, eligibility and fees. Titles populate enquiry choices.
- Facilities and enterprise: descriptions, rich text and images; facilities also have access details.
- News: title, unique slug, summary, image, publication date and article body. Publish to expose the listing and article URL.
- Gallery events: create one event for each occasion, add its name, date and description, then upload every event photograph into its Event photographs field. Publish the event to show the complete image collection on the gallery page.
- Team: team member name, required role/title, biography and photograph. Publish to show the profile on the team page.
- Use order to arrange programme, facility, enterprise, gallery-event and team entries.

The old /api/cms endpoints now return 410. Existing SQL tables and migration history are retained for a separate reviewed migration if they contain real content. The contact API and database configuration are still required for enquiry submission.
