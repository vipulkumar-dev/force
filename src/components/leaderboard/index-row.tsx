import Image from "next/image";

export default function IndexRow({
  team,
  teamSrc,
  long,
  short,
  openInterest,
  funRate,
}: {
  team: string;
  teamSrc: string;
  long: string;
  short: string;
  openInterest: string;
  funRate: string;
}) {
  return (
    <div className="flex flex-row w-full min-w-[370px]">
      <div className="flex flex-row items-center flex-1 w-[30%] md:w-[28%] h-14 py-3 px-4 gap-2.5">
        <div className="flex flex-row items-center justify-center w-8 h-8 rounded-md bg-black/3">
          <Image
            src={teamSrc}
            alt={team}
            width={21}
            height={21}
            className="w-fit"
          />
        </div>
        <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
          {team}
        </p>
      </div>

      <div className="flex flex-row items-center w-[25%] md:w-[18%] px-4 py-3 gap-6 h-14">
        <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
          {long}
        </p>
      </div>

      <div className="hidden md:flex md:w-[18%] flex-row items-center px-4 py-3 gap-6 h-14">
        <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
          {short}
        </p>
      </div>

      <div className="hidden md:flex md:w-[18%] flex-row items-center px-4 py-3 gap-6 h-14">
        <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
          {openInterest}
        </p>
      </div>

      <div className="flex flex-row items-center w-[25%] md:w-[18%] px-4 py-3 gap-6 h-14">
        <p
          className={`font-medium text-[14px] leading-[100%] tracking-[-1%] ${
            funRate[0] === "+" ? "text-light-green" : "text-base-red"
          }`}
        >
          {funRate}
        </p>
      </div>
    </div>
  );
}
