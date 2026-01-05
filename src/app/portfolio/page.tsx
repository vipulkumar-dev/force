"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PortfolioHeader from "@/components/portfolio-page/portfolio-header";
import PortfolioStatsCards from "@/components/portfolio-page/portfolio-stats-cards";
import PnLOverviewChart from "@/components/portfolio-page/pnl-overview-chart";
import OpenPositionsTable from "@/components/portfolio-page/open-positions-table";
import HistoricalTradesTable from "@/components/portfolio-page/historical-trades-table";

// Mock data - In production, this would come from an API
const portfolioData = {
  totalBalance: 4280.5,
  totalBalanceChange: 6.2,
  realizedPnL: 325.4,
  realizedPnLChange: 6.2,
  unrealizedPnL: 152.1,
  unrealizedPnLChange: 6.2,
  totalMarginUsed: 1280.0,
  totalMarginUsedChange: 6.2,
  openTrades: 6,
  openTradesChange: 6.2,
};

export default function PortfolioPage() {
  const handleExportTrades = () => {
    console.log("Export trades to CSV");
    // TODO: Implement CSV export
    alert("Exporting trades to CSV...");
  };

  const handleDepositWithdraw = () => {
    console.log("Deposit / Withdraw");
    // TODO: Implement deposit/withdraw modal
    alert("Opening Deposit / Withdraw modal...");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col px-[16px] md:px-[40px] bg-page-background mt-[117px] overflow-hidden">
          {/* Main content container */}
          <div className="flex flex-col w-full max-w-[1360px] mx-auto pt-[20px] md:pt-[40px] pb-[24px] gap-[16px] md:gap-[24px]">
            <PortfolioHeader
              onExportTrades={handleExportTrades}
              onDepositWithdraw={handleDepositWithdraw}
            />

            <PortfolioStatsCards
              totalBalance={portfolioData.totalBalance}
              totalBalanceChange={portfolioData.totalBalanceChange}
              realizedPnL={portfolioData.realizedPnL}
              realizedPnLChange={portfolioData.realizedPnLChange}
              unrealizedPnL={portfolioData.unrealizedPnL}
              unrealizedPnLChange={portfolioData.unrealizedPnLChange}
              totalMarginUsed={portfolioData.totalMarginUsed}
              totalMarginUsedChange={portfolioData.totalMarginUsedChange}
              openTrades={portfolioData.openTrades}
              openTradesChange={portfolioData.openTradesChange}
              isPositive={portfolioData.totalBalanceChange >= 0}
            />

            <PnLOverviewChart />

            <OpenPositionsTable />

            <HistoricalTradesTable />

            {/* More sections will be added here */}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
