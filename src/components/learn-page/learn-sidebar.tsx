"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  title: string;
  slug: string;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    id: "getting-started",
    title: "GETTING STARTED",
    items: [
      {
        id: "what-is-vibranium",
        title: "What is Vibranium?",
        slug: "what-is-vibranium",
      },
      {
        id: "how-index-works",
        title: "How the Index Works",
        slug: "how-index-works",
      },
      {
        id: "connecting-wallet",
        title: "Connecting Your Wallet",
        slug: "connecting-wallet",
      },
      {
        id: "first-trade",
        title: "Making Your First Trade",
        slug: "first-trade",
      },
    ],
  },
  {
    id: "performance-indexes",
    title: "PERFORMANCE INDEXES",
    items: [
      {
        id: "what-is-athlete-index",
        title: "What is an Athlete Index?",
        slug: "what-is-athlete-index",
      },
      {
        id: "index-construction",
        title: "Index Construction",
        slug: "index-construction",
      },
      {
        id: "how-prices-move",
        title: "How Index Prices Move",
        slug: "how-prices-move",
      },
      {
        id: "index-vs-market",
        title: "Index vs. Market Comparison",
        slug: "index-vs-market",
      },
    ],
  },
  {
    id: "trading-mechanics",
    title: "TRADING MECHANICS",
    items: [
      {
        id: "long-vs-short",
        title: "Long vs. Short Positions",
        slug: "long-vs-short",
      },
      {
        id: "leverage-risk",
        title: "Understand Leverage & Risk",
        slug: "leverage-risk",
      },
      { id: "funding-rate", title: "Funding Rate 101", slug: "funding-rate" },
      {
        id: "flash-trades",
        title: "How Flash Trades Work",
        slug: "flash-trades",
      },
    ],
  },
  {
    id: "strategy-insights",
    title: "STRATEGY & INSIGHTS",
    items: [],
  },
  {
    id: "advanced-topics",
    title: "ADVANCED TOPICS",
    items: [],
  },
  {
    id: "community",
    title: "COMMUNITY",
    items: [],
  },
];

interface LearnSidebarProps {
  activeArticle?: string;
  onArticleSelect?: (slug: string) => void;
}

export default function LearnSidebar({
  activeArticle,
  onArticleSelect,
}: LearnSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
    "performance-indexes",
    "trading-mechanics",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 pt-6">
      {/* Title */}
      <h2 className="text-[16px] md:text-lg font-nohemi leading-[16px] md:leading-[18px] tracking-[0.32px] md:tracking-[0.36px] font-normal text-main">
        Learn how it&apos;s works
      </h2>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-400" />
        <Input
          type="text"
          placeholder="Search topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 text-sm bg-white border-inactive rounded-lg placeholder:text-disabled-300 rounded-[8px]"
        />
      </div>

      {/* Navigation sections */}
      <nav className="flex flex-col gap-3">
        {menuData.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const hasItems = section.items.length > 0;

          return (
            <div key={section.id} className="flex flex-col gap-2">
              {/* Section header */}
              <button
                onClick={() => hasItems && toggleSection(section.id)}
                className={cn(
                  "flex items-center justify-between text-[11px] font-semibold tracking-[0.66px] font-inter text-disabled-300 uppercase px-4",
                  hasItems &&
                    "cursor-pointer hover:text-soft-400 transition-colors",
                )}
              >
                <span>{section.title}</span>
                {hasItems && (
                  <>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </>
                )}
              </button>

              {/* Section items */}
              {hasItems && isExpanded && (
                <div className="flex flex-col">
                  {section.items.map((item) => {
                    const isActive = activeArticle === item.slug;

                    return (
                      <button
                        key={item.id}
                        onClick={() => onArticleSelect?.(item.slug)}
                        className={cn(
                          "text-left px-4 py-1.5 h-9 text-[14px] leading-3.5 tracking-[-0.14px] transition-colors font-medium",
                          isActive
                            ? "bg-learn-gray text-main rounded-lg"
                            : "text-sub-500 hover:text-main",
                        )}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
