"use client";

import Image from "next/image";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : useEffect;

// Custom Navigation Buttons Component
const CustomSwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 z-20">
        <button
          onClick={() => swiper.slidePrev()}
          className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:bg-red-600"
          aria-label="Previous Slide"
        >
          <FiChevronLeft size={20} className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 z-20">
        <button
          onClick={() => swiper.slideNext()}
          className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:bg-red-600"
          aria-label="Next Slide"
        >
          <FiChevronRight size={20} className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default function BestSellingShowcase() {
  const products = [
    { id: 1, name: "Sunglass Alpha", image: "/image/glasses/sung01.png", price: "LKR 12,900" },
    { id: 2, name: "Vision Spex 01", image: "/image/glasses/spex01.png", price: "LKR 8,700" },
    { id: 3, name: "Sunglass Beta", image: "/image/glasses/sung02.png", price: "LKR 14,200" },
    { id: 4, name: "Vision Spex 02", image: "/image/glasses/spex02.png", price: "LKR 7,900" },
    { id: 5, name: "Sunglass Pro", image: "/image/glasses/sung03.png", price: "LKR 16,500" },
    { id: 6, name: "Vision Spex 03", image: "/image/glasses/spex03.png", price: "LKR 9,300" },
    { id: 7, name: "Sunglass Neo", image: "/image/glasses/sung04.png", price: "LKR 18,200" },
    { id: 8, name: "Vision Spex 04", image: "/image/glasses/spex04.png", price: "LKR 10,500" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fallingSvgRef = useRef<HTMLDivElement>(null); 

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the main title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Staggered animation for the product slides
      if (sectionRef.current) {
        gsap.fromTo(
          ".product-slide-card",
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // GSAP Animation for the Falling SVG Elements
      const svgContainer = fallingSvgRef.current;
      if (svgContainer) { 
        gsap.to(svgContainer.children, {
          y: "random(-200, 200)", 
          x: "random(-100, 100)", 
          rotation: "random(0, 360)", 
          opacity: "random(0.2, 0.6)",
          duration: "random(8, 20)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 1,
            from: "random"
          }
        });
      }

    }, sectionRef); 

    return () => ctx.revert();
  }, []);
  
  const handleMouseEnter = (index: number) => {
    const card = document.getElementById(`product-card-${index}`);
    if (!card) return;

    gsap.to(card, {
      y: -4, 
      boxShadow: "0 8px 15px -5px rgba(220, 38, 38, 0.10)", 
      scale: 1.01,
      duration: 0.3, 
      ease: "power2.out",
    });

    const name = card.querySelector(".product-name");
    gsap.to(name, { color: "#dc2626", duration: 0.3 }); 

    const button = card.querySelector(".action-button");
    gsap.to(button, { backgroundColor: "#dc2626", duration: 0.3 }); 
  };

  const handleMouseLeave = (index: number) => {
    const card = document.getElementById(`product-card-${index}`);
    if (!card) return;

    gsap.to(card, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const name = card.querySelector(".product-name");
    gsap.to(name, { color: "#0f172a", duration: 0.3 }); 

    const button = card.querySelector(".action-button");
    gsap.to(button, { backgroundColor: "#1e293b", duration: 0.3 }); 
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full px-6 py-24 md:py-32 overflow-hidden" 
      // Removed bg-white and added gradient directly to section
      style={{ 
        background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff)' // Subtle light gradient
      }}
    >
      
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Removed the grid background div */}
      
      {/* Falling Optical-themed SVG Shapes */}
      <div ref={fallingSvgRef} className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Optical SVGs (Colors adjusted for light background visibility) */}
        {/* Eye Icon */}
        <svg className="absolute w-28 h-28 top-[10%] left-[15%] text-slate-300 opacity-60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-3.13 0-6-2.03-7.8-5c1.8-2.97 4.67-5 7.8-5s6 2.03 7.8 5c-1.8 2.97-4.67 5-7.8 5zm0-8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
        {/* Glasses Icon */}
        <svg className="absolute w-36 h-36 top-[40%] right-[10%] text-red-600 opacity-20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2l1 3H9l1-3h2V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10h20V6zm-4 4h-2V6h2v4zM7 6h2v4H7V6zm9 10H8v-2h8v2z"/>
        </svg>
        {/* Lens Icon */}
        <svg className="absolute w-24 h-24 bottom-[20%] left-[5%] text-slate-400 opacity-50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        {/* Vision/Target Icon */}
        <svg className="absolute w-32 h-32 top-[25%] right-[30%] text-slate-300 opacity-40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
        {/* Eyeglass cleaner icon */}
        <svg className="absolute w-20 h-20 bottom-[10%] right-[25%] text-red-600 opacity-15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
        {/* Another glasses variation */}
        <svg className="absolute w-28 h-28 top-[60%] left-[30%] text-slate-400 opacity-30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 12c1.66 0 2.99-1.34 2.99-3S16.66 6 15 6s-3 1.34-3 3 1.34 3 3 3zm-6 0c1.66 0 2.99-1.34 2.99-3S10.66 6 9 6s-3 1.34-3 3 1.34 3 3 3zm0 4.75L7.73 14h-3.2l2.16 2.16L5 18l-1.41-1.41L5.17 14H2v-2h3.17l-1.41-1.41L5 9.75l2.73 2.73L9.73 14zM15 14c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>

      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Title */}
        <h2 
          ref={titleRef}
          className="text-center text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-slate-950 mb-20"
        >
          BEST <span className="text-red-600">SELLING</span> PICKS
        </h2>

        {/* Swiper Container with Custom Navigation */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 40 },
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            className="pb-5" 
          >
            {products.map((product, i) => (
              <SwiperSlide key={product.id}>
                <div
                  id={`product-card-${i}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="product-slide-card relative bg-gray-100 text-slate-950 p-6 h-full flex flex-col justify-between rounded-xl cursor-pointer shadow-sm transition-all duration-300"
                >
                  
                  {/* Best Seller Badge */}
                  <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 z-10">
                    <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl shadow-md uppercase tracking-wider">
                      Top Pick
                    </span>
                  </div>

                  {/* Product Image Area */}
                  <div className="relative w-full h-44 mb-6 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="product-name text-slate-950 font-extrabold text-xl mb-1 truncate transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-red-600 font-black text-lg">{product.price}</p>
                  </div>

                  {/* Call to Action Button */}
                  <button className="action-button mt-6 w-full bg-slate-800 text-white py-3 rounded-lg text-md font-semibold transition hover:bg-red-600 duration-300 shadow-md">
                    View Details
                  </button>

                </div>
              </SwiperSlide>
            ))}
            {/* Custom navigation buttons are rendered inside the Swiper component */}
            <CustomSwiperNavButtons />
          </Swiper>
        </div>
      </div>
    </section>
  );
}