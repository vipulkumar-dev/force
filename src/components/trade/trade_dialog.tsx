import { X, Gift } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { DialogClose } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'

const TradeDialog = ({type}: {type: string}) => {
  
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
    <div className='w-full'>
      <div
        id="trading-panel"
        className="backdrop-blur-[22px] bg-white flex flex-col w-full rounded-[20px] overflow-y-auto overscroll-contain [-ms-overflow-style:none]"
      >
        <div className='flex flex-row items-center justify-between px-[12px] sm:px-[16px] md:px-[20px] pt-[12px] sm:pt-[16px] md:pt-[20px]'>
          <h4 className='text-[16px] leading-[100%] tracking-[-1%] font-semibold text-main'>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
          <DialogClose asChild>
            <button className='text-soft-400 hover:cursor-pointer p-3'><X className='w-6 h-6' /></button>
          </DialogClose>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[16px] sm:gap-[20px] p-[12px] sm:p-[16px] md:p-[20px]">
          {/* Market/Limit Selection */}
          <div className="flex gap-[6px] sm:gap-[8px]">
            <button
              onClick={() => setOrderType("market")}
              className={`h-[30px] sm:h-[32px] rounded-md  px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] flex items-center gap-[4px] cursor-pointer ${orderType === "market"
                  ? "bg-soft-500 border-main/7 text-main"
                  : "bg-transparent text-sub-500"
                }`}
            >
              <p className="font-medium text-[11px] sm:text-[12px] tracking-[-0.12px]">Market</p>
            </button>
            <button
              onClick={() => setOrderType("limit")}
              className={`h-[30px] sm:h-[32px] rounded-md  px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] flex items-center gap-[4px] cursor-pointer ${orderType === "limit"
                  ? "bg-soft-500 border-main/7 text-main"
                  : "bg-transparent text-sub-500"
                }`}
            >
              <p className="font-medium text-[11px] sm:text-[12px] tracking-[-0.12px]">Limit</p>
            </button>
          </div>
          <div className="relative flex flex-row gap-2 items-center py-2">
            <div className="relative w-[40px] h-[40px]   rounded-full bg-dark-yellow overflow-hidden">
              <Image
                src="/icons/athletes/logo.png"
                alt="Logo"
                fill
                className="object-cover object-top opacity-8 mix-blend-screen"
              />
              <Image
                src='/icons/athletes/lebron-james.png'
                alt='LeBron James'
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-main text-[14px] leading-[100%] tracking-[-2%] font-medium">LeBron James</p>
              <p className="text-soft-400 text-[12px] leading-[100%] tracking-[-1%] font-medium">Los Angeles Lakers</p>
            </div>
          </div>
          {/* Order Size */}
          <div className="flex flex-col w-full">
            <div className="border-light-gray border-[0px_0px_1px] border-solid flex flex-col sm:flex-row gap-[8px] sm:gap-[16px] items-start sm:items-center px-0 py-[12px] sm:py-[12px]">
              <div className="bg-white flex items-center justify-start w-full sm:flex-1 h-[44px] sm:h-[48px] leading-none px-[16px] sm:px-[20px] py-[10px] sm:py-[13px] rounded-[10px] text-[20px] sm:text-[24px] tracking-[-0.24px]">
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
                  <p className={`font-medium text-[14px] leading-[100%] tracking-[-1%] ${type === "long" ? "text-success" : "text-warning"}`}>
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
    </div>
  )
}

export default TradeDialog