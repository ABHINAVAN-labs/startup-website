"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export function Founders() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  // 3D Parallax Effects
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const founders = [
    {
      name: "Manidwiptam Halder",
      role: "Co-Founder",
      image: "/Images/founder1.png",
      github: "https://github.com/Manidwiptam",
      linkedin: "https://www.linkedin.com/in/manidwiptam/",
      y: y1
    },
    {
      name: "Rohan Banerjee",
      role: "Co-Founder",
      image: "/Images/founder2.png",
      github: "https://github.com/rohanbanerjee1234567-cell",
      linkedin: "https://www.linkedin.com/in/rohan-banerjee-667283356/",
      y: y1
    },
    {
      name: "Soumyadeep Paul",
      role: "Co-Founder",
      image: "/Images/founder3.png",
      github: "https://github.com/Soumya03007",
      linkedin: "https://www.linkedin.com/in/soumyadeeppaul7/",
      y: y1
    }
  ];

  return (
    <section id="team" className="py-32 relative bg-[#0a0a0a]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }} className="flex flex-col items-center text-center mb-24 relative z-10">
          <span className="text-primary font-script text-4xl mb-2">The Minds</span>
          <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-widest">
            Behind It All
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 px-4 lg:px-0 perspective-[1200px] relative z-20">
          {founders.map((founder, idx) => (
            <motion.div
              key={founder.name}
              style={{ y: founder.y, rotateX, scale }}
              className="relative group"
            >
              <div className="relative h-[60vh] w-full overflow-hidden border border-white/10 bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 opacity-20 flex items-center justify-center font-serif tracking-[0.3em] uppercase text-xs z-0">
                  Portrait
                </div>
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal z-10"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 z-20" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="font-serif text-2xl mb-1">{founder.name}</h3>
                  <p className="text-primary text-xs uppercase tracking-widest font-bold mb-4">{founder.role}</p>
                  
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href={founder.github} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                    <a href={founder.linkedin} target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
