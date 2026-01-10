export default function LeaderboardHeader() {
  return (
    <div className="flex w-full min-w-[370px] flex-row">
      <div className="hidden flex-row gap-6 px-4 py-3 md:flex md:w-[5%]"></div>
      <div className="flex w-[60%] flex-row items-center gap-6 px-4 py-3 md:w-[27%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Trader
        </p>
      </div>
      <div className="flex w-[20%] flex-row items-center gap-6 px-4 py-3 md:w-[14%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          24H PnL
        </p>
      </div>
      <div className="hidden flex-row items-center gap-6 px-4 py-3 md:flex md:w-[14%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Total PnL
        </p>
      </div>
      <div className="hidden flex-row items-center gap-6 px-4 py-3 md:flex md:w-[14%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Open Positions
        </p>
      </div>
      <div className="flex w-[20%] flex-row items-center gap-6 px-4 py-3 md:w-[10%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Win Rate
        </p>
      </div>
      <div className="hidden flex-row items-center gap-6 px-4 py-3 md:flex md:w-[16%]">
        <p className="text-text-secondary text-[12px] leading-[100%] font-medium tracking-[-1%]">
          Index Focus
        </p>
      </div>
    </div>
  );
}
