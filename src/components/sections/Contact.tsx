"use client";

import { useState, useRef, useActionState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { ShinyButton } from "@/components/ui/ShinyButton";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "team.abhinavan@gmail.com";
  
  const [state, formAction, isPending] = useActionState(submitContact, { error: null, success: null });
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 3D form tilt and vertical scroll parallax
  const formRotateY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative bg-[#0a0a0a] border-t border-white/5 perspective-[2000px]" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 transform-gpu">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 relative">
          
          {/* Left Side */}
          <motion.div style={{ y: leftY }} className="md:w-1/2 flex flex-col justify-center relative z-10">
            <span className="text-primary font-script text-4xl mb-4 block">Get in Touch</span>
            <h3 className="font-serif text-5xl md:text-6xl uppercase tracking-widest leading-tight mb-8">
              Let's Build <br/> Something <span className="text-primary italic">Powerful</span>.
            </h3>
            <p className="text-foreground/50 mb-12 font-light leading-loose">
              Whether you need to scale your backend, build an intelligent agent, or architect a complex system—we're here to help. Reach out to discuss your technical requirements.
            </p>

            <div 
              onClick={handleCopy}
              className="group cursor-pointer inline-flex items-center gap-6 pb-4 border-b border-white/20 hover:border-primary transition-colors w-max"
            >
              <div className="w-12 h-12 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-[#111111] transition-colors">
                {copied ? <CheckCircle2 size={20} /> : <Mail size={20} />}
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-foreground/50 mb-1">Direct Email</span>
                <span className="font-serif text-xl tracking-wider">{email}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side (Form UI) */}
          <motion.div 
            style={{ rotateY: formRotateY, y: rightY }}
            className="md:w-1/2 bg-[#111111] p-10 border border-white/5 relative shadow-[0_30px_60px_rgba(0,0,0,0.8)] origin-left transform-gpu z-20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
            <form action={formAction} className="space-y-8 relative z-10">
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/60 font-bold">Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-primary focus:outline-none transition-colors rounded-none disabled:opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/60 font-bold">Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-primary focus:outline-none transition-colors rounded-none disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="text-xs uppercase tracking-widest text-foreground/60 font-bold">Project Details</label>
                <textarea 
                  rows={3}
                  id="details"
                  name="details"
                  required
                  disabled={isPending}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-primary focus:outline-none transition-colors resize-none rounded-none disabled:opacity-50"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              {state.error && (
                <p className="text-red-500 text-sm">{state.error}</p>
              )}
              {state.success && (
                <p className="text-green-500 text-sm">{state.success}</p>
              )}

              <ShinyButton 
                type="submit"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </ShinyButton>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

