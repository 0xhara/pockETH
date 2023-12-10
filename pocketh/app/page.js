"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";

//from here
// import { AlchemyProvider, ethers } from "ethers";

import { StripeAdapter } from "@stripe/stripe-js";

import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { polygonMumbai } from "viem/chains";
import { WalletClientSigner } from "@alchemy/aa-core";
import { ethers } from "ethers";

import {
  createWalletClient,
  custom,
  createPublicClient,
  http,
  PublicClient,
} from "viem";
import { encodeFunctionData } from "viem";
import { Card, CardContent } from "@/components/ui/card";
import { abi as abiFactory } from "../lib/factoryAbi.json";
import { abi as abiPocket } from "../lib/pocketAbi.json";

const chain = polygonMumbai;
const factoryAddress = "0xE84C255e649441b59d94f8488F54ba807FC27Df9";

import { Web3Auth } from "@web3auth/modal";
import {
  Copyright,
  ExternalLink,
  FolderPlus,
  Github,
  GithubIcon,
  Leaf,
  Trash2,
} from "lucide-react";
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
    rpcTarget:
      "https://polygon-mumbai.g.alchemy.com/v2/rSk6bxEUS95Gwf_NsxAcM7_AWfU58hXK",
    displayName: "Polygon Mumbai",
    ticker: "MATIC",
  },
});

import m1 from "../public/m1.png";
import FaqList from "@/components/faq";
import Lenis from "@studio-freight/lenis";
import { redirect } from "next/navigation";
import { useUserData } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Home() {
  // const { setContractAddress } = useUserData();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [txnAmount, setAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null); //addresses of pockets
  const [pocketsData, setPocketsData] = useState([]);
  const [client, setClient] = useState(null);

  //   const [web3AuthSigner,setWeb3AuthSigner]=useState(null);

  useEffect(() => {
    // console.log("abi is ",abi);
    const init = async () => {
      await web3auth.initModal();
      const temp_client = createPublicClient({
        chain: chain,
        transport: http(),
      });
      setClient(temp_client);

      localStorage.setItem("client", temp_client);
    };
    init();
  }, []);

  useEffect(() => {
    if (owner) {
      //get Alchemy provider from web3Auth signer
      console.log("inside");
      const getProvider = async () => {
        const fetch_prov = new AlchemyProvider({
          apiKey: "rSk6bxEUS95Gwf_NsxAcM7_AWfU58hXK",
          chain,
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
        localStorage.setItem("address", JSON.stringify(add));

        // redirect("/dashboard");
        // redirectUser("/dashboard");
        // console.log("address is ", address);
      };
      getAddress();
    }
  }, [provider]);

  useEffect(() => {
    if (address) {
      readRequest();
    }
  }, [address]);

  const redirectUser = (url) => {
    redirect(url);
  };

  // useEffect(() => {
  //   if (address) {
  //     redirect("/dashboard");
  //   }
  // }, [address]);

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
      // setSmartContract("testing");

      handleAdding();
    } catch (error) {
      console.log("Error creating signer:", error);
    }
  };

  const handleDisconnect = async () => {
    await web3auth.logout();
    setProvider(null);
    setOwner(null);
    setAddress(null);
    setIsConnected(false);
  };

  const sendTx = async () => {
    //use this block for sending write requests
    const uoCallData = encodeFunctionData({
      abi: abiFactory,
      functionName: "createPocket",
      args: [title, desc, txnAmount, address],
    });

    provider.withAlchemyGasManager({
      policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id, get yours at https://dashboard.alchemy.com/
    });
    const uo = await provider.sendUserOperation({
      target: factoryAddress, //factory contract
      data: uoCallData,
    });

    const txHash = await provider.waitForUserOperationTransaction(uo.hash);

    console.log(txHash, uo);
    readRequest();
  };
  const readRequest = async () => {
    const pockets = await client.readContract({
      address: factoryAddress,
      abi: abiFactory,
      functionName: "getPocketsByOwner",
      args: [address],
    });
    setData(pockets);
  };

  useEffect(() => {
    if (data) {
      console.log("data is ", data);
      const fetchData = async () => {
        let pocketDataArray = [];
        for (let i = 0; i < data.length; i++) {
          const pocketData = await fetchVariables(data[i].toString());
          pocketDataArray.push(pocketData);
        }
        setPocketsData(pocketDataArray);
        console.log("fetching pockets data", pocketsData);
      };
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (pocketsData) {
      console.log(pocketsData);
    }
  }, [pocketsData]);

  async function fetchVariables(PocketContractAddress) {
    const Rpcprovider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/rSk6bxEUS95Gwf_NsxAcM7_AWfU58hXK"
    );

    // Initialize the ethers.js contract object
    const PocketContract = new ethers.Contract(
      PocketContractAddress,
      abiPocket,
      Rpcprovider
    );

    let title = await PocketContract.title();
    let description = await PocketContract.description();
    let targetAmount = await PocketContract.targetAmount();
    // let txData = await PocketContract.contributions();

    const value = {
      title: title,
      description: description,
      targetAmount: targetAmount,
    };
    return value;
  }

  const contribute = async (PocketContractAddress, amountInMatic) => {
    // Generate the data for the contract function call
    const uoCallData = encodeFunctionData({
      abi: abiPocket,
      functionName: "contribute",
    });

    provider.withAlchemyGasManager({
      policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id
    });

    // Send the transaction
    const uo = await provider.sendUserOperation({
      target: PocketContractAddress, // Pocket contract
      data: uoCallData,
      value: ethers.utils.parseEther(amountInMatic), // converts the ether string to wei
    });

    // Wait for it to be mined and get the transaction hash
    const txHash = await provider.waitForUserOperationTransaction(uo.hash);

    console.log("contributed! ", txHash, uo);
  };

  const sendFundsFromContract = async (
    PocketContractAddress,
    recipientAddress,
    amountInMatic
  ) => {
    // Generate the data for the contract function call
    const uoCallData = encodeFunctionData({
      abi: abiPocket,
      functionName: "sendFunds",
      args: [recipientAddress, ethers.utils.parseEther(amountInMatic)],
    });

    provider.withAlchemyGasManager({
      policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id
    });

    // Send the transaction
    const uo = await provider.sendUserOperation({
      target: PocketContractAddress, // Pocket contract
      data: uoCallData,
      // Note: no msg.value here, the funds are coming from the contract's balance
    });

    // Wait for it to be mined and get the transaction hash
    const txHash = await provider.waitForUserOperationTransaction(uo.hash);

    console.log(txHash, uo);
  };

  const howItWorks = [
    {
      title: "Create & Personalize: Set Up Your Pool",
      description:
        "Launch your pool with a unique, customizable link for any group goal",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "Invite & Contribute: Bring Everyone Onboard",
      description:
        "Gather your crew easily via Google accounts for hassle-free contributions    ",
      image:
        "https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png",
    },
    {
      title: "Spend & Monitor: Enjoy & Oversee",
      description:
        "Use pooled funds flexibly with crypto or fiat, while tracking every transaction effortlessly",
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
    { name: "Dinner dates", emoji: "🍽️" },
    { name: "Shared rent", emoji: "🏠" },
    { name: "Office parties", emoji: "🎉" },
    { name: "Sports team expenses", emoji: "⚽" },
    { name: "Wedding gifts", emoji: "💍" },
    { name: "Joint vacation trips", emoji: "✈️" },
    { name: "Club bookings", emoji: "🕺" },
    { name: "Group subscriptions", emoji: "👥" },
    { name: "Event tickets", emoji: "🎟️" },
    { name: "Car pooling costs", emoji: "🚗" },
    { name: "Emergency funds", emoji: "🚨" },
    { name: "School reunions", emoji: "🏫" },
    { name: "Family get-togethers", emoji: "👨‍👩‍👧" },
    { name: "Study group fund", emoji: "📚" },
    { name: "Joint freelancer charges", emoji: "💼" },
    { name: "Gaming guild purchases", emoji: "🎮" },
  ];

  // console.log(items);

  const faqList = [
    {
      question: "Getting Started: How Can I Dive into PockETH?",
      answer:
        "Simply sign up with your Google account, create or join a pool, and you’re set to start pooling funds with friends or family for any shared expense.",
    },
    {
      question: "Securing Your Data: What Measures Are in Place on PockETH ?",
      answer:
        "We prioritize your data security by utilizing advanced encryption and secure protocols. All sensitive information is protected with the latest security measures.",
    },
    {
      question: "Understanding Transactions: How Do They Work Here?",
      answer:
        "Transactions are seamless and flexible. You can contribute or spend from the pooled funds using either crypto or fiat currency, with every transaction being transparently tracked.",
    },
    {
      question: "Can I Manage Finances with Others?",
      answer:
        "Absolutely! You can invite others to collaborate on any financial activity, set permissions, and manage group expenses collectively.",
    },
    {
      question: "Event Planning with PockETH: How Can I Utilize It?",
      answer:
        "Plan events effortlessly by pooling funds for expenses, tracking contributions in real-time, and managing event-related costs all in one place.",
    },
    {
      question: "Need Help or Have Queries? How to Reach Out?",
      answer:
        "If you face any issues or have questions, our dedicated support team is here to help. Reach out through our in-app support feature or contact us via our website.",
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

  const threeItemStat = [
    {
      title: "Limitless Pools, Limitless Possibilities: Dive into Freedom!",
      des: "Start as many money pools as you like, free of charge, and manage group expenses without limits.",
    },
    {
      title: "Your Pool, Your Personality: Customize Creatively!",
      des: "Personalize your Pool Link to reflect your group's unique identity and financial goals.",
    },
  ];
  const threeItemStat2 = [
    {
      title: "Pool Power, Shared or Solo: You’re in Command!",
      des: "Run your pool your way – solo or as a team. Invite collaborators, set permissions, manage spending limits, and more for complete control.",
    },
  ];
  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  const [isUserInfo, setIsUserInfo] = useState();

  const pictureRef = useRef();

  const getUser = async () => {
    const userInfo = await web3auth.getUserInfo();
    setIsUserInfo(userInfo);

    console.log(userInfo, "this is user info");
  };

  useEffect(() => {
    if (address) {
      getUser();
    }
  }, [address]);

  // const stripePack = new StripePack({
  //   // Get public key from Stripe: https://dashboard.stripe.com/register
  //   stripePublicKey:
  //     "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
  //   // Deploy your own server: https://github.com/5afe/aa-stripe-service
  //   onRampBackendUrl: "https://aa-stripe.safe.global",
  // });
  // //await stripePack.init()
  // // See options for using the StripePack open method in:
  // // https://stripe.com/docs/crypto/using-the-api
  // const addMoney = async () => {
  //   const sessionData = await stripePack.open({
  //     element: "#stripe-root", // Can be any CSS selector
  //     theme: "light", // light | dark
  //     // Optional, if you want to use a specific created session
  //     // ---
  //     // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
  //     // Optional, if you want to specify default options
  //     // ---
  //     // defaultOptions: {
  //     // transaction_details: {
  //     //   wallet_address: walletAddress,
  //     //   lock_wallet_address: true
  //     //   supported_destination_networks: ['ethereum', 'polygon'],
  //     //   supported_destination_currencies: ['usdc'],
  //     // },
  //     // customer_information: {
  //     //   email: 'john@doe.com'
  //     // }
  //   });
  // };

  return (
    <>
      <header className="w-full z-[999] justify-between backdrop-blur-xl flex items-center top-0 left-0 right-0 sticky p-4 lg:pl-[4rem] lg:pr-[4rem]">
        <Logo />

        <div className="lg:flex hidden  gap-4">
          <Link href="https://github.com/srihar5ha/pocketh">
            <Button
              variant="outlined"
              className="border-white flex  gap-2 border"
            >
              <GithubIcon />
              Contribute
            </Button>
          </Link>

          {address != null ? (
            <>
              <div className="flex items-center gap-4">
                <div>{isUserInfo?.email}</div>

                <Avatar className="cursor-pointer">
                  <AvatarImage src={isUserInfo?.profileImage} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <Button>Load Money</Button>
              <Button onClick={handleDisconnect} className="">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleConnect}
                className="flex gap-2 items-center"
              >
                Get Started
                <Leaf />
              </Button>
            </>
          )}
        </div>
      </header>
      {address == null ? (
        <>
          <main className="min-h-screen flex flex-col justify-center items-center min-w-screen">
            {/* <div>
              <Card>
                <h1>magic -alchemy</h1>

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
            <div className="flex lg:flex-row flex-col-reverse p-4 lg:p-0 lg:gap-4 items-center lg:min-h-[75vh] max-w-[1440px] w-full">
              <div className="flex flex-col justify-center lg:mt-[10rem] min-h-[500px] lg:min-h-[600px] gap-4 items-start ">
                {/* <Badge>Team Name</Badge> */}
                <span className=" text-[2rem] lg:text-[3.5rem] font-bold monster">
                  Pool to Plan, Plan to Prosper
                </span>
                <span className="font-light text-[14px] lg:text-[1.2rem]">
                  pockETH is the easiest way to pool money. <br />
                  Collect money with just a link and manage it solo or together.
                </span>

                <div className="flex lg:flex-row flex-col mt-[2rem] gap-4">
                  {/* <Link href={"/login"}> */}
                  <Button
                    onClick={handleConnect}
                    className="flex gap-2 items-center"
                  >
                    <Leaf /> Get Started
                  </Button>
                  {/* </Link> */}
                  <Link href="https://github.com/srihar5ha/pocketh">
                    <Button
                      className="flex gap-2 border-[1px] border-white items-center"
                      variant="outlined"
                    >
                      <Github />
                      View Code on Github
                    </Button>
                  </Link>
                </div>
              </div>
              {/* <div className="w-[70%] lg:w-auto">
                <img src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png" />
              </div> */}
            </div>

            <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] mt-[4rem] lg:mt-[8rem]">
              <span className="text-[1.5rem] lg:text-[3rem] font-bold monster">
                How does <Logo className={"text-[1.5rem] lg:text-[3rem]"} />{" "}
                work?
              </span>

              <div className="w-full gap-12 grid grid-cols-1 p-4 lg:p-0 lg:grid-cols-3">
                {howItWorks.map((_, i) => (
                  <div
                    className="w-full text-center items-center backdrop-blur-sm bg-white/5 border-black flex flex-col gap-4 p-8 pl-8 pr-8 min-h-[200px] hover:bg-slate-600 transition-all ease-in-out duration-300"
                    key={i}
                  >
                    <Avatar className="h-[5rem] w-[5rem]">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-[1.5rem] text-center font-bold monster">
                      {_.title}
                    </span>
                    <span className="font-light">{_.description}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 lg:p-0 w-full mt-[4rem] lg:gap-8 mb-[4rem]">
                <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-4">
                  <div className="flex w-full flex-col gap-8">
                    {threeItemStat.map((_, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[1.5rem] font-bold monster">
                          {_.title}
                        </span>
                        <span className="text-[1.25rem] opacity-70">
                          {_.des}
                        </span>
                      </div>
                    ))}
                  </div>
                  <img className="lg:w-[48%]" src={"m1.png"} />
                </div>
                <div className="flex   flex-col items-center lg:text-right lg:flex-row-reverse justify-center gap-4">
                  <div className="flex w-full  flex-col gap-8">
                    {threeItemStat2.map((_, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[1.5rem] font-bold monster">
                          {_.title}
                        </span>
                        <span className="text-[1.25rem] opacity-70">
                          {_.des}
                        </span>
                      </div>
                    ))}
                  </div>
                  <img className="lg:w-[48%]" src={"m1.png"} />
                </div>
              </div>
            </div>

            <div className="mt-[4rem] max-w-[1440px] items-center flex flex-col lg:gap-[4rem] mb-[4rem]">
              <span className="text-[1.5rem] lg:text-[3rem] font-bold">
                How can you use{" "}
                <Logo className={"text-[1.5rem] lg:text-[3rem]"} /> ?
              </span>

              <div className="w-[70%] flex items-center justify-center flex-wrap mt-[2rem] lg:mt-0 gap-2 lg:gap-6">
                {myArrayWithIcons.map((_, i) => (
                  <Card
                    key={i}
                    className="lg:p-4 p-2 hover:bg-secondary monstser transition-all duration-200 ease-in-out cursor-pointer items-center justify-center lg:pl-6 lg:pr-6 lg:text-[1.35rem] lg:font-bold tracking-wider"
                  >
                    {_.name} {_.emoji}
                  </Card>
                ))}
              </div>
            </div>

            <div className="w-full p-4 lg:p-0 items-center flex flex-col gap-12 max-w-[1440px] mt-[4rem] mb-[4rem]">
              <span className="text-[1.5rem] lg:text-[3rem] font-bold monster">
                Expense Pooling Made Easy{" "}
                <span className="text-accent">!!</span>
              </span>

              <div className="w-full gap-12 grid lg:grid-cols-3">
                {expensePooling.map((_, i) => (
                  <Card
                    className="w-full items-center text-center p-8  backdrop-blur-sm bg-white dark:text-black dark:hover:text-white  border-black flex flex-col gap-4  pl-8 pr-8 min-h-[200px] hover:bg-slate-600 transition-all ease-in-out duration-300"
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
                ))}
              </div>
            </div>
            <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] lg:mt-[4rem] lg:mb-[4rem]">
              <span className="text-[1.5rem] lg:text-[3rem] font-bold monster">
                Frequently Asked <span className="text-accent">Questions</span>
              </span>

              <div className="w-full lg:gap-12 p-4 lg:p-0 flex flex-col">
                {faqList.map((_, i) => (
                  <FaqList key={i} title={_.question} content={_.answer} />
                ))}
              </div>
            </div>
          </main>

          <footer className="w-full flex items-end justify-center p-4 lg:p-0 lg:pt-12 pb-8 backdrop-blur-3xl bg-black">
            <div className="flex flex-col gap-8 max-w-[1440px] w-full">
              <Logo />
              <div className="grid grid-cols-3 gap-4">
                {footerLinks.map((list, i) => {
                  return (
                    <div className="flex flex-col gap-4">
                      {list.map((_, i) => (
                        <Link
                          key={i}
                          href={_.url}
                          className="text-[14px] lg:text-[18px] flex gap-2 items-center text-white"
                        >
                          {_.text}{" "}
                          <ExternalLink className="h-4 hidden lg:block w-4" />
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center border-t-[1px] pt-4">
                  {/* <Icon className="h-4 w-4" src="copyright-icon.png" /> */}
                  <Copyright />
                  Made with ❤️ in ETHIndia 2023
                </div>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          <Dialog>
            <div className="min-w-screen min-h-screen flex items-center justify-center">
              <div className="max-w-[1440px] flex flex-col gap-8">
                <span className="text-[2rem]">
                  Welcome Back,<strong> {isUserInfo?.name}</strong>
                  <br />
                  <span className=" truncate text-[14px]">{address}</span>
                </span>
                {/* <span className="text-[4rem] font-bold monster">0 ETH</span> */}
                <div className="flex flex-col items-end justify-start">
                  <span>Available to Spend</span>
                  <Link className="text-blue-700" href={"/"}>
                    Get free funds
                  </Link>
                </div>
                <div className="flex gap-8">
                  <Card className="p-4 flex w-full cursor-pointer flex-col gap-4 items-center  opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out">
                    <DialogTrigger asChild>
                      <Button
                        variant="outlined"
                        className="flex gap-4 text-[1.5rem]"
                      >
                        Create pockETH <FolderPlus />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create Pocket</DialogTitle>
                        <DialogDescription>
                          Create the Pocket you Want...
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-start gap-4">
                          <Label htmlFor="name" className="text-right">
                            Title *
                          </Label>
                          <Input
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            // defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex gap-4 flex-col items-start">
                          <Label htmlFor="picture" className="text-right">
                            Choose File
                          </Label>
                          <Input
                            // onChange={(e) => uploadFile(e.target.files)}
                            ref={pictureRef}
                            // onChange={(e) => setTitle(e.target.value)}
                            id="picture"
                            type="file"
                          />
                        </div>

                        <div className="flex flex-col  items-start gap-4">
                          <Label htmlFor="desc" className="text-start">
                            Description *
                          </Label>
                          <Input
                            id="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            // defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>

                        <div className="flex flex-col  items-start gap-4">
                          <Label htmlFor="username" className="text-right">
                            Amount *
                          </Label>
                          <Input
                            id="username"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={sendTx} type="submit">
                          Create
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <span className="text-[1.25rem]">
                    Previous <span className="font-bold">pockEth</span>
                  </span>
                  <Link href={"/"}>View all</Link>
                </div>

                <div className="flex flex-col gap-4">
                  {pocketsData?.map((_, i) => (
                    <Card
                      key={i}
                      className="p-2 gap-4 flex cursor-pointer justify-between pl-4 pr-4"
                    >
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-2">
                          <span className="font-bold">{_.title}</span>
                          <span className="text-[0.75rem]">
                            {_.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex item-center justify-center gap-4">
                        <span className="font-bold">
                          {parseInt(_.targetAmount)}
                        </span>
                        <Button onClick={() => contribute(data[i], "0.0005")}>
                          Contribute
                        </Button>
                        <Button
                          onClick={() =>
                            sendFundsFromContract(
                              data[i],
                              "0x50c2ff55821401547F0319181aaBD916C9C1D026",
                              "0.00001"
                            )
                          }
                        >
                          Spend
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
