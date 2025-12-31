// src/components/app-footer.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AtSign, MessageCircle } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="w-full bg-white border-t border-black/5">
      <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 px-[16px] sm:px-[24px] md:px-[32px] xl:px-[40px] py-4 md:py-5">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-5 w-full md:w-auto text-center md:text-left">
          <span className="font-nohemi font-medium text-main">Vibranium</span>
          <a
            href="#"
            className="text-soft-400 hover:text-main text-[12px] font-medium"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-soft-400 hover:text-main text-[12px] font-medium"
          >
            Terms of Use
          </a>
          <Link
            href="/learn"
            className="text-soft-400 hover:text-main text-[12px] font-medium"
          >
            Learn
          </Link>
          <a
            href="#"
            className="text-soft-400 hover:text-main text-[12px] font-medium"
          >
            Careers
          </a>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Button
            lip="on"
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[7px] border border-main/7 bg-white hover:bg-primary-foreground hover:cursor-pointer"
          >
            <AtSign className="w-[16px] h-[16px] text-main" />
          </Button>
          <Button
            lip="on"
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[7px] border border-main/7 bg-white hover:bg-primary-foreground hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
                fill="#0a0d14"
              />
            </svg>
          </Button>
          <Button
            lip="on"
            className="flex items-center justify-center w-[32px] h-[32px] rounded-[7px] border border-main/7 bg-white hover:bg-primary-foreground hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="text-main"
            >
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
            </svg>
          </Button>
        </div>
        </div>
      </div>
    </footer>
  );
}
