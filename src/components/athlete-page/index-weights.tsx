"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

interface IndexWeightMetric {
  metric: string;
  description: string;
  weight: string;
  current: number | string;
  trend: number;
}

interface IndexWeightsProps {
  metrics?: IndexWeightMetric[];
}

interface metricData {
  metric: string;
  description: string;
  metricValue: String;
}

const MetricInfoData: metricData[] = [
  {
    metric: "Baseline Value",
    description: "Average over last 30 days",
    metricValue: "25.1",
  },
  {
    metric: "Average (Period)",
    description: "Current selected time range",
    metricValue: "27.4",
  },
  {
    metric: "Standard Deviation (Period)",
    description: "Game-to-game scrolling volatility.",
    metricValue: "3.2",
  },
  {
    metric: "Relevance",
    description: "Strong impact on overall index score.",
    metricValue: "High(0.78)",
  },
];

const defaultMetrics: IndexWeightMetric[] = [
  {
    metric: "Points per Game (PPG)",
    description: "Average points scored per game this season.",
    weight: "45%",
    current: 27.4,
    trend: 3.2,
  },
  {
    metric: "Assists per Game (APG)",
    description: "Average assists per game — measures playmaking impact.",
    weight: "15%",
    current: 8.2,
    trend: -3.2,
  },
  {
    metric: "Rebounds per Game (RPG)",
    description: "Total rebounds per game (offensive + defensive).",
    weight: "15%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Steals per Game (SPG)",
    description: "Defensive pressure and possession gains.",
    weight: "10%",
    current: 7.6,
    trend: -3.2,
  },
  {
    metric: "Blocks per Game (BPG)",
    description: "Defensive pressure and possession gains.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Turnovers per Game (TOPG)",
    description: "Ball-handling control — lower is better.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Field Goal % (FG%)",
    description: "Overall shooting efficiency.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "3-Point % (3P%)",
    description: "Efficiency from beyond the arc.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
  {
    metric: "Free Throw % (FT%)",
    description: "Reliability at the line.",
    weight: "10%",
    current: 7.6,
    trend: 3.2,
  },
];

export default function IndexWeights({
  metrics = defaultMetrics,
}: IndexWeightsProps) {
  return (
    <>
      <div className="mb-[16px] flex flex-col gap-4 rounded-[20px] bg-white p-[10px] last:mb-0 sm:p-[14px] md:mb-[24px] md:p-[16px]">
        <h1 className="text-text-primary px-4 pt-2 text-[16px] leading-none font-medium tracking-[0.28px]">
          Index Weight
        </h1>
        <div className="bg-page-background mt-4 w-full overflow-x-auto rounded-[20px] px-2">
          <Table className="w-full min-w-full table-auto border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                  Time
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Play
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Weight
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Current
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Trend
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric, index) => {
                const isPositive = metric.trend >= 0;
                return (
                  <TableRow
                    key={index}
                    className="text-[12px]x mb-2 overflow-hidden rounded-[14px] border-0 bg-white font-medium transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white"
                  >
                    <TableCell className="rounded-tl-[14px] rounded-bl-[14px] bg-white px-4 py-3">
                      {metric.metric}
                    </TableCell>
                    <TableCell className="text-soft-400 font-mediumxs bg-white px-4 py-3">
                      {metric.description}
                    </TableCell>
                    <TableCell className="bg-white px-4 py-3">
                      {metric.weight}
                    </TableCell>
                    <TableCell className="bg-white px-4 py-3">
                      {metric.current}
                    </TableCell>
                    <TableCell
                      className={`bg-white px-4 py-3 ${isPositive ? "text-light-green" : "text-neon-pink"} rounded-tr-[14px] rounded-br-[14px]`}
                    >
                      <div className="flex flex-row items-center gap-1">
                        {isPositive ? (
                          <Image
                            src="/icons/arrow_up.png"
                            alt="arrow-up"
                            width={12}
                            height={16}
                          />
                        ) : (
                          <Image
                            src="/icons/arrow_down.png"
                            alt="arrow-down"
                            width={12}
                            height={16}
                          />
                        )}
                        {isPositive ? "+" : ""}
                        {metric.trend}%
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-soft-400 flex h-[12px] w-[12px] shrink-0 cursor-pointer items-center justify-center rounded-full">
                              <Info className="h-[12px] w-[12px] text-white" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="border-light-gray text-text-primary rounded-[10px] border bg-white p-4 text-[12px] leading-[100%] font-medium tracking-[-1%] [&>*[data-side]]:bg-white">
                            <div className="flex flex-col gap-4">
                              <h4>{metric.metric}</h4>
                              {MetricInfoData.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-1"
                                  >
                                    <span className="text-soft-400 flex flex-row text-[12px] leading-none font-medium tracking-[0.28px]">
                                      {item.metric}:{" "}
                                      <p className="text-text-primary">
                                        {item.metricValue}
                                      </p>
                                    </span>
                                    <span className="text-soft-400 text-[12px] leading-none font-medium tracking-[0.28px]">
                                      {item.description}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
    // <div className="backdrop-blur-[22px] bg-white rounded-[10px] flex flex-col w-full">
    //   {/* Header */}
    //   <button
    //     onClick={() => setIsExpanded(!isExpanded)}
    //     className="flex gap-[12px] sm:gap-[16px] h-[48px] sm:h-[52px] md:h-[56px] items-center px-[16px] sm:px-[20px] md:px-[24px] border-b border-light-gray w-full hover:bg-primary-foreground transition-colors cursor-pointer"
    //   >
    //     <div className="flex-1 flex flex-col justify-center">
    //       <p className="font-nohemi text-[14px] sm:text-[15px] md:text-[16px] text-text-primary font-medium tracking-[0.32px] leading-none text-left font-500">
    //         Index Weights
    //       </p>
    //     </div>
    //     <p className="font-medium text-[11px] sm:text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
    //       {isExpanded ? "Hide" : "Show"}
    //     </p>
    //     {isExpanded ? (
    //       <ChevronUp className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-text-primary" />
    //     ) : (
    //       <ChevronDown className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-text-primary" />
    //     )}
    //   </button>

    //   {/* Content */}
    //   {isExpanded && (
    //     <div className="flex flex-col pb-[4px] sm:pb-[6px] md:pb-[8px] px-[4px] sm:px-[6px] md:px-[8px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    //       {/* Table Header */}
    //       <div className="flex gap-[16px] md:gap-[24px] items-center px-[12px] md:px-[16px] py-[12px] font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none min-w-[600px]">
    //         <p className="w-[150px] md:w-[180px]">Metric</p>
    //         <p className="flex-1 min-w-[200px]">Description</p>
    //         <p className="w-[60px] md:w-[72px]">Weight</p>
    //         <p className="w-[60px] md:w-[72px]">Current</p>
    //         <p className="w-[60px] md:w-[72px]">Trend</p>
    //       </div>

    //       {/* Table Rows */}
    //       {metrics.map((item, index) => {
    //         const isPositive = item.trend >= 0;
    //         return (
    //           <div
    //             key={index}
    //             className="flex gap-[16px] md:gap-[24px] items-center p-[12px] md:p-[16px] rounded-[10px] bg-linear-to-b from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.024)] relative shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2)] min-w-[600px]"
    //           >
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[150px] md:w-[180px]">
    //               {item.metric}
    //             </p>
    //             <p className="flex-1 min-w-[200px] font-medium text-[11px] md:text-[12px] text-soft-400 tracking-[-0.12px] leading-[1.1]">
    //               {item.description}
    //             </p>
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[60px] md:w-[72px]">
    //               {item.weight}
    //             </p>
    //             <p className="font-medium text-[11px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none w-[60px] md:w-[72px]">
    //               {typeof item.current === "number"
    //                 ? item.current.toFixed(1)
    //                 : item.current}
    //             </p>
    //             <div className="flex gap-px items-center w-[60px] md:w-[72px]">
    //               {isPositive ? (
    //                 <ArrowUp className="w-[11px] h-[11px] md:w-[12px] md:h-[12px] text-light-green" />
    //               ) : (
    //                 <ArrowDown className="w-[11px] h-[11px] md:w-[12px] md:h-[12px] text-neon-pink" />
    //               )}
    //               <p
    //                 className={`font-medium text-[11px] md:text-[12px] tracking-[-0.12px] leading-none ${
    //                   isPositive ? "text-light-green" : "text-neon-pink"
    //                 }`}
    //               >
    //                 {Math.abs(item.trend).toFixed(1)}%
    //               </p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
  );
}
