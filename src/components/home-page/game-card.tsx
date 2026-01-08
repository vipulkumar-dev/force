import React from "react";
import Image from "next/image";
import TradeButton from "../trade-button";
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
    <div className="bg-elevation-card relative mr-4 h-auto w-[356px] overflow-hidden rounded-lg">
      <div className="relative">
        <Image
          src={image}
          className="h-auto w-full"
          alt="NBA Game"
          width={356}
          height={200}
        />
        <div className="absolute top-2 left-2 flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-600 px-2 py-1 text-xs text-white">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          Live
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-2 px-4 py-2">
        <p className="text-md text-text-primary font-bold">{team1.score}</p>
        <div className="flex flex-row items-center justify-start gap-2">
          <Image src={team1.icon} alt={team1.name} width={20} height={20} />
          <p className="text-muted-foreground text-xs font-bold">
            {team1.name}
          </p>
        </div>
        <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium">
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
          {/* <button className="bg-page-background rounded-lg hover:cursor-pointer p-3">
            <Image
              src="/icons/game/short.svg"
              alt="Short"
              width={10}
              height={10}
            />
          </button> */}
          <TradeButton type="short" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-2 px-4">
        <p className="text-md text-text-primary font-bold">{team2.score}</p>
        <div className="flex flex-row items-center justify-start gap-1">
          <Image src={team2.icon} alt={team2.name} width={20} height={20} />
          <p className="text-muted-foreground text-xs font-bold">
            {team2.name}
          </p>
        </div>
        <span className="text-text-primary flex flex-row items-center gap-2 text-xs font-medium">
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

      <div className="flex flex-row items-center justify-between gap-2 px-4 pt-2 pb-4">
        <h6 className="font-500 text-muted-foreground text-xs">{status}</h6>
        <h6 className="font-500 text-muted-foreground text-xs">{volume}</h6>
      </div>
    </div>
  );
}
