import { getCliClient } from "sanity/cli";
import { programmes } from "../../src/data/programmes.js";
import { facilityAreas } from "../../src/data/facilities.js";
import { enterpriseServices } from "../../src/data/enterprise.js";
const client = getCliClient({ apiVersion: "2026-09-01" }).withConfig({
  useCdn: false,
  perspective: "raw",
});
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const documents = [];
for (const [contentType, items] of [
  ["programme", programmes],
  ["facility", facilityAreas],
  ["enterprise", enterpriseServices],
]) {
  items.forEach((item, order) => {
    const slug = slugify(item.name);
    documents.push({
      _id: contentType + "-" + slug,
      _type: "contentEntry",
      contentType,
      title: item.name,
      slug: { _type: "slug", current: slug },
      summary: item.description,
      order,
      ...(contentType === "programme"
        ? { category: item.type, topics: item.topics }
        : {}),
    });
  });
}
documents.push({
  _id: "site-settings",
  _type: "siteSettings",
  email: "",
  phone: "",
  visitingHours: "",
});
for (const path of [
  "/about",
  "/programs",
  "/facilities",
  "/enterprise",
  "/news-impact",
  "/news",
  "/gallery",
  "/team",
  "/facility-tour",
  "/contact",
])
  documents.push({ _id: "page-" + path.slice(1), _type: "pageContent", path });
let created = 0;
for (const document of documents) {
  const existing = await client.getDocuments([
    document._id,
    "drafts." + document._id,
  ]);
  if (existing.some(Boolean)) continue;
  await client.createIfNotExists({
    ...document,
    _id: "drafts." + document._id,
  });
  created++;
}
console.log(
  `Created ${created} drafts. Review and publish in Studio. Existing documents were left unchanged.`,
);
