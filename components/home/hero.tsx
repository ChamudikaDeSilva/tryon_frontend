'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    src: '/image/hero/h-1.jpg',
    title: 'Welcome to Glamora',
    desc: 'Discover the latest trends in fashion and elevate your style with our exclusive collections.',
  },
  {
    src: '/image/hero/h-10.jpg',
    title: 'New Season, New You',
    desc: 'Handpicked looks for every mood—classy, comfy, or bold. Dress the way you feel.',
  },
  {
    src: '/image/hero/h-11.jpg',
    title: 'Exclusive Offers',
    desc: 'Limited-time drops and members-only deals. Don’t miss out.',
  },
];

export default function Hero() {
  const navHeight = 64; // Adjust for navbar height

  return (
    <section
      className="relative px-16 py-4 w-full h-full overflow-hidden"
      style={{ height: `calc(95dvh - ${navHeight}px)` }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        speed={1500}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Image as img tag for better control */}
              <img
                src={s.src}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl w-full px-4 sm:px-8 md:px-12 lg:px-16">
                  <div className="text-white max-w-lg space-y-3 sm:space-y-5">
                    <h1
                      className="font-bold leading-tight font-ubuntu"
                      style={{
                        fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', // Responsive scaling
                      }}
                    >
                      {s.title}
                    </h1>
                    <p
                      className="opacity-95"
                      style={{
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                      }}
                    >
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/shop"
                        className="inline-block rounded-md bg-red-600 px-5 py-2.5 text-sm sm:text-base font-semibold hover:bg-red-700 transition-colors"
                      >
                        Shop Now
                      </a>
                      <a
                        href="/about"
                        className="inline-block rounded-md border border-white/80 px-5 py-2.5 text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition-colors"
                      >
                        Learn More
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
