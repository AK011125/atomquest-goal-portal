"use client";

import { useState } from "react";
import { Check, ClipboardCheck, MessageSquare, TrendingUp, Users, X } from "lucide-react";
import { AnalyticsCard } from "@/components/dashboard/analytics-card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  completionByStatus,
  managerGoalQueue,
  navigation,
  teamMembers,
  teamProgressData,
  type GoalItem,
  type GoalStatus,
} from "@/data/mock-data";

export default function ManagerPage() {
  const [queue, setQueue] = useState<GoalItem[]>(managerGoalQueue);

  function updateStatus(id: number, status: GoalStatus) {
    setQueue((current) =>
      current.map((goal) => (goal.id === id ? { ...goal, status } : goal))
    );
  }

  return (
    <DashboardLayout
      navItems={navigation.manager}
      activeLabel="Team Overview"
      role="Manager"
      title="Manager Dashboard"
      subtitle="Approve goals, monitor team progress, and coach quarterly outcomes."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Team members"
          value={`${teamMembers.length}`}
          detail="Active employees in the Q2 calibration group."
          icon={Users}
          tone="cyan"
        />
        <AnalyticsCard
          title="Approval queue"
          value={`${queue.filter((goal) => goal.status === "Pending").length}`}
          detail="Goals waiting for manager decision."
          trend="-3"
          icon={ClipboardCheck}
          tone="violet"
        />
        <AnalyticsCard
          title="Avg progress"
          value="79%"
          detail="Across submitted goals and active updates."
          trend="+6%"
          icon={TrendingUp}
          tone="green"
        />
        <AnalyticsCard
          title="Coaching notes"
          value="12"
          detail="Comments added during this cycle."
          icon={MessageSquare}
          tone="amber"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Employee goals
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Review weightage, progress, and quarterly context.
              </p>
            </div>
            <StatusBadge status="Pending" />
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <Table>
              <TableHeader className="bg-white/[0.04]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Employee</TableHead>
                  <TableHead className="text-zinc-400">Goal</TableHead>
                  <TableHead className="text-zinc-400">Weight</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-right text-zinc-400">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((goal) => (
                  <TableRow key={goal.id} className="border-white/10">
                    <TableCell>
                      <p className="font-medium text-white">{goal.owner}</p>
                      <p className="text-xs text-zinc-500">{goal.category}</p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="font-medium text-white">{goal.title}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        {goal.update}
                      </p>
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {goal.weight}%
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={goal.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon-sm"
                          className="bg-emerald-300 text-zinc-950 hover:bg-emerald-200"
                          onClick={() => updateStatus(goal.id, "Approved")}
                        >
                          <Check className="size-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="destructive"
                          onClick={() => updateStatus(goal.id, "Rejected")}
                        >
                          <X className="size-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-semibold text-white">
            Team performance
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Goal progress against expected cycle target.
          </p>
          <ProgressChart
            type="bar"
            data={teamProgressData}
            dataKey="progress"
            secondaryKey="target"
          />
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-semibold text-white">Team overview</h2>
          <div className="mt-5 grid gap-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-lg border border-white/10 bg-zinc-950/60 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-zinc-500">{member.role}</p>
                  </div>
                  <StatusBadge status={member.status} />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                  <span>{member.goals} goals</span>
                  <span>{member.progress}%</span>
                </div>
                <Progress value={member.progress} className="mt-2 [&_[data-slot=progress-indicator]]:bg-cyan-300 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="font-semibold text-white">Progress analytics</h2>
            <ProgressChart
              type="pie"
              data={completionByStatus}
              dataKey="value"
              height={235}
            />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="font-semibold text-white">Manager comment</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Add a coaching note for the next checkpoint.
            </p>
            <Textarea
              className="mt-4 min-h-36 border-white/10 bg-zinc-950/80 text-white"
              placeholder="Example: unblock analytics dependency and tighten success metric definition."
            />
            <Button className="mt-4 w-full bg-cyan-300 text-zinc-950 hover:bg-cyan-200">
              Save comment
            </Button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
