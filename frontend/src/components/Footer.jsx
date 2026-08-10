import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white py-12 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Navigation links in Footer */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          <a 
            href="#" 
            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </a>
          <a 
            href="#recommendations" 
            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Recommendations
          </a>
          <a 
            href="#about" 
            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            About
          </a>
          <a 
            href="#" 
            className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Login
          </a>
        </div>
        
        {/* Copyright info */}
        <p className="text-[14px] text-gray-500 font-medium">
          Copyright. © AI ProjectHub
        </p>
      </div>
    </footer>
  );
}
