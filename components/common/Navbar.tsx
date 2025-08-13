'use client';
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-red-600 text-white text-center py-2 text-xs sm:text-sm md:text-base">
        Hurry up! 🔥 Flash sale ends in 2 hours!
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-100 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold">
                <img 
                  src="/image/common/logo1.png" 
                  alt="logo" 
                  className="h-10 sm:h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4 xl:space-x-6 items-center text-sm xl:text-base">
              <Link href="/" className="hover:text-gray-500 lg:text-xl">Home</Link>
              <Link href="/about" className="hover:text-gray-500 lg:text-xl">About</Link>
              <Link href="/shop" className="hover:text-gray-500 lg:text-xl">Shop</Link>
              <Link href="/contact" className="hover:text-gray-500 lg:text-xl">Contact Us</Link>

              {/* Search */}
              <div className="relative w-28 sm:w-36 xl:w-48">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-700 text-white px-3 py-1 rounded pl-8 focus:outline-none w-full text-xs sm:text-sm"
                />
                <FaSearch className="absolute left-2 top-2 text-gray-400 text-sm sm:text-base" />
              </div>

              {/* Icons */}
              <Link href="/register" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaUser />
              </Link>
              <Link href="/cart" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaShoppingCart />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-gray-700 px-4 py-4 space-y-3 text-sm sm:text-base">
            <Link href="/" className="block hover:text-gray-300">Home</Link>
            <Link href="/about" className="block hover:text-gray-300">About</Link>
            <Link href="/shop" className="block hover:text-gray-300">Shop</Link>
            <Link href="/contact" className="block hover:text-gray-300">Contact Us</Link>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-600 text-white px-3 py-1 rounded pl-8 focus:outline-none w-full text-sm"
              />
              <FaSearch className="absolute left-2 top-2 text-gray-400" />
            </div>

            {/* Icons */}
            <div className="flex space-x-4 pt-2 text-lg">
              <Link href="/register" className="hover:text-gray-300">
                <FaUser />
              </Link>
              <Link href="/cart" className="hover:text-gray-300">
                <FaShoppingCart />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
