"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import LivePerformanceChart, { TimeRangeT } from "./live-performance-chart";
import {
  commaFormatterDecimals2,
  currencyFormatter,
  moneyFormatter,
} from "@/lib/formatter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MarketModal from "./market-modal";
import Link from "next/link";

const timeRanges: TimeRangeT[] = ["1H", "6H", "1D", "1W", "ALL"];

type PlayerDataT = {
  name: string;
  team: string;
  teamAbbr: string;
  playerIconSrc: string;
  teamIconSrc: string;
  price: number;
  change24h: number;
  volume24h: number;
  news: string;
  priceTrendLabel: string;
};

const players: PlayerDataT[] = [
  {
    name: "LeBron James",
    team: "Los Angeles Lakers",
    teamAbbr: "LAL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 124.6,
    change24h: 3.42,
    volume24h: 1245678,
    news: "The Lakers have been on a 4-game winning streak, driven by strong performances from LeBron James and Anthony Davis.",
    priceTrendLabel: "LeBron Price Trend",
  },
  {
    name: "Stephen Curry",
    team: "Golden State Warriors",
    teamAbbr: "GSW",
    playerIconSrc: "/icons/players/stephen-curry.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 118.3,
    change24h: 2.94,
    volume24h: 987432,
    news: "Curry's exceptional three-point shooting has led the Warriors to three consecutive victories, boosting market confidence.",
    priceTrendLabel: "Curry Price Trend",
  },
  {
    name: "Kevin Durant",
    team: "Phoenix Suns",
    teamAbbr: "PHX",
    playerIconSrc: "/icons/players/kevin-durrant.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 115.8,
    change24h: 2.32,
    volume24h: 856234,
    news: "Durant's consistent scoring and leadership have positioned the Suns as strong contenders in the Western Conference.",
    priceTrendLabel: "Durant Price Trend",
  },
  {
    name: "Giannis Antetokounmpo",
    team: "Milwaukee Bucks",
    teamAbbr: "MIL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 112.4,
    change24h: 1.87,
    volume24h: 743891,
    news: "The Greek Freak's dominant performances continue to drive the Bucks' success, with impressive stats across the board.",
    priceTrendLabel: "Giannis Price Trend",
  },
  {
    name: "Luka Doncic",
    team: "Dallas Mavericks",
    teamAbbr: "DAL",
    playerIconSrc: "/icons/players/lebron-james.png",
    teamIconSrc: "/icons/events/lal.png",
    price: 109.7,
    change24h: 1.65,
    volume24h: 692156,
    news: "Doncic's triple-double performances have been instrumental in the Mavericks' recent surge up the standings.",
    priceTrendLabel: "Luka Price Trend",
  },
];

export default function LivePerformanceCard() {
  const [timeRange, setTimeRange] = useState<TimeRangeT>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);

  const currentPlayer = players[currentIndex];
  const nextPlayer = players[(currentIndex + 1) % players.length];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % players.length);
  };

  return (
    <div className="flex flex-col w-full rounded-[10px] bg-white">
      <Button
        asChild
        className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer"
      >
        <Link href="/athlete/lebron-james">
          <p className="font-nohemi font-medium text-sm leading-[100%] tracking-[2%] text-main">
            Live Performance
          </p>
          <ChevronRight className="text-soft-400" width={14} height={14} />
        </Link>
      </Button>

      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:gap-x-12 gap-y-6">
          <div className="flex flex-col gap-y-5 w-full lg:w-[260px] shrink-0 transition-opacity duration-300">
            <div className="flex items-center gap-x-3">
              <div className="w-11 h-11 rounded-lg bg-[#0A0D14]/3 px-1 py-2.5">
                <Image
                  className="w-full aspect-auto object-contain"
                  src={currentPlayer.teamIconSrc}
                  width={100}
                  height={100}
                  alt={currentPlayer.teamAbbr}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark-green" />
                  <p className="text-xs font-medium text-dark-green">
                    Realtime Market
                  </p>
                </div>

                <p className="font-semibold text-base text-main">
                  {currentPlayer.teamAbbr}
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="space-y-2.5">
                <p className="text-[11px] font-medium text-soft-400">Price</p>
                <p className="text-main font-semibold text-sm">
                  {currencyFormatter.format(currentPlayer.price)}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[11px] font-medium text-soft-400">
                  24H Change
                </p>
                <p
                  className={`font-semibold text-sm ${
                    currentPlayer.change24h >= 0
                      ? "text-dark-green"
                      : "text-base-red"
                  }`}
                >
                  {currentPlayer.change24h >= 0 ? "+" : ""}
                  {commaFormatterDecimals2.format(currentPlayer.change24h)}%
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[11px] font-medium text-soft-400">
                  24H Volume
                </p>
                <p className="text-main font-semibold text-sm">
                  {moneyFormatter.format(currentPlayer.volume24h)}
                </p>
              </div>
            </div>

            <Dialog
              open={openSide !== null}
              onOpenChange={(open) => {
                if (!open) setOpenSide(null);
              }}
            >
              <div className="flex gap-x-2.5">
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("long")}
                    className="bg-base-purple py-2.5 px-12 rounded-lg text-white hover:bg-base-purple/90 cursor-pointer text-sm font-medium"
                  >
                    Long
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("short")}
                    className="bg-base-orange py-2.5 px-12 rounded-lg text-white hover:bg-base-orange/90 cursor-pointer text-sm font-medium"
                  >
                    Short
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent
                className="bg-white w-[400px] px-0 py-0 max-h-[700px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                showCloseButton={false}
              >
                <MarketModal type={openSide ?? "long"} />
              </DialogContent>
            </Dialog>

            <div className="text-[11px] space-y-1">
              <p className="font-light text-soft-400 line-clamp-2">
                <span className="font-semibold text-main">News: </span>
                {currentPlayer.news}
              </p>

              <button className="flex items-center gap-x-1 text-main font-medium text-xs cursor-pointer hover:underline underline-offset-4">
                More Details{" "}
                <ChevronRight className="w-3.5 aspect-auto mt-0.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 w-full flex-1 min-w-0">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <Image
                  src="/icons/live-performance/chart-line.svg"
                  className="w-[14px] h-[14px]"
                  width={14}
                  height={14}
                  alt="chart-line"
                />
                <div className="font-semibold text-xs text-main">
                  Performances
                </div>
              </div>

              <div className="flex items-center gap-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`text-xs font-medium py-1.5 px-3 rounded-full cursor-pointer transition-colors ${
                      timeRange === range
                        ? "bg-soft-gray text-main"
                        : "text-soft-400 hover:text-main"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <LivePerformanceChart timeRange={timeRange} />
          </div>
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center cursor-pointer w-8 aspect-square rounded-lg border border-[#0A0D14]/7 group hover:bg-primary-foreground transition-colors duration-200 relative overflow-visible after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)]"
            >
              <ChevronLeft className="w-3.5 aspect-auto text-[#989A9E] group-hover:text-main" />
            </button>

            <p className="text-[11px] text-soft-400">
              {currentPlayer.priceTrendLabel}
            </p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-x-2">
            {players.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-200 cursor-pointer hover:opacity-80 ${
                  index === currentIndex
                    ? "bg-main w-[11px] h-[5px]"
                    : "bg-[#E2E4E9] w-[5px] h-[5px]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            <p className="text-[11px] text-soft-400">{nextPlayer.name} Price</p>

            <button
              onClick={handleNext}
              className="flex items-center justify-center cursor-pointer w-8 aspect-square rounded-lg border group border-[#0A0D14]/7 hover:bg-primary-foreground transition-colors duration-200 relative overflow-visible after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)]"
            >
              <ChevronRight className="w-3.5 aspect-auto text-[#989A9E] group-hover:text-main" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
