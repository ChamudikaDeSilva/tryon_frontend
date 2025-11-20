'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/effect-fade';

// NOTE: Ensure your images are high resolution and visually appealing for a modern look.
const slides = [
  {
    src: '/image/hero/h-new-1.jpg',
    title: 'Precision Style, Uncompromised Vision',
    desc: 'Explore our newest collection of designer frames engineered for clarity and elegance.',
  },
  {
    src: '/image/hero/h-new-2.jpg',
    title: 'The Future of Eyewear is Here',
    desc: 'Hand-polished lenses and ergonomic designs built for all-day comfort and undeniable style.',
  },
  {
    src: '/image/hero/h-new-3.jpg',
    title: 'Book Your Free Eye Consultation Today',
    desc: 'Limited-time offer: Get a comprehensive eye checkup and receive 20% off any premium lens coating.',
  },
];

export default function Hero() {
  const navHeight = 64; // Adjust for your actual fixed navbar height (e.g., 64px)

  return (
    <section
      // Removed bg-gray-100, letting the slider fill the space
      className="relative w-full h-full overflow-hidden"
      // Using 90dvh (90% of dynamic viewport height) for a strong, full-page feel.
      style={{ height: `calc(90dvh - ${navHeight}px)` }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        speed={1800} // Slightly slower speed for a smoother transition
        autoplay={{ delay: 4000, disableOnInteraction: false }} // Slower autoplay
        pagination={{ clickable: true }}
        navigation={true} // Added navigation arrows for better UX
        className="h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Image as img tag */}
              <img
                src={s.src}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover object-center" // object-center for better focus
              />

              {/* Gradient Overlay for modern look and better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

              {/* Content - Centered and More Impactful */}
              <div className="relative z-10 h-full flex items-center justify-center text-center">
                <div className="max-w-4xl w-full px-6 sm:px-8">
                  <div className="text-white space-y-4 sm:space-y-6 md:space-y-8">
                    {/* H1 Title: Extremely large and bold */}
                    <h1
                      className="font-extrabold tracking-tight font-ubuntu drop-shadow-lg"
                      style={{
                        fontSize: 'clamp(2rem, 6vw, 4.5rem)', // Large responsive scaling
                      }}
                    >
                      {s.title}
                    </h1>
                    {/* Paragraph: Clear and readable */}
                    <p
                      className="opacity-95 max-w-2xl mx-auto drop-shadow-md" // Max width to prevent line overflow
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                      }}
                    >
                      {s.desc}
                    </p>
                    
                    {/* Buttons: More distinct and modern style */}
                    <div className="flex flex-wrap gap-4 justify-center pt-2">
                      <a
                        href="/shop"
                        className="inline-block rounded-full bg-red-600 px-8 py-3 text-lg font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-red-700 hover:scale-[1.03]"
                      >
                        Shop Now
                      </a>
                      <a
                        href="/about"
                        className="inline-block rounded-full border border-white px-8 py-3 text-lg font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-black"
                      >
                        Explore Frames
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}