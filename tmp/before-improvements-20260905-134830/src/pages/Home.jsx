import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Eyebrow from "../components/Eyebrow";
import PartnerLogos from "../components/PartnerLogos";
import { Footer, Header } from "../components/SiteShell";

const paths = [
  [
    "01",
    "⌁",
    "Skills & bootcamps",
    "Hands-on, intensive learning designed around the tools and problems industry uses.",
    "/programs",
  ],
  [
    "02",
    "◫",
    "Prototype & fabricate",
    "Bring an idea to life with digital design, fabrication equipment and expert guidance.",
    "/facilities",
  ],
  [
    "03",
    "⌬",
    "Incubate an enterprise",
    "Turn a promising solution into a business with mentorship and market connections.",
    "/enterprise",
  ],
  [
    "04",
    "⊞",
    "Partner with purpose",
    "Connect talent, research and opportunity through equipment, expertise or funding.",
    "/#partner",
  ],
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <div
            className="hero-image"
            role="img"
            aria-label="Students working in a manufacturing technology lab"
          />
          <div className="hero-overlay" />
          <div className="blueprint-lines" />
          <div className="hero-content wrap">
            <Eyebrow light>
              Michael Okpara University of Agriculture, Umudike
            </Eyebrow>
            <h1>
              Build what
              <br />
              <em>moves us</em> forward.
            </h1>
            <p className="hero-copy">
              A new kind of maker space for practical skills, industry-ready
              research and ideas that can become real enterprises.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" to="/programs">
                Explore programmes <b>→</b>
              </Link>
              <Link className="text-link light" to="/facility-tour">
                See the facility <b>↗</b>
              </Link>
            </div>
          </div>
          <div className="hero-foot wrap">
            <span>01 / 01</span>
            <span className="scroll-cue">
              SCROLL TO EXPLORE <i />
            </span>
            <span>NIGERIA'S FIRST MANU-TECH UNIPOD</span>
          </div>
        </section>
        <section className="credibility-strip">
          <div className="wrap credibility-grid">
            <div>
              <span className="mini-label">A national initiative</span>
              <strong>
                Nigeria's first
                <br />
                Manu-Tech UniPod
              </strong>
            </div>
            
            <PartnerLogos className="partner-marks" />
          </div>
        </section>
        <section className="intro wrap">
          <div className="section-index">
            01 <i />
          </div>
          <div>
            <Eyebrow>About the UniPod</Eyebrow>
            <h2>
              Where knowledge becomes <em>capability.</em>
            </h2>
          </div>
          <div className="intro-detail">
            <p>
              Manu-Tech UniPod is a manufacturing technology innovation hub
              hosted by MOUAU. We give students, researchers, entrepreneurs and
              industry partners access to the skills, tools and support needed
              to solve tangible problems.
            </p>
            <Link className="text-link" to="/about">
              Learn our story <b>→</b>
            </Link>
          </div>
        </section>
        <section className="pathways">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <Eyebrow>Start here</Eyebrow>
                <h2>
                  Find your <em>pathway.</em>
                </h2>
              </div>
              <p>
                Whether you are building a skill, a prototype or a company,
                there is a place to begin.
              </p>
            </div>
            <div className="pathway-grid">
              {paths.map(([no, icon, title, copy, url], index) => (
                <article
                  key={no}
                  className={`path-card${index === 0 ? " active" : ""}`}
                >
                  <div className="card-top">
                    <span>{no}</span>
                    <span className="card-icon">{icon}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <Link to={url}>
                    Explore <b>→</b>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="facility">
          <div className="facility-photo" />
          <div className="facility-panel">
            <Eyebrow light>The facility</Eyebrow>
            <h2>
              A workshop built for <em>possibility.</em>
            </h2>
            <p>
              Designed for experimenting, making and refining — from first
              sketch to functional prototype.
            </p>
            <ul>
              <li>
                <span>01</span> Digital design &amp; CAD
              </li>
              <li>
                <span>02</span> Prototyping &amp; fabrication
              </li>
              <li>
                <span>03</span> Robotics &amp; electronics
              </li>
              <li>
                <span>04</span> Collaborative project space
              </li>
            </ul>
            <Link className="button button-outline" to="/facility-tour">
              Book a facility visit <b>→</b>
            </Link>
          </div>
        </section>
        <section className="impact wrap">
          <div className="impact-lead">
            <Eyebrow>Built for impact</Eyebrow>
            <h2>
              Ideas with a<br />
              <em>local address.</em>
            </h2>
            <p>
              Our work is grounded in the needs and potential of our region —
              and connected to a national network of innovation.
            </p>
          </div>
          <div className="impact-news">
            <article className="feature-news">
              <span className="tag">FEATURED</span>
              <h3>Manu-Tech UniPod launches at MOUAU</h3>
              <p>
                A new chapter for practical innovation, research
                commercialisation and manufacturing capability in Abia State.
              </p>
              <Link className="text-link" to="/news-impact">
                Read the update <b>→</b>
              </Link>
            </article>
            <div className="news-list">
              <article>
                <span>UPDATES · COMING SOON</span>
                <h3>Training calendar and open calls</h3>
                <Link to="/news-impact">→</Link>
              </article>
              <article>
                <span>FROM THE LAB · COMING SOON</span>
                <h3>Meet the makers building solutions</h3>
                <Link to="/news-impact">→</Link>
              </article>
            </div>
          </div>
        </section>
        <section className="enterprise">
          <div className="wrap enterprise-grid">
            <div>
              <Eyebrow light>Incubation &amp; enterprise</Eyebrow>
              <h2>
                Make a living
                <br />
                from what you <em>make.</em>
              </h2>
            </div>
            <div>
              <p>
                For founders and MSMEs with a problem worth solving, UniPod
                combines practical infrastructure with the relationships that
                help businesses move forward.
              </p>
              <div className="enterprise-points">
                <span>Business incubation</span>
                <span>Industry mentorship</span>
                <span>Market readiness</span>
                <span>Technology transfer</span>
              </div>
              <Link className="button button-gold" to="/#partner">
                Explore partnership <b>→</b>
              </Link>
            </div>
          </div>
        </section>
        <section className="partner wrap" id="partner">
          <div className="section-index">
            02 <i />
          </div>
          <div className="partner-copy">
            <Eyebrow>Partner with us</Eyebrow>
            <h2>
              Progress is a<br />
              <em>team sport.</em>
            </h2>
            <p>
              Partner with a hub positioned at the intersection of
              manufacturing, agriculture, research and young talent.
            </p>
          </div>
          <div className="partner-options">
            {[
              [
                "For industry",
                "Source talent, test ideas and build local capability.",
              ],
              [
                "For development partners",
                "Invest in scalable learning and productive enterprise.",
              ],
              [
                "For researchers",
                "Turn research into prototypes and practical outcomes.",
              ],
            ].map(([title, description]) => (
              <Link key={title} to="/contact">
                <span>{title}</span>
                <b>→</b>
                <small>{description}</small>
              </Link>
            ))}
          </div>
        </section>
        <section className="contact" id="contact">
          <div className="wrap contact-grid">
            <div>
              <Eyebrow light>Get in touch</Eyebrow>
              <h2>
                Let’s make
                <br />
                <em>something happen.</em>
              </h2>
              <p>Tell us what you are looking to build, learn or support.</p>
              <div className="contact-meta">
                <span>UMUDIKE, ABIA STATE</span>
                <span>MICHAEL OKPARA UNIVERSITY OF AGRICULTURE</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
