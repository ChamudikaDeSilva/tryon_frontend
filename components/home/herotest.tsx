'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import c1 from '@/public/c1.jpg';
import c2 from '@/public/c2.jpg';
import c3 from '@/public/c3.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // 1️⃣ Staggered entrance for text and button
    const elements = heroRef.current?.querySelectorAll<HTMLElement>('h1, p, button');
    if (elements) {
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.out' }
      );
    }

    // 2️⃣ Floating / initial animation for images
    imageRefs.current.forEach((el, i) => {
      if (!el) return;

      // Entrance fade in
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: i * 0.2 }
      );

      // Subtle infinite floating
      gsap.to(el, {
        y: '+=10',
        repeat: -1,
        yoyo: true,
        duration: 3 + i,
        ease: 'sine.inOut',
      });

      // Hover animation
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.05, rotate: 2, duration: 0.4 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, rotate: 0, duration: 0.4 });
      });
    });

    // 3️⃣ Scroll parallax effect
    imageRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        y: '-=50',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // 4️⃣ Mouse-based parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        const movement = (i + 1) * 5; // different for each layer
        gsap.to(el, {
          x: (mouseRef.current.x / window.innerWidth - 0.5) * movement,
          y: (mouseRef.current.y / window.innerHeight - 0.5) * movement,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen bg-slate-950 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Overlay gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950/90 to-black/40 z-10"></div>

      {/* Hero Text */}
      <div className="z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover Your Style
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl mb-6">
          Modern clothing for modern souls
        </p>
        <button className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-3 rounded-md font-semibold">
          Shop Now
        </button>
      </div>

      {/* Parallax Images */}
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-0 pointer-events-none">
        {[c1, c2, c3].map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) imageRefs.current[i] = el;
            }}
            className="absolute w-60 h-80 md:w-80 md:h-[28rem] rounded-xl overflow-hidden shadow-2xl border border-gray-300"
            style={{
              top: `${10 + i * 15}%`,
              left: `${20 + i * 20}%`,
              zIndex: i,
            }}
          >
            <Image
              src={img}
              alt={`Cloth ${i + 1}`}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
