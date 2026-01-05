"use client";

import Image from "next/image";
interface StatCardProps {
  label: string;
  value: string;
  change: number;
}

interface AthleteStatsCardsProps {
  indexPrice: number;
  indexPriceChange: number;
  leagueRank: number;
  leagueRankChange: number;
  performance: number;
  performanceChange: number;
  marketIndex: number;
  marketIndexChange: number;
}

function StatCard({
  label,
  value,
  change,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col bg-white flex-1 rounded-[14px] p-[16px] sm:p-[18px] md:p-[20px] gap-[24px] sm:gap-[32px] md:gap-[46px]">
      <p className="text-[12px] sm:text-[14px] text-soft-400 font-medium">{label}</p>
      <span className="flex flex-row items-center gap-1">
        <h1 className="text-main text-[24px] sm:text-[28px] md:text-[32px] font-medium">{value}</h1>
        {isPositive ? (
          <Image src="/icons/arrow_up.png" alt="arrow-up" width={12} height={16} />
        ) : (
          <Image src="/icons/arrow_down.png" alt="arrow-down" width={12} height={16} />
        )}
        <p className={`text-[12px] sm:text-[14px] font-medium ${isPositive ? "text-light-green" : "text-base-red"}`}>{change}%</p>
      </span>
    </div>
  );
}

export default function AthleteStatsCards({
  indexPrice,
  indexPriceChange,
  leagueRank,
  leagueRankChange,
  performance,
  performanceChange,
  marketIndex,
  marketIndexChange,
}: AthleteStatsCardsProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[12px] sm:gap-[16px] lg:gap-[16px]">
      <div className="w-full lg:w-[900px] flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] md:gap-[24px]">
        <StatCard
          label="League Rank"
          value={`#${leagueRank}`}
          change={leagueRankChange}
        />
        <StatCard
          label="Performance"
          value={`${performance.toFixed(1)}%`}
          change={performanceChange}
        />
      </div>
      <div className="flex flex-col bg-white w-full lg:w-[360px] flex-shrink-0 rounded-[14px] p-[16px] sm:p-[18px] md:p-[20px] gap-[24px] sm:gap-[32px] md:gap-[46px]">
        <p className="text-[12px] sm:text-[14px] text-soft-400 font-medium">Narrative Multiple</p>
        <span className="flex flex-row items-center gap-1">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium">{marketIndex}x</h1>
          {marketIndexChange >= 0 ? (
            <Image src="/icons/arrow_up.png" alt="arrow-up" width={12} height={16} />
          ) : (
            <Image src="/icons/arrow_down.png" alt="arrow-down" width={12} height={16} />
          )}
        </span>
      </div>
    </div>
  );
}
