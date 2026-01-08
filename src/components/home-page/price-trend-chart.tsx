"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import TrendingCard from "./trending-card";
import TradeDialog from "../trade/trade_dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TradeButton from "../trade-button";

interface AthleteData {
  id: string;
  image?: string;
  name: string;
  abbreviation: string;
  team: string;
  price: string;
  change: number;
  percentage?: number;
  volume: string;
  volumeChange: number;
  performance: number;
  rank: number;
}

const athletesData: AthleteData[] = [
  {
    id: "1",
    image: "/icons/athletes/lebron-james.png",
    name: "LeBron James",
    abbreviation: "LAA",
    team: "Los Angeles Lakers",
    price: "$102.3",
    change: 3.27,
    percentage: 80,
    volume: "$321.6k",
    volumeChange: 3.27,
    performance: 86,
    rank: 31,
  },
  {
    id: "2",
    image: "/icons/athletes/stephen-curry.png",
    name: "Stephen Curry",
    abbreviation: "GSW",
    team: "Golden State Warriors",
    price: "$98.5",
    change: -1.26,
    percentage: 75,
    volume: "$245.3k",
    volumeChange: -1.26,
    performance: 82,
    rank: 28,
  },
  {
    id: "3",
    image: "/icons/athletes/kevin-durant.png",
    name: "Kevin Durant",
    abbreviation: "PHX",
    team: "Phoenix Suns",
    price: "$105.2",
    change: 2.15,
    percentage: 85,
    volume: "$412.8k",
    volumeChange: 2.15,
    performance: 89,
    rank: 15,
  },
  {
    id: "4",
    image: "/icons/athletes/luka-doncic.png",
    name: "Luka Doncic",
    abbreviation: "DAL",
    team: "Dallas Mavericks",
    price: "$108.9",
    change: -0.89,
    percentage: 78,
    volume: "$389.2k",
    volumeChange: -0.89,
    performance: 91,
    rank: 12,
  },
  {
    id: "5",
    image: "/icons/athletes/jayson-tatum.png",
    name: "Jayson Tatum",
    abbreviation: "BOS",
    team: "Boston Celtics",
    price: "$99.7",
    change: 2.45,
    percentage: 88,
    volume: "$356.4k",
    volumeChange: 2.45,
    performance: 87,
    rank: 22,
  },
  {
    id: "6",
    image: "/icons/athletes/g-antetokounmpo.png",
    name: "Giannis Antetokounmpo",
    abbreviation: "MIL",
    team: "Milwaukee Bucks",
    price: "$112.4",
    change: 4.12,
    percentage: 92,
    volume: "$478.5k",
    volumeChange: 4.12,
    performance: 94,
    rank: 8,
  },
];

export default function PriceTrendChart() {
  const [activeTab, setActiveTab] = useState("athletes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState<string>("");

  const tabs = [
    {
      label: "Athletes",
      value: "athletes",
    },
    {
      label: "Teams",
      value: "teams",
    },
    {
      label: "Guards",
      value: "guards",
    },
    {
      label: "Forwards",
      value: "forwards",
    },
    {
      label: "Trending",
      value: "trending",
    },
    {
      label: "Volume",
      value: "volume",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between px-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto flex-row items-center gap-[8px] bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-text-primary cursor-pointer px-2 py-0 text-[14px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-primary-foreground"
                : "hover:bg-primary-foreground bg-transparent"
            }`}
          >
            <Image
              src="/icons/grid.svg"
              alt="Grid view"
              width={18}
              height={18}
            />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === "list"
                ? "bg-primary-foreground"
                : "hover:bg-primary-foreground bg-transparent"
            }`}
          >
            <Image
              src="/icons/list.svg"
              alt="List view"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
      {viewMode === "list" ? (
        <div className="w-full overflow-x-auto">
          <Table className="w-full table-auto border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                  Player
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Chart
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Price
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Volume
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Performance
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Rank
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {athletesData.map((athlete, index) => {
                const isLastRow = index === athletesData.length - 1;
                const changeColor =
                  athlete.change >= 0 ? "text-light-green" : "text-red-500";
                const volumeChangeColor =
                  athlete.volumeChange >= 0
                    ? "text-light-green"
                    : "text-red-500";
                const changeSign = athlete.change >= 0 ? "+" : "";
                const volumeChangeSign = athlete.volumeChange >= 0 ? "+" : "";

                return (
                  <TableRow
                    key={athlete.id}
                    className="bg-elevation-card hover:bg-elevation-card mb-2 rounded-[14px] border-0 transition-colors duration-200 ease-out hover:cursor-pointer"
                  >
                    <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
                      <div className="relative flex flex-row items-center gap-2">
                        <div className="bg-dark-yellow relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src="/icons/athletes/logo.png"
                            alt="Logo"
                            fill
                            className="object-cover object-top opacity-8 mix-blend-screen"
                          />
                          <Image
                            src={athlete.image || "/icons/athletes/logo.png"}
                            alt={athlete.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                            {athlete.name}
                          </p>
                          <p className="text-soft-400 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                            {athlete.team}
                          </p>
                        </div>
                        <div className="bg-league-card text-soft-400 flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                          <Image
                            src="/icons/game/f.svg"
                            alt="Flag"
                            width={8}
                            height={10}
                          />
                          <span>{athlete.percentage}%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Image
                        src="/icons/game/chart.png"
                        alt="Chart"
                        width={100}
                        height={25}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div>
                        <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                          {athlete.price}
                        </p>
                        <p
                          className={`${changeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}
                        >
                          {changeSign}
                          {athlete.change.toFixed(2)}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div>
                        <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                          {athlete.volume}
                        </p>
                        <p
                          className={`${volumeChangeColor} text-[12px] leading-[100%] font-medium tracking-[-1%]`}
                        >
                          {volumeChangeSign}
                          {athlete.volumeChange.toFixed(2)}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {athlete.performance}%
                    </TableCell>
                    <TableCell className="px-4 py-3">#{athlete.rank}</TableCell>
                    <TableCell
                      className={`${
                        isLastRow ? "w-[1%] px-2" : "px-4"
                      } rounded-tr-[14px] rounded-br-[14px] py-3`}
                    >
                      <div
                        className={`flex flex-row items-center gap-2 ${
                          isLastRow ? "shrink-0" : ""
                        }`}
                      >
                        {/* <button onClick={() => {setOpenTradeDialog(true); setTradeType("long")}} className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>  
                                                </button>
                                                <button onClick={() => {setOpenTradeDialog(true); setTradeType("short")}} className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button> */}
                        <TradeButton
                          onClick={() => {
                            setOpenTradeDialog(true);
                            setTradeType("long");
                          }}
                          type={"long"}
                        />
                        <TradeButton
                          onClick={() => {
                            setOpenTradeDialog(true);
                            setTradeType("short");
                          }}
                          type={"short"}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {athletesData.map((athlete) => (
              <div key={athlete.id} className="flex-shrink-0">
                <TrendingCard
                  id={athlete.id}
                  image={athlete.image}
                  name={athlete.name}
                  abbreviation={athlete.abbreviation}
                  price={athlete.price}
                  change={athlete.change}
                  percentage={athlete.percentage}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <Dialog open={openTradeDialog} onOpenChange={setOpenTradeDialog}>
        <DialogContent showCloseButton={false} className="p-0">
          <TradeDialog type={tradeType} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
