import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] py-16 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-6 h-6 opacity-70 grayscale">
              <Image 
                src="/images/logo.png" 
                alt="Abhinavan Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif font-bold text-xl tracking-[0.2em] uppercase">ABHINAVAN</span>
          </Link>
          <p className="text-xs tracking-widest uppercase text-foreground/40 text-center md:text-left">
            Engineering Adaptive Intelligence.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground/40 hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-foreground/40 hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:team.abhinavan@gmail.com" className="text-foreground/40 hover:text-primary transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between text-[10px] tracking-widest uppercase text-foreground/30">
        <span>&copy; {currentYear} Abhinavan. All rights reserved.</span>
        <span className="mt-4 md:mt-0">Designed for the Future</span>
      </div>
    </footer>
  );
}
