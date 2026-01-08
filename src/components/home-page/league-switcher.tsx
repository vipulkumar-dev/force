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
          className={`bg-page-background hover:bg-primary-foreground my-2 flex h-[28px] w-[150px] flex-row items-center justify-between rounded-lg px-[12px] hover:cursor-pointer ${
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
            <span className="text-text-primary text-[13px] font-medium">
              {selected.label}
            </span>
          </div>
          <ChevronDown size={14} className="text-soft-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-[220px] bg-white p-2"
      >
        <div className="flex max-h-[300px] flex-col overflow-auto">
          {options.map((opt, index) => {
            const active = opt.id === selected.id;
            const isFirstOption = index === 0;

            if (isFirstOption) {
              return (
                <PopoverClose asChild key={opt.id}>
                  <button
                    onClick={() => onChange(opt)}
                    className={`hover:bg-primary-foreground flex w-full items-center gap-3 rounded-md px-2 py-2 text-left ${
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
                    <span className="text-text-primary text-[13px]">
                      {opt.label}
                    </span>
                  </button>
                </PopoverClose>
              );
            }

            return (
              <button
                key={opt.id}
                disabled
                className="flex w-full cursor-not-allowed items-center gap-3 rounded-md px-2 py-2 text-left opacity-60 blur-[6px]"
              >
                <Image
                  src={opt.icon}
                  alt={opt.label}
                  width={20}
                  height={20}
                  className="rounded-[4px]"
                />
                <span className="text-text-primary text-[13px]">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
