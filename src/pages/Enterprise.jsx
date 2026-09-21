import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
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

export default function Enterprise() {
  const enterpriseServices = useCollection("enterprise");
  const page = usePageContent();
  return (
    <>
      <section className="bg-ink py-[115px] text-white max-[800px]:py-[75px]">
        <div className="site-container">
          <Eyebrow light>{page.eyebrow ?? "Incubation & enterprise"}</Eyebrow>
          <h1 className="mb-[22px] text-[clamp(50px,6.7vw,88px)]">
            {page.title ? (
              <>
                {page.title} <em>{page.emphasis}</em>
              </>
            ) : (
              <>
                Useful ideas
                <br />
                <em>deserve a future.</em>
              </>
            )}
          </h1>
          <p className="mb-0 max-w-[410px] text-[#d7ded8]">
            {page.lead ??
              "Explore support for founders and MSMEs developing practical solutions for the real economy."}
          </p>
          <Link className="button button-gold mt-[22px] inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink" to={enquiryHref("enterprise")}>
            Discuss your venture <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
      <section className="site-container mt-[42px] mb-12 border-l-4 border-blue bg-[#e8e5dc] p-8 max-[800px]:p-6">
        <span className="font-mono text-[10px] tracking-[.08em] text-blue">Before you enquire</span>
        <h2 className="mt-3 mb-[18px] text-[clamp(24px,3vw,34px)] text-blue">Start with your challenge and stage.</h2>
        <p className="mb-0 max-w-[780px] text-base leading-[1.7]">
          Tell us the problem you are solving, who it affects, what you have
          built so far and the support you need. Intake dates, selection
          criteria, duration and any fees have not yet been published.
        </p>
      </section>
      <section className="bg-[#e8e5dc] py-[102px] max-[800px]:py-[72px]">
        <div className="site-container">
          <div className="mb-10"><Eyebrow>Support areas</Eyebrow></div>
          <ContentState empty={!enterpriseServices.length} />
          <RichText value={page.body} />
          {enterpriseServices.map((entry, index) => {
            const { name, description, type, topics } = entry;
            return (
              <div className="grid grid-cols-[80px_1.1fr_1fr] gap-[25px] border-t border-ink py-[27px] last:border-b max-[800px]:grid-cols-[45px_1fr] max-[800px]:gap-3" key={name}>
                <span className="font-mono text-[10px] text-blue" aria-hidden="true">0{index + 1}</span>
                <h2 className="text-[28px] text-blue max-[800px]:text-2xl">{name}</h2>
                <div className="max-[800px]:col-start-2">
                  <p className="mb-0 text-[15px] leading-[1.65] text-muted">{description}</p>
                  <EntryDetails entry={entry} />
                  <Link
                    className="text-link mt-4 inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer"
                    to={enquiryHref("enterprise", name)}
                    aria-label={`Enquire about ${name.toLowerCase()}`}
                  >
                    Discuss this support <b aria-hidden="true">→</b>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="site-container grid grid-cols-[1.15fr_1fr] gap-[120px] py-[118px] max-[800px]:grid-cols-1 max-[800px]:gap-[18px] max-[800px]:py-[75px]">
        <div>
          <Eyebrow>Working together</Eyebrow>
          <h2>
            Bring your expertise.
            <br />
            <em>Build local capability.</em>
          </h2>
        </div>
        <div className="pt-[47px] max-w-[420px] text-muted max-[800px]:pt-0">
          <p>
            Industry, development and research partners can enquire about
            contributing expertise, equipment, opportunities or funding.
          </p>
          <Link className="text-link mt-[13px] inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to={enquiryHref("partnership")}>
            Start a partnership enquiry <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
    </>
  );
}
