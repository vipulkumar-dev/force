"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import LeaderboardHeader from "./leaderboard-header";
import LeaderboardRow from "./leaderboard-row";

type LeaderboardRowT = {
  index: number;
  initials: string;
  initialsColor: string;
  name: string;
  badge: string;
  badgeColor: string;
  pnl: string;
  totalPnl: string;
  openPositions: string;
  winRate: string;
  indexFocusSrc: string;
  indexFocusTitle: string;
};

export default function LeaderboardTableCard({
  rows,
}: {
  rows: LeaderboardRowT[];
}) {
  return (
    <div className="flex flex-col rounded-[10px] w-full bg-white">
      <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Leaderboard Table
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex flex-col px-2 pb-2 w-full overflow-x-auto ">
        <LeaderboardHeader />
        {rows.map((r, i) => (
          <LeaderboardRow
            key={i}
            index={r.index}
            initials={r.initials}
            initialsColor={r.initialsColor}
            name={r.name}
            badge={r.badge}
            badgeColor={r.badgeColor}
            pnl={r.pnl}
            totalPnl={r.totalPnl}
            openPositions={r.openPositions}
            winRate={r.winRate}
            indexFocusSrc={r.indexFocusSrc}
            indexFocusTitle={r.indexFocusTitle}
          />
        ))}
      </div>
    </div>
  );
}
