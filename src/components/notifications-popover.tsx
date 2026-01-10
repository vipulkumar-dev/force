"use client";

import Image from "next/image";
import { Bell, ChevronRight, Check } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";

export default function NotificationsPopover() {
  const notifications = [
    {
      status: "success",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="font-semibold">LeBron James ($50)</span> was
          successfully opened at <span className="font-semibold">$12.45</span>.
        </>
      ),
      time: "Just now",
      unread: true,
    },
    {
      status: "success",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="font-semibold">LeBron James ($50)</span> was
          successfully opened at <span className="font-semibold">$12.45</span>.
        </>
      ),
      time: "1 day ago",
    },
    {
      status: "info",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="font-semibold">LeBron James ($50)</span> was
          successfully opened at <span className="font-semibold">$12.45</span>.
        </>
      ),
      time: "1 day ago",
    },
    {
      status: "info",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="font-semibold">LeBron James ($50)</span> was
          successfully opened at <span className="font-semibold">$12.45</span>.
        </>
      ),
      time: "2 days ago",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-elevation-button cursor-pointer rounded-lg p-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-secondary"
          >
            <path
              d="M5.625 10.625V11.25C5.625 11.7473 5.82254 12.2242 6.17417 12.5758C6.52581 12.9275 7.00272 13.125 7.5 13.125C7.99728 13.125 8.47419 12.9275 8.82583 12.5758C9.17746 12.2242 9.375 11.7473 9.375 11.25V10.625M6.25 3.125C6.25 2.79348 6.3817 2.47554 6.61612 2.24112C6.85054 2.0067 7.16848 1.875 7.5 1.875C7.83152 1.875 8.14946 2.0067 8.38388 2.24112C8.6183 2.47554 8.75 2.79348 8.75 3.125C9.46776 3.46439 10.0796 3.9927 10.52 4.65331C10.9604 5.31392 11.2128 6.08192 11.25 6.875V8.75C11.297 9.13857 11.4346 9.51066 11.6518 9.83633C11.8689 10.162 12.1594 10.4321 12.5 10.625H2.5C2.84059 10.4321 3.13113 10.162 3.34824 9.83633C3.56535 9.51066 3.70297 9.13857 3.75 8.75V6.875C3.78723 6.08192 4.03956 5.31392 4.47997 4.65331C4.92037 3.9927 5.53224 3.46439 6.25 3.125Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="z-[200] w-[450px] rounded-xl border border-black/5 p-0 shadow-xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between bg-white p-4">
          <p className="font-semibold">Notifications</p>

          <div className="bg-nav-button rounded-lg p-2">
            <ChevronRight
              className="text-text-secondary"
              width={14}
              height={14}
            />
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* LIST */}
        <div className="flex flex-col">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`m-[10px] flex gap-3 rounded-[14px] p-4 ${n.unread ? "bg-gray-50" : "bg-white"} `}
            >
              {/* ICON */}
              <div
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md ${n.status === "success" && "bg-green-100 text-green-600"} ${n.status === "info" && "bg-gray-100 text-gray-500"} `}
              >
                {n.status === "success" && <Check width={16} />}
                {n.status === "info" && (
                  <span className="text-lg leading-none">i</span>
                )}
              </div>

              {/* TEXT */}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-sm font-semibold">{n.title}</p>

                <p className="text-xs leading-snug text-gray-500">
                  {n.message}
                </p>

                <p className="mt-1 text-[11px] text-gray-400">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
