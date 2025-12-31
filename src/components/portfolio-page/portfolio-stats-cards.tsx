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
    <div className="flex-1 min-w-[150px] md:min-w-0 bg-page-background rounded-[10px] p-[14px] md:p-[16px] h-[90px] md:h-[100px] flex flex-col justify-between">
      {/* Label */}
      <div className="flex flex-col justify-center">
        <p className="font-medium text-[11px] md:text-[12px] leading-none tracking-[-0.12px] text-soft-400">
          {label}
        </p>
      </div>

      {/* Value and Change */}
      <div className="flex items-baseline justify-top w-full gap-[8px]">
        <p className="font-nohemi text-[16px] md:text-[20px] leading-none tracking-[-0.2px] text-main font-medium truncate">
          {value}
        </p>
        <div className="flex gap-[1px] items-center text-dark-green shrink-0">
          {isPositive ? (
            <ArrowUp className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-green-dark" />
          ) : (
            <ArrowDown className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-base-red" />
          )}
          <p
            className={`font-medium text-[12px] md:text-[14px] leading-none tracking-[-0.14px] ${isPositive ? "text-green-dark" : "text-base-red"
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
    <div className="flex flex-col gap-[12px] md:gap-[24px] items-start w-full bg-white rounded-[20px] p-[20px] md:p-[24px]">
      <h5 className="text-[12px] md:text-[14px] font-medium text-soft-400">Total Balance:</h5>
      <div className="flex flex-row items-center gap-1"><h1 className="text-[40px] md:text-[48px] font-medium text-main">{formatCurrency(totalBalance)}</h1> 
      <div className="flex gap-[1px] items-center text-dark-green shrink-0">
          {isPositive ? (
            <ArrowUp className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-green-dark" />
          ) : (
            <ArrowDown className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] text-base-red" />
          )}
          <p
            className={`font-medium text-[12px] md:text-[14px] leading-none tracking-[-0.14px] ${isPositive ? "text-green-dark" : "text-base-red"
              }`}
          >
            {isPositive ? "+" : ""}
            {totalBalanceChange}%
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-[12px] md:gap-[24px] items-center w-full">
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
