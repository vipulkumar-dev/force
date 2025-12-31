"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { WalletIcon } from "lucide-react";
import LeagueSwitcher from "./home-page/league-switcher";
import {
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import NotificationsPopover from "./notifications-popover";
import WalletPopover from "./wallet-popover";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import WalletConnectScreen from "./wallet-connect-modal";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";

export default function ClientHeader() {
  // Use current route to style active tab
  const pathname = usePathname();

  // Track if onboarding is complete
  // const [onboardingComplete, setOnboardingComplete] = useState(false);
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

  // useEffect(() => {
  //   const handler = () => {
  //     setOnboardingComplete(true);
  //   };
  //   window.addEventListener("onboardingComplete", handler);
  //   return () => window.removeEventListener("onboardingComplete", handler);
  // }, []);

  // // Show header if: NOT on homepage OR onboarding is complete
  // const showHeader = pathname !== "/" || onboardingComplete;

  // Whether the Price Trend page is active (to show toolbar in ticker row)
  const [priceTrendActive, setPriceTrendActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!(window as { __priceTrendPageVisible?: boolean })
        .__priceTrendPageVisible;
    }
    return false;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      const visible =
        customEvent?.detail?.visible ??
        !!(window as { __priceTrendPageVisible?: boolean })
          .__priceTrendPageVisible;
      setPriceTrendActive(!!visible);
    };
    window.addEventListener("priceTrendPage", handler);
    return () => window.removeEventListener("priceTrendPage", handler);
  }, []);

  const [showAthleteRankingPage, setShowAthleteRankingPage] = useState<boolean>(
    () => {
      if (typeof window !== "undefined") {
        return !!(window as { __athleteRankingPageVisible?: boolean })
          .__athleteRankingPageVisible;
      }
      return false;
    }
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      const visible =
        customEvent?.detail?.visible ??
        !!(window as { __athleteRankingPageVisible?: boolean })
          .__athleteRankingPageVisible;
      setShowAthleteRankingPage(!!visible);
    };
    window.addEventListener("athleteRankingPage", handler);
    return () => window.removeEventListener("athleteRankingPage", handler);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trade", href: "/athlete/lebron-james" },
    { label: "Discover", href: "/discover" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Leaderboard", href: "/leaderboard" },
    // { label: "Learn", href: "/learn" },
  ];
  const baseBtn =
    "flex flex-row items-center justify-center h-[36px] rounded-[100px] py-[7px] px-[12px] gap-[4px] hover:bg-primary-foreground";

  // League/Team options (using available league icons)
  const teamOptions = [
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
  const [selectedTeam, setSelectedTeam] = useState(teamOptions[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const formatShortDate = (d?: Date) =>
    d
      ? d.toLocaleDateString(undefined, { day: "2-digit", month: "short" })
      : "Pick date";

  const [walletConnected, setWalletConnected] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV !== "production") {
        try {
          localStorage.removeItem("walletConnected");
        } catch {}
      }
      return !!localStorage.getItem("walletConnected");
    }
    return false;
  });
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ticker data
  const tickerItems = [
    { name: "L. James", change: 2.4 },
    { name: "G. Antetokounmpo", change: -0.03 },
    { name: "S. Curry", change: 2.4 },
    { name: "K. Durant", change: 2.4 },
    { name: "N. Jokic", change: -0.03 },
    { name: "L. Doncic", change: 2.4 },
    { name: "J. Tatum", change: -0.03 },
    { name: "A. Davis", change: 2.4 },
  ];
  const formatChange = (n: number) => `${n > 0 ? "+" : ""}${n}%`;
  const clearHighlights = () => {
    document
      .querySelectorAll('span[data-search-highlight="1"]')
      .forEach((el) => {
        const parent = el.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        (parent as HTMLElement).normalize?.();
      });
  };
  function highlightQuery(q: string) {
    const tokens = q
      .trim()
      .split(/[\s\u00A0]+/)
      .filter((t) => t.length > 0);
    if (!tokens.length) return;

    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const phrasePattern = tokens.map(esc).join("[\\s\\u00A0]+");
    const rePhrase = new RegExp(phrasePattern, "gi");
    const reTokens = new RegExp(tokens.map(esc).join("|"), "gi");

    const nodes: Text[] = [];

    const root = document.body;
    const headerEl = document.getElementById("app-header");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      nodes.push(walker.currentNode as Text);
    }

    for (const node of nodes) {
      const parentEl = node.parentElement;
      if (!node.nodeValue || !parentEl) continue;

      if (headerEl && headerEl.contains(parentEl)) continue;
      if (parentEl.closest("[data-search-exclude]")) continue;
      if (/^(script|style)$/i.test(parentEl.tagName)) continue;

      const text = node.nodeValue;

      // Pass 1: highlight the full phrase when it exists in this text node
      rePhrase.lastIndex = 0;
      let lastIndex = 0;
      let matchedPhrase = false;
      let m: RegExpExecArray | null;
      const fragPhrase = document.createDocumentFragment();

      while ((m = rePhrase.exec(text)) !== null) {
        matchedPhrase = true;
        if (m.index > lastIndex) {
          fragPhrase.appendChild(
            document.createTextNode(text.slice(lastIndex, m.index))
          );
        }
        const span = document.createElement("span");
        span.setAttribute("data-search-highlight", "1");
        span.className = "bg-base-yellow/30 rounded-[4px] px-[2px]";
        span.textContent = m[0];
        fragPhrase.appendChild(span);
        lastIndex = rePhrase.lastIndex;
      }

      if (matchedPhrase) {
        if (lastIndex < text.length) {
          fragPhrase.appendChild(
            document.createTextNode(text.slice(lastIndex))
          );
        }
        node.parentNode?.replaceChild(fragPhrase, node);
        continue;
      }

      // Pass 2: phrase spans multiple nodes -> highlight individual tokens
      reTokens.lastIndex = 0;
      lastIndex = 0;
      const fragTokens = document.createDocumentFragment();
      let anyToken = false;
      let t: RegExpExecArray | null;

      while ((t = reTokens.exec(text)) !== null) {
        anyToken = true;
        if (t.index > lastIndex) {
          fragTokens.appendChild(
            document.createTextNode(text.slice(lastIndex, t.index))
          );
        }
        const span = document.createElement("span");
        span.setAttribute("data-search-highlight", "1");
        span.className = "bg-base-yellow/30 rounded-[4px] px-[2px]";
        span.textContent = t[0];
        fragTokens.appendChild(span);
        lastIndex = reTokens.lastIndex;
      }

      if (!anyToken) continue;
      if (lastIndex < text.length) {
        fragTokens.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      node.parentNode?.replaceChild(fragTokens, node);
    }
  }
  useEffect(() => {
    clearHighlights();
    const q = searchQuery.trim();
    if (q.length >= 2) highlightQuery(q);
  }, [searchQuery, pathname]);

  return (
    <AnimatePresence>
      {/* {showHeader && ( */}
        <motion.header
          id="app-header"
          key="app-header"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[101] h-fit bg-white"
        >
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="flex flex-row w-full h-[64px] border-b border-black/5 py-[14px] px-[16px] sm:px-[24px] md:px-[32px] xl:px-[40px] bg-white items-center justify-between">
            <div className="flex flex-row gap-[16px] items-center">
              <Link href="/" aria-label="Home">
                <Image
                  src="/FORCE.svg"
                  alt="Vibranium"
                  width={100}
                  height={31}
                />
              </Link>
              <div className="h-[12px] border border-black/5 hidden lg:block"></div>

              <div className="hidden lg:flex flex-row gap-[8px] items-center">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Button
                      key={item.href}
                      asChild
                      className={`${baseBtn} ${
                        active ? "bg-nav-button" : "bg-transparent"
                      } rounded-lg`}
                    >
                      <Link href={item.href}>
                        <p
                          className={`text-[14px] leading-[100%] tracking-tight font-medium ${
                            active ? "text-main" : "text-soft-400"
                          }`}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-row gap-[12px] items-center">
              <div className="flex flex-row items-center gap-[10px]">
                <div className="flex flex-row items-center w-[160px] sm:w-[220px] h-[32px] rounded-[7px] border border-black/5 py-[6px] pr-[12px] pl-[10px] gap-[10px] bg-white">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-[18px] bg-transparent border-0 outline-none px-0 text-[12px] leading-[100%] tracking-tight placeholder:text-disabled-300 text-[#0a0d14]"
                  />
                </div>
                {
                  walletConnected ? (
                    <>
                    <WalletPopover />
                  </>
                  ) : (
                    <Popover open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex flex-row items-center hover:cursor-pointer">
                          <div className="rounded-lg bg-[#7100FF] p-2 text-white">
                            <WalletIcon className="text-white" width={15} height={15} />
                          </div>
                          <span className="ml-2 text-[12px] font-medium text-muted-foreground">
                            Connect your wallet
                          </span>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[422px] max-w-[90vw] p-6 z-[200]"
                        align="end"
                        side="bottom"
                      >
                        <div className="flex flex-col items-center gap-6">
                          <WalletConnectScreen
                            onWalletChosen={(id) => {
                              setWalletConnected(true);
                              if (typeof window !== "undefined") {
                                localStorage.setItem("walletConnected", "1");
                              }
                              setWalletDialogOpen(false);
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                }
              </div>
              <div className="hidden lg:flex flex-row items-center gap-[10px]">
              </div>
              <div className="hidden lg:block h-[12px] border border-black/5"></div>
              <div className="hidden lg:flex">
                  <NotificationsPopover />
                </div>
              
              

              <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="lg:hidden flex items-center justify-center h-[32px] w-[32px] rounded-[7px] border border-main/7 bg-white hover:bg-primary-foreground">
                    <Menu className="w-[18px] h-[18px] text-main" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-white"
                  style={{ top: 118, height: "calc(100vh - 118px)" }}
                >
                  <div className="flex flex-col gap-4 p-4">
                    {!walletConnected ? (
                      <div className="flex flex-col gap-4">
                        <Dialog
                          open={walletDialogOpen}
                          onOpenChange={setWalletDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <button className="text-main font-nohemi text-[18px] leading-none text-left">
                              Connect Wallet
                            </button>
                          </DialogTrigger>
                          <DialogContent
                            fullscreen
                            className="overflow-auto z-[200]"
                            showCloseButton={true}
                          >
                            <WalletConnectScreen
                              onWalletChosen={(id) => {
                                setWalletConnected(true);
                                if (typeof window !== "undefined") {
                                  localStorage.setItem("walletConnected", "1");
                                }
                                setWalletDialogOpen(false);
                                setMobileSheetOpen(false);
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                        <p className="text-main font-nohemi text-[18px] leading-none">
                          Notifications
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                        <WalletPopover />
                        <NotificationsPopover />
                      </div>
                    )}
                    <div className="flex flex-col border-t border-light-gray mt-2 pt-4">
                      {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileSheetOpen(false)}
                            className={`rounded-[8px] px-3 py-2 transition-colors hover:bg-primary-foreground ${
                              active ? "text-main" : "text-soft-400"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Toolbar + Infinite ticker (second row) */}
            <div
              id="athlete-ticker-header"
              className={`relative h-fit bg-white px-10 flex flex-row${
              priceTrendActive || showAthleteRankingPage
                ? "py-[8.22px]"
                : "py-5"
            } gap-3 border-b border-black/5 overflow-hidden`}
          >
            <LeagueSwitcher
                    selected={selectedLeague}
                    options={leagueOptions}
                    onChange={setSelectedLeague}
                  />
            {/* <Popover>
              <PopoverTrigger asChild>
                <button className="flex flex-row bg-page-background items-center gap-2 hover:opacity-80 p-2 my-2 rounded-lg transition-opacity cursor-pointer whitespace-nowrap flex-shrink-0">
                  <Image
                    src={selectedTeam.icon}
                    alt={selectedTeam.label}
                    width={20}
                    height={20}
                    className="rounded-1 flex-shrink-0"
                  />
                  <span className="text-[13px] font-medium text-main whitespace-nowrap">
                    {selectedTeam.label}
                  </span>
                  <ChevronDown size={14} className="text-soft-400 flex-shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-[220px] p-2 bg-white"
              >
                <div className="flex flex-col max-h-[300px] overflow-auto">
                  {teamOptions.map((opt) => {
                    const active = opt.id === selectedTeam.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedTeam(opt)}
                        className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md hover:bg-primary-foreground ${
                          active ? "bg-primary-foreground" : ""
                        }`}
                      >
                        <Image
                          src={opt.icon}
                          alt={opt.label}
                          width={20}
                          height={20}
                          className="rounded-[4px]"
                        />
                        <span className="text-[13px] text-main">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover> */}

            <div className="flex items-center gap-3">
              {(priceTrendActive || showAthleteRankingPage) && (
                <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 md:gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="h-fit px-3 rounded-[100px] border border-main/7 bg-white hover:bg-primary-foreground flex items-center gap-2">
                        <Image
                          src={selectedTeam.icon}
                          alt={selectedTeam.label}
                          width={18}
                          height={18}
                          className="rounded-1"
                        />
                        <span className="text-[13px] font-medium text-main">
                          {selectedTeam.label}
                        </span>
                        <ChevronDown size={14} className="text-soft-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-[220px] p-2 bg-white"
                    >
                      <div className="flex flex-col max-h-[300px] overflow-auto">
                        {teamOptions.map((opt) => {
                          const active = opt.id === selectedTeam.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedTeam(opt)}
                              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md hover:bg-primary-foreground ${
                                active ? "bg-primary-foreground" : ""
                              }`}
                            >
                              <Image
                                src={opt.icon}
                                alt={opt.label}
                                width={20}
                                height={20}
                                className="rounded-[4px]"
                              />
                              <span className="text-[13px] text-main">
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="h-fit px-3 rounded-[100px] border border-main/7 bg-white hover:bg-primary-foreground flex items-center gap-2">
                        <CalendarIcon size={14} className="text-main" />
                        <span className="text-[13px] font-medium text-main">
                          {formatShortDate(selectedDate)}
                        </span>
                        <ChevronDown size={14} className="text-soft-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-3 bg-white">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md bg-white"
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="hidden md:block h-[20px] border border-black/5 mx-[4px]" />
                </div>
              )}

              {/* Infinite scroller with fading edges (mask applied only here) */}
              <div
                className="relative w-full md:flex-1 overflow-hidden
                           md:[mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]
                           md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]"
              >
                <div className="ticker-track whitespace-nowrap flex w-full will-change-transform">
                  {tickerItems.map((item, idx) => (
                    <span
                      key={`t1-${idx}`}
                      className="flex items-center gap-[8px] mr-[24px]"
                    >
                      <span className="font-medium text-[13px] leading-[100%] tracking-tight text-main">
                        {item.name}
                      </span>
                      <span
                        className={`font-medium text-[13px] leading-[100%] tracking-tight ${
                          item.change >= 0
                            ? "text-light-green"
                            : "text-neon-pink"
                        }`}
                      >
                        {formatChange(item.change)}
                      </span>
                    </span>
                  ))}
                  {tickerItems.map((item, idx) => (
                    <span
                      key={`t2-${idx}`}
                      className="flex items-center gap-[8px] mr-[24px]"
                    >
                      <span className="font-medium text-[13px] leading-[100%] tracking-tight text-main">
                        {item.name}
                      </span>
                      <span
                        className={`font-medium text-[13px] leading-[100%] tracking-tight ${
                          item.change >= 0
                            ? "text-light-green"
                            : "text-neon-pink"
                        }`}
                      >
                        {formatChange(item.change)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.header>
      
    </AnimatePresence>
  );
}
