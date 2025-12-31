import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type EventRow = {
  time: string;
  iconSrc: string;
  play: string;
  det: string;
  cle: string;
};

export default function LiveEvents({ eventRows }: { eventRows: EventRow[] }) {
  return (
    <div className="flex flex-col w-full rounded-[10px] bg-white">
      <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Live Events
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="flex flex-col p-[20px] gap-[20px] w-full items-center">
        <div className="flex flex-col md:flex-row w-full gap-[16px] md:gap-[32px]">
          <div className="flex flex-row w-full gap-[16px] items-center">
            <div className="flex flex-col w-full gap-[6px] justify-end">
              <p className="font-semibold text-[14px] leading-[100%] tracking-[-2%] text-end text-main">
                LAL
              </p>
              <p className="text-[11px] leading-[100%] tracking-[-1%] text-soft-400 text-end">
                Los Angeles Lakers (NBA)
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-[40px] h-[40px] bg-light-gray shrink-0 min-w-[40px]">
              <Image
                src="/icons/events/lal.png"
                alt="lal"
                width={33}
                height={21}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-[4px] items-center justify-center">
            <p className="text-main font-medium text-[12px] leading-[140%] tracking-[-2%] text-center">
              Oct 23 - Now on the Match
            </p>
            <p className="text-[11px] leading-[100%] tracking-[-1%] text-soft-400 text-center">
              Crypt Arena
            </p>
          </div>
          <div className="flex flex-row w-full gap-[16px] items-center">
            <div className="flex flex-col items-center justify-center w-[40px] h-[40px] bg-light-gray shrink-0 min-w-[40px]">
              <Image
                src="/icons/events/gsw.png"
                alt="gsw"
                width={23}
                height={27}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col w-full gap-[6px]">
              <p className="font-semibold text-[14px] leading-[100%] tracking-[-2%] text-main">
                GSW
              </p>
              <p className="text-[11px] leading-[100%] tracking-[-1%] text-soft-400">
                Golden State Warriors (NBA)
              </p>
            </div>
          </div>
        </div>

        <Image
          src="/icons/events/basket-photo.png"
          alt="basket-photo"
          width={640}
          height={255}
          className="rounded-[8px] w-full md:w-auto h-auto object-cover md:object-contain"
        />
        <div className="flex flex-col px-[4px] pb-[4px] w-full">
          <div className="hidden md:flex flex-row py-[12px] px-[16px] gap-[16px] w-full">
            <p className="w-[17.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Time
            </p>
            <p className="w-[49.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              Play
            </p>
            <p className="w-[16.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              DET
            </p>
            <p className="w-[16.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
              CLE
            </p>
          </div>

          {eventRows.map((row, idx) => (
            <div
              key={idx}
              className="flex flex-row md:h-[48px] p-[12px] md:p-[16px] gap-[12px] md:gap-[16px] border-t border-transparent hover:bg-main/3 hover:border-main hover:cursor-pointer transition-colors duration-200 ease-out justify-between"
            >
              <div className="flex flex-col md:flex-row flex-1 gap-[8px] md:gap-[16px]">
                <p className="md:w-[17.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
                  {row.time}
                </p>
                <div className="flex flex-row md:w-[49.5%] items-start md:items-center gap-[8px] min-w-0">
                  <div className="flex flex-col w/[32px] h/[32px] items-center justify-center rounded-[4px] gap-[6px]">
                    <Image
                      src={row.iconSrc}
                      alt="event-icon"
                      width={27}
                      height={17}
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium text-main text-[12px] leading-[130%] tracking-[-1%] break-words">
                    {row.play}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-end md:items-center gap-[6px] md:gap-[16px] w-auto">
                <p className="md:w-[16.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
                  {row.det}
                </p>
                <p className="md:w-[16.5%] font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
                  {row.cle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
