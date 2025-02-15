"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import HowItWorks from '@/components/HowItWorks';
import AgentiaWorld from '@/components/AgentiaWorld';

export default function Home() {
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
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
} 