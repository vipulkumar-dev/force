"use client";

import { FileDown, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PortfolioHeaderProps {
  onExportTrades?: () => void;
  onDepositWithdraw?: () => void;
}

export default function PortfolioHeader({
  onExportTrades,
  onDepositWithdraw,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-[16px] md:gap-0">
      {/* Title */}
      <h1 className="font-nohemi font-medium text-[22px] md:text-[26px] leading-none tracking-[0.52px] text-main">
        Portfolio
      </h1>

      {/* Action Buttons */}
      <div className="flex gap-[8px] md:gap-[10px] items-center w-full md:w-auto">
        {/* Export Trades Button */}
        <Button
          onClick={onExportTrades}
          className="bg-white border border-main/7 rounded-[8px] h-[40px] px-[12px] md:px-[16px] py-[10px] flex items-center gap-[6px] md:gap-[8px] hover:bg-primary-foreground transition-colors flex-1 md:flex-initial"
        >
          <Image
            src="/icons/file-export.svg"
            alt="Export Trades"
            width={16}
            height={16}
            className="shrink-0"
          />
          <span className="font-medium text-[12px] md:text-[14px] leading-[1.4] tracking-[-0.14px] text-main whitespace-nowrap">
            <span className="hidden md:inline">Export Trades (CSV)</span>
            <span className="md:hidden">Export</span>
          </span>
        </Button>

        {/* Deposit / Withdraw Button */}
        <Button
          onClick={onDepositWithdraw}
          className="bg-main border border-main rounded-[8px] h-[40px] px-[12px] md:px-[16px] py-[10px] flex items-center gap-[6px] md:gap-[8px] hover:bg-main/90 transition-colors shadow-[0px_-1px_14px_-1px_inset_rgba(255,255,255,0.25)] flex-1 md:flex-initial"
        >
          <Plus className="w-[16px] h-[16px] text-white shrink-0" />
          <span className="font-medium text-[12px] md:text-[14px] leading-[1.4] tracking-[-0.14px] text-white whitespace-nowrap">
            <span className="hidden md:inline">Deposit / Withdraw</span>
            <span className="md:hidden">Deposit</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
