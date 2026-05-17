import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const goals = [
  {
    title: "Increase Sales Revenue",
    progress: 80,
    status: "On Track",
  },
  {
    title: "Reduce Customer Response Time",
    progress: 60,
    status: "In Progress",
  },
  {
    title: "Complete AI Integration",
    progress: 95,
    status: "Almost Done",
  },
];

export default function EmployeePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employee Dashboard
      </h1>

      <div className="grid gap-6">
        {goals.map((goal, index) => (
          <Card
            key={index}
            className="bg-zinc-900 border-zinc-800"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  {goal.title}
                </h2>

                <span className="text-sm bg-zinc-800 px-3 py-1 rounded-full">
                  {goal.status}
                </span>
              </div>

              <Progress value={goal.progress} />

              <p className="mt-4 text-zinc-400">
                Progress: {goal.progress}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}