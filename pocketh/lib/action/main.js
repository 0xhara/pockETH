// "use client";

// import {
//   SafeAuthPack,
//   SafeAuthConfig,
//   SafeAuthInitOptions,
// } from "@safe-global/auth-kit";

// export const safeAuthInitOptions = {
//   showWidgetButton: true, // Set to true to show the SafeAuth widget button
//   chainConfig: {
//     blockExplorerUrl: "https://etherscan.io", // The block explorer URL
//     chainId: "0x5", // The chain ID
//     displayName: "Ethereum Goerli", // The chain name
//     rpcTarget: "https://rpc.ankr.com/eth_goerli", // The RPC target
//     ticker: "ETH", // The chain ticker
//     tickerName: "Ethereum", // The chain ticker name
//   },
// };

// export const safeAuthPack = new SafeAuthPack();

// await safeAuthPack.init(safeAuthInitOptions);

// // useEffect(() => {
// //   async function init() {
// //     try {
// //       await safeAuthPack.init(safeAuthInitOptions);
// //     } catch (error) {
// //       console.error("Error initializing SafeAuthPack:", error);
// //     }
// //   }
// //   init();
// // }, []);

import { WalletClientSigner } from "@alchemy/aa-core";
import { Web3Auth } from "@web3auth/modal";
import { createWalletClient, custom } from "viem";

// see https://web3auth.io/docs/quick-start for more info
export const web3auth = new Web3Auth({
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
