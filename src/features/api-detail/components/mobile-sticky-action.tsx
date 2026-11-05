"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileStickyAction({
  slug,
}: {
  slug: string;
  name?: string;
}) {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-14 left-0 right-0 z-30 border-t border-border/80 bg-background/95 p-2.5 backdrop-blur-xl lg:hidden "
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex flex-col min-w-0">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Key className="size-3" />
            <span>Developer Sandbox</span>
          </span>
          <span className="text-xs font-semibold text-foreground truncate">
            5,000 calls / mo Free
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button asChild size="sm" variant="outline" className="h-8 rounded-lg text-xs px-2.5">
            <Link href={`/documentation/${slug}`}>
              <BookOpen className="size-3 mr-1 text-muted-foreground" />
              Docs
            </Link>
          </Button>

          <Button asChild size="sm" className="h-8 rounded-lg text-xs px-3 font-semibold">
            <Link href={`/register?api=${slug}`}>
              <Key className="size-3 mr-1" />
              Get Key
              <ArrowRight className="size-3 ml-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
