/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staticPositions } from '@/utils/staticPositions';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // State to show/hide the popup video
  const [showVideo, setShowVideo] = useState(false);

  const [showPortal, setShowPortal] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".hero-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none none",
          },
        }
      );

      // Particle animations
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const position = staticPositions[index % staticPositions.length];
        
        gsap.set(particle, {
          left: position.left,
          top: position.top,
        });

        gsap.to(particle, {
          duration: gsap.utils.random(2, 4),
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!portalRef.current || !showPortal) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    portalRef.current.appendChild(renderer.domElement);

    // Create portal geometry
    const portalGeometry = new THREE.TorusGeometry(5, 0.5, 16, 100);
    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          vec3 color = vec3(0.0, 0.96, 1.0) * (1.0 - dist) * pulse;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    scene.add(portal);
    camera.position.z = 10;

    // Animation
    const animate = (time?: number) => {
      const currentTime = time ? time * 0.001 : performance.now() * 0.001;
      portalMaterial.uniforms.time.value = currentTime;
      portal.rotation.z += 0.01;
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Portal opening animation
    gsap.to(portal.scale, {
      x: 1.5,
      y: 1.5,
      duration: 1,
      ease: "power2.out"
    });

    // Cleanup function
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      portalGeometry.dispose();
      portalMaterial.dispose();
    };
  }, [showPortal]);

  const handleExplore = () => {
    setShowPortal(true);
    setTimeout(() => {
      const nextSection = document.getElementById('about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setShowPortal(false), 1000);
    }, 2000);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Only render particles on client side */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {staticPositions.map((_, index) => (
            <div
              key={index}
              className="particle absolute w-1 h-1 bg-white/30 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-50"
        >
          <source src="https://v1.pinimg.com/videos/iht/720p/5a/91/b0/5a91b06c21259963d0b7d9e80e8d288a.mp4" />
          {/* Fallback image if video fails to load */}
          <img
            src="https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg"
            alt="Cyberpunk background"
            className="object-cover w-full h-full"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          className="hero-title text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent inline-block"
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
            Welcome to
          </motion.span>
          <br />
          <motion.span
            className="text-white inline-block"
            animate={{
              x: [-1, 1, -1],
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Agentia World
          </motion.span>
        </motion.h1>

        <motion.p
          className="hero-title text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Step into the future of digital experiences where innovation meets
          imagination.
        </motion.p>

        {/* Explore Now Button */}
        <motion.button
          onClick={handleExplore}
          className="relative px-8 py-4 bg-transparent border-2 border-cyber-blue rounded-xl overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-white font-bold">Explore Now</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-neon-purple opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.button>
      </div>

      {/* Popup Video Modal with Animations */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            key="videoModal"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-[90%] max-w-3xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setShowVideo(false)}
              >
                ✖
              </button>

              {/* Your video named heroRef.mp4 */}
              <video controls autoPlay className="w-full h-auto rounded-lg">
                <source src="/heroRef.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal overlay */}
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div ref={portalRef} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
