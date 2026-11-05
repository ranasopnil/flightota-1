import { Suspense, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/common/category-icon";
import { LogoMark } from "@/components/common/logo";
import { StatusBadge } from "@/components/common/status-badge";
import { getSharePage, shareImageForPath, sharePages } from "@/config/share";
import { siteConfig } from "@/config/site";
import { getProduct, listProducts } from "@/services/server/catalog-repository";
import { getEntry, listEntries } from "@/services/server/cms-repository";
import { formatIsoDate } from "@/utils/format";

export async function generateStaticParams() {
  const [products, posts, guidesList, solutions] = await Promise.all([listProducts(), listEntries("blog"), listEntries("guides"), listEntries("solutions")]);

  return [
    ...Object.keys(sharePages).map((path) => ({ slug: path.slice(1).split("/") })),
    ...products.flatMap((p) => [{ slug: ["apis", p.slug] }, { slug: ["documentation", p.slug] }]),
    ...solutions.map((s) => ({ slug: ["solutions", s.slug] })),
    ...posts.map((b) => ({ slug: ["blog", b.slug] })),
    ...guidesList.map((g) => ({ slug: ["guides", g.slug] })),
  ];
}

interface EmbedPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ theme?: string }>;
}

interface EmbedCardProps {
  theme?: string;
  /** Page URL path, used for the link target and the picture. */
  path: string;
  eyebrow: ReactNode;
  title: string;
  description: string;
  cta: string;
  /** Shown on top of the picture. */
  overlay?: ReactNode;
  /** Shown between the text and the footer. */
  children?: ReactNode;
}

function EmbedCard({ theme, path, eyebrow, title, description, cta, overlay, children }: EmbedCardProps) {
  return (
    <div
      className={`w-full max-w-lg overflow-hidden rounded-lg border bg-card text-card-foreground font-sans ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-navy-950">
        <Image
          src={shareImageForPath(path)}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 540px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/95 via-[#070e1b]/50 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
          {overlay ?? (
            <span className="truncate text-[10px] font-mono font-semibold text-white uppercase tracking-wider bg-black/50 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-lg">
              {eyebrow}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>

        {children}

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <a
            href={siteConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <LogoMark className="size-5" />
            <span className="text-[11px] font-semibold text-foreground">{siteConfig.name}</span>
          </a>

          <a
            href={`${siteConfig.url}${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#dc0e18] hover:bg-[#b80b14] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95"
          >
            <span>{cta}</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

async function EmbedContent({ params, searchParams }: EmbedPageProps) {
  const { slug } = await params;
  const { theme } = await searchParams;

  const path = `/${slug.join("/")}`;
  const [type, itemSlug] = slug;

  // Checked first: /apis/compare is a fixed page, not an API called "compare".
  const page = getSharePage(path);
  if (page) {
    return (
      <EmbedCard
        theme={theme}
        path={path}
        eyebrow={siteConfig.name}
        title={page.title}
        description={page.description}
        cta="Open Page"
      />
    );
  }

  if (type === "apis" && itemSlug) {
    const product = await getProduct(itemSlug);
    if (!product) notFound();

    return (
      <EmbedCard
        theme={theme}
        path={`/apis/${product.slug}`}
        eyebrow={product.category}
        title={product.name}
        description={product.tagline}
        cta="Explore API"
        overlay={
          <>
            <div className="flex items-center gap-2">
              <CategoryIcon category={product.category} size="sm" />
              <span className="text-[10px] font-mono font-semibold text-white uppercase tracking-wider bg-black/50 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-lg">
                {product.category}
              </span>
            </div>
            <StatusBadge status={product.status} />
          </>
        }
      >
        <div className="mt-4 grid grid-cols-3 gap-2 border-y py-3 text-center">
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Endpoints</p>
            <p className="mt-0.5 font-mono text-sm font-bold text-foreground">{product.endpoints.length}</p>
          </div>
          <div className="border-x">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">p50 Latency</p>
            <p className="mt-0.5 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {product.latencyP50Ms ? `${product.latencyP50Ms}ms` : "—"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">90d Uptime</p>
            <p className="mt-0.5 font-mono text-sm font-bold text-foreground">
              {product.uptime90d ? `${product.uptime90d}%` : "—"}
            </p>
          </div>
        </div>
      </EmbedCard>
    );
  }

  if (type === "documentation" && itemSlug) {
    const product = await getProduct(itemSlug);
    if (!product) notFound();

    return (
      <EmbedCard
        theme={theme}
        path={`/documentation/${product.slug}`}
        eyebrow="API Reference"
        title={`${product.name} reference`}
        description={`API reference for the ${product.name}: endpoints, parameters, request and response examples, and errors.`}
        cta="Read Docs"
      />
    );
  }

  if (type === "solutions" && itemSlug) {
    const solution = await getEntry("solutions", itemSlug);
    if (!solution) notFound();

    return (
      <EmbedCard
        theme={theme}
        path={`/solutions/${solution.slug}`}
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.description}
        cta="View Solution"
      />
    );
  }

  if (type === "blog" && itemSlug) {
    const post = await getEntry("blog", itemSlug);
    if (!post) notFound();

    return (
      <EmbedCard
        theme={theme}
        path={`/blog/${post.slug}`}
        eyebrow={
          <>
            Blog • <time dateTime={post.publishedAt}>{formatIsoDate(post.publishedAt)}</time> • {post.readingMinutes} min read
          </>
        }
        title={post.title}
        description={post.excerpt}
        cta="Read Article"
      />
    );
  }

  if (type === "guides" && itemSlug) {
    const guide = await getEntry("guides", itemSlug);
    if (!guide) notFound();

    return (
      <EmbedCard
        theme={theme}
        path={`/guides/${guide.slug}`}
        eyebrow={`Integration Guide • ${guide.readingMinutes} min read`}
        title={guide.title}
        description={guide.excerpt}
        cta="Open Guide"
      />
    );
  }

  notFound();
}

export default function EmbedPage(props: EmbedPageProps) {
  return (
    <Suspense fallback={<div className="w-full max-w-lg h-80 rounded-lg border bg-card animate-pulse" />}>
      <EmbedContent {...props} />
    </Suspense>
  );
}
