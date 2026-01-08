"use client";

import { useState, useMemo } from "react";
import { Info, Flame, ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface PriceChartProps {
  indexValue?: number;
  marketValue?: number;
  change24h?: number;
  volume?: string;
  openInterest?: string;
  funding?: number;
  earningToday?: number;
  routeName?: string;
}

type TimeRange = "1H" | "6H" | "1D" | "1W" | "1M" | "ALL";
type ChartTab = "Chart" | "Live Feed" | "Orderbook";
type Quarter = "1st" | "2nd" | "3rd" | "4th";

interface ChartEvent {
  index: number;
  time: string;
  title: string;
  description: string;
  impact: string;
}

interface PlayData {
  time: string;
  play: string;
  playUpdate: string;
  teamLogo: string;
  score1: number;
  score2: number;
}

const courtImage = "/images/backgrounds/basketball-court.svg";
const lakersLogo = "/icons/events/lal.png";
const warriorsLogo = "/icons/events/sam-merrill.png";
const checkIcon = "/images/icons/check-icon.svg";

const playByPlayData: PlayData[] = [
  {
    time: "12:00",
    play: "Jalen Duren vs. Jarrett Allen",
    playUpdate: "Evan Mobley gains possession",
    teamLogo: lakersLogo,
    score1: 0,
    score2: 0,
  },
  {
    time: "12:00",
    play: "Sam Merrill bad pass",
    playUpdate: "Ausar Thompson steals",
    teamLogo: warriorsLogo,
    score1: 0,
    score2: 0,
  },
  {
    time: "12:00",
    play: "Jalen Duren vs. Jarrett Allen",
    playUpdate: "Evan Mobley gains possession",
    teamLogo: lakersLogo,
    score1: 0,
    score2: 0,
  },
  {
    time: "12:00",
    play: "Sam Merrill bad pass",
    playUpdate: "Ausar Thompson steals",
    teamLogo: warriorsLogo,
    score1: 0,
    score2: 0,
  },
];

interface OrderbookEntry {
  price: string;
  size: string;
  barWidth: number; // percentage
}

const bidsData: OrderbookEntry[] = [
  { price: "58¢", size: "$3,200", barWidth: 80 },
  { price: "57¢", size: "$3,200", barWidth: 35 },
  { price: "56¢", size: "$3,200", barWidth: 25 },
  { price: "55¢", size: "$3,200", barWidth: 58 },
];

const asksData: OrderbookEntry[] = [
  { price: "59¢", size: "$3,200", barWidth: 80 },
  { price: "60¢", size: "$3,200", barWidth: 35 },
  { price: "61¢", size: "$3,200", barWidth: 25 },
  { price: "61¢", size: "$3,200", barWidth: 58 },
];

const liveIcon = "/images/icons/live-icon.svg";

// Chart data types
interface ChartDataPoint {
  time: string;
  timeLabel: string;
  date: Date;
  redLine: number; // #FC3970 - sharp edges
  blueLine: number; // #25B3FF - dotted, smooth
  greenLine: number; // #16A34A - smooth
}

// Generate mock data based on time range
const generateChartData = (timeRange: TimeRange): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
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
      totalDataPoints = 6; // 6 hours = 6 data points (hourly)
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours ago
      break;
    case "1D":
      totalDataPoints = 24; // 1 day = 24 hours
      intervalMinutes = 60;
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      break;
    case "1W":
      totalDataPoints = 7; // 1 week = 7 days
      intervalMinutes = 24 * 60; // Daily
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "1M":
      totalDataPoints = 30; // 1 month = 30 days
      intervalMinutes = 24 * 60; // Daily
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
      break;
    case "ALL":
      totalDataPoints = 12; // 1 year = 12 months
      // Start from 12 months ago
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 12);
      startDate.setDate(1); // Start of month
      startDate.setHours(0, 0, 0, 0);
      intervalMinutes = 0; // Will be handled specially for monthly intervals
      break;
    default:
      totalDataPoints = 60;
      intervalMinutes = 1;
      startDate = new Date(now.getTime() - 60 * 60 * 1000);
  }

  // Determine label interval to avoid overlapping
  let labelInterval: number;
  if (totalDataPoints <= 7) {
    labelInterval = 1; // Show all labels for small datasets
  } else if (totalDataPoints <= 24) {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 8)); // Show ~8 labels
  } else if (totalDataPoints <= 30) {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 10)); // Show ~10 labels
  } else {
    labelInterval = Math.max(1, Math.floor(totalDataPoints / 12)); // Show ~12 labels
  }

  for (let i = 0; i < totalDataPoints; i++) {
    let currentDate: Date;
    if (timeRange === "ALL") {
      // For monthly data, add months instead of minutes
      currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
    } else {
      currentDate = new Date(
        startDate.getTime() + i * intervalMinutes * 60 * 1000,
      );
    }
    const progress = i / (totalDataPoints - 1);

    let timeString: string;
    let timeLabel: string = "";

    // Format time string based on time range
    if (timeRange === "1H") {
      // Minute-level: show HH:MM AM/PM
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      // Show label every N minutes
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "6H" || timeRange === "1D") {
      // Hour-level: show HH AM/PM
      const hours = currentDate.getHours();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      timeString = `${displayHour} ${ampm}`;
      // Show label every N hours
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1W") {
      // Day-level: show MM/DD (no time)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label every N days
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else if (timeRange === "1M") {
      // Day-level: show MM/DD
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      timeString = `${month}/${day}`;
      // Show label every N days
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    } else {
      // Month-level: show MM/YYYY or MM/YY
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      timeString = `${month}/${year}`;
      // Show label every N months
      if (i % labelInterval === 0 || i === totalDataPoints - 1) {
        timeLabel = timeString;
      }
    }

    // Generate values with trend based on progress
    // Red line (#FC3970) - sharp edges, more volatile, higher range
    const redBase =
      32 + Math.sin(progress * Math.PI * 4) * 2.5 + (progress - 0.5) * 4;
    const redValue =
      redBase + Math.sin(i * 0.1) * 0.6 + (Math.random() - 0.5) * 0.3;

    // Blue line (#25B3FF) - smooth, gradual changes, middle range
    const blueBase =
      31 + Math.sin(progress * Math.PI * 2) * 1.5 + (progress - 0.5) * 1.5;
    const blueValue =
      blueBase + Math.sin(i * 0.08) * 0.3 + (Math.random() - 0.5) * 0.2;

    // Green line (#16A34A) - smooth, moderate changes, lower range
    const greenBase =
      29.5 + Math.sin(progress * Math.PI * 3) * 1.2 + (progress - 0.5) * 0.5;
    const greenValue =
      greenBase + Math.sin(i * 0.09) * 0.2 + (Math.random() - 0.5) * 0.15;

    // Ensure minimum spacing between lines (especially at the end)
    const minSpacing = 1.5; // Minimum spacing between lines
    let finalRedValue = redValue;
    let finalBlueValue = blueValue;
    let finalGreenValue = greenValue;

    // Adjust values to maintain spacing, prioritizing order: Red > Blue > Green
    if (Math.abs(finalRedValue - finalBlueValue) < minSpacing) {
      if (finalRedValue > finalBlueValue) {
        finalRedValue = finalBlueValue + minSpacing;
      } else {
        finalBlueValue = finalRedValue + minSpacing;
      }
    }

    if (Math.abs(finalBlueValue - finalGreenValue) < minSpacing) {
      if (finalBlueValue > finalGreenValue) {
        finalBlueValue = finalGreenValue + minSpacing;
      } else {
        finalGreenValue = finalBlueValue + minSpacing;
      }
    }

    // Re-check red-blue spacing after blue-green adjustment
    if (Math.abs(finalRedValue - finalBlueValue) < minSpacing) {
      if (finalRedValue > finalBlueValue) {
        finalRedValue = finalBlueValue + minSpacing;
      } else {
        finalBlueValue = finalRedValue + minSpacing;
      }
    }

    data.push({
      time: timeString,
      timeLabel,
      date: currentDate,
      redLine: Number(Math.max(27, Math.min(36, finalRedValue)).toFixed(1)),
      blueLine: Number(Math.max(27, Math.min(36, finalBlueValue)).toFixed(1)),
      greenLine: Number(Math.max(27, Math.min(36, finalGreenValue)).toFixed(1)),
    });
  }

  return data;
};

// Format date for tooltip: "12 Aug, 8:00 PM"
const formatTooltipDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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
type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    color?: string;
    payload?: ChartDataPoint;
  }>;
  label?: string;
  events?: ChartEvent[];
  chartData?: ChartDataPoint[];
};

const CustomTooltip = ({
  active,
  payload,
  events = [],
  chartData = [],
}: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0]?.payload as ChartDataPoint | undefined;
  if (!data) {
    return null;
  }

  const indexValue =
    payload.find((p) => p.dataKey === "greenLine")?.value ?? data.greenLine;
  const marketValue =
    payload.find((p) => p.dataKey === "redLine")?.value ?? data.redLine;
  const performanceValue =
    payload.find((p) => p.dataKey === "blueLine")?.value ?? data.blueLine;

  // Check if this data point has an associated event
  // Find the event by matching the data point's date/time
  const dataPointIndex = chartData.findIndex(
    (d: ChartDataPoint) => d.date === data.date,
  );
  const event = events.find((e) => e.index === dataPointIndex);

  return (
    <div className="w-[275px] rounded-lg bg-[#262626]/80 px-3 py-2 text-xs shadow-lg">
      {event && (
        <div className="mb-2 space-y-1">
          <p className="text-white/60">
            {formatTooltipDate(data.date)} — &ldquo;{event.title}&rdquo;
          </p>

          <p className="text-white">
            {event.description} Index jumps {event.impact} instantly.
          </p>
        </div>
      )}

      {!event && (
        <p className="mb-2 text-white">{formatTooltipDate(data.date)}</p>
      )}

      <div className="space-y-1">
        {indexValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#2d9f75]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <p className="text-white">Index: {indexValue.toFixed(1)}</p>
          </div>
        )}
        {marketValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#df1c41]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <p className="text-white">Market: {marketValue.toFixed(1)}</p>
          </div>
        )}
        {performanceValue !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#60a5fa]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
            <p className="text-white">
              Performance: {performanceValue.toFixed(1)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Generate events based on time range
const generateEvents = (
  timeRange: TimeRange,
  chartData: ChartDataPoint[],
): ChartEvent[] => {
  if (chartData.length === 0) return [];

  const events: ChartEvent[] = [];
  const eventTemplates = [
    {
      title: "First 3-pointer made!",
      description: "LeBron nails a deep three from the corner.",
      impact: "+1.8%",
    },
    {
      title: "Slam dunk!",
      description: "Anthony Davis throws down a powerful dunk.",
      impact: "+2.1%",
    },
    {
      title: "Steal and fast break!",
      description: "Quick transition leads to an easy basket.",
      impact: "+1.5%",
    },
    {
      title: "Clutch free throw!",
      description: "Perfect execution under pressure.",
      impact: "+0.9%",
    },
    {
      title: "Alley-oop connection!",
      description: "Perfect pass and finish at the rim.",
      impact: "+2.3%",
    },
    {
      title: "Block and outlet!",
      description: "Defensive stop turns into offense.",
      impact: "+1.2%",
    },
  ];

  // Select 2 random events
  const selectedEvents = [...eventTemplates]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Distribute events across the time range (avoid first and last 10%)
  const startIndex = Math.floor(chartData.length * 0.1);
  const endIndex = Math.floor(chartData.length * 0.9);
  const range = endIndex - startIndex;

  selectedEvents.forEach((template, i) => {
    const eventIndex =
      startIndex + Math.floor((range / (selectedEvents.length + 1)) * (i + 1));
    const dataPoint = chartData[eventIndex];

    if (dataPoint) {
      const hours = dataPoint.date.getHours();
      const minutes = dataPoint.date.getMinutes();
      const displayHour = hours > 12 ? hours - 12 : hours || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      const timeString = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

      events.push({
        index: eventIndex,
        time: timeString,
        title: template.title,
        description: template.description,
        impact: template.impact,
      });
    }
  });

  return events;
};

// Custom dot component for event markers - white outline with red center
type CustomDotProps = {
  cx?: number;
  cy?: number;
  index?: number;
  eventIndices?: Set<number>;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
};

const CustomEventDot = ({
  cx,
  cy,
  index,
  eventIndices,
  onMouseEnter,
  onMouseLeave,
}: CustomDotProps) => {
  if (
    cx === undefined ||
    cy === undefined ||
    index === undefined ||
    !eventIndices?.has(index)
  ) {
    return null;
  }

  return (
    <g>
      {/* White outline circle */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={1}
        onMouseEnter={() => {
          // Show event tooltip
          onMouseEnter?.(index);
          // Don't prevent default - allow chart tooltip to also show
        }}
        onMouseLeave={() => {
          // Hide event tooltip
          onMouseLeave?.();
        }}
        style={{ cursor: "pointer" }}
        pointerEvents="all"
      />
      {/* Red center circle */}
      <circle cx={cx} cy={cy} r={3} fill="#FC3970" pointerEvents="none" />
    </g>
  );
};

// Custom cursor component for vertical line
type CursorProps = {
  points?: Array<{ x?: number; y?: number }>;
  coordinate?: { x?: number; y?: number };
  width?: number;
  height?: number;
  layout?: string;
  viewBox?: { x?: number; y?: number; width?: number; height?: number };
};

const CustomCursor = (props: CursorProps) => {
  const { coordinate, viewBox } = props;

  const x = coordinate?.x;
  if (x === undefined || x === null || !viewBox?.height) {
    return null;
  }

  const { y = 0, height = 0 } = viewBox;

  return <line x1={x} y1={y} x2={x} y2={y + height} />;
};

export default function PriceChart({
  indexValue = 31.5,
  marketValue = 32.5,
  change24h = 2.4,
  volume = "12.5K",
  openInterest = "12.5K",
  funding = -0.03,
  earningToday = 3.27,
  routeName = "Partner",
}: PriceChartProps) {
  const [activeTab, setActiveTab] = useState<ChartTab>("Chart");
  const [timeRange, setTimeRange] = useState<TimeRange>("ALL");
  const [activeQuarter, setActiveQuarter] = useState<Quarter>("1st");
  const [selectedQuarter, setSelectedQuarter] = useState("All Quarters");
  const [lakersPlayer, setLakersPlayer] = useState("All Players");
  const [warriorsPlayer, setWarriorsPlayer] = useState("All Players");
  const [lakersMade, setLakersMade] = useState(true);
  const [lakersMissed, setLakersMissed] = useState(true);
  const [warriorsMade, setWarriorsMade] = useState(true);
  const [warriorsMissed, setWarriorsMissed] = useState(true);
  const [quarterDropdownOpen, setQuarterDropdownOpen] = useState(false);
  const [lakersDropdownOpen, setLakersDropdownOpen] = useState(false);
  const [warriorsDropdownOpen, setWarriorsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(
    null,
  );

  const chartData = generateChartData(timeRange);
  const events = useMemo(
    () => generateEvents(timeRange, chartData),
    [timeRange, chartData],
  );

  // Create a Set of event indices for efficient lookup in custom dot component
  const eventIndices = useMemo(
    () => new Set(events.map((e) => e.index)),
    [events],
  );

  const timeRanges: TimeRange[] = ["1H", "6H", "1D", "1W", "1M", "ALL"];
  const tabs: ChartTab[] = ["Chart", "Live Feed", "Orderbook"];
  const quarters: Quarter[] = ["1st", "2nd", "3rd", "4th"];
  const quarterOptions = ["All Quarters", ...quarters];
  const lakersPlayers = [
    "All Players",
    "LeBron James",
    "Anthony Davis",
    "Austin Reaves",
  ];
  const warriorsPlayers = [
    "All Players",
    "Stephen Curry",
    "Klay Thompson",
    "Draymond Green",
  ];

  return (
    <div
      id="price-chart"
      className="flex w-full flex-col rounded-[8px] bg-white backdrop-blur-[22px] md:rounded-[10px]"
    >
      {/* Tabs Header */}
      <div className="border-light-gray flex w-full items-center gap-[12px] border-[0px_0px_1px] border-solid sm:gap-[24px]">
        <div className="flex h-[44px] min-h-px min-w-px grow basis-0 items-center justify-between px-[12px] py-0 sm:h-[48px] sm:px-[16px] md:px-[20px]">
          <div className="flex h-full items-center gap-[2px] sm:gap-[4px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                id={`price-chart-tab-${tab.toLowerCase().replace(" ", "-")}`}
                onClick={() => setActiveTab(tab)}
                className={`flex h-full cursor-pointer flex-col items-start justify-center gap-[14px] px-[10px] sm:px-[15px] md:px-[19px] ${
                  activeTab === tab
                    ? "border-soft-500 text-text-primary border-b text-[12px] leading-none font-medium tracking-[-0.14px] sm:text-[13px] md:text-[14px]"
                    : "text-soft-400 text-[12px] leading-none font-medium tracking-[-0.14px] sm:text-[13px] md:text-[14px]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === "Live Feed" && (
            <div className="flex items-center gap-[6px]">
              <div className="size-[14px] shrink-0 overflow-hidden">
                <Image src={liveIcon} alt="Live" width={14} height={14} />
              </div>
              <div className="flex items-center justify-center gap-[4px] px-[3px] py-0">
                <p className="text-[14px] leading-none font-medium tracking-[-0.14px] text-nowrap whitespace-pre text-[#df1c41]">
                  Live
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chart Tab Content */}
      {activeTab === "Chart" && (
        <div className="relative flex flex-col gap-[12px] p-[12px] sm:gap-[16px] sm:p-[16px] md:gap-[20px] md:p-[20px]">
          {/* Background Pattern */}
          <div className="pointer-events-none absolute top-0 left-0 h-[384px] w-full opacity-30">
            <div
              className="h-full w-full bg-size-[140px_140px] bg-repeat"
              style={{
                backgroundImage:
                  "url('/images/backgrounds/chart-background.png')",
              }}
            />
          </div>

          {/* Top Section - Badges and Time Range */}
          <div className="relative z-10 flex w-full flex-col items-start justify-between gap-[8px] sm:flex-row sm:items-center sm:gap-0">
            <div className="flex items-center gap-[4px] text-[40px] leading-none font-bold tracking-[-0.13px] whitespace-nowrap md:text-[40px]">
              <p className="text-text-primary">{indexValue}</p>

              <span
                className={
                  change24h >= 0
                    ? "text-light-green flex flex-row items-center gap-1 text-[11px] leading-none tracking-[-0.14px] sm:text-[13px] md:text-[14px]"
                    : "text-base-red flex flex-row items-center gap-1 align-top text-[11px] leading-none tracking-[-0.14px] sm:text-[13px] md:text-[14px]"
                }
              >
                {change24h >= 0 ? (
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
                {change24h.toFixed(1)}%
              </span>
            </div>

            {/* Right - Time Range Selector */}
            <div className="flex w-full items-center gap-[1px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:w-auto sm:gap-0 [&::-webkit-scrollbar]:hidden">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`relative flex shrink-0 cursor-pointer items-center justify-center gap-[2px] rounded-md p-[5px] sm:gap-[4px] sm:p-[6px] md:p-[7.5px] ${
                    timeRange === range
                      ? "bg-neutral-100 shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.2),0px_4px_5px_0px_inset_rgba(255,255,255,0.05)]"
                      : ""
                  }`}
                >
                  <p
                    className={`px-[2px] text-[11px] leading-none font-medium tracking-[-0.13px] sm:px-[3px] sm:text-[12px] md:text-[13px] ${
                      timeRange === range
                        ? "text-text-primary"
                        : "text-soft-400"
                    }`}
                  >
                    {range}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="relative z-10 flex w-full items-center gap-[12px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:gap-[20px] [&::-webkit-scrollbar]:hidden">
            {/* Earning Today */}
            <div className="border-soft-500 flex items-center gap-[3px] rounded-md border border-solid bg-white px-[8px] py-[6px] sm:gap-[4px] sm:px-[10px] sm:py-[7.5px]">
              <Flame className="text-light-green h-[11px] w-[11px] sm:h-[13px] sm:w-[13px]" />
              <p className="text-light-green text-[11px] leading-none font-normal tracking-[-0.13px] sm:text-[13px]">
                +${earningToday.toFixed(2)}
              </p>
              <p className="text-text-primary text-[11px] leading-none font-bold tracking-[-0.13px] sm:text-[13px]">
                Earning Today
              </p>
            </div>
            {/* Volume */}
            <div className="border-soft-500 flex items-center gap-[3px] rounded-md border border-solid bg-white px-[8px] py-[6px] sm:gap-[4px] sm:px-[10px] sm:py-[7.5px]">
              <p className="text-soft-400 text-[11px] leading-none font-normal tracking-[-0.13px] sm:text-[13px]">
                Vol
              </p>
              <p className="text-text-primary text-[11px] leading-none font-bold tracking-[-0.13px] sm:text-[13px]">
                {volume}
              </p>
            </div>
            {/* Funding */}
            <div className="border-soft-500 flex items-center gap-[3px] rounded-md border border-solid bg-white px-[8px] py-[6px] sm:gap-[4px] sm:px-[10px] sm:py-[2px]">
              <p className="text-soft-400 text-[11px] leading-none font-normal tracking-[-0.13px] sm:text-[13px]">
                Funding
              </p>
              <p
                className={funding >= 0 ? "text-light-green" : "text-neon-pink"}
              >
                {funding >= 0 ? "+" : ""}
                {funding.toFixed(2)}%
              </p>
            </div>
            {/* Route */}
            <div className="border-soft-500 flex items-center gap-[3px] rounded-md border border-solid bg-white px-[8px] py-[6px] sm:gap-[4px] sm:px-[10px] sm:py-[7.5px]">
              <Info className="text-text-primary h-[11px] w-[11px] sm:h-[13px] sm:w-[13px]" />
              <p className="text-soft-400 text-[11px] leading-none font-normal tracking-[-0.13px] sm:text-[13px]">
                Route:
              </p>
              <p className="text-text-primary text-[11px] leading-none font-normal tracking-[-0.13px] sm:text-[13px]">
                {routeName}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div
            className="relative z-10 h-[250px] w-full overflow-hidden rounded-[8px] sm:h-[280px] md:h-[312px]"
            id="price-chart-container"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 25, bottom: 0, left: 0 }}
                onMouseMove={(state) => {
                  const index = (state as { activeTooltipIndex?: number })
                    ?.activeTooltipIndex;
                  if (index !== undefined && typeof index === "number") {
                    setActiveIndex(index);
                  }
                }}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Y-axis - hidden but used for scaling */}
                <YAxis
                  domain={[27, 36]}
                  hide={true}
                  tick={false}
                  axisLine={false}
                />

                {/* X-axis - hidden, we'll show labels separately */}
                <XAxis
                  dataKey="time"
                  hide={true}
                  tick={false}
                  axisLine={false}
                  type="category"
                  interval="preserveStartEnd"
                />

                {/* Reference lines on hover - horizontal lines for each value */}
                {activeIndex !== null && chartData[activeIndex] && (
                  <>
                    <ReferenceLine
                      y={chartData[activeIndex].redLine}
                      stroke="#FC3970"
                      strokeDasharray="2 2"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                    />
                    <ReferenceLine
                      y={chartData[activeIndex].blueLine}
                      stroke="#25B3FF"
                      strokeDasharray="2 2"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                    />
                    <ReferenceLine
                      y={chartData[activeIndex].greenLine}
                      stroke="#16A34A"
                      strokeDasharray="2 2"
                      strokeWidth={1}
                      strokeOpacity={0.4}
                    />
                  </>
                )}

                {/* Red line with custom event dots */}

                {/* Tooltip with custom cursor for vertical line */}
                <Tooltip
                  content={
                    <CustomTooltip events={events} chartData={chartData} />
                  }
                  // @ts-expect-error - CustomCursor works correctly at runtime, type definition is too strict
                  cursor={CustomCursor}
                  isAnimationActive={false}
                />

                {/* Red line - linear connections with edges (#FC3970) */}
                <Line
                  type="linear"
                  dataKey="redLine"
                  stroke="#FC3970"
                  strokeWidth={2}
                  dot={(props: {
                    cx?: number;
                    cy?: number;
                    payload?: ChartDataPoint;
                    index?: number;
                  }) => (
                    <CustomEventDot
                      cx={props.cx}
                      cy={props.cy}
                      index={props.index}
                      eventIndices={eventIndices}
                      onMouseEnter={(index) => {
                        const eventIdx = events.findIndex(
                          (e) => e.index === index,
                        );
                        if (eventIdx !== -1) setHoveredEventIndex(eventIdx);
                      }}
                      onMouseLeave={() => setHoveredEventIndex(null)}
                    />
                  )}
                  activeDot={{
                    r: 5,
                    fill: "#FC3970",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  connectNulls={true}
                />

                {/* Blue line - dotted, smooth (#25B3FF) */}
                {/* <Line
                  type="monotone"
                  dataKey="blueLine"
                  stroke="#25B3FF"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#25B3FF",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  connectNulls={true}
                /> */}

                {/* Green line - smooth (#16A34A) */}
                <Line
                  type="monotone"
                  dataKey="greenLine"
                  stroke="#16A34A"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#16A34A",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Event tooltips overlay - positioned relative to chart container */}
            {events.map((event, idx) => {
              const dataPoint = chartData[event.index];
              if (!dataPoint) return null;

              const isHovered = hoveredEventIndex === idx;
              if (!isHovered) return null;

              // Calculate position for tooltip based on chart dimensions
              const chartHeight = 312;
              const yMin = 27;
              const yMax = 36;
              const yRange = yMax - yMin;
              const getYPosition = (value: number) => {
                const normalizedValue = (yMax - value) / yRange;
                return normalizedValue * chartHeight;
              };

              const getXPosition = (index: number) => {
                const totalPoints = chartData.length;
                return totalPoints > 1 ? (index / (totalPoints - 1)) * 100 : 0;
              };

              const xPos = getXPosition(event.index);
              const yPos = getYPosition(dataPoint.redLine);
              const TOOLTIP_HEIGHT = 70;
              const MARKER_SIZE = 8;
              const showTooltipBelow = yPos < TOOLTIP_HEIGHT + 20;

              return (
                <div
                  key={`event-tooltip-${idx}`}
                  className="pointer-events-none absolute z-50"
                  style={{
                    left: `${xPos}%`,
                    top: showTooltipBelow
                      ? `${yPos + MARKER_SIZE / 2 + 10}px`
                      : "auto",
                    bottom: showTooltipBelow
                      ? "auto"
                      : `${chartHeight - yPos + MARKER_SIZE / 2 + 10}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="min-w-[280px] rounded-lg bg-[#262626]/80 px-3 py-2 whitespace-nowrap shadow-lg">
                    <p className="mb-1 text-center text-[11px] font-medium text-[#9ca3af]">
                      {event.time} — &ldquo;{event.title}&rdquo;
                    </p>
                    <p className="text-center text-[11px] font-normal text-white">
                      {event.description} Index jumps {event.impact} instantly.
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Value labels at the end of each line */}
            {chartData.length > 0 &&
              (() => {
                const chartHeight = 312;
                const topMargin = 0;
                const bottomMargin = 0;
                const chartAreaHeight = chartHeight - topMargin - bottomMargin;
                const yMin = 27;
                const yMax = 36;
                const yRange = yMax - yMin;

                // Calculate Y position for a given value (matching Recharts' internal calculation)
                const getYPosition = (value: number) => {
                  // Invert Y axis: higher values are at the top
                  // Recharts uses: y = topMargin + (yMax - value) / (yMax - yMin) * chartAreaHeight
                  const normalizedValue = (yMax - value) / yRange;
                  return topMargin + normalizedValue * chartAreaHeight;
                };

                const lastDataPoint = chartData[chartData.length - 1];
                const redY = getYPosition(lastDataPoint.redLine);
                const blueY = getYPosition(lastDataPoint.blueLine);
                const greenY = getYPosition(lastDataPoint.greenLine);

                return (
                  <>
                    {/* Red line label box */}
                    <div
                      className="absolute z-10 flex items-center justify-center rounded p-1"
                      style={{
                        right: "0px",
                        top: `${redY}px`,
                        transform: "translateY(-50%)",
                        backgroundColor: "#FC3970",
                      }}
                    >
                      <p className="text-[10px] font-medium whitespace-nowrap text-white">
                        {lastDataPoint.redLine.toFixed(1)}
                      </p>
                    </div>

                    {/* Blue line label box */}
                    <div
                      className="absolute z-10 flex items-center justify-center rounded p-1"
                      style={{
                        right: "0px",
                        top: `${blueY}px`,
                        transform: "translateY(-50%)",
                        backgroundColor: "#25B3FF",
                      }}
                    >
                      <p className="text-[10px] font-medium whitespace-nowrap text-white">
                        {lastDataPoint.blueLine.toFixed(1)}
                      </p>
                    </div>

                    {/* Green line label box */}
                    <div
                      className="absolute z-10 flex items-center justify-center rounded p-1"
                      style={{
                        right: "0px",
                        top: `${greenY}px`,
                        transform: "translateY(-50%)",
                        backgroundColor: "#16A34A",
                      }}
                    >
                      <p className="text-[10px] font-medium whitespace-nowrap text-white">
                        {lastDataPoint.greenLine.toFixed(1)}
                      </p>
                    </div>
                  </>
                );
              })()}

            {/* Hover indicator - time label */}
            {activeIndex !== null && chartData[activeIndex] && (
              <div className="border-light-gray absolute bottom-[10px] left-1/2 z-20 -translate-x-1/2 transform rounded-[6px] border bg-white/90 px-[12px] py-[6px] shadow-lg backdrop-blur-sm">
                <p className="text-text-primary text-[12px] font-medium tracking-[-0.12px]">
                  {chartData[activeIndex].time}
                </p>
              </div>
            )}
          </div>

          {/* X-axis time labels */}
          <div
            className="relative z-10 mt-[4px] flex w-full items-center justify-between overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-[6px] md:mt-[8px] [&::-webkit-scrollbar]:hidden"
            style={{ paddingRight: "25px" }}
          >
            {chartData
              .map((point, index) => ({ point, index }))
              .filter(({ point }) => point.timeLabel !== "")
              .map(({ point, index }) => {
                // Check if this time label matches the hovered data point
                const isActive =
                  activeIndex !== null &&
                  chartData[activeIndex] &&
                  chartData[activeIndex].time === point.time;

                return (
                  <p
                    key={`${point.time}-${index}`}
                    className={`text-center text-[10px] leading-none font-normal tracking-[-0.12px] transition-colors sm:text-[11px] md:text-[12px] ${
                      isActive
                        ? "text-text-primary font-medium"
                        : "text-soft-400"
                    }`}
                  >
                    {point.timeLabel}
                  </p>
                );
              })}
          </div>
        </div>
      )}

      {/* Live Feed Tab Content */}
      {activeTab === "Live Feed" && (
        <div className="flex w-full flex-col items-start gap-[12px]">
          <div className="flex items-center gap-[12px] p-2 sm:gap-[24px]">
            <div className="flex min-h-px min-w-px grow basis-0 items-center gap-[12px] px-[12px] py-0 sm:gap-[24px] sm:px-[16px] md:px-[20px]">
              <div className="flex h-full min-h-px min-w-px grow basis-0 items-center gap-[2px] sm:gap-[4px]">
                {quarters.map((quarter) => (
                  <button
                    key={quarter}
                    onClick={() => setActiveQuarter(quarter)}
                    className={`flex h-full min-h-px min-w-px grow cursor-pointer flex-col items-center justify-center gap-[14px] p-2 ${
                      activeQuarter === quarter
                        ? "bg-soft-500 text-text-primary rounded-md text-[12px] leading-none font-semibold tracking-[-0.14px] sm:text-[12px] md:text-[12px]"
                        : "text-soft-400 text-[12px] leading-none font-medium tracking-[-0.14px] sm:text-[12px] md:text-[12px]"
                    }`}
                  >
                    {quarter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-10 flex w-full flex-col items-center justify-center gap-10 px-4 lg:flex-row">
            {/* Play by Play Table */}
            <div className="w-full flex-1 lg:max-w-[573px]">
              <div className="bg-page-background relative h-[200px] overflow-hidden rounded-[20px] p-2 sm:h-[240px] md:h-[308px]">
                <div className="h-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <Table className="w-full min-w-[350px] table-auto border-separate border-spacing-y-1 sm:min-w-[500px]">
                    <TableHeader>
                      <TableRow className="border-0">
                        <TableHead className="border-0 px-3 py-2 text-[10px] font-medium tracking-[-0.12px] text-[#868c98] sm:text-[11px] md:text-[12px]">
                          Time
                        </TableHead>
                        <TableHead className="border-0 px-3 py-2 text-[10px] font-medium tracking-[-0.12px] text-[#868c98] sm:text-[11px] md:text-[12px]">
                          Play
                        </TableHead>
                        <TableHead className="w-[40px] border-0 px-3 py-2 text-[10px] font-medium tracking-[-0.12px] text-[#868c98] sm:w-[50px] sm:text-[11px] md:w-[64px] md:text-[12px]">
                          Weight
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playByPlayData.map((play, index) => (
                        <TableRow
                          key={index}
                          className="mb-1 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white"
                        >
                          <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-3 py-2 font-medium">
                            {play.time}
                          </TableCell>
                          <TableCell className="px-3 py-2">
                            <div className="flex items-center gap-[2px] sm:gap-[3px] md:gap-[4px]">
                              <div className="flex h-[24px] w-[24px] shrink-0 flex-col items-center justify-center px-[3px] py-[7px] sm:h-[28px] sm:w-[28px] md:h-[32px] md:w-[32px]">
                                <Image
                                  src={play.teamLogo}
                                  alt={play.play}
                                  width={32}
                                  height={32}
                                />
                              </div>
                              <span className="flex flex-col gap-[2px]">
                                <p className="text-nowrap whitespace-pre">
                                  {play.play}
                                </p>
                                <p className="text-soft-400 text-xs text-nowrap whitespace-pre">
                                  ({play.playUpdate})
                                </p>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="w-[40px] rounded-tr-[14px] rounded-br-[14px] px-3 py-2 sm:w-[50px] md:w-[64px]">
                            {play.score1}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            {/* Basketball Court */}
            <div className="relative h-[200px] w-full flex-1 overflow-hidden rounded-[20px] sm:h-[240px] md:h-[308px] lg:max-w-[573px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={courtImage}
                className="block size-full max-w-none"
                alt="Basketball Court"
              />

              {/* Left Side Switches (Lakers - Gold) */}
              {lakersMade && (
                <>
                  {/* Made shots - filled circles */}
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "6.53%", top: "14.2%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "8.17%", top: "85.1%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "13.79%", top: "24.3%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "22.87%", top: "7.4%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "15.43%", top: "75%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#b47818] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "28.13%", top: "81.7%" }}
                  />
                </>
              )}
              {lakersMissed && (
                <>
                  {/* Missed shots - circles with white dots */}
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "24.5%", top: "32.8%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "29.95%", top: "29.4%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "26.32%", top: "42.9%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "33.58%", top: "42.9%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "24.5%", top: "56.4%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#b47818] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "20.87%", top: "69.6%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                </>
              )}

              {/* Right Side Switches (Warriors - Red) */}
              {warriorsMade && (
                <>
                  {/* Made shots - filled circles */}
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "89.29%", top: "11.8%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "87.66%", top: "82.8%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "82.03%", top: "22%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "72.96%", top: "5.1%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "80.4%", top: "72.6%" }}
                  />
                  <div
                    className="absolute size-[10px] rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.23)] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "67.69%", top: "79.4%" }}
                  />
                </>
              )}
              {warriorsMissed && (
                <>
                  {/* Missed shots - circles with white dots */}
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "71.33%", top: "30.4%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "65.88%", top: "27%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "69.51%", top: "40.5%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "62.25%", top: "40.5%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "71.33%", top: "54.1%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                  <div
                    className="absolute flex size-[10px] items-center justify-center rounded-[100px] border-2 border-solid border-white bg-[#cb0d0d] sm:size-[12px] md:size-[14.56px]"
                    style={{ left: "74.95%", top: "67.2%" }}
                  >
                    <div className="size-[4px] rounded-[100px] bg-white shadow-[0px_6px_10px_0px_rgba(22,38,100,0.08),0px_4px_8px_0px_rgba(22,38,100,0.08),0px_2px_4px_0px_rgba(22,38,100,0.08),0px_2px_5px_0px_rgba(0,0,0,0.4)] sm:size-[5px] md:size-[6px]" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orderbook Tab Content */}
      {activeTab === "Orderbook" && (
        <div className="flex w-full flex-col items-start gap-4 p-4 md:flex-row">
          {/* Bids Column (Left) */}
          <div className="flex min-h-px w-full min-w-px grow basis-0 flex-col items-start">
            {/* Bids Header */}
            <div className="flex w-full items-start gap-[4px] p-[2px] sm:p-[4px]">
              <div className="flex min-h-px min-w-px grow basis-0 flex-col items-start gap-[8px] px-[12px] py-[10px] sm:gap-[12px] sm:px-[16px] sm:py-[12px]">
                <p className="text-text-primary w-full text-[11px] leading-none font-medium tracking-[-0.12px] sm:text-[12px]">
                  Bids (YES)
                </p>
              </div>
            </div>

            <div className="bg-page-background x-auto w-full rounded-[14px] p-1">
              {/* Bids Table Header */}
              <div className="flex w-full items-center justify-between px-[12px] py-[12px] text-[10px] leading-none font-medium tracking-[-0.12px] text-[#868c98] sm:px-[16px] sm:py-[16px] sm:text-[11px] md:px-[20px] md:text-[12px]">
                <p>Size</p>
                <p>Price</p>
              </div>

              {/* Bids Rows */}
              {bidsData.map((bid, index) => (
                <div
                  key={index}
                  className={`relative mb-2 flex w-full items-center gap-[12px] rounded-[14px] bg-white px-[12px] py-[12px] sm:gap-[16px] sm:px-[16px] sm:py-[14px] md:gap-[24px] md:px-[20px] md:py-[16px] ${
                    index < bidsData.length - 1
                      ? "border-light-gray border-[0px_0px_1px] border-solid"
                      : ""
                  }`}
                >
                  {/* Background Bar */}
                  <div
                    className="absolute top-1/2 right-0 h-[40px] translate-y-[-50%] rounded-tr-[14px] rounded-br-[14px] bg-[rgba(22,163,74,0.2)] sm:h-[43px] md:h-[46px]"
                    style={{
                      width: `${bid.barWidth}%`,
                      maxWidth: "50%",
                    }}
                  />
                  <p className="text-text-primary relative z-10 w-[80px] text-[12px] leading-none font-medium tracking-[-0.14px] sm:w-[120px] sm:text-[13px] md:w-[180px] md:text-[14px]">
                    {bid.price}
                  </p>
                  <p className="relative z-10 ml-auto text-[12px] leading-none font-medium tracking-[-0.14px] text-green-600 sm:text-[13px] md:text-[14px]">
                    {bid.size}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Asks Column (Right) */}
          <div className="flex min-h-px w-full min-w-px grow basis-0 flex-col items-start">
            {/* Asks Header */}
            <div className="flex w-full items-start gap-[4px] p-[2px] sm:p-[4px]">
              <div className="flex min-h-px min-w-px grow basis-0 flex-col items-start gap-[8px] px-[12px] py-[10px] sm:gap-[12px] sm:px-[16px] sm:py-[12px]">
                <p className="text-text-primary w-full text-[11px] leading-none font-medium tracking-[-0.12px] sm:text-[12px]">
                  Asks (YES)
                </p>
              </div>
            </div>

            <div className="bg-page-background mb-4 w-full rounded-[14px] p-1">
              {/* Asks Table Header */}
              <div className="flex w-full items-center justify-between px-[12px] py-[12px] text-[10px] leading-none font-medium tracking-[-0.12px] text-[#868c98] sm:px-[16px] sm:py-[16px] sm:text-[11px] md:px-[20px] md:text-[12px]">
                <p>Size</p>
                <p>Price</p>
              </div>

              {/* Asks Rows */}
              {asksData.map((ask, index) => (
                <div
                  key={index}
                  className={`relative mb-2 flex w-full items-center gap-[12px] rounded-[14px] bg-white px-[12px] py-[12px] sm:gap-[16px] sm:px-[16px] sm:py-[14px] md:gap-[24px] md:px-[20px] md:py-[16px] ${
                    index < asksData.length - 1
                      ? "border-light-gray border-[0px_0px_1px] border-solid"
                      : ""
                  }`}
                >
                  {/* Background Bar */}
                  <div
                    className="absolute top-1/2 left-0 h-[40px] translate-y-[-50%] rounded-tl-[14px] rounded-bl-[14px] bg-[rgba(252,57,112,0.2)] sm:h-[43px] md:h-[46px]"
                    style={{
                      width: `${ask.barWidth}%`,
                      maxWidth: "50%",
                    }}
                  />
                  <p className="relative z-10 w-[80px] text-[12px] leading-none font-medium tracking-[-0.14px] text-[#fc3970] sm:w-[120px] sm:text-[13px] md:w-[180px] md:text-[14px]">
                    {ask.price}
                  </p>
                  <p className="text-text-primary relative z-10 min-h-px min-w-px grow basis-0 text-[12px] leading-none font-medium tracking-[-0.14px] sm:text-[13px] md:text-[14px]">
                    {ask.size}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
