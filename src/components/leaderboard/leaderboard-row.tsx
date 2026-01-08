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
    <div className="flex w-full min-w-[370px] flex-row">
      <div className="hidden h-14 flex-row items-center gap-6 py-3 pl-4 md:flex md:w-[5%]">
        <div className="border-light-gray flex h-fit w-8 flex-row items-center justify-center gap-1 rounded-[100px] border bg-white px-3 py-1.5">
          <p className="text-sub-500 text-[12px] leading-[100%] font-medium tracking-[-1%]">
            #{index}
          </p>
        </div>
      </div>
      <div className="flex w-[60%] flex-row items-center gap-2.5 px-4 py-3 md:w-[27%]">
        <div
          className={`flex h-[26px] w-[26px] flex-row items-center justify-center gap-2.5 rounded-[100px] ${initialsColor}`}
        >
          <p
            className={`text-[12px] leading-[100%] font-semibold tracking-[-1%] ${
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
        <div className="flex flex-row items-center gap-2.5">
          <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
            {name}
          </p>
          <div
            className={`flex flex-row rounded-full px-2 py-px ${badgeColor}`}
          >
            <p className="text-center text-[11px] leading-3 font-medium tracking-[2%] text-white">
              • {badge}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-[20%] flex-row items-center gap-6 px-4 py-3 md:w-[14%]">
        <p
          className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
            pnl[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {pnl}
        </p>
      </div>
      <div className="hidden flex-row items-center gap-6 px-4 py-3 md:flex md:w-[14%]">
        <p
          className={`text-[12px] leading-[100%] font-medium tracking-[-1%] ${
            totalPnl[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {totalPnl}
        </p>
      </div>
      <div className="hidden flex-row items-center gap-6 px-4 py-3 md:flex md:w-[14%]">
        <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          {openPositions}
        </p>
      </div>
      <div className="flex w-[20%] flex-row items-center gap-6 px-4 py-3 md:w-[10%]">
        <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          {winRate}
        </p>
      </div>
      <div className="hidden flex-row items-center gap-2.5 px-4 py-3 md:flex md:w-[16%]">
        <div className="flex h-8 w-8 flex-row items-center justify-center rounded-md bg-black/3">
          <Image
            src={indexFocusSrc}
            alt={indexFocusTitle}
            width={21}
            height={21}
            className="w-fit"
          />
        </div>
        <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
          {indexFocusTitle}
        </p>
      </div>
    </div>
  );
}
