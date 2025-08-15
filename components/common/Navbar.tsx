'use client';
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaHeart } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-red-600 text-white text-center py-2 text-xs sm:text-sm md:text-base">
        Hurry up! 🔥 Flash sale ends in 2 days!
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-100 py-2 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">

            {/* Logo */}
            <div className="flex-shrink-0 flex-1">
              <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center">
                <img
                  src="/image/common/logo11.png"
                  alt="logo"
                  className="h-24 sm:h-28 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center Nav Items */}
            <div className="hidden lg:flex space-x-4 xl:space-x-6 items-center text-sm xl:text-base flex-1 justify-center">
              <Link href="/" className="hover:text-gray-500 lg:text-xl mr-10">Home</Link>
              <Link href="/about" className="hover:text-gray-500 lg:text-xl mr-10">About</Link>
              <Link href="/shop" className="hover:text-gray-500 lg:text-xl mr-10">Shop</Link>
              <Link href="/contact" className="hover:text-gray-500 lg:text-xl mr-10">Contact Us</Link>
            </div>

            {/* Right Side - Search + Icons */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
              <Link href="/search" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaSearch />
              </Link>
              <Link href="/register" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaUser />
              </Link>
              <Link href="/cart" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaShoppingCart />
              </Link>
              <Link href="/wishlist" className="hover:text-gray-500 text-lg sm:text-xl">
                <FaHeart />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(true)}>
                <FaBars size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-100 text-black p-6 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-4 text-lg">
            <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-gray-800">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-gray-800">About</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="block hover:text-gray-800">Shop</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block hover:text-gray-800">Contact Us</Link>

            {/* Icons */}
            <div className="flex space-x-4 pt-4 text-xl">
              <Link href="/search" onClick={() => setIsOpen(false)} className="hover:text-gray-800">
                <FaSearch />
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="hover:text-gray-800">
                <FaUser />
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="hover:text-gray-800">
                <FaShoppingCart />
              </Link>
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="hover:text-gray-800">
                <FaHeart />
              </Link>
            </div>
          </nav>
        </div>

        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
}
