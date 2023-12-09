"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

//from here
// import { AlchemyProvider, ethers } from "ethers";

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
import { Card } from "@/components/ui/card";
import {abi as abiFactory} from "../lib/factoryAbi.json";
import {abi as abiPocket} from "../lib/pocketAbi.json";

const chain = polygonMumbai;
const factoryAddress="0xE84C255e649441b59d94f8488F54ba807FC27Df9"


import { Web3Auth } from "@web3auth/modal";
import { Copyright, ExternalLink, Github, Leaf } from "lucide-react";
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
    rpcTarget:"https://polygon-mumbai.g.alchemy.com/v2/rSk6bxEUS95Gwf_NsxAcM7_AWfU58hXK",
    displayName: "Polygon Mumbai",
    ticker: "MATIC",
  },
});

import m1 from "../public/m1.png";
import FaqList from "@/components/faq";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [owner, setOwner] = useState(null);
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data,setData]=useState(null); //addresses of pockets
  const [pocketsData,setPocketsData]=useState([]);
  const [client,setClient]=useState(null);

//   const [web3AuthSigner,setWeb3AuthSigner]=useState(null);

useEffect(()=>{
  // console.log("abi is ",abi);
  const init=async()=>{
    await web3auth.initModal();
     const temp_client = createPublicClient({ 
      chain: chain,
      transport: http()
    })
    setClient(temp_client);
      };
  init();
},[])

useEffect(() => {
  if (owner) {
    
    //get Alchemy provider from web3Auth signer
    console.log("inside")
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
  }
  else{
    console.log("no owner")
  }
}, [owner]);

useEffect(()=>{
  
  if(provider){
    const getAddress=async()=>{
    const add = await provider?.getAddress();
      setAddress(add);
      setIsConnected(true);
      console.log("address is ",address);

  };
  getAddress();
}
},[provider]);

  
  const handleConnect = async () => {
    try {
        await web3auth.connect();
         const web3authClient =createWalletClient({
            transport: custom(web3auth.provider),
          });
          
          // a smart account signer you can use as an owner on ISmartContractAccount
        const web3authSigner= new WalletClientSigner(
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

  const sendTx=async()=>{
      //use this block for sending write requests
    const uoCallData = encodeFunctionData({
      abi: abiFactory,
      functionName: "createPocket",
      args:["blu","zk",10,address]
    });
    
    provider.withAlchemyGasManager({
      policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id, get yours at https://dashboard.alchemy.com/
    });
    const uo = await provider.sendUserOperation({
      target: factoryAddress, //factory contract
      data: uoCallData,
    });
    
    const txHash = await provider.waitForUserOperationTransaction(uo.hash);
    
    console.log(txHash,uo);
    readRequest();
    

  }
  const readRequest=async()=>{
    //use this block for sending read requests.it uses publicClient.

    // console.log("client is ",client)
    const pockets = (await client.readContract({
      address: factoryAddress,
      abi: abiFactory,
      functionName: 'getPocketsByOwner',
      args:[address]
    }))
    setData(pockets);

  }


  useEffect(() => {
    if(data){
      console.log("data is ",data)
      const fetchData = async () => {
        let pocketDataArray = [];
        for(let i = 0; i < data.length; i++){
          const pocketData = await fetchVariables(data[i].toString());
          pocketDataArray.push(pocketData);
        }
        setPocketsData(pocketDataArray);
        console.log("fetching pockets data");
      }
      fetchData();
    }
  }, [data])



    
async function fetchVariables(PocketContractAddress) {

  const Rpcprovider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/rSk6bxEUS95Gwf_NsxAcM7_AWfU58hXK');

// Initialize the ethers.js contract object
const PocketContract = new ethers.Contract(PocketContractAddress, abiPocket, Rpcprovider);

  let title = await PocketContract.title();
  let description = await PocketContract.description();
  let targetAmount = await PocketContract.targetAmount();

  const value = {
    title: title,
    description: description,
    targetAmount:targetAmount
  };
  return value;

}

const contribute = async (PocketContractAddress, amountInMatic) => {
  // Generate the data for the contract function call
  const uoCallData = encodeFunctionData({
    abi: abiPocket,
    functionName: "contribute"
  });
  
  provider.withAlchemyGasManager({
    policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id
  });

  // Send the transaction
  const uo = await provider.sendUserOperation({
    target: PocketContractAddress, // Pocket contract
    data: uoCallData,
    value: ethers.utils.parseEther(amountInMatic)  // converts the ether string to wei
  });
  
  // Wait for it to be mined and get the transaction hash
  const txHash = await provider.waitForUserOperationTransaction(uo.hash);
  
  console.log("contributed! ",txHash, uo);
}


const sendFundsFromContract = async (PocketContractAddress, recipientAddress, amountInMatic) => {
  // Generate the data for the contract function call
  const uoCallData = encodeFunctionData({
    abi: abiPocket,
    functionName: "sendFunds",
    args: [recipientAddress, ethers.utils.parseEther(amountInMatic)]
  });
  
  provider.withAlchemyGasManager({
    policyId: "5ae95b73-c385-4461-be66-1edfd394961c", // replace with your policy id
  });

  // Send the transaction
  const uo = await provider.sendUserOperation({
    target: PocketContractAddress, // Pocket contract
    data: uoCallData
    // Note: no msg.value here, the funds are coming from the contract's balance
  });
  
  // Wait for it to be mined and get the transaction hash
  const txHash = await provider.waitForUserOperationTransaction(uo.hash);
  
  console.log(txHash, uo);


}

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

  const threeItemStat = [
    {
      title: "Google Easy Contributions: Tap, Chip, and Go!",
      des: "Seamlessly chip in for any group expense with just your Google account. Easy, fast, and hassle-free.",
    },
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
      title: "Spend Globally, Pay Locally: The Crypto-Fiat Flexibility! ",
      des: "Seamlessly chip in for any group expense with just your Google account. Easy, fast, and hassle-free.",
    },
    {
      title: "Transaction Transparency: Watch Your Money Move!",
      des: "Stay updated with real-time notifications and detailed monthly statements to track every contribution and spend.",
    },
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

  return (
    <>
      <main className="min-h-screen flex flex-col justify-center items-center min-w-screen">
        <div>
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
        </div>
        <div className="flex flex-col gap-4">
          {/* <Button onClick={login}>Login</Button>
        <Button onClick={getUserInfo}>Get User Info</Button> */}
          {/* <Button onClick={providerDetails}>Provider</Button> */}

          {/* <span>safeAd</span> */}
        </div>
        <div className="flex lg:flex-row flex-col-reverse p-4 lg:p-0 lg:gap-4 items-center lg:min-h-[75vh] max-w-[1440px] w-full">
          <div className="flex flex-col justify-center lg:mt-[10rem] min-h-[500px] lg:min-h-[600px] gap-4 items-start ">
            <Badge>Team Name</Badge>
            <span className=" text-[2rem] lg:text-[4rem] font-bold monster">
              Decentralized Expense Harmony
            </span>
            <span className="font-light text-[14px] lg:text-normal">
              Empower Your Group Finances with Blockchain for Seamless Event
              Spending
            </span>

            <div className="flex lg:flex-row flex-col mt-[2rem] gap-4">
              <Link href={"/login"}>
                <Button className="flex gap-2 items-center">
                  <Leaf /> Get Started
                </Button>
              </Link>
              <Button
                className="flex gap-2 border-[1px] border-white items-center"
                variant="outlined"
              >
                <Github />
                View Code on Github
              </Button>
            </div>
          </div>
          <div className="w-[70%] lg:w-auto">
            <img src="https://www.freepngimg.com/thumb/bitcoin/63394-cryptocurrency-money-ethereum-bitcoin-download-hd-png.png" />
          </div>
        </div>

        <div className="w-full items-center flex flex-col gap-12 max-w-[1440px] mt-[4rem] lg:mt-[8rem]">
          <span className="text-[1.5rem] lg:text-[3rem] font-bold monster">
            How does <Logo className={"text-[1.5rem] lg:text-[3rem]"} /> work?
          </span>

          <div className="w-full gap-12 grid grid-cols-1 p-4 lg:p-0 lg:grid-cols-3">
            {howItWorks.map((_, i) => (
              <Card
                className="w-full  backdrop-blur-sm bg-white/20 border-black flex flex-col gap-4 p-4 pl-8 pr-8 min-h-[200px] hover:bg-slate-600 transition-all ease-in-out duration-300"
                key={i}
              >
                <Avatar className="h-[5rem] w-[5rem]">
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

          <div className="p-4 lg:p-0 w-full mt-[4rem] lg:gap-8 mb-[4rem]">
            <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-4">
              <div className="flex w-full flex-col gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-[1.5rem] font-bold monster">
                      Stats Title
                    </span>
                    <span className="text-[1.25rem]">
                      Stats description will go here with color
                    </span>
                  </div>
                ))}
              </div>
              <img className="lg:w-[48%]" src={"m1.png"} />
            </div>
            <div className="flex   flex-col items-center lg:text-right lg:flex-row-reverse justify-center gap-4">
              <div className="flex w-full  flex-col gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-[1.5rem] font-bold monster">
                      Stats Title
                    </span>
                    <span className="text-[1.25rem]">
                      Stats description will go here with color
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
            How can you use <Logo className={"text-[1.5rem] lg:text-[3rem]"} />{" "}
            ?
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
            Expense Pooling Made Easy <span className="text-accent">!!</span>
          </span>

          <div className="w-full gap-12 grid lg:grid-cols-3">
            {expensePooling.map((_, i) => (
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
  );
}
