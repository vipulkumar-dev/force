"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface AthleteData {
  id: string;
  name: string;
  bgColor: string;
  team: string;
  league: string;
  imageUrl: string;
  price: number;
  priceChange: number;
  percentile: number;
}

const mockAthletes: AthleteData[] = [
  {
    id: "lebron",
    name: "LeBron James",
    bgColor: "bg-dark-yellow",
    team: "Los Angeles Lakers",
    league: "NBA",
    imageUrl: "/icons/players/lebron-james.png",
    price: 102.3,
    priceChange: 3.27,
    percentile: 91,
  },
  {
    id: "curry",
    name: "Stephen Curry",
    bgColor: "bg-dark-blue",
    team: "Golden State Warriors",
    league: "NBA",
    imageUrl: "/icons/players/stephen-curry.png",
    price: 101.8,
    priceChange: 2.94,
    percentile: 90,
  },
  {
    id: "durant",
    name: "Kevin Durant",
    bgColor: "bg-dark-purple",
    team: "Phoenix Suns",
    league: "NBA",
    imageUrl: "/icons/players/kevin-durrant.png",
    price: 100.6,
    priceChange: 2.32,
    percentile: 88,
  },
  {
    id: "giannis",
    name: "Giannis Antetokounmpo",
    bgColor: "bg-dark-green",
    team: "Milwaukee Bucks",
    league: "NBA",
    imageUrl: "/icons/players/giannis-antetokounmpo.png",
    price: 103.4,
    priceChange: 3.41,
    percentile: 92,
  },
];

export default function AthleteUpdateCard() {
  return (
    <div className="p-0 md:p-[45px_40px_0px_40px] lg:p-[45px_80px_0px_80px] xl:p-[45px_194px_0px_194px] rounded-lg bg-transparent md:bg-soft-500 backdrop-blur-0 md:backdrop-blur-[22px]">
      <div className="bg-white rounded-t-xl md:rounded-t-2xl border border-inactive p-4 md:p-5 lg:p-6 flex flex-col gap-3 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] md:text-[16px] leading-[100%] font-medium font-nohemi tracking-[1%] text-main">
            Athlete Update
          </h3>
          <button className="text-[11px] md:text-[12px] leading-[100%] tracking-[1%] font-inter text-soft-400 transition-colors flex items-center gap-1 cursor-pointer hover:text-main">
            Explore
            <ChevronRight className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] text-soft-400" />
          </button>
        </div>

        {/* Athletes list */}
        <div className="flex flex-col">
          {mockAthletes.map((athlete) => {
            const isPositive = athlete.priceChange >= 0;

            return (
              <div
                key={athlete.id}
                className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer py-3 md:py-3.5 lg:py-4 gap-3 md:gap-3 lg:gap-[14px] border-b border-light-gray hover:bg-active-hover/30 transition-colors"
              >
                {/* Left: Athlete info */}
                <div className="flex items-center gap-2 md:gap-2.5 lg:gap-3">
                  <div
                    className={`relative w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-md ${athlete.bgColor} overflow-hidden shrink-0`}
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
                  <div className="flex flex-col gap-2 md:gap-2 lg:gap-2.5">
                    <span className="text-[14px] md:text-[14px] lg:text-[15px] leading-[14px] lg:leading-[15px] font-medium font-inter text-main tracking-[-0.14px] lg:tracking-[-0.15px]">
                      {athlete.name}
                    </span>
                    <span className="text-[12px] md:text-[12px] lg:text-[13px] leading-[12px] lg:leading-[13px] font-normal font-inter text-soft-400">
                      {athlete.team} ({athlete.league})
                    </span>
                  </div>
                </div>

                {/* Right: Price and stats */}
                <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-start gap-2 md:gap-2 lg:gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] md:text-[14px] lg:text-[15px] leading-[14px] lg:leading-[15px] font-medium font-inter text-main tracking-[-0.14px] lg:tracking-[-0.15px]">
                      ${athlete.price.toFixed(1)} ELO
                    </span>
                    <span
                      className={cn(
                        "text-[12px] md:text-[12px] lg:text-[13px] leading-[12px] lg:leading-[13px] font-medium font-inter",
                        isPositive ? "text-success" : "text-error",
                      )}
                    >
                      {isPositive ? "+" : ""}
                      {athlete.priceChange.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-1 md:px-1.5 py-0.5 bg-soft-500/30 md:bg-transparent rounded">
                    <span className="text-[10px] md:text-[10px] lg:text-[11px] leading-[10px] lg:leading-[11px] tracking-[-0.1px] lg:tracking-[-0.11px]">
                      🏅
                    </span>
                    <span className="text-[10px] md:text-[10px] lg:text-[11px] leading-[10px] lg:leading-[11px] font-inter text-soft-400 whitespace-nowrap">
                      {athlete.percentile}st Percentile
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
