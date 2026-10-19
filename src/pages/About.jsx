import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import PartnerLogos from "../components/PartnerLogos";
import { usePageContent } from "../features/content/ContentProvider";
import { RichText } from "../features/content/ContentView";

const QUOTES = [
  {
    quote:
      "This project is a strategic investment in Nigeria’s future, it reinforces the Federal Government’s commitment to repositioning higher education as a catalyst for innovation, research commercialisation, entrepreneurship and job creation.",
    author: "Minister of Education, Dr. Maruf Olatunji Alausa",
    image: "/assets/about/tunji.webp",
  },
  {
    quote:
      "The siting of the Manu-Tech UniPod in Abia speaks eloquently to the institutional faith the UNDP and the Federal Government of Nigeria have reposed in our dear State and the potential it holds as an engine of growth and economic prosperity in the region.",
    author: "Governor Alex Otti",
    image: "/assets/about/otti.webp",
  },
  {
    quote:
      "The hour of big dreams and great ambitions has arrived. If we fully harness the potential of this Manu-Tech University Innovation Pod, our challenge will no longer be finding markets but building the capacity to serve customers across Africa and the world.",
    author: "Governor Alex Otti",
    image: "/assets/about/otti-and-ahunna.webp",
  },
  {
    quote:
      "This initiative represents far more than the commissioning of another university facility. It is the unveiling of the broad national vision that positions our universities as agents of industrial transformation, innovation, enterprise creation, and sustainable economic development.",
    author: "Minister of Education, Dr. Maruf Olatunji Alausa",
    image: "/assets/about/tunji.webp",
  },
  {
    quote:
      "This Innovation Pod—this UniPod—is one thread in that grand tapestry. Here, in Abia State, Nigeria, we believe in the impossible. What this Innovation Pod represents is more than a physical space. It is a commitment to unlock the creative and innovative potential of Africa’s youth. Here, engineering meets art. Business meets social enterprise. The boundaries between disciplines dissolve. Here, failure is a critical step in innovation. Here, diversity of thought is our greatest asset.",
    author:
      "United Nations Assistant Secretary-General, H.E. Ahunna Eziakonwa",
    image: "/assets/about/otti-and-ahunna.webp",
  },
];

function getRandomIndex(excludeIndex, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === excludeIndex);
  return next;
}

export default function About() {
  const page = usePageContent();
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length)
  );
  const quoteIndexRef = useRef(quoteIndex);

  useEffect(() => {
    quoteIndexRef.current = quoteIndex;
  }, [quoteIndex]);

  useEffect(() => {
    // Preload quote background images
    QUOTES.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });

    const timer = setInterval(() => {
      setQuoteIndex((prev) => getRandomIndex(prev, QUOTES.length));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = QUOTES[quoteIndex];

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
      {/* About Hero structured identically to Main Hero */}
      <section className="hero [--emphasis:var(--color-gold)] relative h-[100svh] min-h-[580px] max-h-[1080px] w-full overflow-hidden bg-[#081a2a] text-white flex flex-col justify-between">
        <div
          className="hero-image absolute inset-0 bg-[url('/assets/about/about-hero.webp')] bg-cover bg-center"
          role="img"
          aria-label="About Manu-Tech UniPod workspace"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="blueprint-lines absolute inset-0" aria-hidden="true" />

        {/* Content area: dynamically spaced between header (82px/70px) and bottom bar */}
        <div className="hero-content site-container relative z-[2] my-auto pt-[86px] pb-6 max-[900px]:pt-[74px] max-[900px]:pb-4">
          <Eyebrow light>{page.eyebrow ?? "About Manu-Tech UniPod"}</Eyebrow>
          <h1 className="max-w-[700px] mb-3 md:mb-5 text-[clamp(34px,5.8vw,80px)] leading-[0.98] tracking-[-0.05em]">
            {page.title ? (
              <>
                {page.title} <em>{page.emphasis}</em>
              </>
            ) : (
              <>
                Born in Umudike.
                <br />
                <em>Built for what’s next.</em>
              </>
            )}
          </h1>
          <p className="hero-copy mb-5 md:mb-7 max-w-[460px] text-[clamp(13.5px,1.4vw,16px)] leading-relaxed text-[#e4e9e4]">
            {page.lead ??
              "A practical innovation hub where manufacturing technology, agricultural expertise and ambitious people come together."}
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              className="button button-gold inline-flex items-center justify-center gap-4 sm:gap-[27px] border border-transparent px-4 sm:px-[17px] py-2.5 sm:py-[13px] font-sans text-[13px] sm:text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink"
              to="/programs"
            >
              Explore programmes <b aria-hidden="true">→</b>
            </Link>
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

      {/* Quote section: loops every 15s in random order with leader portrait background */}
      <section className="relative overflow-hidden py-[100px] max-[800px]:py-[75px] bg-[#07131e] text-white">
        {/* Background Images Layer with smooth crossfading */}
        {QUOTES.map((item, idx) => (
          <div
            key={item.author + idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              idx === quoteIndex ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
            style={{ backgroundImage: `url('${item.image}')` }}
            role="img"
            aria-label={item.author}
          />
        ))}

        {/* Sophisticated dual overlay: dark tint + subtle blue/gold gradient ensuring pristine readability */}
        <div className="absolute inset-0 bg-[#07131e]/80 backdrop-blur-[1px]" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,104,177,0.3)_0%,rgba(0,59,103,0.45)_50%,rgba(7,19,30,0.8)_100%)]"
          aria-hidden="true"
        />

        <div className="site-container max-w-[960px] relative z-[2]">
          <span className="text-[72px] leading-[.35] text-gold select-none font-serif block mb-2">“</span>
          <div key={quoteIndex} className="animate-[fade-in_.6s_ease_both]">
            <blockquote className="my-[18px] mb-[25px] text-[clamp(23px,3.1vw,38px)] font-bold leading-[1.3] tracking-[-.03em] text-white">
              {currentQuote.quote}
            </blockquote>
            <div className="flex items-center gap-3 pt-2">
              <span className="h-0.5 w-8 bg-gold inline-block" aria-hidden="true" />
              <p className="mb-0 font-mono text-[12px] uppercase tracking-[0.12em] text-gold font-bold">
                {currentQuote.author}
              </p>
            </div>
          </div>
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
