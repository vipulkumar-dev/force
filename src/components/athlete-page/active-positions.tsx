"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import Image from "next/image";

export interface Position {
  athleteName: string;
  positionType: string;
  leverage: number;
  status: string;
  statusColor: "green" | "red" | "yellow";
  pnlAmount: number;
  pnlPercent: number;
  fundingRate: number;
  size: number;
  liquidationPrice: number;
  collateral: number;
  entryPrice: number;
  markPrice: number;
  isHighlighted?: boolean;
}

interface ActivePositionsProps {
  positions?: Position[];
  onClose?: (position: Position) => void;
}

const defaultPositions: Position[] = [
  {
    athleteName: "LeBron James",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
  },
  {
    athleteName: "Stephen Curry",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
    isHighlighted: true,
  },
  {
    athleteName: "Giannis Antetokounmpo",
    positionType: "Long",
    leverage: 3,
    status: "Healthy",
    statusColor: "green",
    pnlAmount: 72.14,
    pnlPercent: 14.1,
    fundingRate: 1.5,
    size: 500.0,
    liquidationPrice: 96.5,
    collateral: 150.0,
    entryPrice: 102.3,
    markPrice: 116.9,
  },
];

export default function ActivePositions({
  positions = defaultPositions,
  onClose,
}: ActivePositionsProps) {
  const getStatusColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-light-green";
      case "red":
        return "text-base-red";
      case "yellow":
        return "text-base-yellow";
      default:
        return "text-soft-400";
    }
  };

  return (
    <>
      <div className="mb-[16px] flex flex-col gap-4 rounded-[20px] bg-white p-[10px] last:mb-0 sm:p-[14px] md:mb-[24px] md:p-[16px]">
        <h1 className="text-text-primary px-4 pt-2 text-[16px] leading-none font-medium tracking-[0.28px]">
          Active Positions
        </h1>
        <div className="bg-page-background mt-4 w-full overflow-x-auto rounded-[20px] px-2">
          <Table className="w-full min-w-full table-auto border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="border-0">
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-1%] whitespace-nowrap">
                  Player
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  PnL(Real-time)
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Size
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Collateral
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Entry
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Mark
                </TableHead>
                <TableHead className="text-muted-foreground border-0 px-4 py-3 text-[12px] leading-[100%] tracking-[-1%] whitespace-nowrap">
                  Mark
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="mb-2 rounded-[14px] border-0 bg-white transition-colors duration-200 ease-out hover:cursor-pointer hover:bg-white">
                <TableCell className="rounded-tl-[14px] rounded-bl-[14px] px-4 py-3 font-medium">
                  <div className="relative flex flex-row items-center gap-2">
                    <div className="bg-dark-yellow relative h-8 w-8 overflow-hidden rounded-full">
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
                        Long 3x .{" "}
                        <span className="text-light-green">Healthy</span>
                      </p>
                    </div>
                    <div className="bg-league-card text-soft-400 flex flex-row items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium">
                      <Image
                        src="/icons/game/f.svg"
                        alt="Flag"
                        width={8}
                        height={10}
                      />
                      <span>80%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="text-text-primary flex flex-col items-start justify-start gap-1 text-[12px] leading-[100%] font-medium tracking-[-2%]">
                    <span>
                      $72.14 <span className="text-light-green">(+14.1%)</span>
                    </span>
                    <span className="text-soft-400">
                      Funding <span className="text-light-green">1.50%</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div>
                    <p className="text-text-primary text-[12px] leading-[100%] font-medium tracking-[-2%]">
                      $500
                    </p>
                    <p className="text-base-red text-[12px] leading-[100%] font-medium tracking-[-1%]">
                      Liq $96.50
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-text-primary px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
                  $150
                </TableCell>
                <TableCell className="text-text-primary px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
                  102.30
                </TableCell>
                <TableCell className="text-text-primary px-4 py-3 text-[12px] leading-[100%] font-medium tracking-[-2%]">
                  116.9
                </TableCell>
                <TableCell className="rounded-tr-[14px] rounded-br-[14px] px-4 py-3">
                  Close
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
    // <div className="backdrop-blur-[22px] bg-white rounded-[10px] flex flex-col w-full">
    //   {/* Header */}
    //   <div className="flex gap-[12px] items-center px-[16px] sm:px-[20px] md:px-[24px] py-[16px] sm:py-[18px] md:py-[20px]">
    //     <h3 className="flex-1 font-nohemi font-medium text-[14px] sm:text-[15px] md:text-[16px] text-text-primary tracking-[0.32px] leading-none font-500">
    //       Active positions
    //     </h3>
    //   </div>

    //   {/* Content */}
    //   <div className="flex flex-col pb-[4px] px-[4px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    //     {/* Table Header */}
    //     <div className="flex gap-[12px] md:gap-[16px] items-center px-[12px] md:px-[16px] py-[12px] font-medium text-[11px] md:text-[12px] text-[#868c98] tracking-[-0.12px] leading-none min-w-[750px]">
    //       <p className="w-[160px] md:w-[204px]">Athlete</p>
    //       <p className="w-[120px] md:w-[148px]">PnL (Real-time)</p>
    //       <p className="w-[90px] md:w-[108px]">Size</p>
    //       <p className="flex-1 min-w-[70px]">Collateral</p>
    //       <p className="flex-1 min-w-[60px]">Entry</p>
    //       <p className="flex-1 min-w-[60px]">Mark</p>
    //       <p className="flex-1 min-w-[60px] text-center">Close</p>
    //     </div>

    //     {/* Table Rows */}
    //     {positions.map((position, index) => {
    //       const isPnlPositive = position.pnlAmount >= 0;
    //       const pnlColor = isPnlPositive ? "text-light-green" : "text-base-red";

    //       return (
    //         <div
    //           key={index}
    //           className="flex gap-[12px] md:gap-[16px] items-center p-[12px] md:p-[16px] font-medium relative hover:border-t hover:border-main hover:bg-linear-to-r hover:from-main/3 hover:to-main/3 transition-all min-w-[750px]"
    //         >
    //           {/* Athlete Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[160px] md:w-[204px]">
    //             <p className="font-medium text-[12px] md:text-[14px] text-text-primary tracking-[-0.14px] leading-none">
    //               {position.athleteName}
    //             </p>
    //             <p className="font-medium text-[10px] md:text-[12px] text-soft-400 tracking-[-0.12px] leading-none">
    //               {position.positionType} {position.leverage}× ·{" "}
    //               <span className={getStatusColor(position.statusColor)}>
    //                 {position.status}
    //               </span>
    //             </p>
    //           </div>

    //           {/* PnL Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[120px] md:w-[148px]">
    //             <p
    //               className={`font-medium text-[10px] md:text-[12px] tracking-[-0.12px] leading-none ${pnlColor}`}
    //             >
    //               {isPnlPositive ? "+" : ""}$
    //               {Math.abs(position.pnlAmount).toFixed(2)} (
    //               {isPnlPositive ? "+" : ""}
    //               {position.pnlPercent.toFixed(1)}%)
    //             </p>
    //             <p
    //               className={`font-medium text-[10px] md:text-[12px] tracking-[-0.12px] leading-none ${pnlColor}`}
    //             >
    //               Funding {position.fundingRate >= 0 ? "+" : ""}
    //               {position.fundingRate.toFixed(2)}%
    //             </p>
    //           </div>

    //           {/* Size Column */}
    //           <div className="flex flex-col gap-[6px] md:gap-[8px] w-[90px] md:w-[108px]">
    //             <p className="font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //               ${position.size.toFixed(2)}
    //             </p>
    //             <p className="font-medium text-[10px] md:text-[12px] text-neon-pink tracking-[-0.12px] leading-none">
    //               Liq ${position.liquidationPrice.toFixed(2)}
    //             </p>
    //           </div>

    //           {/* Collateral */}
    //           <p className="flex-1 min-w-[70px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             ${position.collateral.toFixed(2)}
    //           </p>

    //           {/* Entry */}
    //           <p className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             {position.entryPrice.toFixed(2)}
    //           </p>

    //           {/* Mark */}
    //           <p className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-text-primary tracking-[-0.12px] leading-none">
    //             {position.markPrice.toFixed(2)}
    //           </p>

    //           {/* Close */}
    //           <button
    //             onClick={() => onClose?.(position)}
    //             className="flex-1 min-w-[60px] font-medium text-[10px] md:text-[12px] text-soft-400 tracking-[-0.12px] leading-none hover:text-text-primary transition-colors cursor-pointer"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
