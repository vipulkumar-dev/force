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
  const [orderSize, setOrderSize] = useState<string>("50.00");
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
      className="backdrop-blur-[22px] bg-white flex flex-col w-full rounded-[20px] border border-black/5 overflow-y-auto overscroll-contain [-ms-overflow-style:none]"
    >
      {/* Long/Short Tabs */}
      <div className="flex items-center border-b border-light-gray w-full">
        <div className="flex flex-1 h-[44px] sm:h-[48px] items-center px-[12px] sm:px-[16px] md:px-[20px]">
          <button
            onClick={() => setActiveTab("long")}
            className={`flex-1 flex flex-col gap-[14px] h-full items-center justify-center px-[12px] sm:px-[16px] md:px-[19px] cursor-pointer ${
              activeTab === "long"
                ? "border-b border-active-hover font-semibold text-[13px] sm:text-[14px] text-main tracking-[-0.14px]"
                : "font-medium text-[13px] sm:text-[14px] text-soft-400 tracking-[-0.14px]"
            }`}
          >
            Long
          </button>
          <button
            onClick={() => setActiveTab("short")}
            className={`flex-1 flex flex-col gap-[14px] h-full items-center justify-center px-[12px] sm:px-[16px] md:px-[19px] cursor-pointer ${
              activeTab === "short"
                ? "border-b border-active-hover font-semibold text-[13px] sm:text-[14px] text-main tracking-[-0.14px]"
                : "font-medium text-[13px] sm:text-[14px] text-soft-400 tracking-[-0.14px]"
            }`}
          >
            Short
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[16px] sm:gap-[20px] p-[12px] sm:p-[16px] md:p-[20px]">
        {/* Market/Limit Selection */}
        <div className="flex gap-[6px] sm:gap-[8px]">
          <button
            onClick={() => setOrderType("market")}
            className={`h-[30px] sm:h-[32px] rounded-md  px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] flex items-center gap-[4px] cursor-pointer ${
              orderType === "market"
                ? "bg-soft-500 border-main/7 text-main"
                : "bg-transparent text-sub-500"
            }`}
          >
            <p className="font-medium text-[11px] sm:text-[12px] tracking-[-0.12px]">Market</p>
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={`h-[30px] sm:h-[32px] rounded-md  px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] flex items-center gap-[4px] cursor-pointer ${
              orderType === "limit"
                ? "bg-soft-500 border-main/7 text-main"
                : "bg-transparent text-sub-500"
            }`}
          >
            <p className="font-medium text-[11px] sm:text-[12px] tracking-[-0.12px]">Limit</p>
          </button>
        </div>

        {/* Order Size */}
        <div className="flex flex-col w-full">
          <div className="border-light-gray border-[0px_0px_1px] border-solid flex flex-col sm:flex-row gap-[8px] sm:gap-[16px] items-start sm:items-center px-0 py-[12px] sm:py-[16px]">
            <div className="bg-white border border-main/7 border-solid flex items-center justify-start w-full sm:flex-1 h-[44px] sm:h-[48px] leading-none px-[16px] sm:px-[20px] py-[10px] sm:py-[13px] rounded-[10px] text-[20px] sm:text-[24px] tracking-[-0.24px]">
              <p className="font-medium text-[rgba(10,13,20,0.2)] mr-[3px]">
                $
              </p>
              <input
                type="text"
                value={orderSize}
                onChange={(e) => handleOrderSizeChange(e.target.value)}
                className="font-semibold text-main bg-transparent outline-none w-auto text-left"
                placeholder="50"
                style={{ width: `${Math.max(orderSize.length, 2)}ch` }}
              />
            </div>
          </div>

          {/* Leverage */}
          <div className="flex flex-col w-full border-b border-light-gray py-3 sm:py-4 gap-3 sm:gap-4">
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-[13px] sm:text-[14px] leading-[100%] tracking-[-1%] text-main">
                Leverage
              </p>
            </div>
            <div className="flex flex-row gap-3 sm:gap-4 w-full items-center">
              <div className="flex flex-col gap-3 sm:gap-3.5 flex-1 min-w-0">
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
              <div className="flex flex-row items-center justify-center w-[44px] sm:w-[50px] h-9 sm:h-10 rounded-[10px] border border-main/7 py-2 sm:py-2.5 px-3 sm:px-4 gap-1 bg-white shrink-0">
                <p className="font-medium text-[13px] sm:text-[14px] leading-[100%] tracking-[-1%] text-main">
                  {leverage}x
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-b border-light-gray">
            {" "}
            <div className="flex flex-col gap-4 py-4 w-full">
                    <div className="flex flex-row w-full justify-between items-center">
                      <p className="text-[14px] leading-[100%] tracking-[-1%] text-soft-400">
                        Side:
                      </p>
                      <p className={`font-medium text-[14px] leading-[100%] tracking-[-1%] ${activeTab === "long" ? "text-success" : "text-warning"}`}>
                        {activeTab === "long" ? "Long" : "Short"}
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
          </div>

          {/* Promotional Banner */}
          <div className="bg-lighter-yellow border border-[#e9c125]/8 rounded-[8px] px-[10px] sm:px-[12px] py-[8px] sm:py-[10px] flex gap-[10px] sm:gap-[12px] items-center">
            <div className="bg-[#fbdfb1] rounded-[52px] p-[8px] sm:p-[10px] flex items-center justify-center shrink-0">
              <Gift className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] text-[#b47818]" />
            </div>
            <p className="flex-1 font-medium text-[11px] sm:text-[12px] leading-[1.4] text-[#b47818] tracking-[-0.12px]">
              Place your first $10 trade to unlock your starter position.
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex flex-col gap-[10px] sm:gap-[12px]">
          <button
            onClick={handleConfirmOrder}
            disabled={orderSizeNum <= 0}
            className="bg-main rounded-[8px] h-[38px] sm:h-[40px] px-[12px] sm:px-[16px] py-[8px] sm:py-[10px] flex items-center justify-center gap-[8px] relative shadow-[0px_0.5px_1px_0px_inset_rgba(255,255,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-main/90 transition-colors cursor-pointer"
          >
            <p className="font-medium text-[13px] sm:text-[14px] text-white text-center tracking-[-0.14px]">
              Confirm {orderType === "market" ? "Market" : "Limit"} Order
            </p>
          </button>
          <p className="font-normal text-[10px] sm:text-[11px] text-soft-400 text-center tracking-[-0.11px]">
            Order will execute immediately at the best available price.
          </p>
        </div>
      </div>
    </div>
  );
}
