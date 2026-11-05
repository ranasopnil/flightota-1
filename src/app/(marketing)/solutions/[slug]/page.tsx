import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Workflow,
  Users,
  Percent,
  Wallet,
  FileCheck,
  Calendar,
  CreditCard,
  Smartphone,
  ShieldAlert,
  CheckCircle,
  FileSpreadsheet,
  MapPin,
  Tag,
  Hotel,
  CalendarCheck,
  Utensils,
  QrCode,
  Cpu,
  Banknote,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/common/page-hero";
import { getSolutionBySlug, travelSolutions } from "@/constants/solutions";
import { pageMetadata } from "@/config/share";
import { ShareEmbedModal } from "@/components/common/share-embed-modal";
import { CtaBand } from "@/features/marketing/sections/cta-band";
import { TravelErpShowcase } from "@/features/solutions/components/travel-erp-showcase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Percent,
  Wallet,
  FileCheck,
  Calendar,
  CreditCard,
  Smartphone,
  ShieldAlert,
  CheckCircle,
  FileSpreadsheet,
  MapPin,
  Tag,
  Hotel,
  CalendarCheck,
  Utensils,
  QrCode,
  Cpu,
  Banknote,
  TrendingUp,
};

function getBenefitIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Sparkles;
}

export async function generateStaticParams() {
  return travelSolutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return pageMetadata({ title: solution.title, description: solution.description, path: `/solutions/${slug}` });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const isErpPage = slug === "travel-erp-backoffice";

  return (
    <>
      {/* Solution Hero */}
      <PageHero
        eyebrow={
          <>
            <Workflow className="size-3 text-brand-300" />
            {solution.eyebrow}
          </>
        }
        badge={solution.badge}
        title={solution.title}
        description={solution.description}
        image={solution.heroImage}
        metrics={
          <>
            {solution.metrics.map((m) => (
              <span
                key={m.label}
                className="rounded-md border border-white/15 bg-slate-900/80 px-2.5 py-0.5 text-xs text-slate-200 backdrop-blur-md"
              >
                {m.label}: <strong className="text-emerald-400 font-mono">{m.value}</strong>
              </span>
            ))}
          </>
        }
        actions={
          <>
            <Button asChild size="sm" className="rounded-lg text-xs font-semibold h-7">
              <Link href="/contact?topic=sales">Book Live Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            >
              <Link href="/pricing#portal-solutions">View Pricing Plans &rarr;</Link>
            </Button>
            <ShareEmbedModal
              title={solution.title}
              description={solution.description}
              path={`/solutions/${slug}`}
              size="sm"
              variant="outline"
              className="rounded-lg text-xs font-semibold h-7 border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            />
          </>
        }
      />

      <Container className="py-10 sm:py-16 space-y-14 sm:space-y-18">
        {/* If Travel ERP Backoffice page, render the rich operational cockpit & modules first */}
        {isErpPage && <TravelErpShowcase />}

        {/* Key Strategic Advantages Grid */}
        <div>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Strategic Advantages</span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for Scale, Automation &amp; Maximum Margin
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Designed around the operational realities of high-volume travel consolidators, online agencies, and corporate TMCs.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solution.keyBenefits.map((benefit) => {
              const Icon = getBenefitIcon(benefit.icon);
              return (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-border/80 bg-card p-5 transition-all hover:border-primary/50"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture & Workflow Lifecycle Steps */}
        <div className="rounded-xl border border-border/80 bg-muted/30 p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">System Lifecycle</span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              End-to-End Operational Workflow
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              From onboarding and rule configuration to real-time execution and automated ledger reconciliation.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solution.architectureSteps.map((step) => (
              <div key={step.step} className="rounded-lg border border-border/70 bg-card p-5 relative overflow-hidden">
                <span className="font-mono text-2xl font-extrabold text-primary/40">{step.step}</span>
                <h3 className="mt-2 font-heading text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Technical Capabilities Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Technical Specifications</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Complete Feature Capabilities Included
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every deployment includes pre-configured integrations, audit logging, security controls, and responsive web management.
            </p>
            <div className="pt-3">
              <Button asChild size="default" className="rounded-lg">
                <Link href="/contact?topic=sales">Talk to a Travel Architect</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-xl border border-border/80 bg-card p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {solution.coreCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="border-t border-border/70 pt-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Frequently Asked Questions</span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Questions About This Solution
            </h2>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {solution.faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border/80 bg-card p-5">
                <div className="flex items-center gap-1.5 text-primary text-xs font-bold mb-2">
                  <HelpCircle className="size-4" />
                  <span>FAQ</span>
                </div>
                <h3 className="font-heading text-sm font-bold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Conversion CTA Band with Proper Spacing */}
      <CtaBand
        title={`Ready to deploy ${solution.title}?`}
        description="Our engineers will configure your sandboxes, supplier adapters, and custom branding within 48 hours."
      />
    </>
  );
}
