import React from "react";
import ContactForm from "../components/ContactForm";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import { useLocation } from "react-router-dom";
import { interests } from "../../shared/enquiries";

export default function Contact() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const kind = Object.hasOwn(interests, params.get("interest"))
    ? params.get("interest")
    : "";
  const subject = (params.get("subject") || "").slice(0, 160);
  return (
    <>
      <PageHero
        eyebrow="Contact & enquiries"
        title={
          <>
            Let’s make
            <br />
            <em>something happen.</em>
          </>
        }
        lead="Tell us what you want to learn, make or support. Share the details that will help the team understand your enquiry."
      />
      <section
        className="contact contact-page [--emphasis:var(--color-gold)] bg-blue-deep py-[108px] text-white max-[800px]:py-[78px]"
        id="enquiry"
        tabIndex={-1}
        aria-labelledby="enquiry-heading"
      >
        <div className="contact-grid site-container grid grid-cols-2 gap-[70px] max-[800px]:grid-cols-1 max-[800px]:gap-12">
          <div>
            <Eyebrow light>Your next step</Eyebrow>
            <h2 className="mb-0 text-[clamp(42px,4.8vw,67px)]" id="enquiry-heading">
              {kind === "visit" ? (
                <>
                  Plan a visit.
                  <br />
                  <em>Start here.</em>
                </>
              ) : (
                <>
                  Tell us
                  <br />
                  <em>what you have in mind.</em>
                </>
              )}
            </h2>
            <p className="mt-[26px] mb-[30px] text-base text-[#dce6de]">
              Choose an area of interest and describe what you need. Programme
              places, equipment access and visit dates are subject to
              confirmation.
            </p>
            <div className="grid max-w-[300px] gap-[5px] font-mono text-[10px] text-[#aec8b7]">
              <span>MICHAEL OKPARA UNIVERSITY OF AGRICULTURE</span>
              <span>UMUDIKE, ABIA STATE, NIGERIA</span>
            </div>
            <p className="mt-7 text-sm text-[#dce6de]">
              For visits, please wait for a confirmed date and meeting point
              before travelling.
            </p>
          </div>
          <ContactForm
            key={search}
            initialKind={kind}
            initialSubject={subject}
          />
        </div>
      </section>
    </>
  );
}
