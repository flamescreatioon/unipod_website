import React from "react";
import { sanityEnabled } from "../lib/sanity";
export default function Admin() {
  const configuredUrl =
    import.meta.env.VITE_SANITY_STUDIO_URL ||
    (import.meta.env.DEV ? "http://localhost:3333" : "");
  let studioUrl;
  try {
    const url = new URL(configuredUrl);
    if (["https:", "http:"].includes(url.protocol)) studioUrl = url.href;
  } catch {}
  return (
    <section className="site-container pt-[90px] pb-[100px] max-[800px]:pt-[60px]">
      <span className="font-mono text-[10px] tracking-[.08em] text-blue">Content management</span>
      <h1 className="text-blue">Manage content in Sanity.</h1>
      <p className="max-w-[700px]">
        Edit programmes, facilities, enterprise support, news, event galleries,
        team profiles, page introductions and site details. Review drafts in
        Studio, then publish to update the website.
      </p>
      {studioUrl ? (
        <a
          className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink"
          href={studioUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Sanity Studio →
        </a>
      ) : (
        <p className="max-w-[700px]">The Studio address has not been configured yet.</p>
      )}
      <p className="max-w-[700px]">
        {sanityEnabled
          ? "The website is configured to read published Sanity content."
          : "Sanity project configuration is still required. The website currently uses its starter content."}
      </p>
    </section>
  );
}
