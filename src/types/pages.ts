/**
 * Shapes of the CMS "singleton" documents: one document per page or site-wide
 * area. Everything here is plain JSON (icon keys, tone names, image paths) so
 * the same data can live in the admin database and in `src/content` as fallback.
 */
import type { IconKey } from "@/lib/icon-keys";
import type { BadgeTone } from "@/lib/tones";
import type { ApiGuideBlock } from "./content";
import type { ComparisonGroup, CreditPack, PricingPlan } from "./pricing";

/* ---------- shared building blocks ---------- */

export interface LinkItem {
  label: string;
  href: string;
}

export interface IconLink extends LinkItem {
  icon?: IconKey;
}

export interface SectionCopy {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** A pill under a page hero. `accent` renders in mono emerald. */
export interface MetricPill {
  text: string;
  accent?: boolean;
}

export interface HeroAction extends LinkItem {
  variant?: "primary" | "outline";
  icon?: IconKey;
}

export interface HeroCopy {
  eyebrow: string;
  eyebrowIcon?: IconKey;
  badge?: string;
  title: string;
  description: string;
  image: string;
  metrics: MetricPill[];
  actions: HeroAction[];
}

export interface CtaContent {
  badge: string;
  title: string;
  description: string;
  image: string;
  primary: IconLink;
  secondary: LinkItem;
}

/* ---------- site settings ---------- */

export interface SiteSettings {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  keywords: string[];
  supportEmail: string;
  salesEmail: string;
  phone: string;
  phoneHref: string;
  /** Short office line shown on the contact page. */
  address: string;
  /** Address line shown in the footer. */
  footerAddress: string;
  copyrightYear: number;
  social: { github: string; x: string; linkedin: string };
  /** Defaults for the CTA band; pages override title/description. */
  defaultCta: CtaContent;
}

/** The slice of the settings the client-side header needs. */
export type TopBarSettings = Pick<SiteSettings, "supportEmail" | "phone" | "phoneHref" | "social">;

/* ---------- navigation ---------- */

export interface NavItem {
  title: string;
  subtitle: string;
  href: string;
  icon: IconKey;
  /** Short fact shown next to the title. */
  tag?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface NavMenu {
  id: string;
  label: string;
  href: string;
  /** Path prefixes that mark the menu as active. */
  matches: string[];
  groups: NavGroup[];
  footer: { text: string; label: string; href: string };
}

export interface Announcement {
  id: string;
  badge: string;
  text: string;
  href: string;
}

export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

export interface MobileTab {
  label: string;
  href: string;
  icon: IconKey;
  /** Active only on this exact path. */
  exact?: boolean;
  /** Additional path prefixes that keep the tab active. */
  prefixes?: string[];
}

export interface FooterLinkGroup {
  title: string;
  items: LinkItem[];
}

export interface NavigationContent {
  header: {
    menus: NavMenu[];
    directLinks: LinkItem[];
    signIn: LinkItem;
    cta: LinkItem;
  };
  topBar: {
    announcements: Announcement[];
    currencies: CurrencyOption[];
    quickLinks: IconLink[];
  };
  mobileTabs: MobileTab[];
  footer: {
    statusLine: string;
    newsletterTitle: string;
    newsletterText: string;
    newsletterPerks: { icon: IconKey; text: string }[];
    blurb: string;
    linkGroups: FooterLinkGroup[];
    partnerLabel: string;
    trustBadges: string[];
    legalLinks: LinkItem[];
  };
}

/* ---------- seo ---------- */

export interface PageSeo {
  title: string;
  description: string;
  image: string;
  /** Use `title` as the whole document title, skipping the site name suffix. */
  absoluteTitle?: boolean;
}

export interface SeoContent {
  defaultImage: string;
  /** Fixed-URL pages keyed by path, e.g. "/about". */
  pages: Record<string, PageSeo>;
  /** Share image per API product slug (used by /apis/:slug and /documentation/:slug). */
  catalogImages: Record<string, string>;
}

/* ---------- home ---------- */

export interface HeroSlide {
  id: string;
  division: string;
  badgeTone: BadgeTone;
  tags: string[];
  title: string;
  description: string;
  image: string;
  alt: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  metric: { label: string; value: string };
  accentColor?: string;
}

export interface PartnerApiCard {
  productSlug: string;
  label: string;
  summary: string;
  image: string;
  alt: string;
  icon: IconKey;
}

export interface HomePageContent {
  hero: { slides: HeroSlide[]; highlightsLabel: string; highlights: string[] };
  partnerApis: { header: SectionCopy; cards: PartnerApiCard[]; viewLabel: string; guideLabel: string };
  getStarted: {
    header: SectionCopy;
    image: string;
    imageAlt: string;
    steps: { title: string; text: string }[];
    environments: { name: string; url: string; prefix: string; use: string }[];
    docsCta: LinkItem;
    notes: { title: string; icon: IconKey; items: string[] }[];
  };
  travelSolutions: {
    header: SectionCopy;
    items: { id: string; badge: string; title: string; subtitle: string; description: string; image: string; alt: string; icon: IconKey; features: string[]; cta: LinkItem }[];
  };
  supplierNetwork: {
    header: SectionCopy;
    actions: LinkItem[];
    image: string;
    imageAlt: string;
    facts: { title: string; text: string; icon: IconKey }[];
    tiers: { category: string; count: string; description: string; partners: { name: string; tag: string }[]; image: string; alt: string }[];
  };
  dynamicPackaging: {
    header: SectionCopy;
    highlights: { title: string; text: string; icon: IconKey; tone: BadgeTone }[];
    actions: LinkItem[];
    preview: {
      image: string;
      alt: string;
      badge: string;
      eyebrow: string;
      title: string;
      items: { icon: IconKey; tone: BadgeTone; title: string; subtitle: string; price: string; note: string }[];
      regularLabel: string;
      bundleLabel: string;
      bundlePrice: string;
      footnote: string;
    };
  };
  corporate: {
    header: SectionCopy;
    capabilitiesLabel: string;
    modules: { id: string; tag: string; title: string; subtitle: string; description: string; image: string; alt: string; icon: IconKey; highlights: string[]; cta: LinkItem }[];
  };
  categories: { header: SectionCopy; browseCard: { badge: string; title: string; description: string; linkLabel: string; image: string } };
  stats: { header: SectionCopy; endpointsLabel: string; items: { value: string; label: string }[] };
  developerExperience: { header: SectionCopy; items: { title: string; description: string }[]; actions: LinkItem[] };
  pricingOverview: { header: SectionCopy; planIds: string[]; linkLabel: string };
  testimonials: { header: SectionCopy; items: { quote: string; name: string; role: string; company: string }[] };
  faq: { header: SectionCopy; linkLabel: string; linkHref: string; items: FaqItem[] };
  cta: Partial<CtaContent>;
}

/* ---------- pricing ---------- */

export interface PortalPackage {
  id: string;
  title: string;
  tagline: string;
  price: string;
  period: string;
  badge: string;
  badgeTone: BadgeTone;
  image: string;
  features: string[];
  cta: LinkItem;
  /** Rendered with the primary button. */
  featured?: boolean;
}

export interface PricingContent {
  hero: HeroCopy;
  annualDiscountLabel: string;
  plans: PricingPlan[];
  /** Appended to the enterprise plan description in the enterprise band. */
  enterpriseNote: string;
  creditPacks: CreditPack[];
  creditNote: string;
  comparisonGroups: ComparisonGroup[];
  faqs: FaqItem[];
  portalPackages: PortalPackage[];
  sections: { apiPricing: SectionCopy; wallet: SectionCopy; portal: SectionCopy; compare: SectionCopy; faq: SectionCopy };
  cta: Partial<CtaContent>;
}

/* ---------- about ---------- */

export interface AboutPageContent {
  hero: HeroCopy;
  paradigm: {
    header: SectionCopy;
    legacy: { label: string; title: string; items: string[] };
    modern: { label: string; title: string; items: string[] };
  };
  values: { header: SectionCopy; items: { icon: IconKey; title: string; text: string }[] };
  edge: { header: SectionCopy; nodes: { city: string; region: string; latency: string; role: string; flag: string }[]; onlineLabel: string; routingLabel: string };
  milestones: { header: SectionCopy; items: { year: string; tag: string; title: string; desc: string }[]; shippedLabel: string };
  team: { header: SectionCopy; members: { name: string; role: string; background: string; bio: string; avatar: string }[]; verifiedLabel: string };
  ecosystem: { header: SectionCopy; cards: { image: string; alt: string; eyebrow: string; eyebrowTone: BadgeTone; title: string; text: string; tags: string[] }[] };
  security: { header: SectionCopy; items: { title: string; desc: string; icon: IconKey }[]; auditedLabel: string };
  careers: { badge: string; title: string; text: string; roles: string[]; cta: LinkItem };
  cta: Partial<CtaContent>;
}

/* ---------- contact ---------- */

export interface ContactPageContent {
  hero: HeroCopy;
  channels: { icon: IconKey; title: string; body: string; href?: string }[];
}

/* ---------- airlines page ---------- */

export interface AirlinesPageContent {
  hero: HeroCopy;
  ticker: { label: string; items: string[] };
  metrics: { label: string; value: string; note: string; icon: IconKey; tone: BadgeTone; mono?: boolean }[];
  telemetry: {
    title: string;
    description: string;
    statusLabel: string;
    alliances: { name: string; members: string; icon: IconKey; tone: BadgeTone }[];
    features: string[];
  };
  directory: SectionCopy;
  consolidator: {
    image: string;
    alt: string;
    eyebrow: string;
    title: string;
    text: string;
    bodyEyebrow: string;
    bodyTitle: string;
    bodyText: string;
    features: { title: string; text: string }[];
    footnote: string;
    cta: LinkItem;
  };
  cta: Partial<CtaContent>;
}

/* ---------- solutions pages ---------- */

export interface SolutionsPageContent {
  hero: HeroCopy;
  cardCapabilitiesLabel: string;
  cardCtaLabel: string;
  detail: {
    demoCta: LinkItem;
    pricingCta: LinkItem;
    advantages: SectionCopy;
    lifecycle: SectionCopy;
    specs: SectionCopy & { cta: LinkItem };
    faqLabel: string;
    faqTitle: string;
    /** `{{title}}` is replaced with the solution title. */
    ctaTitleTemplate: string;
    ctaDescription: string;
  };
  cta: Partial<CtaContent>;
}

/* ---------- list pages (blog, guides) ---------- */

export interface ListPageContent {
  hero: HeroCopy;
  /** Thumbnail for entries without an image of their own. */
  defaultImage: string;
  readLabel: string;
}

/* ---------- documentation overview ---------- */

export interface DocsOverviewSection {
  id: string;
  title: string;
  blocks: ApiGuideBlock[];
  /** Interactive part appended after the blocks. */
  widget?: "api-overview" | "code-example";
}

export interface DocsOverviewContent {
  hero: { badge: string; status: string; title: string; description: string; image: string; chips: string[] };
  sections: DocsOverviewSection[];
  apiOverview: { othersLabel: string };
  codeExample: { productSlug: string; endpointId: string; title: string; linkLabel: string; linkHref: string };
  /** Hero image per product on /documentation/:slug. */
  productHeroImages: Record<string, string>;
  defaultProductHeroImage: string;
  referenceHeading: string;
  /** `{{name}}` is replaced with the product name. */
  referenceDescriptionTemplate: string;
}
