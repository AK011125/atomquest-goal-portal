import type { ReactNode } from "react";
import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar, type SidebarItem } from "@/components/dashboard/sidebar";

export function DashboardLayout({
  children,
  navItems,
  activeLabel,
  role,
  title,
  subtitle,
}: {
  children: ReactNode;
  navItems: SidebarItem[];
  activeLabel: string;
  role: string;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,#050505_0%,#09090b_55%,#111827_100%)] text-white">
      <div className="flex">
        <Sidebar items={navItems} activeLabel={activeLabel} role={role} />
        <div className="min-w-0 flex-1">
          <Navbar title={title} subtitle={subtitle} />
          <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
