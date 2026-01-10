"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Info, ChevronDown, UserPlus, Bell } from "lucide-react";
import AthleteSwitchModal from "./athlete-switch-modal";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowUp, BellDot, LucideStepForward } from "lucide-react";
import { Dropdown } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SearchBar from "../search-bar";
import Link from "next/link";

interface AthleteBannerProps {
  name: string;
  team: string;
  teamId: string;
  league: string;
  imageUrl: string;
  teamImageUrl: string;
  bgColor: string;
  isLive: boolean;
  nextGameTime?: string;
  eloScore: number;
  percentile: number;
  price: number;
  performance: number;
  marketIndex: number;
  onFollow?: () => void;
  onNotify?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate?: string): TimeRemaining {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}

export default function AthleteBanner({
  name,
  team,
  teamId,
  league,
  imageUrl,
  teamImageUrl,
  bgColor,
  isLive = true,
  nextGameTime,
  price,
  performance,
  marketIndex,
  eloScore,
  percentile,
  onFollow,
  onNotify,
}: AthleteBannerProps) {
  const timeRemaining = useCountdown(nextGameTime);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatTimeUnit = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white lg:max-w-[900px]">
      <div
        className={`relative flex h-[300px] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-t-[20px] sm:h-[350px] md:h-[400px] lg:h-auto lg:min-h-[400px] lg:flex-1 lg:rounded-md`}
        style={{
          background: `linear-gradient(0deg, var(--Card-athlete-card-bg, #AFAFBC), var(--Card-athlete-card-bg, #AFAFBC)),
                    linear-gradient(180deg, rgba(16, 16, 18, 0.35) 0%, rgba(16, 16, 18, 0) 100%)`,
        }}
      >
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={500}
          className="relative z-10 object-cover object-top"
          style={{ transform: "translateY(20%) scale(1.1)" }}
        />

        <div className="absolute top-4 left-4 z-30 flex flex-row items-center justify-center gap-2">
          <Button
            variant="outline"
            className="border-main/7 h-8 w-8 border bg-white hover:cursor-pointer"
          >
            <ArrowLeft className="text-text-primary h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 z-30 flex flex-row items-center justify-center gap-2">
          {isLive && (
            <div className="flex flex-row items-center gap-2 rounded-lg bg-white/10 px-2 py-1.5 backdrop-blur-sm sm:px-3">
              <div className="bg-light-green h-2 w-2 rounded-full"></div>
              <span className="text-[12px] font-medium text-white sm:text-[14px]">
                Live
              </span>
            </div>
          )}
          {isLive && <div className="h-6 w-[1px] bg-white/20"></div>}
          <Button
            onClick={onFollow}
            className="text-text-primary hidden h-8 w-auto rounded-lg border-none bg-white px-2 text-[12px] font-medium hover:cursor-pointer sm:inline-flex sm:px-3 sm:text-[14px]"
          >
            Follow
          </Button>
          <Button
            onClick={onNotify}
            className="text-text-primary h-8 w-8 rounded-lg border-none bg-white hover:cursor-pointer"
          >
            <BellDot className="text-text-primary h-4 w-4" />
          </Button>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[40%] bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className="mb-[24px] flex flex-shrink-0 flex-col gap-4 px-[16px] py-[16px] sm:mb-[32px] sm:flex-row sm:items-center sm:justify-between sm:px-[20px] sm:py-[18px] md:mb-[44px] md:px-[24px] md:py-[20px] lg:flex-1 lg:px-[30px]">
        <div className="flex flex-col">
          <h1 className="text-text-primary text-[24px] leading-[100%] font-medium tracking-[-2%] sm:text-[28px] md:text-[32px]">
            {name}
          </h1>
          <h2 className="text-text-secondary mt-1 text-[18px] leading-[100%] font-medium tracking-[-2%] sm:text-[20px] md:text-[24px] lg:text-[32px]">
            {team} ({league})
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-text-secondary mb-1 text-[12px] sm:text-[14px]">
            Index Price:
          </p>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-text-primary text-[24px] font-medium sm:text-[28px] md:text-[32px]">
              ${price.toFixed(2)}
            </h1>
            <ArrowUp className="text-light-green h-[16px] w-[12px] sm:h-[20px] sm:w-[15px]" />
          </span>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-row flex-wrap items-start justify-start gap-2 px-[16px] pb-[16px] sm:px-[20px] sm:pb-[18px] md:px-[24px] md:pb-[20px] lg:px-[30px]">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
            >
              <Image
                src={teamImageUrl}
                alt="Team"
                width={16}
                height={16}
                className="mr-1 sm:h-5 sm:w-5"
              />
              {name}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-[500px] gap-0 p-0 [&>button]:hidden">
            <SearchBar
              teamImageUrl={teamImageUrl}
              name={name}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
        >
          🏅 <span className="text-[13px] md:text-[14px]">{percentile}st</span>
        </Button>
        <Link href={`/team/${teamId}`}>
          <Button
            variant="outline"
            className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
          >
            <Image
              src={"/images/teams/lakers-logo.svg"}
              alt="Lakers"
              width={16}
              height={16}
              className="mr-1 sm:h-5 sm:w-5"
            />
            {team}
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
        >
          <Image
            src={"/icons/game/f.svg"}
            alt="Force"
            width={8}
            height={8}
            className="mr-1 sm:h-[10px] sm:w-[10px]"
          />
          {performance}%
        </Button>
        <Button
          variant="outline"
          className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
        >
          <Image
            src={"/icons/volume.svg"}
            alt="Chart"
            width={16}
            height={16}
            className="mr-1 sm:h-[10px] sm:w-[10px]"
          />
          {marketIndex}
        </Button>
      </div>
    </div>

    // <>
    //   <AthleteSwitchModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //   />
    //   <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[16px] md:gap-[20px] items-start sm:items-center w-full">
    //     {/* Player Image */}
    //     <div
    //       className={`relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-md ${bgColor} overflow-hidden shrink-0`}
    //     >
    //       <Image
    //         src="/icons/athletes/logo.png"
    //         alt="Logo"
    //         fill
    //         className="object-cover object-top opacity-8 mix-blend-screen"
    //       />
    //       <Image
    //         src={imageUrl}
    //         alt={name}
    //         fill
    //         className="object-cover object-top"
    //         style={{ boxShadow: "27.66px 17.98px 19.36px 0px #00000040;" }}
    //       />
    //     </div>

    //     {/* Content */}
    //     <div className="flex-1 flex flex-col sm:flex-row gap-[16px] sm:gap-[16px] md:gap-[20px] items-start sm:items-end min-h-px min-w-px w-full">
    //       {/* Left Info Section */}
    //       <div className="flex-1 flex flex-col gap-[12px] sm:gap-[12px] md:gap-[16px] min-h-px min-w-px w-full">
    //         {/* Top Badges */}
    //         <div className="flex gap-[6px] items-center w-full flex-wrap">
    //           {/* Live Badge */}
    //           {isLive && (
    //             <div className="bg-[#fdedf0] border border-[#f8c9d2] rounded-[100px] h-[24px] sm:h-[26px] px-[8px] py-[6px] flex items-center gap-[4px] shrink-0">
    //               <div className="bg-base-red rounded-[12px] w-[4px] h-[4px]" />
    //               <p className="font-medium text-[11px] sm:text-[12px] text-base-red tracking-[-0.12px] leading-0">
    //                 Live
    //               </p>
    //             </div>
    //           )}

    //           {/* ELO Score Badge */}
    //           <div className="bg-white border border-[#e2e4e9] rounded-[40px] px-[8px] py-[6px] flex items-center gap-[4px] shrink-0">
    //             <p className="font-medium text-[11px] sm:text-[12px] text-[#20232d] tracking-[-0.12px] leading-0">
    //               ${eloScore}
    //             </p>
    //             <Info className="w-[11px] h-[11px] sm:w-[12px] sm:h-[12px] text-[#20232d]" />
    //           </div>

    //           {/* Dropdown Icon */}
    //           <button
    //             onClick={() => setIsModalOpen(true)}
    //             className="hover:opacity-70 transition-opacity cursor-pointer shrink-0"
    //             aria-label="Switch athlete"
    //           >
    //             <ChevronDown className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-sub-500" />
    //           </button>
    //         </div>

    //         {/* Player Name & Team */}
    //         <div className="flex flex-col gap-[8px] sm:gap-[8px] md:gap-[12px] w-full">
    //           <p className="font-nohemi text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-text-primary font-medium leading-[100%]">
    //             {name}
    //           </p>
    //           <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-text-secondary tracking-[-1%] leading-[100%]">
    //             {team} ({league})
    //           </p>
    //         </div>

    //         {/* Percentile Badge and Timer */}
    //         <div className="flex flex-wrap gap-[10px] sm:gap-[12px] md:gap-[16px] items-center sm:items-end w-full">
    //           {/* Percentile Badge */}
    //           <div className="bg-[rgba(249,157,10,0.09)] border border-[rgba(249,157,10,0.1)] rounded-[100px] h-[28px] sm:h-[28px] md:h-[30px] px-[8px] sm:px-[8px] md:px-[9px] pr-[12px] sm:pr-[12px] md:pr-[16px] py-[6px] flex items-center justify-center gap-[6px] sm:gap-[6px] md:gap-[7px] w-fit shrink-0">
    //             <span className="text-[14px] md:text-[16px] tracking-[-0.16px]">🏅</span>
    //             <p className="font-medium text-[#d48405] tracking-[-0.14px]">
    //               <span className="text-[13px] md:text-[14px]">{percentile}</span>
    //               <span className="text-[9px] md:text-[10px]">ST</span>
    //             </p>
    //             <p className="font-medium text-[#d48405] text-[13px] md:text-[14px] tracking-[-0.14px] hidden sm:inline">
    //               Percentile League-wide
    //             </p>
    //             <p className="font-medium text-[#d48405] text-[13px] md:text-[14px] tracking-[-0.14px] sm:hidden">
    //               Percentile
    //             </p>
    //           </div>

    //           {/* Timer - Only show when not live */}
    //           {!isLive && nextGameTime && (
    //             <div className="bg-white border border-[rgba(10,13,20,0.07)] rounded-[7px] shrink-0">
    //               <div className="flex gap-[8px] sm:gap-[10px] items-center px-[12px] sm:px-[16px] py-[6px] sm:py-[6px]">
    //                 <p className="font-medium text-[11px] sm:text-[12px] text-text-secondary tracking-[-0.12px] whitespace-nowrap">
    //                   Will play
    //                 </p>
    //                 <div className="flex gap-[4px] sm:gap-[4px] items-center">
    //                   {/* Days */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-text-primary tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.days)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-text-primary tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Hours */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-text-primary tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.hours)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-text-primary tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Minutes */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-text-primary tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.minutes)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-text-primary tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Seconds */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-text-primary tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.seconds)}
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Right Action Buttons */}
    //       <div className="flex gap-[8px] sm:gap-[8px] md:gap-[10px] items-start w-full sm:w-auto">
    //         {/* Follow Button */}
    //         <button
    //           onClick={onFollow}
    //           className="bg-main border border-main rounded-[8px] h-[38px] sm:h-[38px] md:h-[40px] flex-1 sm:flex-initial sm:w-[100px] md:w-[105px] px-[12px] sm:px-[12px] md:px-[16px] py-[8px] md:py-[10px] flex items-center justify-center gap-[6px] sm:gap-[6px] md:gap-[8px] hover:bg-main/90 transition-colors cursor-pointer"
    //         >
    //           <Image
    //             src="/icons/user-plus.svg"
    //             alt="Follow"
    //             width={14}
    //             height={14}
    //             className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"
    //           />
    //           <p className="font-medium text-[13px] sm:text-[13px] md:text-[14px] text-white text-center tracking-[-0.14px] leading-[1.4]">
    //             Follow
    //           </p>
    //         </button>

    //         {/* Notify Me Button */}
    //         <button
    //           onClick={onNotify}
    //           className="bg-white border border-main/7 rounded-[8px] h-[38px] sm:h-[38px] md:h-[40px] flex-1 sm:flex-initial sm:w-[115px] md:w-[122px] px-[12px] sm:px-[12px] md:px-[16px] py-[8px] md:py-[10px] flex items-center justify-center gap-[6px] sm:gap-[6px] md:gap-[8px] hover:bg-primary-foreground transition-colors cursor-pointer"
    //         >
    //           <Image
    //             src="/icons/bell-plus.svg"
    //             alt="Notify"
    //             width={14}
    //             height={14}
    //             className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"
    //           />
    //           <p className="font-medium text-[13px] sm:text-[13px] md:text-[14px] text-[#0d0f13] text-center tracking-[-0.14px] leading-[1.4]">
    //             Notify Me
    //           </p>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
