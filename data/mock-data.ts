import {
  Activity,
  BarChart3,
  ClipboardCheck,
  FileClock,
  Goal,
  LayoutDashboard,
  LineChart,
  LockKeyholeOpen,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

export type GoalStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "On Track"
  | "At Risk"
  | "Completed"
  | "Rejected";

export type GoalItem = {
  id: number;
  owner: string;
  title: string;
  category: string;
  progress: number;
  weight: number;
  status: GoalStatus;
  due: string;
  update: string;
};

export const employeeProfile = {
  name: "Aarav Mehta",
  role: "Product Analyst",
  department: "Growth Strategy",
  quarter: "Q2 2026",
  manager: "Neha Rao",
};

export const employeeGoals: GoalItem[] = [
  {
    id: 1,
    owner: "Aarav Mehta",
    title: "Launch onboarding experiment pack",
    category: "Product Growth",
    progress: 82,
    weight: 30,
    status: "On Track",
    due: "Jun 18",
    update: "Experiment 2 is live and early activation lift is at 6.8%.",
  },
  {
    id: 2,
    owner: "Aarav Mehta",
    title: "Reduce enterprise report turnaround",
    category: "Operational Excellence",
    progress: 58,
    weight: 25,
    status: "At Risk",
    due: "Jun 27",
    update: "Waiting on data contract approval from platform analytics.",
  },
  {
    id: 3,
    owner: "Aarav Mehta",
    title: "Improve NPS insight coverage",
    category: "Customer Outcomes",
    progress: 74,
    weight: 20,
    status: "Approved",
    due: "Jun 30",
    update: "Coverage expanded to 12 customer segments with weekly readouts.",
  },
  {
    id: 4,
    owner: "Aarav Mehta",
    title: "Mentor two associate analysts",
    category: "People",
    progress: 64,
    weight: 15,
    status: "On Track",
    due: "Jun 21",
    update: "Both mentees completed dashboard QA rotations.",
  },
  {
    id: 5,
    owner: "Aarav Mehta",
    title: "Publish quarterly growth narrative",
    category: "Leadership",
    progress: 42,
    weight: 5,
    status: "Pending",
    due: "Jul 02",
    update: "Draft structure aligned with product and revenue leads.",
  },
];

export const quarterlyUpdates = [
  {
    week: "Week 4",
    note: "Customer outcome goals gained momentum after revised segmentation.",
    sentiment: "Positive",
  },
  {
    week: "Week 8",
    note: "Operational goal needs manager help to unblock data access.",
    sentiment: "Needs review",
  },
  {
    week: "Week 12",
    note: "Final calibration expected to land between 78% and 84%.",
    sentiment: "Forecast",
  },
];

export const teamMembers = [
  {
    name: "Aarav Mehta",
    role: "Product Analyst",
    goals: 5,
    progress: 64,
    status: "At Risk" as GoalStatus,
  },
  {
    name: "Isha Kapoor",
    role: "UX Researcher",
    goals: 6,
    progress: 88,
    status: "On Track" as GoalStatus,
  },
  {
    name: "Kabir Shah",
    role: "Frontend Engineer",
    goals: 4,
    progress: 91,
    status: "Completed" as GoalStatus,
  },
  {
    name: "Mira Sen",
    role: "Customer Success Lead",
    goals: 5,
    progress: 72,
    status: "Approved" as GoalStatus,
  },
];

export const managerGoalQueue: GoalItem[] = [
  {
    id: 101,
    owner: "Aarav Mehta",
    title: "Reduce enterprise report turnaround",
    category: "Operational Excellence",
    progress: 58,
    weight: 25,
    status: "Pending",
    due: "Jun 27",
    update: "Needs platform analytics dependency review.",
  },
  {
    id: 102,
    owner: "Isha Kapoor",
    title: "Complete journey mapping for renewals",
    category: "Customer Outcomes",
    progress: 76,
    weight: 30,
    status: "Pending",
    due: "Jun 24",
    update: "Research synthesis complete for mid-market cohort.",
  },
  {
    id: 103,
    owner: "Mira Sen",
    title: "Increase health-score adoption",
    category: "Customer Success",
    progress: 68,
    weight: 35,
    status: "Approved",
    due: "Jun 30",
    update: "Enablement package is being piloted with two pods.",
  },
];

export const teamProgressData = [
  { name: "Aarav", progress: 64, target: 80 },
  { name: "Isha", progress: 88, target: 80 },
  { name: "Kabir", progress: 91, target: 80 },
  { name: "Mira", progress: 72, target: 80 },
  { name: "Dev", progress: 79, target: 80 },
];

export const completionByStatus = [
  { name: "Completed", value: 28, fill: "#22c55e" },
  { name: "On Track", value: 44, fill: "#38bdf8" },
  { name: "At Risk", value: 18, fill: "#f59e0b" },
  { name: "Pending", value: 10, fill: "#a78bfa" },
];

export const departmentCompletion = [
  { name: "Growth", completion: 82 },
  { name: "Product", completion: 74 },
  { name: "Support", completion: 69 },
  { name: "People", completion: 91 },
  { name: "Revenue", completion: 78 },
];

export const adminAuditLogs = [
  {
    event: "Goal cycle opened",
    owner: "Admin Console",
    time: "Today, 09:10",
    severity: "Info",
  },
  {
    event: "Bulk import validated",
    owner: "People Ops",
    time: "Today, 10:35",
    severity: "Success",
  },
  {
    event: "Weightage exception flagged",
    owner: "Compliance Bot",
    time: "Yesterday, 16:22",
    severity: "Review",
  },
  {
    event: "Q1 archive exported",
    owner: "System",
    time: "May 15, 18:05",
    severity: "Info",
  },
];

export const navigation = {
  employee: [
    { label: "Overview", href: "/employee", icon: LayoutDashboard },
    { label: "My Goals", href: "/employee", icon: Target },
    { label: "Quarterly Updates", href: "/employee", icon: FileClock },
  ],
  manager: [
    { label: "Team Overview", href: "/manager", icon: Users },
    { label: "Approvals", href: "/manager", icon: ClipboardCheck },
    { label: "Analytics", href: "/manager", icon: LineChart },
  ],
  admin: [
    { label: "System Health", href: "/admin", icon: Activity },
    { label: "Cycles", href: "/admin", icon: Goal },
    { label: "Controls", href: "/admin", icon: LockKeyholeOpen },
    { label: "Audit Logs", href: "/admin", icon: ShieldCheck },
  ],
};

export const goalCompletionTrend = [
  { name: "Apr", completion: 56, submissions: 42 },
  { name: "May", completion: 68, submissions: 66 },
  { name: "Jun", completion: 79, submissions: 84 },
  { name: "Jul", completion: 86, submissions: 91 },
];

export const chartPalette = {
  cyan: "#38bdf8",
  green: "#22c55e",
  violet: "#a78bfa",
  amber: "#f59e0b",
  rose: "#fb7185",
};

export const chartIcons = {
  bar: BarChart3,
};
