"use client";

import { createContext, useContext, type ReactNode } from "react";
import { siteConfig } from "@/config/site";

export interface ShareDefaults {
  siteName: string;
  defaultImage: string;
  /** Share image per API product slug. */
  catalogImages: Record<string, string>;
}

const ShareContext = createContext<ShareDefaults>({ siteName: siteConfig.name, defaultImage: "/images/og/hero_flight.jpg", catalogImages: {} });

/** Gives client components (API cards, product header) the share defaults the server resolved. */
export function ShareProvider({ value, children }: { value: ShareDefaults; children: ReactNode }) {
  return <ShareContext.Provider value={value}>{children}</ShareContext.Provider>;
}

export const useShareDefaults = () => useContext(ShareContext);
