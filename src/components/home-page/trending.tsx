"use client";

import React from "react";
import AthletesCard from "../common/athletes-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HideExtra from "../common/hide-extra";

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
  {
    id: "4",
    image: "/icons/athletes/luka-doncic.png",
    name: "Luka Doncic",
    abbreviation: "DAL",
    price: "$108.9",
    change: -0.89,
    percentage: 78,
  },
  {
    id: "5",
    image: "/icons/athletes/jayson-tatum.png",
    name: "Jayson Tatum",
    abbreviation: "BOS",
    price: "$99.7",
    change: 2.45,
    percentage: 88,
  },
  {
    id: "6",
    image: "/icons/athletes/g-antetokounmpo.png",
    name: "Giannis Antetok",
    abbreviation: "MIL",
    price: "$112.4",
    change: 4.12,
    percentage: 92,
  },
  {
    id: "7",
    image: "/icons/athletes/anthony-davis.png",
    name: "Anthony Davis",
    abbreviation: "LAA",
    price: "$96.8",
    change: -1.89,
    percentage: 72,
  },
  {
    id: "8",
    image: "/icons/athletes/stephen-curry.png",
    name: "Stephen Curry",
    abbreviation: "GSW",
    price: "$101.2",
    change: 1.54,
    percentage: 82,
  },
  {
    id: "9",
    image: "/icons/athletes/kevin-durant.png",
    name: "Kevin Durant",
    abbreviation: "PHX",
    price: "$107.6",
    change: -2.31,
    percentage: 79,
  },
  {
    id: "10",
    image: "/icons/athletes/luka-doncic.png",
    name: "Luka Doncic",
    abbreviation: "DAL",
    price: "$110.3",
    change: 3.78,
    percentage: 90,
  },
];

export default function TodayGames() {
  return (
    <div>
      <h3 className="text-text-secondary m-0 mb-2 p-0 text-[14px] font-semibold">
        Trending
      </h3>
      <HideExtra>
        <Swiper
          spaceBetween={8}
          slidesPerView="auto"
          navigation
          className="overflow-visible! pb-4!"
        >
          {trendingItems.map((item) => (
            <SwiperSlide key={item.id} className="w-auto!">
              <AthletesCard
                id={item.id}
                image={item.image}
                name={item.name}
                abbreviation={item.abbreviation}
                price={item.price}
                change={item.change}
                percentage={item.percentage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </HideExtra>
    </div>
  );
}
