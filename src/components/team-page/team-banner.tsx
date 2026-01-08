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
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-[20px] bg-white lg:max-w-[900px]">
      <div
        className="relative flex h-[300px] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-[20px] sm:h-[350px] md:h-[400px] lg:h-auto lg:min-h-[400px] lg:flex-1 lg:rounded-md"
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
        <div className="absolute top-4 left-4 z-30 flex flex-row items-center justify-center gap-2">
          <Link href="/">
            <Button
              variant="outline"
              className="border-main/7 h-8 w-8 border bg-white hover:cursor-pointer"
            >
              <ArrowLeft className="text-text-primary h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-30 flex flex-row items-center justify-center gap-2">
          {isLive && (
            <div className="flex flex-row items-center gap-2 rounded-lg bg-white/10 px-2 py-1.5 backdrop-blur-sm sm:px-3">
              <div className="bg-light-green h-2 w-2 rounded-full"></div>
              <span className="text-[12px] font-medium text-white sm:text-[14px]">
                Live
              </span>
            </div>
          )}
          {isLive && <div className="h-6 w-px bg-white/20"></div>}
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
            <BellPlus className="text-text-primary h-4 w-4" />
          </Button>
        </div>

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[40%] bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Team Info Section */}
      <div className="mt-auto mb-[24px] flex shrink-0 flex-col gap-4 px-[16px] sm:mb-[32px] sm:flex-row sm:items-center sm:justify-between sm:px-[20px] md:mb-[44px] md:px-[24px] lg:flex-1 lg:px-[30px]">
        <div className="flex flex-col">
          <h1 className="text-text-primary text-[24px] leading-[100%] font-medium tracking-[-2%] sm:text-[28px] md:text-[32px]">
            {name}
          </h1>
          <h2 className="text-soft-400 mt-1 text-[18px] leading-[100%] font-medium tracking-[-2%] sm:text-[20px] md:text-[24px] lg:text-[32px]">
            {league}
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-soft-400 mb-1 text-[12px] sm:text-[14px]">
            Index Price:
          </p>
          <span className="flex flex-row items-center gap-1">
            <h1 className="text-text-primary text-[24px] font-medium sm:text-[28px] md:text-[32px]">
              ${indexPrice.toFixed(2)}
            </h1>
            <ArrowUp className="text-light-green h-[16px] w-[12px] sm:h-[20px] sm:w-[15px]" />
          </span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex shrink-0 flex-row flex-wrap items-start justify-start gap-2 px-[16px] pb-[16px] sm:px-[20px] sm:pb-[18px] md:px-[24px] md:pb-[30px] lg:px-[30px]">
        <Button
          variant="outline"
          className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
        >
          🏅 <span className="text-[13px] md:text-[14px]">{percentile}st</span>
        </Button>
        <Button
          variant="outline"
          className="h-[32px] px-[12px] text-[12px] sm:h-[36px] sm:px-[16px] sm:text-[14px]"
        >
          <Image
            src={logoUrl}
            alt={abbreviation}
            width={16}
            height={16}
            className="mr-1 sm:h-5 sm:w-5"
          />
          {abbreviation}
        </Button>
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
          {performance.toFixed(1)}%
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
  );
}
