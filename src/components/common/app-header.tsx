"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LeagueSwitcher from "@/components/home-page/league-switcher";
import {
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  Menu,
  Moon,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import NotificationsPopover from "@/components/notifications-popover";
import WalletPopover from "@/components/wallet-popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import WalletConnectScreen from "@/components/wallet-connect-modal";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Logo from "@/image/FORCE.svg";

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
    },
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
    new Date(),
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
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);

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
            document.createTextNode(text.slice(lastIndex, m.index)),
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
            document.createTextNode(text.slice(lastIndex)),
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
            document.createTextNode(text.slice(lastIndex, t.index)),
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
        className="fixed top-0 right-0 left-0 z-[101] h-fit bg-white"
      >
        <div className="w-full">
          <div className="bg-bg-secondary w-full border-b">
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="flex h-[64px] w-full flex-row items-center justify-between px-[16px] py-[14px] sm:px-[24px] md:px-[32px] xl:px-[40px]">
                <div className="flex flex-row items-center gap-[16px]">
                  <Link href="/" aria-label="Home">
                    <Logo className="text-text-primary w-[100px]" />
                  </Link>
                  <div className="hidden h-[12px] border border-black/5 lg:block"></div>

                  <div className="hidden flex-row items-center gap-[8px] lg:flex">
                    {navItems.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Button
                          key={item.href}
                          asChild
                          className={`${baseBtn} ${
                            active ? "bg-bg-tertiary!" : "bg-transparent!"
                          } rounded-lg`}
                        >
                          <Link href={item.href}>
                            <p
                              className={`text-[14px] leading-[100%] font-medium tracking-tight ${
                                active ? "text-text-primary" : "text-soft-400"
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
                <div className="flex flex-row items-center gap-[12px]">
                  <div className="flex flex-row items-center gap-[10px]">
                    <div className="bg-elevation-button flex h-[32px] w-[160px] flex-row items-center gap-[10px] rounded-[7px] py-[6px] pr-[12px] pl-[10px] sm:w-[220px]">
                      <Search
                        width={12}
                        height={12}
                        className="text-text-primary shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="Search Anything..."
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="placeholder:text-disabled-300 h-[18px] flex-1 border-0 bg-transparent px-0 text-[12px] leading-[100%] tracking-tight text-[#0a0d14] outline-none"
                      />
                    </div>
                    {walletConnected ? (
                      <>
                        <WalletPopover />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="hidden flex-row items-center gap-[10px] lg:flex"></div>
                  <div className="hidden h-[12px] border border-black/5 lg:block"></div>
                  <div className="hidden flex-row items-center gap-2 lg:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                      className="bg-elevation-button hover:bg-elevation-button! h-[32px] w-[32px] cursor-pointer rounded-lg"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? (
                        <Sun className="text-text-primary h-[18px] w-[18px]" />
                      ) : (
                        <Moon className="text-text-primary h-[18px] w-[18px]" />
                      )}
                    </Button>
                    <NotificationsPopover />
                    {walletConnected ? (
                      <>
                        <Dialog
                          open={accountDialogOpen}
                          onOpenChange={setAccountDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-elevation-button hover:bg-elevation-button! h-[32px] w-[32px] cursor-pointer rounded-lg"
                              aria-label="Account"
                            >
                              <User className="text-text-primary h-[18px] w-[18px]" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="z-[200] w-[400px] max-w-[90vw] rounded-2xl p-6">
                            <div className="flex flex-col items-center gap-4">
                              <h2 className="text-text-primary text-xl font-semibold">
                                Account
                              </h2>
                              <div className="flex rounded-full bg-black p-4">
                                <Image
                                  src="/icons/wallet2.svg"
                                  alt="Wallet"
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="flex w-full flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                  <h4 className="text-text-primary text-sm font-semibold">
                                    Username
                                  </h4>
                                  <input
                                    type="text"
                                    placeholder="Username"
                                    className="bg-page-background hover:bg-primary-foreground w-full rounded-lg p-3 text-left transition-colors"
                                  />
                                </div>
                                <button className="bg-page-background hover:bg-primary-foreground w-full rounded-lg p-4 text-left transition-colors">
                                  <p className="text-text-primary text-center text-sm font-semibold">
                                    Disconnect Wallet
                                  </p>
                                </button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : (
                      <Dialog
                        open={walletDialogOpen}
                        onOpenChange={setWalletDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <div className="bg-elevation-button flex flex-row items-center rounded-lg p-2 hover:cursor-pointer">
                            <span className="text-text-primary text-[12px] font-medium">
                              Connect your wallet
                            </span>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="z-[200] w-[422px] max-w-[90vw] rounded-2xl p-6">
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
                        </DialogContent>
                      </Dialog>
                    )}
                    {/* <Button
                    variant="ghost"
                    size="icon"
                    // onClick={toggleDarkMode}
                    className="h-[32px] w-[32px] rounded-lg bg-page-background"
                    aria-label="Toggle dark mode"
                  >
                  <User className="w-[18px] h-[18px] text-text-primary" />
                  </Button> */}
                  </div>

                  <Sheet
                    open={mobileSheetOpen}
                    onOpenChange={setMobileSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button className="border-main/7 hover:bg-primary-foreground flex h-[32px] w-[32px] items-center justify-center rounded-[7px] border bg-white lg:hidden">
                        <Menu className="text-text-primary h-[18px] w-[18px]" />
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
                                <button className="text-text-primary font-nohemi text-left text-[18px] leading-none">
                                  Connect Wallet
                                </button>
                              </DialogTrigger>
                              <DialogContent
                                fullscreen
                                className="z-[200] overflow-auto"
                                showCloseButton={true}
                              >
                                <WalletConnectScreen
                                  onWalletChosen={(id) => {
                                    setWalletConnected(true);
                                    if (typeof window !== "undefined") {
                                      localStorage.setItem(
                                        "walletConnected",
                                        "1",
                                      );
                                    }
                                    setWalletDialogOpen(false);
                                    setMobileSheetOpen(false);
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                            <p className="text-text-primary font-nohemi text-[18px] leading-none">
                              Notifications
                            </p>
                            <button
                              onClick={toggleDarkMode}
                              className="text-text-primary font-nohemi flex flex-row items-center gap-2 text-left text-[18px] leading-none"
                            >
                              {darkMode ? (
                                <>
                                  <Sun className="h-[18px] w-[18px]" />
                                  Light Mode
                                </>
                              ) : (
                                <>
                                  <Moon className="h-[18px] w-[18px]" />
                                  Dark Mode
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
                            <WalletPopover />
                            <NotificationsPopover />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleDarkMode}
                              className="border-main/7 hover:bg-primary-foreground h-[32px] w-[32px] rounded-[7px] border bg-white"
                              aria-label="Toggle dark mode"
                            >
                              {darkMode ? (
                                <Sun className="text-text-primary h-[18px] w-[18px]" />
                              ) : (
                                <Moon className="text-text-primary h-[18px] w-[18px]" />
                              )}
                            </Button>
                          </div>
                        )}
                        <div className="border-light-gray mt-2 flex flex-col border-t pt-4">
                          {navItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileSheetOpen(false)}
                                className={`hover:bg-primary-foreground rounded-[8px] px-3 py-2 transition-colors ${
                                  active ? "text-text-primary" : "text-soft-400"
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
            </div>
          </div>

          {/* Toolbar + Infinite ticker (second row) */}
          <div className="bg-bg-secondary w-full border-b">
            <div
              id="athlete-ticker-header"
              className={`relative mx-auto flex h-fit max-w-[1440px] flex-row px-10 ${
                priceTrendActive || showAthleteRankingPage ? "py-0" : "py-0"
              } gap-3 overflow-hidden`}
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
                  <span className="text-[13px] font-medium text-text-primary whitespace-nowrap">
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
                        <span className="text-[13px] text-text-primary">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover> */}

              <div
                className="flex w-full flex-row overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 40px, black calc(100% - 100px), transparent)",
                }}
              >
                <div className="flex shrink-0 items-center gap-3">
                  {(priceTrendActive || showAthleteRankingPage) && (
                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="border-main/7 hover:bg-primary-foreground flex h-fit items-center gap-2 rounded-[100px] border bg-white px-3">
                            <Image
                              src={selectedTeam.icon}
                              alt={selectedTeam.label}
                              width={18}
                              height={18}
                              className="rounded-1"
                            />
                            <span className="text-text-secondary text-[13px] font-medium">
                              {selectedTeam.label}
                            </span>
                            <ChevronDown size={14} className="text-soft-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="w-[220px] bg-white p-2"
                        >
                          <div className="flex max-h-[300px] flex-col overflow-auto">
                            {teamOptions.map((opt) => {
                              const active = opt.id === selectedTeam.id;
                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => setSelectedTeam(opt)}
                                  className={`hover:bg-primary-foreground flex w-full items-center gap-3 rounded-md px-2 py-2 text-left ${
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
                                  <span className="text-text-primary text-[13px]">
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
                          <Button className="border-main/7 hover:bg-primary-foreground flex h-fit items-center gap-2 rounded-[100px] border bg-white px-3">
                            <CalendarIcon
                              size={14}
                              className="text-text-primary"
                            />
                            <span className="text-text-primary text-[13px] font-medium">
                              {formatShortDate(selectedDate)}
                            </span>
                            <ChevronDown size={14} className="text-soft-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="bg-white p-3">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md bg-white"
                          />
                        </PopoverContent>
                      </Popover>

                      <div className="mx-[4px] hidden h-[20px] border border-black/5 md:block" />
                    </div>
                  )}

                  {/* Infinite scroller with fading edges (mask applied only here) */}
                  <div className="relative w-full overflow-hidden md:flex-1 md:[mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)] md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]">
                    <div className="ticker-track flex w-full whitespace-nowrap will-change-transform">
                      {tickerItems.map((item, idx) => (
                        <span
                          key={`t1-${idx}`}
                          className="mr-[24px] flex items-center gap-[8px]"
                        >
                          <span className="text-text-secondary text-[13px] leading-[100%] font-medium tracking-tight">
                            {item.name}
                          </span>
                          <span
                            className={`text-[13px] leading-[100%] font-medium tracking-tight ${
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
                          className="mr-[24px] flex items-center gap-[8px]"
                        >
                          <span className="text-text-secondary text-[13px] leading-[100%] font-medium tracking-tight">
                            {item.name}
                          </span>
                          <span
                            className={`text-[13px] leading-[100%] font-medium tracking-tight ${
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
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
