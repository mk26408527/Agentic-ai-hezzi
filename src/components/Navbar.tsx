"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Services", href: "#services" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const menuVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeInOut"
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeInOut"
    }
  }
};

const menuItemVariants = {
  closed: {
    x: 50,
    opacity: 0
  },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

// Add this close button variant
const closeButtonVariants = {
  closed: {
    opacity: 0,
    rotate: -180,
  },
  open: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: 0.2
    }
  }
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY, isMobileMenuOpen]);

  const handleScroll = useCallback(() => {
    const sections = navItems.map(item => item.name.toLowerCase());
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let ticking = false;

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            controlNavbar();
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [controlNavbar, handleScroll]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed w-full z-50 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto backdrop-blur-lg bg-black/30 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#home');
                }}
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
              >
                Agentia World
              </motion.a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="relative text-white/80 hover:text-white transition-colors"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className={`absolute inset-0 bg-white/5 rounded-lg -z-10 ${
                        activeSection === item.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                      }`}
                      whileHover={{ scale: 1.2, opacity: 1 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2 relative z-50"
              >
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {isMobileMenuOpen ? (
                    <RiCloseLine className="text-2xl" />
                  ) : (
                    <RiMenu4Line className="text-2xl" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence mode="wait">
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu */}
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed top-0 right-0 bottom-0 w-[300px] bg-black/95 backdrop-blur-lg z-40 md:hidden border-l border-white/10"
                >
                  {/* Add Close Button */}
                  <motion.button
                    variants={closeButtonVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 p-2"
                  >
                    <RiCloseLine className="text-2xl text-white" />
                  </motion.button>

                  {/* Menu Title */}
                  <motion.div 
                    className="absolute top-8 left-8"
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    custom={0}
                  >
                  </motion.div>

                  <div className="flex flex-col items-start justify-center h-full px-8 gap-8">
                    {navItems.map((item, i) => (
                      <motion.a
                        key={item.name}
                        custom={i + 1} // Offset by 1 to account for the MENU title
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.href);
                        }}
                        className={`text-2xl font-semibold transition-colors relative group ${
                          activeSection === item.name.toLowerCase()
                            ? 'text-cyber-blue'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <motion.div
                          className="absolute -inset-x-4 inset-y-0 bg-white/5 rounded-lg -z-10 opacity-0 group-hover:opacity-100"
                          layoutId={`menu-hover-${item.name}`}
                        />
                        {activeSection === item.name.toLowerCase() && (
                          <motion.div
                            className="absolute left-0 -bottom-1 h-0.5 bg-cyber-blue"
                            layoutId="menu-active"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar; 