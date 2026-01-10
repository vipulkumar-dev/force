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
import Ticker from "./header/ticker";

export default function ClientHeader() {
  // Use current route to style active tab
  const pathname = usePathname();

  // Track if onboarding is complete
  // const [onboardingComplete, setOnboardingComplete] = useState(false);
  const leagueOptions = [
    { id: "nba", label: "NBA league", icon: "/icons/leagues/nba-logo.svg" },
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
        className="fixed top-0 right-0 left-0 z-[101] h-fit"
      >
        <div className="border-border-secondary dark:border-border w-full border-b">
          <div className="bg-bg-secondary w-full">
            <div className="mx-auto w-full max-w-[1400px] border-x">
              <div className="px-global flex h-[58px] w-full flex-row items-center justify-between py-[14px]">
                <div className="flex flex-row items-center gap-[24px]">
                  <Link href="/" aria-label="Home">
                    <Logo className="text-text-primary w-[75px]" />
                  </Link>

                  <div className="hidden flex-row items-center gap-[4px] lg:flex">
                    {navItems.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Button
                          key={item.href}
                          asChild
                          className={`${baseBtn} ${
                            active
                              ? "bg-bg-tertiary! mx-[8px] px-[12px]"
                              : "bg-transparent!"
                          } h-[28px] rounded-lg px-[8px] py-[8px]`}
                        >
                          <Link href={item.href}>
                            <p
                              className={`text-[12px] leading-[100%] font-medium tracking-tight ${
                                active
                                  ? "text-text-primary"
                                  : "text-text-secondary"
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
                  <div className="relative flex flex-row items-center gap-[10px]">
                    <div className="bg-elevation-button flex h-[32px] w-[160px] flex-row items-center justify-between gap-[10px] rounded-full pr-[12px] pl-[12px] text-[12px] leading-[100%] font-medium text-[#0a0d14] sm:w-[220px]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.875 11.875L8.125 8.125M0.625 5C0.625 5.57453 0.738163 6.14344 0.958027 6.67424C1.17789 7.20504 1.50015 7.68734 1.90641 8.09359C2.31266 8.49985 2.79496 8.82211 3.32576 9.04197C3.85656 9.26184 4.42547 9.375 5 9.375C5.57453 9.375 6.14344 9.26184 6.67424 9.04197C7.20504 8.82211 7.68734 8.49985 8.09359 8.09359C8.49985 7.68734 8.82211 7.20504 9.04197 6.67424C9.26184 6.14344 9.375 5.57453 9.375 5C9.375 4.42547 9.26184 3.85656 9.04197 3.32576C8.82211 2.79496 8.49985 2.31266 8.09359 1.90641C7.68734 1.50015 7.20504 1.17789 6.67424 0.958027C6.14344 0.738163 5.57453 0.625 5 0.625C4.42547 0.625 3.85656 0.738163 3.32576 0.958027C2.79496 1.17789 2.31266 1.50015 1.90641 1.90641C1.50015 2.31266 1.17789 2.79496 0.958027 3.32576C0.738163 3.85656 0.625 4.42547 0.625 5Z"
                          stroke="#7E7E8C"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <input
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="placeholder:text-text-secondary absolute h-[18px] flex-1 border-0 bg-transparent px-0 pl-[18px] tracking-tight outline-none"
                      />
                      <svg
                        width="17"
                        height="9"
                        viewBox="0 0 17 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.83667 8.64C1.27667 8.64 0.828672 8.476 0.492672 8.148C0.164672 7.82 0.000671908 7.38 0.000671908 6.828C0.000671908 6.244 0.172672 5.792 0.516672 5.472C0.868672 5.144 1.38467 4.98 2.06467 4.98H2.77267V3.66H2.06467C1.38467 3.66 0.868672 3.5 0.516672 3.18C0.172672 2.852 0.000671908 2.396 0.000671908 1.812C0.000671908 1.26 0.164672 0.819999 0.492672 0.491999C0.828672 0.163999 1.27667 -9.53674e-07 1.83667 -9.53674e-07C2.28467 -9.53674e-07 2.63667 0.0839989 2.89267 0.251999C3.15667 0.419999 3.34067 0.643999 3.44467 0.923999C3.55667 1.204 3.61267 1.512 3.61267 1.848V2.844H4.93267V1.848C4.93267 1.512 4.98467 1.204 5.08867 0.923999C5.20067 0.643999 5.38467 0.419999 5.64067 0.251999C5.90467 0.0839989 6.26067 -9.53674e-07 6.70867 -9.53674e-07C7.26867 -9.53674e-07 7.71267 0.163999 8.04067 0.491999C8.37667 0.819999 8.54467 1.26 8.54467 1.812C8.54467 2.396 8.37267 2.852 8.02867 3.18C7.68467 3.5 7.16867 3.66 6.48067 3.66H5.77267V4.98H6.48067C7.16867 4.98 7.68467 5.144 8.02867 5.472C8.37267 5.792 8.54467 6.244 8.54467 6.828C8.54467 7.38 8.37667 7.82 8.04067 8.148C7.71267 8.476 7.26867 8.64 6.70867 8.64C6.26067 8.64 5.90467 8.556 5.64067 8.388C5.38467 8.22 5.20067 7.996 5.08867 7.716C4.98467 7.436 4.93267 7.128 4.93267 6.792V5.796H3.61267V6.792C3.61267 7.128 3.55667 7.436 3.44467 7.716C3.34067 7.996 3.15667 8.22 2.89267 8.388C2.63667 8.556 2.28467 8.64 1.83667 8.64ZM5.77267 1.824V2.844H6.48067C6.90467 2.844 7.21267 2.76 7.40467 2.592C7.59667 2.416 7.69267 2.156 7.69267 1.812C7.69267 1.46 7.59667 1.208 7.40467 1.056C7.22067 0.903999 6.98867 0.827999 6.70867 0.827999C6.39667 0.827999 6.16067 0.919999 6.00067 1.104C5.84867 1.28 5.77267 1.52 5.77267 1.824ZM2.06467 2.844H2.77267V1.824C2.77267 1.52 2.69267 1.28 2.53267 1.104C2.38067 0.919999 2.14867 0.827999 1.83667 0.827999C1.55667 0.827999 1.32067 0.903999 1.12867 1.056C0.944672 1.208 0.852672 1.46 0.852672 1.812C0.852672 2.156 0.948672 2.416 1.14067 2.592C1.33267 2.76 1.64067 2.844 2.06467 2.844ZM3.61267 4.98H4.93267V3.66H3.61267V4.98ZM1.83667 7.812C2.14867 7.812 2.38067 7.724 2.53267 7.548C2.69267 7.364 2.77267 7.12 2.77267 6.816V5.796H2.06467C1.64067 5.796 1.33267 5.884 1.14067 6.06C0.948672 6.228 0.852672 6.484 0.852672 6.828C0.852672 7.18 0.944672 7.432 1.12867 7.584C1.32067 7.736 1.55667 7.812 1.83667 7.812ZM5.77267 6.816C5.77267 7.12 5.84867 7.364 6.00067 7.548C6.16067 7.724 6.39667 7.812 6.70867 7.812C6.98867 7.812 7.22067 7.736 7.40467 7.584C7.59667 7.432 7.69267 7.18 7.69267 6.828C7.69267 6.484 7.59667 6.228 7.40467 6.06C7.21267 5.884 6.90467 5.796 6.48067 5.796H5.77267V6.816ZM10.0941 8.64V0.119999H11.3901V4.188L14.9781 0.119999H16.5501L13.2861 3.84L16.7661 8.64H15.2421L12.4221 4.752L11.3901 5.904V8.64H10.0941Z"
                          fill="#7E7E8C"
                        />
                      </svg>
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
                  <div className="bg-border hidden h-[18px] w-px lg:block"></div>
                  <div className="hidden flex-row items-center gap-2 lg:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                      className="bg-elevation-button hover:bg-elevation-button! h-[32px] w-[32px] cursor-pointer rounded-lg"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-text-secondary"
                        >
                          <path
                            d="M3 12H4M12 3V4M20 12H21M12 20V21M5.6 5.6L6.3 6.3M18.4 5.6L17.7 6.3M17.7 17.7L18.4 18.4M6.3 17.7L5.6 18.4M8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-text-secondary"
                        >
                          <path
                            d="M7.5006 1.87496C7.5831 1.87496 7.66497 1.87496 7.74622 1.87496C6.94331 2.62103 6.42721 3.62487 6.28765 4.71198C6.14809 5.79909 6.39388 6.90073 6.98231 7.82542C7.57073 8.75011 8.46458 9.43937 9.50847 9.77338C10.5524 10.1074 11.6803 10.0651 12.6962 9.65371C12.3054 10.594 11.6667 11.4106 10.8482 12.0164C10.0297 12.6221 9.06212 12.9944 8.04866 13.0933C7.0352 13.1923 6.01388 13.0143 5.09365 12.5783C4.17342 12.1424 3.38879 11.4648 2.82346 10.6178C2.25814 9.7709 1.93332 8.78639 1.88365 7.76932C1.83398 6.75225 2.06133 5.74077 2.54145 4.84279C3.02157 3.9448 3.73645 3.19398 4.60982 2.67042C5.4832 2.14687 6.48232 1.87021 7.5006 1.86996V1.87496Z"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                          <div className="bg-elevation-button flex flex-row items-center rounded-lg px-4 py-2 hover:cursor-pointer">
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
                                  active
                                    ? "text-text-primary"
                                    : "text-text-secondary"
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
          <div className="bg-bg-secondary w-full">
            <div
              id="athlete-ticker-header"
              className={`px-global relative mx-auto flex h-fit max-w-[1400px] flex-row border-x border-t ${
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
                  <ChevronDown size={14} className="text-text-secondary flex-shrink-0" />
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
                <div className="flex w-full items-center gap-3">
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
                            <ChevronDown
                              size={14}
                              className="text-text-secondary"
                            />
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
                            <ChevronDown
                              size={14}
                              className="text-text-secondary"
                            />
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
                  <div className="relative w-full">
                    <div className="flex w-full items-center justify-start">
                      <Ticker />
                      <Ticker />
                      <Ticker />
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
