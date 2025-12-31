"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface MetricData {
  metric: string;
  weight: string;
  current: string | number;
  trend: number;
}

const metricsData: MetricData[] = [
  {
    metric: "Points per Game (PPG)",
    weight: "45%",
    current: "27.4",
    trend: 3.2,
  },
  {
    metric: "Assists per Game (APG)",
    weight: "15%",
    current: "8.2",
    trend: -5.32,
  },
  {
    metric: "Rebounds per Game (RPG)",
    weight: "15%",
    current: "7.8",
    trend: 3.2,
  },
  {
    metric: "Steals per Game (SPG)",
    weight: "10%",
    current: "7.8",
    trend: -5.32,
  },
  {
    metric: "Blocks per Game (BPG)",
    weight: "10%",
    current: "7.8",
    trend: 3.2,
  },
  {
    metric: "Turnovers per Game (TOPG)",
    weight: "10%",
    current: "7.8",
    trend: 3.2,
  },
  { metric: "Field Goal % (FG%)", weight: "10%", current: "7.8", trend: 3.2 },
  { metric: "3-Point % (3P%)", weight: "10%", current: "7.8", trend: 3.2 },
  { metric: "Free Throw % (FT%)", weight: "10%", current: "7.8", trend: 3.2 },
];

export default function IndexComponentsTable() {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-inactive overflow-hidden">
      {/* Wrapper for horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="w-full flex flex-row px-3 md:px-4 py-2.5 md:py-3 border-b border-inactive">
            <div className="w-[50%] md:w-[70%] text-[11px] md:text-xs font-medium text-soft-400 tracking-[-1%]">
              Metric
            </div>
            <div className="w-[17%] md:w-[10%] text-[11px] md:text-xs font-medium text-soft-400 tracking-[-1%]">
              Weight
            </div>
            <div className="w-[17%] md:w-[10%] text-[11px] md:text-xs font-medium text-soft-400 tracking-[-1%]">
              Current
            </div>
            <div className="w-[16%] md:w-[10%] text-[11px] md:text-xs font-medium text-soft-400 tracking-[-1%]">
              Trend
            </div>
          </div>

          {/* Rows */}
          <div className="">
            {metricsData.map((metric, index) => {
              const isPositive = metric.trend >= 0;

              return (
                <div
                  key={index}
                  className="w-full flex flex-row px-3 md:px-4 py-3 md:py-4 hover:bg-active-hover transition-colors"
                >
                  <div className="w-[50%] md:w-[70%] text-[13px] md:text-sm text-main font-medium">
                    {metric.metric}
                  </div>
                  <div className="w-[17%] md:w-[10%] text-[13px] md:text-sm text-main font-medium">
                    {metric.weight}
                  </div>
                  <div className="w-[17%] md:w-[10%] text-[13px] md:text-sm text-main font-medium">
                    {metric.current}
                  </div>
                  <div
                    className={cn(
                      "w-[16%] md:w-[10%] text-[13px] md:text-sm font-medium flex flex-row gap-px items-center",
                      isPositive ? "text-success" : "text-error",
                    )}
                  >
                    {isPositive ? (
                      <Image
                        src="/icons/learn/green-arrow.svg"
                        alt="up-arrow"
                        width={12}
                        height={12}
                      />
                    ) : (
                      <Image
                        src="/icons/learn/red-arrow.svg"
                        alt="down-arrow"
                        width={12}
                        height={12}
                      />
                    )}
                    {metric.trend.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
