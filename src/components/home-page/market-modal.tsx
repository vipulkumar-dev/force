import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { DialogClose } from "@/components/ui/dialog";

export default function MarketModal({ type }: { type: string }) {
  const [orderSize, setOrderSize] = useState<string>("50");
  const [leverage, setLeverage] = useState<number>(6);

  const filters = ["Market", "Limit"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

  // Calculate dynamic values
  const orderSizeNum = parseFloat(orderSize) || 0;
  const entryPrice = 102.45; // Would come from props in real scenario
  const estimatedFees = orderSizeNum * 0.001; // 0.1% fee
  const liquidationPrice =
    type === "long"
      ? entryPrice * (1 - 1 / leverage)
      : entryPrice * (1 + 1 / leverage);

  const onFilterClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    label: string
  ) => {
    e.stopPropagation();
    setSelectedFilter(label);
  };
  return (
    <>
      <DialogClose asChild>
        <Button className="flex flex-row w-full h-fit justify-between border-b border-light-gray px-[20px]! py-[20px] gap-[20px] bg-white hover:bg-primary-foreground hover:cursor-pointer">
          <p className="font-nohemi font-medium text-[14px] leading-[100%] tracking-[2%] text-main">
            {type === "long" ? "Long" : "Short"}
          </p>
          <X className="text-soft-400" width={14} height={14} />
        </Button>
      </DialogClose>
      <div className="flex flex-col py-4 sm:py-5 px-4 sm:px-6 gap-5 w-full">
        <div className="flex flex-row gap-2 w-fit">
          {filters.map((label) => {
            const isSelected = selectedFilter === label;
            return (
              <Button
                key={label}
                onClick={(e) => onFilterClick(e, label)}
                className={`flex flex-row rounded-[100px] h-fit items-center justify-center py-[6px] px-[10px] gap-[4px] border transition-colors duration-200 ease-out hover:cursor-pointer ${
                  isSelected
                    ? "bg-main border-black/5"
                    : "bg-white border-main/7 hover:bg-primary-foreground"
                }`}
              >
                <p
                  className={`font-medium text-[12px] leading-[100%] tracking-[-1%] ${
                    isSelected ? "text-white" : "text-sub-500"
                  }`}
                >
                  {label}
                </p>
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full justify-end border-b border-light-gray py-4 gap-4">
            <div className="flex flex-row items-center gap-2 w-full">
              <div className="flex flex-row gap-2 items-center w-[87px]">
                <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-soft-400 text-nowrap">
                  Order size
                </p>
              </div>
              <div className="relative w-full h-12 rounded-[10px] border border-main/7 bg-white flex items-center justify-end px-5 gap-1">
                <span className="text-[24px] font-medium text-main/20">$</span>
                <Input
                  type="text"
                  value={orderSize}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setOrderSize(value);
                  }}
                  placeholder="50"
                  size={Math.max(orderSize.length, 2)}
                  className="h-12 border-0 bg-transparent text-right text-[24px]! font-medium text-main placeholder:text-main/20 placeholder:!text-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 p-0 w-auto min-w-[2ch] shrink-0"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-b border-light-gray py-4 gap-4">
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-[14px] leading-[100%] tracking-[-1%] text-main">
                Leverage
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
              <div className="flex flex-col gap-3.5 w-full sm:min-w-[286px]">
                <Slider
                  defaultValue={[6]}
                  min={1}
                  max={10}
                  step={1}
                  showLabels={true}
                  labels={[
                    "1x",
                    "2x",
                    "3x",
                    "4x",
                    "5x",
                    "6x",
                    "7x",
                    "8x",
                    "9x",
                    "10x",
                  ]}
                  onValueChange={(value) => setLeverage(value[0])}
                />
              </div>
              <div className="flex flex-row items-center justify-center w-[50px] h-10 rounded-[10px] border border-main/7 py-2.5 px-4 gap-1 bg-white self-start sm:self-auto">
                <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                  {leverage}x
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-b border-light-gray">
            {" "}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="data-[state=open]:px-5 data-[state=open]:my-5 data-[state=open]:bg-main/2"
              >
                <AccordionTrigger>Advanced parameters</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Side:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        {type === "long" ? "Long" : "Short"}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Entry Price:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${entryPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Order Size:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${orderSizeNum.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Leverage:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        {leverage}x
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Est. Fees:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${estimatedFees.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Liq. Price:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${liquidationPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col w-full border-b border-light-gray">
            {" "}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="item-1"
                className="data-[state=open]:px-5 data-[state=open]:my-5 data-[state=open]:bg-main/2"
              >
                <AccordionTrigger>Trade summary</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Side:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        {type === "long" ? "Long" : "Short"}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Entry Price:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${entryPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Order Size:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${orderSizeNum.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Leverage:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        {leverage}x
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Est. Fees:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${estimatedFees.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Liq. Price:
                      </p>
                      <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-main">
                        ${liquidationPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex flex-row w-full rounded-lg border border-[#e1c925]/8 px-3 py-2.5 gap-3 bg-lighter-yellow">
          <div className="flex flex-row items-center justify-center rounded-[52px] p-2.5 gap-1 bg-light-yellow">
            <Image src="/icons/gift.svg" alt="gift" width={14} height={14} />
          </div>
          <p className="font-medium text-[12px] leading-[140%] text-dark-yellow tracking-[-1%]">
            Place your first $10 trade to unlock your starter position.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <Button className="flex flex-row items-center justify-center w-full h-10 rounded-lg py-2.5 px-4 gap-2 bg-main hover:cursor-pointer">
            <p>Confirm Market Order</p>
          </Button>
          <p className="text-[11px] leading-[100%] w-full tracking-[-1%] text-center text-soft-400">
            Order will execute immediately at the best available price.
          </p>
        </div>
      </div>
    </>
  );
}
