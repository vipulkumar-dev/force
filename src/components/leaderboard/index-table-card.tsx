"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import IndexHeader from "./index-header";
import IndexRow from "./index-row";

type IndexRowT = {
  team: string;
  teamSrc: string;
  long: string;
  short: string;
  openInterest: string;
  funRate: string;
};

export default function IndexTableCard({
  rows,
  onOpen,
}: {
  rows: IndexRowT[];
  onOpen?: () => void;
}) {
  return (
    <div className="flex flex-col rounded-[10px] w-full bg-white">
      <Button
        className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer"
        onClick={onOpen}
      >
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Performance Breakdown
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex flex-col px-2 pb-2 w-full overflow-x-auto ">
        <IndexHeader />
        {rows.map((r, i) => (
          <IndexRow
            key={i}
            team={r.team}
            teamSrc={r.teamSrc}
            long={r.long}
            short={r.short}
            openInterest={r.openInterest}
            funRate={r.funRate}
          />
        ))}
      </div>
    </div>
  );
}
