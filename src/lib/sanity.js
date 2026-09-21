import { createClient } from "@sanity/client";
export const sanityEnabled = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);
export const sanityClient = sanityEnabled
  ? createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET || "production",
      apiVersion: "2026-09-01",
      perspective: "published",
      useCdn: true,
      timeout: 10000,
      maxRetries: 1,
    })
  : null;
const entryFields = `
  _id,
  contentType,
  title,
  "slug": slug.current,
  summary,
  image,
  role,
  order,
  category,
  topics,
  availability,
  duration,
  eligibility,
  fees,
  startDate,
  accessDetails,
  publishedAt,
  "body": select(contentType in ["programme", "facility", "enterprise"] => body)
`;

export const websiteQuery = `{
 "entries": *[_type == "contentEntry" && !(_id in path("drafts.**"))] | order(order asc, publishedAt desc) {${entryFields}},
 "galleryEvents": *[_type == "galleryEvent" && !(_id in path("drafts.**"))] | order(order asc, eventDate desc) {
   _id, title, eventDate, summary, images, order
 },
 "settings": *[_type == "siteSettings" && _id == "site-settings"][0],
 "pages": *[_type == "pageContent" && !(_id in path("drafts.**"))]
}`;

export const newsArticleQuery = `*[
  _type == "contentEntry" &&
  contentType == "news" &&
  slug.current == $slug &&
  !(_id in path("drafts.**"))
][0] {
  _id,
  contentType,
  title,
  "slug": slug.current,
  summary,
  image,
  publishedAt,
  body
}`;
