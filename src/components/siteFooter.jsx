import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Eyebrow from "../components/Eyebrow";

export default function SiteFooter() {
  return (
    <section
      className="contact [--emphasis:var(--color-gold)] bg-blue-deep py-[108px] text-white max-[800px]:py-[78px]"
      id="contact"
      tabIndex={-1}
      aria-labelledby="home-contact-heading"
    >
      <div className="contact-grid site-container grid grid-cols-2 gap-[70px] max-[800px]:grid-cols-1 max-[800px]:gap-12">
        <div>
          <Eyebrow light>Get in touch</Eyebrow>
          <h2 className="mb-0 text-[clamp(42px,4.8vw,67px)]" id="home-contact-heading">
            Let’s make
            <br />
            <em>something happen.</em>
          </h2>
          <p className="mt-[26px] mb-[30px] text-base text-[#dce6de]">Tell us what you want to build, learn or support.</p>
          <div className="grid max-w-[300px] gap-[5px] font-mono text-[10px] text-[#aec8b7]">
            <span>UMUDIKE, ABIA STATE</span>
            <span>MICHAEL OKPARA UNIVERSITY OF AGRICULTURE</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
