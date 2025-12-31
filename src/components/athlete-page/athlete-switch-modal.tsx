"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Athlete {
  id: string;
  name: string;
  team: string;
  imageUrl: string;
  backgroundColor: string;
  currentPrice: number;
  change24h: number;
  volume24h: number;
  funding8h: number;
  openInterest: number;
}

interface AthleteSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data - In production, this would come from an API
const mockAthletes: Athlete[] = [
  {
    id: "1",
    name: "LeBron James",
    team: "Los Angeles Lakers",
    imageUrl: "/icons/players/lebron-james.png",
    backgroundColor: "#b47818",
    currentPrice: 102.3,
    change24h: 23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "2",
    name: "Stephen Curry",
    team: "Golden State Warriors",
    imageUrl: "/icons/players/stephen-curry.png",
    backgroundColor: "#253ea7",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "3",
    name: "Kevin Durant",
    team: "Phoenix Suns",
    imageUrl: "/icons/players/kevin-durrant.png",
    backgroundColor: "#6e3ff3",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "4",
    name: "LeBron James",
    team: "Los Angeles Lakers",
    imageUrl: "/icons/players/lebron-james.png",
    backgroundColor: "#b47818",
    currentPrice: 102.3,
    change24h: 23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
  {
    id: "5",
    name: "Kevin Durant",
    team: "Phoenix Suns",
    imageUrl: "/icons/players/kevin-durrant.png",
    backgroundColor: "#6e3ff3",
    currentPrice: 102.3,
    change24h: -23,
    volume24h: 123400,
    funding8h: 0.0125,
    openInterest: 9872300,
  },
];

function AthleteRow({
  athlete,
  onClick,
}: {
  athlete: Athlete;
  onClick: () => void;
}) {
  const isPositive = athlete.change24h > 0;

  return (
    <div className="flex items-start w-full ">
      {/* Athlete Name Column */}
      <button
        onClick={onClick}
        className="bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[8px] md:gap-[10px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shrink-0 w-[280px] hover:from-[rgba(255,255,255,0.08)] hover:to-[rgba(255,255,255,0.04)] transition-all shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] cursor-pointer"
      >
        <div
          className={`relative w-7 h-7 md:w-8 md:h-8 rounded-md ${athlete.backgroundColor} overflow-hidden shrink-0`}
        >
          <Image
            src="/icons/athletes/logo.png"
            alt="Logo"
            fill
            className="object-cover object-top opacity-8 mix-blend-screen"
          />
          <Image
            src={athlete.imageUrl}
            alt={athlete.name}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-[6px] md:gap-[8px] items-start text-left flex-1 min-w-0">
          <p className="font-medium text-[13px] md:text-[14px] text-main tracking-[-0.28px] leading-none truncate w-full">
            {athlete.name}
          </p>
          <p className="font-normal text-[11px] md:text-[12px] text-soft-400 tracking-[-0.12px] leading-none truncate w-full">
            {athlete.team}
          </p>
        </div>
      </button>

      {/* Current Price */}
      <div className="flex-1 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[16px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[140px]">
        <p className="font-medium text-[13px] md:text-[14px] text-main tracking-[-0.28px] whitespace-nowrap leading-none">
          ${athlete.currentPrice}
        </p>
      </div>

      {/* 24h Change */}
      <div className="flex-1 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[16px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[120px]">
        <p
          className={cn(
            "font-medium text-[13px] md:text-[14px] tracking-[-0.28px] whitespace-nowrap leading-none",
            isPositive ? "text-green-dark" : "text-base-red"
          )}
        >
          {isPositive ? "+" : ""}
          {athlete.change24h}%
        </p>
      </div>

      {/* 24h Volume */}
      <div className="flex-1 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[16px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[120px]">
        <p
          className={cn(
            "font-medium text-[13px] md:text-[14px] tracking-[-0.28px] whitespace-nowrap leading-none",
            isPositive ? "text-green-dark" : "text-base-red"
          )}
        >
          ${(athlete.volume24h / 1000).toFixed(1)}k
        </p>
      </div>

      {/* 8hr Funding */}
      <div className="flex-1 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[16px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[120px]">
        <p className="flex-1 font-medium text-[13px] md:text-[14px] text-main tracking-[-0.28px] leading-none">
          {athlete.funding8h}%
        </p>
      </div>

      {/* Open Interest */}
      <div className="flex-1 bg-gradient-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] flex gap-[16px] h-[64px] items-center px-[12px] md:px-[16px] py-[12px] rounded-[10px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[140px]">
        <p className="flex-1 font-medium text-[13px] md:text-[14px] text-main tracking-[-0.28px] leading-none">
          ${athlete.openInterest.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function AthleteSwitchModal({
  isOpen,
  onClose,
}: AthleteSwitchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("nba");
  const router = useRouter();

  const handleAthleteClick = (athleteId: string) => {
    router.push(`/athlete/${athleteId}`);
    onClose();
  };

  const filteredAthletes = mockAthletes.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] backdrop-filter bg-[rgba(10,13,20,0.32)]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-[#f2f2f2] rounded-[10px] w-full mx-4 md:mx-0 md:w-[956px] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div className="flex flex-col gap-[16px] items-start pb-[8px] pt-[16px] md:pt-[20px] px-[16px] md:px-[20px]">
              <div className="flex gap-[16px] items-center w-full">
                <div className="flex-1 bg-white border border-[rgba(10,13,20,0.07)] rounded-[8px] h-[36px]">
                  <div className="flex gap-[10px] h-[36px] items-center px-[12px] md:px-[16px] py-[6px]">
                    <Search className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-soft-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search player or team..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 font-normal text-[12px] md:text-[13px] text-disabled-300 tracking-[-0.13px] leading-none outline-none placeholder:text-disabled-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-weak-100 flex items-center w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1 min-w-full"
              >
                <TabsList className="flex h-[48px] px-[12px] md:px-[20px] bg-transparent rounded-none p-0 w-full gap-0 min-w-fit">
                  <TabsTrigger
                    value="nba"
                    className="flex-1 md:flex-1 font-semibold text-[12px] md:text-[14px] tracking-[-0.14px] leading-none h-full border-b-[1px] border-transparent data-[state=active]:border-main data-[state=active]:text-main text-soft-400 px-[12px] md:px-[19px] rounded-none after:hidden whitespace-nowrap shrink-0"
                  >
                    NBA
                  </TabsTrigger>
                  <TabsTrigger
                    value="soccer"
                    className="flex-1 md:flex-1 font-medium text-[12px] md:text-[14px] tracking-[-0.14px] leading-none h-full border-b-[1px] border-transparent data-[state=active]:border-main data-[state=active]:text-main text-soft-400 px-[12px] md:px-[19px] rounded-none after:hidden whitespace-nowrap shrink-0"
                  >
                    Soccer
                  </TabsTrigger>
                  <TabsTrigger
                    value="esports"
                    className="flex-1 md:flex-1 font-medium text-[12px] md:text-[14px] tracking-[-0.14px] leading-none h-full border-b-[1px] border-transparent data-[state=active]:border-main data-[state=active]:text-main text-soft-400 px-[12px] md:px-[19px] rounded-none after:hidden whitespace-nowrap shrink-0"
                  >
                    Esports
                  </TabsTrigger>
                  <TabsTrigger
                    value="coming-soon"
                    className="flex-1 md:flex-1 font-medium text-[12px] md:text-[14px] tracking-[-0.14px] leading-none h-full border-b-[1px] border-transparent data-[state=active]:border-main data-[state=active]:text-main text-soft-400 px-[12px] md:px-[19px] rounded-none after:hidden whitespace-nowrap shrink-0"
                  >
                    Coming Soon
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="p-[4px]">
                  {/* Table Container with Horizontal Scroll */}
                  <div className="overflow-x-auto">
                    {/* Table Headers */}
                    <div className="flex items-start w-full min-w-[1200px]">
                      <div className="flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] w-[280px] shrink-0">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          Athlete Name
                        </p>
                      </div>
                      <div className="flex-1 flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] min-w-[140px]">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          Current Price
                        </p>
                      </div>
                      <div className="flex-1 flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] min-w-[120px]">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          24h change
                        </p>
                      </div>
                      <div className="flex-1 flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] min-w-[120px]">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          24h Volume
                        </p>
                      </div>
                      <div className="flex-1 flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] min-w-[120px]">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          8hr Funding
                        </p>
                      </div>
                      <div className="flex-1 flex gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] min-w-[140px]">
                        <p className="flex-1 font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none">
                          Open Interest
                        </p>
                      </div>
                    </div>

                    {/* Athlete Rows */}
                    <div className="flex flex-col gap-0 max-h-[400px] min-w-[1200px] ">
                      {filteredAthletes.map((athlete) => (
                        <AthleteRow
                          key={athlete.id}
                          athlete={athlete}
                          onClick={() => handleAthleteClick(athlete.id)}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
