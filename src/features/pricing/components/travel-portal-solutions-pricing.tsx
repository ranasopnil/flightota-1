import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imageSrc } from "@/lib/image-src";
import { badgeToneClasses } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { PortalPackage, SectionCopy } from "@/types/pages";

export function TravelPortalSolutionsPricing({ packages: portalPackages, header }: { packages: PortalPackage[]; header: SectionCopy }) {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">{header.eyebrow}</span>
        <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {header.title}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {header.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {portalPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col justify-between overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:border-primary/50 "
          >
            {/* Image Header */}
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={imageSrc(pkg.image)}
                alt={pkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className={cn("font-semibold text-xs border", badgeToneClasses[pkg.badgeTone])}>
                  {pkg.badge}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs text-white/80 font-medium">{pkg.tagline}</div>
                <h3 className="font-heading text-lg font-bold">{pkg.title}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-baseline gap-1.5 pb-4 border-b">
                  <span className="font-heading text-3xl font-extrabold text-foreground">{pkg.price}</span>
                  <span className="text-xs text-muted-foreground">{pkg.period}</span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85">
                      <Check className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button asChild className="w-full rounded-lg gap-1.5" variant={pkg.featured ? "default" : "outline"}>
                  <Link href={pkg.cta.href}>
                    <span>{pkg.cta.label}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
