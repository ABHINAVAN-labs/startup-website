"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* @ts-ignore - Bypass React 19 ReactNode type mismatch with lenis */}
      <ReactLenis root options={{ lerp: 0.06, smoothWheel: true, wheelMultiplier: 1.2 }}>
        {children as any}
      </ReactLenis>
    </>
  );
}
