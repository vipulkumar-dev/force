"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";

type LeagueOption = { id: string; label: string; icon: string };

export default function LeagueSwitcher({
  selected,
  options,
  onChange,
  className,
}: {
  selected: LeagueOption;
  options: LeagueOption[];
  onChange: (opt: LeagueOption) => void;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`flex flex-row h-[28px] w-[150px] rounded-lg items-center justify-between bg-page-background my-2 px-[12px] hover:bg-primary-foreground hover:cursor-pointer ${
            className ?? ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={selected.icon}
              alt={selected.label}
              width={18}
              height={18}
              className="rounded-1"
            />
            <span className="text-[13px] font-medium text-main">
              {selected.label}
            </span>
          </div>
          <ChevronDown size={14} className="text-soft-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-[220px] p-2 bg-white"
      >
        <div className="flex flex-col max-h-[300px] overflow-auto">
          {options.map((opt, index) => {
            const active = opt.id === selected.id;
            const isFirstOption = index === 0;

            if (isFirstOption) {
              return (
                <PopoverClose asChild key={opt.id}>
                  <button
                    onClick={() => onChange(opt)}
                    className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md hover:bg-primary-foreground ${
                      active ? "bg-primary-foreground" : ""
                    }`}
                  >
                    <Image
                      src={opt.icon}
                      alt={opt.label}
                      width={20}
                      height={20}
                      className="rounded-[4px]"
                    />
                    <span className="text-[13px] text-main">{opt.label}</span>
                  </button>
                </PopoverClose>
              );
            }

            return (
              <div key={opt.id} className="relative">
                <button
                  disabled
                  className="flex items-center gap-3 w-full text-left px-2 py-2 rounded-md blur-[2px] opacity-60 cursor-not-allowed"
                >
                  <Image
                    src={opt.icon}
                    alt={opt.label}
                    width={20}
                    height={20}
                    className="rounded-[4px]"
                  />
                  <span className="text-[13px] text-main">{opt.label}</span>
                </button>
                <div className="absolute inset-0 flex items-center justify-end pr-2 pointer-events-none">
                  <span className="text-[11px] font-medium text-gray-500 bg-white/80 px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}