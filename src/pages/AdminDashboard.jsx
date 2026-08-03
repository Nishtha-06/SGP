import React, { useState } from 'react';
import { 
  Building,
  Search,
  Shield,
  History,
  Lock,
  BarChart3,
  Settings,
  Database,
  Sliders,
  ToggleRight,
  ToggleLeft,
  Server,
  Zap,
  Target
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Institution Analytics');
  
  // AI Rule State
  const [socialImpact, setSocialImpact] = useState(70);
  const [innovation, setInnovation] = useState(85);
  const [industryRelevant, setIndustryRelevant] = useState(true);
  const [duplicateStrictness, setDuplicateStrictness] = useState('Strict');

  const stats = [
    { label: 'Total Projects', value: '450', icon: Database, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Participating Depts', value: '8', icon: Building, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'AI Rule Status', value: 'Active', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Repeat Prevented', value: '124', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const archiveProjects = [
    { id: 1, year: '2024-2025', title: 'Smart Parking System', dept: 'Computer Science', tech: ['IoT', 'Python', 'React'] },
    { id: 2, year: '2023-2024', title: 'Hospital Management System', dept: 'Information Tech', tech: ['Java', 'MySQL'] },
    { id: 3, year: '2023-2024', title: 'E-Commerce Chatbot', dept: 'Computer Science', tech: ['NLP', 'Node.js'] },
    { id: 4, year: '2022-2023', title: 'Attendance via Face Rec.', dept: 'Artificial Intelligence', tech: ['OpenCV', 'Python'] },
  ];

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Administration</h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Settings className="w-3.5 h-3.5" /> Global Access
              </span>
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Server className="w-4 h-4" /> Supervising Institution Project Operations
            </p>
          </div>
        </div>

        {/* STATS SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.value === 'Active' ? 'text-emerald-600' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
            {['Institution Analytics', 'AI Rule Management', 'Restricted Project Archive'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
          
          {/* INSTITUTION ANALYTICS TAB */}
          {activeTab === 'Institution Analytics' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" /> Institution Overview
                </h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Export Report &rarr;</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Department-wise Projects</h3>
                  <div className="space-y-4">
                    {[
                      { dept: 'Computer Science', count: 185, width: '100%' },
                      { dept: 'Information Tech', count: 120, width: '65%' },
                      { dept: 'Artificial Intelligence', count: 85, width: '45%' },
                      { dept: 'Data Science', count: 60, width: '30%' }
                    ].map(item => (
                      <div key={item.dept}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-semibold text-gray-700">{item.dept}</span>
                          <span className="text-gray-500 font-medium">{item.count}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: item.width }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Tech Stack Popularity</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-bold">React (35%)</span>
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-bold">Node.js (28%)</span>
                    <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-bold">Python (25%)</span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-sm font-bold">TensorFlow (15%)</span>
                    <span className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-lg text-sm font-bold">Docker (10%)</span>
                    <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-bold">AWS (8%)</span>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Difficulty Distribution</h3>
                  <div className="flex items-end justify-between h-32 gap-2 mt-4 px-4">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-emerald-400 rounded-t-sm h-[30%]"></div>
                      <span className="text-xs font-semibold text-gray-600">Beginner</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-amber-400 rounded-t-sm h-[80%]"></div>
                      <span className="text-xs font-semibold text-gray-600">Intermediate</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-rose-400 rounded-t-sm h-[50%]"></div>
                      <span className="text-xs font-semibold text-gray-600">Advanced</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors flex flex-col justify-center items-center">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider w-full text-left">Global Approval Rate</h3>
                  <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[12px] border-blue-500 border-r-gray-200">
                    <span className="text-2xl font-bold text-gray-900">76%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">Approved vs Rejected/Revision</p>
                </div>
              </div>
            </div>
          )}

          {/* AI RULE MANAGEMENT TAB */}
          {activeTab === 'AI Rule Management' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                  <Sliders className="w-5 h-5 text-indigo-600" /> AI Recommendation Engine Rules
                </h2>
                <p className="text-sm text-gray-500 mb-6">Configure the global parameters that the AI uses to suggest and approve projects.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Sliders */}
                <div className="space-y-8 p-6 border border-gray-100 rounded-xl bg-gray-50/30">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold text-gray-800">Social Impact Priority</label>
                      <span className="text-sm font-bold text-blue-600">{socialImpact}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={socialImpact}
                      onChange={(e) => setSocialImpact(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-gray-500 mt-2">Higher values prioritize projects solving societal issues.</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold text-gray-800">Innovation Requirement</label>
                      <span className="text-sm font-bold text-blue-600">{innovation}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={innovation}
                      onChange={(e) => setInnovation(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-gray-500 mt-2">Sets the threshold for uniqueness required against the archive.</p>
                  </div>
                </div>

                {/* Toggles and Dropdowns */}
                <div className="space-y-6 p-6 border border-gray-100 rounded-xl bg-gray-50/30">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Industry-Relevant Domains Only</h3>
                      <p className="text-xs text-gray-500 mt-1">Restrict suggestions to currently trending industry tech stacks.</p>
                    </div>
                    <button onClick={() => setIndustryRelevant(!industryRelevant)}>
                      {industryRelevant ? (
                        <ToggleRight className="w-10 h-10 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-10 h-10 text-gray-300" />
                      )}
                    </button>
                  </div>

                  <hr className="border-gray-200" />

                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2">Duplicate Detection Strictness</h3>
                    <p className="text-xs text-gray-500 mb-3">Determines how aggressively the AI flags similar past projects.</p>
                    <select 
                      value={duplicateStrictness}
                      onChange={(e) => setDuplicateStrictness(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    >
                      <option value="Low">Low (Allows slight variations)</option>
                      <option value="Medium">Medium (Flags major overlaps)</option>
                      <option value="High">High (Strict component matching)</option>
                      <option value="Strict">Strict (Zero tolerance for repetition)</option>
                    </select>
                  </div>
                  
                </div>

              </div>

              <div className="flex justify-end pt-4">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2">
                  <Target className="w-4 h-4" /> Save Configuration
                </button>
              </div>

            </div>
          )}

          {/* RESTRICTED PROJECT ARCHIVE TAB */}
          {activeTab === 'Restricted Project Archive' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-600" /> Restricted Project Archive
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Database of past projects used by AI to prevent duplicate approvals.</p>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search Repository..." className="w-full sm:w-auto pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      <th className="py-4 px-5">Academic Year</th>
                      <th className="py-4 px-5">Project Title</th>
                      <th className="py-4 px-5">Department</th>
                      <th className="py-4 px-5">Key Tech Stack</th>
                      <th className="py-4 px-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {archiveProjects.map((project) => (
                      <tr key={project.id} className="border-b last:border-b-0 border-gray-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5 font-semibold text-gray-600">{project.year}</td>
                        <td className="py-4 px-5 font-bold text-gray-900">{project.title}</td>
                        <td className="py-4 px-5 text-gray-600">{project.dept}</td>
                        <td className="py-4 px-5">
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map(t => (
                              <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-bold border border-gray-200">{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                            <Lock className="w-3 h-3" /> Archived
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
