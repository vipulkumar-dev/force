export default function TrendingNowHeader() {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row w-[60%] md:w-[40%] py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Athlete Name
        </p>
      </div>
      <div className="flex flex-row w-[40%] md:w-[20%] py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Current Price
        </p>
      </div>
      <div className="hidden md:flex flex-row w-[20%] py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          24h Change
        </p>
      </div>
      <div className="hidden md:flex flex-row w-[20%] py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Volume
        </p>
      </div>
    </div>
  );
}
