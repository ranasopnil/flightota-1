"use client";

import { useEffect, useState, useTransition, Suspense, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/common/logo";

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Track the current full path to detect changes
  const currentPathRef = useRef(`${pathname}${searchParams ? `?${searchParams.toString()}` : ""}`);
  const startTimeRef = useRef<number>(0);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname or searchParams change, keep the overlay up until the new page has painted
  useEffect(() => {
    const newPath = `${pathname}${searchParams ? `?${searchParams.toString()}` : ""}`;

    if (newPath !== currentPathRef.current) {
      currentPathRef.current = newPath;

      if (isLoading) {
        const elapsed = Date.now() - (startTimeRef.current || 0);
        // Enforce a minimum display window (at least 450ms) so there is never an abrupt micro-flicker
        const minDuration = 450;
        const delay = Math.max(minDuration - elapsed, 160);

        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

        hideTimerRef.current = setTimeout(() => {
          // Smoothly scroll to top of the new page before dissolving the loader
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }

          startTransition(() => {
            setIsLoading(false);
          });
        }, delay);
      }
    }
  }, [pathname, searchParams, isLoading]);

  // Safety fallback timeout: auto-hide after 4000ms if navigation is aborted or fails
  useEffect(() => {
    if (!isLoading) return;
    const safetyTimer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 4000);
    return () => clearTimeout(safetyTimer);
  }, [isLoading]);

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Global click & popstate listeners for internal route navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't intercept modified clicks (new tab, etc.)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore anchor jumps, non-HTTP, download, and external target
      if (
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      try {
        const destUrl = new URL(href, window.location.origin);
        const currUrl = new URL(window.location.href);

        // Cross-origin check
        if (destUrl.origin !== currUrl.origin) return;

        // Same page and query check (don't show loader on same-page clicks)
        if (destUrl.pathname === currUrl.pathname && destUrl.search === currUrl.search) {
          return;
        }

        // Record start time & show solid overlay loader immediately over the old page
        startTimeRef.current = Date.now();
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

        startTransition(() => {
          setIsLoading(true);
        });
      } catch {
        // invalid URL, ignore
      }
    };

    const handlePopState = () => {
      // Section links only change the hash, and browsers report that as popstate too.
      if (`${window.location.pathname}?${window.location.search.slice(1)}` === currentPathRef.current) return;
      startTimeRef.current = Date.now();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      startTransition(() => {
        setIsLoading(true);
      });
    };

    // Custom events for programmatic triggers if needed
    const handleStart = () => {
      startTimeRef.current = Date.now();
      setIsLoading(true);
    };
    const handleStop = () => setIsLoading(false);

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("loader:start", handleStart);
    window.addEventListener("loader:stop", handleStop);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("loader:start", handleStart);
      window.removeEventListener("loader:stop", handleStop);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-overlay-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/20 pointer-events-auto select-none"
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          {/* Top animated progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent overflow-hidden pointer-events-none">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent "
            />
          </div>

          {/* Central spinner stack modeled after impressivebd.com */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center size-32">
              {/* Outer dashed spinning circle */}
              <div className="absolute size-28 rounded-full border border-dashed border-primary/40 animate-[spin_9s_linear_infinite]" />

              {/* Orbiting glowing dot */}
              <div className="absolute size-28 animate-[spin_3s_linear_infinite] flex justify-center">
                <span className="size-2.5 rounded-full bg-primary -mt-1 ring-2 ring-primary/25" />
              </div>

              {/* Dual-border spinner */}
              <div className="absolute size-20 rounded-full border-2 border-transparent border-t-primary border-b-primary animate-spin" />

              {/* Pulsing ping ring */}
              <div className="absolute size-14 rounded-full border border-primary/45 animate-ping opacity-40" />

              {/* Scaling logo card */}
              <motion.div
                animate={{ scale: [0.94, 1.05, 0.94] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="relative z-10 flex items-center justify-center size-14 rounded-xl bg-background border border-border/70 backdrop-blur-xs p-2"
              >
                <LogoMark className="size-8" />
              </motion.div>
            </div>
 
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}
