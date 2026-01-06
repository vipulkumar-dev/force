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
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
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
    <div className="bg-white rounded-[20px] flex flex-col h-full overflow-hidden w-full lg:max-w-[900px]">
      <div
        className={`relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto lg:flex-1 lg:min-h-[400px] rounded-t-[20px] lg:rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center`}
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
          className="object-top object-cover relative z-10"
          style={{ transform: "translateY(20%) scale(1.1)" }}
        />

        <div className="absolute top-4 left-4 z-30 items-center justify-center flex flex-row gap-2">
          <Button
            variant="outline"
            className="w-8 h-8 bg-white border border-main/7 hover:cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-main" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 z-30 items-center justify-center flex flex-row gap-2">
          {isLive && (
            <div className="flex flex-row items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-light-green"></div>
              <span className="text-white text-[12px] sm:text-[14px] font-medium">
                Live
              </span>
            </div>
          )}
          {isLive && <div className="w-[1px] h-6 bg-white/20"></div>}
          <Button
            onClick={onFollow}
            className="w-auto h-8 px-2 sm:px-3 border-none hover:cursor-pointer rounded-lg bg-white text-main text-[12px] sm:text-[14px] font-medium hidden sm:inline-flex"
          >
            Follow
          </Button>
          <Button
            onClick={onNotify}
            className="w-8 h-8 border-none hover:cursor-pointer rounded-lg bg-white text-main"
          >
            <BellDot className="w-4 h-4 text-main" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-[16px] lg:flex-1 sm:px-[20px] md:px-[24px] lg:px-[30px] py-[16px] sm:py-[18px] md:py-[20px] flex-shrink-0 mb-[24px] sm:mb-[32px] md:mb-[44px]">
        <div className="flex flex-col">
          <h1 className="text-main text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] tracking-[-2%] font-medium">
            {name}
          </h1>
          <h2 className="text-soft-400 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] leading-[100%] tracking-[-2%] font-medium mt-1">
            {team} ({league})
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-[12px] sm:text-[14px] text-soft-400 mb-1">
            Index Price:
          </p>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-main text-[24px] sm:text-[28px] md:text-[32px] font-medium">
              ${price.toFixed(2)}
            </h1>
            <ArrowUp className="w-[12px] h-[16px] sm:w-[15px] sm:h-[20px] text-light-green" />
          </span>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-2 px-[16px] sm:px-[20px] md:px-[24px] lg:px-[30px] pb-[16px] sm:pb-[18px] md:pb-[20px] flex-shrink-0 flex-wrap">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
            >
              <Image
                src={teamImageUrl}
                alt="Team"
                width={16}
                height={16}
                className="sm:w-5 sm:h-5 mr-1"
              />
              {name}
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-[500px] p-0 gap-0 [&>button]:hidden">
            <SearchBar
              teamImageUrl={teamImageUrl}
              name={name}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
        >
          🏅 <span className="text-[13px] md:text-[14px]">{percentile}st</span>
        </Button>
        <Link href={`/team/${teamId}`}>
          <Button
            variant="outline"
            className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
          >
            <Image
              src={"/images/teams/lakers-logo.svg"}
              alt="Lakers"
              width={16}
              height={16}
              className="sm:w-5 sm:h-5 mr-1"
            />
            {team}
          </Button>
        </Link>
        <Button
          variant="outline"
          className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
        >
          <Image
            src={"/icons/game/f.svg"}
            alt="Force"
            width={8}
            height={8}
            className="sm:w-[10px] sm:h-[10px] mr-1"
          />
          {performance}%
        </Button>
        <Button
          variant="outline"
          className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
        >
          <Image
            src={"/icons/volume.svg"}
            alt="Chart"
            width={16}
            height={16}
            className="sm:w-[10px] sm:h-[10px] mr-1"
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
    //           <p className="font-nohemi text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] text-main font-medium leading-[100%]">
    //             {name}
    //           </p>
    //           <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-soft-400 tracking-[-1%] leading-[100%]">
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
    //                 <p className="font-medium text-[11px] sm:text-[12px] text-soft-400 tracking-[-0.12px] whitespace-nowrap">
    //                   Will play
    //                 </p>
    //                 <div className="flex gap-[4px] sm:gap-[4px] items-center">
    //                   {/* Days */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-main tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.days)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-main tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Hours */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-main tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.hours)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-main tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Minutes */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-main tracking-[-0.14px]">
    //                       {formatTimeUnit(timeRemaining.minutes)}
    //                     </p>
    //                   </div>
    //                   <p className="font-medium text-[11px] sm:text-[12px] text-main tracking-[-0.12px]">
    //                     :
    //                   </p>
    //                   {/* Seconds */}
    //                   <div className="bg-neutral-100 flex items-center justify-center rounded-[4px] w-[26px] h-[26px] sm:w-[28px] sm:h-[28px]">
    //                     <p className="font-medium text-[13px] sm:text-[14px] text-main tracking-[-0.14px]">
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
