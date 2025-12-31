import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AthletePriceTrendProps = {
  onOpenPriceTrend?: () => void;
};

export default function AthletePriceTrend({
  onOpenPriceTrend,
}: AthletePriceTrendProps) {
  const filters = ["Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);
  const router = useRouter();

  type TrendRow = {
    id: string;
    name: string;
    team: string;
    iconSrc: string;
    price: string;
    change: string;
  };

  const trendRows: TrendRow[] = [
    {
      id: "lebron-james",
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+3.27%",
    },
    {
      id: "stephen-curry",
      name: "Stephen Curry",
      team: "Golden State Warriors",
      iconSrc: "/icons/players/stephen-curry.png",
      price: "$101.8",
      change: "+2.94%",
    },
    {
      id: "kevin-durant",
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$100.6",
      change: "+2.32%",
    },
    {
      id: "lebron-james",
      name: "LeBron James",
      team: "Los Angeles Lakers",
      iconSrc: "/icons/players/lebron-james.png",
      price: "$102.3",
      change: "+3.27%",
    },
    {
      id: "kevin-durant",
      name: "Kevin Durant",
      team: "Phoenix Suns",
      iconSrc: "/icons/players/kevin-durrant.png",
      price: "$100.6",
      change: "+2.32%",
    },
  ];

  const changeClass = (change: string) =>
    change.startsWith("-") ? "text-base-red" : "text-dark-green";

  const onFilterClick = (e: MouseEvent, label: string) => {
    e.stopPropagation();
    setSelectedFilter(label);
  };

  return (
    <div className="w-full flex flex-col bg-white rounded-[10px]">
      <Button
        onClick={() => onOpenPriceTrend?.()}
        className="flex flex-col w-full h-auto border-b px-[20px]! py-[20px]! gap-[16px] border-light-gray bg-white hover:bg-primary-foreground hover:cursor-pointer"
      >
        <div className="flex flex-row justify-between w-full gap-[16px]">
          <p className="font-nohemi font-medium text-[16px] leading-[100%] tracking-[2%] text-main">
            Athlete Price trend
          </p>
          <ChevronRight className="text-soft-400" width={14} height={14} />
        </div>

        <div className="flex flex-row gap-[8px] w-full">
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
      </Button>

      <div className="flex flex-col w-full">
        {trendRows.map((row, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/athlete/${row.id}`)}
            className="flex flex-row border-b border-light-gray py-[16px] px-[20px] gap-[10px] w-full border-t border-transparent hover:bg-primary-foreground hover:cursor-pointer transition-colors duration-200 ease-out"
          >
            <Image
              src={row.iconSrc}
              alt={row.name}
              width={40}
              height={40}
              className="rounded-[6px] max-h-[40px] max-w-[40px]"
            />
            <div className="flex flex-col gap-[8px] justify-center">
              <p className="font-medium text-[14px] leading-[100%] tracking-[-2%] text-main text-nowrap">
                {row.name}
              </p>
              <p className="text-[12px] leading-[100%] tracking-[-1%] text-soft-400 text-nowrap">
                {row.team}
              </p>
            </div>
            <div className="flex flex-col gap-[8px] items-end w-full justify-center">
              <p className="font-medium text-[14px] leading-[100%] tracking-[-1%] text-right text-main">
                {row.price}
              </p>
              <p
                className={`font-medium text-[12px] leading-[100%] tracking-[-1%] text-right ${changeClass(
                  row.change
                )}`}
              >
                {row.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
