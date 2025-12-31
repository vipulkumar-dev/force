import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function QuickLeaderboard() {
  // Leaderboard entries (mirrors your current static rows)
  const entries = [
    {
      rank: 1,
      initials: "SP",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "ShadowProfit",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "88%",
    },
    {
      rank: 2,
      initials: "NB",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "NovaBear",
      pnl24h: "-$5,290",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "55%",
    },
    {
      rank: 3,
      initials: "M",
      badgeBg: "bg-light-purple",
      badgeText: "text-dark-purple",
      name: "MarfaX",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "2",
      winRate: "90%",
    },
    {
      rank: 4,
      initials: "ZZ",
      badgeBg: "bg-lighter-green",
      badgeText: "text-darker-green",
      name: "ZenithZone",
      pnl24h: "+$5,290",
      totalPnl: "+$32,740",
      openPositions: "7",
      winRate: "67%",
    },
    {
      rank: 5,
      initials: "CP",
      badgeBg: "bg-lighter-yellow",
      badgeText: "text-darker-yellow",
      name: "CoinPilot",
      pnl24h: "-$3,688",
      totalPnl: "-$32,740",
      openPositions: "4",
      winRate: "88%",
    },
  ];

  const changeColor = (v: string) =>
    v.startsWith("-") ? "text-base-red" : "text-dark-green";

  return (
    <div className="flex flex-col w-full rounded-[10px] bg-white">
      <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Quick Leaderboard
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex flex-col p-[4px] w-full">
        {/* Header row */}
        <div className="hidden md:flex flex-row w-full">
          <div className="w-[6%] flex flex-col py-[12px] px-[16px] gap-[24px]"></div>
          <div className="w-[28%] flex flex-col py-[12px] px-[16px] gap-[24px]">
            <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Trader
            </p>
          </div>
          <div className="w-[16%] flex flex-col py-[12px] px-[16px] gap-[24px]">
            <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              24h PnL
            </p>
          </div>
          <div className="w-[16%] flex flex-col py-[12px] px-[16px] gap-[24px]">
            <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Total PnL
            </p>
          </div>
          <div className="w-[18%] flex flex-col py-[12px] px-[16px] gap-[24px]">
            <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Open Positions
            </p>
          </div>
          <div className="w-[16%] flex flex-col py-[12px] px-[16px] gap-[24px]">
            <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Win Rate
            </p>
          </div>
        </div>

        {/* Mapped rows with smooth hover */}
        {entries.map((e) => (
          <div
            key={e.rank}
            className="flex flex-col md:flex-row w-full gap-[8px] md:gap-0 border-t border-transparent hover:border-main hover:bg-primary-foreground transition-colors duration-200 ease-out"
          >
            {/* Mobile compact header + grid */}
            <div className="md:hidden flex flex-col w-full px-[12px] py-[10px] gap-2 border-b border-light-gray">
              <div className="flex items-center gap-3">
                <div className="flex flex-row max-w-[32px] border border-disabled-100 bg-white py-[6px] px-[8px] gap-[4px] rounded-[100px]">
                  <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
                    #{e.rank}
                  </p>
                </div>
                <div
                  className={`flex flex-row items-center justify-center w-[26px] h-[26px] rounded-[100px] gap-[10px] ${e.badgeBg}`}
                >
                  <p
                    className={`font-semibold text-[12px] leading-[100%] tracking-[-1%] text-center ${e.badgeText}`}
                  >
                    {e.initials}
                  </p>
                </div>
                <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                  {e.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-[11px] font-medium tracking-[-1%] text-soft-400">
                    24h PnL
                  </p>
                  <p
                    className={`text-[12px] font-medium tracking-[-1%] ${changeColor(
                      e.pnl24h
                    )}`}
                  >
                    {e.pnl24h}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[-1%] text-soft-400">
                    Total PnL
                  </p>
                  <p
                    className={`text-[12px] font-medium tracking-[-1%] ${changeColor(
                      e.totalPnl
                    )}`}
                  >
                    {e.totalPnl}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[-1%] text-soft-400">
                    Open Positions
                  </p>
                  <p className="text-[12px] font-medium tracking-[-1%] text-main">
                    {e.openPositions}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[-1%] text-soft-400">
                    Win Rate
                  </p>
                  <p className="text-[12px] font-medium tracking-[-1%] text-main">
                    {e.winRate}
                  </p>
                </div>
              </div>
            </div>
            {/* Rank */}
            <div className="hidden md:flex w-[6%] flex-row py-[12px] pl-[16px] gap-[24px]">
              <div className="flex flex-row max-w-[32px] border border-disabled-100 bg-white py-[6px] px-[8px] gap-[4px] rounded-[100px]">
                <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
                  #{e.rank}
                </p>
              </div>
            </div>

            {/* Trader */}
            <div className="hidden md:flex flex-row items-center w-[28%] py-[12px] px-[16px] gap-[12px]">
              <div
                className={`flex flex-row items-center justify-center w-[26px] h-[26px] rounded-[100px] gap-[10px] ${e.badgeBg}`}
              >
                <p
                  className={`font-semibold text-[12px] leading-[100%] tracking-[-1%] text-center ${e.badgeText}`}
                >
                  {e.initials}
                </p>
              </div>
              <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                {e.name}
              </p>
            </div>

            {/* 24h PnL */}
            <div className="hidden md:flex w-[16%] flex-col py-[12px] px-[16px] gap-[24px] justify-center">
              <p
                className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${changeColor(
                  e.pnl24h
                )}`}
              >
                {e.pnl24h}
              </p>
            </div>

            {/* Total PnL */}
            <div className="hidden md:flex w-[16%] flex-col py-[12px] px-[16px] gap-[24px] justify-center">
              <p
                className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${changeColor(
                  e.totalPnl
                )}`}
              >
                {e.totalPnl}
              </p>
            </div>

            {/* Open Positions */}
            <div className="hidden md:flex w-[18%] flex flex-col py-[12px] px-[16px] gap-[24px] justify-center">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
                {e.openPositions}
              </p>
            </div>

            {/* Win Rate */}
            <div className="hidden md:flex w-[16%] flex flex-col py-[12px] px-[16px] gap-[24px] justify-center">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
                {e.winRate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
