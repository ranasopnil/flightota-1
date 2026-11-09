"use client";

import { ArrowRight, ChevronDown, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon-map";
import { Logo } from "@/components/common/logo";
import { TopHeader } from "@/components/layout/top-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { MobileTab, NavItem, NavigationContent, TopBarSettings } from "@/types/pages";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { ThemeToggle } from "./theme-toggle";

type HeaderContent = NavigationContent["header"];

interface SiteHeaderProps {
  header: HeaderContent;
  topBar: NavigationContent["topBar"];
  mobileTabs: MobileTab[];
  settings: TopBarSettings;
  /** Server-rendered phone link for the visitor's office (see the marketing layout). */
  phone?: React.ReactNode;
}

const navItemClass = (active: boolean) =>
  cn(
    "relative inline-flex h-16 cursor-pointer items-center gap-1 px-3 text-[14px] font-medium transition-colors",
    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors",
    active ? "text-foreground after:bg-primary" : "text-muted-foreground after:bg-transparent hover:text-foreground",
  );

function NavLinkCard({ item, onNavigate, compact }: { item: NavItem; onNavigate?: () => void; compact?: boolean }) {
  if (compact) {
    return (
      <Link href={item.href} onClick={onNavigate} className="flex items-center gap-2.5 rounded-md px-1 py-2 text-sm text-foreground active:bg-muted">
        <Icon name={item.icon} className="size-4 shrink-0 text-primary" />
        {item.title}
      </Link>
    );
  }
  return (
    <Link href={item.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/70">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon name={item.icon} className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-foreground">
          {item.title}
          {item.tag && <span className="text-[11px] font-medium text-muted-foreground">{item.tag}</span>}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{item.subtitle}</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ header, topBar, mobileTabs, settings, phone }: SiteHeaderProps) {
  const { menus, directLinks } = header;
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/apis");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const current = menus.find((m) => m.id === activeMenu);

  return (
    <>
      <TopHeader content={topBar} settings={settings} phone={phone} />
      <header
        onMouseLeave={scheduleClose}
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border transition-[background-color,box-shadow] duration-200",
          scrolled || current ? "bg-white/95 backdrop-blur-xl dark:bg-[#0a1326]/95" : "bg-white dark:bg-[#0a1326]",
        )}
      >
        <Container className="flex h-14 items-center gap-3 lg:h-16 lg:gap-4">
          <Logo />

          <nav aria-label="Main" className="ml-4 hidden items-center lg:flex">
            {menus.map((menu) => {
              const open = activeMenu === menu.id;
              return (
                <button
                  key={menu.id}
                  type="button"
                  aria-expanded={open}
                  aria-controls="site-nav-panel"
                  onMouseEnter={() => openMenu(menu.id)}
                  // A keyboard press (detail 0) toggles; a mouse click keeps the hover-opened panel.
                  onClick={(e) => (e.detail === 0 && open ? setActiveMenu(null) : openMenu(menu.id))}
                  className={navItemClass(open || menu.matches.some((m) => pathname.startsWith(m)))}
                >
                  {menu.label}
                  <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden />
                </button>
              );
            })}
            {directLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={scheduleClose}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className={navItemClass(pathname.startsWith(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Button asChild variant="ghost" size="icon" className="rounded-lg" title="Search APIs (⌘K)">
              <Link href="/apis" aria-label="Search APIs">
                <Search className="size-4" />
              </Link>
            </Button>
            <span className="hidden sm:inline-flex">
              <ThemeToggle />
            </span>
            <Button asChild variant="ghost" className="hidden rounded-lg px-3 text-[14px] font-medium sm:inline-flex">
              <Link href={header.signIn.href}>{header.signIn.label}</Link>
            </Button>
            <Button asChild className="hidden rounded-lg px-4 text-[14px] font-semibold sm:inline-flex">
              <Link href={header.cta.href}>
                {header.cta.label}
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-lg sm:hidden">
              <Link href={header.signIn.href} aria-label={header.signIn.label}>
                <UserRound className="size-5" />
              </Link>
            </Button>
          </div>
        </Container>

        {current && (
          <div
            id="site-nav-panel"
            onMouseEnter={keepOpen}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-popover lg:block"
          >
            <Container className="py-6">
              <div className={cn("grid gap-8", current.groups.length === 3 ? "grid-cols-[2fr_1fr_1fr]" : current.groups[0].items.length > 3 ? "grid-cols-[2fr_1fr]" : "grid-cols-2")}>
                {current.groups.map((group, i) => (
                  <div key={group.title} className="min-w-0">
                    <p className="mb-2 px-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{group.title}</p>
                    <div className={cn("grid gap-1", i === 0 && current.groups[0].items.length > 3 && "grid-cols-2")}>
                      {group.items.map((item) => (
                        <NavLinkCard key={item.href} item={item} onNavigate={() => setActiveMenu(null)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                <span>{current.footer.text}</span>
                <Link href={current.footer.href} onClick={() => setActiveMenu(null)} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  {current.footer.label}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </Container>
          </div>
        )}
      </header>

      <MobileDrawer header={header} open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      <MobileBottomNav tabs={mobileTabs} onOpenMenu={() => setMobileMenuOpen(true)} />
    </>
  );
}

function MobileDrawer({ header, open, onOpenChange }: { header: HeaderContent; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { menus, directLinks } = header;
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-[290px] flex-col gap-0 overflow-y-auto p-4 sm:w-[340px]">
        <SheetHeader className="border-b p-0 pb-3 text-left">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1">
          <Accordion type="single" collapsible defaultValue={menus[0]?.id}>
            {menus.map((menu) => (
              <AccordionItem key={menu.id} value={menu.id}>
                <AccordionTrigger className="py-3 text-sm font-semibold hover:no-underline">{menu.label}</AccordionTrigger>
                <AccordionContent className="pb-2">
                  {menu.groups
                    .flatMap((group) => group.items)
                    .map((item) => (
                      <NavLinkCard key={item.href} item={item} onNavigate={close} compact />
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {directLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={close} className="block border-b py-3 text-sm font-semibold last:border-b-0">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 pt-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            Theme
            <ThemeToggle />
          </div>
          <Button asChild className="rounded-lg ">
            <Link href={header.cta.href} onClick={close}>
              {header.cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-lg">
            <Link href={header.signIn.href} onClick={close}>
              {header.signIn.label}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
