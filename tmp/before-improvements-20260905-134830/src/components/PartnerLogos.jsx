import React from "react";
import { partnerLogos } from "../data/siteData";

export default function PartnerLogos({ className = "", includeMouau = false }) {
  const logos = includeMouau
    ? [
        ...partnerLogos,
        {
          name: "Michael Okpara University of Agriculture, Umudike",
          shortName: "MOUAU",
          src: "/assets/mouau-mark.png",
        },
      ]
    : partnerLogos;
  return (
    <div className={`partner-logos ${className}`} aria-label="Our partners">
      {logos.map(({ name, shortName, src }) => (
        <img
          key={name}
          className={`partner-logo partner-logo-${shortName.toLowerCase().replaceAll(" ", "-")}`}
          src={src}
          alt={name}
          title={name}
        />
      ))}
    </div>
  );
}
