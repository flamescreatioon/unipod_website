import React from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404 · Page not found"
        title={
          <>
            Let’s get you
            <br />
            <em>back on track.</em>
          </>
        }
        lead="This address does not match a page on our website. It may have moved, or the link may be incomplete."
      />
      <section className="recovery-links site-container">
        <Link className="button button-gold inline-flex items-center justify-center gap-[27px] border border-transparent px-[17px] py-[13px] font-sans text-[14px] font-extrabold no-underline cursor-pointer bg-gold text-ink" to="/">
          Go to the homepage
        </Link>
        <Link className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to="/programs">
          Explore programmes
        </Link>
        <Link className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to="/contact">
          Contact us
        </Link>
      </section>
    </>
  );
}
