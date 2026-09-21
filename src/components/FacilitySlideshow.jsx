import React, { useEffect, useMemo, useState } from "react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "../lib/sanity";

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

export default function FacilitySlideshow({
  slides = [],
  intervalSeconds = 7,
}) {
  const validSlides = useMemo(
    () =>
      slides
        .map((slide) => ({ ...slide, src: imageUrl(slide?.image) }))
        .filter((slide) => slide.src),
    [slides],
  );
  const slideKey = validSlides.map((slide) => slide.src).join("|");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setIndex(0), [slideKey]);
  useEffect(() => {
    if (paused || hovered || validSlides.length < 2) return undefined;
    const delay = Math.max(3, Number(intervalSeconds) || 7) * 1000;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % validSlides.length),
      delay,
    );
    return () => window.clearInterval(timer);
  }, [hovered, intervalSeconds, paused, validSlides.length]);

  if (!validSlides.length)
    return <div className="absolute inset-0 scale-[1.02] bg-[url('/assets/manutech-lab-hero.webp')] bg-cover bg-center brightness-[.62] max-[800px]:bg-[url('/assets/manutech-lab-hero-mobile.webp')] max-[800px]:bg-[position:70%_center]" aria-hidden="true" />;

  const slide = validSlides[index % validSlides.length];
  const move = (direction) =>
    setIndex(
      (current) =>
        (current + direction + validSlides.length) % validSlides.length,
    );

  return (
    <div
      className="absolute inset-0 min-h-[670px] overflow-hidden bg-[#12232d] max-[800px]:relative max-[800px]:inset-auto max-[800px]:h-[350px] max-[800px]:min-h-[350px]"
      aria-label="Facility images"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setHovered(false);
      }}
    >
      <img
        className="absolute inset-0 h-full w-full animate-[facility-slide-in_.45s_ease_both] object-cover motion-reduce:animate-none"
        key={slide.src}
        src={slide.src}
        alt={slide.image.alt || slide.caption || "Manu-Tech UniPod facility"}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,.58))]" aria-hidden="true" />
      <div className="absolute right-7 bottom-6 left-7 flex items-end justify-between gap-4 text-white max-[800px]:right-5 max-[800px]:bottom-5 max-[800px]:left-5">
        <div className="flex min-w-0 items-end gap-4" aria-live="polite">
          {slide.caption && <p className="m-0 max-w-[60%] text-sm max-[800px]:max-w-[55%]">{slide.caption}</p>}
          {validSlides.length > 1 && (
            <span className="whitespace-nowrap text-xs tracking-[.08em]">
              {index + 1} / {validSlides.length}
            </span>
          )}
        </div>
        {validSlides.length > 1 && (
          <div className="flex gap-2">
            <button
              className="h-10 w-10 cursor-pointer border border-white/60 bg-black/35 text-white hover:bg-gold hover:text-[#12232d] focus-visible:bg-gold focus-visible:text-[#12232d]"
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous facility image"
            >
              ←
            </button>
            <button
              className="h-10 w-10 cursor-pointer border border-white/60 bg-black/35 text-white hover:bg-gold hover:text-[#12232d] focus-visible:bg-gold focus-visible:text-[#12232d]"
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={
                paused ? "Play facility slideshow" : "Pause facility slideshow"
              }
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
            <button
              className="h-10 w-10 cursor-pointer border border-white/60 bg-black/35 text-white hover:bg-gold hover:text-[#12232d] focus-visible:bg-gold focus-visible:text-[#12232d]"
              type="button"
              onClick={() => move(1)}
              aria-label="Next facility image"
            >
              →
            </button>
          </div>
        )}
      </div>
      {validSlides.length > 1 && (
        <div className="absolute right-7 bottom-[78px] flex gap-[7px] max-[800px]:right-5 max-[800px]:bottom-[74px]" aria-label="Choose facility image">
          {validSlides.map((item, dotIndex) => (
            <button
              key={item.src}
              type="button"
              className={`h-[9px] w-[9px] cursor-pointer rounded-full border border-white p-0 opacity-80 hover:bg-gold hover:opacity-100 focus-visible:bg-gold focus-visible:opacity-100 ${dotIndex === index ? "bg-gold opacity-100" : "bg-transparent"}`}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show facility image ${dotIndex + 1}`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
