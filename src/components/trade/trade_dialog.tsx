import { X, Gift } from "lucide-react";
import React, { useState, useEffect } from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

const TradeDialog = ({ type }: { type: string }) => {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [orderSize, setOrderSize] = useState<string>("0");
  const [leverage, setLeverage] = useState<number>(6);
  const [entryPrice, setEntryPrice] = useState<number>(102.3); // Sample price
  const [estimatedFees, setEstimatedFees] = useState<number>(0);
  const [liquidationPrice, setLiquidationPrice] = useState<number>(0);
  const [orderSizeNum, setOrderSizeNum] = useState<number>(0);

  // Calculate derived values when inputs change
  useEffect(() => {
    const size = parseFloat(orderSize) || 0;
    setOrderSizeNum(size);

    // Calculate estimated fees (typically 0.1% of order size)
    const fees = size * 0.001;
    setEstimatedFees(fees);

    // Calculate liquidation price based on leverage and entry price
    // For long: liquidation = entryPrice * (1 - 1/leverage)
    // For short: liquidation = entryPrice * (1 + 1/leverage)
    if (type === "long") {
      const liqPrice = entryPrice * (1 - 1 / leverage);
      setLiquidationPrice(liqPrice);
    } else {
      const liqPrice = entryPrice * (1 + 1 / leverage);
      setLiquidationPrice(liqPrice);
    }
  }, [orderSize, leverage, entryPrice, type]);

  const handleOrderSizeChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setOrderSize(value);
    }
  };

  const handleConfirmOrder = () => {
    console.log("Confirm Order", {
      side: type,
      orderType,
      orderSize: orderSizeNum,
      leverage,
      entryPrice,
      estimatedFees,
      liquidationPrice,
    });
    // Here you would typically send the order to your backend
  };

  return (
    <div className="w-full">
      <div
        id="trading-panel"
        className="flex w-full flex-col overflow-y-auto overscroll-contain rounded-[20px] bg-white backdrop-blur-[22px] [-ms-overflow-style:none]"
      >
        <div className="flex flex-row items-center justify-between px-[12px] pt-[12px] sm:px-[16px] sm:pt-[16px] md:px-[20px] md:pt-[20px]">
          <h4 className="text-text-primary text-[16px] leading-[100%] font-semibold tracking-[-1%]">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h4>
          <DialogClose asChild>
            <button className="text-soft-400 p-3 hover:cursor-pointer">
              <X className="h-6 w-6" />
            </button>
          </DialogClose>
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
          <div className="relative flex flex-row items-center gap-2 py-2">
            <div className="bg-dark-yellow relative h-[40px] w-[40px] overflow-hidden rounded-full">
              <Image
                src="/icons/athletes/logo.png"
                alt="Logo"
                fill
                className="object-cover object-top opacity-8 mix-blend-screen"
              />
              <Image
                src="/icons/athletes/lebron-james.png"
                alt="LeBron James"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-text-primary text-[14px] leading-[100%] font-medium tracking-[-2%]">
                LeBron James
              </p>
              <p className="text-soft-400 text-[12px] leading-[100%] font-medium tracking-[-1%]">
                Los Angeles Lakers
              </p>
            </div>
          </div>
          {/* Order Size */}
          <div className="flex w-full flex-col">
            <div className="border-light-gray flex flex-col items-start gap-[8px] border-[0px_0px_1px] border-solid px-0 py-[12px] sm:flex-row sm:items-center sm:gap-[16px] sm:py-[12px]">
              <div className="flex h-[44px] w-full items-center justify-start rounded-[10px] bg-white px-[16px] py-[10px] text-[20px] leading-none tracking-[-0.24px] sm:h-[48px] sm:flex-1 sm:px-[20px] sm:py-[13px] sm:text-[24px]">
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
                    value={[leverage]}
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
                    className={`text-[14px] leading-[100%] font-medium tracking-[-1%] ${type === "long" ? "text-success" : "text-warning"}`}
                  >
                    {type === "long" ? "Long" : "Short"}
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
    </div>
  );
};

export default TradeDialog;
