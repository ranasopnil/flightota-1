/**
 * Colour "tones" the CMS may pick for badges, chips and icons. Tailwind v4 only
 * emits classes it finds in source, so every class string lives here as a literal.
 */
export const BADGE_TONES = ["primary", "sky", "rose", "indigo", "amber", "emerald", "cyan", "purple"] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

/** Translucent badge on dark imagery (hero slides, portal packages, solution cards). */
export const badgeToneClasses: Record<BadgeTone, string> = {
  primary: "text-brand-200 bg-brand-500/20 border-brand-500/40",
  sky: "text-sky-300 bg-sky-500/20 border-sky-500/40",
  rose: "text-rose-300 bg-rose-500/20 border-rose-500/40",
  indigo: "text-indigo-300 bg-indigo-500/20 border-indigo-500/40",
  amber: "text-amber-300 bg-amber-500/20 border-amber-500/40",
  emerald: "text-emerald-300 bg-emerald-500/20 border-emerald-500/40",
  cyan: "text-cyan-300 bg-cyan-500/20 border-cyan-500/40",
  purple: "text-purple-300 bg-purple-500/20 border-purple-500/40",
};

/** Tinted icon tile on a light card (dynamic packaging highlights, package rows). */
export const chipToneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

/** Small inline icon colour. */
export const iconToneClasses: Record<BadgeTone, string> = {
  primary: "text-primary",
  sky: "text-sky-500",
  rose: "text-rose-500",
  indigo: "text-indigo-500",
  amber: "text-amber-500",
  emerald: "text-emerald-500",
  cyan: "text-cyan-500",
  purple: "text-purple-500",
};

/** Large figure colour (metric cards). */
export const valueToneClasses: Record<BadgeTone, string> = {
  primary: "text-primary",
  sky: "text-sky-600 dark:text-sky-400",
  rose: "text-rose-600 dark:text-rose-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  amber: "text-amber-600 dark:text-amber-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  purple: "text-purple-600 dark:text-purple-400",
};

/** Card hover border colour (metric cards). */
export const hoverBorderToneClasses: Record<BadgeTone, string> = {
  primary: "hover:border-primary/40",
  sky: "hover:border-sky-500/40",
  rose: "hover:border-rose-500/40",
  indigo: "hover:border-indigo-500/40",
  amber: "hover:border-amber-500/40",
  emerald: "hover:border-emerald-500/40",
  cyan: "hover:border-cyan-500/40",
  purple: "hover:border-purple-500/40",
};

/** Eyebrow text colour on a dark image overlay (about ecosystem cards). */
export const eyebrowToneClasses: Record<BadgeTone, string> = {
  primary: "text-brand-300",
  sky: "text-sky-400",
  rose: "text-rose-400",
  indigo: "text-indigo-400",
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  cyan: "text-cyan-400",
  purple: "text-purple-400",
};
