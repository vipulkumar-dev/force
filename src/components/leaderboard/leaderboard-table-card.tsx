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
    <div className="flex w-full flex-col rounded-[10px] bg-white">
      <Button className="border-light-gray hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] border-b bg-white px-[20px]! py-[20px] hover:cursor-pointer">
        <p className="font-nohemi text-text-primary text-[14px] leading-[100%] font-medium tracking-[2%]">
          Leaderboard Table
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex w-full flex-col overflow-x-auto px-2 pb-2">
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
