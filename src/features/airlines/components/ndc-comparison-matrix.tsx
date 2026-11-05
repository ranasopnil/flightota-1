import { Check, X, Zap } from "lucide-react";

export function NdcComparisonMatrix() {
  const features = [
    {
      title: "Seats, bags and meals",
      description: "What is on sale for an offer, read before you build the passenger form",
      flightotaNdc: "Listed on /extras",
      flightotaLcc: "Listed on /extras, where sold",
      legacyGds: "Static text or unavailable",
    },
    {
      title: "Fare families",
      description: "Every fare family (Saver, Classic, Flex…) as its own offer",
      flightotaNdc: "fares: branded",
      flightotaLcc: "fares: branded, where sold",
      legacyGds: "Basic restrictive fare classes",
    },
    {
      title: "Hold first, issue later",
      description: "Most fares are held and issued later from your deposit, before hold_expires_at",
      flightotaNdc: "Held booking",
      flightotaLcc: "instant_ticket fares pay at booking",
      legacyGds: "Manual ticketing queue",
    },
    {
      title: "Void on the day of issue",
      description: "Until 23:59 Asia/Dhaka; the option closes 5 minutes before that",
      flightotaNdc: "POST /void",
      flightotaLcc: "POST /void, or our desk",
      legacyGds: "Manual agent queue",
    },
    {
      title: "Developer integration",
      description: "Payload format for developers and automated workflows",
      flightotaNdc: "REST / JSON",
      flightotaLcc: "REST / JSON",
      legacyGds: "Complex XML / EDIFACT",
    },
  ];

  const columns = [
    { key: "flightotaNdc", label: "Direct NDC", icon: Check, tone: "text-emerald-600 dark:text-emerald-400" },
    { key: "flightotaLcc", label: "LCC", icon: Zap, tone: "text-amber-700 dark:text-amber-300" },
    { key: "legacyGds", label: "Legacy GDS", icon: X, tone: "text-muted-foreground" },
  ] as const;

  return (
    <div className="min-w-0 rounded-lg border border-border/80 bg-card p-3 sm:p-7">
      <div className="border-b border-border/60 pb-3 sm:pb-4">
        <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">Why Developers Build on Direct NDC & LCC Pipes</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Direct airline connectivity next to legacy GDS protocols.</p>
      </div>

      {/* Phones and small tablets read one card per capability */}
      <ul className="mt-3 flex flex-col gap-2 md:hidden">
        {features.map((f) => (
          <li key={f.title} className="rounded-lg border border-border/60 p-3">
            <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{f.description}</p>
            <dl className="mt-2 flex flex-col gap-1.5 border-t border-border/50 pt-2 text-xs">
              {columns.map((col) => {
                const Icon = col.icon;
                return (
                  <div key={col.key} className="flex items-start justify-between gap-3">
                    <dt className="shrink-0 text-muted-foreground">{col.label}</dt>
                    <dd className={`flex min-w-0 items-start justify-end gap-1 text-right font-medium ${col.tone}`}>
                      <Icon className="mt-0.5 size-3 shrink-0" aria-hidden />
                      {f[col.key]}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ul>

      <table className="mt-3 hidden w-full border-collapse text-left text-sm md:table">
        <thead>
          <tr className="border-b border-border/70 text-xs text-muted-foreground">
            <th scope="col" className="py-3 pr-4 font-medium">Capability</th>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={`px-3 py-3 font-semibold ${col.tone}`}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {features.map((f) => (
            <tr key={f.title} className="align-top">
              <td className="py-3 pr-4">
                <div className="font-semibold text-foreground">{f.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{f.description}</div>
              </td>
              {columns.map((col) => {
                const Icon = col.icon;
                return (
                  <td key={col.key} className={`px-3 py-3 font-medium ${col.tone}`}>
                    <span className="flex items-start gap-1.5">
                      <Icon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                      {f[col.key]}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
