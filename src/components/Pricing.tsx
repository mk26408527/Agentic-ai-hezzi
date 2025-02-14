"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const pricingPlans = [
  {
    name: "Basic Agent",
    price: "49",
    description: "Perfect for exploring AI agent capabilities",
    features: [
      "Single AI Agent Deployment",
      "Basic Learning Capabilities",
      "Standard Environment Access",
      "8 Hours Monthly Runtime",
      "Email Support",
      "Basic Analytics Dashboard"
    ],
    gradient: "from-[#FF6B6B] to-[#4ECDC4]"
  },
  {
    name: "Pro Agent",
    price: "149",
    description: "Ideal for businesses seeking advanced AI solutions",
    features: [
      "Multi-Agent System (Up to 5)",
      "Advanced Learning Algorithms",
      "Custom Environment Creation",
      "40 Hours Monthly Runtime",
      "Priority Support 24/7",
      "Advanced Analytics & Reporting"
    ],
    gradient: "from-[#6C63FF] to-[#3F3D56]",
    popular: true
  },
  {
    name: "Enterprise",
    price: "499",
    description: "Full-scale AI agent ecosystem for large organizations",
    features: [
      "Unlimited Agent Deployment",
      "Custom Learning Models",
      "Multiple Environment Support",
      "Unlimited Runtime",
      "Dedicated Support Team",
      "Enterprise Analytics Suite"
    ],
    gradient: "from-[#4ECDC4] to-[#556270]"
  }
];

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
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
              Pricing Plans
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/60 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose a plan that suits your needs. Flexible pricing and premium features to empower your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden
                ${plan.popular ? 'bg-gradient-to-b from-cyber-blue/10 to-neon-purple/10' : 'bg-black/30'}`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-sm bg-cyber-green/20 text-cyber-green rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/80">
                        <svg
                          className="w-5 h-5 mr-3 text-cyber-blue"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-4 px-8 rounded-xl text-white font-semibold transition-all
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-cyber-blue to-neon-purple hover:shadow-[0_0_20px_rgba(0,246,255,0.3)]'
                        : 'bg-white/10 hover:bg-white/20'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-neon-purple/5" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing; 