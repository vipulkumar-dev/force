// function WalletConnectScreen() - add callback prop and trigger it on selection
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface WalletOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  onClick: () => void;
}

interface WalletConnectScreenProps {
  walletOptions?: WalletOption[];
  onWalletChosen?: (walletId: string) => void;
}

const defaultWalletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "Metamask",
    description: "The most popular Ethereum wallet.",
    icon: "/icons/metamask.svg",
    onClick: () => console.log("Connect Metamask"),
  },
  {
    id: "coinbase",
    name: "Coinbase",
    description: "Secure and beginner-friendly.",
    icon: "/icons/coinbase.svg",
    onClick: () => console.log("Connect Coinbase"),
  },
  {
    id: "phantom",
    name: "Phantom",
    description: "Fast and smooth for Solana users.",
    icon: "/icons/phantom.svg",
    onClick: () => console.log("Connect Phantom"),
  },
  {
    id: "walletconnect",
    name: "Wallet Connect",
    description: "Use any mobile wallet by scanning a QR code.",
    icon: "/icons/walletconnect.svg",
    onClick: () => console.log("Connect WalletConnect"),
  },
];

export default function WalletConnectScreen({
  walletOptions = defaultWalletOptions,
  onWalletChosen,
}: WalletConnectScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <motion.div
        className="flex w-full flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* Title & Description */}
        <motion.div
          className="flex w-full flex-col items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl leading-none tracking-[0.48px] text-black font-nohemi font-medium">
            Account
          </h2>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Wallets" 
              className="w-full pl-10 pr-4 py-2 rounded-full bg-page-background focus:outline-none focus:ring-0" 
            />
          </div>
        </motion.div>

        {/* Wallet Options */}
        <motion.div
          className="w-full overflow-hidden rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {walletOptions.map((wallet, index) => (
            <motion.button
              key={wallet.id}
              onClick={() => {
                wallet.onClick();
                onWalletChosen?.(wallet.id);
              }}
              className={`flex w-full m-2 rounded-lg bg-page-background items-center gap-4 p-5 text-left transition-colors hover:bg-gray-50 `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Text */}
              <div className="flex min-w-0 flex-1 rounded-lg flex-col gap-2.5">
                <p className="font-inter text-center text-sm font-semibold leading-none tracking-[-0.28px] text-main">
                  {wallet.name}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          className="flex w-full items-start justify-center gap-[10px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-center font-inter text-xs font-normal leading-[1.4] tracking-[-0.12px] text-[#868c98]">
            By logging in I agree to the{" "}
            <a
              href="#"
              className="font-medium text-[#525866] underline decoration-solid underline-offset-2 hover:text-[#0a0d14]"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-[#525866] underline decoration-solid underline-offset-2 hover:text-[#0a0d14]"
            >
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
