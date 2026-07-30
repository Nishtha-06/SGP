import React from 'react';

export default function FeatureCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group cursor-pointer">
      {/* Icon Wrapper: Small blue icon box */}
      <div className="w-12 h-12 rounded-xl bg-blue-50/70 border border-blue-100/50 flex items-center justify-center text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
        {children}
      </div>
      
      {/* Card Content */}
      <h3 className="mt-6 text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-250">
        {title}
      </h3>
      
      <p className="mt-3 text-[15px] font-normal leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}
