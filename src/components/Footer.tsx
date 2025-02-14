"use client";

import { motion } from 'framer-motion';
import { RiTwitterXFill, RiGithubFill, RiLinkedinBoxFill, RiDiscordFill } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,_rgba(0,246,255,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-neon-purple bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Agentia World
            </motion.h3>
            <motion.p 
              className="text-white/60 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Shaping the future through innovative AI solutions and cutting-edge technology.
            </motion.p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: RiTwitterXFill, href: "#" },
                { icon: RiGithubFill, href: "#" },
                { icon: RiLinkedinBoxFill, href: "#" },
                { icon: RiDiscordFill, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-cyber-blue transition-colors border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {[
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Press"],
            },
            {
              title: "Resources",
              links: ["Blog", "Newsletter", "Events", "Help Center"],
            },
          ].map((section, index) => (
            <div key={index}>
              <motion.h4 
                className="text-lg font-semibold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {section.title}
              </motion.h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + linkIndex * 0.1 }}
                  >
                    <a 
                      href="#" 
                      className="text-white/60 hover:text-cyber-blue transition-colors"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-white/60 text-sm">
            © {currentYear} Agentia World. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-cyber-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-cyber-blue transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-cyber-blue transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 