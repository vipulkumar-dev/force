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
      <div className="flex flex-col items-center justify-center min-h-screen bg-page-background pt-[117px] px-4">
        <h1 className="text-4xl font-bold text-main mb-4">404</h1>
        <p className="text-soft-400 mb-8">Team not found</p>
        <Link href="/">
          <button className="px-4 py-2 bg-main text-white rounded-lg">
            Go Home
          </button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number
  ) => {
    console.log("Order placed:", { type, orderSize, leverage });
    alert(
      `${type.toUpperCase()} order confirmed!\nOrder Size: $${orderSize.toFixed(
        2
      )}\nLeverage: ${leverage}x\nEntry Price: $${teamStats.currentPrice.toFixed(
        2
      )}`
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
        <div className="w-full bg-page-background pt-[117px] min-h-screen">
          {/* Main Content */}
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6  py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left: Team Card */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                {/* Hero Section */}
                <div className="w-full flex flex-col lg:flex-row gap-4">
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
                  <div className="w-full lg:w-[360px] flex flex-col min-h-0  overflow-y-hidden hover:overflow-y-auto h-full">
                    <TradingPanel
                      athleteName={team.name}
                      currentPrice={teamStats.currentPrice}
                      onPlaceOrder={handlePlaceOrder}
                    />
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="w-full flex justify-center">
                  <div className="max-w-[1276px] w-full">
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
                <div className="w-full flex justify-center">
                  <div className="max-w-[1276px] w-full">
                    <PriceChart />
                  </div>
                </div>

                {/* Player Table */}
                <div className="bg-white rounded-[20px] overflow-hidden">
                  {/* Table Header */}
                  <div className="flex justify-between items-center p-4 border-b border-[#F7F7F7]">
                    <div className="flex items-center gap-1.5">
                      {["All Players", "Guards", "Forwards", "Centers"].map(
                        (filter) => (
                          <button
                            key={filter}
                            onClick={() =>
                              setPlayerFilter(
                                filter.toLowerCase().replace(" ", "")
                              )
                            }
                            className={`px-2 py-2 rounded-lg text-[12px] font-medium ${
                              playerFilter ===
                              filter.toLowerCase().replace(" ", "")
                                ? "bg-page-background text-main"
                                : "text-soft-400"
                            }`}
                          >
                            {filter}
                          </button>
                        )
                      )}
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-1 px-3 h-8 rounded-full bg-[#F7F7F7]">
                        <Search className="w-[15px] h-[15px] text-soft-400" />
                        <input
                          type="text"
                          placeholder="Search player"
                          className="bg-transparent text-[12px] font-medium text-soft-400 outline-none w-[150px]"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7]">
                          <Filter className="w-4 h-4 text-soft-400" />
                        </button>
                        <div className="flex items-center h-8 rounded-lg border border-[#EAEBEC]">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`w-6 h-6 flex items-center justify-center rounded ${
                              viewMode === "grid" ? "" : ""
                            }`}
                          >
                            <LayoutGrid className="w-[15px] h-[15px] text-[#AAAABD]" />
                          </button>
                          <button
                            onClick={() => setViewMode("list")}
                            className={`w-6 h-6 flex items-center justify-center rounded ${
                              viewMode === "list" ? "bg-[#F7F7F7]" : ""
                            }`}
                          >
                            <LayoutList className="w-[15px] h-[15px] text-main" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-1">
                    <div className="bg-[#F7F7F7] rounded-[14px] p-1 flex flex-col gap-1">
                      {/* Table Header Row */}
                      <div className="flex items-center gap-5 px-3 py-2.5">
                        <div className="w-[320px]">
                          <span className="text-[11px] font-medium text-soft-400">
                            Player
                          </span>
                        </div>
                        <div className="w-[160px]">
                          <span className="text-[11px] font-medium text-soft-400">
                            Chart
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-[11px] font-medium text-soft-400">
                            Price
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-[11px] font-medium text-soft-400">
                            Volume
                          </span>
                        </div>
                        <div className="w-[140px]">
                          <span className="text-[11px] font-medium text-soft-400">
                            Performance
                          </span>
                        </div>
                        <div className="w-[68px]">
                          <span className="text-[11px] font-medium text-soft-400">
                            Actions
                          </span>
                        </div>
                      </div>

                      {/* Player Rows */}
                      {players.slice(0, 6).map((player) => (
                        <Link key={player.id} href={`/athlete/${player.id}`}>
                          <div className="bg-white rounded-[14px] flex items-center gap-5 p-3 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="w-[320px] flex items-center gap-3 pr-10">
                              <div className="flex items-center gap-2 flex-1">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                  <Image
                                    src={player.imageUrl}
                                    alt={player.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-[13px] font-semibold text-main">
                                  {player.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#F7F7F7]">
                                <span className="text-[12px] font-medium text-soft-400">
                                  F
                                </span>
                                <span className="text-[12px] font-medium text-soft-400">
                                  80%
                                </span>
                              </div>
                            </div>
                            <div className="w-[160px] flex items-center gap-1.5">
                              <Image
                                src={player.teamImageUrl}
                                alt={player.teamAbbreviation}
                                width={24}
                                height={24}
                              />
                              <span className="text-[12px] font-medium text-main">
                                {player.teamAbbreviation}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-[12px] font-medium text-main">
                                $2,315
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-[12px] font-medium text-[#25AB7A]">
                                +$2,314
                              </span>
                            </div>
                            <div className="w-[140px]">
                              <div className="w-[104px] h-[21px] bg-gray-100 rounded" />
                            </div>
                            <div className="w-[68px] flex items-center gap-1">
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7] hover:bg-[#EAEBEC] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <ArrowUpRight className="w-[15px] h-[15px] text-[#25AB7A]" />
                              </button>
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7] hover:bg-[#EAEBEC] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <ArrowDownRight className="w-[15px] h-[15px] text-[#E13F5E]" />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-1 text-[12px] font-medium">
                      <span className="text-soft-400">Showing</span>
                      <span className="text-main">1-10</span>
                      <span className="text-soft-400">of</span>
                      <span className="text-main">32</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="w-3 h-3 flex items-center justify-center">
                        <ChevronLeft className="w-3 h-3 text-[#AAAABD]" />
                      </button>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, "...", 4].map((page, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              typeof page === "number" && setCurrentPage(page)
                            }
                            className={`w-7 px-2 py-2 rounded-lg text-[12px] font-medium ${
                              currentPage === page
                                ? "bg-[#F7F7F7] text-main"
                                : "text-soft-400"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button className="w-3 h-3 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-[#AAAABD]" />
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
