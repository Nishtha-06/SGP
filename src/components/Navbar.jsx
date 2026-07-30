import React, { useState, useEffect } from 'react';
import { Brain, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${
      isScrolled ? 'border-gray-200/80 shadow-xs backdrop-blur-md bg-white/90' : 'border-gray-150'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md shadow-blue-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight transition-colors duration-200 group-hover:text-blue-600">
              AI ProjectHub
            </span>
          </div>

          {/* Center: Desktop Navigation NavLinks */}
          <div className="hidden md:flex space-x-9 items-center">
            <a 
              href="#features" 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Features
            </a>
            <a 
              href="#recommendations" 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              Recommendations
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              About
            </a>
          </div>

          {/* Right Side: Login Button */}
          <div className="hidden md:flex items-center">
            <button className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-250 cursor-pointer rounded-lg hover:bg-gray-50 hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all duration-200">
              Login
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 h-6 block" /> : <Menu className="h-6 h-6 block" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-100 ${
          isOpen ? 'max-h-64 opacity-100 bg-white py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 space-y-2 pb-3">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            Features
          </a>
          <a
            href="#recommendations"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            Recommendations
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            About
          </a>
          <div className="pt-4 border-t border-gray-100 px-4">
            <button className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all duration-150">
              Login
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
