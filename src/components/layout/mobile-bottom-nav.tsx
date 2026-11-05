"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/common/icon-map";
import { cn } from "@/lib/utils";
import type { MobileTab } from "@/types/pages";

const tabClass = "flex h-16 min-w-0 flex-col items-center justify-center gap-1 px-0 touch-manipulation select-none transition-colors";

export function isTabActive(tab: MobileTab, pathname: string) {
  if (tab.exact) return pathname === tab.href;
  return pathname.startsWith(tab.href) || (tab.prefixes ?? []).some((p) => pathname.startsWith(p));
}

/** The app-style tab bar on phones and tablets. "More" opens the full menu. */
export function MobileBottomNav({ tabs, onOpenMenu, className }: { tabs: MobileTab[]; onOpenMenu?: () => void; className?: string }) {
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
        const active = isTabActive(tab, pathname);
        return (
          <Link key={tab.href} href={tab.href} aria-current={active ? "page" : undefined} className={cn(tabClass, active ? "font-semibold text-primary" : "text-muted-foreground")}>
            <Icon name={tab.icon} className={cn("size-5", active ? "stroke-[2.3]" : "stroke-[1.8]")} />
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
