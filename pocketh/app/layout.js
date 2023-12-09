import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "pockETH",
  description: "Decentralized Expense Harmony",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="fixed blur-[300px] bg-black bg-opacity-80  z-[-1] top-0 left-0 right-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <defs>
              <linearGradient
                id="a"
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor="red">
                  <animate
                    attributeName="stopColor"
                    values="red;purple;blue;green;yellow;orange;red;"
                    dur="20s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <stop offset=".5" stopColor="purple">
                  <animate
                    attributeName="stopColor"
                    values="purple;blue;green;yellow;orange;red;purple;"
                    dur="20s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <stop offset="1" stopColor="blue">
                  <animate
                    attributeName="stopColor"
                    values="blue;green;yellow;orange;red;purple;blue;"
                    dur="20s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  from="0 .5 .5"
                  to="360 .5 .5"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </linearGradient>
              <linearGradient
                id="b"
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="1"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor="red">
                  <animate
                    attributeName="stopColor"
                    values="red;purple;blue;green;yellow;orange;red;"
                    dur="20s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <stop offset="1" stopColor="purple" stopOpacity="0">
                  <animate
                    attributeName="stopColor"
                    values="purple;blue;green;yellow;orange;red;purple;"
                    dur="20s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  values="360 .5 .5;0 .5 .5"
                  className="ignore"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            <rect fill="url(#a)" width="100%" height="100%" />
            <rect fill="url(#b)" width="100%" height="100%" />
          </svg>
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
