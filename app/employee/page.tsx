"use client";

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Plus,
  Sparkles,
  Target,
  Trophy,
  Wand2,
} from "lucide-react";
import { AnalyticsCard } from "@/components/dashboard/analytics-card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { GoalCard } from "@/components/dashboard/goal-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  chartPalette,
  employeeGoals,
  employeeProfile,
  goalCompletionTrend,
  navigation,
  quarterlyUpdates,
  type GoalItem,
} from "@/data/mock-data";

type GeneratedGoal = {
  title: string;
  description: string;
  kpi: string;
  timeline: string;
  weightage: number;
  category: string;
};

function generateSmartGoal(
  objective: string,
  availableWeightage: number
): GeneratedGoal {
  const normalized = objective.toLowerCase();
  const weightage = Math.max(5, Math.min(20, availableWeightage || 10));
  const cleanedObjective =
    objective.trim().replace(/\s+/g, " ") || "improve quarterly execution";

  if (
    normalized.includes("customer") ||
    normalized.includes("nps") ||
    normalized.includes("support")
  ) {
    return {
      title: "Improve Customer Experience Outcomes",
      description: `Translate "${cleanedObjective}" into a measurable customer-impact program with weekly insight reviews, prioritized action owners, and a documented improvement plan for the top friction points.`,
      kpi: "Increase customer satisfaction score by 8% and close 90% of priority feedback actions.",
      timeline: "Complete discovery by Week 3, execute improvements by Week 9, and publish impact summary by quarter end.",
      weightage,
      category: "Customer Outcomes",
    };
  }

  if (
    normalized.includes("sales") ||
    normalized.includes("revenue") ||
    normalized.includes("pipeline")
  ) {
    return {
      title: "Accelerate Revenue Performance",
      description: `Convert "${cleanedObjective}" into a focused revenue goal with pipeline hygiene, conversion analysis, and cross-functional action plans for high-value accounts.`,
      kpi: "Improve qualified pipeline conversion by 10% and deliver three executive-ready revenue insights.",
      timeline: "Baseline by Week 2, run interventions through Week 10, and validate business impact by Week 12.",
      weightage,
      category: "Revenue Growth",
    };
  }

  if (
    normalized.includes("process") ||
    normalized.includes("efficiency") ||
    normalized.includes("automate") ||
    normalized.includes("reduce")
  ) {
    return {
      title: "Increase Operational Efficiency",
      description: `Shape "${cleanedObjective}" into a scalable execution goal by mapping bottlenecks, automating repeatable steps, and publishing adoption guidance for stakeholders.`,
      kpi: "Reduce cycle time by 15% while maintaining 95% quality adherence.",
      timeline: "Map workflow by Week 2, pilot improvements by Week 7, and roll out the finalized process by Week 12.",
      weightage,
      category: "Operational Excellence",
    };
  }

  if (
    normalized.includes("team") ||
    normalized.includes("mentor") ||
    normalized.includes("training") ||
    normalized.includes("skill")
  ) {
    return {
      title: "Build Team Capability and Readiness",
      description: `Turn "${cleanedObjective}" into a people-development goal with structured coaching moments, reusable enablement assets, and measurable capability uplift.`,
      kpi: "Complete four enablement sessions and raise readiness assessment scores by 20%.",
      timeline: "Define skill gaps by Week 2, deliver enablement by Week 8, and measure adoption by Week 12.",
      weightage,
      category: "People",
    };
  }

  return {
    title: "Deliver Measurable Strategic Impact",
    description: `Convert "${cleanedObjective}" into a SMART quarterly goal with clear success metrics, accountable milestones, and a concise executive update cadence.`,
    kpi: "Deliver agreed milestones with at least 85% stakeholder satisfaction and no critical overdue dependencies.",
    timeline: "Align scope by Week 2, complete delivery by Week 10, and publish outcomes by Week 12.",
    weightage,
    category: "Strategic Execution",
  };
}

export default function EmployeePage() {
  const [goals, setGoals] = useState<GoalItem[]>(employeeGoals);
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [objective, setObjective] = useState("");
  const [generatedGoal, setGeneratedGoal] = useState<GeneratedGoal | null>(
    null
  );
  const [form, setForm] = useState({
    title: "",
    category: "",
    weight: "",
    due: "",
    update: "",
  });

  const totalWeight = useMemo(
    () => goals.reduce((sum, goal) => sum + goal.weight, 0),
    [goals]
  );
  const averageProgress = Math.round(
    goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
  );
  const remainingWeight = 100 - totalWeight;
  const formWeight = Number(form.weight || 0);
  const validationMessage =
    goals.length >= 8
      ? "You can create a maximum of 8 goals for a cycle."
      : formWeight > remainingWeight
        ? `Only ${remainingWeight}% weightage is available.`
        : "";

  function handleAddGoal() {
    if (!form.title || !form.category || !form.weight || validationMessage) {
      return;
    }

    setGoals((current) => [
      ...current,
      {
        id: Date.now(),
        owner: employeeProfile.name,
        title: form.title,
        category: form.category,
        progress: 0,
        weight: formWeight,
        status: "Draft",
        due: form.due || "To confirm",
        update: form.update || "New goal draft ready for manager review.",
      },
    ]);
    setForm({ title: "", category: "", weight: "", due: "", update: "" });
    setOpen(false);
  }

  function handleGenerateGoal() {
    setGeneratedGoal(generateSmartGoal(objective, remainingWeight));
  }

  function addGeneratedGoal() {
    if (!generatedGoal) {
      return;
    }

    setGoals((current) => [
      ...current,
      {
        id: Date.now(),
        owner: employeeProfile.name,
        title: generatedGoal.title,
        category: generatedGoal.category,
        progress: 0,
        weight: generatedGoal.weightage,
        status: "Draft",
        due: "Quarter end",
        update: `${generatedGoal.description} KPI: ${generatedGoal.kpi}`,
      },
    ]);
    setObjective("");
    setGeneratedGoal(null);
    setAiOpen(false);
  }

  return (
    <DashboardLayout
      navItems={navigation.employee}
      activeLabel="Overview"
      role="Employee"
      title={`Welcome back, ${employeeProfile.name}`}
      subtitle={`${employeeProfile.role} · ${employeeProfile.department} · ${employeeProfile.quarter}`}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Goal weightage"
          value={`${totalWeight}%`}
          detail={`${remainingWeight}% still available before manager submission.`}
          trend="+12%"
          icon={Target}
          tone="cyan"
        />
        <AnalyticsCard
          title="Average progress"
          value={`${averageProgress}%`}
          detail="Weighted across active quarterly goals."
          trend="+8%"
          icon={Gauge}
          tone="green"
        />
        <AnalyticsCard
          title="Approved goals"
          value={`${goals.filter((goal) => goal.status === "Approved" || goal.status === "On Track").length}`}
          detail="Ready for quarterly calibration."
          icon={CheckCircle2}
          tone="violet"
        />
        <AnalyticsCard
          title="Cycle rating"
          value="Exceeds"
          detail="Forecast based on progress and manager checkpoints."
          trend="+4%"
          icon={Trophy}
          tone="amber"
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">My goals</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {goals.length}/8 goals · total weightage must equal 100%.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Dialog open={aiOpen} onOpenChange={setAiOpen}>
                <DialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className="border-cyan-300/30 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/20"
                    />
                  }
                >
                  <Wand2 className="size-4" />
                  Generate AI Goal
                </DialogTrigger>
                <DialogContent className="border-cyan-300/20 bg-zinc-950 text-white sm:max-w-2xl">
                  <DialogHeader>
                    <div className="mb-1 flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-lg bg-cyan-300 text-zinc-950">
                        <BrainCircuit className="size-5" />
                      </span>
                      <div>
                        <DialogTitle>AI Goal Generator</DialogTitle>
                        <DialogDescription>
                          Describe the outcome in plain language. AtomQuest
                          will draft a SMART enterprise goal using mock local
                          logic.
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="grid gap-4">
                    <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-100">
                        <Sparkles className="size-4" />
                        HR assistant prompt
                      </div>
                      <Textarea
                        value={objective}
                        onChange={(event) => {
                          setObjective(event.target.value);
                          setGeneratedGoal(null);
                        }}
                        placeholder="Example: improve customer onboarding experience for enterprise clients"
                        className="min-h-28 border-white/10 bg-zinc-950/70 text-white placeholder:text-zinc-600"
                      />
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-zinc-400">
                          Available cycle weightage:{" "}
                          <span className="font-medium text-white">
                            {remainingWeight}%
                          </span>
                        </p>
                        <Button
                          onClick={handleGenerateGoal}
                          disabled={!objective.trim()}
                          className="bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
                        >
                          <Sparkles className="size-4" />
                          Generate draft
                        </Button>
                      </div>
                    </div>

                    {generatedGoal && (
                      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
                        <div className="border-b border-white/10 bg-white/[0.04] px-4 py-3">
                          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
                            AI generated SMART goal
                          </p>
                        </div>
                        <div className="grid gap-4 p-4">
                          <div>
                            <p className="text-xs text-zinc-500">Goal Title</p>
                            <h3 className="mt-1 text-xl font-semibold text-white">
                              {generatedGoal.title}
                            </h3>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">Description</p>
                            <p className="mt-1 text-sm leading-6 text-zinc-300">
                              {generatedGoal.description}
                            </p>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-lg bg-zinc-950/70 p-3">
                              <p className="text-xs text-zinc-500">KPI</p>
                              <p className="mt-1 text-sm leading-6 text-white">
                                {generatedGoal.kpi}
                              </p>
                            </div>
                            <div className="rounded-lg bg-zinc-950/70 p-3">
                              <p className="text-xs text-zinc-500">Timeline</p>
                              <p className="mt-1 text-sm leading-6 text-white">
                                {generatedGoal.timeline}
                              </p>
                            </div>
                            <div className="rounded-lg bg-zinc-950/70 p-3">
                              <p className="text-xs text-zinc-500">Weightage</p>
                              <p className="mt-1 text-2xl font-semibold text-cyan-200">
                                {generatedGoal.weightage}%
                              </p>
                              <p className="mt-1 text-xs text-zinc-500">
                                Suggested for this cycle
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={addGeneratedGoal}
                      disabled={
                        !generatedGoal ||
                        remainingWeight <= 0 ||
                        generatedGoal.weightage > remainingWeight ||
                        goals.length >= 8
                      }
                      className="bg-emerald-300 text-zinc-950 hover:bg-emerald-200"
                    >
                      Add generated goal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                  render={
                    <Button className="bg-cyan-300 text-zinc-950 hover:bg-cyan-200" />
                  }
                >
                  <Plus className="size-4" />
                  Add goal
                </DialogTrigger>
              <DialogContent className="border-white/10 bg-zinc-950 text-white sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Add quarterly goal</DialogTitle>
                  <DialogDescription>
                    Keep the goal measurable. AtomQuest validates max goals and
                    weightage locally for the MVP.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Input
                    placeholder="Goal title"
                    value={form.title}
                    onChange={(event) =>
                      setForm({ ...form, title: event.target.value })
                    }
                    className="border-white/10 bg-white/[0.04]"
                  />
                  <Input
                    placeholder="Category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="border-white/10 bg-white/[0.04]"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="Weightage %"
                      value={form.weight}
                      onChange={(event) =>
                        setForm({ ...form, weight: event.target.value })
                      }
                      className="border-white/10 bg-white/[0.04]"
                    />
                    <Input
                      placeholder="Due date"
                      value={form.due}
                      onChange={(event) =>
                        setForm({ ...form, due: event.target.value })
                      }
                      className="border-white/10 bg-white/[0.04]"
                    />
                  </div>
                  <Textarea
                    placeholder="Quarterly update"
                    value={form.update}
                    onChange={(event) =>
                      setForm({ ...form, update: event.target.value })
                    }
                    className="min-h-24 border-white/10 bg-white/[0.04]"
                  />
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-zinc-400">
                    Available weightage:{" "}
                    <span className="font-medium text-white">
                      {remainingWeight}%
                    </span>
                    {validationMessage && (
                      <p className="mt-2 text-amber-200">{validationMessage}</p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleAddGoal}
                    disabled={Boolean(validationMessage)}
                    className="bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
                  >
                    Save goal
                  </Button>
                </DialogFooter>
              </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">Goal completion</h2>
              <StatusBadge status="On Track" />
            </div>
            <ProgressChart
              type="line"
              data={goalCompletionTrend}
              dataKey="completion"
              secondaryKey="submissions"
            />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/[0.04] p-3">
                <p className="text-zinc-500">Primary</p>
                <p style={{ color: chartPalette.cyan }}>Completion</p>
              </div>
              <div className="rounded-lg bg-white/[0.04] p-3">
                <p className="text-zinc-500">Secondary</p>
                <p style={{ color: chartPalette.violet }}>Submissions</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="font-semibold text-white">Quarterly updates</h2>
            <div className="mt-4 space-y-3">
              {quarterlyUpdates.map((item) => (
                <div
                  key={item.week}
                  className="rounded-lg border border-white/10 bg-zinc-950/60 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{item.week}</p>
                    <StatusBadge status={item.sentiment} />
                  </div>
                  <p className="text-sm leading-6 text-zinc-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </DashboardLayout>
  );
}
