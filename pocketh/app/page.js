"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  SafeAuthPack,
  SafeAuthConfig,
  SafeAuthInitOptions,
} from "@safe-global/auth-kit";

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

  const safeAuthPack = new SafeAuthPack();

  // console.log(safeAuthPack?.isAuthenticated, "safeAuthPack");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await safeAuthPack.init(safeAuthInitOptions);
      } catch (error) {
        console.error("Error initializing SafeAuthPack:", error);
      }
    }
    init();
  }, []);

  const login = async () => {
    const safeAuthSignInResponse = await safeAuthPack.signIn();

    console.log(safeAuthSignInResponse, "safeAuthSignInResponse");
  };

  const getUserInfo = async () => {
    const safeAuthUserInfoResponse = await safeAuthPack?.getUserInfo();
  };

  const logout = async () => {
    const safeAuthSignOutResponse = await safeAuthPack?.signOut();

    console.log(safeAuthSignOutResponse, "safeAuthSignOutResponse");
  };
  return (
    <main className="dark">
      <p>Hello</p>
      <Button onClick={login}>Login</Button>

      <Button onClick={logout}>Logout</Button>
    </main>
  );
}
