"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactLenis root options={{ lerp: 0.06, smoothWheel: true, wheelMultiplier: 1.2 }}>
        {children}
      </ReactLenis>
    </>
  );
}
