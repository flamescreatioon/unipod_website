import React from "react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import {
  useCollection,
  usePageContent,
} from "../features/content/ContentProvider";
import {
  CmsImage,
  ContentState,
  RichText,
} from "../features/content/ContentView";

const CARD_PALETTE = ["#3ea8b6", "#e2a024", "#9d8ac7"];

function SocialPill({ name, socials = {} }) {
  return (
    <aside
      className="absolute bottom-5 right-5 z-20 flex flex-col items-center gap-3 rounded-full border border-white/25 bg-black/35 px-2 py-3.5 text-white shadow-lg backdrop-blur-md"
      aria-label={`${name}'s social profiles`}
    >
      {/* Instagram */}
      <a
        href={socials?.instagram || "#"}
        aria-label={`${name} on Instagram`}
        className="p-1 text-white/80 transition-colors hover:text-gold"
        onClick={(e) => !socials?.instagram && e.preventDefault()}
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>

      {/* X (Twitter) */}
      <a
        href={socials?.twitter || "#"}
        aria-label={`${name} on X`}
        className="p-1 text-white/80 transition-colors hover:text-gold"
        onClick={(e) => !socials?.twitter && e.preventDefault()}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={socials?.linkedin || "#"}
        aria-label={`${name} on LinkedIn`}
        className="p-1 text-white/80 transition-colors hover:text-gold"
        onClick={(e) => !socials?.linkedin && e.preventDefault()}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </aside>
  );
}

export default function Team() {
  const team = useCollection("team");
  const page = usePageContent();

  return (
    <>
      {/* Team Hero structured identically to Main Hero */}
      <section className="hero [--emphasis:var(--color-gold)] relative flex h-[100svh] min-h-[580px] max-h-[1080px] w-full flex-col justify-between overflow-hidden bg-[#081a2a] text-white">
        <div
          className="hero-image absolute inset-0 bg-[url('/assets/hero/reception.webp')] bg-cover bg-center"
          role="img"
          aria-label="Manu-Tech UniPod Team and Hub"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="blueprint-lines absolute inset-0" aria-hidden="true" />

        {/* Content area: dynamically spaced between header (82px/70px) and bottom bar */}
        <div className="hero-content site-container relative z-[2] my-auto pt-[86px] pb-6 max-[900px]:pt-[74px] max-[900px]:pb-4">
          <Eyebrow light>{page.eyebrow ?? "Our Team & Leadership"}</Eyebrow>
          <h1 className="mb-3 max-w-[700px] text-[clamp(34px,5.8vw,80px)] leading-[0.98] tracking-[-0.05em] md:mb-5">
            {page.title ? (
              <>
                {page.title} <em>{page.emphasis}</em>
              </>
            ) : (
              <>
                People behind
                <br />
                <em>the possibilities.</em>
              </>
            )}
          </h1>
          <p className="hero-copy mb-5 max-w-[460px] text-[clamp(13.5px,1.4vw,16px)] leading-relaxed text-[#e4e9e4] md:mb-7">
            {page.lead ??
              "The engineers, makers, educators and mentors helping ideas turn into practical, market-ready realities."}
          </p>
          <div className="hero-actions flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              className="button button-gold inline-flex cursor-pointer items-center justify-center gap-4 border border-transparent bg-gold px-4 py-2.5 font-sans text-[13px] font-extrabold text-ink no-underline sm:gap-[27px] sm:px-[17px] sm:py-[13px] sm:text-[14px]"
              href="#team-roster"
            >
              Meet the team <b aria-hidden="true">↓</b>
            </a>
            <Link
              className="text-link light inline-flex min-h-10 cursor-pointer items-center gap-2.5 text-[13px] font-extrabold text-white no-underline sm:gap-3 sm:text-[14px]"
              to="/contact"
            >
              Connect with us <b aria-hidden="true">↗</b>
            </Link>
          </div>
          <RichText value={page.body} />
        </div>

        {/* Hero footer line: anchored within the viewport */}
        <div className="hero-foot site-container relative z-[2] flex items-center justify-between pt-2 pb-4 font-mono text-[10px] tracking-[.05em] text-[#eef4ee9c] sm:pb-6 max-[800px]:text-[8px]">
          <span>MANU-TECH UNIPOD · MOUAU</span>
          <span className="scroll-cue flex items-center gap-[11px] max-[800px]:hidden">
            SCROLL TO EXPLORE <i className="inline-block h-px w-10 bg-white" />
          </span>
          <span className="max-[800px]:hidden">UMUDIKE, ABIA STATE</span>
        </div>
      </section>

      {/* Team Section styled exactly to match the reference layout */}
      <section
        id="team-roster"
        className="scroll-mt-20 bg-[#090d12] py-24 text-white max-[800px]:py-16"
      >
        <div className="site-container">
          {/* Section Header */}
          <div className="mb-14 flex items-start justify-between gap-8 max-[800px]:mb-10 max-[800px]:flex-col">
            <div>
              <h2 className="mb-0 font-sans text-[clamp(36px,5.2vw,66px)] font-black uppercase leading-[0.92] tracking-tight text-white">
                MEET THE
                <br />
                UNIPOD TEAM
              </h2>
            </div>
            <p className="mb-0 max-w-[340px] pt-1 text-[14px] leading-relaxed text-[#9ca3af] max-[800px]:pt-0">
              Our team works together to push boundaries and create technology
              that makes a difference in the world.
            </p>
          </div>

          <ContentState
            empty={!team.length}
            emptyMessage="Team profiles will appear here as they are published."
          />

          {/* 3-Column Profile Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {team.map((member, index) => {
              const name = member.name || member.title || "Team Member";
              const role = member.role || "Manu-Tech UniPod";
              const location = member.location || "MOUAU, NIGERIA";
              const bgColor =
                member.bgColor || CARD_PALETTE[index % CARD_PALETTE.length];

              return (
                <article
                  key={member._id || member.id || index}
                  className="group relative flex aspect-[3.2/4] select-none flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-7"
                  style={{ backgroundColor: bgColor }}
                >
                  {/* Photo or Silhouette Avatar */}
                  {member.image ? (
                    <div className="absolute inset-0 h-full w-full">
                      {typeof member.image === "string" ? (
                        <img
                          src={member.image}
                          alt={name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <CmsImage value={member.image} />
                      )}
                    </div>
                  ) : (
                    /* Stylized artistic silhouette if photo is pending */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-4/5 w-4/5 opacity-25 mix-blend-multiply"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>
                  )}

                  {/* Dark gradient overlay for pristine text readability */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                    aria-hidden="true"
                  />

                  {/* Bottom-left Member Info */}
                  <div className="relative z-10 pr-12">
                    <h3 className="mb-1 font-sans text-[20px] font-black uppercase leading-tight tracking-tight text-white drop-shadow-md sm:text-[22px]">
                      {name}
                    </h3>
                    <p className="mb-0 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white/85">
                      {role}
                    </p>
                    <p className="mb-0 mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/60">
                      {location}
                    </p>
                  </div>

                  {/* Bottom-right Floating Social Pill */}
                  <SocialPill name={name} socials={member.socials} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the mission CTA Section */}
      <section className="bg-[#05080c] py-20 text-white max-[800px]:py-[60px]">
        <div className="site-container flex items-end justify-between max-[800px]:block">
          <div>
            <Eyebrow light>Collaborate & Teach</Eyebrow>
            <h2 className="text-[clamp(30px,3.9vw,50px)]">
              Interested in <em>collaborating?</em>
            </h2>
            <p className="mb-0 max-w-[460px] text-[#e4e9e4]">
              We welcome guest mentors, visiting researchers, technical
              instructors, and industry partners.
            </p>
          </div>
          <Link
            className="button button-gold inline-flex cursor-pointer items-center justify-center gap-[27px] border border-transparent bg-gold px-[17px] py-[13px] font-sans text-[14px] font-extrabold text-ink no-underline max-[800px]:mt-[25px]"
            to="/contact"
          >
            Get in touch <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
    </>
  );
}
