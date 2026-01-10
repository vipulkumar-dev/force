"use client";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DiscoverHeader from "@/components/discover-page/discover-header";
import TrendingNowTable from "@/components/discover-page/trending-now-table";
import MostTradedTable from "@/components/discover-page/most-traded-table";
import MissedMomentsTable from "@/components/discover-page/missed-moments-table";
import PriceTrendPage from "@/components/home-page/price-trend-page";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import AthletesCard from "@/components/common/athletes-card";
export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const trendingRows = [
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/stephen-curry.png",
      athleteName: "Stephen Curry",
      athleteTeam: "Golden State Warriors",
      athleteColor: "bg-dark-blue",
      currentPrice: "$102.3",
      change: "-23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
  ];

  const mostTradedRows = [
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/stephen-curry.png",
      athleteName: "Stephen Curry",
      athleteTeam: "Golden State Warriors",
      athleteColor: "bg-dark-blue",
      trades: "-8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      trades: "-8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
  ];

  const events = [
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
  ];

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
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState<string>("long");
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-page-background mt-[117px] flex h-fit w-full flex-col overflow-hidden p-6">
          {/* Main content container */}
          <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 pt-[24px] pb-6">
            <DiscoverHeader viewMode={viewMode} setViewMode={setViewMode} />
            <div className="flex w-full flex-col gap-6">
              {viewMode === "list" ? (
                <div className="bg-primary-foreground w-full overflow-x-auto rounded-[14px]">
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
                          athlete.change >= 0
                            ? "text-light-green"
                            : "text-red-500";
                        const volumeChangeColor =
                          athlete.volumeChange >= 0
                            ? "text-light-green"
                            : "text-red-500";
                        const changeSign = athlete.change >= 0 ? "+" : "";
                        const volumeChangeSign =
                          athlete.volumeChange >= 0 ? "+" : "";

                        return (
                          <TableRow
                            key={athlete.id}
                            className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white"
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
                                    src={
                                      athlete.image ||
                                      "/icons/athletes/logo.png"
                                    }
                                    alt={athlete.name}
                                    fill
                                    className="object-cover object-top"
                                  />
                                </div>
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
                            <TableCell className="px-4 py-3">
                              #{athlete.rank}
                            </TableCell>
                            <TableCell
                              className={`${isLastRow ? "w-[1%] px-2" : "px-4"} rounded-tr-[14px] rounded-br-[14px] py-3`}
                            >
                              <div
                                className={`flex flex-row items-center gap-2 ${isLastRow ? "shrink-0" : ""}`}
                              >
                                <button
                                  onClick={() => {
                                    setOpenTradeDialog(true);
                                    setTradeType("long");
                                  }}
                                  className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer"
                                >
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
                                <button
                                  onClick={() => {
                                    setOpenTradeDialog(true);
                                    setTradeType("short");
                                  }}
                                  className="bg-page-background flex items-center justify-center rounded-lg p-3 hover:cursor-pointer"
                                >
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
                  <div className="flex flex-row gap-1 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {athletesData.map((athlete) => (
                      <div key={athlete.id} className="flex-shrink-0">
                        <AthletesCard
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
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
