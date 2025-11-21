"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eye, ScanEye, Glasses, Wrench, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "Precision Diagnostics",
    desc: "Advanced mapping of your eyesight with absolute digital accuracy.",
    icon: <ScanEye className="w-10 h-10" />,
  },
  {
    title: "Bespoke Lens Fitting",
    desc: "Lenses crafted to your exact biometrics for a natural viewing experience.",
    icon: <Eye className="w-10 h-10" />,
  },
  {
    title: "Frame Styling",
    desc: "Curated frames that harmonize with your face shape and personal aesthetic.",
    icon: <Glasses className="w-10 h-10" />,
  },
  {
    title: "Technical Repairs",
    desc: "Meticulous adjustments to restore your eyewear to factory precision.",
    icon: <Wrench className="w-10 h-10" />,
  },
];

export default function OurServices() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for background elements
  const redBlobRef = useRef<HTMLDivElement | null>(null);
  const grayBlobRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // --- 1. Background Ambient Animation ---
    // Move the Red Blob slowly
    gsap.to(redBlobRef.current, {
      x: "20%",
      y: "30%",
      rotation: 90,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Move the Gray Blob slowly in opposition
    gsap.to(grayBlobRef.current, {
      x: "-20%",
      y: "-20%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // --- 2. Header Reveal ---
    gsap.from(headerRef.current, {
      y: 80,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // --- 3. Cards Staggered Entry ---
    gsap.from(cardRefs.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      y: -12,
      boxShadow: "0 20px 40px -10px rgba(220, 38, 38, 0.15)",
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });

    const icon = card.querySelector(".service-icon");
    gsap.to(icon, { color: "#dc2626", scale: 1.1, duration: 0.3 });

    const arrow = card.querySelector(".action-arrow");
    gsap.to(arrow, { x: 5, opacity: 1, color: "#dc2626", duration: 0.3 });
    
    const border = card.querySelector(".accent-border");
    gsap.to(border, { width: "100%", duration: 0.4, ease: "expo.out" });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      boxShadow: "none",
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    const icon = card.querySelector(".service-icon");
    gsap.to(icon, { color: "#ffffff", scale: 1, duration: 0.3 });

    const arrow = card.querySelector(".action-arrow");
    gsap.to(arrow, { x: 0, opacity: 0.5, color: "#ffffff", duration: 0.3 });
    
    const border = card.querySelector(".accent-border");
    gsap.to(border, { width: "0%", duration: 0.4, ease: "expo.out" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-6 py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. Technical Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
           style={{
             backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }}
      />
      
      {/* 2. Animated Optical Flares */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Red Flare (Top Right) */}
        <div 
          ref={redBlobRef}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-red-600 opacity-[0.07] blur-[80px]"
        />
        {/* Gray/Slate Flare (Bottom Left) */}
        <div 
          ref={grayBlobRef}
          className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-slate-800 opacity-[0.05] blur-[80px]"
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="mb-20 border-l-4 border-red-600 pl-8">
          <h4 className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2">
            Our Expertise
          </h4>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase text-slate-950">
            Optical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-500">
              Excellence
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group relative bg-slate-950 text-white p-8 h-[400px] flex flex-col justify-between rounded-sm cursor-pointer overflow-hidden shadow-xl"
            >
              <div className="accent-border absolute bottom-0 left-0 h-1.5 bg-red-600 w-0" />

              <div className="relative z-10">
                <div className="service-icon text-white mb-8 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  0{i + 1}
                </span>
                <ArrowRight className="action-arrow w-5 h-5 text-slate-500 opacity-50" />
              </div>
              
              {/* Subtle Gradient inside the card for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}