import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Card className="w-[400px] bg-zinc-900 border-zinc-800">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            AtomQuest Portal
          </h1>

          <div className="space-y-4">
            <Button className="w-full">
              Login as Employee
            </Button>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Login as Manager
            </Button>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Login as Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}