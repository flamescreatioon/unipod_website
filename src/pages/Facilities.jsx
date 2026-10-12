import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import FacilityCarousel from "../components/FacilityCarousel";
import { enquiryHref } from "../../shared/enquiries";
import { facilityAreas as defaultFacilities } from "../data/facilities";
import {
  useCollection,
  usePageContent,
} from "../features/content/ContentProvider";
import {
  EntryDetails,
  ContentState,
  RichText,
} from "../features/content/ContentView";

export default function Facilities() {
  const cmsFacilities = useCollection("facility");
  const page = usePageContent();

  // Ensure all 10 core facilities are consistently displayed, enriched with any CMS data if present
  const facilityAreas = defaultFacilities.map((defaultItem) => {
    const match = cmsFacilities.find(
      (cms) =>
        cms.name?.toLowerCase().trim() === defaultItem.name.toLowerCase().trim()
    );
    return match || defaultItem;
  });

  return (
    <>
      {/* Facilities Hero structured identically to Main Hero */}
      <section className="hero [--emphasis:var(--color-gold)] relative h-[100svh] min-h-[580px] max-h-[1080px] w-full overflow-hidden bg-[#081a2a] text-white flex flex-col justify-between">
        <FacilityCarousel intervalMs={5000} />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="blueprint-lines absolute inset-0" aria-hidden="true" />

        {/* Content area: dynamically spaced between header (82px/70px) and bottom bar */}
        <div className="hero-content site-container relative z-[2] my-auto pt-[86px] pb-6 max-[900px]:pt-[74px] max-[900px]:pb-4">
          <Eyebrow light>{page.eyebrow ?? "Facilities & capability"}</Eyebrow>
          <h1 className="max-w-[700px] mb-3 md:mb-5 text-[clamp(34px,5.8vw,80px)] leading-[0.98] tracking-[-0.05em]">
            {page.title ? (
              <>
                {page.title} <em>{page.emphasis}</em>
              </>
            ) : (
              <>
                Space to think.
                <br />
                <em>Tools to do.</em>
              </>
            )}
          </h1>
          <p className="hero-copy mb-5 md:mb-7 max-w-[460px] text-[clamp(13.5px,1.4vw,16px)] leading-relaxed text-[#e4e9e4]">
            {page.lead ??
              "Explore the capability areas behind practical design, prototyping and manufacturing."}
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              className="button button-gold inline-flex items-center justify-center gap-4 sm:gap-[27px] border border-transparent px-4 sm:px-[17px] py-2.5 sm:py-[13px] font-sans text-[13px] sm:text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink"
              href="#facilities-list"
            >
              Explore facilities <b aria-hidden="true">↓</b>
            </a>
            <Link
              className="text-link light inline-flex min-h-10 items-center gap-2.5 sm:gap-3 text-[13px] sm:text-[14px] font-extrabold text-white no-underline cursor-pointer"
              to="/facility-tour"
            >
              Plan a visit <b aria-hidden="true">↗</b>
            </Link>
          </div>
          <RichText value={page.body} />
        </div>

        {/* Hero footer line: anchored within the viewport */}
        <div className="hero-foot site-container relative z-[2] pb-4 sm:pb-6 pt-2 flex items-center justify-between font-mono text-[10px] tracking-[.05em] text-[#eef4ee9c] max-[800px]:text-[8px]">
          <span>MANU-TECH UNIPOD · MOUAU</span>
          <span className="scroll-cue flex items-center gap-[11px] max-[800px]:hidden">
            SCROLL TO EXPLORE <i className="inline-block h-px w-10 bg-white" />
          </span>
          <span className="max-[800px]:hidden">UMUDIKE, ABIA STATE</span>
        </div>
      </section>

      {/* Facilities List Section */}
      <section
        id="facilities-list"
        className="site-container scroll-mt-20 py-28 max-[800px]:py-[72px]"
      >
        <div className="mb-[43px] flex items-end justify-between max-[800px]:block">
          <div>
            <Eyebrow>Capability areas</Eyebrow>
            <h2>
              From digital files to <em>physical forms.</em>
            </h2>
          </div>
          <p className="mb-0 max-w-[340px] text-[13px] text-muted max-[800px]:mt-5">
            Explore our state-of-the-art facilities. Reserve dedicated studio and lab time, ask about equipment access, or speak with our technical team.
          </p>
        </div>

        <div className="grid grid-cols-2 border-t border-ink max-[800px]:grid-cols-1">
          <ContentState empty={!facilityAreas.length} />
          {facilityAreas.map((entry, index) => {
            const { name, description, type, topics } = entry;
            return (
              <article
                className="border-b border-r border-ink p-[32px_30px_48px] max-[800px]:p-[24px_21px_35px] max-[800px]:border-r-0 max-[800px]:border-l-0 [&:nth-child(even)]:border-r-0 flex flex-col justify-between"
                key={name}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[11px] text-blue font-bold tracking-[.08em]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {type && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.08em] px-2 py-0.5 bg-[#0468b1]/10 text-blue font-semibold">
                        {type}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-3 text-[26px] font-bold leading-tight text-ink">
                    {name}
                  </h3>
                  <p className="max-w-[420px] text-[15px] leading-[1.65] text-muted mb-4">
                    {description}
                  </p>
                  <EntryDetails entry={entry} />
                  {topics?.length > 0 && (
                    <ul className="mb-6 list-none border-t border-line/60 pt-3 p-0 space-y-1.5">
                      {topics.map((topic) => (
                        <li
                          key={topic}
                          className="text-[13px] text-muted flex items-center gap-2"
                        >
                          <span className="h-1.5 w-1.5 bg-blue inline-block rounded-full" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="pt-4">
                  <Link
                    className="button button-gold inline-flex items-center justify-center gap-3 border border-transparent px-5 py-2.5 font-sans text-[13px] font-extrabold no-underline cursor-pointer bg-gold text-ink hover:brightness-105 transition-all"
                    to={enquiryHref("access", name)}
                    aria-label={`Book now: ${name}`}
                  >
                    Book now <b aria-hidden="true">→</b>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="book-section [--emphasis:var(--color-gold)] bg-ink py-20 text-white max-[800px]:py-[60px]">
        <div className="site-container flex items-end justify-between max-[800px]:block">
          <div>
            <Eyebrow light>Prepare your enquiry</Eyebrow>
            <h2 className="text-[clamp(30px,3.9vw,50px)]">
              Tell us what
              <br />
              <em>you want to make.</em>
            </h2>
            <p className="mb-0 max-w-[460px]">
              Include your project, materials, equipment needs and preferred
              timeframe.
            </p>
          </div>
          <Link
            className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink max-[800px]:mt-[25px]"
            to={enquiryHref("access")}
          >
            Book now <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
    </>
  );
}
