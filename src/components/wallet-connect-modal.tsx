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
          <h2 className="font-nohemi text-2xl leading-none font-medium tracking-[0.48px] text-black">
            Account
          </h2>
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Wallets"
              className="bg-page-background w-full rounded-full py-2 pr-4 pl-10 focus:ring-0 focus:outline-none"
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
              className={`bg-page-background m-2 flex w-full items-center gap-4 rounded-lg p-5 text-left transition-colors hover:bg-gray-50`}
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
              <div className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-lg">
                <p className="font-inter text-text-primary text-center text-sm leading-none font-semibold tracking-[-0.28px]">
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
          <p className="font-inter text-center text-xs leading-[1.4] font-normal tracking-[-0.12px] text-[#868c98]">
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
