import { createClient } from "@sanity/client";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { pageMetadata } from "./src/data/pageMetadata.js";

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  let siteOrigin = "";
  if (env.VITE_SITE_URL) {
    const url = new URL(env.VITE_SITE_URL);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      throw Error("VITE_SITE_URL must be a public HTTP(S) origin.");
    siteOrigin = url.origin;
  }
  return {
    server: { proxy: { "/api": "http://localhost:8787" } },
    plugins: [
      tailwindcss(),
      {
        name: "public-page-metadata",
        // Emit route-specific HTML so previews can read metadata without running JavaScript.
        generateBundle: {
          order: "post",
          async handler(_options, bundle) {
            const metadata = { ...pageMetadata };
            if (env.VITE_SANITY_PROJECT_ID) {
              const client = createClient({
                projectId: env.VITE_SANITY_PROJECT_ID,
                dataset: env.VITE_SANITY_DATASET || "production",
                apiVersion: "2026-09-01",
                perspective: "published",
                useCdn: false,
                timeout: 10000,
                maxRetries: 1,
              });
              try {
                const documents = await client.fetch(
                  '*[_type in ["pageContent","contentEntry"] && !(_id in path("drafts.**"))]{_type, path, seoTitle, seoDescription, contentType, title, summary, "slug": slug.current}',
                );
                for (const doc of documents) {
                  if (doc._type === "pageContent" && metadata[doc.path])
                    metadata[doc.path] = [
                      doc.seoTitle || metadata[doc.path][0],
                      doc.seoDescription || metadata[doc.path][1],
                    ];
                  if (
                    doc.contentType === "news" &&
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug || "")
                  )
                    metadata["/news/" + doc.slug] = [
                      doc.title + " | Manu-Tech UniPod",
                      doc.summary || "",
                    ];
                }
              } catch (error) {
                console.warn(
                  "Sanity metadata could not be refreshed; using local page metadata.",
                  error?.message || "Unknown error",
                );
              }
            }
            const index = bundle["index.html"];
            if (!index || index.type !== "asset")
              throw Error("Expected Vite index.html output.");
            const template = String(index.source);
            for (const [path, [title, description]] of Object.entries(
              metadata,
            )) {
              const tags = [
                ...(path === "/admin"
                  ? ['<meta name="robots" content="noindex,follow" />']
                  : []),
                `<meta property="og:title" content="${escapeHtml(title)}" />`,
                `<meta property="og:description" content="${escapeHtml(description)}" />`,
                '<meta property="og:type" content="website" />',
                '<meta property="og:site_name" content="Manu-Tech UniPod" />',
                '<meta name="twitter:card" content="summary" />',
                `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
                `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
              ];
              if (siteOrigin) {
                tags.push(
                  `<link rel="canonical" href="${escapeHtml(siteOrigin + path)}" />`,
                );
                tags.push(
                  `<meta property="og:url" content="${escapeHtml(siteOrigin + path)}" />`,
                );
              }
              const html = template
                .replace(
                  /<title>[^<]*<\/title>/,
                  `<title>${escapeHtml(title)}</title>`,
                )
                .replace(
                  /<meta name="description" content="[^"]*"\s*\/>/,
                  `<meta name="description" content="${escapeHtml(description)}" />`,
                )
                .replace("</head>", tags.join("\n    ") + "\n  </head>");
              if (path === "/") index.source = html;
              else
                this.emitFile({
                  type: "asset",
                  fileName: `${path.slice(1)}/index.html`,
                  source: html,
                });
            }
            if (siteOrigin) {
              const entries = Object.keys(metadata)
                .filter((path) => path !== "/admin")
                .map(
                  (path) =>
                    `  <url><loc>${escapeHtml(siteOrigin + path)}</loc></url>`,
                )
                .join("\n");
              this.emitFile({
                type: "asset",
                fileName: "sitemap.xml",
                source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
              });
            }
          },
        },
      },
    ],
  };
});
