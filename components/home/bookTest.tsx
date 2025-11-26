'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BookTestCTA() {
  const svgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations for SVG elements
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    svgRefs.current.forEach((svg, index) => {
      if (svg) {
        tl.to(svg, {
          duration: 2 + index * 0.5,
          x: Math.random() * 40 - 20,
          y: Math.random() * 40 - 20,
          rotation: Math.random() * 10 - 5,
          ease: "sine.inOut",
        }, index * 0.2);
      }
    });

    // Floating animation for main image
    gsap.to(".floating-image", {
      duration: 3,
      y: -20,
      rotation: 1,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Background pulse effect
    gsap.to(".pulse-bg", {
      duration: 4,
      scale: 1.05,
      opacity: 0.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    return () => {
      tl.kill();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !svgRefs.current.includes(el)) {
      svgRefs.current.push(el);
    }
  };

  return (
    <section className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-white overflow-hidden">
      
      {/* Hero Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* SVG Elements as actual images */}
        <div 
          ref={addToRefs}
          className="absolute top-1/4 left-10 w-20 h-20 opacity-15 pulse-bg"
        >
          <Image
            src="/image/svgs/g1.svg"
            alt="Decoration"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        <div 
          ref={addToRefs}
          className="absolute top-1/3 right-20 w-16 h-16 opacity-10"
        >
          <Image
            src="/image/svgs/g2.svg"
            alt="Decoration"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
        <div 
          ref={addToRefs}
          className="absolute bottom-1/4 left-20 w-24 h-24 opacity-20"
        >
          <Image
            src="/image/svgs/g3.svg"
            alt="Decoration"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <div 
          ref={addToRefs}
          className="absolute bottom-1/3 right-32 w-12 h-12 opacity-10"
        >
          <Image
            src="/image/svgs/g4.svg"
            alt="Decoration"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/3 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/95"></div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-16 lg:gap-20">
          
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-red-600 text-sm font-medium uppercase tracking-wider">
                Premium Eye Care
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase text-slate-950">
              SEE LIFE{' '}
              <span className="relative inline-block">
                <span className="px-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-500">CLEARLY</span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-red-600/20"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0,5 Q25,0 50,5 T100,5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-lg">
              Experience precision eye testing with cutting-edge technology and expert optometrists. 
              Your vision deserves the best care.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {['Advanced Digital Testing', 'Expert Optometrists', 'Quick Results', 'Comfortable Experience'].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/book-test"
                className="group relative bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg tracking-wide hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Book Your Test Now</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              
              <Link
                href="/services"
                className="group border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg tracking-wide hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative floating-image">
              <div className="absolute -inset-4 bg-gradient-to-br from-red-600/10 to-transparent rounded-2xl blur-xl"></div>
              <Image
                src="/image/hero/h-new-3.jpg"
                alt="Modern Eye Test"
                width={600}
                height={600}
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover border-8 border-white"
                priority
              />
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-950">99%</div>
                  <div className="text-xs text-slate-600">Accuracy Rate</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-950">15min</div>
                  <div className="text-xs text-slate-600">Average Test</div>
                </div>
              </motion.div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-red-600/3 rounded-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}