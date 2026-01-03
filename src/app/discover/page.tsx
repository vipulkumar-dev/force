"use client";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DiscoverHeader from "@/components/discover-page/discover-header";
import TrendingNowTable from "@/components/discover-page/trending-now-table";
import MostTradedTable from "@/components/discover-page/most-traded-table";
import MissedMomentsTable from "@/components/discover-page/missed-moments-table";
import PriceTrendPage from "@/components/home-page/price-trend-page";
import AppFooter from "@/components/app-footer";
import {useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import TrendingCard from "@/components/home-page/trending-card";
export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const trendingRows = [
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/stephen-curry.png",
      athleteName: "Stephen Curry",
      athleteTeam: "Golden State Warriors",
      athleteColor: "bg-dark-blue",
      currentPrice: "$102.3",
      change: "-23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      currentPrice: "$102.3",
      change: "+23%",
      volume: "$5.9M",
    },
  ];

  const mostTradedRows = [
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/stephen-curry.png",
      athleteName: "Stephen Curry",
      athleteTeam: "Golden State Warriors",
      athleteColor: "bg-dark-blue",
      trades: "-8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      trades: "-8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/lebron-james.png",
      athleteName: "LeBron James",
      athleteTeam: "Los Angeles Lakers",
      athleteColor: "bg-dark-yellow",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
    {
      athleteSrc: "/icons/athletes/kevin-durant.png",
      athleteName: "Kevin Durant",
      athleteTeam: "Phoenix Suns",
      athleteColor: "bg-base-purple",
      trades: "+8.45%",
      funding: "0.0125%",
      openInterest: "$9,872,300",
    },
  ];

  const events = [
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
    {
      eventSrc: "/icons/discover/event.png",
      eventAlt: "event",
      title: "LeBron's 40-point night shakes the market",
      description:
        "LeBron James dropped a 40-point masterpiece against the Celtics, sparking a 12% surge in Lakers long positions overnight. Trading volume on “Lakers to win next 3 games” hit a new weekly high.",
      volume: "Volume surged to $5.6M",
      percentage: "Lakers long up +12.4%",
      timeAgo: "2 days ago",
    },
  ];
  interface AthleteData {
    id: string
    image?: string
    name: string
    abbreviation: string
    price: string
    change: number
    percentage?: number
}
  const athletesData: AthleteData[] = [
    {
        id: '1',
        image: '/icons/athletes/lebron-james.png',
        name: 'LeBron James',
        abbreviation: 'LAA',
        price: '$102.3',
        change: 3.27,
        percentage: 80,
    },
    {
        id: '2',
        image: '/icons/athletes/stephen-curry.png',
        name: 'Stephen Curry',
        abbreviation: 'GSW',
        price: '$98.5',
        change: -1.26,
        percentage: 75,
    },
    {
        id: '3',
        image: '/icons/athletes/kevin-durant.png',
        name: 'Kevin Durant',
        abbreviation: 'PHX',
        price: '$105.2',
        change: 2.15,
        percentage: 85,
    },

    {
        id: '4',
        image: '/icons/athletes/luka-doncic.png',
        name: 'Luka Doncic',
        abbreviation: 'DAL',
        price: '$108.9',
        change: -0.89,
        percentage: 78,
    },
    {
        id: '5',
        image: '/icons/athletes/jayson-tatum.png',
        name: 'Jayson Tatum',
        abbreviation: 'BOS',
        price: '$99.7',
        change: 2.45,
        percentage: 88,
    },
]
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col p-6 bg-page-background mt-[117px] h-fit overflow-hidden">
          {/* Main content container */}
          <div className="flex flex-col w-full max-w-[1360px] mx-auto pt-[24px] pb-6 gap-6">
            <DiscoverHeader viewMode={viewMode} setViewMode={setViewMode} />
            <div className="w-full flex flex-col gap-6">
            {viewMode === "list" ? (
                <div className="w-full overflow-x-auto bg-primary-foreground rounded-[14px]">
                    <Table className="border-separate border-spacing-y-2 w-full table-auto">
                        <TableHeader>
                            <TableRow className="border-0">
                                <TableHead className="text-muted-foreground text-[12px] font-medium leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Player</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Chart</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Price</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Volume</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Performance</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Rank</TableHead>
                                <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                    <div className='flex flex-row items-center gap-2'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                    <div className='flex flex-row items-center gap-2'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                    <div className='flex flex-row items-center gap-2'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                    <div className='flex flex-row items-center gap-2'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-2 py-3 rounded-tr-[14px] rounded-br-[14px] w-[1%]">
                                    <div className='flex flex-row items-center gap-2 shrink-0'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                    <div className="relative flex flex-row gap-2 items-center">
                                        <div className="relative w-8 h-8 rounded-full bg-dark-yellow overflow-hidden">
                                            <Image
                                                src="/icons/athletes/logo.png"
                                                alt="Logo"
                                                fill
                                                className="object-cover object-top opacity-8 mix-blend-screen"
                                            />
                                            <Image
                                                src="/icons/athletes/lebron-james.png"
                                                alt="LeBron James"
                                                fill
                                                className="object-cover object-top"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
                                            <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
                                        </div>
                                        <div className='flex flex-row items-center justify-center gap-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
                                            <Image src='/icons/game/f.svg' alt='Flag' width={8} height={10} />
                                            <span>80%</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <Image src='/icons/game/chart.png' alt='Chart' width={100} height={25} />
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$102.3</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <p className="text-main text-[12px] leading-[100%] tracking-[-2%] font-medium">$321.6k</p>
                                        <p className="text-light-green text-[12px] leading-[100%] tracking-[-1%] font-medium">+3.27%</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">86%</TableCell>
                                <TableCell className="px-4 py-3">#31</TableCell>
                                <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                    <div className='flex flex-row items-center gap-2'>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Long</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='bg-page-background rounded-lg hover:cursor-pointer p-3 flex items-center justify-center'>
                                                    <svg width="6" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Short</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="w-full overflow-x-auto">
                    <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {athletesData.map((athlete) => (
                            <div key={athlete.id} className="flex-shrink-0">
                                <TrendingCard
                                    id={athlete.id}
                                    image={athlete.image}
                                    name={athlete.name}
                                    abbreviation={athlete.abbreviation}
                                    price={athlete.price}
                                    change={athlete.change}
                                    percentage={athlete.percentage}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            </div>
          </div>
        </div>
        <AppFooter />
      </motion.div>
    </AnimatePresence>
  );
}
