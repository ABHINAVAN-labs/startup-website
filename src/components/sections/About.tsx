"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);
  
  // 3D Parallax Effects
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section id="about" className="py-32 relative perspective-[1500px]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 transform-gpu">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 relative">
          
          {/* Abstract Side */}
          <div className="lg:w-3/5 relative z-0 h-[60vh] lg:h-[80vh] w-full overflow-hidden border border-white/5 shadow-2xl">
             <motion.div style={{ y: imgY, scale: bgScale }} className="absolute inset-[-20%] w-[140%] h-[140%] origin-center">
                {/* Abstract pattern */}
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center opacity-50">
                  <span className="font-serif text-3xl md:text-5xl lg:text-7xl text-white/5 tracking-[0.5em] uppercase rotate-[-90deg] lg:rotate-0">Abhinavan</span>
                </div>
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] opacity-60 lg:opacity-100" />
          </div>

          {/* Text Overlapping Card */}
          <motion.div 
            style={{ y: textY, rotateY: cardRotateY, rotateX: cardRotateX }}
            className="lg:w-1/2 lg:absolute right-0 lg:right-12 z-10 bg-[#1a1a1a] p-10 md:p-16 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] origin-left transform-gpu"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Our Mission</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Building the next generation of <br/>
              <span className="font-script text-primary text-5xl md:text-6xl lg:text-7xl lowercase">adaptive tech</span>.
            </h2>
            
            <p className="text-foreground/70 mb-8 leading-loose font-light text-sm md:text-base">
              Abhinavan is a startup focused on building adaptive, intelligent, and scalable systems. We specialize in backend infrastructure, AI engineering, and real-world problem solving. 
              Our mission is to bridge the gap between cutting-edge research and production-ready applications, delivering elegance through engineering.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/5 pt-8">
               <div>
                  <h4 className="font-serif text-3xl mb-2">01.</h4>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Backend</p>
                  <p className="text-foreground/50 text-sm">Fault-tolerant infrastructure designed for absolute scale.</p>
               </div>
               <div>
                  <h4 className="font-serif text-3xl mb-2">02.</h4>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">AI Agents</p>
                  <p className="text-foreground/50 text-sm">Intelligent models integrated directly into production workflows.</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
