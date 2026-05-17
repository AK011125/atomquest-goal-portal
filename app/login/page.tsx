"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Card className="w-[400px] bg-zinc-900 border-zinc-800">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            AtomQuest Portal
          </h1>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => router.push("/employee")}
            >
              Login as Employee
            </Button>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/manager")}
            >
              Login as Manager
            </Button>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/admin")}
            >
              Login as Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}