"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarketModal from "./market-modal";

export default function BestAthlete() {
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const [openSide, setOpenSide] = useState<"long" | "short" | null>(null);
  const [selectedMobileIndex, setSelectedMobileIndex] = useState<number | null>(
    null
  );

  // Rows data (same content you have, now centralized)
  const athletes = [
    {
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
    {
      name: "Stephen Curry",
      team: "Golden State Warriors",
      iconSrc: "/icons/players/stephen-curry.png",
      price: "$102.3",
      change: "-23%",
      volume: "$123.4k",
    },
    {
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$102.3",
      change: "-23%",
      volume: "$123.4k",
    },
    {
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
    {
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$102.3",
      change: "+23%",
      volume: "$123.4k",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";

  return (
    <div className="flex flex-col rounded-[10px] bg-white w-full">
      <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
        <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
          Best Athletes to Trade
        </p>
        <ChevronRight className="text-soft-400" width={14} height={14} />
      </Button>
      <div className="w-full flex flex-col p-[4px]">
        <div className="hidden md:flex flex-row w-full">
          <div className="w-[30%] py-[12px] px-[16px] gap-[24px]">
            <p className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
              Athlete Name
            </p>
          </div>
          <div className="w-[17%] py-[12px] px-[16px] gap-[24px]">
            <p className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
              Current Price
            </p>
          </div>
          <div className="w-[17%] py-[12px] px-[16px] gap-[24px]">
            <p className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
              24h Change
            </p>
          </div>
          <div className="w-[17%] py-[12px] px-[16px] gap-[24px]">
            <p className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
              24h Volume
            </p>
          </div>
          <div className="w-[21%] py-[12px] px-[16px] gap-[24px]">
            <p className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
              Quick Trade
            </p>
          </div>
        </div>

        {athletes.map((row, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedMobileIndex(idx)}
            className={`flex flex-col md:flex-row w-full gap-[8px] md:gap-0 transition-colors duration-200 ease-out ${
              idx >= 3 ? "hidden md:flex" : ""
            }  md:hover:bg-primary-foreground md:border-b-0 ${
              selectedMobileIndex === idx ? "bg-primary-foreground" : ""
            }`}
          >
            <div className="md:hidden w-full flex flex-col gap-3 py-[12px] px-[16px]">
              <div className="flex items-center justify-between gap-[10px]">
                <div className="flex flex-row gap-[10px]">
                  <Image
                    src={row.iconSrc}
                    alt={row.name}
                    width={32}
                    height={32}
                    className="rounded-[6px] max-w-[32px] max-h-[32px]"
                  />
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-medium text-[14px] text-main leading-[100%] tracking-[-2%]">
                      {row.name}
                    </p>
                    <p className="text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
                      {row.team}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
                  {row.price}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`font-medium text-[14px] leading-[100%] tracking-[-2%] ${changeClass(
                    row.change
                  )}`}
                >
                  {row.change}
                </p>
                <p
                  className={`font-medium text-[14px] leading-[100%] tracking-[-2%] ${changeClass(
                    row.change
                  )}`}
                >
                  {row.volume}
                </p>
              </div>
            </div>

            <div className="hidden md:flex w-full md:w-[30%] flex-row rounded-[10px] py-[12px] px-[16px] gap-[10px]">
              <Image
                src={row.iconSrc}
                alt={row.name}
                width={32}
                height={32}
                className="rounded-[6px] max-w-[32px] max-h-[32px]"
              />
              <div className="flex flex-col gap-[8px]">
                <p className="font-medium text-[14px] text-main leading-[100%] tracking-[-2%]">
                  {row.name}
                </p>
                <p className="text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
                  {row.team}
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-col md:flex-row w-full md:w-[17%] py-[12px] px-[16px] gap-[6px] md:gap-[16px]">
              <p className="md:hidden text-[11px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
                Current Price
              </p>
              <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main">
                {row.price}
              </p>
            </div>

            <div className="hidden md:flex flex-col md:flex-row w-full md:w-[17%] py-[12px] px-[16px] gap-[6px] md:gap-[16px]">
              <p className="md:hidden text-[11px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
                24h Change
              </p>
              <p
                className={`font-medium text-[14px] leading-[100%] tracking-[-2%] ${changeClass(
                  row.change
                )}`}
              >
                {row.change}
              </p>
            </div>

            <div className="hidden md:flex flex-col md:flex-row w-full md:w-[17%] py-[12px] px-[16px] gap-[6px] md:gap-[16px]">
              <p className="md:hidden text-[11px] font-medium leading-[100%] tracking-[-1%] text-soft-400">
                24h Volume
              </p>
              <p
                className={`font-medium text:[14px] leading-[100%] tracking-[-2%] ${changeClass(
                  row.change
                )}`}
              >
                {row.volume}
              </p>
            </div>

            <div className="hidden md:flex w-full md:w-[21%] flex flex-row py-[12px] px-[16px] gap-[8px] items-center">
              <Dialog
                open={openDialog === idx && openSide === "long"}
                onOpenChange={(open) => {
                  if (!open) setOpenSide(null);
                  setOpenDialog(open ? idx : null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("long")}
                    className="flex flex-row items-center justify-center rounded-[7px] py-[10px] px-[12px] gap-[8px] h-[32px] bg-main border border-main hover:cursor-pointer"
                  >
                    <p className="text-[12px] font-medium leading-[130%] tracking-[-1%] text-white">
                      Long
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="bg-white w-[400px] px-0 py-0 max-h-[700px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  showCloseButton={false}
                >
                  <MarketModal type="long" />
                </DialogContent>
              </Dialog>

              <Dialog
                open={openDialog === idx && openSide === "short"}
                onOpenChange={(open) => {
                  if (!open) setOpenSide(null);
                  setOpenDialog(open ? idx : null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    lip="on"
                    onClick={() => setOpenSide("short")}
                    className="flex flex-row items-center justify-center rounded-[7px] py-[10px] px-[12px] gap-[8px] h-[32px] bg-white border border-main/7 hover:bg-primary-foreground hover:cursor-pointer"
                  >
                    <p className="text-[12px] font-medium leading-[130%] tracking-[-1%] text-dark-900">
                      Short
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="bg-white w-[400px] px-0 py-0 max-h-[700px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  showCloseButton={false}
                >
                  <MarketModal type="short" />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
        <div className="md:hidden w-full flex gap-2 px-[16px] pb-[16px]">
          <Button
            lip="on"
            disabled={selectedMobileIndex === null}
            onClick={() => {
              if (selectedMobileIndex !== null) {
                setOpenSide("long");
                setOpenDialog(selectedMobileIndex);
              }
            }}
            className="w-1/2 flex items-center justify-center rounded-[7px] py-[10px] px-[12px] h-[40px] bg-main border border-main text-white disabled:opacity-50"
          >
            Long
          </Button>
          <Button
            lip="on"
            disabled={selectedMobileIndex === null}
            onClick={() => {
              if (selectedMobileIndex !== null) {
                setOpenSide("short");
                setOpenDialog(selectedMobileIndex);
              }
            }}
            className="w-1/2 flex items-center justify-center rounded-[7px] py-[10px] px-[12px] h-[40px] bg-white border border-main/7 hover:bg-primary-foreground text-main disabled:opacity-50"
          >
            Short
          </Button>
        </div>
        <Dialog
          open={openDialog !== null && openSide !== null}
          onOpenChange={(open) => {
            if (!open) {
              setOpenSide(null);
              setOpenDialog(null);
            }
          }}
        >
          <DialogContent
            className="bg-white w-[400px] px-0 py-0 max-h-[700px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            showCloseButton={false}
          >
            <MarketModal type={openSide ?? "long"} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
