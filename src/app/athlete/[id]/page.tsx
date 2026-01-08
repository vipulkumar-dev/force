"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AthleteBanner from "@/components/athlete-page/athlete-banner";
import AthleteStatsCards from "@/components/athlete-page/athlete-stats-cards";
import IndexWeights from "@/components/athlete-page/index-weights";
import ActivePositions from "@/components/athlete-page/active-positions";
import TradingPanel from "@/components/athlete-page/trading-panel";
import PriceChart from "@/components/athlete-page/price-chart";
import { getPlayerById, type Player } from "@/lib/data/teams-and-players";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data generator - In production, this would come from an API
const getAthleteData = (player: Player) => ({
  id: player.id,
  name: player.name,
  team: player.teamName,
  teamId: player.teamId,
  bgColor: player.bgColor || "bg-dark-yellow",
  league: "NBA",
  position: player.position || "Forward",
  imageUrl: player.imageUrl,
  teamImageUrl: player.teamImageUrl,
  price: 44.25, // These would come from API
  priceChange: 1.75,
  priceChangePercent: 4.12,
  isLive: false, // Set to false to show timer
  nextGameTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  eloScore: 102.3,
  percentile: 91,
  // Stats cards data
  indexPrice: 12.45,
  indexPriceChange: 3.0,
  performance: 80.6,
  performanceChange: 31,
  leagueRank: 27,
  leagueRankChange: 3.0,
  marketIndex: 1.8,
  marketIndexChange: 31,
  marketIndexName: "VIBX",
  // Chart data
  chartIndexValue: 31.5,
  chartMarketValue: 32.5,
  chartChange24h: 2.4,
  chartVolume: "12.5K",
  chartOpenInterest: "12.5K",
  chartFunding: -0.03,
  chartEarningToday: 3.27,
  chartRouteName: "Partner",
  volume: 500,
});

export default function AthletePage() {
  const params = useParams();
  const athleteId = params.id as string;

  const player = getPlayerById(athleteId);

  if (!player) {
    return (
      <div className="bg-page-background flex min-h-screen flex-col items-center justify-center px-4 pt-[117px]">
        <h1 className="text-text-primary mb-4 text-4xl font-bold">404</h1>
        <p className="text-soft-400 mb-8">Player not found</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const athleteData = getAthleteData(player);

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => {
    console.log("Order placed:", { type, orderSize, leverage });
    // TODO: Implement actual order execution logic
    alert(
      `${type.toUpperCase()} order confirmed!\nOrder Size: $${orderSize.toFixed(
        2,
      )}\nLeverage: ${leverage}x\nEntry Price: $${athleteData.price.toFixed(2)}`,
    );
  };

  const handleFollow = () => {
    console.log("Follow athlete:", athleteData.name);
    // TODO: Implement follow logic
    alert(`You are now following ${athleteData.name}!`);
  };

  const handleNotify = () => {
    console.log("Notify me about:", athleteData.name);
    // TODO: Implement notification logic
    alert(`You will be notified about ${athleteData.name}'s updates!`);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="athlete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-page-background flex w-full flex-col justify-center px-[16px] pt-[117px] sm:px-[20px] md:px-[40px]">
            <div className="flex w-full flex-col items-stretch justify-center gap-[16px] md:gap-[24px] lg:flex-row lg:gap-[16px]">
              <AthleteBanner
                name={athleteData.name}
                team={athleteData.team}
                teamId={athleteData.teamId}
                marketIndex={athleteData.volume}
                league={athleteData.league}
                imageUrl={athleteData.imageUrl}
                teamImageUrl={athleteData.teamImageUrl}
                price={athleteData.price}
                performance={athleteData.performance}
                bgColor={athleteData.bgColor}
                isLive={athleteData.isLive}
                nextGameTime={athleteData.nextGameTime}
                eloScore={athleteData.eloScore}
                percentile={athleteData.percentile}
                onFollow={handleFollow}
                onNotify={handleNotify}
              />
              <div className="flex h-full min-h-0 w-full flex-col overflow-y-hidden pb-[20px] hover:overflow-y-auto sm:pb-[24px] lg:w-[360px]">
                <TradingPanel
                  athleteName={athleteData.name}
                  currentPrice={athleteData.price}
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
            <div className="mb-[16px] flex w-full justify-center px-[16px] sm:px-[20px] md:px-[24px] lg:px-[40px]">
              <div className="w-full max-w-[1276px]">
                <AthleteStatsCards
                  indexPrice={athleteData.indexPrice}
                  indexPriceChange={athleteData.indexPriceChange}
                  leagueRank={athleteData.leagueRank}
                  leagueRankChange={athleteData.leagueRankChange}
                  performance={athleteData.performance}
                  performanceChange={athleteData.performanceChange}
                  marketIndex={athleteData.marketIndex}
                  marketIndexChange={athleteData.marketIndexChange}
                />
              </div>
            </div>
            <div className="mb-10 flex w-full justify-center px-[16px] sm:px-[20px] md:px-[24px] lg:px-[40px]">
              <div className="flex w-full max-w-[1276px] flex-col gap-[16px] md:gap-[24px]">
                <PriceChart />
                <IndexWeights />
                <ActivePositions />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
