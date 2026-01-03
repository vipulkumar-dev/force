"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "../ui/button";
import TrendingCard from "./trending-card";

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

export default function PriceTrendChart() {
    const [activeTab, setActiveTab] = useState("athletes");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

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
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between w-full px-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="flex flex-row gap-[8px] items-center bg-transparent p-0 h-auto">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="text-[14px] leading-[100%] font-semibold px-2 py-0 data-[state=active]:text-main data-[state=active]:shadow-none after:hidden cursor-pointer"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <div className="flex flex-row gap-2 items-center">
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
            {viewMode === "list" ? (
                <div className="w-full overflow-x-auto">
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
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
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
    )
}