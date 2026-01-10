"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";
import TodayGames from "@/components/home-page/trending";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface QuarterScore {
  quarter: string;
  team1Score: number;
  team2Score: number;
  isCurrent?: boolean;
}

export default function LivePage() {
  const [activeTab, setActiveTab] = useState("score-breakdown");
  const [activePlayerTab, setActivePlayerTab] = useState("all-players");
  const playerTabs = [
    {
      label: "All Players",
      value: "all-players",
    },
    {
      label: "Lakers",
      value: "lakers",
    },
    {
      label: "Warriors",
      value: "warriors",
    },
  ];
  const tabs = [
    {
      label: "Score Breakdown",
      value: "score-breakdown",
    },
    {
      label: "Live Events",
      value: "live-events",
    },
    {
      label: "Orders",
      value: "orders",
    },
    {
      label: "Chart",
      value: "chart",
    },
  ];

  // Score breakdown data
  const [quarterScores, setQuarterScores] = useState<QuarterScore[]>([
    { quarter: "Q1", team1Score: 28, team2Score: 25 },
    { quarter: "Q2", team1Score: 28, team2Score: 25 },
    { quarter: "Q3", team1Score: 28, team2Score: 25, isCurrent: true },
    { quarter: "Q4", team1Score: 0, team2Score: 0 },
  ]);

  // Calculate max score for scaling bars
  const maxScore = Math.max(
    ...quarterScores.map((q) => Math.max(q.team1Score, q.team2Score)),
    30, // minimum max to ensure bars are visible
  );

  const getBarWidth = (score: number) => {
    if (score === 0) return 0;
    // Calculate width as percentage of max score
    // This ensures bars are proportional to their actual scores
    // Use 90% max width to leave some margin on each side
    return Math.min((score / maxScore) * 90, 90);
  };
  return (
    <AnimatePresence>
      <motion.div
        key="live"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-page-background flex w-full flex-col justify-center pt-[117px]">
          <div className="relative h-[212px] w-full sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
            <Image
              src="/images/moments/basketball-moment.png"
              alt="Live Banner"
              width={1000}
              height={212}
              className="h-full w-full object-cover object-[top_10%]"
            />
          </div>
          <div className="mt-[20px] flex w-full flex-col items-center justify-center">
            <h1>Live</h1>
            <p>OQ3 | 5:15</p>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-[24px]">
            {/* Team 1*/}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-10">
                <div className="flex flex-row items-center justify-center gap-1">
                  <h4 className="text-text-secondary text-[16px] font-bold font-medium">
                    Lakers
                  </h4>
                  <Image
                    src="/icons/events/lal.png"
                    alt="Team 1"
                    width={32}
                    height={32}
                  />
                </div>
                <h1 className="text-text-primary text-[48px] font-bold">100</h1>
              </div>
              <div className="mb-[20px] flex flex-row items-center justify-center gap-6">
                <div className="flex flex-row items-center justify-center gap-1">
                  <h4 className="text-light-green text-[14px] font-bold font-medium">
                    +3.42%
                  </h4>
                  <h4 className="text-text-primary text-[14px] font-bold font-medium">
                    $124.6
                  </h4>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <button className="rounded-lg bg-white p-3 hover:cursor-pointer">
                    <Image
                      src="/icons/game/long.svg"
                      alt="Long"
                      width={10}
                      height={10}
                    />
                  </button>
                  <button className="rounded-lg bg-white p-3 hover:cursor-pointer">
                    <Image
                      src="/icons/game/short.svg"
                      alt="Short"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-soft-500 h-[60px] w-[1px]"></div>

            {/* Team 2*/}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-10">
                <h1 className="text-text-primary text-[48px] font-bold">100</h1>
                <div className="flex flex-row items-center justify-center gap-1">
                  <Image
                    src="/icons/events/gsw.png"
                    alt="Team 1"
                    width={32}
                    height={32}
                  />

                  <h4 className="text-text-secondary text-[16px] font-bold font-medium">
                    Warriors
                  </h4>
                </div>
              </div>
              <div className="mb-[20px] flex flex-row items-center justify-center gap-6">
                <div className="flex flex-row items-center justify-center gap-2">
                  <button className="rounded-lg bg-white p-3 hover:cursor-pointer">
                    <Image
                      src="/icons/game/long.svg"
                      alt="Long"
                      width={10}
                      height={10}
                    />
                  </button>
                  <button className="rounded-lg bg-white p-3 hover:cursor-pointer">
                    <Image
                      src="/icons/game/short.svg"
                      alt="Short"
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                <div className="flex flex-row items-center justify-center gap-1">
                  <h4 className="text-text-primary text-[14px] font-bold font-medium">
                    $124.6
                  </h4>
                  <h4 className="text-light-green text-[14px] font-bold font-medium">
                    +3.42%
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-soft-500 h-[1px] w-full"></div>
          <div className="my-[20px] flex w-full flex-row items-center justify-evenly gap-[24px]">
            <div>
              <h1 className="text-text-secondary text-[12px] font-bold font-medium">
                Total Volume
              </h1>
              <p className="text-text-primary text-[14px] font-bold font-semibold">
                $100,000
              </p>
            </div>
            <div>
              <h1 className="text-text-secondary text-[12px] font-bold font-medium">
                Spread
              </h1>
              <p className="text-text-primary text-[14px] font-bold font-semibold">
                LAL -8.0
              </p>
            </div>
            <div>
              <h1 className="text-text-secondary text-[12px] font-bold font-medium">
                Projected Final
              </h1>
              <p className="text-text-primary text-[14px] font-bold font-semibold">
                LAL 128 - 119 GSW
              </p>
            </div>
          </div>
          <div className="bg-soft-500 h-[1px] w-full"></div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mt-[20px] mb-[16px] flex w-full flex-row items-center justify-center gap-[24px]">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`text-[12px] font-bold font-medium ${activeTab === tab.value ? "text-text-primary" : "text-text-secondary"}`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center px-4">
              {activeTab === "score-breakdown" && (
                <div className="mx-auto w-full max-w-4xl">
                  <div className="w-full rounded-2xl bg-white p-6 md:p-8">
                    <div className="flex w-full flex-col gap-4">
                      {quarterScores.map((quarter, index) => (
                        <div
                          key={index}
                          className="flex w-full flex-row items-center gap-3 md:gap-4"
                        >
                          {/* Team 1 (Left side - Purple bars) */}
                          <div className="relative flex h-10 flex-1 justify-end">
                            {quarter.team1Score > 0 ? (
                              <div
                                className="flex h-full items-center justify-end rounded-full pr-3"
                                style={{
                                  width: `${getBarWidth(quarter.team1Score)}%`,
                                  maxWidth: "100%",
                                  background:
                                    "linear-gradient(to right, #6e3ff3, #a78bfa)",
                                  minWidth: "60px",
                                }}
                              >
                                <span className="text-sm font-bold whitespace-nowrap text-white">
                                  {quarter.team1Score}
                                </span>
                              </div>
                            ) : (
                              <div className="h-full w-full"></div>
                            )}
                          </div>

                          {/* Quarter Label */}
                          <div className="flex min-w-[70px] shrink-0 items-center justify-center gap-2">
                            <span className="text-text-secondary text-sm font-medium">
                              {quarter.quarter}
                            </span>
                            {quarter.isCurrent && (
                              <div className="bg-light-green h-2 w-2 rounded-full"></div>
                            )}
                          </div>

                          {/* Team 2 (Right side - Blue bars) */}
                          <div className="relative flex h-10 flex-1 justify-start">
                            {quarter.team2Score > 0 ? (
                              <div
                                className="flex h-full items-center justify-start rounded-full pl-3"
                                style={{
                                  width: `${getBarWidth(quarter.team2Score)}%`,
                                  maxWidth: "100%",
                                  background:
                                    "linear-gradient(to right, #60a5fa, #375dfb)",
                                  minWidth: "60px",
                                }}
                              >
                                <span className="text-sm font-bold whitespace-nowrap text-white">
                                  {quarter.team2Score}
                                </span>
                              </div>
                            ) : (
                              <div className="h-full w-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "live-events" && (
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                  <div className="bg-soft-500 w-full rounded-[14px] p-4 pt-2">
                    <Table className="w-full table-auto border-separate border-spacing-y-2">
                      <TableHeader>
                        <TableRow className="border-0">
                          <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                            Time
                          </TableHead>
                          <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                            Play
                          </TableHead>
                          <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                            DEL
                          </TableHead>
                          <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                            CLE
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
                          <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              12:00
                            </h4>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/icons/events/gsw.png"
                                alt="Team 1"
                                width={32}
                                height={32}
                              />
                              <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                                LeBron James makes a layup
                              </h4>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>

                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
                          <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              12:00
                            </h4>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/icons/events/gsw.png"
                                alt="Team 1"
                                width={32}
                                height={32}
                              />
                              <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                                LeBron James makes a layup
                              </h4>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>

                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
                          <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              12:00
                            </h4>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/icons/events/gsw.png"
                                alt="Team 1"
                                width={32}
                                height={32}
                              />
                              <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                                LeBron James makes a layup
                              </h4>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>

                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <h4 className="text-text-primary font-mediumtext-[12px] leading-[100%] font-medium tracking-[-2%]">
                              10
                            </h4>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="bg-soft-500 h-[1px] w-full"></div>
                  <TodayGames />
                  <div className="bg-soft-500 h-[1px] w-full"></div>
                  <div className="bg-soft-500 w-full rounded-[14px] p-4 pt-2">
                    <Tabs
                      value={activePlayerTab}
                      onValueChange={setActivePlayerTab}
                      className="w-full"
                    >
                      <TabsList className="flex h-auto flex-row items-center gap-[8px] bg-transparent p-0">
                        {playerTabs.map((tab) => (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap"
                          >
                            {tab.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
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
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="w-[1%] rounded-tr-[14px] rounded-br-[14px] px-2 py-3">
                            <div className="flex shrink-0 flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
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
                                  src="/icons/athletes/lebron-james.png"
                                  alt="LeBron James"
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <div>
                                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                                  LeBron James
                                </p>
                                <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                  Los Angeles Lakers
                                </p>
                              </div>
                              <div className="bg-league-card text-text-secondary flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                                <Image
                                  src="/icons/game/f.svg"
                                  alt="Flag"
                                  width={8}
                                  height={10}
                                />
                                <span>80%</span>
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
                                $102.3
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div>
                              <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                                $321.6k
                              </p>
                              <p className="text-light-green text-[12px] leading-[100%] font-medium tracking-[-1%]">
                                +3.27%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3">86%</TableCell>
                          <TableCell className="px-4 py-3">#31</TableCell>
                          <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                            <div className="flex flex-row items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25"
                                        stroke="#25AB7A"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Long</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer">
                                    <svg
                                      width="6"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ display: "block" }}
                                    >
                                      <path
                                        d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25"
                                        stroke="#E13F5E"
                                        strokeWidth="1.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Short</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              {activeTab === "orders" && (
                <div className="flex w-full flex-col items-center justify-center">
                  <h1>Orders</h1>
                </div>
              )}
              {activeTab === "chart" && (
                <div className="flex w-full flex-col items-center justify-center">
                  <h1>Chart</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
