"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation: edge-to-edge tabs on phones, with the chosen tab always scrolled fully into view. */
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  // While a clicked section scrolls into place, passing sections must not take over the highlight.
  const clickedUntil = useRef(0);

  // The active section is the last one whose top has passed just below the sticky bars.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      if (Date.now() < clickedUntil.current) return;
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // Scrolls only the tab row, never the page.
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !tab) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="On this page" className="sticky top-14 z-30 border-b border-border/80 bg-background lg:top-16">
      <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <ul ref={listRef} className="scrollbar-none relative flex w-full overflow-x-auto scroll-smooth">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex-auto shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => {
                    clickedUntil.current = Date.now() + 1200;
                    setActive(s.id);
                  }}
                  className={cn(
                    "relative flex h-11 items-center justify-center whitespace-nowrap px-3.5 text-sm font-medium transition-colors",
                    "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full",
                    isActive ? "font-semibold text-primary after:bg-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
