"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import MissedMomentsRow from "@/components/discover-page/missed-moments-row";
import { useEffect, useState } from "react";

type MomentEvent = {
  eventSrc: string;
  eventAlt: string;
  title: string;
  description: string;
  volume: string;
  percentage: string;
  timeAgo: string;
};

export default function MissedMomentsTable({
  events,
}: {
  events: MomentEvent[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" &&
          window.matchMedia("(max-width: 768px)").matches
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const visibleEvents = isMobile ? events.slice(0, 3) : events;

  return (
    <div className="flex flex-col rounded-[10px] bg-white w-full">
      <Button
        asChild
        className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer"
      >
        <a target="_blank" href="https://www.nba.com/news/category/top-stories">
          <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
            Moments You Missed
          </p>
          <ChevronRight className="text-soft-400" width={14} height={14} />
        </a>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {visibleEvents.map((event, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "border-r border-light-gray" : ""}
          >
            <MissedMomentsRow
              eventSrc={event.eventSrc}
              eventAlt={event.eventAlt}
              title={event.title}
              description={event.description}
              volume={event.volume}
              percentage={event.percentage}
              timeAgo={event.timeAgo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
