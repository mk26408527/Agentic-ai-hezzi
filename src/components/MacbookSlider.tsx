"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    url: "/project1.jpg", // Interior design studio image
    title: "Modern Interior Design Studio",
    description: "Crafting elegant spaces with innovative design solutions",
    category: "UI/UX Design",
  },
  {
    url: "/project2.jpg", // Portfolio presentation image
    title: "Portfolio Presentation System",
    description: "Dynamic portfolio showcase platform with modern aesthetics",
    category: "Web Development",
  },
  {
    url: "/project3.jpg", // Resume design image
    title: "Professional Resume Builder",
    description: "AI-powered resume creation and optimization tool",
    category: "AI Solution",
  },
  {
    url: "/project4.jpg", // Cafe website image
    title: "Hello Cafe Website",
    description: "Interactive cafe management and ordering system",
    category: "Full Stack Development",
  },
];

const MacbookSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={ref} className="min-h-[200vh] bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-transparent to-neon-purple/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
      </div>

      <div className="flex flex-col items-center py-20 md:py-40">
        {/* Project Title and Category */}
        <motion.div
          style={{
            translateY: textTransform,
            opacity: textOpacity,
          }}
          className="text-center mb-20"
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-4">
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
              {projects[activeProject].title}
            </motion.span>
          </motion.h2>
          <motion.span
            className="text-xl text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {projects[activeProject].category}
          </motion.span>
        </motion.div>

        {/* MacBook Display */}
        <div className="relative [perspective:800px] scale-[0.35] sm:scale-50 md:scale-100">
          {/* Lid */}
          <div className="relative [perspective:800px]">
            <div
              style={{
                transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
                transformOrigin: "bottom",
                transformStyle: "preserve-3d",
              }}
              className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
            >
              <div
                style={{
                  boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
                }}
                className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
              >
                <span className="text-white text-xl font-bold">Agentia World</span>
              </div>
            </div>

            <motion.div
              style={{
                scaleX: scaleX,
                scaleY: scaleY,
                rotateX: rotate,
                translateY: translate,
                transformStyle: "preserve-3d",
                transformOrigin: "top",
              }}
              className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
            >
              <motion.div 
                className="absolute inset-0 bg-[#272729] rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={projects[activeProject].url}
                  alt={projects[activeProject].title}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Base */}
          <div className="h-[22rem] w-[32rem] bg-[#010101] rounded-2xl relative -z-10">
            <div 
              className="absolute inset-x-0 mx-auto w-[40%] h-32 bottom-8 rounded-xl"
              style={{
                boxShadow: "0px 0px 1px 1px #ffffff20 inset",
              }}
            />
          </div>
        </div>

        {/* Project Navigation */}
        <motion.div 
          className="flex gap-4 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeProject 
                  ? "bg-cyber-blue shadow-[0_0_10px_rgba(0,246,255,0.5)]" 
                  : "bg-white/20"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveProject(index)}
            />
          ))}
        </motion.div>

        {/* Project Description */}
        <motion.p
          className="text-white/70 text-center mt-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {projects[activeProject].description}
        </motion.p>
      </div>
    </section>
  );
};

export default MacbookSlider; 