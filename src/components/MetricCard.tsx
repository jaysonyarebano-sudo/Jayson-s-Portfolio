import type { Metric } from "@/data/portfolio";

/** A dt/dd pair; the value is shown first visually while markup keeps dt before dd. Render inside a <dl>. */
export function MetricCard({ metric, size = "lg" }: { metric: Metric; size?: "lg" | "sm" }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-line bg-white p-5 sm:p-6">
      <dt className="order-2 text-sm text-muted">{metric.label}</dt>
      <dd
        className={`order-1 font-semibold tracking-tight text-ink tabular-nums ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        {metric.value}
      </dd>
    </div>
  );
}

/** Compact dt/dd pair without a card frame. Render inside a <dl>. */
export function InlineMetric({ metric, valueClass, labelClass }: { metric: Metric; valueClass: string; labelClass: string }) {
  return (
    <div className="flex flex-col">
      <dt className={`order-2 ${labelClass}`}>{metric.label}</dt>
      <dd className={`order-1 font-semibold tabular-nums ${valueClass}`}>{metric.value}</dd>
    </div>
  );
}
