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
          className={`bg-elevation-button hover:bg-elevation-button! my-2 flex h-[28px] flex-row items-center justify-between rounded-lg !px-[8px] hover:cursor-pointer ${
            className ?? ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={selected.icon}
              alt={selected.label}
              width={15}
              height={15}
              className="rounded-1"
            />
            <span className="text-text-primary text-[12px] font-medium">
              {selected.label}
            </span>
          </div>
          <ChevronDown size={12} className="text-text-secondary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="bg-elevation-card w-[220px] p-2"
      >
        <div className="flex max-h-[300px] flex-col overflow-auto">
          {options.map((opt, index) => {
            const active = opt.id === selected.id;
            return (
              <PopoverClose asChild key={opt.id}>
                <button
                  onClick={() => onChange(opt)}
                  className={`hover:bg-elevation-button flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left ${
                    active ? "bg-elevation-button" : ""
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
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
