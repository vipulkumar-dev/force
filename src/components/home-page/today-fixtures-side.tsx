import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type TeamSide = { code: string; iconSrc: string };

type FixtureCell = {
  left: TeamSide;
  arena: string;
  scoreLeft: string;
  scoreRight: string;
  timeRange: string;
  right: TeamSide;
};

const fixtures: FixtureCell[] = [
  {
    left: { code: "LAL", iconSrc: "/icons/events/lal.png" },
    arena: "Crypt Arena",
    scoreLeft: "129",
    scoreRight: "119",
    timeRange: "21:00 - 23:45",
    right: { code: "GSW", iconSrc: "/icons/events/gsw.png" },
  },
  {
    left: { code: "BC", iconSrc: "/icons/events/sam-merrill.png" },
    arena: "Crypt Arena",
    scoreLeft: "119",
    scoreRight: "129",
    timeRange: "21:00 - 23:45",
    right: { code: "GSW", iconSrc: "/icons/events/gsw.png" },
  },
  {
    left: { code: "LAL", iconSrc: "/icons/events/lal.png" },
    arena: "Crypt Arena",
    scoreLeft: "129",
    scoreRight: "119",
    timeRange: "21:00 - 23:45",
    right: { code: "BC", iconSrc: "/icons/events/sam-merrill.png" },
  },
];

export default function TodayFixturesSide() {
  return (
    <div className="flex flex-col bg-white rounded-[10px] w-full">
      <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Today&apos;s Fixtures
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex flex-col w-full bg-white rounded-[10px]">
        {fixtures.map((cell, colIdx) => (
          <div
            key={`cell-${colIdx}`}
            className={`flex flex-col w-full ${
              colIdx === 0 ? "border-r border-light-gray" : ""
            }`}
          >
            <div className="flex flex-row border-b border-light-gray justify-between p-[20px] gap-[14px] w-full hover:bg-primary-foreground hover:cursor-pointer transition-colors duration-200 ease-out">
              {/* Left team */}
              <div className="flex flex-col gap-[10px] w-full max-w-[91px] items-center justify-center">
                <div className="flex flex-col w-[32px] h-[32px] rounded-[7px] items-center justify-center gap-[6px] bg-main/3">
                  <Image
                    src={cell.left.iconSrc}
                    alt={cell.left.code}
                    width={27}
                    height={17}
                  />
                </div>
                <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
                  {cell.left.code}
                </p>
              </div>

              {/* Arena and score */}
              <div className="flex flex-col w-[90px] gap-[10px] items-center shrink-0">
                <p className="font-semibold text-[11px] leading-[100%] tracking-[-1%] text-main">
                  {cell.arena}
                </p>
                <div className="w-full flex flex-row justify-between items-center">
                  <p
                    className={`font-semibold text-[16px] leading-[100%] tracking-[-2%] ${
                      cell.scoreLeft > cell.scoreRight
                        ? "text-main"
                        : "text-soft-400"
                    }`}
                  >
                    {cell.scoreLeft}
                  </p>
                  <p className="font-semibold text-[16px] leading-[100%] tracking-[-2%] text-main">
                    :
                  </p>
                  <p
                    className={`font-semibold text-[16px] leading-[100%] tracking-[-2%] ${
                      cell.scoreLeft > cell.scoreRight
                        ? "text-soft-400"
                        : "text-main"
                    }`}
                  >
                    {cell.scoreRight}
                  </p>
                </div>
                <p className="text-[11px] leading-[140%] tracking-[-2%] text-soft-400">
                  {cell.timeRange}
                </p>
              </div>

              {/* Right team */}
              <div className="flex flex-col gap-[10px] w-full max-w-[91px] items-center justify-center">
                <div className="flex flex-col w-[32px] h-[32px] rounded-[7px] items-center justify-center gap-[6px] bg-main/3">
                  <Image
                    src={cell.right.iconSrc}
                    alt={cell.right.code}
                    width={27}
                    height={17}
                  />
                </div>
                <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
                  {cell.right.code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
