"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PriceTrendPage from "@/components/home-page/price-trend-page";
import TodayFixturesSide from "@/components/home-page/today-fixtures-side";
import UpcomingMatchesSide from "@/components/home-page/upcoming-matches-side";
import AppFooter from "@/components/app-footer";
import TodayGames from "@/components/home-page/today-games";
import Trending from "@/components/home-page/trending";
import PriceTrendChart from "@/components/home-page/price-trend-chart";

// Add a global type for the window flag
declare global {
  interface Window {
    __onboardingDone?: boolean;
  }
}

export default function Page() {
  // Splash should only show if onboarding is not done
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return typeof window === "undefined" ? true : !window.__onboardingDone;
  });
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() => {
    return typeof window !== "undefined" && !!window.__onboardingDone;
  });

  useEffect(() => {
    if (!onboardingDone && showSplash) {
      const t = setTimeout(() => setShowSplash(false), 1200);
      return () => clearTimeout(t);
    }
  }, [onboardingDone, showSplash]);

  const handleOnboardingFinished = () => {
    if (typeof window !== "undefined") {
      window.__onboardingDone = true;
      window.dispatchEvent(new Event("onboardingComplete"));
    }
    setOnboardingDone(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (onboardingDone) {
      window.dispatchEvent(new Event("onboardingComplete"));
    }
  }, [onboardingDone]);

  const eventRows = [
    {
      time: "12:00",
      iconSrc: "/icons/events/lal.png",
      play: "Jalen Duren vs. Jarrett Allen (Evan Mobley gains possession)",
      det: "0",
      cle: "0",
    },
    {
      time: "12:00",
      iconSrc: "/icons/events/sam-merrill.png",
      play: "Sam Merrill bad pass (Ausar Thompson steals)",
      det: "0",
      cle: "0",
    },
    {
      time: "12:00",
      iconSrc: "/icons/events/lal.png",
      play: "Jalen Duren vs. Jarrett Allen (Evan Mobley gains possession)",
      det: "0",
      cle: "0",
    },
    {
      time: "12:00",
      iconSrc: "/icons/events/sam-merrill.png",
      play: "Sam Merrill bad pass (Ausar Thompson steals)",
      det: "0",
      cle: "0",
    },
  ];

  const filters = ["All", "Guards", "Forwards", "Centers"];
  const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

  const leagueOptions = [
    { id: "nba", label: "NBA league", icon: "/icons/leagues/nba-new.png" },
    { id: "nfl", label: "NFL", icon: "/icons/leagues/nfl.png" },
    { id: "mlb", label: "MLB", icon: "/icons/leagues/mlb.png" },
    { id: "laliga", label: "La Liga", icon: "/icons/leagues/la-liga.png" },
    {
      id: "epl",
      label: "Premier League",
      icon: "/icons/leagues/premiere-league.png",
    },
    { id: "f1", label: "F1", icon: "/icons/leagues/f1.png" },
  ];
  const [selectedLeague, setSelectedLeague] = useState(leagueOptions[0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("selectedLeague", { detail: { id: selectedLeague.id } })
      );
    }
  }, [selectedLeague]);

  // Controls whether the Price Trend page is visible
  const [showPriceTrendPage, setShowPriceTrendPage] = useState<boolean>(false);

  // Broadcast visibility to the header
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as { __priceTrendPageVisible?: boolean }
      ).__priceTrendPageVisible = showPriceTrendPage;
      window.dispatchEvent(
        new CustomEvent("priceTrendPage", {
          detail: { visible: showPriceTrendPage },
        })
      );
    }
  }, [showPriceTrendPage]);

  return (
    <AnimatePresence>
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`w-full bg-page-background ${
              showPriceTrendPage ? "pt-[163px]" : "pt-[117px]"
            } min-h-0 overflow-hidden`}
          >
            <div className="w-full max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-[24px] sm:gap-[32px] xl:gap-[40px] px-[16px] sm:px-[24px] xl:px-[40px]">
            {!showPriceTrendPage ? (
              <>
              <div className="flex flex-col w-full min-h-0 pt-[24px] xl:pt-[40px] pb-[24px] gap-[24px] overflow-visible xl:overflow-y-auto overscroll-contain xl:[-ms-overflow-style:none] xl:[scrollbar-width:none] xl:[&::-webkit-scrollbar]:hidden">
              <TodayGames/>
              <div className=" w-full h-[0.5px] px-2 bg-black/5">
              </div>
              <Trending/>
              <div className=" w-full h-[0.5px] px-2 bg-black/5">
              </div>
              <PriceTrendChart/>
              </div>
              </>
            ) : (
              <>
                <PriceTrendPage onBack={() => setShowPriceTrendPage(false)} />
                <div className="w-full xl:w-[300px] flex flex-col pt-6 gap-6 pb-[24px] md:pb-0">
                  <TodayFixturesSide />
                  <UpcomingMatchesSide />
                </div>
              </>
            )}
            </div>
          </div>
          <AppFooter />
        </motion.div>
    </AnimatePresence>
  );
}
