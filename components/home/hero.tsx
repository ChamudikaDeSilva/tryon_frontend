"use client";

import { useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Maximize2 } from "lucide-react";

// Register GSAP plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // --- 1. FIXED MOUSE LOGIC ---
  // We use useMotionValue instead of useState to avoid re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized position (-1 to 1)
    const xVal = (clientX / innerWidth - 0.5) * 2;
    const yVal = (clientY / innerHeight - 0.5) * 2;

    // Update the MotionValues directly
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  // Smooth spring animation linked to the MotionValues
  const springConfig = { damping: 25, stiffness: 150 };
  
  // Transformations for the Parallax Effect
  const x = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), springConfig);
  const y = useSpring(useTransform(mouseY, [-1, 1], [-40, 40]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), springConfig);

  // --- 2. GSAP INTRO ANIMATION ---
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Reveal Grid
    tl.fromTo(
      ".hero-grid",
      { opacity: 0 },
      { opacity: 0.4, duration: 1.5, ease: "power2.out" }
    );

    // Text Reveal (Blur + Slide up)
    tl.fromTo(
      ".hero-text-line",
      { y: 100, opacity: 0, filter: "blur(15px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out" 
      },
      "-=1"
    );

    // Image Reveal (Scale + Focus + Rotate)
    tl.fromTo(
      imgRef.current,
      { scale: 0.8, opacity: 0, filter: "blur(20px)", rotateZ: -5 },
      { 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)", 
        rotateZ: 0, 
        duration: 1.5, 
        ease: "expo.out" 
      },
      "-=1"
    );

    // Interface Elements (Red lines, buttons)
    tl.fromTo(
      ".hero-ui",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[95vh] flex items-center justify-center bg-white overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Technical Grid */}
      <div 
        className="hero-grid absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 2. Ambient Glow (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-gradient-to-b from-slate-100 to-transparent opacity-60 blur-3xl pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Eyebrow Tag */}
          <div className="hero-ui flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">
              Next Gen Optical
            </span>
          </div>

          {/* Massive Headline */}
          <div className="relative font-bold text-slate-950 leading-[0.9] tracking-tighter">
            <h1 className="hero-text-line text-7xl md:text-9xl lg:text-[160px]">
              PURE
            </h1>
            <h1 className="hero-text-line text-7xl md:text-9xl lg:text-[160px] relative z-20">
              VISION
            </h1>
            {/* Decorative transparent text behind */}
            <span className="absolute top-10 left-2 text-[200px] text-slate-100 opacity-50 -z-10 select-none pointer-events-none hidden lg:block">
              01
            </span>
          </div>

          {/* Subtext & CTA */}
          <div className="hero-ui mt-10 max-w-lg">
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 border-l-2 border-slate-200 pl-6">
              Experience the world in high definition. Precision engineering meets 
              contemporary aesthetics for uncompromised clarity.
            </p>
            
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-slate-950 text-white overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 w-full h-full bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <div className="relative flex items-center gap-3">
                  <span className="font-bold tracking-wider text-sm uppercase">Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>

              <button className="group flex items-center gap-2 text-slate-950 font-semibold uppercase text-sm tracking-wider hover:text-red-600 transition-colors">
                <Maximize2 className="w-4 h-4" />
                <span>Virtual Try-On</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Floating Image */}
        <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center">
          
          {/* Red Circle "Focus" Graphic behind image */}
          <motion.div 
            className="hero-ui absolute w-[400px] h-[400px] border border-red-600/20 rounded-full pointer-events-none"
            style={{ x, y }}
          >
             <div className="absolute inset-0 border border-slate-200 rounded-full scale-75" />
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600/10" />
             <div className="absolute top-0 left-1/2 h-full w-[1px] bg-red-600/10" />
          </motion.div>

          {/* The Product Image Container */}
          <motion.div
            style={{ 
              rotateX: rotateX, 
              rotateY: rotateY,
              // Inverse movement for depth (parallax)
              x: useTransform(x, value => value * -1), 
              y: useTransform(y, value => value * -1)
            }}
            className="relative z-30"
          >
            <img
              ref={imgRef}
              src="/image/hero-glass.png" 
              alt="Modern Eyewear"
              className="w-full max-w-[500px] drop-shadow-2xl object-contain"
            />

            {/* Glass Reflection Effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-30 rounded-full blur-xl pointer-events-none mix-blend-overlay" />
          </motion.div>
        </div>

      </div>

      {/* DECORATIVE: Scrolling Text at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-slate-100 bg-white py-4">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 opacity-30">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-950">Precision Optics</span>
              <div className="w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-950">Clarified Vision</span>
              <div className="w-2 h-2 bg-slate-300 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}