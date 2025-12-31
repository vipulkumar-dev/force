"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

interface Position {
  id: string;
  athleteName: string;
  athleteImage: string;
  athleteBgColor: string;
  league: string;
  position: string;
  leverage: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  liquidationPrice: number;
  pnl: number;
  pnlPercentage: number;
  fundingRate: number;
}

interface OpenPositionsTableProps {
  positions?: Position[];
}

// Mock data - In production, this would come from an API
const mockPositions: Position[] = [
  {
    id: "1",
    athleteName: "LeBron James",
    athleteImage: "/images/players/lebron-james.png",
    athleteBgColor: "bg-dark-yellow",
    league: "NBA",
    position: "Long",
    leverage: "5x",
    size: 250,
    entryPrice: 12.1,
    currentPrice: 12.1,
    liquidationPrice: 9.68,
    pnl: 87.5,
    pnlPercentage: 3.6,
    fundingRate: 0.02,
  },
  {
    id: "2",
    athleteName: "Steph Curry",
    athleteImage: "/images/players/stephen-curry.png",
    athleteBgColor: "bg-dark-blue",
    league: "NBA",
    position: "Long",
    leverage: "5x",
    size: 250,
    entryPrice: 12.1,
    currentPrice: 12.1,
    liquidationPrice: 9.68,
    pnl: 87.5,
    pnlPercentage: 3.6,
    fundingRate: 0.02,
  },
  {
    id: "3",
    athleteName: "Patrick Mahomes",
    athleteImage: "/images/players/lebron-james.png", // Placeholder
    athleteBgColor: "bg-base-purple",
    league: "NFL",
    position: "Long",
    leverage: "5x",
    size: 250,
    entryPrice: 12.1,
    currentPrice: 12.1,
    liquidationPrice: 9.68,
    pnl: 87.5,
    pnlPercentage: 3.6,
    fundingRate: 0.02,
  },
];

export default function OpenPositionsTable({
  positions = mockPositions,
}: OpenPositionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white rounded-[10px] flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-[16px] md:p-5 gap-3 border-b border-light-gray">
        <h2 className="font-nohemi font-medium text-[14px] text-main tracking-[0.28px] leading-none">
          Open Positions Table
        </h2>

        {/* Search and Filter */}
        <div className="flex items-center gap-[10px]">
          {/* Search Input */}
          <div className="flex flex-row items-center flex-1 md:w-[170px] h-[32px] rounded-[7px] border border-black/5 py-[6px] pr-[16px] pl-[10px] gap-[10px] bg-white">
            <Search
              width={12}
              height={12}
              color="var(--main)"
              className="shrink-0"
            />
            <input
              type="text"
              placeholder="Search here..."
              aria-label="Search"
              className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]"
            />
          </div>

          {/* Filter Button */}
          <button className="bg-white border border-main/7 rounded-[8px] h-[32px] w-[32px] flex items-center justify-center hover:bg-gray-50 transition-colors relative overflow-visible after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)] shrink-0">
            <Image
              src="/icons/filter-icon.svg"
              alt="Filter"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>

      {/* Table - Horizontal Scroll on Mobile */}
      <div className="flex flex-col overflow-x-auto">
        {/* Table Header */}
        <div className="flex items-center px-[4px] min-w-[1300px]">
          <div className="flex items-center px-[16px] py-[12px] w-[336px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Athlete Name
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Position
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Size
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Entry/$
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Current/$
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Liq. Price
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              PnL (Unrealized)
            </p>
          </div>
          <div className="flex items-center px-[16px] py-[12px] w-[160px]">
            <p className="font-medium text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
              Fun Rate
            </p>
          </div>
          <div className="w-[56px]" />
        </div>

        {/* Table Rows */}
        {positions.map((position, index) => (
          <div key={position.id} className="flex items-center px-[4px] min-w-[1300px]">
            {/* Athlete Name */}
            <div className="flex items-center gap-[10px] px-[16px] py-[12px] w-[336px]">
              <div
                className={`relative w-8 h-8 rounded-md ${position.athleteBgColor} overflow-hidden`}
              >
                <Image
                  src="/icons/athletes/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover object-top opacity-8 mix-blend-screen"
                />
                <Image
                  src={position.athleteImage}
                  alt={position.athleteName}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                {position.athleteName} ({position.league})
              </p>
            </div>

            {/* Position */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                {position.position} {position.leverage}
              </p>
            </div>

            {/* Size */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                ${position.size}
              </p>
            </div>

            {/* Entry/$ */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                ${position.entryPrice.toFixed(2)}
              </p>
            </div>

            {/* Current/$ */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                ${position.currentPrice.toFixed(2)}
              </p>
            </div>

            {/* Liquidation Price */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                ${position.liquidationPrice.toFixed(2)}
              </p>
            </div>

            {/* PnL (Unrealized) */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <div className="flex items-center gap-[3px]">
                <p className="font-medium text-[14px] tracking-[-0.14px] leading-none text-main">
                  {position.pnl >= 0 ? "+" : ""}$
                  {Math.abs(position.pnl).toFixed(2)}
                </p>
                <div className="flex items-center gap-[1px]">
                  {position.pnl >= 0 ? (
                    <ArrowUp className="w-[14px] h-[14px] text-dark-green" />
                  ) : (
                    <ArrowUp className="w-[14px] h-[14px] text-base-red rotate-180" />
                  )}
                  <p
                    className={`font-medium text-[14px] tracking-[-0.14px] leading-none ${
                      position.pnl >= 0 ? "text-dark-green" : "text-base-red"
                    }`}
                  >
                    {Math.abs(position.pnlPercentage).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Funding Rate */}
            <div className="flex items-center px-[16px] py-[12px] w-[160px]">
              <p className="font-medium text-[14px] text-main tracking-[-0.14px] leading-none">
                {position.fundingRate.toFixed(2)}%
              </p>
            </div>

            {/* Menu */}
            <div className="flex items-center justify-center w-[56px]">
              <button className="p-[8px] hover:bg-gray-50 rounded-[6px] transition-colors">
                <MoreVertical className="w-[16px] h-[16px] text-soft-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
