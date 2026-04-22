"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#111111] perspective-[1000px]">
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Decorative Orbs with 3D Depth */}
      <motion.div 
        style={{ y: y1, scale: scale1, rotateZ: y1 }} 
        className="absolute top-0 right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] transform-gpu" 
      />
      <motion.div 
        style={{ y: y2, scale: scale2 }} 
        className="absolute top-[40%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[100px] transform-gpu" 
      />
      
      {/* Subtle abstract lines for editorial depth */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-1/4 left-[15%] w-[1px] h-96 bg-gradient-to-b from-transparent via-primary/30 to-transparent transform-gpu"
      />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[60%] right-[25%] w-[1px] h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent transform-gpu"
      />
    </div>
  );
}
