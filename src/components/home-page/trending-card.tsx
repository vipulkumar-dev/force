import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "../ui/dialog";
import TradeDialog from "../trade/trade_dialog";
import TradeButton from "../trade-button";
interface TrendingCardProps {
  id: string;
  image?: string;
  name: string;
  abbreviation: string;
  price: string;
  change: number;
  percentage?: number;
}

export default function TrendingCard({
  image = "/icons/athletes/lebron-james.png",
  name,
  abbreviation,
  price,
  change,
  percentage = 80,
}: TrendingCardProps) {
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState<string>("long");
  return (
    <div className="bg-elevation-card relative mr-4 flex h-auto w-[170px] flex-col items-center justify-center overflow-hidden rounded-[14px] pt-[24px] pr-[20px] pb-[20px] pl-[20px]">
      <div className="bg-league-card text-soft-400 absolute top-2 right-2 flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
        <Image src="/icons/game/f.svg" alt="Long" width={8} height={10} />
        {percentage}%
      </div>
      <Image
        src={image}
        className="rounded-full object-cover object-top"
        alt={name}
        width={40}
        height={40}
      />
      <span className="text-text-primary max-w-[100%] truncate text-sm font-semibold">
        {name}
      </span>
      <p className="text-soft-400 text-xs font-medium">{abbreviation}</p>
      <span className="flex flex-row items-center justify-center gap-2">
        <p className="text-text-primary text-xs">{price}</p>
        <p
          className={`text-xs ${
            change >= 0 ? "text-light-green" : "text-neon-pink"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </p>
      </span>
      <div className="flex flex-row items-center justify-between gap-1 px-2 pt-3">
        <TradeButton
          onClick={() => {
            setOpenTradeDialog(true);
            setTradeType("long");
          }}
          type="long"
          className="md:w-[63px]"
        />
        <TradeButton
          onClick={() => {
            setOpenTradeDialog(true);
            setTradeType("short");
          }}
          type="short"
          className="md:w-[63px]"
        />
      </div>
      <Dialog open={openTradeDialog} onOpenChange={setOpenTradeDialog}>
        <DialogContent showCloseButton={false} className="p-0">
          <TradeDialog type={tradeType} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
