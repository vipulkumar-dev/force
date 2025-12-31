"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./ui/popover";
import { X, Plus } from "lucide-react";

export default function BalancePopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button lip="on" className="flex flex-row items-center justify-center h-[32px] rounded-[100px] pr-[10px] pl-[4px] border border-black/5 gap-[6px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
          <div className="flex flex-row items-center justify-center w-[24px] h-[24px] rounded-[100px] gap-[10px] bg-main">
            <Image
              src="/logo-black.png"
              alt="Vibranium"
              width={14}
              height={13}
            />
          </div>
          <p className="font-semibold text-[12px] leading-[100%] tracking-tight text-main">
            0
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverAnchor asChild>
        <div className="absolute right-[30px] top-[56px] h-[1px] w-[1px] pointer-events-none" />
      </PopoverAnchor>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={0}
        className="z-200 bg-white border-black/5 rounded-[10px] p-0 w-[404px] h-fit overflow-hidden"
      >
        <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer rounded-t-[10px] rounded-b-none">
          <div className="flex flex-row gap-[10px] items-center">
            <div className="flex flex-row items-center justify-center w-[24px] h-[24px] rounded-[100px] gap-[10px] bg-main">
              <Image
                src="/logo-black.png"
                alt="Vibranium"
                width={14}
                height={13}
              />
            </div>
            <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
              My Wallet
            </p>
          </div>
          <X className="text-soft-400" width={14} height={14} />
        </Button>

        <div className="w-full bg-white flex flex-col p-[20px] gap-[20px] rounded-[10px]">
          <div className="flex flex-col gap-[10px] w-full items-center">
            <p className="text-[12px] leading-[130%] tracking-[-1%] text-soft-400">
              Current Balance
            </p>
            <p className="font-semibold text-[24px] leading-[100%] tracking-[-2%] text-main">
              0
            </p>
            <p className="text-[12px] leading-[130%] tracking-[-1%] text-soft-400">
              1 coin = 1 USD
            </p>
          </div>

          <div className="flex flex-col w-full gap-[10px]">
            <Button className="flex flex-row items-center justify-center rounded-[8px] h-[40px] px-[16px] gap-[8px] bg-main border border-main text-white hover:cursor-pointer">
              <Plus className="text-white" width={16} height={16} />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%]">
                Topup
              </p>
            </Button>
            <Button className="flex flex-row items-center justify-center rounded-[8px] h-[40px] px-[16px] gap-[8px] bg-white border border-main/7 text-main hover:bg-primary-foreground hover:cursor-pointer">
              <Image
                src="/icons/notifications/down-arrow.svg"
                alt="down-arrow"
                width={16}
                height={16}
              />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%]">
                Withdraw
              </p>
            </Button>
            <Button className="flex flex-row items-center justify-center rounded-[8px] h-[40px] px-[16px] gap-[8px] bg-white border border-main/7 text-main hover:bg-primary-foreground hover:cursor-pointer">
              <Image
                src="/icons/notifications/up-arrow.svg"
                alt="up-arrow"
                width={16}
                height={16}
              />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%]">
                Transfer
              </p>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
