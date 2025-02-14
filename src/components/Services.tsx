"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiRobot2Line, RiShieldKeyholeLine, RiCodeLine, RiBarChart2Line, RiDatabase2Line, RiGlassesLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: RiCodeLine,
    title: "Website Development",
    description: "Custom website development with modern technologies like Next.js, React, and Tailwind CSS. Creating responsive and dynamic web experiences.",
    gradient: "from-[#FF6B6B] to-[#4ECDC4]"
  },
  {
    icon: RiRobot2Line,
    title: "AI Integration",
    description: "Seamlessly integrate AI chatbots and interactive features into your website to enhance user engagement and support.",
    gradient: "from-[#A8E6CF] to-[#3D84A8]"
  },
  {
    icon: RiBarChart2Line,
    title: "UI/UX Design",
    description: "Create stunning user interfaces with modern design trends, animations, and smooth user experiences using Framer Motion and GSAP.",
    gradient: "from-[#FFD93D] to-[#FF6B6B]"
  },
  {
    icon: RiDatabase2Line,
    title: "Performance Optimization",
    description: "Optimize your website for speed and performance, ensuring fast load times and smooth animations across all devices.",
    gradient: "from-[#6C63FF] to-[#3F3D56]"
  },
  {
    icon: RiShieldKeyholeLine,
    title: "API Integration",
    description: "Connect your website with various APIs and third-party services to add powerful functionality and real-time data.",
    gradient: "from-[#4ECDC4] to-[#556270]"
  },
  {
    icon: RiGlassesLine,
    title: "Responsive Design",
    description: "Ensure your website looks and functions perfectly across all devices - from mobile phones to large desktop screens.",
    gradient: "from-[#FF6B6B] to-[#556270]"
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 100,
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
      id="services"
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
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
              Our Services
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Professional web development services to bring your digital vision to life
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card group"
              role="listitem"
              aria-label={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-lg overflow-hidden h-full">
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${service.gradient.split('from-')[1].split(' ')[0]}, ${service.gradient.split('to-')[1]})`
                  }}
                />

                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-[10px] bg-black/90 flex items-center justify-center">
                      <service.icon className="text-3xl text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>

                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-2 rounded-lg bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 