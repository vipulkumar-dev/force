import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface TeamPerformance {
  rank: number;
  name: string;
  logo: string;
  league: string;
  tradingVolume: string;
  totalTrades: number;
  avgTradeSize: string;
  topTraders: number;
  change24h: string;
  isPositive: boolean;
}

interface AthletePerformance {
  rank: number;
  name: string;
  image: string;
  team: string;
  tradingVolume: string;
  totalTrades: number;
  avgTradeSize: string;
  priceChange: string;
  isPositive: boolean;
  backgroundColor: string;
}

const teamsData: TeamPerformance[] = [
  {
    rank: 1,
    name: "Los Angeles Lakers",
    logo: "/icons/events/lal.png",
    league: "NBA",
    tradingVolume: "$2.4M",
    totalTrades: 8420,
    avgTradeSize: "$285",
    topTraders: 142,
    change24h: "+12.4%",
    isPositive: true,
  },
  {
    rank: 2,
    name: "Golden State Warriors",
    logo: "/icons/events/gsw.png",
    league: "NBA",
    tradingVolume: "$2.1M",
    totalTrades: 7320,
    avgTradeSize: "$287",
    topTraders: 128,
    change24h: "+8.7%",
    isPositive: true,
  },
  {
    rank: 3,
    name: "Boston Celtics",
    logo: "/icons/events/sam-merrill.png",
    league: "NBA",
    tradingVolume: "$1.9M",
    totalTrades: 6820,
    avgTradeSize: "$289",
    topTraders: 115,
    change24h: "+7.2%",
    isPositive: true,
  },
];

const athletesData: AthletePerformance[] = [
  {
    rank: 1,
    name: "LeBron James",
    image: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    tradingVolume: "$845K",
    totalTrades: 2940,
    avgTradeSize: "$287",
    priceChange: "+15.2%",
    isPositive: true,
    backgroundColor: "bg-dark-yellow",
  },
  {
    rank: 2,
    name: "Stephen Curry",
    image: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    tradingVolume: "$782K",
    totalTrades: 2730,
    avgTradeSize: "$286",
    priceChange: "+11.8%",
    isPositive: true,
    backgroundColor: "bg-dark-blue",
  },
  {
    rank: 3,
    name: "Anthony Davis",
    image: "/icons/athletes/anthony-davis.png",
    team: "Los Angeles Lakers",
    tradingVolume: "$487K",
    totalTrades: 1690,
    avgTradeSize: "$288",
    priceChange: "+6.7%",
    isPositive: true,
    backgroundColor: "bg-forest-green",
  },
  {
    rank: 4,
    name: "Luka Dončić",
    image: "/icons/athletes/luka-doncic.png",
    team: "Dallas Mavericks",
    tradingVolume: "$456K",
    totalTrades: 1580,
    avgTradeSize: "$289",
    priceChange: "-2.3%",
    isPositive: false,
    backgroundColor: "bg-dark-blue",
  },
];

export default function PerformanceBreakdownPage({
  onBack,
}: {
  onBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"teams" | "athletes">("teams");

  return (
    <div className="flex flex-col w-[1020px] pb-6 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col w-full pt-6 gap-5">
        {/* Header */}
        <div className="w-full flex flex-row gap-4 items-center">
          <Button
            lip="on"
            className="flex flex-row w-8 h-8 rounded-[7px] items-center justify-center border border-main/7 bg-white gap-2 px-0 hover:bg-primary-foreground hover:cursor-pointer"
            onClick={onBack}
          >
            <Image
              src="/icons/arrow-left.svg"
              width={14}
              height={14}
              alt="Arrow Left"
            />
          </Button>

          <p className="font-medium font-nohemi text-[20px] leading-[100%] tracking-[2%] text-main">
            Performance Breakdown
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => setActiveTab("teams")}
            className={`flex flex-row rounded-[100px] h-fit items-center justify-center py-2 px-4 gap-1 border transition-colors duration-200 ease-out hover:cursor-pointer ${
              activeTab === "teams"
                ? "bg-main border-black/5"
                : "bg-white border-main/7 hover:bg-primary-foreground"
            }`}
          >
            <p
              className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
                activeTab === "teams" ? "text-white" : "text-sub-500"
              }`}
            >
              Top Teams
            </p>
          </Button>
          <Button
            onClick={() => setActiveTab("athletes")}
            className={`flex flex-row rounded-[100px] h-fit items-center justify-center py-2 px-4 gap-1 border transition-colors duration-200 ease-out hover:cursor-pointer ${
              activeTab === "athletes"
                ? "bg-main border-black/5"
                : "bg-white border-main/7 hover:bg-primary-foreground"
            }`}
          >
            <p
              className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
                activeTab === "athletes" ? "text-white" : "text-sub-500"
              }`}
            >
              Top Athletes
            </p>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full mt-6">
        {activeTab === "teams" ? (
          <div className="flex flex-col w-full bg-white rounded-[10px]">
            {/* Table Header */}
            <div className="flex flex-row w-full py-3 px-5 gap-4 border-b border-light-gray">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[8%]">
                Rank
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[25%]">
                Team
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[12%]">
                24H Volume
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[12%]">
                Total Trades
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13%]">
                Avg Trade Size
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[12%]">
                Top Traders
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[12%] text-right">
                24H Change
              </p>
            </div>

            {/* Table Rows */}
            {teamsData.map((team) => (
              <div
                key={team.rank}
                className="flex flex-row w-full py-4 px-5 gap-4 border-b border-light-gray last:border-b-0 hover:bg-primary-foreground transition-colors duration-200"
              >
                <div className="w-[8%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    #{team.rank}
                  </p>
                </div>
                <div className="w-[25%] flex flex-row items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center overflow-hidden">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                      {team.name}
                    </p>
                    <p className="font-medium text-[11px] leading-[100%] tracking-[-1%] text-soft-400">
                      {team.league}
                    </p>
                  </div>
                </div>
                <div className="w-[12%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {team.tradingVolume}
                  </p>
                </div>
                <div className="w-[12%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {team.totalTrades.toLocaleString()}
                  </p>
                </div>
                <div className="w-[13%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {team.avgTradeSize}
                  </p>
                </div>
                <div className="w-[12%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {team.topTraders}
                  </p>
                </div>
                <div className="w-[12%] flex items-center justify-end">
                  <p
                    className={`font-medium text-[13px] leading-[100%] tracking-[-1%] ${
                      team.isPositive ? "text-success-500" : "text-error-500"
                    }`}
                  >
                    {team.change24h}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full bg-white rounded-[10px]">
            {/* Table Header */}
            <div className="flex flex-row w-full py-3 px-5 gap-4 border-b border-light-gray">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[8%]">
                Rank
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[27%]">
                Athlete
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13%]">
                24H Volume
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13%]">
                Total Trades
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13%]">
                Avg Trade Size
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13%] text-right">
                Price Change
              </p>
            </div>

            {/* Table Rows */}
            {athletesData.map((athlete) => (
              <div
                key={athlete.rank}
                className="flex flex-row w-full py-4 px-5 gap-4 border-b border-light-gray last:border-b-0 hover:bg-primary-foreground transition-colors duration-200"
              >
                <div className="w-[8%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    #{athlete.rank}
                  </p>
                </div>
                <div className="w-[27%] flex flex-row items-center gap-2.5">
                  <div
                    className={`relative w-10 h-10 rounded-md ${athlete.backgroundColor} overflow-hidden`}
                  >
                    <Image
                      src="/icons/athletes/logo.png"
                      alt="Logo"
                      fill
                      className="object-cover object-top opacity-8 mix-blend-screen"
                    />
                    <Image
                      src={athlete.image}
                      alt={athlete.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                      {athlete.name}
                    </p>
                    <p className="font-medium text-[11px] leading-[100%] tracking-[-1%] text-soft-400">
                      {athlete.team}
                    </p>
                  </div>
                </div>
                <div className="w-[13%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {athlete.tradingVolume}
                  </p>
                </div>
                <div className="w-[13%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {athlete.totalTrades.toLocaleString()}
                  </p>
                </div>
                <div className="w-[13%] flex items-center">
                  <p className="font-medium text-[13px] leading-[100%] tracking-[-1%] text-main">
                    {athlete.avgTradeSize}
                  </p>
                </div>
                <div className="w-[13%] flex items-center justify-end">
                  <p
                    className={`font-medium text-[13px] leading-[100%] tracking-[-1%] ${
                      athlete.isPositive ? "text-success-500" : "text-error-500"
                    }`}
                  >
                    {athlete.priceChange}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
