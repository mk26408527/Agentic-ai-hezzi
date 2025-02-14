"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiAiGenerate, RiBrainLine, RiTeamLine, RiFlowChart } from 'react-icons/ri';
import { fadeInUpAnimation, fadeInLeftAnimation, fadeInRightAnimation, scaleAnimation } from "@/utils/scrollAnimations";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: RiAiGenerate,
    title: "Autonomous Agents",
    description: "Our AI agents operate independently, making decisions and performing tasks with minimal human intervention.",
    gradient: "from-[#FF6B6B] to-[#4ECDC4]"
  },
  {
    icon: RiBrainLine,
    title: "Advanced Learning",
    description: "Agents continuously learn and adapt through reinforcement learning and real-world interactions.",
    gradient: "from-[#6C63FF] to-[#3F3D56]"
  },
  {
    icon: RiTeamLine,
    title: "Multi-Agent Collaboration",
    description: "Agents work together in teams, sharing information and coordinating actions to achieve complex goals.",
    gradient: "from-[#A8E6CF] to-[#3D84A8]"
  },
  {
    icon: RiFlowChart,
    title: "Dynamic Environments",
    description: "Our agents operate in adaptable virtual environments that simulate real-world scenarios.",
    gradient: "from-[#FFD93D] to-[#FF6B6B]"
  }
];

const AgentiaWorld = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(".agentia-title", fadeInLeftAnimation(".agentia-title"));
      gsap.from(".agentia-description", fadeInRightAnimation(".agentia-description", 0.3));
      
      // Why Agentia World animations
      gsap.from(".why-agentia", fadeInRightAnimation(".why-agentia", 0.5));
      
      // Feature cards stagger animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.6,
          from: "start"
        }
      });

      // Technical specs animation
      gsap.from(".tech-spec", {
        scrollTrigger: {
          trigger: ".tech-specs",
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.4,
          from: "center"
        }
      });

      // Parallax background effect
      gsap.to(".grid-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        y: "20%"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="agentia-world"
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(108,99,255,0.1),transparent_70%)]" />
        {/* Added cyberpunk grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(108,99,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(108,99,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="grid-bg absolute inset-0 bg-[linear-gradient(...)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header with Different Style */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative agentia-title"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">
                <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyber-blue to-cyber-green" />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  Agentia World
                </span>
              </h2>
              <div className="w-full h-40 md:h-60 rounded-2xl bg-gradient-to-r from-cyber-blue to-cyber-green p-0.5">
                <div className="w-full h-full rounded-[14px] bg-black/90 flex items-center justify-center p-6">
                  <p className="text-white/80 text-lg agentia-description">
                    A revolutionary ecosystem where AI agents collaborate, learn, and evolve to shape the future of autonomous systems.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="why-agentia md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-2xl blur-lg opacity-50" />
              <div className="relative bg-black/90 rounded-xl p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Why Agentia World?</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-cyber-blue" />
                    <span>Advanced AI agents working in harmony</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-cyber-green" />
                    <span>Real-time learning and adaptation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-neon-purple" />
                    <span>Secure and controlled environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid with Enhanced Style */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative p-8 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-lg overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${feature.gradient.split('from-')[1].split(' ')[0]}, ${feature.gradient.split('to-')[1]})`
                  }}
                />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-[10px] bg-black/90 flex items-center justify-center">
                      <feature.icon className="text-3xl text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>

                  {/* Added feature details */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/40 text-sm">
                      Powered by advanced {feature.title.toLowerCase()} technology
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Added Technical Specs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="tech-specs mt-20 p-6 rounded-2xl bg-black/50 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-cyber-blue font-bold mb-2">Processing Power</h4>
              <p className="text-white/60">Advanced neural networks with distributed computing</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-cyber-green font-bold mb-2">Learning Capacity</h4>
              <p className="text-white/60">Continuous improvement through reinforcement learning</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-neon-purple font-bold mb-2">Security Protocol</h4>
              <p className="text-white/60">Multi-layer encryption and safety measures</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentiaWorld; 