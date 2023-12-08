import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function page() {
  return (
    <div className="min-w-screen flex items-center justify-center min-h-screen">
      <div className="max-w-[1440px] w-full flex gap-8">
        <div className="flex flex-col  gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[3rem] monster font-bold">
              Let's get started<span className="text-secondary">.</span>
            </span>
            <span>Your gateway to a personalized experience.</span>
          </div>

          <Card className="p-8">
            <Button className="w-full">Login</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default page;
