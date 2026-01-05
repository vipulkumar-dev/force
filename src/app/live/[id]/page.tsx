"use client";
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'
import Image from 'next/image'
import TodayGames from '@/components/home-page/trending';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
interface QuarterScore {
    quarter: string;
    team1Score: number;
    team2Score: number;
    isCurrent?: boolean;
}

export default function LivePage() {
    const [activeTab, setActiveTab] = useState('score-breakdown');
    const [activePlayerTab, setActivePlayerTab] = useState('all-players');
    const playerTabs =[
        {
            label: 'All Players',
            value: 'all-players',
        },
        {
            label: 'Lakers',
            value: 'lakers',
        },
        {
            label: 'Warriors',
            value: 'warriors',
        },
    ]
    const tabs = [
        {
            label: 'Score Breakdown',
            value: 'score-breakdown',
        },
        {
            label: 'Live Events',
            value: 'live-events',
        },
        {
            label: 'Orders',
            value: 'orders',
        },
        {
            label: 'Chart',
            value: 'chart',
        },
    ];

    // Score breakdown data
    const [quarterScores, setQuarterScores] = useState<QuarterScore[]>([
        { quarter: 'Q1', team1Score: 28, team2Score: 25 },
        { quarter: 'Q2', team1Score: 28, team2Score: 25 },
        { quarter: 'Q3', team1Score: 28, team2Score: 25, isCurrent: true },
        { quarter: 'Q4', team1Score: 0, team2Score: 0 },
    ]);

    // Calculate max score for scaling bars
    const maxScore = Math.max(
        ...quarterScores.map(q => Math.max(q.team1Score, q.team2Score)),
        30 // minimum max to ensure bars are visible
    );

    const getBarWidth = (score: number) => {
        if (score === 0) return 0;
        // Calculate width as percentage of max score
        // This ensures bars are proportional to their actual scores
        // Use 90% max width to leave some margin on each side
        return Math.min((score / maxScore) * 90, 90);
    };
    return (
        <AnimatePresence>
            <motion.div
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className='w-full flex flex-col bg-page-background justify-center pt-[117px]'>
                    <div className='w-full  h-[212px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] relative'>
                        <Image src='/images/moments/basketball-moment.png' alt='Live Banner' width={1000} height={212} className='w-full h-full object-cover object-[top_10%]' />
                    </div>
                    <div className='w-full flex flex-col items-center justify-center mt-[20px]'>
                        <h1>Live</h1>
                        <p>OQ3 | 5:15</p>
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-[24px] '>
                        {/* Team 1*/}
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-row items-center justify-center gap-10'>
                                <div className='flex flex-row items-center justify-center gap-1'>
                                    <h4 className='text-soft-400 font-medium text-[16px] font-bold'>Lakers</h4>
                                    <Image src='/icons/events/lal.png' alt='Team 1' width={32} height={32} />
                                </div>
                                <h1 className='text-main font-bold text-[48px] font-bold'>100</h1>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-6 mb-[20px]'>
                                <div className='flex flex-row items-center justify-center gap-1'>
                                    <h4 className='text-light-green font-medium text-[14px] font-bold'>+3.42%</h4>
                                    <h4 className='text-main font-medium text-[14px] font-bold'>$124.6</h4>
                                </div>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <button className='bg-white rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/long.svg' alt='Long' width={10} height={10} /></button>
                                    <button className='bg-white rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/short.svg' alt='Short' width={10} height={10} /></button>
                                </div>
                            </div>
                        </div>

                        <div className='w-[1px] h-[60px] bg-soft-500'></div>

                        {/* Team 2*/}
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-row items-center justify-center gap-10'>

                                <h1 className='text-main font-bold text-[48px] font-bold'>100</h1>
                                <div className='flex flex-row items-center justify-center gap-1'>
                                    <Image src='/icons/events/gsw.png' alt='Team 1' width={32} height={32} />

                                    <h4 className='text-soft-400 font-medium text-[16px] font-bold'>Warriors</h4>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-6 mb-[20px]'>
                                <div className='flex flex-row items-center justify-center gap-2'>
                                    <button className='bg-white rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/long.svg' alt='Long' width={10} height={10} /></button>
                                    <button className='bg-white rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/short.svg' alt='Short' width={10} height={10} /></button>
                                </div>
                                <div className='flex flex-row items-center justify-center gap-1'>
                                    <h4 className='text-main font-medium text-[14px] font-bold'>$124.6</h4>
                                    <h4 className='text-light-green font-medium text-[14px] font-bold'>+3.42%</h4>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-soft-500'></div>
                    <div className='w-full flex flex-row items-center justify-evenly gap-[24px] my-[20px]'>
                        <div>
                            <h1 className='text-soft-400 font-medium text-[12px] font-bold'>Total Volume</h1>
                            <p className='text-main font-semibold text-[14px] font-bold'>$100,000</p>
                        </div>
                        <div>
                            <h1 className='text-soft-400 font-medium text-[12px] font-bold'>Spread</h1>
                            <p className='text-main font-semibold text-[14px] font-bold'>LAL -8.0</p>
                        </div>
                        <div>
                            <h1 className='text-soft-400 font-medium text-[12px] font-bold'>Projected Final</h1>
                            <p className='text-main font-semibold text-[14px] font-bold'>LAL 128 - 119 GSW</p>
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-soft-500'></div>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <div className='w-full flex flex-row items-center justify-center gap-[24px] mt-[20px] mb-[16px]'>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={`font-medium text-[12px] font-bold ${activeTab === tab.value ? 'text-main' : 'text-soft-400'}`}
                                    onClick={() => setActiveTab(tab.value)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className='w-full flex flex-col items-center justify-center px-4'>
                            {activeTab === 'score-breakdown' && (
                                <div className="w-full max-w-4xl mx-auto">
                                    <div className="w-full bg-white rounded-2xl p-6 md:p-8">
                                        <div className="w-full flex flex-col gap-4">
                                            {quarterScores.map((quarter, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full flex flex-row items-center gap-3 md:gap-4"
                                                >
                                                    {/* Team 1 (Left side - Purple bars) */}
                                                    <div className="flex-1 flex justify-end h-10 relative">
                                                        {quarter.team1Score > 0 ? (
                                                            <div
                                                                className="h-full rounded-full flex items-center justify-end pr-3"
                                                                style={{
                                                                    width: `${getBarWidth(quarter.team1Score)}%`,
                                                                    maxWidth: '100%',
                                                                    background: "linear-gradient(to right, #6e3ff3, #a78bfa)",
                                                                    minWidth: "60px",
                                                                }}
                                                            >
                                                                <span className="text-white text-sm font-bold whitespace-nowrap">
                                                                    {quarter.team1Score}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="h-full w-full"></div>
                                                        )}
                                                    </div>

                                                    {/* Quarter Label */}
                                                    <div className="flex items-center gap-2 min-w-[70px] justify-center shrink-0">
                                                        <span className="text-soft-400 font-medium text-sm">
                                                            {quarter.quarter}
                                                        </span>
                                                        {quarter.isCurrent && (
                                                            <div className="w-2 h-2 rounded-full bg-light-green"></div>
                                                        )}
                                                    </div>

                                                    {/* Team 2 (Right side - Blue bars) */}
                                                    <div className="flex-1 flex justify-start h-10 relative">
                                                        {quarter.team2Score > 0 ? (
                                                            <div
                                                                className="h-full rounded-full flex items-center justify-start pl-3"
                                                                style={{
                                                                    width: `${getBarWidth(quarter.team2Score)}%`,
                                                                    maxWidth: '100%',
                                                                    background: "linear-gradient(to right, #60a5fa, #375dfb)",
                                                                    minWidth: "60px",
                                                                }}
                                                            >
                                                                <span className="text-white text-sm font-bold whitespace-nowrap">
                                                                    {quarter.team2Score}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="h-full w-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'live-events' && (
                                <div className='w-full max-w-4xl mx-auto flex flex-col gap-4'>
                                    <div className='bg-soft-500 rounded-[14px] pt-2 p-4 w-full'>
                                        <Table className="border-separate border-spacing-y-2 w-full table-auto">
                                            <TableHeader>
                                                <TableRow className="border-0">
                                                    <TableHead className="text-muted-foreground text-[12px] font-medium leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Time</TableHead>
                                                    <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">Play</TableHead>
                                                    <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">DEL</TableHead>
                                                    <TableHead className="text-muted-foreground text-[12px] leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">CLE</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                                    <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>12:00</h4>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <div className='flex flex-row items-center gap-2'>
                                                            <Image src='/icons/events/gsw.png' alt='Team 1' width={32} height={32} />
                                                            <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>LeBron James makes a layup</h4>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>
                                                    </TableCell>

                                                    <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>

                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                                    <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>12:00</h4>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <div className='flex flex-row items-center gap-2'>
                                                            <Image src='/icons/events/gsw.png' alt='Team 1' width={32} height={32} />
                                                            <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>LeBron James makes a layup</h4>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>
                                                    </TableCell>

                                                    <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>

                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className="bg-white border-0 mb-2 rounded-[14px] hover:bg-white hover:cursor-pointer transition-colors duration-200 ease-out">
                                                    <TableCell className="font-medium px-4 py-3 rounded-tl-[14px] rounded-bl-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>12:00</h4>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <div className='flex flex-row items-center gap-2'>
                                                            <Image src='/icons/events/gsw.png' alt='Team 1' width={32} height={32} />
                                                            <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>LeBron James makes a layup</h4>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-3">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>
                                                    </TableCell>

                                                    <TableCell className="px-4 py-3 rounded-tr-[14px] rounded-br-[14px]">
                                                        <h4 className='text-main font-mediumtext-[12px] leading-[100%] tracking-[-2%] font-medium'>10</h4>

                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
<div className='w-full h-[1px] bg-soft-500'></div>
                                    <TodayGames />
                                    <div className='w-full h-[1px] bg-soft-500'></div>
                                    <div className='bg-soft-500 rounded-[14px] pt-2 p-4 w-full'>
                                    <Tabs value={activePlayerTab} onValueChange={setActivePlayerTab} className="w-full">
                                        <TabsList className="flex flex-row gap-[8px] items-center bg-transparent p-0 h-auto">
                                            {playerTabs.map((tab) => (
                                                <TabsTrigger key={tab.value} value={tab.value} className="text-[12px] font-medium leading-[100%] tracking-[-1%] border-0 whitespace-nowrap px-4 py-3">
                                                    {tab.label}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>
                                    </Tabs>
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M6.875 0.625L0.625 6.875M6.875 0.625H1.25M6.875 0.625V6.25" stroke="#25AB7A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                                                        <path d="M0.625 0.625L6.875 6.875M6.875 6.875V1.25M6.875 6.875H1.25" stroke="#E13F5E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
                                </div>
                            )}
                            {activeTab === 'orders' && (
                                <div className='w-full flex flex-col items-center justify-center'>
                                    <h1>Orders</h1>
                                </div>
                            )}
                            {activeTab === 'chart' && (
                                <div className='w-full flex flex-col items-center justify-center'>
                                    <h1>Chart</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}