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
    <div className="flex w-full flex-col items-start justify-between gap-[16px] md:flex-row md:items-center md:gap-0">
      {/* Title */}
      <h1 className="font-nohemi text-text-primary text-[22px] leading-none font-medium tracking-[0.52px] md:text-[26px]">
        Portfolio
      </h1>

      {/* Action Buttons */}
      <div className="flex w-full items-center gap-[8px] md:w-auto md:gap-[10px]">
        {/* Export Trades Button */}
        <Button
          onClick={onExportTrades}
          className="border-main/7 hover:bg-primary-foreground flex h-[40px] flex-1 items-center gap-[6px] rounded-[8px] border bg-white px-[12px] py-[10px] transition-colors md:flex-initial md:gap-[8px] md:px-[16px]"
        >
          <Image
            src="/icons/file-export.svg"
            alt="Export Trades"
            width={16}
            height={16}
            className="shrink-0"
          />
          <span className="text-text-primary text-[12px] leading-[1.4] font-medium tracking-[-0.14px] whitespace-nowrap md:text-[14px]">
            <span className="hidden md:inline">Export Trades (CSV)</span>
            <span className="md:hidden">Export</span>
          </span>
        </Button>

        {/* Deposit / Withdraw Button */}
        <Button
          onClick={onDepositWithdraw}
          className="bg-main border-main hover:bg-main/90 flex h-[40px] flex-1 items-center gap-[6px] rounded-[8px] border px-[12px] py-[10px] shadow-[0px_-1px_14px_-1px_inset_rgba(255,255,255,0.25)] transition-colors md:flex-initial md:gap-[8px] md:px-[16px]"
        >
          <Plus className="h-[16px] w-[16px] shrink-0 text-white" />
          <span className="text-[12px] leading-[1.4] font-medium tracking-[-0.14px] whitespace-nowrap text-white md:text-[14px]">
            <span className="hidden md:inline">Deposit / Withdraw</span>
            <span className="md:hidden">Deposit</span>
          </span>
        </Button>
      </div>
    </div>
  );
}
