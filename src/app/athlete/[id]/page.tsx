"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AthleteBanner from "@/components/athlete-page/athlete-banner";
import AthleteStatsCards from "@/components/athlete-page/athlete-stats-cards";
import IndexWeights from "@/components/athlete-page/index-weights";
import ActivePositions, {
  type Position,
} from "@/components/athlete-page/active-positions";
import TradingPanel from "@/components/athlete-page/trading-panel";
import AthletePageTour from "@/components/athlete-page/athlete-page-tour";
import AppFooter from "@/components/app-footer";
import PriceChart from "@/components/athlete-page/price-chart";
// Mock data - In production, this would come from an API based on the athlete ID
const getAthleteData = (id: string) => ({
  id,
  name: "LeBron James",
  team: "Los Angeles Lakers",
  bgColor: "bg-dark-yellow",
  league: "NBA",
  position: "Forward",
  imageUrl: "/icons/athletes/lebron-james.png",
  price: 44.25,
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
});

export default function AthletePage() {
  const params = useParams();
  const athleteId = params.id as string;
  const athleteData = getAthleteData(athleteId);
  const rows = Array(5).fill(null);

  const handlePlaceOrder = (
    type: "long" | "short",
    orderSize: number,
    leverage: number
  ) => {
    console.log("Order placed:", { type, orderSize, leverage });
    // TODO: Implement actual order execution logic
    alert(
      `${type.toUpperCase()} order confirmed!\nOrder Size: $${orderSize.toFixed(
        2
      )}\nLeverage: ${leverage}x\nEntry Price: $${athleteData.price.toFixed(2)}`
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

  const handleClosePosition = (position: Position) => {
    console.log("Close position:", position);
    // TODO: Implement close position logic
    alert(`Closing position for ${position.athleteName}`);
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
          <div className="w-full flex flex-col  px-[16px] sm:px-[20px] md:px-[40px] bg-page-background justify-center pt-[117px]">
            <div className="w-full flex flex-col lg:flex-row gap-[16px] md:gap-[24px] lg:gap-[16px] justify-center items-stretch">
              <AthleteBanner name={athleteData.name} team={athleteData.team} marketIndex={athleteData.marketIndex} league={athleteData.league} imageUrl={athleteData.imageUrl} price={athleteData.price} performance={athleteData.performance} bgColor={athleteData.bgColor} isLive={athleteData.isLive} nextGameTime={athleteData.nextGameTime} eloScore={athleteData.eloScore} percentile={athleteData.percentile} onFollow={handleFollow} onNotify={handleNotify} />
              <div className="w-full lg:w-[360px] flex flex-col min-h-0 pb-[20px] sm:pb-[24px] overflow-y-hidden hover:overflow-y-auto h-full">
                <TradingPanel
                  athleteName={athleteData.name}
                  currentPrice={athleteData.price}
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
            <div className="w-full flex justify-center mb-[16px] px-[16px] sm:px-[20px] md:px-[24px] lg:px-[40px]">
              <div className="max-w-[1276px] w-full">
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
            {/* Tables in Accordion */}
            <div className="w-full flex justify-center mb-10 px-[16px] sm:px-[20px] md:px-[24px] lg:px-[40px]">
              <div className="max-w-[1276px] w-full flex flex-col gap-[16px] md:gap-[24px]">
              <PriceChart />
                <IndexWeights />
                <ActivePositions />
              </div>
            </div>
          </div>

        </motion.div>
        <AppFooter />
      </AnimatePresence>
    </>
  );
}