"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUp, BellPlus } from "lucide-react";
import { Button } from "../ui/button";

interface TeamBannerProps {
  name: string;
  league: string;
  abbreviation: string;
  logoUrl: string;
  bgColor?: string;
  isLive?: boolean;
  indexPrice: number;
  percentile: number;
  performance: number;
  marketIndex: number;
  onFollow?: () => void;
  onNotify?: () => void;
}

export default function TeamBanner({
  name,
  league,
  abbreviation,
  logoUrl,
  bgColor = "#AFAFBC",
  isLive = true,
  indexPrice,
  percentile,
  performance,
  marketIndex,
  onFollow,
  onNotify,
}: TeamBannerProps) {
  return (
    <div className="bg-white rounded-[20px] flex flex-col h-full overflow-hidden flex-1 lg:max-w-[900px]">
      <div
        className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto lg:flex-1 lg:min-h-[400px] rounded-t-[20px] lg:rounded-md overflow-hidden shrink-0 flex items-center justify-center"
        style={{
          background: `linear-gradient(0deg, ${bgColor}, ${bgColor}),
                    linear-gradient(180deg, rgba(16, 16, 18, 0.35) 0%, rgba(16, 16, 18, 0) 100%)`,
        }}
      >
        {/* Team Logo */}
        <div className="relative z-10">
          <Image
            src={logoUrl}
            alt={name}
            width={327}
            height={202}
            className="object-contain"
          />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-30 items-center justify-center flex flex-row gap-2">
          <Link href="/">
            <Button
              variant="outline"
              className="w-8 h-8 bg-white border border-main/7 hover:cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-main" />
            </Button>
          </Link>
        </div>

        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-30 items-center justify-center flex flex-row gap-2">
          {isLive && (
            <div className="flex flex-row items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-light-green"></div>
              <span className="text-white text-[12px] sm:text-[14px] font-medium">
                Live
              </span>
            </div>
          )}
          {isLive && <div className="w-px h-6 bg-white/20"></div>}
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
            <BellPlus className="w-4 h-4 text-main" />
          </Button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Team Info Section */}
      <div className="flex flex-col mt-auto sm:flex-row sm:items-center sm:justify-between gap-4 px-[16px] lg:flex-1 sm:px-[20px] md:px-[24px] lg:px-[30px]  shrink-0 mb-[24px] sm:mb-[32px] md:mb-[44px]">
        <div className="flex flex-col">
          <h1 className="text-main text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] tracking-[-2%] font-medium">
            {name}
          </h1>
          <h2 className="text-soft-400 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] leading-[100%] tracking-[-2%] font-medium mt-1">
            {league}
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-[12px] sm:text-[14px] text-soft-400 mb-1">
            Index Price:
          </p>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-main text-[24px] sm:text-[28px] md:text-[32px] font-medium">
              ${indexPrice.toFixed(2)}
            </h1>
            <ArrowUp className="w-[12px] h-[16px] sm:w-[15px] sm:h-[20px] text-light-green" />
          </span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex flex-row items-start justify-start gap-2 px-[16px] sm:px-[20px] md:px-[24px] lg:px-[30px] pb-[16px] sm:pb-[18px] md:pb-[30px] shrink-0 flex-wrap">
        <Button
          variant="outline"
          className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
        >
          🏅 <span className="text-[13px] md:text-[14px]">{percentile}st</span>
        </Button>
        <Button
          variant="outline"
          className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]"
        >
          <Image
            src={logoUrl}
            alt={abbreviation}
            width={16}
            height={16}
            className="sm:w-5 sm:h-5 mr-1"
          />
          {abbreviation}
        </Button>
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
          {performance.toFixed(1)}%
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
  );
}
