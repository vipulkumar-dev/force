import { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import AthleteCard from "./athlete-card";

const athletesData = [
  {
    id: 1,
    athleteName: "LeBron James",
    athleteImage: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 2,
    athleteName: "Stephen Curry",
    athleteImage: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: true,
  },
  {
    id: 3,
    athleteName: "Kevin Durant",
    athleteImage: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    price: "$102.3 ",
    percentage: "-3.27%",
    backgroundColor: "bg-dark-violet",
    isPositive: false,
  },
  {
    id: 4,
    athleteName: "G. Antetokounmpo",
    athleteImage: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
  {
    id: 5,
    athleteName: "Jayson Tatum",
    athleteImage: "/icons/athletes/jayson-tatum.png",
    team: "Boston Celtics",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 6,
    athleteName: "Luka Dončić",
    athleteImage: "/icons/athletes/luka-doncic.png",
    team: "Dallas Mavericks",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: true,
  },
  {
    id: 7,
    athleteName: "Anthony Davis",
    athleteImage: "/icons/athletes/anthony-davis.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ",
    percentage: "-1.89%",
    backgroundColor: "bg-dark-violet",
    isPositive: false,
  },
  {
    id: 8,
    athleteName: "LeBron James",
    athleteImage: "/icons/athletes/lebron-james.png",
    team: "Los Angeles Lakers",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
  {
    id: 9,
    athleteName: "Stephen Curry",
    athleteImage: "/icons/athletes/stephen-curry.png",
    team: "Golden State Warriors",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-yellow",
    isPositive: true,
  },
  {
    id: 10,
    athleteName: "Kevin Durant",
    athleteImage: "/icons/athletes/kevin-durant.png",
    team: "Phoenix Suns",
    price: "$102.3 ",
    percentage: "-3.27%",
    backgroundColor: "bg-dark-blue",
    isPositive: false,
  },
  {
    id: 11,
    athleteName: "G. Antetokounmpo",
    athleteImage: "/icons/athletes/g-antetokounmpo.png",
    team: "Milwaukee Bucks",
    price: "$102.3 ",
    percentage: "+3.27%",
    backgroundColor: "bg-dark-violet",
    isPositive: true,
  },
  {
    id: 12,
    athleteName: "Jayson Tatum",
    athleteImage: "/icons/athletes/jayson-tatum.png",
    team: "Boston Celtics",
    price: "$98.5 ",
    percentage: "+2.15%",
    backgroundColor: "bg-forest-green",
    isPositive: true,
  },
];

export default function PriceTrendPage({
  onBack,
  onDiscover,
}: {
  onBack?: () => void;
  onDiscover?: boolean;
}) {
  const filters = ["All", "Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(
        typeof window !== "undefined" &&
          window.matchMedia("(max-width: 768px)").matches
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const effectiveViewMode: "list" | "grid" = isMobile ? "grid" : viewMode;

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = isMobile ? 1 : 8;

  // If/when filters are implemented, replace this with actual filtered array
  const filteredData = useMemo(() => {
    return athletesData;
  }, [selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filter changes
  // Note: not resetting on view mode change to preserve current page between grid/list
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setCurrentPage(1), [selectedFilter]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goPage = (n: number) => setCurrentPage(n);

  return (
    <div
      className={`flex flex-col ${
        onDiscover ? "w-full" : "w-full md:w-[1020px]"
      } pb-6 overflow-hidden md:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
    >
      <div className="flex flex-col w-full pt-6 gap-5">
        {!onDiscover && (
          <div className="w-full flex flex-row items-center justify-between gap-2 sm:gap-4">
            <Button
              lip="on"
              className="flex flex-row w-8 h-8 rounded-[7px] items-center justify-center border border-main/7 bg-white gap-2 px-0 hover:bg-primary-foreground hover:cursor-pointer"
              onClick={onBack}
            >
              <Image
                src="/icons/arrow-left.svg"
                width={14}
                height={14}
                alt="Arrow Left"
              />
            </Button>

            <p className="font-medium font-nohemi text-[18px] sm:text-[20px] leading-[110%] tracking-[1%] text-main">
              Find More Athlete
            </p>
            {isMobile && (
              <div className="flex flex-row items-center w-[160px] sm:w-[200px] h-9 rounded-[7px] border border-black/5 py-1 pr-3 pl-2 gap-2 bg-white">
                <Search
                  width={12}
                  height={12}
                  color="var(--main)"
                  className="shrink-0"
                />
                <input
                  type="text"
                  placeholder="Search Anything..."
                  aria-label="Search"
                  className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]"
                />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex flex-row w-full items-center ${
            isMobile ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex flex-row flex-wrap w-full justify-center md:justify-start gap-2">
            {filters.map((label) => {
              const isSelected = selectedFilter === label;
              return (
                <Button
                  key={label}
                  onClick={() => setSelectedFilter(label)}
                  className={`flex flex-row rounded-[100px] h-fit items-center justify-center py-2 px-4 gap-1 border transition-colors duration-200 ease-out hover:cursor-pointer ${
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
          {!isMobile && (
            <div className="flex flex-row gap-1.5">
              {!onDiscover && (
                <div className="flex flex-row items-center w-[280px] h-9 rounded-[7px] border border-black/5 py-1.5 pr-4 pl-2.5 gap-2.5 bg-white">
                  <Search
                    width={12}
                    height={12}
                    color="var(--main)"
                    className="shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search Anything..."
                    aria-label="Search"
                    className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]"
                  />
                </div>
              )}
              <Button
                lip="on"
                className="flex flex-row items-center justify-center w-9 h-9 border border-main/7 px-0 gap-2.5 bg-white hover:bg-primary-foreground hover:cursor-pointer"
              >
                <Image
                  src="/icons/filter-icon.svg"
                  alt="Filter Icon"
                  width={16}
                  height={16}
                />
              </Button>
              <div className="flex flex-row h-9 w-fit rounded-[7px] border border-main/7 bg-white p-1 gap-1 items-center relative overflow-visible after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:shadow-[0_3px_0_0_rgba(10,13,20,0.06),inset_0_-2px_0_0_rgba(255,255,255,0.18)]">
                <Button
                  disabled={isMobile}
                  onClick={() => setViewMode("list")}
                  className={`flex flex-row items-center justify-center w-7 h-7 gap-2.5 px-0 hover:cursor-pointer transition-colors duration-200 ${
                    viewMode === "list"
                      ? "bg-main rounded-[7px]"
                      : "bg-white hover:bg-primary-foreground"
                  }`}
                >
                  <Image
                    src={
                      viewMode === "list"
                        ? "/icons/list-white.svg"
                        : "/icons/list.svg"
                    }
                    alt="list-icon"
                    width={18}
                    height={18}
                  />
                </Button>
                <Button
                  onClick={() => setViewMode("grid")}
                  className={`flex flex-row items-center justify-center w-7 h-7 gap-2.5 px-0 hover:cursor-pointer transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-main rounded-[7px]"
                      : "bg-white hover:bg-primary-foreground"
                  }`}
                >
                  <Image
                    src={
                      viewMode === "grid"
                        ? "/icons/layout-grid.svg"
                        : "/icons/layout-grid-gray.svg"
                    }
                    alt="layout-grid-icon"
                    width={18}
                    height={18}
                  />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full mt-6 gap-5">
        {effectiveViewMode === "grid" ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${
              onDiscover && "xl:grid-cols-5"
            } gap-2.5 w-full justify-items-center`}
          >
            {paginatedData.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                id={athlete.id}
                mode={viewMode}
                athleteName={athlete.athleteName}
                athleteImage={athlete.athleteImage}
                team={athlete.team}
                price={athlete.price}
                percentage={athlete.percentage}
                backgroundColor={athlete.backgroundColor}
                isPositive={athlete.isPositive}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-row w-full py-3 px-5 gap-8">
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[55%]">
                Athlete Name
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[10.5%]">
                Current Price
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[10.5%]">
                24H Change
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[10.5%]">
                24H Volume
              </p>
              <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400 w-[13.5%]">
                Quick Trade
              </p>
            </div>

            {paginatedData.map((athlete) => (
              <AthleteCard
                key={`list-${athlete.id}`}
                id={athlete.id}
                mode="list"
                athleteName={athlete.athleteName}
                athleteImage={athlete.athleteImage}
                team={athlete.team}
                price={athlete.price}
                percentage={athlete.percentage}
                backgroundColor={athlete.backgroundColor}
                isPositive={athlete.isPositive}
                volume="$128.4K"
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex w-full items-center justify-center mt-2">
            <div className="flex flex-row items-center gap-5">
              <Button
                lip="on"
                onClick={goPrev}
                disabled={currentPage === 1}
                className="flex flex-row w-8 h-8 rounded-[7px] items-center justify-center border border-main/7 bg-white gap-2 px-0 hover:bg-primary-foreground hover:cursor-pointer disabled:opacity-40"
              >
                <Image
                  src="/icons/arrow-left.svg"
                  width={14}
                  height={14}
                  alt="Prev"
                />
              </Button>

              {!isMobile && (
                <div className="flex flex-row items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => {
                      const isActive = n === currentPage;
                      return (
                        <Button
                          lip="on"
                          key={`page-${n}`}
                          onClick={() => goPage(n)}
                          className={`min-w-8 h-8 px-2 rounded-[7px] border transition-colors duration-200 ${
                            isActive
                              ? "bg-main border-black/5"
                              : "bg-white border-main/7 hover:bg-primary-foreground"
                          }`}
                        >
                          <span
                            className={`text-[12px] font-medium leading-[100%] tracking-[-1%] ${
                              isActive ? "text-white" : "text-sub-500"
                            }`}
                          >
                            {n}
                          </span>
                        </Button>
                      );
                    }
                  )}
                </div>
              )}

              <Button
                lip="on"
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="flex flex-row w-8 h-8 rounded-[7px] items-center justify-center border border-main/7 bg-white gap-2 px-0 hover:bg-primary-foreground hover:cursor-pointer disabled:opacity-40"
              >
                <Image
                  src="/icons/arrow-left.svg"
                  width={14}
                  height={14}
                  alt="Next"
                  className="rotate-180"
                />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
