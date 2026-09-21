import React from "react";
import { PortableText } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "../../lib/sanity";
import { useContent } from "./ContentProvider";
export function safeHref(value) {
  return typeof value === "string" &&
    (/^(https?:|mailto:|tel:)/i.test(value) ||
      /^\/(?!\/)/.test(value) ||
      value.startsWith("#"))
    ? value
    : undefined;
}
export function CmsImage({ value }) {
  if (!value?.asset || !sanityClient) return null;
  let src;
  try {
    src = createImageUrlBuilder(sanityClient)
      .image(value)
      .width(1200)
      .auto("format")
      .url();
  } catch {
    return null;
  }
  return (
    <figure className="my-6 [&>img]:block [&>img]:h-auto [&>img]:w-full [&>img]:rounded-lg [&>figcaption]:mt-2 [&>figcaption]:text-sm">
      <img className="max-w-full" src={src} alt={value.alt || ""} loading="lazy" />
      {value.caption && <figcaption className="text-muted">{value.caption}</figcaption>}
    </figure>
  );
}
const components = {
  types: { image: ({ value }) => <CmsImage value={value} /> },
  marks: {
    link: ({ value, children }) => {
      const href = safeHref(value.href);
      return href ? <a href={href}>{children}</a> : <>{children}</>;
    },
  },
};
export function RichText({ value }) {
  return Array.isArray(value) && value.length ? (
    <div className="[overflow-wrap:anywhere] [&_p]:my-4 [&_ul]:my-4 [&_ol]:my-4 [&_a]:underline">
      <PortableText value={value} components={components} />
    </div>
  ) : null;
}
export function ContentState({ empty = false, emptyMessage = "Updates will appear here when published." }) {
  const { loading, error, retry } = useContent();
  if (loading) return <p role="status">Loading content…</p>;
  if (error)
    return (
      <div role="status">
        <p>Content could not be refreshed. Please try again.</p>
        <button type="button" className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" onClick={retry}>
          Retry
        </button>
      </div>
    );
  return empty ? <p>{emptyMessage}</p> : null;
}
export function EntryDetails({ entry }) {
  return (
    <>
      <CmsImage value={entry.image} />
      {[
        "availability",
        "duration",
        "eligibility",
        "fees",
        "startDate",
        "accessDetails",
      ]
        .filter((key) => entry[key])
        .map((key) => (
          <p key={key}>
            <strong>
              {
                {
                  availability: "Availability",
                  duration: "Duration",
                  eligibility: "Eligibility",
                  fees: "Fees",
                  startDate: "Start date",
                  accessDetails: "Access",
                }[key]
              }
              :
            </strong>{" "}
            {entry[key]}
          </p>
        ))}
      <RichText value={entry.body} />
    </>
  );
}
export function ContactDetails() {
  const { data } = useContent();
  const settings = data?.settings || {};
  return (
    <div className="mt-[26px] text-xs text-[#dce7df] [&_p]:my-2 [&_a]:text-[#8dd4f7]">
      {settings.address && <p>{settings.address}</p>}
      {settings.email && (
        <p>
          <a href={"mailto:" + settings.email}>{settings.email}</a>
        </p>
      )}
      {settings.phone && (
        <p>
          <a href={"tel:" + settings.phone.replace(/[^+0-9]/g, "")}>
            {settings.phone}
          </a>
        </p>
      )}
      {settings.visitingHours && (
        <p>Visiting hours: {settings.visitingHours}</p>
      )}
    </div>
  );
}
