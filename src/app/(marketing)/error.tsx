"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Container } from "@/components/common/container";
import { ErrorState } from "@/components/common/states";
import { Button } from "@/components/ui/button";

export default function MarketingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Hook for error reporting (e.g. Sentry) — never log sensitive data.
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <ErrorState
        className="py-16"
        title="Something went wrong"
        description={
          <>
            We couldn&apos;t load this page. Please try again.
            {error.digest && <span className="mt-2 block font-mono text-xs">Reference: {error.digest}</span>}
          </>
        }
        action={
          <Button onClick={reset}>
            <RotateCcw data-icon="inline-start" /> Try again
          </Button>
        }
      />
    </Container>
  );
}
