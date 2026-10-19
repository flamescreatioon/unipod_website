import React, { useEffect, useMemo, useState, useRef } from "react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "../lib/sanity";

const DEFAULT_FACILITY_SLIDES = [
  { src: "/assets/facility/P1079635.webp", caption: "Photography and Video Studio" },
  { src: "/assets/facility/P1079638.webp", caption: "Recording Room and Radio Station" },
  { src: "/assets/facility/P1079639.webp", caption: "Recording Room and Radio Station" },
  { src: "/assets/facility/P1079652.webp", caption: "Music Studio and Recording Studio" },
  { src: "/assets/facility/P1079655.webp", caption: "Agritech and Food Lab" },
  { src: "/assets/facility/P1079657.webp", caption: "Prototype Lab" },
  { src: "/assets/facility/P1079664.webp", caption: "Design Studio" },
  { src: "/assets/facility/P1079669.webp", caption: "Woodworks Workshop" },
  { src: "/assets/facility/P1079674.webp", caption: "Metalwork and CNC Workshop" },
  { src: "/assets/facility/P1079694.webp", caption: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079695.webp", caption: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079696.webp", caption: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079699.webp", caption: "Prototype Lab" },
];

function imageUrl(image) {
  if (!sanityClient || !image?.asset) return null;
  try {
    return createImageUrlBuilder(sanityClient)
      .image(image)
      .width(1600)
      .height(1000)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function getRandomIndex(excludeIndex, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === excludeIndex);
  return next;
}

export default function FacilitySlideshow({
  slides = [],
  intervalSeconds = 5,
}) {
  const validSlides = useMemo(() => {
    if (slides && slides.length > 0) {
      const cmsSlides = slides
        .map((slide) => ({
          ...slide,
          src: slide.src || imageUrl(slide?.image),
          caption: slide.caption || slide.image?.alt || "",
        }))
        .filter((slide) => slide.src);
      if (cmsSlides.length > 0) return cmsSlides;
    }
    return DEFAULT_FACILITY_SLIDES;
  }, [slides]);

  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * validSlides.length)
  );
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Preload images for smooth transition
  useEffect(() => {
    validSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, [validSlides]);

  // Automatic loop every 5 seconds (uninterrupted)
  useEffect(() => {
    if (validSlides.length < 2) return undefined;
    const delay = Math.max(3, Number(intervalSeconds) || 5) * 1000;
    const timer = window.setInterval(() => {
      setIndex((current) => getRandomIndex(current, validSlides.length));
    }, delay);
    return () => window.clearInterval(timer);
  }, [intervalSeconds, validSlides.length]);

  if (!validSlides.length)
    return (
      <div
        className="absolute inset-0 scale-[1.02] bg-[url('/assets/facility/P1079635.webp')] bg-cover bg-center brightness-[.62]"
        aria-hidden="true"
      />
    );

  return (
    <div
      className="absolute inset-0 min-h-[670px] overflow-hidden bg-[#12232d] max-[800px]:relative max-[800px]:inset-auto max-[800px]:h-[350px] max-[800px]:min-h-[350px]"
      aria-label="Facility images"
      aria-hidden="true"
    >
      {/* Seamless crossfading background images */}
      {validSlides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ backgroundImage: `url('${slide.src}')` }}
          role="img"
          aria-label={slide.caption || "Manu-Tech UniPod facility"}
        />
      ))}

      {/* Subtle bottom gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,.58))]"
        aria-hidden="true"
      />
    </div>
  );
}
