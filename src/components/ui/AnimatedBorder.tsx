"use client";

import { cn } from "@/lib/utils";
import React from "react";

export function AnimatedBorder({ children, className, innerClassName }: { children: React.ReactNode; className?: string; innerClassName?: string }) {
  return (
    <div className={cn("relative overflow-hidden p-[1px] group", className)}>
      {/* The rotating gradient border */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0070f3_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner container */}
      <div className={cn("relative h-full w-full bg-[#111111] overflow-hidden", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
