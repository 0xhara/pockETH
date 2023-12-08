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
import { ethers } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

export default function Home() {
  const safeAuthInitOptions = {
    showWidgetButton: true, // Set to true to show the SafeAuth widget button
    chainConfig: {
      blockExplorerUrl: "https://etherscan.io", // The block explorer URL
      chainId: "0x13881", // The chain ID
      displayName: "Mumbai", // The chain name
      rpcTarget: "https://endpoints.omniatech.io/v1/matic/mumbai/public", // The RPC target
      ticker: "ETH", // The chain ticker
      tickerName: "Ethereum", // The chain ticker name
    },
  };

  const safeAuthPack = new SafeAuthPack({
    // txServiceUrl: "https://safe-transaction-mainnet.safe.global",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [eoa, setEoa] = useState(null);
  const [safeAd, setSafeAd] = useState("");

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
    setEoa(loginValue.eoa);
    console.log(loginValue, "loginValue");
    // console.log(eoa, "this is eoa");
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

  // const providerDetails = async () => {
  //   // Wrap EIP-1193 provider with ethers
  //   const provider = new ethers.BrowserProvider(safeAuthPack.getProvider());
  //   const signer = provider.getSigner();

  //   // Create the Safe EthersAdapter
  //   const ethAdapter = new EthersAdapter({
  //     ethers,
  //     signerOrProvider: signer || provider,
  //   });

  //   const safeFactory = await SafeFactory.create({
  //     ethAdapter,
  //   });

  //   const owners = [eoa];

  //   const safeAccountConfig = {
  //     owners,
  //     threshold: 1,
  //   };
  //   const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });

  //   const safeAddress = safeFactory.getAddress();

  //   console.log(safeAddress, "this is safeAddress");
  // };

  // Instantiate the protocolKit
  // const protocolKit = await Safe.create({
  //   ethAdapter,
  //   safeAddress,
  // })

  // Create a Safe transaction with the provided parameters
  // const safeTransactionData = {
  //   to: `${ethAddress}`,
  //   data: "0x",
  //   value: ethers.parseUnits("0.0001", "ether").toString(),
  // };

  // const safeTransaction = await protocolKit.createTransaction({
  //   transactions: [safeTransactionData],
  // })

  // Sign the transaction if the Safe have several owners
  // safeTransaction = await protocolKit1.signTransaction(safeTransaction)
  // safeTransaction = await protocolKit2.signTransaction(safeTransaction)

  // Execute the transaction
  // await protocolKit.executeTransaction(safeTransaction)

  return (
    <main className="min-h-screen flex justify-center items-center min-w-screen">
      <div className="flex flex-col gap-4">
        <Button onClick={login}>Login</Button>
        <Button onClick={getUserInfo}>Get User Info</Button>
        {/* <Button onClick={providerDetails}>Provider</Button> */}

        <span>safeAd</span>
      </div>
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
