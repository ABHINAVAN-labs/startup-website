"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trophy } from "lucide-react";

export function Hackathon() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="py-32 relative bg-[#0a0a0a] border-t border-b border-white/5 perspective-[1500px]">
      <div className="container mx-auto px-6 md:px-12 transform-gpu">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
          
          <motion.div 
            style={{ y: leftY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-5/12 relative"
          >
            {/* 3D Floating Trophy */}
            <motion.div 
              style={{ rotateY, rotateX }}
              className="absolute -left-12 -top-12 text-primary opacity-10 z-0 transform-gpu"
            >
              <Trophy size={250} strokeWidth={0.5} />
            </motion.div>
            
            <div className="relative z-10">
              <span className="text-primary font-script text-3xl mb-4 block">Innovation</span>
              <h2 className="font-serif text-5xl md:text-6xl uppercase tracking-widest leading-tight mb-8">
                Meta <br/> <span className="text-primary">OpenENV</span> <br/> Hackathon
              </h2>
              
              <div className="space-y-6 text-sm uppercase tracking-widest text-foreground/60">
                <div className="border-b border-white/5 pb-4">
                  <span className="block text-primary font-bold mb-1">Year</span>
                  2026 Event
                </div>
                <div className="border-b border-white/5 pb-4">
                  <span className="block text-primary font-bold mb-1">Collaboration</span>
                  Hugging Face × Scaler
                </div>
                <div className="border-b border-white/5 pb-4">
                  <span className="block text-primary font-bold mb-1">Focus</span>
                  Adaptive intelligent systems in dynamic real-world simulations.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: rightY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-7/12"
          >
            <h3 className="font-serif text-3xl md:text-4xl mb-8 leading-snug">Pushing the boundaries of <span className="text-primary italic">Reinforcement Learning</span>.</h3>
            
            <p className="text-foreground/60 mb-12 leading-loose font-light">
              Abhinavan's participation in the META OpenENV Hackathon represents our commitment to solving complex, real-world problems through Reinforcement Learning. 
              We tackle open environment challenges that require adaptive intelligence, proving that our systems can scale and evolve under unpredictable conditions.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 border border-white/5 bg-[#111111] shadow-xl">
                <h4 className="font-serif text-2xl mb-4 text-primary">01. Research</h4>
                <p className="text-foreground/50 text-sm leading-relaxed">Formulating the environment architecture and identifying key simulation parameters.</p>
              </div>
              <div className="p-8 border border-white/5 bg-[#111111] shadow-xl">
                <h4 className="font-serif text-2xl mb-4 text-primary">02. Training</h4>
                <p className="text-foreground/50 text-sm leading-relaxed">Deploying TorchRL models to learn adaptive strategies for load balancing.</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
