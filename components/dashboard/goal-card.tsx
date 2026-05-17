import { CalendarDays, Scale, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { GoalItem } from "@/data/mock-data";

export function GoalCard({ goal }: { goal: GoalItem }) {
  return (
    <Card className="border-white/10 bg-zinc-950/70 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-zinc-900/80">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={goal.status} />
              <span className="text-xs text-zinc-500">{goal.category}</span>
            </div>
            <h3 className="text-lg font-semibold leading-snug text-white">
              {goal.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {goal.update}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-right">
            <p className="text-2xl font-semibold text-white">
              {goal.progress}%
            </p>
            <p className="text-xs text-zinc-500">progress</p>
          </div>
        </div>

        <div className="mt-5">
          <Progress value={goal.progress} className="[&_[data-slot=progress-indicator]]:bg-cyan-300 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-zinc-800" />
        </div>

        <div className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Scale className="size-4 text-zinc-500" />
            {goal.weight}% weight
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-zinc-500" />
            Due {goal.due}
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-zinc-500" />
            Quarterly goal
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
