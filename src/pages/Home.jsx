import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Eyebrow from "../components/Eyebrow";
import PartnerLogos from "../components/PartnerLogos";
import { enquiryHref } from "../../shared/enquiries";

import { useContent } from "../features/content/ContentProvider";
import { CmsImage } from "../features/content/ContentView";
import FacilitySlideshow from "../components/FacilitySlideshow";
import HeroCarousel from "../components/HeroCarousel";
import SiteFooter from "../components/siteFooter";
const partnersCards = [
  {
    category: "For industry",
    metric: "Direct capability",
    description: "Access verified technical talent, precision prototyping, and contract manufacturing capacity.",
  },
  {
    category: "For development partners",
    metric: "High-impact outcomes",
    description: "Fund and scale youth skills bootcamps, productive enterprise incubation, and sustainable innovation.",
  },
  {
    category: "For researchers & academics",
    metric: "Lab to market",
    description: "Bridge scholarly research with practical fabrication, testing labs, and commercialized patent pathways.",
  },
  {
    category: "For founders & startups",
    metric: "Rapid iteration",
    description: "Accelerate your venture with on-site prototyping machinery, engineering mentorship, and market support.",
  },
];
const pathways = [
  [
    "Skills & bootcamps",
    "Explore hands-on learning in design, manufacturing and electronics.",
    "/programs",
    "Explore programmes",
  ],
  [
    "Prototype & fabricate",
    "Find the capability areas that fit your idea and ask about access.",
    "/facilities",
    "Explore facilities",
  ],
  [
    "Develop an enterprise",
    "Discuss your venture, project stage and the support you need.",
    "/enterprise",
    "Explore enterprise support",
  ],
  [
    "Partner with us",
    "Contribute expertise, equipment or opportunities to local innovation.",
    "/#partner",
    "Explore partnerships",
  ],
];

export default function Home() {
  const { data } = useContent();
  const settings = data?.settings || {};
  return (
    <>
      <section className="hero [--emphasis:var(--color-gold)] relative h-[100svh] min-h-[580px] max-h-[1080px] w-full overflow-hidden bg-[#081a2a] text-white flex flex-col justify-between">
        {settings.heroImage ? (
          <div className="absolute inset-0 [&_figure]:m-0 [&_figure]:h-full [&_figure>img]:h-full [&_figure>img]:object-cover [&_figure>img]:rounded-none [&_figcaption]:hidden">
            <CmsImage value={settings.heroImage} />
          </div>
        ) : (
          <HeroCarousel intervalMs={5000} />
        )}
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="blueprint-lines absolute inset-0" aria-hidden="true" />

        {/* Content area: dynamically spaced between header (82px/70px) and bottom bar */}
        <div className="hero-content site-container relative z-[2] my-auto pt-[86px] pb-6 max-[900px]:pt-[74px] max-[900px]:pb-4">
          <Eyebrow light>
            Michael Okpara University of Agriculture, Umudike
          </Eyebrow>
          <h1 className="max-w-[700px] mb-3 md:mb-5 text-[clamp(34px,5.8vw,80px)] leading-[0.98] tracking-[-0.05em]">
            {settings.heroTitle ? (
              <>
                {settings.heroTitle} <em>{settings.heroEmphasis}</em>
              </>
            ) : (
              <>
                Build what
                <br />
                <em>moves us</em> forward.
              </>
            )}
          </h1>
          <p className="hero-copy mb-5 md:mb-7 max-w-[460px] text-[clamp(13.5px,1.4vw,16px)] leading-relaxed text-[#e4e9e4]">
            {settings.heroLead ??
              "A manufacturing technology hub at MOUAU for students, researchers, founders and industry. Explore practical skills, prototyping and enterprise support."}
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6">
            <Link className="button button-gold inline-flex items-center justify-center gap-4 sm:gap-[27px] border border-transparent px-4 sm:px-[17px] py-2.5 sm:py-[13px] font-sans text-[13px] sm:text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink" to="/programs">
              Explore programmes <b aria-hidden="true">→</b>
            </Link>
            <Link className="text-link light inline-flex min-h-10 items-center gap-2.5 sm:gap-3 text-[13px] sm:text-[14px] font-extrabold text-white no-underline cursor-pointer" to="/facility-tour">
              Plan a visit <b aria-hidden="true">↗</b>
            </Link>
          </div>
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
      <section className="bg-[#e8e5dc] py-[103px] max-[800px]:py-[72px]">
        <div className="site-container">
          <div className="mb-[43px] flex items-end justify-between max-[800px]:block">
            <div>
              <Eyebrow>Start here</Eyebrow>
              <h2>
                Find your <em>pathway.</em>
              </h2>
            </div>
            <p className="mb-0 max-w-[300px] text-[13px] text-muted max-[800px]:mt-5">
              Choose what you want to do. Each pathway explains the next step
              and what information is available.
            </p>
          </div>
          <div className="grid grid-cols-4 border-t border-ink max-[800px]:grid-cols-2 max-[480px]:grid-cols-1">
            {pathways.map(([title, copy, url, label], index) => (
              <article
                key={url}
                className={`flex min-h-[315px] flex-col border-r border-ink p-[19px_19px_15px] text-ink first:border-l max-[800px]:min-h-[280px] max-[480px]:min-h-[230px] max-[480px]:border-l max-[480px]:border-t ${index === 0 ? "bg-blue text-white" : ""} ${index === 2 ? "max-[800px]:border-l max-[800px]:border-t" : ""} ${index === 3 ? "max-[800px]:border-t" : ""}`}
              >
                <div className="flex justify-between font-mono text-[10px]">
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <h3 className="mt-[38px] mb-[13px] text-[25px] max-[800px]:mt-[22px] max-[800px]:text-[21px]">{title}</h3>
                <p className="mb-4 text-[15px] leading-[1.65] opacity-[.78]">{copy}</p>
                <Link className="mt-auto flex min-h-11 items-center justify-between gap-3 pt-[22px] text-[14px] font-extrabold text-inherit no-underline max-[480px]:pt-3" to={url}>
                  {label} <b className="text-[17px] font-normal" aria-hidden="true">→</b>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gold py-7 max-[800px]:py-6">
        <div className="site-container grid grid-cols-[1fr_2fr] items-center gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-[17px]">
          <div>
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[.08em]">Hosted by MOUAU</span>
            <strong className="text-lg leading-[1.05] tracking-[-.04em]">Knowledge into practical capability.</strong>
          </div>
          <PartnerLogos variant="marks" className="justify-evenly gap-4 max-[800px]:justify-start max-[800px]:gap-[22px]" />
        </div>
      </section>
      <section className="site-container grid grid-cols-2 gap-[70px] py-20 max-[900px]:grid-cols-1 max-[900px]:gap-7 max-[900px]:py-[60px]">
        <div>
          <Eyebrow>Programme availability</Eyebrow>
          <h2>
            {settings.opportunityTitle ?? (
              <>
                Explore now.
                <br />
                <em>Plan your next step.</em>
              </>
            )}
          </h2>
        </div>
        <div>
          <p className="mb-6 text-base text-muted">
            {settings.opportunityText ??
              "Explore the learning areas, check the published details and send an enquiry about the programme that interests you."}
          </p>
          <Link className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink mr-4" to="/programs">
            View programme areas <b aria-hidden="true">→</b>
          </Link>
          <Link className="text-link mt-3 inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to="/news">
            News & publication updates <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
      <section className="relative min-h-[670px] overflow-hidden bg-[#071e31] text-white max-[800px]:min-h-0 max-[800px]:overflow-visible">
        <FacilitySlideshow
          slides={settings.facilitySlides}
          intervalSeconds={settings.facilitySlideInterval}
        />
        <div className="facility-panel [--emphasis:var(--color-gold)] relative ml-[50%] min-h-[670px] w-1/2 bg-blue-deep/90 p-[105px_40px_60px] min-[1264px]:ml-[calc((100vw_-_1200px)/2_+_600px)] min-[1264px]:w-[min(50%,600px)] max-[800px]:ml-0 max-[800px]:min-h-0 max-[800px]:w-full max-[800px]:px-5 max-[800px]:py-[55px]">
          <Eyebrow light>The facility</Eyebrow>
          <h2 className="max-w-[450px] text-[clamp(38px,4.2vw,61px)]">
            A space built for <em>possibility.</em>
          </h2>
          <p className="my-6 max-w-[350px] text-[15px] leading-[1.65] text-[#e1e9e2]">
            Explore design, fabrication and experimentation. Confirm equipment
            availability and access arrangements before planning your project.
          </p>
          <ul className="m-0 mb-8 list-none border-t border-white/30 p-0">
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">01</span> Pitch Garage
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">02</span> Makerspace
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">03</span> Rapid Prototyping Studio
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">04</span> Design Studio
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">05</span> Agriculture and Food Technology
              Lab
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">06</span>Renewable Energy Lab
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">07</span> Music and Broadcast Studio
            </li>
            <li className="border-b border-white/30 py-[9px] text-[15px] leading-[1.65]">
              <span className="mr-[13px] font-mono text-[10px] text-blue" aria-hidden="true">08</span> Photography and Videography
              Studio
            </li>
          </ul>
          <Link className="button button-outline inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer border-white/50 bg-transparent text-white" to="/facilities">
            Explore facilities & access <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
      <section
        className="bg-[#e8e5dc] py-[103px] max-[800px]:py-[72px]"
        id="partner"
        tabIndex={-1}
        aria-labelledby="partner-heading"
      >
        <div className="site-container">
          <div className="mb-[43px] flex items-end justify-between max-[800px]:block">
            <div>
              <Eyebrow>Partner with us</Eyebrow>
              <h2 id="partner-heading">
                Progress is a <em>team sport.</em>
              </h2>
            </div>
            <p className="mb-0 max-w-[340px] text-[13px] text-muted max-[800px]:mt-5">
              Connect manufacturing, agriculture, research and technical talent.
              Partner with the hub to prototype ideas, accelerate local industry,
              and solve real-world problems.
            </p>
          </div>

          {/* Grid styled identically to "Start here" pathway cards */}
          <div className="grid grid-cols-4 border-t border-ink max-[800px]:grid-cols-2 max-[480px]:grid-cols-1">
            {partnersCards.map(({ category, metric, description }, index) => (
              <article
                key={category}
                className={`flex min-h-[315px] flex-col border-r border-ink p-[19px_19px_15px] text-ink first:border-l max-[800px]:min-h-[280px] max-[480px]:min-h-[230px] max-[480px]:border-l max-[480px]:border-t ${index === 0 ? "bg-blue text-white" : ""} ${index === 2 ? "max-[800px]:border-l max-[800px]:border-t" : ""} ${index === 3 ? "max-[800px]:border-t" : ""}`}
              >
                <div className="flex justify-between font-mono text-[10px]">
                  <span aria-hidden="true">0{index + 1}</span>
                  <span className="uppercase opacity-75">{category}</span>
                </div>
                <h3 className="mt-[38px] mb-[13px] text-[25px] max-[800px]:mt-[22px] max-[800px]:text-[21px]">
                  {metric}
                </h3>
                <p className="mb-4 text-[15px] leading-[1.65] opacity-[.78]">
                  {description}
                </p>
                <Link
                  className="mt-auto flex min-h-11 items-center justify-between gap-3 pt-[22px] text-[14px] font-extrabold text-inherit no-underline max-[480px]:pt-3"
                  to={enquiryHref("partnership", category)}
                >
                  Explore pathway <b className="text-[17px] font-normal" aria-hidden="true">→</b>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
