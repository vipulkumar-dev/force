"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LeagueOption {
  id: string;
  name: string;
  icon: string;
  onClick: () => void;
  iconWidth?: number;
  iconHeight?: number;
}

interface FavouriteLeagueScreenProps {
  options?: LeagueOption[];
  onContinue?: (selectedLeagueId: string | null) => void;
}

const defaultOptions: LeagueOption[] = [
  {
    id: "nba",
    name: "NBA",
    icon: "/icons/leagues/nba-new.png",
    iconWidth: 76,
    iconHeight: 76,
    onClick: () => console.log("Connect Metamask"),
  },
  {
    id: "nfl",
    name: "NFL",
    icon: "/icons/leagues/nfl.png",
    iconWidth: 76,
    iconHeight: 76,
    onClick: () => console.log("Connect Coinbase"),
  },
  {
    id: "mlb",
    name: "MLB",
    icon: "/icons/leagues/mlb.png",
    iconWidth: 64,
    iconHeight: 36,
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "f1",
    name: "F1",
    icon: "/icons/leagues/f1.png",
    iconWidth: 63,
    iconHeight: 16,
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "premiere-league",
    name: "Premiere League",
    icon: "/icons/leagues/premiere-league.png",
    iconWidth: 50,
    iconHeight: 50,
    onClick: () => console.log("Connect WalletConnect"),
  },
  {
    id: "la-liga",
    name: "La Liga",
    icon: "/icons/leagues/la-liga.png",
    iconWidth: 50,
    iconHeight: 46,
    onClick: () => console.log("Connect WalletConnect"),
  },
];

export default function FavouriteLeagueScreen({
  options = defaultOptions,
  onContinue,
}: FavouriteLeagueScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

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
          <h2 className="font-nohemi text-2xl leading-none font-medium tracking-[0.48px] text-black">
            Choose Your Favourite League
          </h2>
          <p className="font-inter text-center text-sm leading-[1.3] font-normal tracking-[-0.14px] text-[#868c98]">
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
            placeholder="Search sport League"
            aria-label="Search sport league"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder:text-disabled-300 h-[26px] flex-1 border-0 bg-transparent px-0 text-[13px] leading-[100%] tracking-tight outline-none"
          />
        </motion.div>

        {/* Grid of leagues */}
        <motion.div
          className="grid w-full grid-cols-2 gap-[16px] sm:grid-cols-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {options
            .filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
            .map((opt) => {
              const isSelected = selectedLeagueId === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedLeagueId(opt.id);
                    opt.onClick();
                  }}
                  className={`flex flex-col items-center justify-center gap-[24px] rounded-[10px] border bg-white p-[16px] ${
                    isSelected ? "border-main/32" : "border-black/7"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-league-card flex h-[76px] w-[76px] flex-col items-center justify-center rounded-[12.50px]">
                    <Image
                      src={opt.icon}
                      alt={opt.name}
                      width={opt.iconWidth ?? 50}
                      height={opt.iconHeight ?? 50}
                    />
                  </div>
                  <p className="text-text-primary text-center text-sm leading-[100%] font-semibold tracking-tight">
                    {opt.name}
                  </p>
                </motion.button>
              );
            })}
        </motion.div>

        {/* Continue (animated) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full"
        >
          <Button
            className="border-main bg-main flex h-[40px] w-full flex-row gap-[8px] rounded-[8px] border px-[16px] py-[10px]"
            disabled={!selectedLeagueId}
            onClick={() => onContinue?.(selectedLeagueId)}
          >
            <p className="text-[14px] leading-[140%] font-medium tracking-tight">
              Continue
            </p>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
