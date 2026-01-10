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
import TrendingCard from "../common/athletes-card";
import TradeDialog from "../trade/trade_dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TradeButton from "../common/trade-button";

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
      <div className="flex w-full flex-row items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex h-auto flex-row items-center gap-[16px] bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-text-primary cursor-pointer px-0 py-0 text-[14px] leading-[100%] font-semibold after:hidden data-[state=active]:shadow-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="border-border-secondary flex flex-row items-center rounded-[8px] border p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`cursor-pointer rounded-[4px] p-[4.5px] transition-colors ${
              viewMode === "grid" ? "bg-elevation-button" : "bg-transparent"
            }`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 3.125C2.5 2.95924 2.56585 2.80027 2.68306 2.68306C2.80027 2.56585 2.95924 2.5 3.125 2.5H5.625C5.79076 2.5 5.94973 2.56585 6.06694 2.68306C6.18415 2.80027 6.25 2.95924 6.25 3.125V5.625C6.25 5.79076 6.18415 5.94973 6.06694 6.06694C5.94973 6.18415 5.79076 6.25 5.625 6.25H3.125C2.95924 6.25 2.80027 6.18415 2.68306 6.06694C2.56585 5.94973 2.5 5.79076 2.5 5.625V3.125Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.75 3.125C8.75 2.95924 8.81585 2.80027 8.93306 2.68306C9.05027 2.56585 9.20924 2.5 9.375 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V5.625C12.5 5.79076 12.4342 5.94973 12.3169 6.06694C12.1997 6.18415 12.0408 6.25 11.875 6.25H9.375C9.20924 6.25 9.05027 6.18415 8.93306 6.06694C8.81585 5.94973 8.75 5.79076 8.75 5.625V3.125Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 9.375C2.5 9.20924 2.56585 9.05027 2.68306 8.93306C2.80027 8.81585 2.95924 8.75 3.125 8.75H5.625C5.79076 8.75 5.94973 8.81585 6.06694 8.93306C6.18415 9.05027 6.25 9.20924 6.25 9.375V11.875C6.25 12.0408 6.18415 12.1997 6.06694 12.3169C5.94973 12.4342 5.79076 12.5 5.625 12.5H3.125C2.95924 12.5 2.80027 12.4342 2.68306 12.3169C2.56585 12.1997 2.5 12.0408 2.5 11.875V9.375Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.75 9.375C8.75 9.20924 8.81585 9.05027 8.93306 8.93306C9.05027 8.81585 9.20924 8.75 9.375 8.75H11.875C12.0408 8.75 12.1997 8.81585 12.3169 8.93306C12.4342 9.05027 12.5 9.20924 12.5 9.375V11.875C12.5 12.0408 12.4342 12.1997 12.3169 12.3169C12.1997 12.4342 12.0408 12.5 11.875 12.5H9.375C9.20924 12.5 9.05027 12.4342 8.93306 12.3169C8.81585 12.1997 8.75 12.0408 8.75 11.875V9.375Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`cursor-pointer rounded-[4px] p-[4.5px] transition-colors ${
              viewMode === "list" ? "bg-elevation-button" : "bg-transparent"
            }`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H11.25C11.5815 2.5 11.8995 2.6317 12.1339 2.86612C12.3683 3.10054 12.5 3.41848 12.5 3.75V5C12.5 5.33152 12.3683 5.64946 12.1339 5.88388C11.8995 6.1183 11.5815 6.25 11.25 6.25H3.75C3.41848 6.25 3.10054 6.1183 2.86612 5.88388C2.6317 5.64946 2.5 5.33152 2.5 5V3.75Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 10C2.5 9.66848 2.6317 9.35054 2.86612 9.11612C3.10054 8.8817 3.41848 8.75 3.75 8.75H11.25C11.5815 8.75 11.8995 8.8817 12.1339 9.11612C12.3683 9.35054 12.5 9.66848 12.5 10V11.25C12.5 11.5815 12.3683 11.8995 12.1339 12.1339C11.8995 12.3683 11.5815 12.5 11.25 12.5H3.75C3.41848 12.5 3.10054 12.3683 2.86612 12.1339C2.6317 11.8995 2.5 11.5815 2.5 11.25V10Z"
                stroke="#7E7E8C"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {viewMode === "list" ? (
        <div className="w-full overflow-x-auto">
          <Table className="w-full table-auto border-separate border-spacing-y-1">
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
                        <Link
                          href={`/athlete/${athlete.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="bg-dark-yellow relative h-8 w-8 overflow-hidden rounded-full"
                        >
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
                        </Link>
                        <div>
                          <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                            {athlete.name}
                          </p>
                          <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                            {athlete.team}
                          </p>
                        </div>
                        <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
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
                      className={`w-[1%] rounded-tr-[14px] rounded-br-[14px] px-4 py-3`}
                    >
                      <div className={`flex flex-row items-center gap-1`}>
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
          <div className="flex flex-row gap-2 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
