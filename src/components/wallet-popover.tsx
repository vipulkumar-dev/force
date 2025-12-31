"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./ui/popover";
import { X, Plus, WalletIcon, ArrowDown, ArrowUp } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
export default function WalletPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center justify-center h-[32px] bg-transparent gap-[6px] hover:cursor-pointer">
          <div className="rounded-lg bg-[#7100FF] p-2 text-white">
            <WalletIcon className="text-white w-full h-full" width={15} height={15} />
          </div>
          <p className="font-semibold text-[12px] leading-[100%] tracking-tight text-main">
            $1,234
          </p>
        </div>
      </PopoverTrigger>
      <PopoverAnchor asChild>
        <div className="absolute right-[30px] top-[56px] h-[1px] w-[1px] pointer-events-none" />
      </PopoverAnchor>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={0}
        className="z-[200] bg-white border-black/5 rounded-[10px] p-0 w-[342px] h-fit overflow-hidden"
      >
        <PopoverClose asChild>
          <Button className="flex flex-row w-full h-fit justify-between py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer rounded-t-[10px] rounded-b-none">
            <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-soft-400">
              My Wallet
            </p>
            <X className="text-soft-400" width={14} height={14} />
          </Button>
        </PopoverClose>

        <div className="w-full bg-white flex flex-col p-[20px] gap-[20px] rounded-[10px]">
          <Tabs>
            <TabsList>
              <TabsTrigger value="balance">Force</TabsTrigger>
              <TabsTrigger value="transactions">USDC</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <h1 className="font-semibold text-[40px] leading-[100%] tracking-[-2%] text-main">567.31</h1>
              <div className="flex flex-row items-center justify-center w-[24px] h-[24px] rounded-[100px] gap-[10px] bg-[#C777FF]">
                <Image src="/icons/game/f-purple.svg" alt="wallet" width={8} height={10}/>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <h5 className="font-medium text-[12px] leading-[140%] tracking-[-1%] text-success">+$189.03</h5>
              <div className="text-[12px] font-medium leading-[100%] tracking-[-1%] text-soft-400 bg-success p-1 rounded-[4px] text-white">+3.27%</div>
            </div>
          </div>

          <div className="flex flex-row w-full items-center justify-evenly">
            <Button
              lip="on"
              className="flex flex-col items-center justify-center rounded-[8px] h-[80px] px-[16px] gap-[8px] bg-soft-500 text-main hover:cursor-pointer"
            >
              <Plus className="text-main" width={20} height={20} />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%] text-soft-400">
                Add Funds
              </p>
            </Button>
            <Button
              lip="on"
              className="flex flex-col items-center justify-center rounded-[8px] h-[80px] px-[16px] gap-[8px] bg-soft-500 text-main hover:cursor-pointer"
            >
              <ArrowDown className="text-main" width={20} height={20} />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%] text-soft-400">
                Withdraw
              </p>
            </Button>
            <Button
              lip="on"
              className="flex flex-col items-center justify-center rounded-[8px] h-[80px] px-[16px] gap-[8px] bg-soft-500 text-main hover:cursor-pointer"
            >
              <ArrowUp className="text-main" width={20} height={20} />
              <p className="font-medium text-[14px] leading-[140%] tracking-[-1%] text-soft-400">
                Transfer
              </p>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
