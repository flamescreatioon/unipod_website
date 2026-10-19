import React from "react";
import { partnerLogos } from "../data/siteData";

export default function PartnerLogos({ className = "", includeMouau = true, variant = "default" }) {
  const logos = includeMouau
    ? [
        ...partnerLogos,
        {
          name: "Michael Okpara University of Agriculture, Umudike",
          shortName: "MOUAU",
          src: "/assets/mouau-mark.webp",
        },
      ]
    : partnerLogos;
  return (
    <div className={`flex flex-wrap items-center ${className}`} aria-label="Our partners">
      {logos.map(({ name, shortName, src }) => (
        <img
          key={name}
          className={`block max-w-full object-contain object-center ${variant === "marks" ? `h-[46px] ${shortName.toLowerCase() === "abia state government" ? "w-[50px]" : "w-[88px]"}` : variant === "page" ? `h-[70px] w-[150px] border border-line bg-white p-[9px] ${shortName.toLowerCase() === "abia state government" ? "w-[70px]" : ""} ${shortName.toLowerCase() === "tetfund" ? "bg-[#123e2c]" : ""}` : variant === "footer" ? `h-10 w-[68px] rounded-[3px] bg-white p-[5px] ${shortName.toLowerCase() === "abia state government" || shortName === "MOUAU" ? "w-10" : ""} ${shortName.toLowerCase() === "tetfund" ? "bg-[#123e2c]" : ""}` : ""}`}
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          width="150"
          height="70"
          title={name}
        />
      ))}
    </div>
  );
}
