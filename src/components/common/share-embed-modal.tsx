"use client";

import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  ImageIcon,
  Link2,
  Share2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { imageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";
import { useShareDefaults } from "./share-context";

interface ShareEmbedModalProps {
  /** Defaults to the site name; server pages pass the resolved title through `ShareButton`. */
  title?: string;
  description?: string;
  path: string; // e.g. "/apis/air-travel-api" or "/blog/transfer-api-general-availability"
  /** Picture of the link preview. Defaults to the product share image for the path, then the site default. */
  image?: string;
  siteName?: string;
  triggerLabel?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  className?: string;
}

const emptySubscribe = () => () => {};

export function ShareEmbedModal({
  title: titleProp,
  description: descriptionProp,
  path,
  image,
  siteName: siteNameProp,
  triggerLabel = "Share",
  variant = "outline",
  size = "default",
  className,
}: ShareEmbedModalProps) {
  const [open, setOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [embedTheme, setEmbedTheme] = useState<"light" | "dark" | "system">("system");

  const origin = useSyncExternalStore(
    emptySubscribe,
    () => window.location.origin,
    () => siteConfig.url
  );

  const fullUrl = `${origin}${path.startsWith("/") ? path : `/${path}`}`;
  const embedPath = path.startsWith("/embed") ? path : `/embed${path.startsWith("/") ? path : `/${path}`}`;
  const themeParam = embedTheme !== "system" ? `?theme=${embedTheme}` : "";
  const embedUrl = `${origin}${embedPath}${themeParam}`;

  // Same title, text and picture as the page's link preview tags
  const defaults = useShareDefaults();
  const siteName = siteNameProp ?? defaults.siteName;
  const title = titleProp ?? siteName;
  const description = descriptionProp;
  const resolvedImage = image ?? defaults.catalogImages[path.split("/").pop() ?? ""] ?? defaults.defaultImage;

  const resolvedFullImageUrl = `${origin}${resolvedImage}`;

  const iframeSnippet = `<iframe src="${embedUrl}" width="100%" height="340" frameborder="0" style="border: 1px solid #e5e9f0; border-radius: 12px; max-width: 520px; width: 100%; display: block;" title="${title} - ${siteName}"></iframe>`;
  const markdownSnippet = `[![${title}](${resolvedFullImageUrl})](${fullUrl})`;
  const htmlImageSnippet = `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${resolvedFullImageUrl}" alt="${title}" style="max-width: 100%; border-radius: 12px; border: 1px solid #e5e9f0;" />\n</a>`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const copyIframe = async () => {
    try {
      await navigator.clipboard.writeText(iframeSnippet);
      setCopiedIframe(true);
      toast.success("Embed iframe code copied to clipboard!");
      setTimeout(() => setCopiedIframe(false), 2000);
    } catch {
      toast.error("Failed to copy embed code");
    }
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownSnippet);
      setCopiedMarkdown(true);
      toast.success("Markdown snippet with image copied!");
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch {
      toast.error("Failed to copy markdown snippet");
    }
  };

  const copyHtmlSnippet = async () => {
    try {
      await navigator.clipboard.writeText(htmlImageSnippet);
      setCopiedHtml(true);
      toast.success("HTML embed with image copied!");
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      toast.error("Failed to copy HTML snippet");
    }
  };

  // Only share the URL so the destination app (WhatsApp, iMessage, Slack, etc.) embeds the card natively without duplicate text
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          url: fullUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      copyLink();
    }
  };

  const encodedUrl = encodeURIComponent(fullUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-1.5 rounded-lg active:scale-95 transition-all cursor-pointer", className)}
          aria-label={`Share ${title}`}
        >
          <Share2 className="size-4" />
          {size !== "icon" && <span>{triggerLabel}</span>}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl rounded-2xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Share2 className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold">
                Share with Embedded Picture
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Share this page directly with embedded picture preview or copy embed code.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="share" className="mt-3">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted p-1">
            <TabsTrigger value="share" className="gap-1.5 text-xs font-semibold rounded-lg">
              <Link2 className="size-3.5" />
              Social & Picture Card
            </TabsTrigger>
            <TabsTrigger value="embed" className="gap-1.5 text-xs font-semibold rounded-lg">
              <Code2 className="size-3.5" />
              Embed as iframe
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: SOCIAL & PICTURE CARD SHARE */}
          <TabsContent value="share" className="mt-4 space-y-4">
            {/* Live Social Link Preview Card with Page Picture */}
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-primary" />
                Live Embedded Card Preview (with picture)
              </span>

              <div className="overflow-hidden rounded-xl border border-border/80 bg-card transition-all hover:border-primary/40">
                {/* Embedded Page Picture */}
                <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-navy-950">
                  <Image
                    src={imageSrc(resolvedImage)}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, 540px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Brand & Domain Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono text-white">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{new URL(origin).host}</span>
                  </div>

                  {/* Picture title on overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h4 className="font-heading text-sm sm:text-base font-bold truncate">
                      {title}
                    </h4>
                    {description && (
                      <p className="text-[11px] text-white/80 truncate ">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card footer details: 1-click Copy button directly in the card */}
                <div className="p-3 bg-muted/40 border-t border-border/60 flex items-center justify-between text-xs gap-2">
                  <Button
                    onClick={copyLink}
                    variant="default"
                    size="sm"
                    className="rounded-lg gap-1.5 font-semibold text-xs h-8"
                  >
                    {copiedLink ? <Check className="size-3.5 text-white" /> : <Copy className="size-3.5" />}
                    <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                  </Button>

                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 shrink-0 text-xs"
                  >
                    Open Page <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Snippet with Image Options: Markdown & HTML */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyMarkdown}
                className="rounded-xl text-xs font-medium justify-center gap-1.5 h-9"
              >
                {copiedMarkdown ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                <span>{copiedMarkdown ? "Copied Markdown!" : "Copy Markdown with Picture"}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={copyHtmlSnippet}
                className="rounded-xl text-xs font-medium justify-center gap-1.5 h-9"
              >
                {copiedHtml ? <Check className="size-3.5 text-emerald-500" /> : <Code2 className="size-3.5" />}
                <span>{copiedHtml ? "Copied HTML!" : "Copy HTML with Picture"}</span>
              </Button>
            </div>

            {/* One-click Social Share Links (Only URL passed so platforms unfurl the picture card without duplicate text) */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Share Link to Social Apps:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card p-2.5 text-xs font-semibold text-foreground hover:bg-accent hover:border-emerald-500/40 transition active:scale-95 "
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card p-2.5 text-xs font-semibold text-foreground hover:bg-accent hover:border-sky-500/40 transition active:scale-95 "
                >
                  Twitter / X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card p-2.5 text-xs font-semibold text-foreground hover:bg-accent hover:border-blue-500/40 transition active:scale-95 "
                >
                  LinkedIn
                </a>
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card p-2.5 text-xs font-semibold text-foreground hover:bg-accent transition active:scale-95 cursor-pointer"
                >
                  <Share2 className="size-3.5 text-primary" />
                  More Apps
                </button>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: EMBED AS IFRAME */}
          <TabsContent value="embed" className="mt-4 space-y-4">
            {/* Live iframe interactive preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-primary" />
                  Live Iframe Widget Preview
                </span>
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                >
                  Open standalone
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/30 p-2 sm:p-3 flex justify-center">
                <iframe
                  src={embedUrl}
                  title={`Preview of ${title}`}
                  className="w-full max-w-md h-[300px] rounded-xl border border-border/80 bg-card pointer-events-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Theme Picker */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Embed Theme:</span>
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                {(["system", "light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEmbedTheme(t)}
                    className={cn(
                      "px-2.5 py-1 rounded-md capitalize transition-all cursor-pointer text-xs font-medium",
                      embedTheme === t
                        ? "bg-background text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="iframe-code" className="text-xs font-medium text-foreground">
                  HTML Iframe Code:
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyIframe}
                  className="h-7 gap-1 text-xs text-primary hover:text-primary rounded-lg"
                >
                  {copiedIframe ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  <span>{copiedIframe ? "Copied" : "Copy Code"}</span>
                </Button>
              </div>

              <div className="relative rounded-xl bg-navy-950 p-3 text-navy-100 font-mono text-xs overflow-x-auto ring-1 ring-white/10">
                <code className="break-all whitespace-pre-wrap">{iframeSnippet}</code>
              </div>
            </div>

            <Button onClick={copyIframe} className="w-full gap-2 rounded-xl" size="lg">
              {copiedIframe ? <Check className="size-4 text-white" /> : <Code2 className="size-4" />}
              <span>{copiedIframe ? "Iframe Code Copied!" : "Copy Iframe Embed Code"}</span>
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
