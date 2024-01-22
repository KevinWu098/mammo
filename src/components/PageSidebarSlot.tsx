"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageSidebarSlotProps {
  selected: boolean;
  title: string;
  value: string;
  icon: React.ReactNode;
}
function PageSidebarSlot(props: PageSidebarSlotProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div
        className={cn(
          "bg-jas-grey_light rounded-2xl py-2 px-4 w-full flex gap-x-4 items-center",
          pathname.includes(props.value) ? "bg-jas-grey_light" : "grayscale",
        )}
      >
        <div className="bg-jas-blue p-2 rounded-xl">{props.icon}</div>
        <h1 className="text-2xl font-bold">{props.title}</h1>
      </div>
    </div>
  );
}

export default PageSidebarSlot;
