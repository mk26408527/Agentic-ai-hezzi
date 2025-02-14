/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  {
    url: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    title: "AI Innovation Lab",
    description: "Where future technologies come to life",
  },
  {
    url: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    title: "Digital Transformation",
    description: "Reshaping the digital landscape",
  },
  {
    url: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg",
    title: "Future Solutions",
    description: "Building tomorrow's technology today",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Handle swipe gestures
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;

    if (Math.abs(velocity.x) > 500 || Math.abs(swipe) > 100) {
      if (swipe < 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  return (
    <section className="relative w-full h-[60vh] overflow-hidden bg-black">
      {/* Main Slider */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              fill
              className="object-cover"
              onClick={() => {
                setLightboxIndex(currentIndex);
                setShowLightbox(true);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            
            {/* Content Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-8 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyber-blue to-neon-purple bg-clip-text text-transparent">
                {images[currentIndex].title}
              </h3>
              <p className="text-white/80">{images[currentIndex].description}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-cyber-blue" : "bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              className="relative w-[90vw] h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].title}
                fill
                className="object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={() => setShowLightbox(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageSlider; 