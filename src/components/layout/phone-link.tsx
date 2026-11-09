import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const linkClass = "hidden sm:inline-flex items-center gap-1.5 font-medium text-slate-200 hover:text-white transition-colors group";

/** Top-bar phone link. The office whose number is shown is picked on the server (RegionalPhone). */
export function PhoneLink({ phone, href, label }: { phone: string; href: string; label?: string }) {
  return (
    <a href={href} className={linkClass} aria-label={label ? `Call our ${label}` : "Direct support line"} title={label}>
      <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
        <Phone className="size-2.5" />
      </span>
      <span>{phone}</span>
    </a>
  );
}

/** Same footprint as the link while the office is being resolved, so the bar does not shift. */
export function PhoneLinkFallback() {
  return <span className={cn(linkClass, "min-w-[8.5rem]")} aria-hidden />;
}
