"use client";

import React from "react";
import GameCard from "./game-card";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface GameData {
  id: string;
  image?: string;
  team1: {
    score: number;
    icon: string;
    name: string;
    price: string;
    change: number;
  };
  team2: {
    score: number;
    icon: string;
    name: string;
    price: string;
    change: number;
  };
  status: string;
  volume: string;
}

const games: GameData[] = [
  {
    id: "1",
    team1: {
      score: 113,
      icon: "/icons/events/lal.png",
      name: "Lakers",
      price: "$124.32",
      change: 3.27,
    },
    team2: {
      score: 105,
      icon: "/icons/events/gsw.png",
      name: "Warriors",
      price: "$124.32",
      change: -1.26,
    },
    status: "Q1 | 10:00",
    volume: "$606.19k Vol.",
  },
  {
    id: "2",
    team1: {
      score: 98,
      icon: "/icons/events/lal.png",
      name: "Lakers",
      price: "$118.45",
      change: 2.15,
    },
    team2: {
      score: 102,
      icon: "/icons/events/gsw.png",
      name: "Warriors",
      price: "$115.78",
      change: -0.89,
    },
    status: "Q2 | 8:32",
    volume: "$452.33k Vol.",
  },
  {
    id: "3",
    team1: {
      score: 87,
      icon: "/icons/events/lal.png",
      name: "Lakers",
      price: "$112.90",
      change: 1.45,
    },
    team2: {
      score: 91,
      icon: "/icons/events/gsw.png",
      name: "Warriors",
      price: "$109.23",
      change: -2.12,
    },
    status: "Q3 | 5:15",
    volume: "$389.67k Vol.",
  },
  {
    id: "4",
    team1: {
      score: 87,
      icon: "/icons/events/lal.png",
      name: "Lakers",
      price: "$112.90",
      change: 1.45,
    },
    team2: {
      score: 91,
      icon: "/icons/events/gsw.png",
      name: "Warriors",
      price: "$109.23",
      change: -2.12,
    },
    status: "Q3 | 5:15",
    volume: "$389.67k Vol.",
  },
  {
    id: "5",
    team1: {
      score: 87,
      icon: "/icons/events/lal.png",
      name: "Lakers",
      price: "$112.90",
      change: 1.45,
    },
    team2: {
      score: 91,
      icon: "/icons/events/gsw.png",
      name: "Warriors",
      price: "$109.23",
      change: -2.12,
    },
    status: "Q3 | 5:15",
    volume: "$389.67k Vol.",
  },
];

export default function TodayGames() {
  return (
    <div className="px-global">
      <h3 className="text-text-secondary m-0 mb-2 p-0 text-[14px] font-semibold">
        Todays Games
      </h3>
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        navigation
        className="overflow-visible! pb-4!"
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="w-auto!">
            <Link href={"/live/game-1"}>
              <GameCard
                image={game.image}
                team1={game.team1}
                team2={game.team2}
                status={game.status}
                volume={game.volume}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
