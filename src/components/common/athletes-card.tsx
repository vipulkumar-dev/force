import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "../ui/dialog";
import TradeDialog from "../trade/trade_dialog";
import TradeButton from "./trade-button";
import FTag from "./f-tag";
interface AthletesCardProps {
  id: string;
  image?: string;
  name: string;
  abbreviation: string;
  price: string;
  change: number;
  percentage?: number;
}

export default function AthletesCard({
  image = "/icons/athletes/lebron-james.png",
  name,
  abbreviation,
  price,
  change,
  percentage = 80,
}: AthletesCardProps) {
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState<string>("long");
  return (
    <div className="bg-elevation-card relative flex h-auto flex-col items-center justify-center overflow-hidden rounded-[14px] pt-[24px] pr-[20px] pb-[20px] pl-[20px]">
      <FTag percentage={percentage} className="absolute top-2 right-2" />
      <Image
        src={image}
        className="bg-bg-primary h-10 w-10 shrink-0 rounded-full object-cover object-top"
        alt={name}
        width={40}
        height={40}
      />
      <div className="flex flex-col items-center justify-center pt-2">
        <span className="text-text-primary max-w-[100%] truncate text-sm font-semibold">
          {name}
        </span>
        <p className="text-text-secondary text-xs font-medium">
          {abbreviation}
        </p>
      </div>
      <span className="flex flex-row items-center justify-center gap-1 pt-1.5 font-medium">
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
      <div className="flex flex-row items-center justify-between gap-1 pt-2.5">
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
