import React from "react";
import Image from "next/image";
import TradeButton from "../common/trade-button";
interface GameCardProps {
  image?: string;
  team1: {
    score: number;
    icon: string;
    name: string;
    price: string;
    change: number;
  };
  team2: {
    score: number;
    icon: string;
    name: string;
    price: string;
    change: number;
  };
  status: string;
  volume: string;
}

export default function GameCard({
  image = "/images/moments/basketball-moment.png",
  team1,
  team2,
  status,
  volume,
}: GameCardProps) {
  return (
    <div className="bg-elevation-card relative h-auto w-[356px] overflow-hidden rounded-[14px]">
      <div className="relative">
        <Image
          src={image}
          className="h-auto w-full"
          alt="NBA Game"
          width={356}
          height={200}
        />
        <div className="absolute top-4 left-4 flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-600 px-2 py-1 text-xs text-white">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          Live
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_auto_1fr] gap-x-3 gap-y-1 px-4 py-2">
        {/* Team 1 Row */}
        <div className="contents">
          <p className="text-text-primary text-[20px] font-semibold">
            {team1.score}
          </p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image src={team1.icon} alt={team1.name} width={20} height={20} />
            <p className="text-muted-foreground text-xs font-bold">
              {team1.name}
            </p>
          </div>
          <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium whitespace-nowrap">
            {team1.price}{" "}
            <p
              className={
                team1.change >= 0 ? "text-light-green" : "text-neon-pink"
              }
            >
              {team1.change >= 0 ? "+" : ""}
              {team1.change}%
            </p>
          </span>
          <div className="flex flex-row items-center justify-end gap-1">
            <TradeButton type="long" />
            <TradeButton type="short" />
          </div>
        </div>

        {/* Team 2 Row */}
        <div className="contents">
          <p className="text-text-primary text-[20px] font-semibold">
            {team2.score}
          </p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image src={team2.icon} alt={team2.name} width={20} height={20} />
            <p className="text-muted-foreground text-xs font-bold">
              {team2.name}
            </p>
          </div>
          <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium whitespace-nowrap">
            {team2.price}{" "}
            <p
              className={
                team2.change >= 0 ? "text-light-green" : "text-neon-pink"
              }
            >
              {team2.change >= 0 ? "+" : ""}
              {team2.change}%
            </p>
          </span>
          <div className="flex flex-row items-center justify-end gap-1">
            <TradeButton type="long" />
            <TradeButton type="short" />
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 px-4 pb-4">
        <h6 className="text-text-secondary text-xs font-medium">{status}</h6>
        <h6 className="text-text-secondary text-xs font-medium">{volume}</h6>
      </div>
    </div>
  );
}
