import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, ChevronDown, CheckCircle2,
  Cpu, Code2, Cloud, Zap, Shield, Blocks,
  Bot, Server, Database, Sparkles, Clock, 
  Users, BookOpen, BookmarkPlus, ArrowRight,
  Brain, FileText, Check
} from 'lucide-react';

export default function RecommendationResults() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  // Hardcoded for UI demonstration
  const categories = ['All', 'AI / ML', 'Web', 'Cloud', 'IoT', 'Blockchain', 'Cyber Security'];

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            AI Project Recommendations
          </h1>
          <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-4xl mb-4">
            Based on your profile, interests, skills, department, and previous preferences, our AI has identified the most suitable final year projects for you.
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-4 py-2 border border-gray-200 rounded-full w-fit shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            12 Personalized Recommendations Found
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDE (Main Content) - lg:col-span-3 */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
              
              {/* Search */}
              <div className="relative w-full md:w-64 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Projects..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap w-full gap-3">
                <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center] bg-[length:16px]">
                  <option>Department</option>
                  <option>Computer Science</option>
                  <option>IT</option>
                </select>

                <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center] bg-[length:16px]">
                  <option>Technology</option>
                  <option>React</option>
                  <option>Python</option>
                </select>

                <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center] bg-[length:16px]">
                  <option>Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Advanced</option>
                </select>
                
                <div className="ml-auto w-full md:w-auto">
                  <select className="w-full bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm rounded-xl py-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232563EB%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_8px_center] bg-[length:16px]">
                    <option>Sort By: Highest Match</option>
                    <option>Sort By: Trending</option>
                    <option>Sort By: Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* CATEGORIES PILLS */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* RECOMMENDATION CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                    <Bot className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-indigo-500/30">
                      98% Match
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Smart Campus Navigation System</h3>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">AI</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">Web</span>
                    <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">Advanced</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                  An intelligent navigation system that helps students locate classrooms, labs, and facilities using AI-powered indoor navigation.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Tech Stack</p>
                     <div className="flex flex-wrap gap-1.5">
                       {['React', 'Node', 'Python', 'MongoDB', 'TensorFlow'].map(t => (
                         <span key={t} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{t}</span>
                       ))}
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-4 mb-6 text-center">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1">Faculty Int.</p>
                     <p className="text-sm font-bold text-emerald-600">High</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Clock className="w-3 h-3" /> Duration
                     </div>
                     <p className="text-sm font-bold text-gray-900">4 Months</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Users className="w-3 h-3" /> Size
                     </div>
                     <p className="text-sm font-bold text-gray-900">4</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => navigate('/project-details')}
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    View Details
                  </button>
                  <button className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-200 border border-gray-200 rounded-xl transition-all duration-200 cursor-pointer group active:scale-95">
                    <BookmarkPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100">
                    <Cloud className="w-7 h-7 text-teal-600" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-blue-500/30">
                      92% Match
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Cloud-Native Document Analyzer</h3>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span className="text-teal-600 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">Cloud</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">Web</span>
                    <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">Medium</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                  A highly scalable platform leveraging cloud services to instantly summarize and extract text from large datasets and PDFs.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Tech Stack</p>
                     <div className="flex flex-wrap gap-1.5">
                       {['Next.js', 'AWS', 'Python', 'PostgreSQL'].map(t => (
                         <span key={t} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{t}</span>
                       ))}
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-4 mb-6 text-center">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1">Faculty Int.</p>
                     <p className="text-sm font-bold text-emerald-600">Medium</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Clock className="w-3 h-3" /> Duration
                     </div>
                     <p className="text-sm font-bold text-gray-900">3 Months</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Users className="w-3 h-3" /> Size
                     </div>
                     <p className="text-sm font-bold text-gray-900">3</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => navigate('/project-details')}
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    View Details
                  </button>
                  <button className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-200 border border-gray-200 rounded-xl transition-all duration-200 cursor-pointer group active:scale-95">
                    <BookmarkPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

               {/* Card 3 */}
               <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                    <Zap className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm shadow-blue-500/30">
                      89% Match
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">IoT Smart Agriculture Monitor</h3>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">IoT</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">Easy</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                  A sensor node network mapping crop health in real-time, predicting water requirements using localized weather models.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Tech Stack</p>
                     <div className="flex flex-wrap gap-1.5">
                       {['Arduino', 'C++', 'Node.js', 'React'].map(t => (
                         <span key={t} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">{t}</span>
                       ))}
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-4 mb-6 text-center">
                  <div>
                     <p className="text-xs text-gray-400 font-semibold mb-1">Faculty Int.</p>
                     <p className="text-sm font-bold text-gray-900">Low</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Clock className="w-3 h-3" /> Duration
                     </div>
                     <p className="text-sm font-bold text-gray-900">2 Months</p>
                  </div>
                  <div>
                     <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-semibold mb-1">
                       <Users className="w-3 h-3" /> Size
                     </div>
                     <p className="text-sm font-bold text-gray-900">2-3</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => navigate('/project-details')}
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-95"
                  >
                    View Details
                  </button>
                  <button className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-200 border border-gray-200 rounded-xl transition-all duration-200 cursor-pointer group active:scale-95">
                    <BookmarkPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>


            </div>

            {/* BOTTOM SECTION */}
            <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-md relative overflow-hidden flex flex-col items-center text-center mt-6">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-blue-600/30 blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-indigo-500/30 blur-2xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-3 relative z-10">Need More Ideas?</h3>
              <p className="text-blue-200 font-medium max-w-lg mb-8 relative z-10">
                You can easily regenerate project recommendations by providing updated interests or selecting a different skill focus.
              </p>
              
              <button className="bg-white text-blue-700 hover:bg-blue-50 py-3.5 px-8 rounded-xl font-bold shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 relative z-10">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Generate New Recommendations
              </button>
            </div>
            
          </div>

          {/* RIGHT SIDE PANEL - lg:col-span-1 */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center border border-indigo-200">
                    <Brain className="w-6 h-6 text-indigo-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-3">Your Strongest Interests</h4>
                    <div className="space-y-2">
                       <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Artificial Intelligence
                       </span>
                       <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Web Development
                       </span>
                       <span className="flex items-center gap-2 text-sm font-semibold text-gray-800 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Cloud Computing
                       </span>
                    </div>
                  </div>

                  <div className="border-t border-indigo-100 pt-5">
                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-4">Recommended Because</h4>
                    <ul className="space-y-4">
                      
                      <li className="flex gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <p className="text-gray-700 font-medium leading-snug">Your <span className="font-bold text-gray-900">Python</span> skill level is high.</p>
                      </li>
                      
                      <li className="flex gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <p className="text-gray-700 font-medium leading-snug">You selected <span className="font-bold text-gray-900">AI</span> as your primary interest.</p>
                      </li>

                      <li className="flex gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <p className="text-gray-700 font-medium leading-snug">Projects match your semester.</p>
                      </li>

                      <li className="flex gap-3 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <p className="text-gray-700 font-medium leading-snug">Career goal aligns with these technologies.</p>
                      </li>

                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
