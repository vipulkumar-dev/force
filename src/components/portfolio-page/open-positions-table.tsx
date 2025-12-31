"use client";

import { useState } from "react";
import { MoreVertical, ArrowUp, ListFilterIcon } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
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
    athleteImage: "/images/players/lebron-james.png",
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
  return (
    <div className="flex flex-col w-full bg-white rounded-[20px] p-[16px]">
      <div className="flex flex-row items-center justify-between w-full p-[16px] md:p-5">
        <h2 className="font-nohemi font-medium text-[14px] text-main tracking-[0.28px] leading-none">Open Positions</h2>
        <div className="flex flex-row items-center gap-[10px]">

          <div className="flex flex-row items-center gap-[10px] bg-page-background rounded-full">
            {/* Search Input */}
            <div className="flex flex-row items-center flex-1 md:w-[204px] h-[32px] py-[6px] pr-[16px] pl-[10px] gap-[10px] ">
              <SearchIcon width={15} height={15}  className="text-main shrink-0" /> <input type="text" placeholder="Search" aria-label="Search" className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]" />
            </div>
          </div>

          {/* Filter Button */}
          <Button className="bg-page-background border-none rounded-[8px] h-[32px] w-[32px] px-[12px] md:px-[16px] py-[10px] flex items-center gap-[6px] md:gap-[8px] hover:bg-gray-50 transition-colors">
            <ListFilterIcon className="w-[16px] h-[16px] text-main shrink-0" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between h-[1px] w-full bg-light-gray">
      </div>
      <div className="w-full overflow-x-auto rounded-[20px] bg-page-background ">
        <Table className="border-separate px-2 border-spacing-y-2 w-full min-w-full table-auto">
          <TableHeader>
            <TableRow className="border-0">
              <TableHead className="text-muted-foreground text-[12px] font-medium whitespace-nowrap px-4 py-3">
                Athlete Name
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Position
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Size
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Entry/$
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Current/$
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Liq. Price
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                PnL (Unrealized)
              </TableHead>
              <TableHead className="text-muted-foreground text-[12px] whitespace-nowrap px-4 py-3">
                Fun Rate
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {positions.map((position) => (
              <TableRow
                key={position.id}
                className="border-0 hover:bg-transparent"
              >
                <TableCell className="bg-white px-4 py-3 mx-2 rounded-l-[14px] font-medium text-[12px]">
                  <div className="flex items-center gap-[10px] px-[4px] py-[6px]">
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
                    <p className="font-medium text-[14px] text-main">
                      {position.athleteName} ({position.league})
                    </p>
                  </div>
                </TableCell>

                {/* Position */}
                <TableCell className="bg-white px-4 py-3 mx-2 text-main font-medium text-[12px]">
                  {position.position} {position.leverage}
                </TableCell>

                {/* Size */}
                <TableCell className="bg-white px-4 py-3 mx-2 font-medium text-[12px]">
                  ${position.size}
                </TableCell>

                {/* Entry */}
                <TableCell className="bg-white px-4 py-3 mx-2 font-medium text-[12px]">
                  ${position.entryPrice.toFixed(2)}
                </TableCell>

                {/* Current */}
                <TableCell className="bg-white px-4 py-3 mx-2 font-medium text-[12px]">
                  ${position.currentPrice.toFixed(2)}
                </TableCell>

                {/* Liq */}
                <TableCell className="bg-white px-4 py-3 mx-2 font-medium text-[12px]">
                  ${position.liquidationPrice.toFixed(2)}
                </TableCell>

                {/* PNL */}
                <TableCell className="bg-white px-4 py-3 mx-2 font-medium text-[12px]">
                  <div className="flex items-center gap-1">

                    <span className="text-main">
                      {position.pnl >= 0 ? "+" : "-"}$
                      {Math.abs(position.pnl).toFixed(2)}
                    </span>
                    <span
                      className={`${position.pnl >= 0
                        ? "text-dark-green"
                        : "text-base-red"
                        }`}
                    >
                      {Math.abs(position.pnlPercentage).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>

                {/* Funding */}
                <TableCell className="bg-white px-4 py-3 mx-2 text-main font-medium text-[12px]">
                  {position.fundingRate.toFixed(2)}%
                </TableCell>

                {/* Menu */}
                <TableCell className="bg-white px-4 py-3 mx-2 rounded-r-[14px] font-medium text-[12px] w-[1%]">
                  <div className="flex justify-end">
                    <button className="p-[8px] hover:bg-gray-50 rounded-[6px] transition-colors">
                      <MoreVertical className="w-[16px] h-[16px] text-soft-400" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}
