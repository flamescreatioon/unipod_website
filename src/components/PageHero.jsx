import React from "react";
import { usePageContent } from "../features/content/ContentProvider";
import { RichText } from "../features/content/ContentView";
import Eyebrow from "./Eyebrow";

export default function PageHero({ eyebrow, title, lead, compact = false }) {
  const page = usePageContent();
  return (
    <section className={`page-hero site-container border-b border-line ${compact ? "pt-16" : "pt-[115px]"} pb-[100px] max-[800px]:pt-[76px] max-[800px]:pb-[65px]`}>
      <Eyebrow>{page.eyebrow ?? eyebrow}</Eyebrow>
      <h1 className="mb-[23px] text-[clamp(49px,6.4vw,86px)] text-blue">
        {page.title ? (
          <>
            {page.title} {page.emphasis && <em>{page.emphasis}</em>}
          </>
        ) : (
          title
        )}
      </h1>
      <p className="max-w-[510px] text-base text-muted">{page.lead ?? lead}</p>
      <RichText value={page.body} />
    </section>
  );
}
