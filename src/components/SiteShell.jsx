import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { nav } from "../data/siteData";
import PartnerLogos from "./PartnerLogos";
import { ContactDetails } from "../features/content/ContentView";
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
  return (
    <footer className="site-footer bg-[#0b121b] pt-[47px] text-white" aria-labelledby="site-footer-heading">
      <div className="footer-grid site-container grid grid-cols-[1fr_1.4fr_.65fr] gap-20 pb-11 max-[800px]:grid-cols-1 max-[800px]:gap-7 max-[800px]:pb-8">
        <div className="footer-brand">
          <Brand />
          <h2 className="my-7 mb-3.5 max-w-[300px] text-[clamp(28px,3vw,42px)] leading-[1.05] text-white" id="site-footer-heading">Build what moves us forward.</h2>
          <p className="mb-0 max-w-[340px] text-[17px] leading-[1.3] text-[#a2aaa4]">Building practical capability for a more productive future.</p>
          <Link className="footer-cta mt-[18px] inline-flex items-center gap-3 text-[13px] text-[#8dd4f7] no-underline" to="/contact">
            Start an enquiry <b className="text-lg font-normal" aria-hidden="true">→</b>
          </Link>
        </div>
        <div className="footer-info">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[.08em] text-[#a2aaa4]">In partnership with</span>
          <PartnerLogos className="mt-6 gap-[11px]" includeMouau variant="footer" />
          <ContactDetails />
        </div>
        <nav aria-label="Footer navigation" className="footer-links grid gap-2">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[.08em] text-[#a2aaa4]">Explore</span>
          {nav.map(([label, url]) => (
            <Link className="inline-flex min-h-11 items-center text-[14px] text-white no-underline" key={url} to={url}>
              {label}
            </Link>
          ))}
          <Link className="inline-flex min-h-11 items-center text-[14px] text-white no-underline" to="/facility-tour">Plan a visit</Link>
          <Link className="inline-flex min-h-11 items-center text-[14px] text-white no-underline" to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom mx-auto flex w-[calc(100%-4rem)] max-w-[1200px] flex-wrap justify-between gap-2 border-t border-white/15 py-3 font-mono text-[11px] tracking-wide text-[#a2aaa4] site-container">
        <span>© {new Date().getFullYear()} Manu-Tech UniPod · MOUAU</span>
        <span>Umudike, Abia State, Nigeria</span>
        <a
          className="inline-flex min-h-8 items-center gap-2 text-[13px] text-white no-underline max-[800px]:w-full"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("top")?.focus({ preventScroll: true });
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }}
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header inner={pathname !== "/"} />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <RouteEffects />
    </>
  );
}
