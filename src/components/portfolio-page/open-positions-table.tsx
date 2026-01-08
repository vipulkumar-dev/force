"use client";

import { useState } from "react";
import { MoreVertical, ArrowUp, ListFilterIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
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
    <div className="flex w-full flex-col rounded-[20px] bg-white p-[16px]">
      <div className="flex w-full flex-row items-center justify-between p-[16px] md:p-5">
        <h2 className="font-nohemi text-text-primary text-[14px] leading-none font-medium tracking-[0.28px]">
          Open Positions
        </h2>
        <div className="flex flex-row items-center gap-[10px]">
          <div className="bg-page-background flex flex-row items-center gap-[10px] rounded-full">
            {/* Search Input */}
            <div className="flex h-[32px] flex-1 flex-row items-center gap-[10px] py-[6px] pr-[16px] pl-[10px] md:w-[204px]">
              <SearchIcon
                width={15}
                height={15}
                className="text-text-primary shrink-0"
              />{" "}
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="placeholder:text-disabled-300 h-[18px] flex-1 border-0 bg-transparent px-0 text-[12px] leading-[100%] tracking-tight text-[#0a0d14] outline-none"
              />
            </div>
          </div>

          {/* Filter Button */}
          <Button className="bg-page-background flex h-[32px] w-[32px] items-center gap-[6px] rounded-[8px] border-none px-[12px] py-[10px] transition-colors hover:bg-gray-50 md:gap-[8px] md:px-[16px]">
            <ListFilterIcon className="text-text-primary h-[16px] w-[16px] shrink-0" />
          </Button>
        </div>
      </div>
      <div className="bg-light-gray flex h-[1px] w-full items-center justify-between"></div>
      <div className="bg-page-background w-full overflow-x-auto rounded-[20px]">
        <Table className="w-full min-w-full table-auto border-separate border-spacing-y-2 px-2">
          <TableHeader>
            <TableRow className="border-0">
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] font-medium whitespace-nowrap">
                Athlete Name
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Position
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Size
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Entry/$
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Current/$
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                Liq. Price
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
                PnL (Unrealized)
              </TableHead>
              <TableHead className="text-muted-foreground px-4 py-3 text-[12px] whitespace-nowrap">
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
                <TableCell className="mx-2 rounded-l-[14px] bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex items-center gap-[10px] px-[4px] py-[6px]">
                    <div
                      className={`relative h-8 w-8 rounded-md ${position.athleteBgColor} overflow-hidden`}
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
                    <p className="text-text-primary text-[14px] font-medium">
                      {position.athleteName} ({position.league})
                    </p>
                  </div>
                </TableCell>

                {/* Position */}
                <TableCell className="text-text-primary mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  {position.position} {position.leverage}
                </TableCell>

                {/* Size */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${position.size}
                </TableCell>

                {/* Entry */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${position.entryPrice.toFixed(2)}
                </TableCell>

                {/* Current */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${position.currentPrice.toFixed(2)}
                </TableCell>

                {/* Liq */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  ${position.liquidationPrice.toFixed(2)}
                </TableCell>

                {/* PNL */}
                <TableCell className="mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-text-primary">
                      {position.pnl >= 0 ? "+" : "-"}$
                      {Math.abs(position.pnl).toFixed(2)}
                    </span>
                    <span
                      className={`${
                        position.pnl >= 0 ? "text-dark-green" : "text-base-red"
                      }`}
                    >
                      {Math.abs(position.pnlPercentage).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>

                {/* Funding */}
                <TableCell className="text-text-primary mx-2 bg-white px-4 py-3 text-[12px] font-medium">
                  {position.fundingRate.toFixed(2)}%
                </TableCell>

                {/* Menu */}
                <TableCell className="mx-2 w-[1%] rounded-r-[14px] bg-white px-4 py-3 text-[12px] font-medium">
                  <div className="flex justify-end">
                    <button className="rounded-[6px] p-[8px] transition-colors hover:bg-gray-50">
                      <MoreVertical className="text-soft-400 h-[16px] w-[16px]" />
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
