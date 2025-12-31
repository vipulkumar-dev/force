import Image from "next/image";

export default function LeaderboardRow({
  index,
  initials,
  initialsColor,
  name,
  badge,
  badgeColor,
  pnl,
  totalPnl,
  openPositions,
  winRate,
  indexFocusSrc,
  indexFocusTitle,
}: {
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
}) {
  return (
    <div className="flex flex-row w-full min-w-[370px]">
      <div className="hidden md:flex md:w-[5%] flex-row h-14 py-3 pl-4 gap-6 items-center">
        <div className="flex flex-row py-1.5 h-fit w-8 px-3 gap-1 border border-light-gray bg-white rounded-[100px] items-center justify-center">
          <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500">
            #{index}
          </p>
        </div>
      </div>
      <div className="w-[60%] md:w-[27%] flex flex-row py-3 px-4 gap-2.5 items-center">
        <div
          className={`flex flex-row items-center justify-center w-[26px] h-[26px] rounded-[100px] gap-2.5 ${initialsColor}`}
        >
          <p
            className={`font-semibold text-[12px] leading-[100%] tracking-[-1%] ${
              initialsColor === "bg-light-purple"
                ? "text-dark-purple"
                : initialsColor === "bg-lighter-green"
                ? "text-darker-green"
                : "text-darker-yellow"
            }`}
          >
            {initials}
          </p>
        </div>
        <div className="flex flex-row gap-2.5 items-center">
          <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
            {name}
          </p>
          <div
            className={`flex flex-row rounded-full px-2 py-px ${badgeColor}`}
          >
            <p className="font-medium text-[11px] leading-3 tracking-[2%] text-white text-center">
              • {badge}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[20%] md:w-[14%] flex flex-row py-3 px-4 gap-6 items-center">
        <p
          className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
            pnl[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {pnl}
        </p>
      </div>
      <div className="hidden md:flex md:w-[14%] flex-row py-3 px-4 gap-6 items-center">
        <p
          className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
            totalPnl[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {totalPnl}
        </p>
      </div>
      <div className="hidden md:flex md:w-[14%] flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
          {openPositions}
        </p>
      </div>
      <div className="w-[20%] md:w-[10%] flex flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
          {winRate}
        </p>
      </div>
      <div className="hidden md:flex md:w-[16%] flex-row py-3 px-4 gap-2.5 items-center">
        <div className="flex flex-row items-center justify-center w-8 h-8 rounded-md bg-black/3">
          <Image
            src={indexFocusSrc}
            alt={indexFocusTitle}
            width={21}
            height={21}
            className="w-fit"
          />
        </div>
        <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
          {indexFocusTitle}
        </p>
      </div>
    </div>
  );
}
