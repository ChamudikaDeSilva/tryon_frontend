"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi"; // For a nice icon on the button

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : useEffect;

export default function BookTestCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        // --- Entrance Animations (ScrollTrigger) ---
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
        
        // --- Hover Animation Setup ---
        const button = buttonRef.current;
        const arrow = button?.querySelector('svg');
        
        if (button && arrow) {
            // Create a single Timeline for the combined hover effect (scale + arrow movement)
            const hoverTimeline = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: "power1.inOut" } })
                // Button scale effect
                .to(button, { scale: 1.05 }, 0)
                // Arrow slide effect
                .to(arrow, { x: 5 }, 0); 
            
            // Add event listeners to control the timeline
            const playTimeline = () => hoverTimeline.play();
            const reverseTimeline = () => hoverTimeline.reverse();

            button.addEventListener('mouseenter', playTimeline);
            button.addEventListener('mouseleave', reverseTimeline);

            // Cleanup function for event listeners
            return () => {
                button.removeEventListener('mouseenter', playTimeline);
                button.removeEventListener('mouseleave', reverseTimeline);
            };
        }
      }
    }, ctaRef);

    return () => ctx.revert(); // GSAP cleanup
  }, []);

  return (
    <section 
      ref={ctaRef}
      className="relative w-full px-6 py-24 md:py-32 bg-gradient-to-br from-red-600 to-red-800 text-white overflow-hidden flex items-center justify-center"
      // You can adjust the gradient colors, or use a solid background
    >
      {/* Background Overlay for texture */}
      <div className="absolute inset-0 z-0 opacity-10 bg-black mix-blend-overlay pointer-events-none"></div>
      
      {/* Dynamic Background SVG - Abstract "lens flare" or "light streak" */}
      <svg className="absolute w-full h-full inset-0 z-0 opacity-15" viewBox="0 0 100 100" preserveAspectRatio="none" fill="url(#gradientStripe)">
        <defs>
          <linearGradient id="gradientStripe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" transform="rotate(45 50 50)"/>
        <rect x="0" y="0" width="100" height="100" transform="rotate(135 50 50)"/>
      </svg>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        {/* Image Section */}
        <div ref={imageRef} className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
          <div className="relative w-full max-w-md aspect-w-1 aspect-h-1 md:aspect-w-3 md:aspect-h-2 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative w-full max-w-md h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
                src="/image/boot-test.jpg"
                alt="Book an eye test"
                fill
                className="object-cover object-center"
            />
            </div>

          </div>
        </div>

        {/* Content & CTA Section */}
        <div ref={contentRef} className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 md:mb-8 text-white">
            Ready for <span className="text-black inline-block bg-white px-3 rounded-md shadow-md py-1 -rotate-2 transform">Crystal Clear</span> Vision?
          </h2>
          <p className="text-xl md:text-2xl font-light mb-8 md:mb-10 text-red-100">
            Schedule your comprehensive eye test today with our expert optometrists. Advanced technology, personalized care.
          </p>
          <button
            ref={buttonRef}
            className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold rounded-full bg-white text-red-700 shadow-2xl hover:bg-red-50 transition-all duration-300 transform"
            aria-label="Book an eye test"
          >
            Book Your Eye Test
            <FiArrowRight className="ml-3 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}