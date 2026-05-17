import Link from "next/link";
import { Atom, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function Sidebar({
  items,
  activeLabel,
  role,
}: {
  items: SidebarItem[];
  activeLabel: string;
  role: string;
}) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-black/35 p-5 backdrop-blur-xl lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-3 rounded-lg px-2 py-1.5">
        <span className="grid size-10 place-items-center rounded-lg bg-cyan-300 text-zinc-950">
          <Atom className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">
            AtomQuest
          </span>
          <span className="text-xs text-zinc-500">Goal Portal</span>
        </span>
      </Link>

      <div className="mt-8">
        <p className="px-2 text-xs font-medium uppercase tracking-[0.22em] text-zinc-600">
          {role}
        </p>
        <nav className="mt-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-white text-zinc-950"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm font-medium text-white">Q2 cycle active</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Calibration closes in 14 days. Keep updates crisp and measurable.
        </p>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-4 w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
          )}
        >
          <LogOut className="size-4" />
          Switch role
        </Link>
      </div>
    </aside>
  );
}
