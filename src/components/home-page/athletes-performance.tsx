import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AthletesPerformance() {
  const filters = ["Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

  type TrendRow = {
    rank: number;
    name: string;
    team: string;
    score: string;
    scoreTier: "low" | "medium" | "high";
  };

  const trendRows: TrendRow[] = [
    {
      rank: 1,
      name: "Stephen Curry",
      team: "Golden State Warriors",
      score: "234",
      scoreTier: "high",
    },
    {
      rank: 2,
      name: "Luka Dončić",
      team: "Dallas Mavericks",
      score: "234",
      scoreTier: "medium",
    },
    {
      rank: 3,
      name: "Damian Lillard",
      team: "Milwaukee Bucks",
      score: "234",
      scoreTier: "high",
    },
    {
      rank: 4,
      name: "Ja Morant",
      team: "Memphis Grizzlies",
      score: "234",
      scoreTier: "medium",
    },
    {
      rank: 5,
      name: "Tyrese Haliburton",
      team: "Indiana Pacers",
      score: "234",
      scoreTier: "medium",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";
  return (
    <div className="w-full flex flex-col bg-white rounded-[10px]">
      <Button className="flex flex-col w-full h-auto border-b px-[20px]! py-[20px]! gap-[16px] border-light-gray bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <div className="flex flex-row justify-between w-full gap-[16px]">
          <p className="font-nohemi font-medium text-[16px] leading-[100%] tracking-[2%] text-main">
            Athletes Performance
          </p>
          <ChevronRight className="text-soft-400" width={14} height={14} />
        </div>

        {/* Selectable chips */}
        <div className="flex flex-row gap-[8px] w-full">
          {filters.map((label) => {
            const isSelected = selectedFilter === label;
            return (
              <Button
                key={label}
                onClick={() => setSelectedFilter(label)}
                className={`flex flex-row rounded-[100px] h-fit items-center justify-center py-[6px] px-[10px] gap-[4px] border transition-colors duration-200 ease-out hover:cursor-pointer ${
                  isSelected
                    ? "bg-main border-black/5"
                    : "bg-white border-main/7 hover:bg-primary-foreground"
                }`}
              >
                <p
                  className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
                    isSelected ? "text-white" : "text-sub-500"
                  }`}
                >
                  {label}
                </p>
              </Button>
            );
          })}
        </div>
      </Button>

      <div className="flex flex-col w-full">
        {trendRows.map((row, idx) => (
          <div
            key={idx}
            className="flex flex-row items-center border-b border-light-gray py-[16px] px-[20px] gap-[10px] w-full border-t border-transparent hover:bg-primary-foreground hover:cursor-pointer transition-colors duration-200 ease-out"
          >
            <div className="flex flex-row items-center justify-center w-[32px] h-fit rounded-[100px] py-[6px] px-[12px] gap-[4px] bg-white border border-disabled-100">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
                #{row.rank}
              </p>
            </div>
            <div className="flex flex-col gap-[8px] justify-center">
              <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main text-nowrap">
                {row.name}
              </p>
              <p className="text-[12px] leading-[100%] tracking-[-1%] text-soft-400 text-nowrap">
                {row.team}
              </p>
            </div>
            <div className="flex flex-row gap-[6px] w-full justify-end">
              <div className="flex flex-row items-center justify-center rounded-[100px] py-[4px] h-fit px-[8px] gap-[4px] bg-nav-button">
                <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
                  FT
                </p>
              </div>
              <div
                className={`flex flex-row items-center justify-center rounded-[100px] py-[4px] h-fit px-[8px] gap-[4px] ${
                  row.scoreTier === "high" ? "bg-dark-green" : "bg-base-yellow"
                }`}
              >
                <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-white">
                  234
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
