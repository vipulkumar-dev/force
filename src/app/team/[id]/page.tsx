"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getTeamById, getPlayersByTeamId } from "@/lib/data/teams-and-players";
import {
  Search,
  Filter,
  LayoutGrid,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AthleteStatsCards from "@/components/athlete-page/athlete-stats-cards";
import PriceChart from "@/components/athlete-page/price-chart";
import TradingPanel from "@/components/athlete-page/trading-panel";
import TeamBanner from "@/components/team-page/team-banner";

export default function TeamPage() {
  const params = useParams();
  const teamId = params.id as string;

  const team = getTeamById(teamId);
  const players = getPlayersByTeamId(teamId);

  const [playerFilter, setPlayerFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for team stats - in production, this would come from an API
  const teamStats = {
    indexPrice: 12.45,
    indexPriceChange: 3.0,
    leagueRank: 27,
    leagueRankChange: 3.0,
    performance: 80.6,
    performanceChange: 31,
    marketIndex: 1.8,
    marketIndexChange: 31,
    currentPrice: 12.45,
  };

  if (!team) {
    return (
      <div className="bg-page-background flex min-h-screen flex-col items-center justify-center px-4 pt-[117px]">
        <h1 className="text-text-primary mb-4 text-4xl font-bold">404</h1>
        <p className="text-soft-400 mb-8">Team not found</p>
        <Link href="/">
          <button className="bg-main rounded-lg px-4 py-2 text-white">
            Go Home
          </button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => {
    console.log("Order placed:", { type, orderSize, leverage });
    alert(
      `${type.toUpperCase()} order confirmed!\nOrder Size: $${orderSize.toFixed(
        2,
      )}\nLeverage: ${leverage}x\nEntry Price: $${teamStats.currentPrice.toFixed(
        2,
      )}`,
    );
  };

  const handleFollow = () => {
    console.log("Follow team:", team.name);
    alert(`You are now following ${team.name}!`);
  };

  const handleNotify = () => {
    console.log("Notify me about:", team.name);
    alert(`You will be notified about ${team.name}'s updates!`);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="team"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-page-background min-h-screen w-full pt-[117px]">
          {/* Main Content */}
          <div className="mx-auto w-full max-w-[1400px] px-4 py-4 md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Left: Team Card */}
              <div className="flex w-full flex-1 flex-col gap-4">
                {/* Hero Section */}
                <div className="flex w-full flex-col gap-4 lg:flex-row">
                  <TeamBanner
                    name={team.name}
                    league={team.league}
                    abbreviation={team.abbreviation}
                    logoUrl={team.logoUrl}
                    bgColor={team.bgColor}
                    isLive={true}
                    indexPrice={teamStats.indexPrice}
                    percentile={91}
                    performance={teamStats.performance}
                    marketIndex={teamStats.marketIndex}
                    onFollow={handleFollow}
                    onNotify={handleNotify}
                  />
                  <div className="flex h-full min-h-0 w-full flex-col overflow-y-hidden hover:overflow-y-auto lg:w-[360px]">
                    <TradingPanel
                      athleteName={team.name}
                      currentPrice={teamStats.currentPrice}
                      onPlaceOrder={handlePlaceOrder}
                    />
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="flex w-full justify-center">
                  <div className="w-full">
                    <AthleteStatsCards
                      indexPrice={teamStats.indexPrice}
                      indexPriceChange={teamStats.indexPriceChange}
                      leagueRank={teamStats.leagueRank}
                      leagueRankChange={teamStats.leagueRankChange}
                      performance={teamStats.performance}
                      performanceChange={teamStats.performanceChange}
                      marketIndex={teamStats.marketIndex}
                      marketIndexChange={teamStats.marketIndexChange}
                    />
                  </div>
                </div>

                {/* Chart Section */}
                <div className="flex w-full justify-center">
                  <div className="w-full">
                    <PriceChart />
                  </div>
                </div>

                {/* Player Table */}
                <div className="overflow-hidden rounded-[20px] bg-white">
                  {/* Table Header */}
                  <div className="flex items-center justify-between border-b border-[#F7F7F7] p-4">
                    <div className="flex items-center gap-1.5">
                      {["All Players", "Guards", "Forwards", "Centers"].map(
                        (filter) => (
                          <button
                            key={filter}
                            onClick={() =>
                              setPlayerFilter(
                                filter.toLowerCase().replace(" ", ""),
                              )
                            }
                            className={`rounded-lg px-2 py-2 text-[12px] font-medium ${
                              playerFilter ===
                              filter.toLowerCase().replace(" ", "")
                                ? "bg-page-background text-text-primary"
                                : "text-soft-400"
                            }`}
                          >
                            {filter}
                          </button>
                        ),
                      )}
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="flex h-8 items-center gap-1 rounded-full bg-[#F7F7F7] px-3">
                        <Search className="text-soft-400 h-[15px] w-[15px]" />
                        <input
                          type="text"
                          placeholder="Search player"
                          className="text-soft-400 w-[150px] bg-transparent text-[12px] font-medium outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7]">
                          <Filter className="text-soft-400 h-4 w-4" />
                        </button>
                        <div className="flex h-8 items-center rounded-lg border border-[#EAEBEC]">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`flex h-6 w-6 items-center justify-center rounded ${
                              viewMode === "grid" ? "" : ""
                            }`}
                          >
                            <LayoutGrid className="h-[15px] w-[15px] text-[#AAAABD]" />
                          </button>
                          <button
                            onClick={() => setViewMode("list")}
                            className={`flex h-6 w-6 items-center justify-center rounded ${
                              viewMode === "list" ? "bg-[#F7F7F7]" : ""
                            }`}
                          >
                            <LayoutList className="text-text-primary h-[15px] w-[15px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-1">
                    <div className="flex flex-col gap-1 rounded-[14px] bg-[#F7F7F7] p-1">
                      {/* Table Header Row */}
                      <div className="flex items-center gap-5 px-3 py-2.5">
                        <div className="w-[320px]">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Player
                          </span>
                        </div>
                        <div className="w-[160px]">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Chart
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Price
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Volume
                          </span>
                        </div>
                        <div className="w-[140px]">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Performance
                          </span>
                        </div>
                        <div className="w-[68px]">
                          <span className="text-soft-400 text-[11px] font-medium">
                            Actions
                          </span>
                        </div>
                      </div>

                      {/* Player Rows */}
                      {players.slice(0, 6).map((player) => (
                        <Link key={player.id} href={`/athlete/${player.id}`}>
                          <div className="flex cursor-pointer items-center gap-5 rounded-[14px] bg-white p-3 transition-shadow hover:shadow-md">
                            <div className="flex w-[320px] items-center gap-3 pr-10">
                              <div className="flex flex-1 items-center gap-2">
                                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                                  <Image
                                    src={player.imageUrl}
                                    alt={player.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-text-primary text-[13px] font-semibold">
                                  {player.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 rounded-full bg-[#F7F7F7] px-2 py-1">
                                <span className="text-soft-400 text-[12px] font-medium">
                                  F
                                </span>
                                <span className="text-soft-400 text-[12px] font-medium">
                                  80%
                                </span>
                              </div>
                            </div>
                            <div className="flex w-[160px] items-center gap-1.5">
                              <Image
                                src={player.teamImageUrl}
                                alt={player.teamAbbreviation}
                                width={24}
                                height={24}
                              />
                              <span className="text-text-primary text-[12px] font-medium">
                                {player.teamAbbreviation}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-text-primary text-[12px] font-medium">
                                $2,315
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-[12px] font-medium text-[#25AB7A]">
                                +$2,314
                              </span>
                            </div>
                            <div className="w-[140px]">
                              <div className="h-[21px] w-[104px] rounded bg-gray-100" />
                            </div>
                            <div className="flex w-[68px] items-center gap-1">
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7] transition-colors hover:bg-[#EAEBEC]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <ArrowUpRight className="h-[15px] w-[15px] text-[#25AB7A]" />
                              </button>
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7] transition-colors hover:bg-[#EAEBEC]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <ArrowDownRight className="h-[15px] w-[15px] text-[#E13F5E]" />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-1 text-[12px] font-medium">
                      <span className="text-soft-400">Showing</span>
                      <span className="text-text-primary">1-10</span>
                      <span className="text-soft-400">of</span>
                      <span className="text-text-primary">32</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="flex h-3 w-3 items-center justify-center">
                        <ChevronLeft className="h-3 w-3 text-[#AAAABD]" />
                      </button>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, "...", 4].map((page, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              typeof page === "number" && setCurrentPage(page)
                            }
                            className={`w-7 rounded-lg px-2 py-2 text-[12px] font-medium ${
                              currentPage === page
                                ? "text-text-primary bg-[#F7F7F7]"
                                : "text-soft-400"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button className="flex h-3 w-3 items-center justify-center">
                        <ChevronRight className="h-3 w-3 text-[#AAAABD]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
