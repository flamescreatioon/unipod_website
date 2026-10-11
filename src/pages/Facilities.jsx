import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import FacilityCarousel from "../components/FacilityCarousel";
import { enquiryHref } from "../../shared/enquiries";
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
  const facilityAreas = useCollection("facility");
  const page = usePageContent();
  return (
    <>
      <section className="facility-page-hero [--emphasis:var(--color-gold)] relative min-h-[575px] overflow-hidden text-white max-[800px]:min-h-[520px]">
        <FacilityCarousel intervalMs={5000} />
        <div className="absolute inset-0 bg-[#081a2a]/75" aria-hidden="true" />
        <div className="site-container relative z-[2] pt-[102px] max-[800px]:pt-[83px]">
          <Eyebrow light>{page.eyebrow ?? "Facilities & visits"}</Eyebrow>
          <h1 className="mb-[22px] text-[clamp(50px,6vw,82px)]">
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
          <p className="mb-6 max-w-[390px] text-[15px]">
            {page.lead ??
              "Explore the capability areas behind practical design, prototyping and manufacturing."}
          </p>
          <Link className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink" to="/facility-tour">
            Plan a visit <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
      <section className="site-container py-28 max-[800px]:py-[72px]">
        <div className="mb-[43px] flex items-end justify-between max-[800px]:block">
          <div>
            <Eyebrow>Capability areas</Eyebrow>
            <h2>
              From digital files to <em>physical forms.</em>
            </h2>
          </div>
          <p className="mb-0 max-w-[300px] text-[13px] text-muted max-[800px]:mt-5">
            Equipment lists, access hours, charges and induction requirements
            have not yet been published. Please confirm access before making
            plans.
          </p>
        </div>
        <div className="grid grid-cols-2 border-t border-ink max-[800px]:grid-cols-1">
          <ContentState empty={!facilityAreas.length} />
          <RichText value={page.body} />
          {facilityAreas.map((entry, index) => {
            const { name, description, type, topics } = entry;
            return (
              <article className="border-b border-r border-ink p-[27px_30px_48px] max-[800px]:p-[24px_21px_35px] max-[800px]:[&:nth-child(odd)]:border-l" key={name}>
                <span className="font-mono text-[10px] text-blue" aria-hidden="true">0{index + 1}</span>
                <h3 className="mt-12 mb-2.5 text-[28px]">{name}</h3>
                <p className="max-w-[370px] text-[15px] leading-[1.65] text-muted">{description}</p>
                <EntryDetails entry={entry} />
                <Link
                  className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer"
                  to={enquiryHref("access", name)}
                  aria-label={`Enquire about ${name.toLowerCase()} access`}
                >
                  Ask about access <b aria-hidden="true">→</b>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
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
          <Link className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink max-[800px]:mt-[25px]" to={enquiryHref("access")}>
            Enquire about facility access <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
    </>
  );
}
