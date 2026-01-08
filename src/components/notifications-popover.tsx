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
          <Bell className="text-text-primary" width={18} height={18} />
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
            <ChevronRight className="text-soft-400" width={14} height={14} />
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
