import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function TeamsRankings() {
  type RankingRow = {
    rank: number;
    iconSrc: string;
    alt: string;
    team: string;
  };

  const rankings: RankingRow[] = [
    {
      rank: 1,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
    {
      rank: 2,
      iconSrc: "/icons/events/sam-merrill.png",
      alt: "Sam Merrill",
      team: "Golden State Warriors",
    },
    {
      rank: 3,
      iconSrc: "/icons/events/gsw.png",
      alt: "gsw",
      team: "Golden State Warriors",
    },
    {
      rank: 4,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
    {
      rank: 5,
      iconSrc: "/icons/events/lal.png",
      alt: "LAL",
      team: "Golden State Warriors",
    },
  ];
  return (
    <div className="w-full flex flex-col bg-white rounded-[10px]">
      <Button className="flex flex-col w-full h-auto border-b px-[20px]! py-[20px]! gap-[16px] border-light-gray bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <div className="flex flex-row justify-between w-full gap-[16px]">
          <p className="font-nohemi font-medium text-[16px] leading-[100%] tracking-[2%] text-main">
            NBA Teams Ranking
          </p>
          <ChevronRight className="text-soft-400" width={14} height={14} />
        </div>
      </Button>

      <div className="flex flex-col w-full">
        {rankings.map((row) => (
          <div
            key={row.rank}
            className="flex flex-row py-[16px] px-[20px] gap-[8px] border-b border-light-gray items-center border-t border-transparent hover:bg-primary-foreground hover:cursor-pointer transition-colors duration-200 ease-out"
          >
            <div className="flex flex-row items-center justify-center w-[32px] h-fit rounded-[100px] py-[6px] px-[12px] gap-[4px] bg-white border border-disabled-100">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
                #{row.rank}
              </p>
            </div>
            <div className="flex flex-col w-[32px] h-[32px] items-center justify-center rounded-[7px] gap-[6px] bg-light-gray">
              <Image src={row.iconSrc} alt={row.alt} width={27} height={17} />
            </div>
            <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
              {row.team}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
