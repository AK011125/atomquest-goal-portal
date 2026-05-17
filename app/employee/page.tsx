import { Card, CardContent } from "@/components/ui/card";

export default function EmployeePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Employee Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg text-zinc-400">
              Goals
            </h2>

            <p className="text-5xl font-bold mt-4">
              5
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg text-zinc-400">
              Progress
            </h2>

            <p className="text-5xl font-bold mt-4 text-green-400">
              72%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg text-zinc-400">
              Status
            </h2>

            <p className="text-5xl font-bold mt-4 text-blue-400">
              On Track
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}