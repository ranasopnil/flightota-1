import { Suspense } from "react";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { WhatsAppButton } from "@/components/common/whatsapp-button";

/**
 * Bottom-right stack of floating controls: back-to-top above the WhatsApp
 * button, so the two never overlap. On phones the stack sits above the bottom
 * navigation, moves up while an API detail page shows its sticky "Get key" bar
 * (.mobile-sticky-action) and hides while the API comparison tray
 * (.compare-tray) is open; on desktop it stays in the corner.
 */
export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 flex flex-col items-end gap-3 lg:right-6 lg:bottom-6 [body:has(.mobile-sticky-action)_&]:bottom-[calc(8rem+env(safe-area-inset-bottom,0px))] lg:[body:has(.mobile-sticky-action)_&]:bottom-6 [body:has(.compare-tray)_&]:hidden lg:[body:has(.compare-tray)_&]:flex">
      <ScrollToTop />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </div>
  );
}
