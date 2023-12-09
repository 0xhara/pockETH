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
import { ExternalLink, Github, Leaf } from "lucide-react";
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

import m1 from "../public/m1.png";
import FaqList from "@/components/faq";

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

  const expensePooling = [
    {
      title: "Pooling Finances for Shared Experiences",
      description: "Effortless Fund Collection for Your Planned Events",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "A Wallet for Every Occasion",
      description:
        "Simplify Budgeting with Our Intuitive Expense Pooling System",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "From Contributions to Celebrations",
      description:
        "Bringing Your Group Together Through Smart Financial Planning",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
  ];

  const myArrayWithIcons = [
    { item: "Rent", icon: "🏠" },
    { item: "Vacation Funds", icon: "🏖" },
    { item: "Sports Leagues", icon: "🏀" },
    { item: "Gifts", icon: "🎁" },
    { item: "Baby Showers", icon: "🍼" },
    { item: "Teacher Appreciation", icon: "🧑‍🏫" },
    { item: "Graduation Gifts", icon: "🎁" },
    { item: "Class Reunions", icon: "🎓" },
    { item: "Cash Registry", icon: "💸" },
    { item: "Weddings", icon: "💍" },
    { item: "Community Projects", icon: "🌻" },
    { item: "Club Dues", icon: "👥" },
    { item: "Emergency Funds", icon: "🚨" },
    { item: "Memorials", icon: "💛" },
    { item: "Bands", icon: "🎸" },
    { item: "Netflix", icon: "🍿" },
    { item: "Home Improvement Projects", icon: "🛠" },
  ];

  const faqList = [
    {
      question: "How do I begin using the platform?",
      answer:
        "To start, create an account and explore the intuitive features in your dashboard. Our onboarding process is designed to make your experience seamless.",
    },
    {
      question: "How is my data secured on the platform?",
      answer:
        "We prioritize your security. Your data is encrypted, and we employ the latest security protocols to ensure the confidentiality and integrity of your information.",
    },
    {
      question: "How do transactions work on the platform?",
      answer:
        "Transactions are straightforward. Simply navigate to the 'Transactions' section, choose the desired action, and follow the prompts. Our platform ensures transparency and efficiency.",
    },
    {
      question: "Can I collaborate with others on financial activities?",
      answer:
        "Absolutely! Our platform is designed for collaborative financial activities. You can create shared wallets, split expenses, and manage funds seamlessly with your group.",
    },
    {
      question: "How can I use the platform for event planning?",
      answer:
        "Plan your events effortlessly! Create an event-specific wallet, invite participants, and collect contributions. Track expenses and ensure a hassle-free financial experience during your event.",
    },
    {
      question: "What if I encounter issues or have questions?",
      answer:
        "Our dedicated support team is here for you. Reach out through the 'Help' section, and we'll promptly assist you with any issues or queries you may have.",
    },
  ];

  const footerLinks = [
    [
      { url: "https://github.com/yourusername", text: "GitHub" },
      { url: "https://twitter.com/yourtwitter", text: "Twitter" },
      { url: "https://www.instagram.com/yourinstagram", text: "Instagram" },
      { url: "https://www.facebook.com/yourfacebook", text: "Facebook" },
      { url: "https://www.linkedin.com/in/yourlinkedin", text: "LinkedIn" },
    ],
    [
      { url: "https://www.yourwebsite.com/terms", text: "Terms of Service" },
      { url: "https://www.yourwebsite.com/privacy", text: "Privacy Policy" },
      { url: "https://www.yourwebsite.com/contact", text: "Contact Us" },
      { url: "https://www.yourwebsite.com/about", text: "About Us" },
      { url: "https://www.yourwebsite.com/faq", text: "FAQs" },
    ],
    [
      { url: "https://www.yourwebsite.com/terms", text: "Connect on LinkedIn" },
      { url: "https://www.yourwebsite.com/privacy", text: "Privacy Policy" },
    ],
  ];

  // Accessing an example link and text
  console.log(footerLinks[0][0].url); // Output: https://github.com/yourusername
  console.log(footerLinks[0][0].text); // Output: GitHub

  // Accessing elements in the array
  console.log(myArrayWithIcons[0].item); // Outputs: Rent
  console.log(myArrayWithIcons[0].icon); // Outputs: 🏠

  return (
    <>
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
        <div className="flex gap-4 items-center min-h-[75vh] max-w-[1440px] w-full">
          <div className="flex flex-col justify-center mt-[10rem] min-h-[600px] gap-4 items-start ">
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

          <div className="w-full mt-[4rem] gap-8 mb-[4rem]">
            <div className="flex items-center justify-center gap-4">
              <div className="flex w-full flex-col gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="text-[1.5rem] font-bold monster">
                        Stats Title
                      </span>
                      <span className="text-[1.25rem]">
                        Stats description will go here with color
                      </span>
                    </div>
                  </>
                ))}
              </div>
              <img className="lg:w-[48%]" src={"m1.png"} />
            </div>
            <div className="flex items-center text-right flex-row-reverse justify-center gap-4">
              <div className="flex w-full flex-col gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="text-[1.5rem] font-bold monster">
                        Stats Title
                      </span>
                      <span className="text-[1.25rem]">
                        Stats description will go here with color
                      </span>
                    </div>
                  </>
                ))}
              </div>
              <img className="lg:w-[48%]" src={"m1.png"} />
            </div>
          </div>
        </div>

        <div className="mt-[4rem] max-w-[1440px] items-center flex flex-col gap-[4rem] mb-[4rem]">
          <span className="text-[3rem] font-bold">
            How can you use <Logo className={"text-[3rem]"} /> ?
          </span>

          <div className="w-[70%] flex items-center justify-center flex-wrap gap-6">
            {myArrayWithIcons.map((_, i) => (
              <>
                <Card className="p-4 hover:bg-secondary monstser transition-all duration-200 ease-in-out cursor-pointer items-center justify-center pl-6 pr-6 text-[1.35rem] font-bold tracking-wider">
                  {_.icon} {_.item}
                </Card>
              </>
            ))}
          </div>
        </div>

        <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] mt-[4rem] mb-[4rem]">
          <span className="text-[3rem] font-bold monster">
            Expense Pooling Made Easy <span className="text-accent">!!</span>
          </span>

          <div className="w-full gap-12 grid grid-cols-3">
            {expensePooling.map((_, i) => (
              <>
                <Card
                  className="w-full  backdrop-blur-sm bg-white dark:text-black dark:hover:text-white  border-black flex flex-col gap-4 p-4 pl-8 pr-8 min-h-[200px] hover:bg-slate-600 transition-all ease-in-out duration-300"
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
        <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] mt-[4rem] mb-[4rem]">
          <span className="text-[3rem] font-bold monster">
            Frequently Asked <span className="text-accent">Questions</span>
          </span>

          <div className="w-full gap-12 flex flex-col">
            {faqList.map((_, i) => (
              <>
                <FaqList title={_.question} content={_.answer} />
              </>
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full flex items-end justify-center pt-12 pb-8 bg-black">
        <div className="flex flex-col gap-8 max-w-[1440px] w-full">
          <Logo />
          <div className="grid grid-cols-3 gap-4">
            {footerLinks.map((list, i) => {
              return (
                <div className="flex flex-col gap-4">
                  {list.map((_, i) => (
                    <>
                      <Link
                        href={_.url}
                        className="text-[18px] flex gap-2 items-center text-white"
                      >
                        {_.text} <ExternalLink className="h-4 w-4" />
                      </Link>
                    </>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
