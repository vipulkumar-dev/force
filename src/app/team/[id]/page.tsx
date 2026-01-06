"use client";

import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getTeamById, getPlayersByTeamId } from "@/lib/data/teams-and-players";
import { ArrowLeft, BellPlus, ChartBar, Info, Search, Filter, LayoutGrid, LayoutList, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TeamPage() {
  const params = useParams();
  const teamId = params.id as string;
  
  const team = getTeamById(teamId);
  const players = getPlayersByTeamId(teamId);
  
  const [activeTab, setActiveTab] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("50.00");
  const [leverage, setLeverage] = useState(6);
  const [chartTab, setChartTab] = useState<"chart" | "feed" | "orderbook">("chart");
  const [timeRange, setTimeRange] = useState("1H");
  const [playerFilter, setPlayerFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);

  if (!team) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-page-background pt-[117px] px-4">
        <h1 className="text-4xl font-bold text-main mb-4">404</h1>
        <p className="text-soft-400 mb-8">Team not found</p>
        <Link href="/">
          <button className="px-4 py-2 bg-main text-white rounded-lg">Go Home</button>
        </Link>
      </div>
    );
  }

  const marginRequired = (parseFloat(amount) / leverage).toFixed(2);
  const estimatedFees = (parseFloat(amount) * 0.001).toFixed(2);
  const liquidationPrice = "48.32";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="team"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full bg-page-background pt-[117px] min-h-screen">
          {/* Main Content */}
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-[168px] py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left: Team Card */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Hero Section */}
                <div className="bg-white rounded-[20px] overflow-hidden">
                  <div 
                    className="relative h-[400px] flex flex-col p-5"
                    style={{
                      background: `linear-gradient(180deg, rgba(16, 16, 18, 0.35) 0%, rgba(16, 16, 18, 0.00) 100%), ${team.bgColor || '#AFAFBC'}`
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between relative z-10">
                      <Link href="/">
                        <div className="flex items-center gap-2.5 cursor-pointer">
                          <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white">
                            <ArrowLeft className="w-[15px] h-[15px] text-main" />
                          </div>
                          <span className="text-white text-[12px] font-medium">Back to Live</span>
                        </div>
                      </Link>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-2.5 h-7 bg-main/20 backdrop-blur-[10px] rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3ADC88]" />
                          <span className="text-white text-[12px] font-medium">Live</span>
                        </div>
                        <div className="w-px h-[18px] bg-white/30" />
                        <button className="px-2.5 h-7 bg-page-background rounded-lg text-main text-[12px] font-medium">
                          Follow
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center bg-page-background rounded-lg">
                          <BellPlus className="w-3.5 h-3.5 text-main" />
                        </button>
                      </div>
                    </div>

                    {/* Team Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[327px] h-[202px]">
                      <Image
                        src={team.logoUrl}
                        alt={team.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[189px]"
                      style={{
                        background: 'linear-gradient(180deg, rgba(175, 175, 188, 0.00) 24.65%, #AFAFBC 92.06%)'
                      }}
                    />
                  </div>

                  {/* Team Info */}
                  <div className="p-5 pt-7.5 flex flex-col gap-5">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h1 className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-main">
                          {team.name}
                        </h1>
                        <p className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-soft-400 opacity-65">
                          {team.league}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span className="text-[12px] font-medium text-soft-400">Index Price</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-main">
                            $12.45
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3.33301V12.6663M8 3.33301L12 7.33301M8 3.33301L4 7.33301" stroke="#2D9F75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-1 px-3 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                        <span className="text-[16px]">🏅</span>
                        <span className="text-[12px] font-medium text-main">91st</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                        <div className="w-3 h-3 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                          <Image src="/icons/teams/lakers-logo.svg" alt="LAL" width={12} height={12} />
                        </div>
                        <span className="text-[12px] font-medium text-main">LAL</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                        <ChartBar className="w-3 h-3 text-soft-400" />
                        <span className="text-[12px] font-medium text-main">500</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-[14px] p-5 flex flex-col justify-between">
                    <span className="text-[12px] font-medium text-soft-400">League Rank</span>
                    <div className="flex items-start gap-0.5">
                      <span className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-main">#27</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3.33301V12.6663M8 3.33301L12 7.33301M8 3.33301L4 7.33301" stroke="#2D9F75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white rounded-[14px] p-5 flex flex-col justify-between">
                    <span className="text-[12px] font-medium text-soft-400">Performance</span>
                    <div className="flex items-start gap-0.5">
                      <span className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-main">80.6%</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3.33301V12.6663M8 3.33301L12 7.33301M8 3.33301L4 7.33301" stroke="#2D9F75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white rounded-[14px] p-5 flex flex-col justify-between">
                    <span className="text-[12px] font-medium text-soft-400">Multiple</span>
                    <div className="flex items-start gap-0.5">
                      <span className="text-[32px] font-medium leading-[32px] tracking-[-1px] text-main">1.8x</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3.33301V12.6663M8 3.33301L12 7.33301M8 3.33301L4 7.33301" stroke="#2D9F75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-[20px] p-5 pb-7.5 flex flex-col gap-5">
                  {/* Chart Tabs */}
                  <div className="flex items-center border-b border-[#F7F7F7]">
                    <button 
                      className={`w-[110px] py-1.5 pb-5 text-[13px] font-medium ${chartTab === 'chart' ? 'text-main border-b-2 border-[#EEEFEF]' : 'text-[#AAAABD] border-b border-[#F7F7F7]'}`}
                      onClick={() => setChartTab('chart')}
                    >
                      Chart
                    </button>
                    <button 
                      className={`w-[110px] py-1.5 pb-5 text-[13px] font-medium ${chartTab === 'feed' ? 'text-main border-b-2 border-[#EEEFEF]' : 'text-[#AAAABD] border-b border-[#F7F7F7]'}`}
                      onClick={() => setChartTab('feed')}
                    >
                      Live Feed
                    </button>
                    <button 
                      className={`w-[110px] py-1.5 pb-5 text-[13px] font-medium ${chartTab === 'orderbook' ? 'text-main border-b-2 border-[#EEEFEF]' : 'text-[#AAAABD] border-b border-[#F7F7F7]'}`}
                      onClick={() => setChartTab('orderbook')}
                    >
                      Order book
                    </button>
                  </div>

                  {/* Chart Header */}
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[40px] font-medium leading-[44px] tracking-[-1px] text-main">31.5</span>
                        <div className="flex items-center gap-1 py-1.75">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M4 0L7.4641 6H0.535898L4 0Z" fill="#25AB7A"/>
                          </svg>
                          <span className="text-[13px] font-medium text-[#25AB7A]">2.4%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 px-3 px-2 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.5153 4.72849C12.0012 7.56988 10.8061 11.3766 7.39256 11.9296C2.92282 12.892 -0.0591976 7.52888 3.29892 4.38466C3.47833 4.2107 3.97246 3.76027 4.17869 3.61559C4.17869 3.91666 4.44929 6.2485 4.87248 6.07217C6.61356 6.07217 7.08086 3.01345 6.84065 1.20703C8.40761 2.01183 9.73503 3.13294 10.5153 4.72849Z" stroke="#25AB7A" strokeWidth="1.23845" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[12px] font-medium text-[#25AB7A]">+$3.27</span>
                          <span className="text-[12px] font-medium text-main">Earning Today</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                          <span className="text-[12px] font-medium text-soft-400">Funding</span>
                          <span className="text-[12px] font-medium text-[#E13F5E]">-0.03%</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                          <span className="text-[12px] font-medium text-soft-400">Vol</span>
                          <span className="text-[12px] font-medium text-main">12.5K</span>
                        </div>
                        <div className="flex items-center gap-1 px-2 h-7 rounded-lg border border-[#EAEBEC] bg-white">
                          <Info className="w-3 h-3 text-soft-400" />
                          <span className="text-[12px] font-medium text-soft-400">Route:</span>
                          <span className="text-[12px] font-medium text-main">Partner</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {['1H', '6H', '1D', '1W', '1M', 'ALL'].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-2 py-2 rounded-lg text-[12px] font-medium ${
                            timeRange === range ? 'bg-page-background text-main' : 'text-soft-400'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="w-full h-[306px] bg-page-background rounded-lg flex items-center justify-center text-soft-400">
                    Chart Visualization
                  </div>

                  {/* Time Labels */}
                  <div className="flex justify-between items-center px-5 text-[12px] font-medium text-soft-400">
                    {['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'].map((time) => (
                      <span key={time}>{time}</span>
                    ))}
                  </div>
                </div>

                {/* Player Table */}
                <div className="bg-white rounded-[20px] overflow-hidden">
                  {/* Table Header */}
                  <div className="flex justify-between items-center p-4 border-b border-[#F7F7F7]">
                    <div className="flex items-center gap-1.5">
                      {['All Players', 'Guards', 'Forwards', 'Centers'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setPlayerFilter(filter.toLowerCase().replace(' ', ''))}
                          className={`px-2 py-2 rounded-lg text-[12px] font-medium ${
                            playerFilter === filter.toLowerCase().replace(' ', '') 
                              ? 'bg-page-background text-main' 
                              : 'text-soft-400'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="flex items-center gap-1 px-3 h-8 rounded-full bg-[#F7F7F7]">
                        <Search className="w-[15px] h-[15px] text-soft-400" />
                        <input 
                          type="text" 
                          placeholder="Search player" 
                          className="bg-transparent text-[12px] font-medium text-soft-400 outline-none w-[150px]"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7]">
                          <Filter className="w-4 h-4 text-soft-400" />
                        </button>
                        <div className="flex items-center h-8 rounded-lg border border-[#EAEBEC]">
                          <button 
                            onClick={() => setViewMode('grid')}
                            className={`w-6 h-6 flex items-center justify-center rounded ${viewMode === 'grid' ? '' : ''}`}
                          >
                            <LayoutGrid className="w-[15px] h-[15px] text-[#AAAABD]" />
                          </button>
                          <button 
                            onClick={() => setViewMode('list')}
                            className={`w-6 h-6 flex items-center justify-center rounded ${viewMode === 'list' ? 'bg-[#F7F7F7]' : ''}`}
                          >
                            <LayoutList className="w-[15px] h-[15px] text-main" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-1">
                    <div className="bg-[#F7F7F7] rounded-[14px] p-1 flex flex-col gap-1">
                      {/* Table Header Row */}
                      <div className="flex items-center gap-5 px-3 py-2.5">
                        <div className="w-[320px]">
                          <span className="text-[11px] font-medium text-soft-400">Player</span>
                        </div>
                        <div className="w-[160px]">
                          <span className="text-[11px] font-medium text-soft-400">Chart</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-[11px] font-medium text-soft-400">Price</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-[11px] font-medium text-soft-400">Volume</span>
                        </div>
                        <div className="w-[140px]">
                          <span className="text-[11px] font-medium text-soft-400">Performance</span>
                        </div>
                        <div className="w-[68px]">
                          <span className="text-[11px] font-medium text-soft-400">Actions</span>
                        </div>
                      </div>

                      {/* Player Rows */}
                      {players.slice(0, 6).map((player) => (
                        <div key={player.id} className="bg-white rounded-[14px] flex items-center gap-5 p-3">
                          <div className="w-[320px] flex items-center gap-3 pr-10">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                <Image 
                                  src={player.imageUrl} 
                                  alt={player.name} 
                                  width={32} 
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-[13px] font-semibold text-main">{player.name}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#F7F7F7]">
                              <span className="text-[12px] font-medium text-soft-400">F</span>
                              <span className="text-[12px] font-medium text-soft-400">80%</span>
                            </div>
                          </div>
                          <div className="w-[160px] flex items-center gap-1.5">
                            <Image src="/icons/teams/lakers-logo.svg" alt="LAL" width={24} height={24} />
                            <span className="text-[12px] font-medium text-main">LAL</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-[12px] font-medium text-main">$2,315</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-[12px] font-medium text-[#25AB7A]">+$2,314</span>
                          </div>
                          <div className="w-[140px]">
                            <div className="w-[104px] h-[21px] bg-gray-100 rounded" />
                          </div>
                          <div className="w-[68px] flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7]">
                              <ArrowUpRight className="w-[15px] h-[15px] text-[#25AB7A]" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F7F7F7]">
                              <ArrowDownRight className="w-[15px] h-[15px] text-[#E13F5E]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-1 text-[12px] font-medium">
                      <span className="text-soft-400">Showing</span>
                      <span className="text-main">1-10</span>
                      <span className="text-soft-400">of</span>
                      <span className="text-main">32</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="w-3 h-3 flex items-center justify-center">
                        <ChevronLeft className="w-3 h-3 text-[#AAAABD]" />
                      </button>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, '...', 4].map((page, idx) => (
                          <button
                            key={idx}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            className={`w-7 px-2 py-2 rounded-lg text-[12px] font-medium ${
                              currentPage === page ? 'bg-[#F7F7F7] text-main' : 'text-soft-400'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button className="w-3 h-3 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-[#AAAABD]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Order Panel */}
              <div className="lg:w-[357px] bg-white rounded-[20px] p-5 flex flex-col gap-5 h-fit sticky top-[133px]">
                {/* Order Tabs */}
                <div className="flex border-b border-[#F7F7F7]">
                  <button 
                    className={`flex-1 py-1.5 pb-5 text-[13px] font-medium ${activeTab === 'long' ? 'text-main border-b-2 border-[#EEEFEF]' : 'text-[#AAAABD] border-b border-[#F7F7F7]'}`}
                    onClick={() => setActiveTab('long')}
                  >
                    Long
                  </button>
                  <button 
                    className={`flex-1 py-1.5 pb-5 text-[13px] font-medium ${activeTab === 'short' ? 'text-main border-b-2 border-[#EEEFEF]' : 'text-[#AAAABD] border-b border-[#F7F7F7]'}`}
                    onClick={() => setActiveTab('short')}
                  >
                    Short
                  </button>
                </div>

                {/* Order Content */}
                <div className="flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-6">
                    {/* Market/Limit Tabs */}
                    <div className="flex gap-1">
                      <button 
                        className={`px-2 py-2 rounded-lg text-[12px] font-medium ${orderType === 'market' ? 'bg-page-background text-main' : 'text-soft-400'}`}
                        onClick={() => setOrderType('market')}
                      >
                        Market
                      </button>
                      <button 
                        className={`px-2 py-2 rounded-lg text-[12px] font-medium ${orderType === 'limit' ? 'bg-page-background text-main' : 'text-soft-400'}`}
                        onClick={() => setOrderType('limit')}
                      >
                        Limit
                      </button>
                    </div>

                    {/* Amount Input */}
                    <div className="flex items-center gap-1 px-4 py-4 bg-[#F7F7F7] rounded-lg">
                      <span className="text-[20px] font-medium leading-[22px] tracking-[-0.4px] text-[#AAAABD]">$</span>
                      <input 
                        type="text" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-transparent text-[20px] font-medium leading-[22px] tracking-[-0.4px] text-main outline-none"
                      />
                    </div>

                    {/* Leverage */}
                    <div className="flex flex-col gap-3.5">
                      <span className="text-[13px] font-medium text-main">Leverage</span>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 flex flex-col gap-3.5">
                          <div className="relative h-1 bg-page-background rounded-full">
                            <div 
                              className="absolute h-1 bg-main rounded-full" 
                              style={{width: `${(leverage / 10) * 100}%`}}
                            />
                            <div 
                              className="absolute w-[15px] h-[15px] bg-white rounded-full shadow-lg -top-[7px] flex items-center justify-center"
                              style={{left: `calc(${(leverage / 10) * 100}% - 7.5px)`}}
                            >
                              <div className="w-[9.7px] h-[9.7px] bg-[#F7F7F7] rounded-full" />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                              <span key={val} className="text-[10px] font-medium text-soft-400 w-5 text-center">
                                {val}x
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="w-[50px] h-10 flex items-center justify-center bg-[#F7F7F7] rounded-lg">
                          <span className="text-[13px] font-semibold text-main">{leverage}x</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Side</span>
                        <span className="text-[13px] font-medium text-[#25AB7A]">Long</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Order Value</span>
                        <span className="text-[13px] font-medium text-main">${amount}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Margin Required</span>
                        <span className="text-[13px] font-medium text-main">${marginRequired}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Leverage</span>
                        <span className="text-[13px] font-medium text-main">{leverage}x</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Est. Fees</span>
                        <span className="text-[13px] font-medium text-main">${estimatedFees}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-[13px] font-normal text-[#AAAABD]">Liq Price</span>
                        <span className="text-[13px] font-medium text-main">${liquidationPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-4 pb-1.5">
                  <button className="w-full py-4 px-5 bg-main rounded-lg text-white text-[12px] font-semibold">
                    Confirm Market Order
                  </button>
                  <p className="text-[11px] font-normal text-[#AAAABD] text-center leading-[13px]">
                    Order will execute immediately at the best avail price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
