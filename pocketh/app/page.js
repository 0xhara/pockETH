"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

//from here
// import { AlchemyProvider, ethers } from "ethers";

import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { polygonMumbai } from "viem/chains";
// import { createMagicSigner } from "./magic";
import { WalletClientSigner } from "@alchemy/aa-core";
// import { web3authSigner } from "./web3Auth";
// import { web3auth } from "../lib/action/main";
import {
  createWalletClient,
  custom,
  createPublicClient,
  http,
  PublicClient,
} from "viem";
import { encodeFunctionData } from "viem";
import { Card } from "@/components/ui/card";

import { abi } from "../lib/abi.json";
const chain = polygonMumbai;

import { Web3Auth } from "@web3auth/modal";
import { Github, Leaf } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// see https://web3auth.io/docs/quick-start for more info
const web3auth = new Web3Auth({
  clientId:
    "BAS_gcrlMi6qZszD3l6ftWG22VAQCx5p7dEyKyZx0FnSWBYgxKOJ2y0SzRz7dZNUr7VX6Ow-ARcw_z3upiTQaUU", // Get your Client ID from the Web3Auth Dashboard
  web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x13881",
    rpcTarget: "https://rpc-mumbai.maticvigil.com/",
    //"https://rpc.ankr.com/eth"
    displayName: "Polygon Mumbai",
    ticker: "MATIC",
  },
});

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null);
  const [client, setClient] = useState(null);

  //   const [web3AuthSigner,setWeb3AuthSigner]=useState(null);

  console.log("client side abi ", chain);

  useEffect(() => {
    const init = async () => {
      await web3auth.initModal();
      const temp_client = createPublicClient({
        chain: chain,
        transport: http(),
      });
      setClient(temp_client);
    };
    init();
  }, []);

  useEffect(() => {
    if (owner) {
      //get Alchemy provider from web3Auth signer
      console.log("inside");
      const getProvider = async () => {
        console.log("inside get provider", chain);
        const fetch_prov = new AlchemyProvider({
          chain,
          apiKey: "N_-JU1B2XbGAPiCpCE0CSv7Y9P5CFP-D",
        }).connect(
          (rpcClient) =>
            new LightSmartContractAccount({
              chain: rpcClient.chain,
              owner: owner, // this is link to web3
              factoryAddress: getDefaultLightAccountFactoryAddress(chain),
              rpcClient,
            })
        );
        setProvider(fetch_prov);
      };
      getProvider();
    } else {
      console.log("no owner");
    }
  }, [owner]);

  useEffect(() => {
    if (provider) {
      const getAddress = async () => {
        const add = await provider?.getAddress();
        setAddress(add);
        setIsConnected(true);
        console.log(address);
      };
      getAddress();
    }
  }, [provider]);

  const handleConnect = async () => {
    try {
      await web3auth.connect();
      const web3authClient = createWalletClient({
        transport: custom(web3auth.provider),
      });

      // a smart account signer you can use as an owner on ISmartContractAccount
      const web3authSigner = new WalletClientSigner(
        web3authClient,
        "web3auth" // signerType
      );
      setOwner(web3authSigner);
    } catch (error) {
      console.log("Error creating signer:", error);
    }
  };

  const handleDisconnect = async () => {
    await web3auth.logout();
    setProvider(null);
    setOwner(null);
    setIsConnected(false);
  };

  const sendTx = async () => {
    //use this block for sending write requests
    const uoCallData = encodeFunctionData({
      abi: abi,
      functionName: "incrementCount",
    });

    provider?.withAlchemyGasManager({
      policyId: "c1e552f7-5557-42aa-8a24-0c55895f35db", // replace with your policy id, get yours at https://dashboard.alchemy.com/
    });
    const uo = await provider?.sendUserOperation({
      target: "0x464251C90969F21c82C57Da3001eEd7019AEF646",
      data: uoCallData,
    });

    const txHash = await provider?.waitForUserOperationTransaction(uo.hash);

    console.log(txHash, uo);
    readRequest();
  };
  const readRequest = async () => {
    //use this block for sending read requests.it uses publicClient.

    // console.log("client is ",client)
    const d = Number(
      await client.readContract({
        address: "0x464251C90969F21c82C57Da3001eEd7019AEF646",
        abi: abi,
        functionName: "count",
      })
    );
    setData(d);
  };
  const codeOfSafe = () => {
    // const safeAuthInitOptions = {
    //   showWidgetButton: true, // Set to true to show the SafeAuth widget button
    //   chainConfig: {
    //     blockExplorerUrl: "https://etherscan.io", // The block explorer URL
    //     chainId: "0x13881", // The chain ID
    //     displayName: "Mumbai", // The chain name
    //     rpcTarget: "https://endpoints.omniatech.io/v1/matic/mumbai/public", // The RPC target
    //     ticker: "ETH", // The chain ticker
    //     tickerName: "Ethereum", // The chain ticker name
    //   },
    // };
    // const safeAuthPack = new SafeAuthPack({
    //   // txServiceUrl: "https://safe-transaction-mainnet.safe.global",
    // });
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [eoa, setEoa] = useState(null);
    // const [safeAd, setSafeAd] = useState("");
    // async function init() {
    //   try {
    //     await safeAuthPack.init(safeAuthInitOptions);
    //     // const { eoa, safes } = await safeAuthPack.signIn();
    //   } catch (error) {
    //     console.error("Error initializing SafeAuthPack:", error);
    //   }
    // }
    // useEffect(() => {
    //   init().then(() => {
    //     console.log("SafeAuthPack initialized", safeAuthPack);
    //     // setIsAuthenticated(safeAuthPack?.isAuthenticated);
    //     // console.log(safeAuthPack?.isAuthenticated, "safeAuthPack Authenticated");
    //   });
    // }, []);
    // // useEffect(() => {
    // //   getUserInfo();
    // // }, []);
    // const login = async () => {
    //   const loginValue = await safeAuthPack.signIn();
    //   setEoa(loginValue.eoa);
    //   console.log(loginValue, "loginValue");
    //   // console.log(eoa, "this is eoa");
    //   // console.log(safeAuthSignInResponse, "safeAuthSignInResponse");
    // };
    // const getUserInfo = async () => {
    //   const safeAuthUserInfoResponse = await safeAuthPack?.getUserInfo();
    //   console.log(safeAuthUserInfoResponse, "safeAuthUserInfoResponse User Info");
    // };
    // const logout = async () => {
    //   const safeAuthSignOutResponse = await safeAuthPack?.signOut();
    //   console.log(safeAuthSignOutResponse, "safeAuthSignOutResponse");
    // };
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
  };

  const howItWorks = [
    {
      title: "Decentralized Ledger at Work",
      description: "Explore the Inner Workings of our Blockchain DApp",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "From Transactions to Transparency",
      description:
        "Unraveling the Mechanics of Seamless Financial Collaboration",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "Empowering Users, Ensuring Security",
      description:
        "A Glimpse into the Functionality and Safety Measures of our Platform",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-center items-center min-w-screen">
      {/* <div>
        <Card>
          <h1>magic -alchemy</h1>
          <button onClick={handleConnect}>Connect</button>

          {isConnected ? (
            <p>smart account address is {address} </p>
          ) : (
            <p>..loading</p>
          )}
          {isConnected && (
            <button onClick={handleDisconnect}>Disconnect</button>
          )}

          <Button variant="contained" onClick={sendTx}>
            Make a Tx
          </Button>
          <div>
            <p>data is {data} </p>
          </div>
        </Card>
      </div> */}
      <div className="flex flex-col gap-4">
        {/* <Button onClick={login}>Login</Button>
        <Button onClick={getUserInfo}>Get User Info</Button> */}
        {/* <Button onClick={providerDetails}>Provider</Button> */}

        {/* <span>safeAd</span> */}
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
            <Link href={"/login"}>
              <Button className="flex gap-2 items-center">
                <Leaf /> Get Started
              </Button>
            </Link>
            <Button className="flex gap-2 items-center" variant="outlined">
              <Github />
              View Code on Github
            </Button>
          </div>
        </div>
        <div>
          <img src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png" />
        </div>
      </div>

      <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] mt-[8rem]">
        <span className="text-[3rem] font-bold monster">
          How does <Logo className={"text-[3rem]"} /> work?
        </span>

        <div className="w-full gap-12 grid grid-cols-3">
          {howItWorks.map((_, i) => (
            <>
              <Card
                className="w-full  backdrop-blur-sm bg-white/20 border-black flex flex-col gap-4 p-4 pl-8 pr-8 min-h-[200px] hover:bg-slate-600 transition-all ease-in-out duration-300"
                key={i}
              >
                <Avatar className="h-[4rem] w-[4rem]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-[1.5rem] font-bold monster">
                  {_.title}
                </span>
                <span className="font-light">{_.description}</span>
              </Card>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
