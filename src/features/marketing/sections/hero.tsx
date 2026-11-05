import { Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/common/container";
import { heroHighlights } from "@/constants/marketing";
import { HeroOverlaySlider } from "./hero-overlay-slider";

export function Hero() {
  return (
    <div className="relative w-full">
      {/* Cinematic Hero Overlay Slider inspired by impressivebd.com */}
      <HeroOverlaySlider />

      {/* Trust & Highlights Ribbon */}
      <div className="hidden border-b bg-card/70 py-3.5 backdrop-blur-sm sm:block">
        <Container className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500" aria-hidden />
            <span>Partner API</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs sm:text-sm text-foreground/85">
            {heroHighlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 font-medium">
                <Check className="size-3.5 sm:size-4 text-emerald-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
