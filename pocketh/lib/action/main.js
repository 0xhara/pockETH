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
