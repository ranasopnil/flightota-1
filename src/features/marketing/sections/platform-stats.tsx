import { Container } from "@/components/common/container";
import { Eyebrow } from "@/components/common/section";
import { platformStats } from "@/constants/marketing";

export function PlatformStats({ endpointCount }: { endpointCount: number }) {
  const stats = [...platformStats.slice(0, 1), { value: `${endpointCount}+`, label: "Documented endpoints" }, ...platformStats.slice(1)];
  return (
    <section aria-labelledby="stats-heading" className="relative overflow-hidden bg-navy-950 py-7 sm:py-20 text-white">
      <div aria-hidden className="bg-grid-light absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -top-32 left-1/3 h-80 w-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(220_14_24/0.28),transparent)]" />
      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Eyebrow tone="dark">Platform statistics</Eyebrow>
          <h2 id="stats-heading" className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Built to carry production travel traffic
          </h2>
        </div>
        <dl className="mt-4 sm:mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 bg-navy-950/90 p-4 sm:p-6 text-center">
              <dt className="order-2 text-sm text-navy-300">{stat.label}</dt>
              <dd className="order-1 font-heading text-2xl font-semibold tracking-tight sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
