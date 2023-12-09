import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen min-w-screen flex items-center gap-[4rem]">
      <Card className="p-4 pl-4 h-screen pr-4  flex flex-col  gap-4">
        <span className="text-[1.2rem] monster font-bold opacity-70 mb-[1rem] border-b-2 pb-[1rem]">
          Previous pockEth
        </span>
        {Array.from({ length: 4 }).map((_, i) => (
          <>
            <Link href={`/pocket/?id=${i}`}>
              <Card className="p-2 gap-4 flex cursor-pointer justify-between pl-4 pr-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-2">
                    <span className="font-bold">
                      Name of the Pocket {"  " + i + 1}
                    </span>
                    <span className="text-[0.75rem]">Address :- 0xDeK7</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">0.0001 ETH</span>
                  <span className="text-[0.75rem]">0xDeK7</span>
                </div>
              </Card>
            </Link>
          </>
        ))}
      </Card>
      <div className="w-full flex justify-center items-center h-screen">
        <div className="flex flex-col  items-center">
          <div className="flex items-center lg:min-w-[800px] justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[3rem] monster font-semibold">
                Pocket Name
              </span>
              <span className="opacity-75">Address :- 0xBjd89cy89nsdfj90</span>
            </div>
            <Avatar className="h-[4rem] w-[4rem]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col w-full mt-[4rem] gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <>
                <Card className="w-full  p-2 pl-8 pr-8">
                  <div className="flex items-center justify-between">
                    <div className="flex justify-between  flex-col gap-2">
                      <span className="font-bold">Name of the Pocket</span>
                      <span className="opacity-70">
                        Address :- 0xBjd89cy89nsdfj90
                      </span>
                    </div>
                    <span className="font-bold">0.1 ETH</span>
                  </div>
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
