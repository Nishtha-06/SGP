import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, GraduationCap, Code2, Target, ArrowRight } from 'lucide-react';

export default function ProfileSetup() {
  const navigate = useNavigate();
  
  // State
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [languages, setLanguages] = useState([]);
  const [interests, setInterests] = useState([]);
  const [techStack, setTechStack] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [teamSize, setTeamSize] = useState(3);

  const interestOptions = [
    'Artificial Intelligence', 'Machine Learning', 'Web Development', 
    'Mobile Apps', 'Cyber Security', 'Cloud Computing', 
    'Blockchain', 'IoT', 'Data Science', 'AR/VR'
  ];

  const languageOptions = ['Python', 'Java', 'C++', 'JavaScript', 'C#', 'PHP', 'Go', 'Rust', 'Swift'];

  const toggleInterest = (interest) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleLanguage = (lang) => {
    setLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Profile is saved, proceed to recommendations
    navigate('/recommendations');
  };

  return (
    <main className="flex-grow pt-24 pb-20 relative overflow-hidden bg-slate-50/30">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 shadow-sm border border-blue-200">
            <UserCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Complete Your Student Profile
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Welcome aboard! Tell us about yourself so our AI can curate the perfect final year projects for you.
          </p>
        </div>

        {/* PROFILE FORM */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-150">
          
          <form onSubmit={handleSaveProfile} className="space-y-10">
            
            {/* Section 1: Basic Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">University / College</label>
                  <input
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                    placeholder="Enter your institution name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <select 
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Semester</label>
                  <select 
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Skills & Tech */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Code2 className="w-5 h-5 text-blue-600" />
                Skills & Interests
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Programming Languages</label>
                  <div className="flex flex-wrap gap-2.5">
                    {languageOptions.map(lang => (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                          languages.includes(lang) 
                            ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Areas of Interest</label>
                  <div className="flex flex-wrap gap-2.5">
                    {interestOptions.map(interest => (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                          interests.includes(interest) 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Primary Tech Stack / Frameworks</label>
                    <input
                      type="text"
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                      placeholder="e.g. React, Node.js, TensorFlow"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Project Preferences */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Target className="w-5 h-5 text-blue-600" />
                Project Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Career Goal</label>
                  <select 
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Career Goal</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="AI Researcher">AI Researcher</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm font-bold text-gray-700">Team Size Preference</label>
                    <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg text-sm">{teamSize} Member{teamSize > 1 ? 's' : ''}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2 px-1">
                    <span>Solo (1)</span>
                    <span>Large Team (6)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Save Profile & Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
