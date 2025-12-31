import Image from "next/image";

export default function MostTradedRow({
  athleteSrc,
  athleteName,
  athleteTeam,
  athleteColor,
  trades,
  funding,
  openInterest,
  onClick,
}: {
  athleteSrc: string;
  athleteName: string;
  athleteTeam: string;
  athleteColor: string;
  trades: string;
  funding: string;
  openInterest: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="w-full flex flex-row hover:bg-primary-foreground transition-colors duration-200 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[60%] md:w-[40%] flex flex-row py-3 px-4 gap-2.5 items-center">
        <div
          className={`relative w-8 h-8 rounded-md ${athleteColor} overflow-hidden`}
        >
          <Image
            src="/icons/athletes/logo.png"
            alt="Logo"
            fill
            className="object-cover object-top opacity-8 mix-blend-screen"
          />
          <Image
            src={athleteSrc}
            alt={athleteName}
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col w-fit gap-2">
          <p className="text-nowrap font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
            {athleteName}
          </p>
          <p className="text-[12px] text-nowrap leading-[100%] tracking-[-1%] text-soft-400">
            {athleteTeam}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-[40%] md:w-[20%] py-3 px-4 gap-4 items-center">
        <p
          className={`font-medium text-[14px] leading-[100%] tracking-[-2%] ${
            trades[0] === "-" ? "text-base-red" : "text-light-green"
          }`}
        >
          {trades}
        </p>
      </div>

      <div className="hidden md:flex flex-row w-[20%] py-3 px-4 gap-4 items-center">
        <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
          {funding}
        </p>
      </div>

      <div className="hidden md:flex flex-row w-[20%] py-3 px-4 gap-4 items-center">
        <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
          {openInterest}
        </p>
      </div>
    </div>
  );
}
