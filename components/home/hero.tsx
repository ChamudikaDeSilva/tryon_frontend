"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const [isMounted, setIsMounted] = useState(false); // CLIENT ONLY
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true); // ensures random blobs only render on client
    setTimeout(() => setIsLoaded(true), 200);

    // GSAP intro timeline
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(heroRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        imgRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        textRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        imgRef.current,
        {
          y: -12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          duration: 3,
        },
        "+=0.3"
      );

    // Scroll-triggered zoom and blur
    gsap.to(heroRef.current, {
      scale: 1.03,
      filter: "blur(1px)",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const handleMouseMove = (e: any) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-br from-white via-[#eef3ff] to-[#e6ecf9] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Backlight glow */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full bg-white/40 blur-[200px]"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Multi-layer parallax blobs */}
      <motion.div
        className="absolute w-[650px] h-[650px] rounded-full bg-blue-300/20 blur-[180px] -top-32 -left-40"
        style={{ x: rotateY, y: rotateX }}
      />
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full bg-purple-300/20 blur-[160px] bottom-0 -right-32"
        style={{ x: rotateY, y: rotateX }}
      />

      {/* CLIENT ONLY: randomized side blobs and particles */}
      {isMounted && (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-pink-300/20 blur-[120px] top-10 -left-32"
            animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full bg-green-300/20 blur-[140px] bottom-20 -right-36"
            animate={{ x: [10, -10, 10], y: [5, -5, 5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {[...Array(15)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -8, 0],
                x: [0, 5, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Background word */}
      <motion.h1
        className="absolute text-[230px] font-extrabold text-black/5 tracking-tighter select-none top-10"
        style={{ x: rotateY }}
      >
        OPTICS
      </motion.h1>

      {/* Glass image */}
      <motion.div style={{ rotateX, rotateY }} className="relative z-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-xl rounded-xl pointer-events-none"
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />

        <img
          ref={imgRef}
          src="/image/hero-glass.png"
          className="w-[520px] drop-shadow-2xl relative z-20"
        />

        <motion.div
          className="absolute top-1/2 w-[420px] h-[140px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-2xl z-30"
          animate={{ x: [-420, 420] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        />
      </motion.div>

      {/* Text + CTA */}
      <div ref={textRef} className="absolute bottom-28 text-center z-40">
        <h1 className="text-6xl font-semibold tracking-tight text-neutral-900">
          Crystal Clear Vision
        </h1>
        <p className="mt-3 text-xl text-neutral-700">
          Premium eyewear for every style. Experience clarity.
        </p>
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 px-10 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-800 transition"
        >
          Shop Collection
        </motion.button>
      </div>
    </section>
  );
}
