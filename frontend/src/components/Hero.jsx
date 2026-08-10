import React from 'react';

export default function Hero() {
  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-900 leading-[1.12] tracking-tight">
              Elevate Your Final Year <br />
              <span className="text-gray-900">Project with AI.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 font-normal max-w-lg leading-relaxed">
              Smart recommendations, seamless management, better outcomes.
            </p>
            
            {/* Buttons UI */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#recommendations"
                className="inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Get Recommendations
              </a>
              <a
                href="#features"
                className="inline-flex justify-center items-center px-6 py-3.5 border border-gray-200 text-base font-semibold rounded-lg text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                Explore Projects
              </a>
            </div>
          </div>
          
          {/* Right Column: AI Network Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] h-[340px] md:h-[380px] bg-slate-50/30 rounded-2xl p-4 flex items-center justify-center">
              
              {/* Responsive SVG Illustration */}
              <svg 
                viewBox="0 0 500 360" 
                className="w-full h-full drop-shadow-lg"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connection lines from central blue node to left gray nodes */}
                <path 
                  d="M250 180 L120 100" 
                  stroke="#E5E7EB" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path 
                  d="M250 180 L80 180" 
                  stroke="#E5E7EB" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M250 180 L120 260" 
                  stroke="#E5E7EB" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="animate-pulse"
                />

                {/* Connection lines from central blue node to right document nodes */}
                <path 
                  d="M250 180 L380 110" 
                  stroke="#E5E7EB" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />
                <path 
                  d="M250 180 L380 250" 
                  stroke="#E5E7EB" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                />

                {/* Left Gray Node 1 (Top Left) */}
                <g className="hover:scale-110 transition-transform duration-200 origin-[120px_100px] cursor-pointer">
                  <circle 
                    cx="120" 
                    cy="100" 
                    r="10" 
                    fill="#F3F4F6" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx="120" 
                    cy="100" 
                    r="4" 
                    fill="#9CA3AF" 
                  />
                </g>

                {/* Left Gray Node 2 (Middle Left) */}
                <g className="hover:scale-110 transition-transform duration-200 origin-[80px_180px] cursor-pointer">
                  <circle 
                    cx="80" 
                    cy="180" 
                    r="12" 
                    fill="#F3F4F6" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx="80" 
                    cy="180" 
                    r="5" 
                    fill="#9CA3AF" 
                  />
                </g>

                {/* Left Gray Node 3 (Bottom Left) */}
                <g className="hover:scale-110 transition-transform duration-200 origin-[120px_260px] cursor-pointer">
                  <circle 
                    cx="120" 
                    cy="260" 
                    r="10" 
                    fill="#F3F4F6" 
                    stroke="#D1D5DB" 
                    strokeWidth="2" 
                  />
                  <circle 
                    cx="120" 
                    cy="260" 
                    r="4" 
                    fill="#9CA3AF" 
                  />
                </g>

                {/* Document Node 1 (Top Right) */}
                <g className="hover:-translate-y-1 transition-transform duration-300 cursor-pointer origin-[380px_110px]">
                  {/* Outer card shell */}
                  <rect 
                    x="380" 
                    y="65" 
                    width="65" 
                    height="85" 
                    rx="6" 
                    fill="white" 
                    stroke="#9CA3AF" 
                    strokeWidth="1.5" 
                  />
                  
                  {/* Folded paper corner representation */}
                  <path 
                    d="M433 65 L445 77 L433 77 Z" 
                    fill="#F3F4F6" 
                    stroke="#9CA3AF" 
                    strokeWidth="1"
                  />
                  
                  {/* Text lines inside document */}
                  <line x1="392" y1="82" x2="425" y2="82" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="94" x2="433" y2="94" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="106" x2="433" y2="106" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="118" x2="420" y2="118" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="130" x2="410" y2="130" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Document Node 2 (Bottom Right) */}
                <g className="hover:-translate-y-1 transition-transform duration-300 cursor-pointer origin-[380px_250px]">
                  {/* Outer card shell */}
                  <rect 
                    x="380" 
                    y="205" 
                    width="65" 
                    height="85" 
                    rx="6" 
                    fill="white" 
                    stroke="#9CA3AF" 
                    strokeWidth="1.5" 
                  />
                  
                  {/* Folded paper corner representation */}
                  <path 
                    d="M433 205 L445 217 L433 217 Z" 
                    fill="#F3F4F6" 
                    stroke="#9CA3AF" 
                    strokeWidth="1"
                  />

                  {/* Text lines inside document */}
                  <line x1="392" y1="222" x2="425" y2="222" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="234" x2="433" y2="234" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="246" x2="433" y2="246" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="258" x2="420" y2="258" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
                  <line x1="392" y1="270" x2="410" y2="270" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Central AI Node (Large Blue Node) */}
                <g className="cursor-pointer group">
                  {/* Central Node glow effect */}
                  <circle 
                    cx="250" 
                    cy="180" 
                    r="24" 
                    fill="#2563EB" 
                    fillOpacity="0.15" 
                    className="animate-ping [animation-duration:3s]"
                  />
                  {/* Node solid backdrop */}
                  <circle 
                    cx="250" 
                    cy="180" 
                    r="16" 
                    fill="#2563EB" 
                    stroke="#3B82F6" 
                    strokeWidth="3.5"
                    className="transition-all duration-300 drop-shadow-md"
                  />
                </g>
              </svg>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
