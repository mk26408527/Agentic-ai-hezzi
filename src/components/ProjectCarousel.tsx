"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Modern Interior Design",
    button: "View Project",
    src: "/project1.jpg",
    description: "Crafting elegant spaces with innovative design solutions",
  },
  {
    title: "Portfolio System",
    button: "Explore More",
    src: "/project2.jpg",
    description: "Dynamic portfolio showcase platform with modern aesthetics",
  },
  {
    title: "Resume Builder",
    button: "Try Now",
    src: "/project3.jpg",
    description: "AI-powered resume creation and optimization tool",
  },
  {
    title: "Cafe Website",
    button: "Visit Site",
    src: "/project4.jpg",
    description: "Interactive cafe management and ordering system",
  },
];

interface SlideProps {
  slide: typeof projects[0];
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform: current === index
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none",
          }}
        >
          <Image
            className="absolute inset-0 w-[120%] h-[120%] object-cover transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={slide.title}
            src={slide.src}
            fill
            priority
          />
          {current === index && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold relative mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyber-blue via-neon-purple to-cyber-green bg-clip-text text-transparent">
              {slide.title}
            </span>
          </motion.h2>
          <motion.p
            className="text-white/80 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {slide.description}
          </motion.p>
          <motion.button 
            className="px-8 py-3 bg-gradient-to-r from-cyber-blue to-neon-purple rounded-full text-white font-semibold hover:shadow-[0_0_20px_rgba(0,246,255,0.3)] transition-all duration-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {slide.button}
          </motion.button>
        </article>
      </li>
    </div>
  );
};

export function ProjectCarousel() {
  const [current, setCurrent] = useState(0);

  const handlePrevious = () => {
    setCurrent(prev => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % projects.length);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  return (
    <section className="relative min-h-screen bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-transparent to-neon-purple/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative w-[70vmin] h-[70vmin] mx-auto">
        <ul
          className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / projects.length)}%)`,
          }}
        >
          {projects.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>

        {/* Navigation Controls */}
        <div className="absolute flex justify-center w-full top-[calc(100%+2rem)] gap-4">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === current 
                  ? "bg-cyber-blue shadow-[0_0_10px_rgba(0,246,255,0.5)]" 
                  : "bg-white/20"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSlideClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectCarousel; 