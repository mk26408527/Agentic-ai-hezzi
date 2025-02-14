import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUpAnimation = (element: string, delay: number = 0) => ({
  scrollTrigger: {
    trigger: element,
    start: "top bottom-=100",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 100,
  duration: 1,
  delay,
});

export const fadeInLeftAnimation = (element: string, delay: number = 0) => ({
  scrollTrigger: {
    trigger: element,
    start: "top bottom-=100",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  x: -100,
  duration: 1,
  delay,
});

export const fadeInRightAnimation = (element: string, delay: number = 0) => ({
  scrollTrigger: {
    trigger: element,
    start: "top bottom-=100",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  x: 100,
  duration: 1,
  delay,
});

export const scaleAnimation = (element: string, delay: number = 0) => ({
  scrollTrigger: {
    trigger: element,
    start: "top bottom-=100",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  scale: 0.5,
  duration: 1,
  delay,
}); 