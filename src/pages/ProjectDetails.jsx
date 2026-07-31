import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetails() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recommendations
        </button>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Details</h1>
          <p className="text-gray-500">
            This module will display the Problem Statement, Abstract, Objectives, Modules, Technology Stack, Architecture, Timeline, Guide Suggestions, Research Papers, GitHub References, Estimated Cost, and Future Scope.
          </p>
        </div>
      </div>
    </main>
  );
}
