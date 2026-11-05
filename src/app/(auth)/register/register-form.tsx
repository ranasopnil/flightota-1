"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, User, Building, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function RegisterFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const apiParam = searchParams.get("api");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the Terms of Service to create an account.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);

    toast.success("Account created! Sandbox API key generated.");
    setTimeout(() => {
      router.push("/documentation");
    }, 600);
  };

  return (
    <div className="w-full max-w-[1020px] rounded-lg border border-border/60 bg-card/80 p-0 backdrop-blur-md overflow-hidden grid lg:grid-cols-12">
      {/* Left Column: Register Form */}
      <div className="flex flex-col justify-center p-4 sm:p-10 lg:col-span-7">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Instant Sandbox Access
          </div>
          <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Get your developer API keys
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
            {planParam ? (
              <span>Signing up for the <strong className="text-foreground capitalize">{planParam.replace("-", " ")}</strong> plan.</span>
            ) : apiParam ? (
              <span>Subscribing to the <strong className="text-foreground capitalize">{apiParam.replace("-", " ")}</strong> API.</span>
            ) : (
              "Sign up in 30 seconds and start testing sandbox endpoints right away."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-medium text-foreground">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                startIcon={<User className="size-4 text-muted-foreground" />}
                required
                className="rounded-lg text-base sm:text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-xs font-medium text-foreground">
                Company / Project
              </label>
              <Input
                id="company"
                placeholder="Acme Travel Ltd."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                startIcon={<Building className="size-4 text-muted-foreground" />}
                required
                className="rounded-lg text-base sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-email" className="text-xs font-medium text-foreground">
              Work Email
            </label>
            <Input
              id="reg-email"
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<Mail className="size-4 text-muted-foreground" />}
              clearable
              onClear={() => setEmail("")}
              required
              className="rounded-lg text-base sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reg-password" className="text-xs font-medium text-foreground">
              Password (min. 8 characters)
            </label>
            <Input
              id="reg-password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock className="size-4 text-muted-foreground" />}
              required
              minLength={8}
              className="rounded-lg text-base sm:text-sm"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-xs font-medium text-muted-foreground cursor-pointer select-none leading-relaxed"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline hover:text-primary/80">
                Terms of Service
              </Link>{" "}
              and acknowledge the{" "}
              <Link href="/privacy" className="text-primary underline hover:text-primary/80">
                Privacy Policy
              </Link>
              .
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
                Creating Developer Account...
              </>
            ) : (
              <>
                Create Account & Generate Keys
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Column: Perks */}
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-navy-900 via-[#0d1c3a] to-primary/80 p-8 text-white lg:col-span-5 lg:flex">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-xs">
            <span className="size-2 rounded-full bg-emerald-400" />
            Sandbox Developer Tier
          </div>
          <h2 className="mt-5 font-heading text-xl font-bold tracking-tight text-white">
            Start building your travel application today
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-white/75">
            Get instant sandbox credentials with unlimited test queries, simulated booking PNRs, and sample JSON responses.
          </p>
        </div>

        <div className="relative z-10 my-6 space-y-3 text-xs text-white/90">
          <div className="rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur-sm flex items-start gap-3">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">5,000 Free Test Calls / mo</div>
              <div className="text-[11px] text-white/70">No credit card required to start testing sandbox endpoints.</div>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur-sm flex items-start gap-3">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Interactive OpenAPI & SDKs</div>
              <div className="text-[11px] text-white/70">Ready-to-use SDKs for TypeScript, Python, Go, and cURL.</div>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur-sm flex items-start gap-3">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Sub-100ms Latency</div>
              <div className="text-[11px] text-white/70">Edge caching and global routing in over 30 worldwide regions.</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-white/60">
          Questions before signing up?{" "}
          <Link href="/contact" className="text-white underline hover:text-white/80">
            Talk to API sales
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterForm() {
  return (
    <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-lg bg-card/60" />}>
      <RegisterFormInner />
    </Suspense>
  );
}
