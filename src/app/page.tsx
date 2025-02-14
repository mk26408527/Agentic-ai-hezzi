"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import AIChatbot from "@/components/AIChatbot";
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import HowItWorks from '@/components/HowItWorks';
import AgentiaWorld from '@/components/AgentiaWorld';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with proper types
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF function with proper type
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    // Sync lenis scroll position with ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Set up the animation loop with proper type
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    requestAnimationFrame(raf);

    // Handle anchor links with proper types
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -100,
            duration: 1.5,
            easing: (t: number) => 1 - Math.pow(1 - t, 5),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <AgentiaWorld />
      <div id="pricing">
        <Pricing />
      </div>
      <HowItWorks />
      <div id="faq">
        <FAQ />
      </div>
      <AIChatbot />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
} 