import React from "react";
import AthletesCard from "../common/athletes-card";

interface TrendingData {
  id: string;
  image?: string;
  name: string;
  abbreviation: string;
  price: string;
  change: number;
  percentage?: number;
}

const trendingItems: TrendingData[] = [
  {
    id: "1",
    image: "/icons/athletes/lebron-james.png",
    name: "LeBron James",
    abbreviation: "LAA",
    price: "$102.3",
    change: 3.27,
    percentage: 80,
  },
  {
    id: "2",
    image: "/icons/athletes/stephen-curry.png",
    name: "Stephen Curry",
    abbreviation: "GSW",
    price: "$98.5",
    change: -1.26,
    percentage: 75,
  },
  {
    id: "3",
    image: "/icons/athletes/kevin-durant.png",
    name: "Kevin Durant",
    abbreviation: "PHX",
    price: "$105.2",
    change: 2.15,
    percentage: 85,
  },
];

export default function TodayGames() {
  return (
    <div>
      <h3 className="text-md text-text-secondary m-0 mb-2 p-0 font-bold">
        Trending
      </h3>
      <div className="m-0 flex flex-row overflow-x-auto overflow-y-hidden p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {trendingItems.map((item) => (
          <div key={item.id} className="shrink-0">
            <AthletesCard
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              abbreviation={item.abbreviation}
              price={item.price}
              change={item.change}
              percentage={item.percentage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
