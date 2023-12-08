"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  SafeAuthPack,
  SafeAuthConfig,
  SafeAuthInitOptions,
} from "@safe-global/auth-kit";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const safeAuthInitOptions = {
    showWidgetButton: true, // Set to true to show the SafeAuth widget button
    chainConfig: {
      blockExplorerUrl: "https://etherscan.io", // The block explorer URL
      chainId: "0x5", // The chain ID
      displayName: "Ethereum Goerli", // The chain name
      rpcTarget: "https://rpc.ankr.com/eth_goerli", // The RPC target
      ticker: "ETH", // The chain ticker
      tickerName: "Ethereum", // The chain ticker name
    },
  };

  const safeAuthPack = new SafeAuthPack({
    // txServiceUrl: "https://safe-transaction-mainnet.safe.global",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function init() {
    try {
      await safeAuthPack.init(safeAuthInitOptions);
      // const { eoa, safes } = await safeAuthPack.signIn();
    } catch (error) {
      console.error("Error initializing SafeAuthPack:", error);
    }
  }

  useEffect(() => {
    init().then(() => {
      console.log("SafeAuthPack initialized", safeAuthPack);
      // setIsAuthenticated(safeAuthPack?.isAuthenticated);
      // console.log(safeAuthPack?.isAuthenticated, "safeAuthPack Authenticated");
    });
  }, []);

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  const login = async () => {
    const loginValue = await safeAuthPack.signIn();
    console.log(loginValue, "loginValue");
    // console.log(safeAuthSignInResponse, "safeAuthSignInResponse");
  };

  const getUserInfo = async () => {
    const safeAuthUserInfoResponse = await safeAuthPack?.getUserInfo();

    console.log(safeAuthUserInfoResponse, "safeAuthUserInfoResponse User Info");
  };

  const logout = async () => {
    const safeAuthSignOutResponse = await safeAuthPack?.signOut();

    console.log(safeAuthSignOutResponse, "safeAuthSignOutResponse");
  };
  return (
    <main className="min-h-screen flex justify-center items-center min-w-screen">
      <Button onClick={login}>Login</Button>
      <div className="flex gap-4 max-w-[1440px] w-full">
        <div className="flex flex-col gap-4 items-start ">
          <Badge>Team Name</Badge>
          <span className="text-[4rem] font-bold monster">
            Decentralized Expense Harmony
          </span>
          <span className="font-light">
            Empower Your Group Finances with Blockchain for Seamless Event
            Spending
          </span>

          <div className="flex mt-[2rem] gap-4">
            <Button>Get Started</Button>
            <Button variant="outlined">View Github</Button>
          </div>
        </div>
        <div>
          <img src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png" />
        </div>
      </div>
    </main>
  );
}
