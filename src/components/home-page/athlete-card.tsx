"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MarketModal from "./market-modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AthleteCardProps {
  index?: number;
  id?: string | number;
  athleteName: string;
  athleteImage: string;
  team: string;
  price: string;
  percentage: string;
  backgroundColor?: string;
  isPositive?: boolean;
  mode?: "grid" | "list";
  volume?: string; // used in list mode
}

export default function AthleteCard({
  index,
  id,
  athleteName,
  athleteImage,
  team,
  price,
  percentage,
  backgroundColor = "bg-dark-yellow",
  isPositive = true,
  mode = "grid",
  volume,
}: AthleteCardProps) {
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" &&
          window.matchMedia("(max-width: 768px)").matches,
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mode === "list") {
    return (
      <div
        className="flex flex-row w-full items-center rounded-[10px] border border-black/5 p-5 gap-8 bg-white hover:cursor-pointer transition-colors duration-200 hover:bg-primary-foreground"
        onClick={() => id && router.push(`/athlete/${id}`)}
      >
        {index !== undefined && (
          <div className="w-[4%] flex flex-row items-center">
            <div className="flex flex-row items-center justify-center w-8 rounded-[100px] border border-light-gray bg-white py-1.5 gap-1">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-sub-500 text-center">
                #{index}
              </p>
            </div>
          </div>
        )}
        <div
          className={`flex flex-row ${
            index !== undefined ? "w-[51%]" : "w-[55%]"
          } gap-4 items-center`}
        >
          <div
            className={`relative w-12 h-12 rounded-md ${backgroundColor} overflow-hidden`}
          >
            <Image
              src="/icons/athletes/logo.png"
              alt="Logo"
              fill
              className="object-cover object-top opacity-8 mix-blend-screen"
            />
            <Image
              src={athleteImage}
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
              {team}
            </p>
          </div>
        </div>

        <p className="font-medium w-[10.5%] text-[14px] leading-[100%] tracking-[-1%] text-main">
          {price}
        </p>
        <p
          className={`font-medium w-[10.5%] text-[14px] leading-[100%] tracking-[-1%] ${
            isPositive ? "text-light-green" : "text-neon-pink"
          }`}
        >
          {percentage}
        </p>
        <p className="font-medium w-[10.5%] text-[14px] leading-[100%] tracking-[-1%] text-light-green">
          {volume ?? "-"}
        </p>
        <Dialog
          open={openSide !== null}
          onOpenChange={(open) => {
            if (!open) setOpenSide(null);
          }}
        >
          <div className="w-[13.5%] flex flex-row gap-2.5 items-center">
            <DialogTrigger asChild>
              <Button
                lip="on"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSide("long");
                }}
                className="flex flex-row items-center justify-center rounded-[7px] py-2.5 px-3 gap-2 h-8 bg-main border border-main hover:cursor-pointer"
              >
                <p className="text-[12px] font-medium leading-[130%] tracking-[-1%] text-white">
                  Long
                </p>
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                lip="on"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSide("short");
                }}
                className="flex flex-row items-center justify-center rounded-[7px] py-2.5 px-3 gap-2 h-8 bg-white border border-main/7 hover:bg-primary-foreground hover:cursor-pointer"
              >
                <p className="text-[12px] font-medium leading-[130%] tracking-[-1%] text-dark-900">
                  Short
                </p>
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent
            fullscreen={isMobile}
            className={isMobile ? "overflow-auto z-[200]" : "bg-white w-[400px] px-0 py-0 max-h-[700px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"}
            showCloseButton={false}
          >
            <MarketModal type={openSide ?? "long"} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // grid mode
  return (
    <div
      className="flex flex-col w-[340px] md:w-full rounded-[10px] p-1 gap-1 bg-white hover:cursor-pointer"
      onClick={() => id && router.push(`/athlete/${id}`)}
    >
      <div
        className={`relative w-full h-[210px] rounded-md ${backgroundColor} overflow-hidden`}
      >
        <Image
          src="/icons/athletes/logo.png"
          alt="Logo"
          fill
          className="object-cover object-top opacity-8 mix-blend-screen"
        />
        <Image
          src={athleteImage}
          alt={athleteName}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-col w-full min-w-0 p-3 sm:p-4 gap-3 sm:gap-4">
        <div className="flex flex-col gap-2 w-full min-w-0">
          <p className="font-medium text-[14px] sm:text-[14px] leading-[100%] tracking-[-2%] text-main truncate">
            {athleteName}
          </p>
          <p className="text-[12px] leading-[100%] tracking-[-1%] text-soft-400 truncate">
            {team}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main">
            {price}
          </p>
          <p
            className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
              isPositive ? "text-light-green" : "text-neon-pink"
            }`}
          >
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
}
