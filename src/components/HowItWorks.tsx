"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiLightbulbLine, RiRocketLine, RiCodeBoxLine, RiCheckboxCircleLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: RiLightbulbLine,
    title: "Discovery",
    description: "We analyze your needs and develop a comprehensive project strategy.",
    gradient: "from-[#FF6B6B] to-[#4ECDC4]"
  },
  {
    icon: RiCodeBoxLine,
    title: "Development",
    description: "Our team brings your vision to life using cutting-edge technologies.",
    gradient: "from-[#6C63FF] to-[#3F3D56]"
  },
  {
    icon: RiCheckboxCircleLine,
    title: "Testing",
    description: "Rigorous quality assurance to ensure perfect functionality.",
    gradient: "from-[#A8E6CF] to-[#3D84A8]"
  },
  {
    icon: RiRocketLine,
    title: "Launch",
    description: "Deployment and continuous support for your success.",
    gradient: "from-[#FFD93D] to-[#FF6B6B]"
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(108,99,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-cyber-blue via-neon-purple to-cyber-green bg-clip-text text-transparent">
              How It Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Our streamlined process ensures efficient delivery of your digital solutions
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue to-cyber-green hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="step-card relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}>
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="relative p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-lg group hover:bg-white/5 transition-colors duration-300">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.gradient} p-0.5 mb-6 mx-auto md:mx-0 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        <div className="w-full h-full rounded-[10px] bg-black/90 flex items-center justify-center">
                          <step.icon className="text-3xl text-white" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-white/60">{step.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden md:block w-8 h-8 rounded-full bg-cyber-blue absolute left-[50%] transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-cyber-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 