"use client";

import { useRef, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // --- MOUSE & PARALLAX LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalized -1 to 1
    const xVal = (clientX / innerWidth - 0.5) * 2;
    const yVal = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springConfig);
  const moveX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig);

  // --- GSAP ENTRY ---
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Text Stagger
    tl.fromTo(".hero-char", 
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: "power4.out" }
    );

    // 2. Image Reveal
    tl.fromTo(imgRef.current,
      { scale: 0.9, opacity: 0, filter: "blur(10px)", y: 50 },
      { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "expo.out" },
      "-=1.0"
    );

    // 3. UI Fade In
    tl.fromTo(".hero-ui",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[95vh] flex items-center justify-center bg-slate-50 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* --- 1. BACKGROUND ATMOSPHERE --- */}
      
      {/* Cinematic Grain Overlay (Adds texture to plain color) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-multiply"
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
      />

      {/* Moving "Aurora" Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -50, 0], 
          y: [0, 50, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-slate-300/40 rounded-full blur-[100px] pointer-events-none"
      />


      {/* --- 2. MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT: Typography & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-10 lg:pt-0">
          
          <div className="hero-ui flex items-center gap-3 mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-slate-500 font-medium tracking-widest text-xs uppercase">
              New Collection 2024
            </span>
          </div>

          {/* Animated Headline */}
          <div className="relative font-bold text-slate-950 leading-[0.9] tracking-tighter mb-8 overflow-hidden">
             <div className="flex flex-wrap gap-x-4 lg:gap-x-8">
                {"PURE VISION".split(" ").map((word, i) => (
                  <div key={i} className="flex overflow-hidden">
                    {word.split("").map((char, j) => (
                       <span key={j} className="hero-char inline-block text-7xl md:text-9xl lg:text-[140px]">
                         {char}
                       </span>
                    ))}
                  </div>
                ))}
             </div>
          </div>

          <div className="hero-ui max-w-lg">
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Engineered for those who see the world differently. 
              Merging Swiss precision with avant-garde aesthetics.
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-6">
              <MagneticButton>
                <button className="relative px-8 py-4 bg-slate-950 text-white overflow-hidden rounded-full group">
                  <div className="absolute inset-0 w-full h-full bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative flex items-center gap-3">
                    <span className="font-bold tracking-wide text-sm uppercase">Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </MagneticButton>

              <button className="group flex items-center gap-3 text-slate-950 font-semibold uppercase text-sm tracking-wider hover:text-red-600 transition-colors">
                <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center group-hover:border-red-600 transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                </div>
                <span>Watch Film</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Product Showcase */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] flex items-center justify-center">
          
          {/* Interactive 3D Container */}
          <motion.div
            style={{ rotateX, rotateY, x: moveX }}
            className="relative z-20 w-full max-w-[500px]"
          >
            {/* Back Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-white to-slate-200 rounded-full blur-2xl opacity-60" />

            {/* Product Image */}
            <img
              ref={imgRef}
              src="/image/hero-glass.png" 
              alt="Modern Eyewear"
              className="relative z-10 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transform transition-transform"
            />

            {/* SCANNING LINE EFFECT */}
            <motion.div 
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent z-30 opacity-70"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute left-0 right-0 h-[40px] bg-gradient-to-b from-red-500/0 via-red-500/5 to-red-500/0 z-20 pointer-events-none"
              animate={{ top: ["-5%", "95%", "-5%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Glass Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// --- Helper Component: Magnetic Button ---
// Pulls the button slightly towards the mouse
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}