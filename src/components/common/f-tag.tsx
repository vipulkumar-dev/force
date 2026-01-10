import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FTagProps {
  percentage?: number;
  className?: string;
}
export default function FTag({ percentage = 80, className }: FTagProps) {
  return (
    <div
      className={cn(
        "bg-elevation-button text-text-secondary flex flex-row items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      <Image src="/icons/game/f.svg" alt="Long" width={7} height={8} />
      {percentage}%
    </div>
  );
}
