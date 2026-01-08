"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
}

function StatCard({ label, value, change, changeLabel }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-page-background flex h-[90px] min-w-[150px] flex-1 flex-col justify-between rounded-[10px] p-[14px] md:h-[100px] md:min-w-0 md:p-[16px]">
      {/* Label */}
      <div className="flex flex-col justify-center">
        <p className="text-soft-400 text-[11px] leading-none font-medium tracking-[-0.12px] md:text-[12px]">
          {label}
        </p>
      </div>

      {/* Value and Change */}
      <div className="justify-top flex w-full items-baseline gap-[8px]">
        <p className="font-nohemi text-text-primary truncate text-[16px] leading-none font-medium tracking-[-0.2px] md:text-[20px]">
          {value}
        </p>
        <div className="text-dark-green flex shrink-0 items-center gap-[1px]">
          {isPositive ? (
            <ArrowUp className="text-green-dark h-[12px] w-[12px] md:h-[14px] md:w-[14px]" />
          ) : (
            <ArrowDown className="text-base-red h-[12px] w-[12px] md:h-[14px] md:w-[14px]" />
          )}
          <p
            className={`text-[12px] leading-none font-medium tracking-[-0.14px] md:text-[14px] ${
              isPositive ? "text-green-dark" : "text-base-red"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </p>
        </div>
      </div>
    </div>
  );
}

interface PortfolioStatsCardsProps {
  totalBalance: number;
  totalBalanceChange: number;
  realizedPnL: number;
  realizedPnLChange: number;
  unrealizedPnL: number;
  unrealizedPnLChange: number;
  totalMarginUsed: number;
  totalMarginUsedChange: number;
  openTrades: number;
  openTradesChange: number;
  isPositive: boolean;
}

export default function PortfolioStatsCards({
  totalBalance,
  totalBalanceChange,
  realizedPnL,
  realizedPnLChange,
  unrealizedPnL,
  unrealizedPnLChange,
  totalMarginUsed,
  totalMarginUsedChange,
  openTrades,
  openTradesChange,
  isPositive,
}: PortfolioStatsCardsProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPnL = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${formatCurrency(value)}`;
  };

  return (
    <div className="flex w-full flex-col items-start gap-[12px] rounded-[20px] bg-white p-[20px] md:gap-[24px] md:p-[24px]">
      <h5 className="text-soft-400 text-[12px] font-medium md:text-[14px]">
        Total Balance:
      </h5>
      <div className="flex flex-row items-center gap-1">
        <h1 className="text-text-primary text-[40px] font-medium md:text-[48px]">
          {formatCurrency(totalBalance)}
        </h1>
        <div className="text-dark-green flex shrink-0 items-center gap-[1px]">
          {isPositive ? (
            <ArrowUp className="text-green-dark h-[12px] w-[12px] md:h-[14px] md:w-[14px]" />
          ) : (
            <ArrowDown className="text-base-red h-[12px] w-[12px] md:h-[14px] md:w-[14px]" />
          )}
          <p
            className={`text-[12px] leading-none font-medium tracking-[-0.14px] md:text-[14px] ${
              isPositive ? "text-green-dark" : "text-base-red"
            }`}
          >
            {isPositive ? "+" : ""}
            {totalBalanceChange}%
          </p>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-[12px] md:gap-[24px]">
        <StatCard
          label="Realized PnL (7D)"
          value={formatCurrency(realizedPnL)}
          change={realizedPnLChange}
        />
        <StatCard
          label="Unrealized PnL"
          value={formatPnL(unrealizedPnL)}
          change={unrealizedPnLChange}
        />
        <StatCard
          label="Total Margin Used"
          value={formatCurrency(totalMarginUsed)}
          change={totalMarginUsedChange}
        />
        <StatCard
          label="Open Trades"
          value={openTrades.toString()}
          change={openTradesChange}
        />
      </div>
    </div>
  );
}
