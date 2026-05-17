import Link from "next/link";
import { Bell, Search, Shield } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Navbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/75 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-300">
            <Shield className="size-3.5" />
            Performance workspace
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search goals, people, cycles"
              className="h-10 border-white/10 bg-white/[0.04] pl-9 text-white placeholder:text-zinc-600"
            />
          </label>
          <Button variant="outline" size="icon-lg" className="border-white/10 bg-white/[0.04] text-white hover:bg-white/10">
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "bg-cyan-300 text-zinc-950 hover:bg-cyan-200"
            )}
          >
            Switch role
          </Link>
        </div>
      </div>
    </header>
  );
}
