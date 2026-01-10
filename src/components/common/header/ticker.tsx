import React from "react";
import { cn } from "@/lib/utils";

const tickerItems = [
  { name: "L. James", change: 2.4 },
  { name: "G. Antetokounmpo", change: -0.03 },
  { name: "S. Curry", change: 2.4 },
  { name: "K. Durant", change: 2.4 },
  { name: "N. Jokic", change: -0.03 },
  { name: "L. Doncic", change: 2.4 },
  { name: "J. Tatum", change: -0.03 },
  { name: "A. Davis", change: 2.4 },
];

const formatChange = (n: number) => `${n > 0 ? "+" : ""}${n}%`;

export default function Ticker() {
  return (
    <>
      {tickerItems.map((item, idx) => (
        <span
          key={`t2-${idx}`}
          className="ticker-track text-text-secondary mr-[24px] flex items-center gap-[8px] font-mono text-[11px] leading-[100%] font-medium tracking-[-0.05em]"
        >
          <span>{item.name}</span>
          <span
            className={cn(
              item.change >= 0 ? "text-light-green" : "text-neon-pink",
            )}
          >
            {formatChange(item.change)}
          </span>
        </span>
      ))}
    </>
  );
}
