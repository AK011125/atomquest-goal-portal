import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AnalyticsCard({
  title,
  value,
  detail,
  trend,
  icon: Icon,
  tone = "cyan",
}: {
  title: string;
  value: string;
  detail: string;
  trend?: string;
  icon: LucideIcon;
  tone?: "cyan" | "green" | "violet" | "amber" | "rose";
}) {
  const toneStyles = {
    cyan: "bg-cyan-400/10 text-cyan-200 ring-cyan-300/20",
    green: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/20",
    violet: "bg-violet-400/10 text-violet-200 ring-violet-300/20",
    amber: "bg-amber-400/10 text-amber-200 ring-amber-300/20",
    rose: "bg-rose-400/10 text-rose-200 ring-rose-300/20",
  };

  const isNegative = trend?.startsWith("-");

  return (
    <Card className="border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">{title}</p>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-3xl font-semibold tracking-tight text-white">
                {value}
              </p>
              {trend && (
                <span
                  className={cn(
                    "mb-1 inline-flex items-center gap-1 text-xs font-medium",
                    isNegative ? "text-rose-300" : "text-emerald-300"
                  )}
                >
                  {isNegative ? (
                    <ArrowDownRight className="size-3.5" />
                  ) : (
                    <ArrowUpRight className="size-3.5" />
                  )}
                  {trend}
                </span>
              )}
            </div>
          </div>
          <div className={cn("rounded-lg p-2.5 ring-1", toneStyles[tone])}>
            <Icon className="size-5" />
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-400">{detail}</p>
      </CardContent>
    </Card>
  );
}
