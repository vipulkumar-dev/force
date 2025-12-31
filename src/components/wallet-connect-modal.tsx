// function WalletConnectScreen() - add callback prop and trigger it on selection
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
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
        {/* Wallet Icon */}
        <motion.div
          className="flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.03)] p-[5.333px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex size-[53.333px] items-center justify-center rounded-full border border-[rgba(0,0,0,0.05)] bg-white p-[13.333px]">
            <div className="relative size-6">
              <Image
                src="/icons/wallet2.svg"
                alt="Wallet"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl leading-none tracking-[0.48px] text-black font-nohemi font-medium">
            Connect Wallet
          </h2>
          <p className="text-center font-inter text-sm font-normal leading-[1.3] tracking-[-0.14px] text-[#868c98]">
            Choose your wallet to start trading and tracking athletes.
          </p>
        </motion.div>

        {/* Wallet Options */}
        <motion.div
          className="w-full overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.05)] bg-white"
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
              className={`flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-gray-50 ${
                index !== walletOptions.length - 1
                  ? "border-b border-[rgba(0,0,0,0.05)]"
                  : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Icon */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[rgba(0,0,0,0.04)] p-2.5">
                <div className="relative size-6">
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <p className="font-inter text-sm font-semibold leading-none tracking-[-0.28px] text-[#0a0d14]">
                  {wallet.name}
                </p>
                <p className="font-inter text-xs font-normal leading-none tracking-[-0.12px] text-[#868c98]">
                  {wallet.description}
                </p>
              </div>

              {/* Chevron */}
              <div className="flex shrink-0 items-center justify-center">
                <ChevronRight className="size-3.5 text-[#CDD0D5]" />
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
          <Checkbox
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <p className="text-center font-inter text-xs font-normal leading-[1.4] tracking-[-0.12px] text-[#868c98]">
            By continuing, you agree with our{" "}
            <a
              href="#"
              className="font-medium text-[#525866] underline decoration-solid underline-offset-2 hover:text-[#0a0d14]"
            >
              Privacy policy
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-[#525866] underline decoration-solid underline-offset-2 hover:text-[#0a0d14]"
            >
              Terms and Conditions
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
