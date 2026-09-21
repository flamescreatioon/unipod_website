import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import {
  useCollection,
  usePageContent,
} from "../features/content/ContentProvider";
import {
  EntryDetails,
  ContentState,
  RichText,
} from "../features/content/ContentView";
import { enquiryHref } from "../../shared/enquiries";

export default function Programs() {
  const programmes = useCollection("programme");
  const page = usePageContent();
  return (
    <>
      <PageHero
        eyebrow="Programmes & training"
        title={
          <>
            Learn it.
            <br />
            <em>Then make it real.</em>
          </>
        }
        lead="Explore practical learning in digital design, fabrication, robotics and electronics."
      />
      <section
        className="site-container mt-[42px] mb-12 border-l-4 border-blue bg-[#e8e5dc] p-8 max-[800px]:p-6"
        aria-labelledby="programme-status"
      >
        <span className="font-mono text-[10px] tracking-[.08em] text-blue">Planning your next step</span>
        <h2 className="mt-3 mb-[18px] text-[clamp(24px,3vw,34px)] text-blue" id="programme-status">
          {page.noticeTitle ?? "Planning your programme enquiry"}
        </h2>
        <p className="mb-0 max-w-[780px] text-base leading-[1.7]">
          {page.noticeText ??
            "Check each programme for published details. Enquiries do not reserve a place; confirm dates and requirements with the team."}
        </p>
      </section>
      <section className="site-container pb-[115px] max-[800px]:pb-[70px]" aria-label="Programme areas">
        <ContentState empty={!programmes.length} />
        {programmes.map((entry, index) => {
          const { name, description, type, topics } = entry;
          return (
            <article className="grid grid-cols-[45px_1fr_1.1fr_190px] items-start gap-[26px] border-b border-line py-[37px] max-[1050px]:grid-cols-[35px_1fr_1fr] max-[800px]:grid-cols-[32px_minmax(0,1fr)] max-[800px]:gap-[14px] max-[800px]:py-7" key={name}>
              <div className="font-mono text-xs text-blue" aria-hidden="true">
                0{index + 1}
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[.08em] text-blue">{type}</span>
                <h2 className="mt-[13px] text-[28px] text-blue max-[800px]:text-[25px]">{name}</h2>
              </div>
              <div>
                <p className="text-[15px] leading-[1.65] text-muted">{description}</p>
                <EntryDetails entry={entry} />
                <ul className="mt-[18px] mb-0 list-none border-t border-line p-0">
                  {topics.map((topic) => (
                    <li className="border-b border-line py-[6px] text-[15px] leading-[1.65]" key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <Link
                className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer max-[1050px]:col-start-3 max-[800px]:col-start-2 max-[800px]:col-end-3"
                to={enquiryHref("programmes", name)}
                aria-label={`Enquire about ${name}`}
              >
                Enquire about this programme <b aria-hidden="true">→</b>
              </Link>
            </article>
          );
        })}
      </section>
      <section className="site-container mb-[110px] flex justify-between gap-20 bg-blue px-[72px] py-16 text-white max-[800px]:mb-[72px] max-[800px]:block max-[800px]:px-[25px] max-[800px]:py-[45px]">
        <div>
          <Eyebrow light>Who it’s for</Eyebrow>
          <h2 className="text-[clamp(30px,3.7vw,49px)]">
            Students, researchers,
            <br />
            <em>founders and makers.</em>
          </h2>
        </div>
        <p className="max-w-[370px] pt-[39px] text-sm text-[#dfe9e1] max-[800px]:pt-[23px]">
          Tell us your experience level and what you want to learn. Specific
          entry requirements will be published when a programme opens.
        </p>
      </section>
    </>
  );
}
