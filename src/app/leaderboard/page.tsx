"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import StatCard from "@/components/leaderboard/stat-card";
import IndexTableCard from "@/components/leaderboard/index-table-card";
import LeaderboardTableCard from "@/components/leaderboard/leaderboard-table-card";
import TodayFixturesSide from "@/components/home-page/today-fixtures-side";
import UpcomingMatchesSide from "@/components/home-page/upcoming-matches-side";
import PerformanceBreakdownPage from "@/components/leaderboard/performance-breakdown-page";

export default function LeaderboardPage() {
  const statCards = [
    {
      title: "Total Players",
      value: "$18.4M",
      percent: "+6.2",
    },
    {
      title: "Funding Rate (Avg)",
      value: "+0.012%",
      percent: "+6.2",
    },
    {
      title: "Avg Trade Size",
      value: "$1,420",
      percent: "+6.2",
    },
    {
      title: "Total Trades (24H)",
      value: "31,782",
      percent: "+6.2",
    },
  ];

  const indexRows = [
    {
      team: "NBA",
      teamSrc: "/icons/leagues/nba-new.png",
      long: "58%",
      short: "42%",
      openInterest: "$4.8M",
      funRate: "+0.010%",
    },
    {
      team: "NFL",
      teamSrc: "/icons/leagues/nfl.png",
      long: "67%",
      short: "33%",
      openInterest: "$3.2M",
      funRate: "-0.016%",
    },
    {
      team: "MLB",
      teamSrc: "/icons/leagues/mlb.png",
      long: "46%",
      short: "33%",
      openInterest: "$3.2M",
      funRate: "+0.016%",
    },
    {
      team: "EPL",
      teamSrc: "/icons/leagues/premiere-league.png",
      long: "46%",
      short: "33%",
      openInterest: "$3.2M",
      funRate: "+0.016%",
    },
    {
      team: "La Liga",
      teamSrc: "/icons/leagues/la-liga.png",
      long: "52%",
      short: "33%",
      openInterest: "$3.2M",
      funRate: "-0.016%",
    },
  ];

  const leaderboardRows = [
    {
      index: 1,
      initials: "SP",
      initialsColor: "bg-lighter-yellow",
      name: "ShadowProfit",
      badge: "ELITE",
      badgeColor: "bg-base-blue",
      pnl: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/nba-new.png",
      indexFocusTitle: "NBA",
    },
    {
      index: 2,
      initials: "NB",
      initialsColor: "bg-lighter-yellow",
      name: "NovaBear",
      badge: "PRO",
      badgeColor: "bg-base-yellow",
      pnl: "-$5,290",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "55%",
      indexFocusSrc: "/icons/leagues/mlb.png",
      indexFocusTitle: "MLB",
    },
    {
      index: 3,
      initials: "M",
      initialsColor: "bg-light-purple",
      name: "MarfaX",
      badge: "BRONZE",
      badgeColor: "bg-base-orange",
      pnl: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "2",
      winRate: "90%",
      indexFocusSrc: "/icons/leagues/nfl.png",
      indexFocusTitle: "NFL",
    },
    {
      index: 4,
      initials: "ZZ",
      initialsColor: "bg-lighter-green",
      name: "ZenithZone",
      badge: "ELITE",
      badgeColor: "bg-base-blue",
      pnl: "+$3,688",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "67%",
      indexFocusSrc: "/icons/leagues/premiere-league.png",
      indexFocusTitle: "EPL",
    },
    {
      index: 5,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "PRO",
      badgeColor: "bg-base-yellow",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/mlb.png",
      indexFocusTitle: "MLB",
    },
    {
      index: 6,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "BRONZE",
      badgeColor: "bg-base-orange",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/nfl.png",
      indexFocusTitle: "NFL",
    },
    {
      index: 7,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "ELITE",
      badgeColor: "bg-base-blue",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/mlb.png",
      indexFocusTitle: "MLB",
    },
    {
      index: 8,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "PRO",
      badgeColor: "bg-base-yellow",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/premiere-league.png",
      indexFocusTitle: "EPL",
    },
    {
      index: 9,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "PRO",
      badgeColor: "bg-base-yellow",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/premiere-league.png",
      indexFocusTitle: "EPL",
    },
    {
      index: 10,
      initials: "CP",
      initialsColor: "bg-lighter-yellow",
      name: "CoinPilot",
      badge: "BRONZE",
      badgeColor: "bg-base-orange",
      pnl: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
      indexFocusSrc: "/icons/leagues/la-liga.png",
      indexFocusTitle: "La Liga",
    },
  ];

  // Time Range options
  const timeRangeOptions = [
    { id: "24h", label: "24 Hours" },
    { id: "7d", label: "7 Days" },
    { id: "30d", label: "30 Days" },
    { id: "90d", label: "90 Days" },
    { id: "1y", label: "1 Year" },
    { id: "all", label: "All Time" },
  ];
  const [selectedTimeRange, setSelectedTimeRange] = useState(
    timeRangeOptions[0],
  );

  // Sort By options
  const sortByOptions = [
    { id: "pnl", label: "24H PnL" },
    { id: "total-pnl", label: "Total PnL" },
    { id: "win-rate", label: "Win Rate" },
    { id: "open-positions", label: "Open Positions" },
  ];
  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[0]);

  // Controls whether the Performance Breakdown page is visible
  const [showPerformanceBreakdown, setShowPerformanceBreakdown] =
    useState<boolean>(false);

  // Broadcast visibility to the header
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as { __performanceBreakdownVisible?: boolean }
      ).__performanceBreakdownVisible = showPerformanceBreakdown;
      window.dispatchEvent(
        new CustomEvent("performanceBreakdown", {
          detail: { visible: showPerformanceBreakdown },
        }),
      );
    }
  }, [showPerformanceBreakdown]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flex w-full ${
            showPerformanceBreakdown
              ? "flex-row justify-center"
              : "flex-col items-center"
          } bg-page-background gap-[16px] px-[16px] pt-[117px] pb-[24px] md:gap-[24px] md:px-[40px]`}
        >
          {!showPerformanceBreakdown ? (
            <div className="flex w-full flex-col gap-[16px] overflow-y-hidden md:w-fit md:gap-6">
              <div className="flex h-fit w-auto flex-col items-start justify-between gap-[16px] pt-[20px] md:flex-row md:items-center md:gap-0 md:pt-6">
                <p className="font-nohemi text-text-primary text-[22px] leading-[100%] font-medium tracking-[2%] md:text-[26px]">
                  Leaderboard
                </p>
                <div className="flex h-fit w-full flex-row gap-2.5 md:w-fit">
                  {/* Time Range dropdown */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="border-main/7 hover:bg-primary-foreground flex h-fit items-center gap-2 rounded-[100px] border bg-white px-[12px] md:px-3">
                        <span className="text-text-primary text-[12px] font-medium md:text-[13px]">
                          Time Range
                        </span>
                        <ChevronDown
                          size={14}
                          className="text-text-secondary shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[180px] bg-white p-2"
                    >
                      <div className="flex flex-col">
                        {timeRangeOptions.map((opt) => {
                          const active = opt.id === selectedTimeRange.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedTimeRange(opt)}
                              className={`hover:bg-primary-foreground flex w-full items-center rounded-md px-2 py-2 text-left ${
                                active ? "bg-primary-foreground" : ""
                              }`}
                            >
                              <span className="text-text-primary text-[13px]">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Sort By dropdown */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="border-main/7 hover:bg-primary-foreground flex h-fit items-center gap-2 rounded-[100px] border bg-white px-[12px] md:px-3">
                        <span className="text-text-primary text-[12px] font-medium md:text-[13px]">
                          Sort By
                        </span>
                        <ChevronDown
                          size={14}
                          className="text-text-secondary shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[180px] bg-white p-2"
                    >
                      <div className="flex flex-col">
                        {sortByOptions.map((opt) => {
                          const active = opt.id === selectedSortBy.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedSortBy(opt)}
                              className={`hover:bg-primary-foreground flex w-full items-center rounded-md px-2 py-2 text-left ${
                                active ? "bg-primary-foreground" : ""
                              }`}
                            >
                              <span className="text-text-primary text-[13px]">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex w-full flex-row justify-center gap-[16px] overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] md:w-fit md:gap-6 [&::-webkit-scrollbar]:hidden">
                <div className="flex w-full flex-col gap-[16px] md:gap-6 lg:w-[1020px]">
                  <div className="grid w-full grid-cols-1 gap-[12px] min-[400px]:grid-cols-2 md:grid-cols-4 md:gap-6">
                    {statCards.map((card, index) => (
                      <StatCard key={index} {...card} />
                    ))}
                  </div>

                  <IndexTableCard
                    rows={indexRows}
                    onOpen={() => setShowPerformanceBreakdown(true)}
                  />

                  <LeaderboardTableCard rows={leaderboardRows} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <PerformanceBreakdownPage
                onBack={() => setShowPerformanceBreakdown(false)}
              />
              <div className="flex w-full flex-col gap-6 pt-6 md:w-[300px]">
                <TodayFixturesSide />
                <UpcomingMatchesSide />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
