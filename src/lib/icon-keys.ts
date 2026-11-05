/**
 * Icon names the CMS may reference. Content stores a key; the UI resolves it to a
 * Lucide component in `@/components/common/icon-map`. Keep both lists in sync.
 */
export const ICON_KEYS = [
  "Activity", "Award", "BadgeCheck", "BadgePercent", "Banknote", "BookOpen", "Briefcase", "Building2",
  "Calendar", "CalendarCheck", "CalendarCheck2", "Car", "CheckCircle", "Clock", "Coins", "Compass", "Cpu",
  "CreditCard", "Eye", "FileCheck", "FileCode", "FileSpreadsheet", "Globe", "Handshake", "Headset", "Home",
  "Hotel", "Key", "Laptop", "Layers", "LifeBuoy", "Lock", "Mail", "MapPin", "Newspaper", "Percent", "PhoneCall",
  "Plane", "QrCode", "Search", "ShieldAlert", "ShieldCheck", "Smartphone", "Sparkles", "Tag", "Target", "Timer",
  "TrendingDown", "TrendingUp", "Users", "Utensils", "Wallet", "Workflow", "Zap",
  "Github", "XSocial", "Linkedin",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];
