"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textRotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex flex-col items-center justify-center pt-24 overflow-hidden bg-transparent perspective-[1000px]">
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12 transform-gpu">
        <motion.div
          style={{ y: textY, opacity, rotateX: textRotateX, scale: textScale }}
          className="flex flex-col items-center origin-bottom"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-4xl md:text-5xl text-primary mb-4"
          >
            Engineering the Future
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight uppercase"
          >
            Adaptive
            <br />
            <span className="italic text-foreground/90 lowercase font-serif text-5xl md:text-7xl lg:text-[8rem]">&</span> Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm md:text-base text-foreground/50 max-w-lg mt-10 tracking-widest uppercase"
          >
            Scalable Systems • Intelligent Agents • Production-Ready
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12"
          >
            <ShinyButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project
            </ShinyButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Center Parallax Image */}
      <motion.div 
        style={{ y: imageY, opacity, scale: imageScale }}
        initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
        animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] md:w-[40vw] h-[60vh] z-0 overflow-hidden transform-gpu"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent z-10" />
        <div className="relative w-full h-full opacity-30">
           <Image 
              src="/images/logo.png" 
              alt="Hero Abstract" 
              fill
              className="object-contain filter grayscale invert opacity-50 mix-blend-screen"
              priority
            />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
