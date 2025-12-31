import { ListFilter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
interface DiscoverHeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function DiscoverHeader({ viewMode, setViewMode }: DiscoverHeaderProps) {
  const [activeTab, setActiveTab] = useState("athletes");
  const tabs = [
    {
      label: "Athletes",
      value: "athletes",
    },
    {
      label: "Teams",
      value: "teams",
    },
    {
      label: "Guards",
      value: "guards",
    },
    {
      label: "Forwards",
      value: "forwards",
    },
    {
      label: "Trending",
      value: "trending",
    },
    {
      label: "Volume",
      value: "volume",
    }
  ]
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-row items-center justify-between w-full px-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-row gap-[8px] items-center bg-transparent p-0 h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-[14px] leading-[100%] font-semibold px-2 py-0 data-[state=active]:text-main data-[state=active]:shadow-none after:hidden"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-row gap-2 items-center">
          <button className="p-2 rounded-lg transition-colors bg-white hover:cursor-pointer">
            <ListFilter width={18} height={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
              ? "bg-primary-foreground"
              : "bg-transparent hover:bg-primary-foreground"
              }`}
          >
            <Image src='/icons/grid.svg' alt='Grid view' width={18} height={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list"
              ? "bg-primary-foreground"
              : "bg-transparent hover:bg-primary-foreground"
              }`}
          >
            <Image src='/icons/list.svg' alt='List view' width={18} height={18} />
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center px-2">
        <div className="flex flex-row gap-2 items-center">
          {/* Positions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex flex-row gap-2 items-center bg-white rounded-[8px] text-[12px] leading-[100%] font-semibold data-[state=active]:text-main data-[state=active]:shadow-none after:hidden">Positions <ChevronDown width={18} height={18} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Guards
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Forwards
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Centers
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Price Range */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex flex-row gap-2 items-center bg-white rounded-[8px] text-[12px] leading-[100%] font-semibold data-[state=active]:text-main data-[state=active]:shadow-none after:hidden">Price Range <ChevronDown width={18} height={18} /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-[12px]" align="start">
              <div className="flex flex-col gap-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    From
                    <input type="text" placeholder="$" className="w-full bg-soft-500 rounded-[8px] px-2 py-1"/>
                  </div>
                  <div>
                    To 
                    <input type="text" placeholder="$" className="w-full bg-soft-500 rounded-[8px] px-2 py-1" />
                  </div>
                </div>
                <Button variant="default" className="w-full bg-secondary text-main font-semibold hover:bg-primary/90 hover:text-primary-foreground">Apply</Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-row gap-2 items-center bg-white rounded-[8px] text-[12px] leading-[100%] font-semibold px-2 py-1 data-[state=active]:text-main data-[state=active]:shadow-none after:hidden">
            Last 24 Hours
            <ChevronDown width={18} height={18} />
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg text-sm font-semibold px-2 py-1 cursor-pointer hover:bg-accent">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-medium">Sort by</span>
              <span className="font-semibold">Most Traded</span>
            </div>

            <ChevronDown width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
