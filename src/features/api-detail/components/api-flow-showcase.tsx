import Image from "next/image";
import type { ApiFlow } from "@/types/catalog";

/** A product's call flow and key figures, as given in its guide. */
export function ApiFlowShowcase({ flow }: { flow: ApiFlow }) {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="rounded-lg border border-border/80 bg-card p-4 sm:p-6 ring-1 ring-border/30">
        <ol className="app-rail grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
          {flow.steps.map((step, i) => (
            <li key={step.title} className="group overflow-hidden rounded-lg border border-border/70 bg-background p-3.5 ">
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-lg bg-navy-950">
                <Image src={step.image} alt="" fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
                  <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-xs font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">{step.badge}</span>
                </div>
              </div>
              <h4 className="font-heading text-sm font-bold text-foreground">{step.title}</h4>
              <code className="mt-1 block font-mono text-[10.5px] break-all text-muted-foreground">{step.endpoint}</code>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
        {flow.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border/70 bg-card p-3.5 text-center ring-1 ring-border/20 sm:p-4">
            <dd className="font-heading text-xl font-extrabold text-foreground sm:text-2xl">{stat.value}</dd>
            <dt className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
