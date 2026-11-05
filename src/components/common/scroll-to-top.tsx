"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setVisible(scrollY > 260);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG ring properties
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-label={`Scroll back to top (${Math.round(scrollProgress)}% scrolled)`}
          className={cn(
            // Positioning: floats above bottom navigation on mobile, standard bottom-right on desktop
            "fixed bottom-20 right-3 sm:right-6 lg:bottom-7 lg:right-7 z-40",
            // Button size & shape
            "group flex size-11 items-center justify-center rounded-lg cursor-pointer",
            // Glassmorphism & Elevation
            "bg-background/90 dark:bg-[#070e1b]/90 backdrop-blur-md",
            "border border-border/80 hover:border-primary/50",
            "text-foreground hover:text-primary transition-all duration-200 active:scale-95",
            "select-none"
          )}
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute size-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 40 40">
            {/* Background Track */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="stroke-muted-foreground/20 fill-none"
              strokeWidth="2.5"
            />
            {/* Dynamic Progress Indicator */}
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="stroke-primary fill-none transition-[stroke-dashoffset] duration-100 ease-out"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Upward Arrow Icon */}
          <ArrowUp className="size-4.5 text-foreground group-hover:text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
