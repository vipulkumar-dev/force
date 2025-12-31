"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import LearnSidebar from "@/components/learn-page/learn-sidebar";
import ArticleContent, {
  ArticleSection,
  ArticleParagraph,
  ArticleExample,
} from "@/components/learn-page/article-content";
import AthleteUpdateCard from "@/components/learn-page/athlete-update-card";
import IndexComponentsTable from "@/components/learn-page/index-components-table";
import RelatedTopics from "@/components/learn-page/related-topics";
import AppFooter from "@/components/app-footer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LearnPage() {
  const [activeArticle, setActiveArticle] = useState("what-is-athlete-index");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleArticleSelect = (slug: string) => {
    setActiveArticle(slug);
    setMobileMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="learn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex flex-col lg:flex-row gap-[24px] lg:gap-[40px] px-[16px] md:px-[40px] bg-page-background justify-center pt-[117px]">
          {/* Left sidebar: fixed width on desktop, hidden on mobile */}
          <div className="hidden lg:flex w-[280px] flex-col min-h-0 pb-[24px] overflow-y-hidden hover:overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <LearnSidebar
              activeArticle={activeArticle}
              onArticleSelect={setActiveArticle}
            />
          </div>

          {/* Main content: scrollable */}
          <div className="flex flex-col w-full lg:w-[1089px] min-h-0 p-[20px] md:p-[40px] mb-[24px] mt-0 md:mt-6 gap-6 md:gap-8 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white rounded-[12px] md:rounded-[20px]">
            {/* Mobile menu button */}
            <div className="lg:hidden flex justify-start mb-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-main bg-learn-gray rounded-lg hover:bg-learn-gray/80 transition-colors">
                    <Menu className="w-5 h-5" />
                    Browse Topics
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0 bg-white overflow-y-auto">
                  <div className="p-4">
                    <LearnSidebar
                      activeArticle={activeArticle}
                      onArticleSelect={handleArticleSelect}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <ArticleContent
              category="PERFORMANCE INDEXES"
              title="What Is an Athlete Index?"
            >
              {/* Athlete Update Card */}
              <AthleteUpdateCard />

              {/* Article text */}
              <ArticleSection>
                <ArticleParagraph>
                  An Athlete Index tracks the real-time performance of a player
                  based on measurable stats — points, assists, rebounds, and
                  more. Instead of predicting a single outcome like a win, you
                  trade based on ongoing performance trends.
                </ArticleParagraph>

                <ArticleExample>
                  LeBron James&apos; Index moves when his performance metrics
                  like PPG or FG% change — not just the team&apos;s win/loss.
                </ArticleExample>
              </ArticleSection>

              {/* Index Components Table */}
              <ArticleSection title="Index Components:">
                <IndexComponentsTable />
              </ArticleSection>

              <div className="w-full h-0 border border-main/5"></div>

              {/* Related Topics */}
              <RelatedTopics onTopicClick={setActiveArticle} />
            </ArticleContent>
          </div>
        </div>
        <AppFooter />
      </motion.div>
    </AnimatePresence>
  );
}
