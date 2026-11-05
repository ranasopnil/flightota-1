import {
  Activity, Award, BadgeCheck, BadgePercent, Banknote, BookOpen, Briefcase, Building2, Calendar, CalendarCheck,
  CalendarCheck2, Car, CheckCircle, Clock, Coins, Compass, Cpu, CreditCard, Eye, FileCheck, FileCode, FileSpreadsheet,
  Globe, Handshake, Headset, Home, Hotel, Key, Laptop, Layers, LifeBuoy, Lock, Mail, MapPin, Newspaper, Percent,
  PhoneCall, Plane, QrCode, Search, ShieldAlert, ShieldCheck, Smartphone, Sparkles, Tag, Target, Timer, TrendingDown,
  TrendingUp, Users, Utensils, Wallet, Workflow, Zap,
} from "lucide-react";
import { createElement, type ComponentType } from "react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/common/social-icons";
import type { IconKey } from "@/lib/icon-keys";

export type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

/** Every icon the CMS can reference, by key. Importable from server and client components. */
export const ICONS: Record<IconKey, IconComponent> = {
  Activity, Award, BadgeCheck, BadgePercent, Banknote, BookOpen, Briefcase, Building2, Calendar, CalendarCheck,
  CalendarCheck2, Car, CheckCircle, Clock, Coins, Compass, Cpu, CreditCard, Eye, FileCheck, FileCode, FileSpreadsheet,
  Globe, Handshake, Headset, Home, Hotel, Key, Laptop, Layers, LifeBuoy, Lock, Mail, MapPin, Newspaper, Percent,
  PhoneCall, Plane, QrCode, Search, ShieldAlert, ShieldCheck, Smartphone, Sparkles, Tag, Target, Timer, TrendingDown,
  TrendingUp, Users, Utensils, Wallet, Workflow, Zap,
  Github: GithubIcon,
  XSocial: XIcon,
  Linkedin: LinkedinIcon,
};

/** Resolve a CMS icon key; unknown keys fall back to a sparkle so bad data never crashes a page. */
export function resolveIcon(key: string | undefined, fallback: IconComponent = Sparkles): IconComponent {
  return (key && (ICONS as Record<string, IconComponent>)[key]) || fallback;
}

/** Renders an icon by key. */
export function Icon({ name, className, fallback }: { name: string | undefined; className?: string; fallback?: IconComponent }) {
  return createElement(resolveIcon(name, fallback), { className, "aria-hidden": true });
}
