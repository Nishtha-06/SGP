import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetails() {
  const navigate = useNavigate();

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
