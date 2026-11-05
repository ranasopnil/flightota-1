import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/common/icon-map";
import { PageHero } from "@/components/common/page-hero";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import type { HeroAction, HeroCopy, MetricPill } from "@/types/pages";

export const heroOutlineButtonClass = "rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md";
const heroPrimaryButtonClass = "rounded-lg text-xs font-semibold h-7";

/** The pills under a page hero. */
export function HeroMetrics({ metrics }: { metrics: MetricPill[] }) {
  return (
    <>
      {metrics.map((m) => (
        <span
          key={m.text}
          className={cn("rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 backdrop-blur-md", m.accent ? "font-mono font-semibold text-emerald-400" : "text-slate-200")}
        >
          {m.text}
        </span>
      ))}
    </>
  );
}

/** Hero buttons plus the share dialog for `path`. */
export function HeroActions({ actions, path, share, children }: { actions: HeroAction[]; path?: string; share?: { title?: string; description?: string }; children?: ReactNode }) {
  return (
    <>
      {actions.map((a) => (
        <Button
          key={`${a.href}-${a.label}`}
          asChild
          size="sm"
          variant={a.variant === "outline" ? "outline" : "default"}
          className={a.variant === "outline" ? heroOutlineButtonClass : heroPrimaryButtonClass}
        >
          <Link href={a.href}>
            {a.icon && <Icon name={a.icon} className="size-3 mr-1" />}
            {a.label}
          </Link>
        </Button>
      ))}
      {children}
      {path && <ShareEmbedModal path={path} title={share?.title} description={share?.description} size="sm" variant="outline" className={heroOutlineButtonClass} />}
    </>
  );
}

/** A page hero rendered from CMS copy. */
export function CmsPageHero({ hero, path, share, children }: { hero: HeroCopy; path?: string; share?: { title?: string; description?: string }; children?: ReactNode }) {
  return (
    <PageHero
      eyebrow={
        hero.eyebrowIcon ? (
          <>
            <Icon name={hero.eyebrowIcon} className="size-3 text-brand-300" />
            {hero.eyebrow}
          </>
        ) : (
          hero.eyebrow
        )
      }
      badge={hero.badge}
      title={hero.title}
      description={hero.description}
      image={imageSrc(hero.image)}
      metrics={hero.metrics.length ? <HeroMetrics metrics={hero.metrics} /> : undefined}
      actions={<HeroActions actions={hero.actions} path={path} share={share} />}
    >
      {children}
    </PageHero>
  );
}
