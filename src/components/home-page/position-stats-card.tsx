"use client";

import { commaFormatterNoDecimals, formatter } from "@/lib/formatter";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

type ChartDataPointT = {
  value: number;
};

type StatDataT = {
  title: string;
  value: number;
  changePercent: number;
  chartData: ChartDataPointT[];
  formatter: (value: number) => string;
};

const generateChartData = (): ChartDataPointT[] => {
  const data: ChartDataPointT[] = [];
  const baseValue = 1;
  const maxValue = 5;
  for (let i = 0; i < 10; i++) {
    const progress = i / 9;
    const trend = baseValue + progress * (maxValue - baseValue);
    const variation = Math.sin(i * 0.6) * 0.4;
    data.push({
      value: trend + variation,
    });
  }
  return data;
};

const statsData: StatDataT[] = [
  {
    title: "PnL",
    value: 1902,
    changePercent: 2.84,
    chartData: generateChartData(),
    formatter: (value) => commaFormatterNoDecimals.format(value),
  },
  {
    title: "Open Positions",
    value: 120,
    changePercent: 2.84,
    chartData: generateChartData(),
    formatter: (value) => commaFormatterNoDecimals.format(value),
  },
  {
    title: "Win Rate",
    value: 66.4,
    changePercent: 2.84,
    chartData: generateChartData(),
    formatter: (value) => `${formatter.format(value)}%`,
  },
];

type SmallChartProps = {
  data: ChartDataPointT[];
  gradientId: string;
  color: string;
};

const SmallChart = ({ data, gradientId, color }: SmallChartProps) => {
  return (
    <div className="w-[52px] h-[26px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

type StatCardProps = {
  stat: StatDataT;
  index: number;
};

function StatCard({ stat, index }: StatCardProps) {
  const gradientId = `chartGradient-${index}`;
  const isPositive = stat.changePercent >= 0;
  const chartColor = isPositive ? "#2d9f75" : "#df1c41";

  return (
    <div className="flex items-center justify-between px-4 py-3 gap-x-3 bg-[#0A0D14]/2 rounded-lg">
      <div className="flex flex-col gap-y-2.5">
        <p className="text-xs font-medium text-soft-400">{stat.title}</p>
        <p className="font-nohemi font-medium">{stat.formatter(stat.value)}</p>
      </div>

      <div className="flex flex-col items-end gap-y-1">
        <p
          className={`text-xs font-medium ${
            isPositive ? "text-dark-green" : "text-base-red"
          }`}
        >
          {isPositive ? "+" : ""}
          {stat.changePercent.toFixed(2)}%
        </p>
        <SmallChart
          data={stat.chartData}
          gradientId={gradientId}
          color={chartColor}
        />
      </div>
    </div>
  );
}

export default function PositionStatsCard() {
  return (
    <div className="bg-white rounded-[10px] p-5 space-y-5">
      <div className="flex items-center gap-x-2.5">
        <div className="flex items-center gap-x-2.5">
          <div className="bg-[#EEEBFF] rounded-full flex items-center justify-center w-12 aspect-square">
            <p className="font-semibold text-[22px] text-dark-purple">M</p>
          </div>

          <div className="flex flex-col gap-y-2">
            <h4 className="text-base font-medium text-main font-nohemi">
              Marineboa#3271
            </h4>

            <div className="flex items-center gap-x-[11px]">
              <div className="flex items-center justify-center bg-base-orange rounded-full py-1.5 px-2 gap-x-1">
                <div className="bg-white w-1 h-1 rounded-full" />
                <p className="text-[10px] leading-[50%] font-medium text-white uppercase">
                  Bronze
                </p>
              </div>

              <p className="text-xs text-soft-400 font-medium">REP: 248</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        {statsData.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <Link
        href="/portfolio"
        className="hover:bg-zinc-50 cursor-pointer transition-colors duration-200 rounded-lg border-[#0A0D14]/7 py-2.5 border flex justify-center gap-x-2 w-full items-center text-main relative after:content-[''] after:absolute after:inset-0 after:rounded-[7px] after:pointer-events-none after:shadow-[inset_0_-2px_0_0_rgba(10,13,20,0.06)]"
      >
        <span className="text-sm font-medium">More Details</span>
        <ArrowRight className="w-4 aspect-auto mt-0.5" />
      </Link>
    </div>
  );
}
