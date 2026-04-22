import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Founders } from "@/components/sections/Founders";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 selection:text-[#111111]">
      <CustomCursor />
      <ParallaxBackground />
      <Navbar />
      
      <Hero />
      <About />
      <Founders />
      <Projects />
      <Services />
      <Contact />
      
      <Footer />
    </main>
  );
}
