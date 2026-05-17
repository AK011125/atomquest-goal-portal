import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GoalStatus } from "@/data/mock-data";

const statusStyles: Record<string, string> = {
  Approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  "On Track": "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "At Risk": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Completed: "border-green-400/30 bg-green-400/10 text-green-200",
  Pending: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Rejected: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  Draft: "border-zinc-400/30 bg-zinc-400/10 text-zinc-200",
  Success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Info: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Review: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "Needs review": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Positive: "border-green-400/30 bg-green-400/10 text-green-200",
  Forecast: "border-sky-400/30 bg-sky-400/10 text-sky-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: GoalStatus | string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium",
        statusStyles[status] ?? statusStyles.Draft,
        className
      )}
    >
      {status}
    </Badge>
  );
}
