"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

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

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20 relative">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-950 mb-12">
        Best Selling Picks
      </h2>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <button className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-lg hover:bg-slate-800 swiper-button-prev">
          <FiChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <button className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white shadow-lg hover:bg-slate-800 swiper-button-next">
          <FiChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-transform relative"
            >
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Best Seller
              </div>

              <div className="relative w-full h-40 mb-4 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>

              <h3 className="text-slate-950 font-semibold text-lg">{product.name}</h3>
              <p className="text-red-600 font-bold mt-1">{product.price}</p>

              <button className="mt-4 w-full bg-slate-950 text-white py-2 rounded-xl text-sm font-medium transition hover:bg-red-600">
                View Details
              </button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
