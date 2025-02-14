/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiSendPlaneFill } from 'react-icons/ri';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mqaeykdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error'); 
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyber-blue via-neon-purple to-cyber-green bg-clip-text text-transparent">
              Get in Touch
            </span>
          </motion.h2>
          <motion.p
            className="text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a question or want to work together? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {[
              {
                icon: RiMailLine,
                title: "Email Us",
                content: "yesshuzaifa@gmail.com",
                link: "mailto:yesshuzaifa@gmail.com"
              },
              {
                icon: RiPhoneLine,
                title: "Call Us",
                content: "+92 (346) 203-7714",
                link: "tel:+03462037714"
              },
              {
                icon: RiMapPinLine,
                title: "Visit Us",
                content: "GIAIC Street, Karachi City, TC 12345",
                link: "#"
              }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="flex items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyber-blue to-neon-purple flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <item.icon className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.content}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name', required: true },
                { name: 'email', type: 'email', placeholder: 'Your Email', required: true },
                { name: 'subject', type: 'text', placeholder: 'Subject', required: true }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyber-blue transition-colors"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <textarea
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyber-blue transition-colors resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-cyber-blue to-neon-purple text-white font-semibold hover:shadow-[0_0_20px_rgba(0,246,255,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <RiSendPlaneFill className="text-xl" />
                  </>
                )}
              </motion.button>

              {/* Success/Error Message */}
              <AnimatePresence>
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`text-center p-4 rounded-xl ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {submitStatus === 'success' 
                      ? 'Message sent successfully!' 
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 