"use client";

import Image from "next/image";
import { Bell, ChevronRight, Check } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover";
import { Button } from "./ui/button";

export default function NotificationsPopover() {
  const notifications = [
    {
      status: "success",
      title: "Order Executed",
      message: (
        <>
          Your Long position on{" "}
          <span className="font-semibold">LeBron James ($50)</span>{" "}
          was successfully opened at{" "}
          <span className="font-semibold">$12.45</span>.
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
          <span className="font-semibold">LeBron James ($50)</span>{" "}
          was successfully opened at{" "}
          <span className="font-semibold">$12.45</span>.
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
          <span className="font-semibold">LeBron James ($50)</span>{" "}
          was successfully opened at{" "}
          <span className="font-semibold">$12.45</span>.
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
          <span className="font-semibold">LeBron James ($50)</span>{" "}
          was successfully opened at{" "}
          <span className="font-semibold">$12.45</span>.
        </>
      ),
      time: "2 days ago",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="bg-nav-button rounded-lg p-2 cursor-pointer ">
          <Bell className="text-main" width={18} height={18} />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[450px] p-0 rounded-xl shadow-xl border border-black/5 z-[200]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 bg-white">
          <p className="font-semibold">Notifications</p>

          <div className="bg-nav-button rounded-lg p-2">
            <ChevronRight className="text-soft-400" width={14} height={14} />
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* LIST */}
        <div className="flex flex-col">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`
                flex gap-3 p-4 m-[10px] rounded-[14px]
                ${n.unread ? "bg-gray-50" : "bg-white"}
              `}
            >
              {/* ICON */}
              <div
                className={`
                  w-6 h-6 flex items-center justify-center rounded-md flex-shrink-0
                  ${n.status === "success" && "bg-green-100 text-green-600"}
                  ${n.status === "info" && "bg-gray-100 text-gray-500"}
                `}
              >
                {n.status === "success" && <Check width={16} />}
                {n.status === "info" && (
                  <span className="text-lg leading-none">i</span>
                )}
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="font-semibold text-sm">{n.title}</p>

                <p className="text-xs text-gray-500 leading-snug">
                  {n.message}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
