'use client';

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "Sunglass Alpha", image: "/image/glasses/sung01.png", price: "LKR 12,900" },
  { id: 2, name: "Vision Spex 01", image: "/image/glasses/spex01.png", price: "LKR 8,700" },
  { id: 3, name: "Sunglass Beta", image: "/image/glasses/sung02.png", price: "LKR 14,200" },
  { id: 4, name: "Vision Spex 02", image: "/image/glasses/spex02.png", price: "LKR 7,900" },
  { id: 5, name: "Sunglass Pro", image: "/image/glasses/sung03.png", price: "LKR 16,500" }
];

export default function BestSellerShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !slidesRef.current.includes(el)) slidesRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current;

      // Hide all except first
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      slides.forEach((slide, i) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `${i * 100}% top`,
          end: `${(i + 1) * 100}% top`,
          scrub: 1,
          onEnter: () => gsap.to(slide, { autoAlpha: 1, duration: 0.5 }),
          onEnterBack: () => gsap.to(slide, { autoAlpha: 1, duration: 0.5 }),
          onLeave: () => gsap.to(slide, { autoAlpha: 0, duration: 0.5 }),
          onLeaveBack: () => gsap.to(slide, { autoAlpha: 0, duration: 0.5 }),
        });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `${products.length * 100}%`,
        pin: true,
        scrub: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-white text-black"
    >
      {/* Hero grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)
          `,
          backgroundSize: "40px 40px",
        }}
      />


      {/* Header */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-[999]">
        <h4 className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2">
          Best Picks
        </h4>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] uppercase text-slate-950">
          <span className="px-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-500">
            Top Sellers
          </span>
        </h2>
      </div>

      {/* Slides */}
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={addToRefs}
          className="absolute inset-0 flex flex-col items-center justify-center z-[1]"
        >
          {/* Image */}
          <div className="relative w-full max-w-2xl aspect-square mb-10 scale-110 md:scale-125">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>

          {/* Text */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              {product.name}
            </h2>

            <p className="text-xl md:text-2xl text-red-600 font-semibold">
              {product.price}
            </p>

            <button className="mt-6 px-8 py-3 border border-black/30 rounded-full hover:bg-black hover:text-white transition">
              View Details
            </button>
          </div>
        </div>
      ))}

      {/* Scroll Indicator Bottom Right */}
      <div className="absolute bottom-8 right-8 z-[999] animate-bounce">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 border border-black/20 backdrop-blur-md">
          <svg
            className="w-6 h-6 text-black/80"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
