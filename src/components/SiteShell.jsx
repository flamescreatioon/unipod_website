import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { nav } from "../data/siteData";
import PartnerLogos from "./PartnerLogos";
import { ContactDetails } from "../features/content/ContentView";
import { useContent } from "../features/content/ContentProvider";
import RouteEffects from "./RouteEffects";

export function Brand({ includeUndp = false }) {
  return (
    <Link
      className="brand brand-logos flex min-w-[245px] items-center gap-[13px] text-inherit no-underline leading-none max-[900px]:min-w-[194px] max-[800px]:min-w-0 max-[800px]:gap-[9px]"
      to="/"
      aria-label="Manu-Tech UniPod home"
    >
      <img
        className="unipod-logo h-[54px] w-[100px] object-contain max-[800px]:h-[42px] max-[800px]:w-[68px]"
        src="/assets/unipod-icon.png"
        alt="UniPod"
        width="100"
        height="54"
      />
      <span className="logo-divider h-[27px] w-px bg-current opacity-45 max-[800px]:h-[26px]" aria-hidden="true" />
      <img
        className="mouau-logo h-[54px] w-[54px] object-contain max-[800px]:h-[41px] max-[800px]:w-[41px]"
        src="/assets/mouau-mark.png"
        alt="Michael Okpara University of Agriculture, Umudike"
        width="54"
        height="54"
      />
      {includeUndp && (
        <>
          <span className="logo-divider h-[27px] w-px bg-current opacity-45 max-[800px]:h-[26px]" aria-hidden="true" />
          <img
            className="undp-header-logo h-[80px] w-[66px] object-contain max-[800px]:h-[41px] max-[800px]:w-[50px]"
            src="/assets/undp-logo.png"
            alt="United Nations Development Programme"
            width="66"
            height="80"
          />
        </>
      )}
    </Link>
  );
}

export function Header({ inner = false }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.key]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  return (
    <header
      ref={header}
      id="top"
      tabIndex={-1}
      className={`site-header absolute inset-x-0 top-0 z-[5] flex h-[82px] items-center justify-between border-b border-white/20 px-[max(32px,calc((100vw-1200px)/2))] text-white max-[900px]:h-[70px] max-[900px]:px-5${inner ? " inner relative border-line bg-paper text-ink" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a className="absolute -top-[100px] left-4 z-20 bg-gold p-2.5 text-[15px] font-bold text-ink focus:top-4" href="#main">
        Skip to main content
      </a>
      <Brand includeUndp />
      <button
        ref={toggle}
        className="menu-toggle hidden cursor-pointer gap-[5px] border-0 bg-transparent p-[7px] max-[900px]:grid max-[900px]:h-11 max-[900px]:w-11 max-[900px]:content-center max-[900px]:justify-items-center max-[900px]:p-[11px]"
        onClick={() => setOpen(!open)}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        <span className={`block h-px w-[22px] ${inner ? "bg-ink" : "bg-white"}`} />
        <span className={`block h-px w-[22px] ${inner ? "bg-ink" : "bg-white"}`} />
      </button>
      <nav
        id="site-nav"
        aria-label="Main navigation"
        className={`site-nav flex items-center gap-[26px] max-[1050px]:gap-[15px] max-[900px]:absolute max-[900px]:top-[70px] max-[900px]:right-0 max-[900px]:left-0 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-1 max-[900px]:border-t max-[900px]:border-white/20 max-[900px]:bg-blue max-[900px]:px-5 max-[900px]:py-[18px] max-[900px]:max-h-[calc(100svh-70px)] max-[900px]:overflow-y-auto ${open ? "open max-[900px]:flex" : "max-[900px]:hidden"}`}
      >
        {nav.map(([label, url]) => (
          <NavLink
            key={url}
            to={url}
            className={`text-[13px] font-semibold text-white no-underline max-[900px]:flex max-[900px]:min-h-11 max-[900px]:items-center max-[900px]:text-[15px] ${inner ? "text-ink aria-[current=page]:text-blue aria-[current=page]:underline aria-[current=page]:underline-offset-[5px] max-[900px]:text-white max-[900px]:aria-[current=page]:text-white" : ""}`}
            aria-current={
              url === "/facilities" && location.pathname === "/facility-tour"
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link className={`nav-cta border px-3.5 py-2.5 ml-1.5 max-[900px]:mx-0 max-[900px]:mt-2 max-[900px]:flex max-[900px]:justify-between ${inner ? "border-ink max-[900px]:border-white/50" : "border-white/50"}`} to="/contact" onClick={() => setOpen(false)}>
          Contact us <b className={`ml-2 ${inner ? "text-blue max-[900px]:text-gold" : "text-gold"}`} aria-hidden="true">↗</b>
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const { data } = useContent();
  const settings = data?.settings || {};
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer bg-[#070d14] text-white selection:bg-gold selection:text-ink border-t border-white/10" aria-labelledby="site-footer-heading">
      {/* Top 3-Column Wireframe Section */}
      <div className="site-container pt-14 pb-16 max-[900px]:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15 border-y border-white/15 relative">
          
          {/* Subtle crosshair tick marks at division intersections (as in inspiration) */}
          <span className="hidden md:block absolute -top-[5px] left-1/3 -translate-x-1/2 text-white/30 font-mono text-[10px] pointer-events-none select-none">+</span>
          <span className="hidden md:block absolute -bottom-[6px] left-1/3 -translate-x-1/2 text-white/30 font-mono text-[10px] pointer-events-none select-none">+</span>
          <span className="hidden md:block absolute -top-[5px] left-2/3 -translate-x-1/2 text-white/30 font-mono text-[10px] pointer-events-none select-none">+</span>
          <span className="hidden md:block absolute -bottom-[6px] left-2/3 -translate-x-1/2 text-white/30 font-mono text-[10px] pointer-events-none select-none">+</span>

          {/* Column 1: CONTACT */}
          <div className="py-8 md:py-10 md:pr-10 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#8ea4b8] mb-8">
                CONTACT
              </span>
              <div className="space-y-2 text-[15px] font-medium">
                {settings.email ? (
                  <div>
                    <a href={`mailto:${settings.email}`} className="text-white hover:text-gold transition-colors no-underline">
                      {settings.email}
                    </a>
                  </div>
                ) : (
                  <div>
                    <a href="mailto:contact@manutech-unipod.edu.ng" className="text-white hover:text-gold transition-colors no-underline">
                      contact@manutech-unipod.edu.ng
                    </a>
                  </div>
                )}
                <div>
                  <Link to="/contact" className="text-[#9ab1c6] hover:text-white transition-colors no-underline">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-[#8ea4b8] space-y-1">
              <p className="m-0 leading-relaxed font-sans">
                Manu-Tech UniPod · MOUAU
              </p>
              <p className="m-0 leading-relaxed text-[#6f8294]">
                Umudike, Abia State, Nigeria
              </p>
              <Link to="/about" className="inline-flex items-center gap-1.5 text-gold hover:text-white pt-2 text-[13px] font-semibold no-underline transition-colors">
                Learn more <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Column 2: CONNECT */}
          <div className="py-8 md:py-10 md:px-10 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#8ea4b8] mb-8">
                CONNECT
              </span>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[14px]">
                {nav.slice(0, 6).map(([label, url]) => (
                  <Link
                    key={url}
                    to={url}
                    className="text-white/85 hover:text-gold transition-colors no-underline"
                  >
                    {label}
                  </Link>
                ))}
                <Link to="/facility-tour" className="text-white/85 hover:text-gold transition-colors no-underline">
                  Visit
                </Link>
                <Link to="/news" className="text-white/85 hover:text-gold transition-colors no-underline">
                  News & Impact
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#8ea4b8] mb-3">
                Key Partners
              </span>
              <PartnerLogos className="gap-2.5 opacity-80 hover:opacity-100 transition-opacity" includeMouau variant="footer" />
            </div>
          </div>

          {/* Column 3: SUBSCRIBE */}
          <div className="py-8 md:py-10 md:pl-10 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#8ea4b8] mb-8">
                SUBSCRIBE
              </span>
              <p className="text-xs text-[#8ea4b8] mb-6 leading-relaxed">
                Stay updated with innovations, bootcamp cohorts, and prototyping workshops.
              </p>
              {subscribed ? (
                <div className="py-3 px-4 rounded bg-blue-deep/60 border border-gold/40 text-gold text-xs font-mono">
                  ✓ Thank you for subscribing.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/30 focus-within:border-gold transition-colors pb-2">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-transparent text-[14px] text-white placeholder:text-[#5f7488] focus:outline-none pr-8 py-1 font-sans"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold cursor-pointer transition-colors p-1"
                  >
                    →
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#8ea4b8]">
              <span>Need bespoke support?</span>
              <Link to="/contact" className="text-gold hover:text-white font-medium no-underline transition-colors">
                Enquire now ↗
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Hero Typography Banner: White UNIPOD Wordmark with prominent Yellow Dot */}
      <div className="site-container select-none border-b border-white/10 pt-12 pb-6 text-center">
        <h2
          id="site-footer-heading"
          className="text-center font-extrabold uppercase tracking-tight text-white leading-[1] mb-0 text-[clamp(64px,16.5vw,230px)] select-none inline-block relative overflow-visible"
        >
          UN<span className="relative inline-block overflow-visible">I<span className="absolute left-1/2 -translate-x-1/2 -top-[0.28em] w-[0.26em] h-[0.26em] rounded-full bg-[#f6b800] ring-2 ring-black/40 block pointer-events-none z-10" aria-hidden="true" /></span>POD
        </h2>
      </div>

      {/* Bottom Bar: Copyright, Privacy, and Credits */}
      <div className="site-container py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-wide text-[#708497]">
        <span>© {new Date().getFullYear()} MANU-TECH UNIPOD</span>
        <div className="flex items-center gap-6">
          <Link to="/about" className="hover:text-white transition-colors no-underline">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors no-underline">
            Contact
          </Link>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("top")?.focus({ preventScroll: true });
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              });
            }}
            className="hover:text-gold transition-colors no-underline inline-flex items-center gap-1.5"
          >
            Back to top ↑
          </a>
        </div>
        <span className="max-[600px]:w-full text-right max-[600px]:text-left text-[#5b6e80]">
          MOUAU · Umudike
        </span>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isTransparentHeader =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/programs" ||
    pathname === "/facilities" ||
    pathname === "/team";
  return (
    <>
      <Header inner={!isTransparentHeader} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <RouteEffects />
    </>
  );
}
