"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExplainerSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  content?: React.ReactNode;
}

const sections: ExplainerSection[] = [
  {
    id: "index",
    title: "Index",
    description: "Live score that tracks their on-court performance.",
    icon: "/icons/index.svg",
    content: (
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            What Is an Index?
          </p>
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
            Each athlete on Vibranium has their own Index, a dynamic score that
            reflects real-time performance, consistency, and market sentiment —
            similar to a stock price in finance.
          </p>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            How It Works
          </p>
          <div className="flex flex-col gap-2.5">
            <ol className="list-decimal pl-[18px] text-xs font-medium leading-none tracking-[-0.24px] text-[#0a0d14]">
              <li>Performance-Based Movement</li>
            </ol>
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
              The Index updates automatically after each game, factoring in real
              stats such as:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            How It Works
          </p>
          <div className="flex flex-col gap-2.5">
            <ol className="list-decimal pl-[18px] text-xs font-medium leading-none tracking-[-0.24px] text-[#0a0d14]">
              <li>Performance-Based Movement</li>
            </ol>
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
              The Index updates automatically after each game, factoring in real
              stats such as:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            How It Works
          </p>
          <div className="flex flex-col gap-2.5">
            <ol className="list-decimal pl-[18px] text-xs font-medium leading-none tracking-[-0.24px] text-[#0a0d14]">
              <li>Performance-Based Movement</li>
            </ol>
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
              The Index updates automatically after each game, factoring in real
              stats such as:
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "funding",
    title: "Funding",
    description: "The cost of holding a trade based on supply and demand.",
    icon: "/icons/funding.svg",
    content: (
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            What Is Funding?
          </p>
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
            Funding is the periodic payment exchanged between long and short
            position holders. It keeps the athlete&apos;s Index price aligned
            with real market dynamics.
          </p>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            How It Works
          </p>
          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
              • <strong>Positive funding:</strong> Long position holders pay
              shorts
              <br />• <strong>Negative funding:</strong> Short position holders
              pay longs
              <br />• Updated every 8 hours based on market sentiment
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "flash",
    title: "Flash",
    description:
      "Trading bursts where the athlete's index reacts to big plays.",
    icon: "/icons/flash.svg",
    content: (
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            What Is Flash?
          </p>
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
            Flash events are real-time trading moments triggered by exceptional
            in-game performances. When an athlete makes a big play, their Index
            reacts instantly, creating opportunities for quick trades.
          </p>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-xs font-semibold leading-none tracking-[-0.24px] text-[#0a0d14]">
            How It Works
          </p>
          <div className="flex flex-col gap-2.5">
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#868c98]">
              • Triggered by clutch plays, game-winning shots, or milestone
              achievements
              <br />• Index value adjusts in real-time during live games
              <br />• Creates short-term trading windows with increased
              volatility
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ExplainerCard({
  onFinished,
}: {
  onFinished?: () => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="explainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex min-h-screen w-full flex-col items-center justify-between bg-neutral-50 py-20"
      >
        <div className="flex w-full max-w-[482px] flex-col items-center gap-6 px-4">
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.03)] p-[5.333px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex size-[53.333px] items-center justify-center rounded-full border border-[rgba(0,0,0,0.05)] bg-white p-[13.333px]">
              <div className="relative h-[22.667px] w-[25.333px] mix-blend-multiply">
                <Image
                  src="/logo-icon.png"
                  alt="Vibranium"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl leading-none tracking-[0.48px] text-black font-nohemi font-medium">
              Performance is the New Asset
            </h1>
            <p className="text-center font-inter text-sm font-normal leading-[1.3] tracking-tight text-[#868c98]">
              Learn how we turn athlete performance into live market
              opportunities.
            </p>
          </motion.div>

          {/* Expandable Sections */}
          <motion.div
            className="flex w-full flex-col gap-[8px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              return (
                <div
                  key={section.id}
                  className="overflow-hidden rounded-[10px] border border-main/7 bg-white"
                >
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    className={`flex w-full items-center gap-4 p-5 text-left transition-colors ${
                      isExpanded ? "bg-explainer-dropdowns" : "bg-white"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(0,0,0,0.04)]">
                      <div className="relative size-[26px]">
                        <Image
                          src={section.icon}
                          alt={section.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                      <p className="text-sm font-inter font-semibold leading-none tracking-[-0.28px] text-[#0a0d14]">
                        {section.title}
                      </p>
                      <p className="text-xs font-inter font-normal leading-none tracking-[-0.12px] text-[#868c98]">
                        {section.description}
                      </p>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      className="shrink-0"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="size-[14px] text-[#CDD0D5]" />
                    </motion.div>
                  </motion.button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && section.content && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 215, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-explainer-dropdowns flex flex-col items-center"
                      >
                        <div className="w-[calc(100%-36px)] h-[1px] border-t border-dashed border-main/7 mx-[10px]"></div>
                        <div className="h-[215px] overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[20px] [&::-webkit-scrollbar-thumb]:bg-[#E2E4E9] [&::-webkit-scrollbar-track]:bg-transparent">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Continue Button */}
          <motion.button
            onClick={() => onFinished?.()}
            className="relative flex h-[38px] w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[#0a0d14] bg-[#0a0d14] px-4 py-2.5 shadow-[0px_-1px_14px_-1px_inset_rgba(255,255,255,0.25)] transition-transform"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-inter font-medium leading-[1.4] tracking-[-0.14px] text-white">
              Get Started
            </span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
