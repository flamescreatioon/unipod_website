import React, { useEffect, useState, useRef } from "react";

const HERO_IMAGES = [
  { src: "/assets/hero/reception.jpg", alt: "UniPod Reception area" },
  { src: "/assets/hero/brand_it.jpg", alt: "Brand It design workspace" },
  { src: "/assets/hero/design.jpg", alt: "Design and modeling lab" },
  { src: "/assets/hero/design2.jpg", alt: "Design and prototyping studio" },
  { src: "/assets/hero/laser.jpg", alt: "Laser cutting and fabrication equipment" },
  { src: "/assets/hero/prototype.jpg", alt: "Prototyping equipment and workspace" },
];

function getRandomIndex(excludeIndex, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === excludeIndex);
  return next;
}

export default function HeroCarousel({ intervalMs = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * HERO_IMAGES.length)
  );
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    // Preload all hero images so switches are seamless
    HERO_IMAGES.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => getRandomIndex(prev, HERO_IMAGES.length));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className="hero-carousel absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url('${img.src}')`,
          }}
          role="img"
          aria-label={img.alt}
        />
      ))}
    </div>
  );
}
