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
import AppFooter from "@/components/app-footer";

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
    timeRangeOptions[0]
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
        })
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
          className={`w-full flex ${
            showPerformanceBreakdown
              ? "flex-row justify-center"
              : "flex-col items-center"
          } gap-[16px] md:gap-[24px] px-[16px] md:px-[40px] bg-page-background pt-[117px] pb-[24px]`}
        >
          {!showPerformanceBreakdown ? (
            <div className="w-full md:w-fit flex flex-col gap-[16px] md:gap-6 overflow-y-hidden">
              <div className="w-auto h-fit flex flex-col md:flex-row items-start md:items-center justify-between pt-[20px] md:pt-6 gap-[16px] md:gap-0">
                <p className="font-nohemi font-medium text-[22px] md:text-[26px] leading-[100%] tracking-[2%] text-main">
                  Leaderboard
                </p>
                <div className="w-full  md:w-fit h-fit gap-2.5 flex flex-row">
                  {/* Time Range dropdown */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="h-fit px-[12px] md:px-3 rounded-[100px] border border-main/7 bg-white hover:bg-primary-foreground flex items-center gap-2">
                        <span className="text-[12px] md:text-[13px] font-medium text-main">
                          Time Range
                        </span>
                        <ChevronDown
                          size={14}
                          className="text-soft-400 shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[180px] p-2 bg-white"
                    >
                      <div className="flex flex-col">
                        {timeRangeOptions.map((opt) => {
                          const active = opt.id === selectedTimeRange.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedTimeRange(opt)}
                              className={`flex items-center w-full text-left px-2 py-2 rounded-md hover:bg-primary-foreground ${
                                active ? "bg-primary-foreground" : ""
                              }`}
                            >
                              <span className="text-[13px] text-main">
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
                      <Button className="h-fit px-[12px] md:px-3 rounded-[100px] border border-main/7 bg-white hover:bg-primary-foreground flex items-center gap-2">
                        <span className="text-[12px] md:text-[13px] font-medium text-main">
                          Sort By
                        </span>
                        <ChevronDown
                          size={14}
                          className="text-soft-400 shrink-0"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[180px] p-2 bg-white"
                    >
                      <div className="flex flex-col">
                        {sortByOptions.map((opt) => {
                          const active = opt.id === selectedSortBy.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedSortBy(opt)}
                              className={`flex items-center w-full text-left px-2 py-2 rounded-md hover:bg-primary-foreground ${
                                active ? "bg-primary-foreground" : ""
                              }`}
                            >
                              <span className="text-[13px] text-main">
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
              <div className="flex flex-row w-full md:w-fit justify-center gap-[16px] md:gap-6 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col lg:w-[1020px]  w-full gap-[16px] md:gap-6">
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-6 w-full">
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
              <div className="w-full md:w-[300px] flex flex-col pt-6 gap-6">
                <TodayFixturesSide />
                <UpcomingMatchesSide />
              </div>
            </>
          )}
        </div>
        <AppFooter />
      </motion.div>
    </AnimatePresence>
  );
}
