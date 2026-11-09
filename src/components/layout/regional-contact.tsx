import { MapPin, Phone } from "lucide-react";
import { PhoneLink, PhoneLinkFallback } from "@/components/layout/phone-link";
import { getVisitorRegion } from "@/services/server/visitor-region";

/**
 * Office details chosen from the visitor's country (Bangladesh, Middle East,
 * everyone else; editable under Site settings in the admin). They read request
 * headers, so each is rendered inside its own <Suspense> with the matching
 * fallback below; the header and footer around them stay static.
 */

export async function RegionalPhone() {
  const region = await getVisitorRegion();
  return <PhoneLink phone={region.phone} href={region.phoneHref} label={region.label} />;
}

export { PhoneLinkFallback as RegionalPhoneFallback };

export async function RegionalAddress() {
  const region = await getVisitorRegion();
  return (
    <>
      <div className="flex items-start gap-2">
        <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
        <span>
          <span className="block font-medium text-navy-200">{region.label}</span>
          {region.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="size-3.5 shrink-0 text-primary" />
        <a href={region.phoneHref} className="hover:text-white transition-colors">
          {region.phone}
        </a>
      </div>
    </>
  );
}

export function RegionalAddressFallback() {
  return <div className="min-h-[4.5rem]" aria-hidden />;
}
