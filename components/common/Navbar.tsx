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
                    src="/image/common/gillian_black.png"
                    alt="logo"
                    className="h-8 md:h-10 w-auto object-contain"
                />
            </Link>
        </div>
            {/* Center Nav Items */}
            <div className="hidden lg:flex space-x-8 items-center text-sm xl:text-base flex-1 justify-center">
              {["Home", "About", "Shop", "Contact Us"].map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${item.toLowerCase().replace(/\s/g, '')}`}
                  className="relative text-lg font-medium hover:text-black transition-colors 
                             after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 
                             hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right Side - Search + Icons */}
            <div className="hidden lg:flex items-center space-x-3 flex-1 justify-end">
              {[ 
                { icon: FaSearch, link: "/search" },
                { icon: FaUser, link: "/register" },
                { icon: FaShoppingCart, link: "/cart" },
                { icon: FaHeart, link: "/wishlist" }
              ].map((Item, idx) => (
                <Link
                  key={idx}
                  href={Item.link}
                  className="p-2 text-black rounded-full border border-gray-700 hover:border-red-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <Item.icon size={18} className="text-black" />
                </Link>
              ))}
            </div>

            <div className="px-2 sm:px-4 lg:px-6">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"> Shop Now
              </button>
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
            {["Home", "About", "Shop", "Contact Us"].map((item, idx) => (
              <Link
                key={idx}
                href={`/${item.toLowerCase().replace(/\s/g, '')}`}
                onClick={() => setIsOpen(false)}
                className="block hover:text-gray-800 relative after:absolute after:left-0 after:bottom-0 
                           after:w-0 after:h-[2px] after:bg-red-500 hover:after:w-full 
                           after:transition-all after:duration-300"
              >
                {item}
              </Link>
            ))}

            {/* Icons */}
            <div className="flex space-x-4 pt-4 text-xl">
              {[ 
                { icon: FaSearch, link: "/search" },
                { icon: FaUser, link: "/register" },
                { icon: FaShoppingCart, link: "/cart" },
                { icon: FaHeart, link: "/wishlist" }
              ].map((Item, idx) => (
                <Link
                  key={idx}
                  href={Item.link}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full border border-gray-700 hover:border-red-500 hover:-translate-y-1 transition-all duration-300"
                >
                  <Item.icon size={18} className="text-black" />
                </Link>
              ))}
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
