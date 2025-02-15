"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Stats data
const stats = [
  { number: 100, label: "Projects Completed", icon: "🚀" },
  { number: 50, label: "AI Solutions Deployed", icon: "🤖" },
  { number: 25, label: "Team Members", icon: "👥" },
  { number: 95, label: "Client Satisfaction", icon: "⭐" },
];

// Define fixed positions for particles
const particlePositions = [
  { left: "9.72%", top: "25.63%" },
  { left: "54.67%", top: "53.77%" },
  { left: "22.14%", top: "20.06%" },
  { left: "36.49%", top: "26.39%" },
  { left: "37.70%", top: "72.69%" },
  { left: "4.64%", top: "97.81%" },
  { left: "26.07%", top: "91.34%" },
  { left: "30.53%", top: "50.86%" },
  { left: "4.62%", top: "58.22%" },
  { left: "30.04%", top: "16.31%" },
  { left: "54.33%", top: "96.17%" },
  { left: "25.71%", top: "53.22%" },
  { left: "13.68%", top: "8.06%" },
  { left: "1.78%", top: "36.76%" },
  { left: "17.06%", top: "16.99%" },
  { left: "29.31%", top: "65.50%" },
  { left: "37.68%", top: "60.21%" },
  { left: "43.92%", top: "7.76%" },
  { left: "87.07%", top: "16.25%" },
  { left: "18.29%", top: "18.42%" }
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen relative py-20 overflow-hidden bg-black"
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {isClient && particlePositions.map((position, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1"
            initial={{ left: position.left, top: position.top }}
            animate={{
              y: [-20, 20],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
              delay: index * 0.2,
            }}
          >
            <div className="absolute w-1 h-1 bg-cyber-blue rounded-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Heading with glitch effect */}
        <motion.h2
          className="about-text text-4xl md:text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="bg-gradient-to-r from-cyber-blue via-neon-purple to-cyber-green bg-clip-text text-transparent inline-block"
            animate={{
              textShadow: [
                "0 0 10px rgba(0,246,255,0.5)",
                "0 0 20px rgba(0,246,255,0.8)",
                "0 0 10px rgba(0,246,255,0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Who We Are
          </motion.span>
        </motion.h2>

        {/* Enhanced subheading with animated underline */}
        <motion.div
          className="about-text relative text-xl md:text-2xl text-center text-white/80 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Agentia World is a powerhouse of innovation, blending AI, Web3, and
            next-gen technology to reshape the digital landscape.
          </p>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-cyber-blue via-neon-purple to-cyber-green mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Description with animated background */}
        <motion.p
          className="about-text text-lg text-center text-white/70 mb-16 max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We are more than just a tech company – we are visionaries crafting
          intelligent digital experiences. From AI-driven automation to futuristic
          web solutions, we design, develop, and deliver impact.
        </motion.p>

        {/* Enhanced Stats Grid */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item relative group"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <div className="text-center p-6 rounded-2xl bg-black/30 backdrop-blur-lg border border-white/10 relative overflow-hidden">
                {/* Enhanced hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 via-neon-purple/10 to-cyber-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at center, rgba(0,246,255,0.15) 0%, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <motion.span
                  className="text-3xl mb-2 block relative z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {stat.icon}
                </motion.span>

                {/* Number */}
                <motion.span
                  className="block text-4xl font-bold bg-gradient-to-r from-cyber-blue to-neon-purple bg-clip-text text-transparent mb-2 relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2, delay: index * 0.1 }}
                >
                  {stat.number}+
                </motion.span>

                {/* Label */}
                <span className="text-white/70 relative z-10">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About; 