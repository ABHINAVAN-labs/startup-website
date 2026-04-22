"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // 3D Parallax Effects
  const boxRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const boxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section id="projects" className="py-32 relative bg-[#111111] perspective-[2000px]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 transform-gpu">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-primary font-script text-4xl mb-2">Our Work</span>
          <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-widest">
            Featured Projects
          </h2>
        </div>

        {/* Project 1 - Z Pattern */}
        <div className="flex flex-col lg:flex-row items-center gap-16 relative">
          
          {/* Image Side - Left */}
          <motion.div 
            style={{ rotateY: boxRotateY, scale: boxScale }}
            className="lg:w-1/2 relative h-[50vh] lg:h-[70vh] w-full origin-right transform-gpu shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <AnimatedBorder className="w-full h-full border border-white/10">
              <motion.div style={{ y: imgY }} className="absolute inset-[-15%] w-[130%] h-[130%] bg-[#0a0a0a]">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 font-mono text-[8px] md:text-[10px] text-primary/40 leading-relaxed overflow-hidden p-8">
                  {`import torch\nfrom openenv import SREEnvironment\n\n# Initialize the RL agent as SRE\nenv = SREEnvironment(traffic="spiky")\nagent = RLAgent(model="adaptive-v1")\n\nwhile True:\n    state = env.get_metrics()\n    action = agent.act(state)\n    env.step(action)`}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
              </motion.div>
            </AnimatedBorder>
          </motion.div>

          {/* Content Side - Right */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3 className="font-serif text-4xl md:text-5xl mb-6">Adaptive RL Reliability</h3>
            
            <p className="text-foreground/70 mb-8 leading-loose font-light text-sm md:text-base">
              A production-inspired Reinforcement Learning environment where an RL agent acts as an auto-scaling SRE engineer. It autonomously learns to handle traffic spikes, manage failure bursts, optimize CPU usage, and reduce latency under immense pressure.
            </p>

            <div className="mb-10">
              <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">Core Technologies</h4>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-serif italic text-foreground/80">
                <span>Python</span>
                <span>OpenENV</span>
                <span>PyTorch</span>
                <span>TorchRL</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-auto">
              <a href="https://github.com/Soumya03007/adaptive-RL-reliability" target="_blank" rel="noreferrer" className="flex-1">
                <ShinyButton className="w-full text-xs py-3 px-4 bg-[#111111] text-foreground border border-white/20 hover:border-white hover:bg-white hover:text-[#111111]">
                  <Github size={16} /> Source Code
                </ShinyButton>
              </a>
              <a href="https://huggingface.co/spaces/Soumya007/Adaptive-RL-Environment" target="_blank" rel="noreferrer" className="flex-1">
                <ShinyButton className="w-full text-xs py-3 px-4">
                  <ExternalLink size={16} /> Live Demo
                </ShinyButton>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
