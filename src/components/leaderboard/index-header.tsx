export default function IndexHeader() {
  return (
    <div className="flex flex-row w-full min-w-[370px]">
      <div className="w-[30%] flex-1 md:w-[28%] flex flex-row py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Index
        </p>
      </div>
      <div className="w-[25%] md:w-[18%] flex flex-row py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Long %
        </p>
      </div>
      <div className="hidden md:flex md:w-[18%] flex-row py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Short %
        </p>
      </div>
      <div className="hidden md:flex md:w-[18%] flex-row py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          Open Interest
        </p>
      </div>
      <div className="w-[25%] md:w-[18%] flex flex-row py-3 px-4 gap-6">
        <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
          24H Fun Rate
        </p>
      </div>
    </div>
  );
}
