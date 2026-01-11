"use client";

import React from "react";
import AthletesCard from "../common/athletes-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import HideExtra from "../common/hide-extra";
import { getRandomSimpleAthletes } from "@/lib/data/athletes-bank";

// Get random trending athletes from the data bank
const trendingItems = getRandomSimpleAthletes(10, true);

export default function TodayGames() {
  return (
    <div className="px-global">
      <h3 className="text-text-secondary m-0 mb-2 p-0 text-[14px] font-semibold">
        Trending
      </h3>
      <HideExtra>
        <Swiper
          modules={[Mousewheel]}
          spaceBetween={8}
          slidesPerView="auto"
          mousewheel={{
            forceToAxis: true, // vertical wheel → horizontal
            releaseOnEdges: true,
            sensitivity: 1,
          }}
          className="overflow-visible! pb-4!"
        >
          {trendingItems.map((item, index) => (
            <SwiperSlide key={item.id + index} className="w-auto!">
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
