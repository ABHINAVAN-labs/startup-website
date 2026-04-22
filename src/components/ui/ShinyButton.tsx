"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...props}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center gap-2 overflow-hidden px-8 py-4 font-bold uppercase tracking-widest text-[#111111] bg-primary group transition-colors hover:bg-[#509af8] disabled:opacity-70 disabled:hover:scale-100",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0" />
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
