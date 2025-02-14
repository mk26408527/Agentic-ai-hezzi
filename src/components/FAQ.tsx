"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiQuestionLine, RiAddLine, RiSubtractLine } from 'react-icons/ri';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Agentia World?",
    answer: "Agentia World is a cutting-edge AI technology company specializing in developing advanced artificial intelligence solutions for businesses and individuals."
  },
  {
    question: "What services do you offer?",
    answer: "We offer AI-powered solutions including chatbots, data analysis, machine learning models, and custom AI development tailored to your specific needs."
  },
  {
    question: "How can AI benefit my business?",
    answer: "AI can automate tasks, provide insights from data, improve customer service, and enhance decision-making processes, leading to increased efficiency and growth."
  },
  {
    question: "Is my data secure with your AI solutions?",
    answer: "Yes, we prioritize data security and privacy. All our AI solutions comply with industry standards and regulations for data protection."
  },
  {
    question: "Do you offer custom AI solutions?",
    answer: "Yes, we work closely with clients to develop customized AI solutions that address their specific challenges and requirements."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyber-blue to-neon-purple flex items-center justify-center"
          >
            <RiQuestionLine className="text-3xl text-white" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-neon-purple bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Get answers to common questions about our AI solutions
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
            >
              <motion.button
                className="w-full p-4 flex items-center justify-between text-left bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="font-medium text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-cyber-blue"
                >
                  {activeIndex === index ? (
                    <RiSubtractLine className="text-xl" />
                  ) : (
                    <RiAddLine className="text-xl" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-gray-400 bg-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 