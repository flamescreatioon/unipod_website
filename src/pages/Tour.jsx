import React from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { enquiryHref } from "../../shared/enquiries";

export default function Tour() {
  return (
    <>
      <nav className="breadcrumbs site-container flex gap-3 pt-8 text-sm" aria-label="Breadcrumb">
        <Link className="text-blue" to="/facilities">Facilities</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Plan a visit</span>
      </nav>
      <PageHero
        compact
        eyebrow="Visit Manu-Tech UniPod"
        title={
          <>
            Come with questions.
            <br />
            <em>Leave with a direction.</em>
          </>
        }
        lead="Use a visit enquiry to tell us who is coming, what you want to explore and when you would prefer to visit."
      />
      <section className="site-container grid grid-cols-3 gap-8 pt-[60px] pb-20 max-[900px]:grid-cols-1 max-[900px]:gap-7 max-[900px]:py-[60px]">
        <article className="border-t border-line pt-6">
          <span className="font-mono text-[10px] tracking-[.08em] text-blue">01 · Your interests</span>
          <h2 className="mt-5 mb-5 text-[28px] text-blue">What would you like to explore?</h2>
          <p className="text-base text-muted">
            Tell us whether you are interested in training, design, prototyping,
            fabrication or electronics. Include any specific equipment or
            project questions.
          </p>
        </article>
        <article className="border-t border-line pt-6">
          <span className="font-mono text-[10px] tracking-[.08em] text-blue">02 · Your group</span>
          <h2 className="mt-5 mb-5 text-[28px] text-blue">Who is coming?</h2>
          <p className="text-base text-muted">
            Share your preferred date, group size and organisation, if
            applicable. Mention access requirements that would help with
            planning.
          </p>
        </article>
        <article className="border-t border-line pt-6">
          <span className="font-mono text-[10px] tracking-[.08em] text-blue">03 · Before travelling</span>
          <h2 className="mt-5 mb-5 text-[28px] text-blue">Confirm the arrangements.</h2>
          <p className="text-base text-muted">
            A visit enquiry is a request. Wait for a confirmed date, meeting
            point and any access instructions before travelling. Visiting hours
            have not yet been published.
          </p>
        </article>
      </section>
      <section className="tour-cta [--emphasis:var(--color-blue)] bg-gold py-[85px] max-[800px]:py-[65px]">
        <div className="site-container flex items-end justify-between max-[800px]:block">
          <div>
            <h2 className="text-[clamp(38px,4vw,58px)] text-blue">
              Start planning
              <br />
              <em>your visit.</em>
            </h2>
            <p>
              Michael Okpara University of Agriculture, Umudike, Abia State.
            </p>
          </div>
          <Link className="button button-dark inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-blue text-white max-[800px]:mt-[25px]" to={enquiryHref("visit")}>
            Request a visit <b aria-hidden="true">→</b>
          </Link>
        </div>
      </section>
    </>
  );
}
