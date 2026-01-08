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
        <div className="flex h-[32px] flex-row items-center justify-center gap-[6px] bg-transparent hover:cursor-pointer">
          <div className="rounded-lg bg-[#7100FF] p-2 text-white">
            <WalletIcon
              className="h-full w-full text-white"
              width={15}
              height={15}
            />
          </div>
          <p className="text-text-primary text-[12px] leading-[100%] font-semibold tracking-tight">
            $1,234
          </p>
        </div>
      </PopoverTrigger>
      <PopoverAnchor asChild>
        <div className="pointer-events-none absolute top-[56px] right-[30px] h-[1px] w-[1px]" />
      </PopoverAnchor>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={0}
        className="z-[200] h-fit w-[342px] overflow-hidden rounded-[10px] border-black/5 bg-white p-0"
      >
        <PopoverClose asChild>
          <Button className="hover:bg-primary-foreground flex h-fit w-full flex-row justify-between gap-[20px] rounded-t-[10px] rounded-b-none bg-white py-[20px] hover:cursor-pointer">
            <p className="font-nohemi text-soft-400 text-[14px] leading-[100%] font-medium tracking-[2%]">
              My Wallet
            </p>
            <X className="text-soft-400" width={14} height={14} />
          </Button>
        </PopoverClose>

        <div className="flex w-full flex-col gap-[20px] rounded-[10px] bg-white p-[20px]">
          <Tabs>
            <TabsList>
              <TabsTrigger value="balance">Force</TabsTrigger>
              <TabsTrigger value="transactions">USDC</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <h1 className="text-text-primary text-[40px] leading-[100%] font-semibold tracking-[-2%]">
                567.31
              </h1>
              <div className="flex h-[24px] w-[24px] flex-row items-center justify-center gap-[10px] rounded-[100px] bg-[#C777FF]">
                <Image
                  src="/icons/game/f-purple.svg"
                  alt="wallet"
                  width={8}
                  height={10}
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <h5 className="text-success text-[12px] leading-[140%] font-medium tracking-[-1%]">
                +$189.03
              </h5>
              <div className="text-soft-400 bg-success rounded-[4px] p-1 text-[12px] leading-[100%] font-medium tracking-[-1%] text-white">
                +3.27%
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row items-center justify-evenly">
            <Button
              lip="on"
              className="bg-soft-500 text-text-primary flex h-[80px] flex-col items-center justify-center gap-[8px] rounded-[8px] px-[16px] hover:cursor-pointer"
            >
              <Plus className="text-text-primary" width={20} height={20} />
              <p className="text-soft-400 text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Add Funds
              </p>
            </Button>
            <Button
              lip="on"
              className="bg-soft-500 text-text-primary flex h-[80px] flex-col items-center justify-center gap-[8px] rounded-[8px] px-[16px] hover:cursor-pointer"
            >
              <ArrowDown className="text-text-primary" width={20} height={20} />
              <p className="text-soft-400 text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Withdraw
              </p>
            </Button>
            <Button
              lip="on"
              className="bg-soft-500 text-text-primary flex h-[80px] flex-col items-center justify-center gap-[8px] rounded-[8px] px-[16px] hover:cursor-pointer"
            >
              <ArrowUp className="text-text-primary" width={20} height={20} />
              <p className="text-soft-400 text-[14px] leading-[140%] font-medium tracking-[-1%]">
                Transfer
              </p>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
