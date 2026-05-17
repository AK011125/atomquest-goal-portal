"use client";

import { useState } from "react";
import {
  Activity,
  CalendarClock,
  Database,
  Download,
  LockKeyholeOpen,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
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
import {
  adminAuditLogs,
  completionByStatus,
  departmentCompletion,
  goalCompletionTrend,
  navigation,
} from "@/data/mock-data";

export default function AdminPage() {
  const [cycleLocked, setCycleLocked] = useState(false);
  const [exported, setExported] = useState(false);

  function exportCsv() {
    const rows = [
      ["department", "completion"],
      ...departmentCompletion.map((item) => [item.name, item.completion]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "atomquest-goal-completion.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <DashboardLayout
      navItems={navigation.admin}
      activeLabel="System Health"
      role="Admin"
      title="Admin Dashboard"
      subtitle="Govern cycles, audit activity, unlock goals, and export executive-ready data."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Active users"
          value="428"
          detail="Employees and managers active this quarter."
          trend="+18%"
          icon={Activity}
          tone="cyan"
        />
        <AnalyticsCard
          title="Completion"
          value="82%"
          detail="Org-wide goal completion forecast."
          trend="+7%"
          icon={ShieldCheck}
          tone="green"
        />
        <AnalyticsCard
          title="Audit events"
          value="1,284"
          detail="Tracked changes across goals, cycles, and approvals."
          icon={Database}
          tone="violet"
        />
        <AnalyticsCard
          title="Cycle state"
          value={cycleLocked ? "Locked" : "Open"}
          detail="Quarterly submission window for Q2 2026."
          icon={CalendarClock}
          tone={cycleLocked ? "rose" : "amber"}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Completion tracking
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Department performance and submission velocity.
              </p>
            </div>
            <Button
              onClick={exportCsv}
              className="bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
            >
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
          {exported && (
            <p className="mt-3 text-sm text-emerald-300">
              CSV export generated from mock data.
            </p>
          )}
          <ProgressChart
            type="bar"
            data={departmentCompletion}
            dataKey="completion"
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-semibold text-white">
            Goal completion mix
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Current distribution by workflow status.
          </p>
          <ProgressChart type="pie" data={completionByStatus} dataKey="value" />
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Quarterly cycle
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Manage Q2 2026 submission windows.
                </p>
              </div>
              <StatusBadge status={cycleLocked ? "At Risk" : "On Track"} />
            </div>
            <div className="mt-5 space-y-4">
              {[
                ["Goal setup", 100],
                ["Manager review", 78],
                ["Calibration", 42],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <div className="mb-2 flex justify-between text-sm text-zinc-400">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={Number(value)} className="[&_[data-slot=progress-indicator]]:bg-cyan-300 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-zinc-800" />
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                className="border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
                onClick={() => setCycleLocked((current) => !current)}
              >
                <RefreshCw className="size-4" />
                {cycleLocked ? "Reopen cycle" : "Lock cycle"}
              </Button>
              <Button className="bg-emerald-300 text-zinc-950 hover:bg-emerald-200">
                Publish reminder
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-amber-300/10 text-amber-200">
                <LockKeyholeOpen className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-white">Goal unlock</h2>
                <p className="text-sm text-zinc-400">
                  Temporarily unlock goals for exception edits.
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-zinc-950/70 p-4">
              <p className="text-sm font-medium text-white">
                7 unlock requests pending
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Most requests are from late manager calibration changes.
              </p>
            </div>
            <Button className="mt-4 w-full bg-amber-300 text-zinc-950 hover:bg-amber-200">
              Review unlock requests
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Audit logs</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Governance events captured from mock system activity.
              </p>
            </div>
            <StatusBadge status="Info" />
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <Table>
              <TableHeader className="bg-white/[0.04]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Event</TableHead>
                  <TableHead className="text-zinc-400">Owner</TableHead>
                  <TableHead className="text-zinc-400">Time</TableHead>
                  <TableHead className="text-zinc-400">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminAuditLogs.map((log) => (
                  <TableRow key={`${log.event}-${log.time}`} className="border-white/10">
                    <TableCell className="font-medium text-white">
                      {log.event}
                    </TableCell>
                    <TableCell className="text-zinc-400">{log.owner}</TableCell>
                    <TableCell className="text-zinc-500">{log.time}</TableCell>
                    <TableCell>
                      <StatusBadge status={log.severity} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-white">Submission velocity</h3>
            <ProgressChart
              type="line"
              data={goalCompletionTrend}
              dataKey="submissions"
              secondaryKey="completion"
              height={230}
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
