"use client";

import { BookOpen, Home, Layers, Menu, Plane } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/", icon: Home, active: (path: string) => path === "/" },
  { label: "APIs", href: "/apis", icon: Layers, active: (path: string) => path.startsWith("/apis") },
  { label: "Docs", href: "/documentation", icon: BookOpen, active: (path: string) => path.startsWith("/documentation") || path.startsWith("/guides") },
  { label: "Airlines", href: "/airlines", icon: Plane, active: (path: string) => path.startsWith("/airlines") },
];

const tabClass = "flex h-16 min-w-0 flex-col items-center justify-center gap-1 px-0 touch-manipulation select-none transition-colors";

/** The app-style tab bar on phones and tablets. "More" opens the full menu. */
export function MobileBottomNav({ onOpenMenu, className }: { onOpenMenu?: () => void; className?: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scrolling down hides the bar; scrolling up, or being near the top, brings it back.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = Math.max(0, window.scrollY);
      const diff = y - lastScrollY.current;
      if (y < 60) setVisible(true);
      else if (diff > 6) setVisible(false);
      else if (diff < -6) setVisible(true);
      if (Math.abs(diff) > 6) lastScrollY.current = y;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Tabs"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 gap-0 border-t px-3 border-border bg-background pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-200 ease-out lg:hidden dark:bg-[#070e1b]",
        !visible && "translate-y-full",
        className,
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.active(pathname);
        return (
          <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined} className={cn(tabClass, active ? "font-semibold text-primary" : "text-muted-foreground")}>
            <Icon className={cn("size-5", active ? "stroke-[2.3]" : "stroke-[1.8]")} aria-hidden />
            <span className="text-[11px] leading-none">{tab.label}</span>
          </Link>
        );
      })}
      <button type="button" onClick={onOpenMenu} className={cn(tabClass, "text-muted-foreground")}>
        <Menu className="size-5 stroke-[1.8]" aria-hidden />
        <span className="text-[11px] leading-none">More</span>
      </button>
    </nav>
  );
}
