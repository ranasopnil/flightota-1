"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail("dev@travelapi.io");
    setPassword("SandboxDemo2026!");
    toast.info("Demo sandbox credentials filled!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    toast.success("Welcome back! Redirecting to developer dashboard...");
    // Redirect to documentation or dashboard
    setTimeout(() => {
      router.push("/documentation");
    }, 600);
  };

  const handleOAuthLogin = (provider: string) => {
    toast.info(`Connecting to ${provider}... (Sandbox Mode)`);
    setTimeout(() => {
      router.push("/documentation");
    }, 700);
  };

  return (
    <div className="w-full max-w-[1020px] rounded-lg border border-border/60 bg-card/80 p-0 backdrop-blur-md overflow-hidden grid lg:grid-cols-12">
      {/* Left Column: Form */}
      <div className="flex flex-col justify-center p-4 sm:p-10 lg:col-span-7">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Developer Portal
          </div>
          <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sign in to your account
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
            Enter your credentials to access your API keys, analytics, and sandbox environments.
          </p>
        </div>

        {/* Demo credentials quick fill banner */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 text-xs">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span>Need a demo account?</span>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="cursor-pointer font-semibold text-primary hover:underline"
          >
            Auto-fill demo credentials
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-foreground">
              Work Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<Mail className="size-4 text-muted-foreground" />}
              clearable
              onClear={() => setEmail("")}
              required
              autoComplete="email"
              className="rounded-lg text-base sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium text-foreground">
                Password
              </label>
              <button
                type="button"
                onClick={() => toast.info("Password reset instructions sent to your email.")}
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock className="size-4 text-muted-foreground" />}
              required
              autoComplete="current-password"
              className="rounded-lg text-base sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label
              htmlFor="remember"
              className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
            >
              Remember this device for 30 days
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full gap-2 rounded-lg font-semibold transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in to Console
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center text-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/80" />
          </div>
          <span className="relative bg-card px-3 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthLogin("Google")}
            className="rounded-lg border-border/70 hover:bg-muted/70 gap-2 text-xs font-medium"
          >
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthLogin("GitHub")}
            className="rounded-lg border-border/70 hover:bg-muted/70 gap-2 text-xs font-medium"
          >
            <svg className="size-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
        </div>

        {/* Link to Register */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Create free developer account
          </Link>
        </p>
      </div>

      {/* Right Column: Visual Showcase (Hidden on Mobile) */}
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy-900 via-[#0d1c3a] to-primary/80 p-8 text-white lg:col-span-5 lg:flex">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-xs">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Global Travel API Mesh
          </div>
          <h2 className="mt-5 font-heading text-xl font-bold tracking-tight text-white">
            Unified travel inventory for flights, hotels, eSIM & transfers
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-white/75">
            Integrate over 200+ airlines, 1.2M+ global hotel properties, and NDC distribution channels with single sub-second REST and GraphQL endpoints.
          </p>
        </div>

        {/* Live Code / API Preview Card */}
        <div className="relative z-10 my-6 rounded-lg border border-white/15 bg-black/40 p-4 font-mono text-xs backdrop-blur-md">
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10 text-[11px] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              POST /flights/search
            </span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300 font-semibold text-[10px]">
              200 OK • 30 s
            </span>
          </div>
          <pre className="text-white/80 overflow-x-auto text-[11px] leading-relaxed">
            {`{
  "search_id": "srh_01m34mpemkpjehfke5rdpwrd8q",
  "currency": "BDT",
  "offers": [{ "offer_id": "ofr_01m34mpempz46w64zzecwd3p6z",
    "total": { "amount": 9440600, "currency": "BDT" } }]
}`}
          </pre>
        </div>

        {/* Feature Badges */}
        <div className="relative z-10 space-y-2.5 text-xs text-white/85">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>Instant sandbox credentials with 5,000 free monthly calls</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>Multi-channel NDC, GDS, and low-cost carrier aggregations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>Zero lock-in contract & 99.99% enterprise uptime SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
