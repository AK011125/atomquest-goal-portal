import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroStats = [
  { label: "Completion", value: "86%", icon: CheckCircle2 },
  { label: "Active Goals", value: "248", icon: BarChart3 },
  { label: "Audit Ready", value: "99%", icon: ShieldCheck },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.2),transparent_28%),linear-gradient(135deg,#020617_0%,#050505_54%,#111827_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-wide">
            AtomQuest
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
            )}
          >
            Open portal
            <ArrowRight className="size-4" />
          </Link>
        </nav>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-200">
              Hackathon MVP for modern performance teams
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              AtomQuest Goal Portal
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              A polished HR-tech workspace for goal planning, quarterly updates,
              manager approvals, and executive completion tracking.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
                )}
              >
                Start role demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/employee"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/15 bg-white/5 text-white hover:bg-white/10"
                )}
              >
                View dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/30">
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-lg bg-black/30 p-4">
                  <Icon className="size-5 text-cyan-300" />
                  <p className="mt-5 text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-zinc-950/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium">Quarterly progress</p>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200">
                  On track
                </span>
              </div>
              <div className="space-y-4">
                {[
                  ["Employee submissions", "91%"],
                  ["Manager approvals", "78%"],
                  ["Admin audits", "96%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm text-zinc-400">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-cyan-300"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
