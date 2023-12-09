import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FolderPlus, Trash2 } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="max-w-[1440px] flex flex-col gap-8">
        <span>
          Welcome Back, <span className="font-bold">0xDeK7</span>
        </span>
        <span className="text-[4rem] font-bold monster">0 ETH</span>
        <div className="flex flex-col items-end justify-start">
          <span>Available to Spend</span>
          <Link className="text-blue-700" href={"/"}>
            Get free funds
          </Link>
        </div>
        <div className="flex gap-8">
          <Card className="p-4 flex cursor-pointer flex-col gap-4 items-center lg:max-w-[280px] opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
            <img
              className=""
              src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png"
            ></img>
            <Button variant="outlined" className="flex gap-4 text-[1.5rem]">
              Create <FolderPlus />
            </Button>
          </Card>
          <Card className="p-4 cursor-pointer flex flex-col gap-4 items-center lg:max-w-[280px] opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
            <img src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png"></img>
            <Button variant="outlined" className="flex gap-4 text-[1.5rem]">
              Remove <Trash2 />
            </Button>
          </Card>
        </div>

        <div className="flex justify-between">
          <span className="text-[1.25rem]">
            Previous <span className="font-bold">pockEth</span>
          </span>
          <Link href={"/"}>View all</Link>
        </div>

        <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default page;
