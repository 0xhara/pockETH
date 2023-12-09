"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import lighthouse from "@lighthouse-web3/sdk";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFiles } from "@/lib/action/main";
import { FolderPlus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

function page() {
  const pictureRef = useRef(null);
  const dealParams = {
    num_copies: 2,
  };
  console.log(process.env.NEXT_PUBLIC_LIGHTHOUSE_API, "this is api");

  const uploadFiles = async (url) => {
    console.log(url, "this is url");
    try {
      // const uploadResponse = await lighthouse.upload({
      //   sourcePath: "C:/Users/Pritam/Downloads/652shots_so.png",
      //   apiKey: process.env.NEXT_PUBLIC_LIGHTHOUSE_API,
      //   multi: false,
      //   dealParameters: dealParams,
      // });

      const uploadResponse = await lighthouse.upload(
        "/home/cosmos/Desktop/wow.jpg",
        "YOUR_API_KEY_HERE"
      );
    } catch (error) {
      console.error("Error uploading file:", error.response?.data);
    }

    // console.log(uploadResponse, "this is data", false, dealParams);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(
      file,
      "YOUR_API_KEY",
      false,
      null,
      progressCallback
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };
  return (
    <Dialog>
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

              <DialogTrigger asChild>
                <Button variant="outlined" className="flex gap-4 text-[1.5rem]">
                  Create <FolderPlus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div>
                    <Input
                      onChange={handleImageChange}
                      ref={pictureRef}
                      id="picture"
                      type="file"
                    />

                    <input
                      onChange={(e) => uploadFile(e.target.files)}
                      type="file"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      const data = uploadFiles(pictureRef.current.files[0]);

                      console.log(data);
                    }}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
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
              <Link key={i} href={`/pocket/?id=${i}`}>
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
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default page;
