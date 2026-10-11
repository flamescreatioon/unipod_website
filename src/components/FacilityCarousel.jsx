import React, { useEffect, useState, useRef } from "react";

export const FACILITY_IMAGES = [
  { src: "/assets/facility/P1079635.jpg", alt: "Photography and Video Studio" },
  { src: "/assets/facility/P1079638.jpg", alt: "Recording Room and Radio Station" },
  { src: "/assets/facility/P1079639.jpg", alt: "Recording Room and Radio Station" },
  { src: "/assets/facility/P1079652.jpg", alt: "Music Studio and Recording Studio" },
  { src: "/assets/facility/P1079655.jpg", alt: "Agritech and Food Lab" },
  { src: "/assets/facility/P1079657.jpg", alt: "Prototype Lab" },
  { src: "/assets/facility/P1079664.jpg", alt: "Design Studio" },
  { src: "/assets/facility/P1079669.jpg", alt: "Woodworks Workshop" },
  { src: "/assets/facility/P1079674.jpg", alt: "Metalwork and CNC Workshop" },
  { src: "/assets/facility/P1079694.jpg", alt: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079695.jpg", alt: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079696.jpg", alt: "Renewable Energy & Power Engineering Lab" },
  { src: "/assets/facility/P1079699.jpg", alt: "Prototype Lab" },
];

function getRandomIndex(excludeIndex, length) {
  if (length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * length);
  } while (next === excludeIndex);
  return next;
}

export default function FacilityCarousel({ intervalMs = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * FACILITY_IMAGES.length)
  );
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    // Preload all facility images so transitions are seamless
    FACILITY_IMAGES.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => getRandomIndex(prev, FACILITY_IMAGES.length));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className="facility-carousel absolute inset-0 overflow-hidden" aria-hidden="true">
      {FACILITY_IMAGES.map((img, idx) => (
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
