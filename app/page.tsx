'use client';
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/hero";
import Herotest from "@/components/home/herotest";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}

      {/* <div className="px-4 sm:px-6 lg:px-8">
        <Navbar />
      </div> */}
      <Navbar />
      <Hero />
      {/* <Herotest /> */}
      <Footer />
      {/* Main Content */}

   
    </div>
  );
}
