'use client';

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal, SiAmericanexpress } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 font-ubuntu">
      
      {/* Newsletter */}
      <div className="border-b border-gray-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-white text-xl font-semibold tracking-wide">
            Subscribe to our newsletter
          </h3>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-md bg-gray-900 border border-gray-700 text-sm focus:outline-none focus:border-red-500 w-full md:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-r-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-3xl font-bold mb-3 tracking-wide">Glamora</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover the latest trends in fashion and elevate your style with our exclusive collections.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {[
              { icon: FaFacebookF, link: '#' },
              { icon: FaInstagram, link: '#' },
              { icon: FaTwitter, link: '#' },
              { icon: FaYoutube, link: '#' },
              { icon: FaTiktok, link: '#' }
            ].map((Item, idx) => (
              <a
                key={idx}
                href={Item.link}
                className="p-2 bg-gray-900/60 backdrop-blur rounded-full border border-gray-700 hover:border-red-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Item.icon size={16} className="text-gray-300 hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-red-500 after:mt-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {['Shop', 'About Us', 'Contact', 'Blog'].map((link, idx) => (
              <li key={idx}>
                <a
                  href={`/${link.toLowerCase().replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-red-500 after:mt-1">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            {['FAQs', 'Shipping & Returns', 'Privacy Policy', 'Terms & Conditions'].map((link, idx) => (
              <li key={idx}>
                <a
                  href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-red-500 after:mt-1">
            We Accept
          </h3>
          <div className="flex flex-wrap gap-4">
            {[SiVisa, SiMastercard, SiPaypal, SiAmericanexpress].map((Icon, idx) => (
              <div
                key={idx}
                className="p-3 bg-gray-900/60 backdrop-blur rounded-lg border border-gray-700 hover:border-red-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={30} className="text-gray-400 hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Glamora. All Rights Reserved.
      </div>
    </footer>
  );
}
