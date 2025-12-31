"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PlayerOption {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
  iconWidth?: number;
  iconHeight?: number;
}

interface FavouritePlayerScreenProps {
  options?: PlayerOption[];
  onContinue?: (selectedPlayerId: string | null) => void;
}

const defaultOptions: PlayerOption[] = [
  {
    id: "lebron-james",
    name: "LeBron James",
    icon: "/icons/players/lebron-james.png",
    onClick: () => console.log("Connect Metamask"),
  },
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    icon: "/icons/players/stephen-curry.png",
    onClick: () => console.log("Connect Coinbase"),
  },
  {
    id: "giannis-antetokounmpo",
    name: "G.Antetokounmpo",
    icon: "/icons/players/giannis-antetokounmpo.png",
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "kevin-durrant",
    name: "Kevin Durant",
    icon: "/icons/players/kevin-durrant.png",
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "nikola-jokic",
    name: "Nikola Jokic",
    icon: "/icons/players/nikola-jokic.png",
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "jayson-tatum",
    name: "Jayson Tatum",
    icon: "/icons/players/jayson-tatum.png",
    onClick: () => console.log("Connect WalletConnect"),
  },
];

export default function FavouritePlayerScreen({
  options = defaultOptions,
  onContinue,
}: FavouritePlayerScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-50 py-20">
      <motion.div
        className="flex w-full max-w-[548px] flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Title & Description */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl leading-none tracking-[0.48px] text-black font-nohemi font-medium">
            Choose Your Favourite Athlete
          </h2>
          <p className="text-center font-inter text-sm font-normal leading-[1.3] tracking-[-0.14px] text-[#868c98]">
            This helps personalize your feed
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="flex h-[40px] w-full items-center gap-[10px] rounded-[8px] border border-black/7 bg-white px-[16px] py-[6px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Search width={16} height={16} color="var(--color-soft-400)" />
          <Input
            type="text"
            placeholder="Search athlete"
            aria-label="Search athlete"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-[26px] border-0 bg-transparent px-0 text-[13px] leading-[100%] tracking-tight placeholder:text-disabled-300 outline-none"
          />
        </motion.div>

        {/* Grid of players */}
        <motion.div
          className="grid w-full gap-[16px] grid-cols-2 sm:grid-cols-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {options
            .filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
            .map((opt) => {
              const isSelected = selectedPlayerId === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedPlayerId(opt.id);
                    opt.onClick();
                  }}
                  className={`flex flex-col items-center justify-center gap-[24px] rounded-[10px] border p-[16px] bg-white ${
                    isSelected ? "border-main/32" : "border-black/7"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center justify-center w-[94px] h-[94px] rounded-[5.37px]">
                    <Image
                      src={opt.icon}
                      alt={opt.name}
                      width={opt.iconWidth ?? 94}
                      height={opt.iconHeight ?? 94}
                    />
                  </div>
                  <p className="text-center text-sm font-semibold leading-[100%] tracking-tight text-main">
                    {opt.name}
                  </p>
                </motion.button>
              );
            })}
        </motion.div>

        {/* Continue button (animated) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full"
        >
          <Button
            className="flex flex-row w-full h-[40px] rounded-[8px] border border-main bg-main py-[10px] px-[16px] gap-[8px]"
            disabled={!selectedPlayerId}
            onClick={() => onContinue?.(selectedPlayerId)}
          >
            <p className="font-medium text-[14px] leading-[140%] tracking-tight">
              Continue
            </p>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
