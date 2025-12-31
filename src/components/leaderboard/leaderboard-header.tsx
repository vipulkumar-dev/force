export default function LeaderboardHeader() {
  return (
    <div className="flex flex-row w-full min-w-[370px]">
      <div className="hidden md:flex md:w-[5%] flex-row py-3 px-4 gap-6"></div>
      <div className="w-[60%] md:w-[27%] flex flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Trader
        </p>
      </div>
      <div className="w-[20%] md:w-[14%] flex flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          24H PnL
        </p>
      </div>
      <div className="hidden md:flex md:w-[14%] flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Total PnL
        </p>
      </div>
      <div className="hidden md:flex md:w-[14%] flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Open Positions
        </p>
      </div>
      <div className="w-[20%] md:w-[10%] flex flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Win Rate
        </p>
      </div>
      <div className="hidden md:flex md:w-[16%] flex-row py-3 px-4 gap-6 items-center">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Index Focus
        </p>
      </div>
    </div>
  );
}
