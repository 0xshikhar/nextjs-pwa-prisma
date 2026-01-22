import SetupInstructions from "./setup-instructions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SetupPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Superblog</CardTitle>
          <CardDescription>
            It looks like your database isn&apos;t set up yet. Follow the
            instructions below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupInstructions />
        </CardContent>
      </Card>
    </div>
  );
}
