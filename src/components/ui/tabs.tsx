"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-[40px] w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base: text-like tab, no pill/shadow
        "relative inline-flex items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap bg-transparent rounded-none",
        // Text colors: unselected soft, selected main
        "text-soft-400 data-[state=active]:text-main",
        // Underline: animate in/out using scale-x for smooth movement
        "border-b border-transparent after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-main after:origin-left after:scale-x-0 data-[state=active]:after:scale-x-100",
        // Transitions
        "transition-[color] duration-200 ease-out after:transition-transform after:duration-200",
        // Remove previous button-like visuals
        "data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
