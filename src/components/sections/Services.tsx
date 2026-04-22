"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Services() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const services = [
    {
      number: "01.",
      title: "Custom Platforms",
      description: "We build bespoke websites, web applications, and internal platforms tailored to company-specific needs."
    },
    {
      number: "02.",
      title: "System Scaling",
      description: "Maintaining and scaling production systems to handle increased traffic and complex data pipelines."
    },
    {
      number: "03.",
      title: "Engineering Collaboration",
      description: "Partnering with companies as an external force for large-scale engineering projects and architectural overhauls."
    },
    {
      number: "04.",
      title: "Research & Innovation",
      description: "Active participation in research-driven initiatives to bring state-of-the-art tech to the industry."
    }
  ];

  return (
    <section id="services" className="py-32 relative bg-[#111111] perspective-[1500px]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 transform-gpu">
        
        <motion.div 
          style={{ y: headerY }}
          initial={{ opacity: 0, rotateX: 20 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-12 origin-bottom transform-gpu relative z-10"
        >
          <div>
            <span className="text-primary font-script text-4xl mb-4 block">Expertise</span>
            <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-widest">
              What We Do
            </h2>
          </div>
          <p className="text-foreground/50 max-w-sm text-sm uppercase tracking-widest leading-loose hidden md:block">
            Confident, sharp, future-focused engineering solutions.
          </p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-2 gap-x-16 gap-y-12 relative z-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, rotateX: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group cursor-default origin-bottom transform-gpu bg-[#1a1a1a] p-10 border border-white/5 shadow-2xl"
            >
              <div className="flex items-baseline gap-6 mb-6">
                <span className="font-serif text-3xl text-primary">{service.number}</span>
                <h3 className="font-serif text-3xl group-hover:text-primary transition-colors duration-500">{service.title}</h3>
              </div>
              <p className="text-foreground/60 leading-loose font-light pl-14">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
