"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Gift } from "lucide-react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TradingPanelProps {
  athleteName: string;
  currentPrice: number;
  onPlaceOrder: (
    type: "long" | "short",
    orderSize: number,
    leverage: number,
  ) => void;
}

export default function TradingPanel({
  athleteName,
  currentPrice,
  onPlaceOrder,
}: TradingPanelProps) {
  const [activeTab, setActiveTab] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [orderSize, setOrderSize] = useState<string>("0");
  const [leverage, setLeverage] = useState<number>(6);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(true);

  const orderSizeNum = parseFloat(orderSize) || 0;
  const entryPrice = currentPrice;
  const estimatedFees = orderSizeNum * 0.001; // 0.1% fee
  const liquidationPrice =
    activeTab === "long"
      ? entryPrice * (1 - 1 / leverage)
      : entryPrice * (1 + 1 / leverage);

  const handleLeverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeverage(parseInt(e.target.value));
  };

  const handleOrderSizeChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setOrderSize(value);
    }
  };

  const handleConfirmOrder = () => {
    onPlaceOrder(activeTab, orderSizeNum, leverage);
  };

  return (
    <div
      id="trading-panel"
      className="flex w-full flex-col overflow-y-auto overscroll-contain rounded-[20px] border border-black/5 bg-white backdrop-blur-[22px] [-ms-overflow-style:none]"
    >
      {/* Long/Short Tabs */}
      <div className="border-light-gray flex w-full items-center border-b">
        <div className="flex h-[44px] flex-1 items-center px-[12px] sm:h-[48px] sm:px-[16px] md:px-[20px]">
          <button
            onClick={() => setActiveTab("long")}
            className={`flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[14px] px-[12px] sm:px-[16px] md:px-[19px] ${
              activeTab === "long"
                ? "border-active-hover text-text-primary border-b text-[13px] font-semibold tracking-[-0.14px] sm:text-[14px]"
                : "text-soft-400 text-[13px] font-medium tracking-[-0.14px] sm:text-[14px]"
            }`}
          >
            Long
          </button>
          <button
            onClick={() => setActiveTab("short")}
            className={`flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[14px] px-[12px] sm:px-[16px] md:px-[19px] ${
              activeTab === "short"
                ? "border-active-hover text-text-primary border-b text-[13px] font-semibold tracking-[-0.14px] sm:text-[14px]"
                : "text-soft-400 text-[13px] font-medium tracking-[-0.14px] sm:text-[14px]"
            }`}
          >
            Short
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[16px] p-[12px] sm:gap-[20px] sm:p-[16px] md:p-[20px]">
        {/* Market/Limit Selection */}
        <div className="flex gap-[6px] sm:gap-[8px]">
          <button
            onClick={() => setOrderType("market")}
            className={`flex h-[30px] cursor-pointer items-center gap-[4px] rounded-md px-[12px] py-[6px] sm:h-[32px] sm:px-[16px] sm:py-[8px] ${
              orderType === "market"
                ? "bg-soft-500 border-main/7 text-text-primary"
                : "text-sub-500 bg-transparent"
            }`}
          >
            <p className="text-[11px] font-medium tracking-[-0.12px] sm:text-[12px]">
              Market
            </p>
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={`flex h-[30px] cursor-pointer items-center gap-[4px] rounded-md px-[12px] py-[6px] sm:h-[32px] sm:px-[16px] sm:py-[8px] ${
              orderType === "limit"
                ? "bg-soft-500 border-main/7 text-text-primary"
                : "text-sub-500 bg-transparent"
            }`}
          >
            <p className="text-[11px] font-medium tracking-[-0.12px] sm:text-[12px]">
              Limit
            </p>
          </button>
        </div>

        {/* Order Size */}
        <div className="flex w-full flex-col">
          <div className="border-light-gray flex flex-col items-start gap-[8px] border-[0px_0px_1px] border-solid px-0 py-[12px] sm:flex-row sm:items-center sm:gap-[16px] sm:py-[16px]">
            <div className="border-main/7 flex h-[44px] w-full items-center justify-start rounded-[10px] border border-solid bg-white px-[16px] py-[10px] text-[20px] leading-none tracking-[-0.24px] sm:h-[48px] sm:flex-1 sm:px-[20px] sm:py-[13px] sm:text-[24px]">
              <p className="mr-[3px] font-medium text-[rgba(10,13,20,0.2)]">
                $
              </p>
              <input
                type="text"
                value={orderSize}
                onChange={(e) => handleOrderSizeChange(e.target.value)}
                className="text-text-primary w-auto bg-transparent text-left font-semibold outline-none"
                placeholder="50"
                style={{ width: `${Math.max(orderSize.length, 2)}ch` }}
              />
            </div>
          </div>

          {/* Leverage */}
          <div className="border-light-gray flex w-full flex-col gap-3 border-b py-3 sm:gap-4 sm:py-4">
            <div className="flex flex-row justify-between">
              <p className="text-text-primary text-[13px] leading-[100%] font-semibold tracking-[-1%] sm:text-[14px]">
                Leverage
              </p>
            </div>
            <div className="flex w-full flex-row items-center gap-3 sm:gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-3.5">
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
              <div className="border-main/7 flex h-9 w-[44px] shrink-0 flex-row items-center justify-center gap-1 rounded-[10px] border bg-white px-3 py-2 sm:h-10 sm:w-[50px] sm:px-4 sm:py-2.5">
                <p className="text-text-primary text-[13px] leading-[100%] font-medium tracking-[-1%] sm:text-[14px]">
                  {leverage}x
                </p>
              </div>
            </div>
          </div>
          <div className="border-light-gray flex w-full flex-col border-b">
            {" "}
            <div className="flex w-full flex-col gap-4 py-4">
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Side:
                </p>
                <p
                  className={`text-[14px] leading-[100%] font-medium tracking-[-1%] ${activeTab === "long" ? "text-success" : "text-warning"}`}
                >
                  {activeTab === "long" ? "Long" : "Short"}
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Entry Price:
                </p>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  ${entryPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Order Size:
                </p>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  ${orderSizeNum.toFixed(2)}
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Leverage:
                </p>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  {leverage}x
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Est. Fees:
                </p>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  ${estimatedFees.toFixed(2)}
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-soft-400 text-[14px] leading-[100%] tracking-[-1%]">
                  Liq. Price:
                </p>
                <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-1%]">
                  ${liquidationPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-lighter-yellow flex items-center gap-[10px] rounded-[8px] border border-[#e9c125]/8 px-[10px] py-[8px] sm:gap-[12px] sm:px-[12px] sm:py-[10px]">
            <div className="flex shrink-0 items-center justify-center rounded-[52px] bg-[#fbdfb1] p-[8px] sm:p-[10px]">
              <Gift className="h-[12px] w-[12px] text-[#b47818] sm:h-[14px] sm:w-[14px]" />
            </div>
            <p className="flex-1 text-[11px] leading-[1.4] font-medium tracking-[-0.12px] text-[#b47818] sm:text-[12px]">
              Place your first $10 trade to unlock your starter position.
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex flex-col gap-[10px] sm:gap-[12px]">
          <button
            onClick={handleConfirmOrder}
            disabled={orderSizeNum <= 0}
            className="bg-main hover:bg-main/90 relative flex h-[38px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] px-[12px] py-[8px] shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.6)] transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:h-[40px] sm:px-[16px] sm:py-[10px]"
          >
            <p className="text-center text-[13px] font-medium tracking-[-0.14px] text-white sm:text-[14px]">
              Confirm {orderType === "market" ? "Market" : "Limit"} Order
            </p>
          </button>
          <p className="text-soft-400 text-center text-[10px] font-normal tracking-[-0.11px] sm:text-[11px]">
            Order will execute immediately at the best available price.
          </p>
        </div>
      </div>
    </div>
  );
}
