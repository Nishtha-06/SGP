import { User, Mail, BookOpen, Calendar, MapPin, Edit3 } from 'lucide-react';

export default function Profile() {
  return (
    <div className="flex-1 bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold shadow-md">
                SN
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Name</h1>
              <p className="text-lg text-gray-500 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                student@college.edu
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  <BookOpen className="w-4 h-4" /> Computer Science
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Calendar className="w-4 h-4" /> Class of 2026
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4" /> New York, NY
                </span>
              </div>
            </div>

            {/* About Section */}
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed">
                Passionate computer science student with a strong interest in artificial intelligence and machine learning. 
                Currently looking for exciting projects to collaborate on and expand my skillset.
              </p>
            </div>
            
            {/* Skills Section */}
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Python', 'React', 'Machine Learning', 'Data Analysis', 'Java'].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
