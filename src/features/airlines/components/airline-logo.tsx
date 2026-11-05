"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AirlineLogoProps {
  iata: string;
  name: string;
  brandColor?: string;
  brandAccent?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AirlineLogo({
  iata,
  name,
  brandColor = "#dc0e18",
  brandAccent = "#0f1d36",
  className,
  size = "md",
}: AirlineLogoProps) {
  const [imgError, setImgError] = useState(false);
  const [cdnIndex, setCdnIndex] = useState(0);

  // Reliable global airline logo CDNs in priority order
  const sources = [
    `https://images.kiwi.com/airlines/64x64/${iata}.png`,
    `https://pics.avs.io/al_square/64/64/${iata}.png`,
    `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${iata}.svg`,
  ];

  const handleImageError = () => {
    if (cdnIndex < sources.length - 1) {
      setCdnIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  const sizeClasses = {
    sm: "size-9 p-1",
    md: "size-12 p-1.5",
    lg: "size-14 p-2",
  }[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden select-none",
        sizeClasses,
        className
      )}
      title={`${name} (${iata})`}
    >
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sources[cdnIndex]}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="size-full object-contain filter transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        // Fallback Stylized Branded Badge if CDN is unreachable
        <div
          className="flex size-full items-center justify-center rounded-md font-heading font-extrabold text-white text-xs "
          style={{
            background: `linear-gradient(135deg, ${brandColor}, ${brandAccent})`,
          }}
        >
          <span>{iata}</span>
        </div>
      )}
    </div>
  );
}
