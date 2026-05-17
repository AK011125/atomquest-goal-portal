"use client";

import { useRouter } from "next/navigation";
import { Building2, Crown, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const roles = [
  {
    title: "Employee",
    description: "Create goals, track weightage, and submit quarterly updates.",
    path: "/employee",
    icon: UserRound,
    className: "bg-cyan-300 text-zinc-950 hover:bg-cyan-200",
  },
  {
    title: "Manager",
    description: "Review team goals, approve changes, and coach progress.",
    path: "/manager",
    icon: Building2,
    className: "bg-violet-300 text-zinc-950 hover:bg-violet-200",
  },
  {
    title: "Admin",
    description: "Manage cycles, audit activity, unlock goals, and export data.",
    path: "/admin",
    icon: Crown,
    className: "bg-emerald-300 text-zinc-950 hover:bg-emerald-200",
  },
];

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#050505,#111827)] px-4 py-10 text-white">
      <Card className="w-full max-w-5xl border-white/10 bg-white/[0.045] shadow-2xl shadow-black/40">
        <CardContent className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <section className="flex flex-col justify-between rounded-lg border border-white/10 bg-black/30 p-6">
            <div>
              <div className="mb-6 inline-grid size-12 place-items-center rounded-lg bg-cyan-300 text-zinc-950">
                <ShieldCheck className="size-6" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">
                AtomQuest Goal Portal
              </h1>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Select a demo role to enter the performance workspace. Each view
                is tuned for the workflows hackathon judges expect to inspect.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              {["100%", "8 max", "Q2"].map((item, index) => (
                <div key={item} className="rounded-lg bg-white/[0.05] p-3">
                  <p className="text-lg font-semibold">{item}</p>
                  <p className="text-xs text-zinc-500">
                    {["Weightage", "Goals", "Cycle"][index]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.title}
                  onClick={() => router.push(role.path)}
                  className="group w-full rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-zinc-900"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-lg bg-white/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-zinc-950">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-semibold text-white">
                        Login as {role.title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-zinc-400">
                        {role.description}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}

            <Button
              variant="outline"
              className="mt-2 h-11 w-full border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
              onClick={() => router.push("/")}
            >
              Back to homepage
            </Button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
