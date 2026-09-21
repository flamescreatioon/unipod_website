import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import PartnerLogos from "../components/PartnerLogos";

export default function About() {
  const partners = [
    [
      "FGN",
      "National commitment to productive innovation and youth opportunity.",
    ],
    [
      "UNDP",
      "Development partnership connecting local work to global progress.",
    ],
    [
      "TETFund",
      "Investment in research, learning and institutional capability.",
    ],
    ["ABIA STATE", "State-level support for a stronger innovation ecosystem."],
    ["MOUAU", "Academic home and community for Manu-Tech UniPod."],
  ];
  return (
    <>
      <PageHero
        eyebrow="About Manu-Tech UniPod"
        title={
          <>
            Born in Umudike.
            <br />
            <em>Built for what’s next.</em>
          </>
        }
        lead="A practical innovation hub where manufacturing technology, agricultural expertise and ambitious people come together."
      />
      <section className="site-container grid grid-cols-[100px_1.15fr_1fr] gap-[35px] py-[110px] max-[800px]:grid-cols-1 max-[800px]:gap-[22px] max-[800px]:py-[76px]">
        <div className="flex items-center gap-[9px] font-mono text-[11px] text-blue">
          01 <i className="h-px w-[26px] bg-blue" />
        </div>
        <div>
          <h2>
            A new institution for <em>making.</em>
          </h2>
        </div>
        <div className="pt-[38px] max-w-[440px] text-muted max-[800px]:pt-0">
          <p className="mb-[18px]">
            Hosted by Michael Okpara University of Agriculture, Umudike,
            Manu-Tech UniPod is Nigeria’s first Manufacturing Technology
            University Innovation Pod. It gives learners and problem-solvers a
            place to acquire practical skills, develop prototypes and grow
            enterprise-ready solutions.
          </p>
          <p className="mb-[18px]">
            Our focus is simple: make the pathway from an idea to a useful
            outcome more accessible.
          </p>
        </div>
      </section>
      <section className="bg-gold py-[90px] max-[800px]:py-[65px]">
        <div className="site-container max-w-[940px]">
          <span className="text-[68px] leading-[.35] text-blue">“</span>
          <blockquote className="my-[18px] mb-[25px] text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.15] tracking-[-.05em] text-blue">
            When ideas are matched with the right tools, they become
            opportunities for people, communities and industry.
          </blockquote>
          <p className="mb-0 font-mono text-[10px] tracking-[.08em] text-blue">MANU-TECH UNIPOD · MOUAU</p>
        </div>
      </section>
      <section className="site-container grid grid-cols-[1.15fr_1fr] gap-[120px] py-[118px] max-[800px]:grid-cols-1 max-[800px]:gap-[18px] max-[800px]:py-[75px]">
        <div>
          <Eyebrow>Part of a national network</Eyebrow>
          <h2>
            Local relevance.
            <br />
            <em>National momentum.</em>
          </h2>
        </div>
        <div className="pt-[47px] max-w-[420px] text-muted max-[800px]:pt-0">
          <p>
            Manu-Tech UniPod is part of the National UniPod Network: a connected
            group of innovation hubs designed to give institutions the
            infrastructure and partnerships to tackle complex challenges.
          </p>
          <Link className="text-link mt-[13px] inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to="/programs">
            Explore programmes <b>→</b>
          </Link>
        </div>
      </section>
      <section className="bg-[#e8e5dc] py-[94px] max-[800px]:py-[70px]">
        <div className="site-container">
          <Eyebrow>Our partners</Eyebrow>
          <PartnerLogos variant="page" className="mt-[34px] gap-[18px]" />
          <div className="mt-[45px] grid grid-cols-5 border-t border-ink max-[800px]:mt-[30px] max-[800px]:grid-cols-2 max-[480px]:grid-cols-1">
            {partners.map(([name, detail]) => (
              <article className="min-h-[180px] border-r border-ink px-4 py-5 first:border-l max-[800px]:min-h-[150px]" key={name}>
                <strong className="text-[19px]">{name}</strong>
                <p className="mt-11 text-[11px] leading-[1.5] text-muted">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
