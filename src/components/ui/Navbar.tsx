"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      lenis?.scrollTo(href, { offset: -100, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" }, 
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? "pt-6 px-4" : "pt-8 px-0"
      }`}
    >
      <motion.div 
        className={`flex items-center justify-between w-full transition-all duration-500 overflow-hidden
          ${isScrolled 
            ? "max-w-5xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full py-3 px-8 shadow-2xl" 
            : "max-w-7xl bg-transparent py-4 px-6 md:px-12"
          }
        `}
      >
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className={`relative transition-all duration-500 ${isScrolled ? "w-6 h-6" : "w-8 h-8"} opacity-90`}>
            <Image 
              src="/images/logo.png" 
              alt="Abhinavan Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`font-serif font-bold tracking-widest uppercase transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl"}`}>
            ABHINAVAN
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Magnetic>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-2 group text-sm font-medium text-foreground/80 hover:text-white transition-colors tracking-wider uppercase block"
                  >
                    {link.name}
                    {/* Hover Underline */}
                    <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    
                    {/* Active Indicator */}
                    {activeSection === link.href && (
                      <motion.span 
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center border-l border-white/10 pl-6">
            <Magnetic>
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="group relative overflow-hidden px-6 py-2.5 text-sm font-medium border border-primary/50 bg-[#111111] hover:border-primary transition-colors duration-300 rounded-full inline-block"
              >
                <span className="relative z-10 text-primary group-hover:text-white transition-colors duration-300">Let's Talk</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1] z-0" />
              </Link>
            </Magnetic>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center z-50 relative">
          <Magnetic>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-primary"
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </button>
          </Magnetic>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 w-full h-screen bg-[#111111]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-40 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 text-2xl font-serif">
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative hover:text-primary transition-colors ${activeSection === link.href ? "text-primary" : ""}`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={linkVariants} className="mt-8">
                <Link
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="px-8 py-4 bg-primary text-[#111111] font-bold tracking-widest uppercase text-sm rounded-full"
                >
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/30 via-primary to-primary/30 origin-left z-50"
        style={{ scaleX }}
      />
    </header>
  );
}
