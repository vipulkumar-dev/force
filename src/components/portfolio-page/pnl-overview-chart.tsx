"use client";

import { currencyFormatter } from "@/lib/formatter";
import { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PnLOverviewChartProps = {
  data?: ChartDataPointT[];
  cumulativePnL?: number;
}

type ChartDataPointT = {
  index: number;
  date: string;
  dateLabel: string;
  dateObj: Date;
  dailyPnL: number;
  cumulativePnL: number;
}

type TimeRange = "1H" | "6H" | "1D" | "1W" | "1M" | "ALL";

// Tooltip props interface
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey?: string;
    payload: ChartDataPointT;
  }>;
}

// Format date for tooltip: "12 Aug, 8:00 PM"
const formatTooltipDate = (date: Date): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const displayHour = hours > 12 ? hours - 12 : hours || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");
  
  return `${day} ${month}, ${displayHour}:${minutesStr} ${ampm}`;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dailyPnLValue = payload.find((p) => p.dataKey === "dailyPnL")?.value ?? data.dailyPnL;
    const cumulativePnLValue = payload.find((p) => p.dataKey === "cumulativePnL")?.value ?? data.cumulativePnL;
    const isPositive = dailyPnLValue >= 0;

    return (
      <div className="bg-[#262626]/80 rounded-lg py-2 px-3 shadow-lg">
        <p className="text-white text-xs mb-2">
          {formatTooltipDate(data.dateObj)}
        </p>
        <div className="space-y-1">
          {dailyPnLValue !== undefined && (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                isPositive ? "bg-[#2d9f75]" : "bg-[#df1c41]"
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <p className="text-white text-xs font-medium">
                Daily: {currencyFormatter.format(dailyPnLValue)}
              </p>
            </div>
          )}
          {cumulativePnLValue !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#375DFB] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <p className="text-white text-xs font-medium">
                Cumulative: {currencyFormatter.format(cumulativePnLValue)}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Generate mock data based on time range
const generateMockData = (timeRange: TimeRange): ChartDataPointT[] => {
  const data: ChartDataPointT[] = [];
  const now = new Date();

  let totalDataPoints: number;
  let intervalMinutes: number;
  let startDate: Date;

  // Configure data points based on time range
  switch (timeRange) {
    case "1H":
      totalDataPoints = 60; // 1 hour = 60 minutes
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
      break;
    case "6H":
      totalDataPoints = 72; // 6 hours = 72 data points (5-minute intervals)
      intervalMinutes = 5;
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
      break;
    case "1D":
      totalDataPoints = 96; // 1 day = 96 data points (15-minute intervals)
      intervalMinutes = 15;
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      break;
    case "1W":
      totalDataPoints = 168; // 1 week = 168 data points (hourly)
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "1M":
      totalDataPoints = 180; // 1 month = 180 data points (4-hourly: 30 days * 6 points per day)
      intervalMinutes = 4 * 60; // 4 hours
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "ALL":
      totalDataPoints = 365; // 1 year = 365 days
      intervalMinutes = 24 * 60; // Daily
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 365);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      totalDataPoints = 60;
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
  }

  // Determine label interval to show more labels (6-8 labels for better visibility)
  const numLabels = Math.min(8, Math.max(4, Math.floor(totalDataPoints / 3)));
  const labelInterval = Math.max(1, Math.floor((totalDataPoints - 1) / numLabels));

  // Start cumulative PnL around 10K-15K, target range 10K-50K
  let cumulative = 10000 + Math.random() * 5000;
  const targetMax = 50000;
  const targetMin = 10000;
  const targetRange = targetMax - targetMin;

  for (let i = 0; i < totalDataPoints; i++) {
    let currentDate: Date;
    if (timeRange === "1M" || timeRange === "ALL") {
      // For daily/4-hourly data, add days/hours
      currentDate = new Date(startDate);
      if (timeRange === "ALL") {
        currentDate.setDate(startDate.getDate() + i);
      } else {
        currentDate.setHours(startDate.getHours() + i * 4);
      }
    } else {
      currentDate = new Date(
        startDate.getTime() + i * intervalMinutes * 60 * 1000
      );
    }

    const progress = i / (totalDataPoints - 1);

    let dateString: string = "";
    let dateLabel: string = "";

    // Format date string and label based on time range
    if (timeRange === "1H" || timeRange === "6H" || timeRange === "1D") {
      // Show time format: HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      dateString = `${displayHour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      // Show label at intervals, but exclude the last data point
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        dateLabel = dateString;
      }
    } else if (timeRange === "1W" || timeRange === "1M" || timeRange === "ALL") {
      // For 1W, 1M, ALL: show MM/DD format (days only, no time)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dateString = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
      
      // For ALL, show month abbreviation for better readability
      if (timeRange === "ALL") {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        dateString = `${monthNames[currentDate.getMonth()]}`;
      }
      
      // Show label at intervals, but exclude the last data point
      if (i % labelInterval === 0 && i < totalDataPoints - 1) {
        dateLabel = dateString;
      }
    } else {
      // Fallback: show MM/DD format
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dateString = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
    }

    // Generate daily PnL with good mix of positive and negative
    // Target cumulative should trend within 10K-50K range
    const targetCumulative = targetMin + progress * targetRange * (0.6 + Math.sin(progress * Math.PI * 2) * 0.2);
    const deviation = targetCumulative - cumulative;
    
    // Generate daily PnL that guides toward target but with natural variation
    const baseChange = deviation / Math.max(1, totalDataPoints - i) * (1 + Math.random() * 0.4);
    
    // Add random variation - ensure we get both gains and losses
    // Make variation MORE dynamic for shorter timeframes to make bars more visible
    const randomValue = Math.random();
    let dailyPnL: number;
    
    // Base variation amounts - larger for shorter timeframes to make bars visible
    let baseVariation: number;
    if (timeRange === "1H") {
      // For 1H: larger variation to make bars visible (500-2000 range)
      baseVariation = Math.random() * 1500 + 500;
    } else if (timeRange === "6H") {
      // For 6H: good variation (400-1800 range)
      baseVariation = Math.random() * 1400 + 400;
    } else if (timeRange === "1D") {
      // For 1D: moderate variation (300-1500 range)
      baseVariation = Math.random() * 1200 + 300;
    } else {
      // For longer timeframes: standard variation
      baseVariation = Math.random() * 2000 + 300;
    }
    
    if (randomValue < 0.45) {
      // 45% chance of negative (losses)
      dailyPnL = baseChange * 0.2 - baseVariation;
    } else {
      // 55% chance of positive (gains)
      dailyPnL = baseChange * 0.2 + baseVariation;
    }
    
    // Add some oscillation for visual interest
    const oscillation = Math.sin(i * 0.1) * (baseVariation * 0.3);
    dailyPnL += oscillation;

    // Update cumulative
    cumulative += dailyPnL;
    
    // Soft clamp to keep within reasonable bounds (10K-50K with some margin)
    if (cumulative < targetMin - 3000) {
      cumulative = targetMin - 3000 + Math.random() * 2000;
    } else if (cumulative > targetMax + 3000) {
      cumulative = targetMax + 3000 - Math.random() * 2000;
    }

    data.push({
      index: i,
      date: dateString,
      dateLabel,
      dateObj: currentDate,
      dailyPnL: Number(dailyPnL.toFixed(2)),
      cumulativePnL: Number(cumulative.toFixed(2)),
    });
  }

  return data;
};

export default function PnLOverviewChart({
  data: externalData,
  cumulativePnL,
}: PnLOverviewChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1W");

  const timeRanges: TimeRange[] = ["1H", "6H", "1D", "1W", "1M", "ALL"];

  // Generate data based on time range
  const chartData = useMemo(() => {
    if (externalData) {
      // Ensure external data has index, dateLabel, and dateObj fields
      return externalData.map((point, index) => ({
        ...point,
        index: point.index ?? index,
        dateLabel: point.dateLabel ?? point.date,
        dateObj: point.dateObj ?? new Date(point.date),
      }));
    }
    return generateMockData(timeRange);
  }, [timeRange, externalData]);

  // Calculate dynamic Y-axis domain and ticks based on data
  const { yAxisDomain, yAxisTicks } = useMemo(() => {
    if (chartData.length === 0) {
      return {
        yAxisDomain: [-10000, 40000] as [number, number],
        yAxisTicks: [-10000, 0, 10000, 20000, 30000, 40000],
      };
    }

    // Find min and max values for both daily PnL and cumulative PnL
    const allValues = chartData.flatMap((d) => [d.dailyPnL, d.cumulativePnL]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Add padding (20% on each side)
    const range = maxValue - minValue;
    const padding = range * 0.2;
    const domainMin = Math.floor((minValue - padding) / 5000) * 5000;
    const domainMax = Math.ceil((maxValue + padding) / 5000) * 5000;

    // Generate ticks
    const tickStep = Math.max(5000, Math.ceil((domainMax - domainMin) / 5 / 5000) * 5000);
    const ticks: number[] = [];
    for (let tick = domainMin; tick <= domainMax; tick += tickStep) {
      ticks.push(tick);
    }

    return {
      yAxisDomain: [domainMin, domainMax] as [number, number],
      yAxisTicks: ticks,
    };
  }, [chartData]);

  // Get indices where dateLabel is set (non-empty) - these are the points we want to show on X-axis
  const xAxisTicks = useMemo(() => {
    return chartData
      .map((point, index) => ({ index, hasLabel: point.dateLabel !== "" }))
      .filter((item) => item.hasLabel)
      .map((item) => item.index);
  }, [chartData]);

  // Calculate cumulative PnL from data if not provided
  const finalCumulativePnL =
    cumulativePnL ??
    (chartData.length > 0 ? chartData[chartData.length - 1].cumulativePnL / 1000 : 12.5);

  // Custom bar color based on positive/negative value
  const getBarColor = (value: number) => {
    return value >= 0 ? "#2d9f75" : "#df1c41";
  };

  // Format Y-axis values
  const formatYAxis = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    if (value <= -1000) return `-$${Math.abs(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  // Calculate dynamic bar size based on data point count
  // Make bars larger and more visible, especially for dense data
  const barSize = useMemo(() => {
    const dataPointCount = chartData.length;
    // Increase bar sizes significantly for better visibility
    // Use larger bars even for dense data to ensure visibility
    if (dataPointCount <= 10) return 10;
    if (dataPointCount <= 30) return 8;
    if (dataPointCount <= 100) return 5; // For 60-96 points (1H, 6H, 1D)
    if (dataPointCount <= 200) return 4; // For 168-180 points (1W, 1M)
    return 3; // For 365 points (ALL)
  }, [chartData.length]);

  // Calculate bar gaps - smaller gaps for more data points
  const barGap = useMemo(() => {
    const dataPointCount = chartData.length;
    if (dataPointCount <= 10) return 4;
    if (dataPointCount <= 30) return 2;
    if (dataPointCount <= 100) return 1;
    return 0.5; // Minimal gap for dense data
  }, [chartData.length]);

  return (
    <div className="bg-white rounded-[10px] flex flex-col w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full p-[16px] md:p-5 gap-3 border-b border-light-gray">
        {/* Title */}
        <h2 className="font-nohemi font-medium text-[14px] text-main tracking-[0.28px] leading-none">
          PnL Overview
        </h2>

        {/* Time Range Selector */}
        <div className="flex items-center overflow-x-auto -mx-[16px] px-[16px] md:mx-0 md:px-0">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex gap-[4px] items-center justify-center p-[7.5px] rounded-[100px] relative transition-colors cursor-pointer shrink-0 ${
                timeRange === range
                  ? "bg-soft-gray shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2),0px_4px_5px_0px_inset_rgba(255,255,255,0.05)]"
                  : "hover:bg-neutral-50"
              }`}
            >
              <p
                className={`font-medium px-[3px] text-[13px] tracking-[-0.13px] leading-none ${
                  timeRange === range ? "text-main" : "text-soft-400"
                }`}
              >
                {range}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full p-[16px] md:p-5 gap-5">
        <div className="flex flex-wrap gap-x-[16px] md:gap-x-[20px] gap-y-[12px] items-start">
          {/* Daily Profit */}
          <div className="flex gap-[6px] items-center">
            <div className="bg-dark-green w-[2px] h-[9px]" />
            <p className="font-medium text-[11px] md:text-[13px] text-main tracking-[-0.13px] leading-none whitespace-nowrap">
              Daily Profit
            </p>
          </div>

          {/* Daily Lost */}
          <div className="flex gap-[6px] items-center">
            <div className="bg-base-red w-[2px] h-[9px]" />
            <p className="font-medium text-[11px] md:text-[13px] text-main tracking-[-0.13px] leading-none whitespace-nowrap">
              Daily Lost
            </p>
          </div>

          {/* Cumulative PNL */}
          <div className="flex gap-[6px] items-center font-medium text-[11px] md:text-[13px] tracking-[-0.13px] leading-none whitespace-nowrap">
            <p className="text-main">Cumulative PNL</p>
            <p className="text-dark-green">${finalCumulativePnL.toFixed(1)}K</p>
          </div>
        </div>
        {/* Chart */}
        <div className="w-full h-[250px] md:h-[300px] -mx-[8px] md:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              barCategoryGap={barGap}
              barGap={barGap}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
                horizontal={true}
              />
              <XAxis
                dataKey="index"
                tick={{ fill: "#868c98", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const dataPoint = chartData[value];
                  return dataPoint?.dateLabel || "";
                }}
                ticks={xAxisTicks.length > 0 ? xAxisTicks : undefined}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: "#868c98", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={yAxisDomain}
                ticks={yAxisTicks}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="dailyPnL"
                fill="#2d9f75"
                barSize={barSize}
                shape={(props: unknown) => {
                  const barProps = props as {
                    x?: number;
                    y?: number;
                    width?: number;
                    height?: number;
                    payload: ChartDataPointT;
                  };
                  const { x = 0, y = 0, width = barSize, height = 0, payload } = barProps;
                  const color = getBarColor(payload.dailyPnL);
                  
                  // Handle both positive and negative bars
                  // For negative bars, height is negative, so we adjust y position
                  const barHeight = Math.abs(height);
                  const barY = height < 0 ? y + height : y;

                  return (
                    <rect 
                      x={x} 
                      y={barY} 
                      width={width} 
                      height={barHeight} 
                      fill={color} 
                    />
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="cumulativePnL"
                stroke="#375DFB"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                filter="drop-shadow(0px 8px 10px rgba(55, 93, 251, 0.35))"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
