import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Search, 
  Database,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

export default function Recommendations() {
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [difficulty, setDifficulty] = useState('Medium');
  const [teamSize, setTeamSize] = useState(4);
  const [category, setCategory] = useState('Major Project');
  const [checklistStep, setChecklistStep] = useState(0);

  const interestOptions = [
    'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 
    'Web Development', 'Mobile Apps', 'Cyber Security', 
    'Cloud Computing', 'Blockchain', 'IoT', 'Data Science', 
    'AR/VR', 'DevOps'
  ];

  const languageOptions = ['Python', 'Java', 'C++', 'JavaScript', 'C#', 'PHP', 'Go'];

  const categoryOptions = [
    { title: 'Research Based', desc: 'Focus on novel algorithms and research papers.' },
    { title: 'Industry Based', desc: 'Real-world problem solving with industry standard tools.' },
    { title: 'Mini Project', desc: 'Smaller scope project for semester submissions.' },
    { title: 'Major Project', desc: 'Comprehensive final year capstone project.' }
  ];

  const checklistItems = [
    "Understanding your interests",
    "Matching technologies",
    "Comparing previous projects",
    "Finding trending project ideas",
    "Generating personalized recommendations"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChecklistStep((prev) => (prev < checklistItems.length ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [checklistItems.length]);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleGenerate = () => {
    navigate('/recommendation-results');
  };

  return (
    <main className="flex-grow pt-24 pb-20 min-h-screen bg-slate-50/50 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <div className="mb-12 text-center max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Find Your Perfect Final Year Project
          </h1>
          <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
            Tell us about your interests, skills, and preferences. Our AI will analyze your profile and recommend the most suitable projects tailored specifically for you.
          </p>
          
          {/* Progress Indicator */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Step 1 of 3</span>
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-500/40"></span>
                Preferences
              </div>
              <div className="w-8 h-px bg-gray-200"></div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-400">
                <span className="w-2 h-2 rounded-full bg-transparent border-2 border-gray-300"></span>
                Recommendations
              </div>
              <div className="w-8 h-px bg-gray-200"></div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-400">
                <span className="w-2 h-2 rounded-full bg-transparent border-2 border-gray-300"></span>
                Details
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDE (65%) */}
          <div className="w-full lg:w-[65%]">
            <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-150 relative">
               
               <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                   <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900">Project Preference Form</h2>
               </div>

               <div className="space-y-8">
                 
                 {/* Row 1: Dept & Sem */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">1. Department</label>
                     <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:16px]">
                       <option>Computer Engineering</option>
                       <option>Information Technology</option>
                       <option>Artificial Intelligence & Data Science</option>
                       <option>Electronics</option>
                       <option>Mechanical</option>
                       <option>Civil</option>
                       <option>Electrical</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">2. Semester</label>
                     <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:16px]">
                       <option>5</option>
                       <option>6</option>
                       <option>7</option>
                       <option>8</option>
                     </select>
                   </div>
                 </div>

                 {/* Row 2: Interests */}
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-3">3. Areas of Interest</label>
                   <div className="flex flex-wrap gap-2.5">
                     {interestOptions.map(item => (
                       <button
                         key={item}
                         onClick={() => toggleSelection(item, interests, setInterests)}
                         className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border cursor-pointer active:scale-95 ${
                           interests.includes(item)
                           ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                           : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                         }`}
                       >
                         {item}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Row 3: Programming Languages */}
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-3">4. Programming Languages</label>
                   <div className="flex flex-wrap gap-2.5">
                     {languageOptions.map(item => (
                       <button
                         key={item}
                         onClick={() => toggleSelection(item, languages, setLanguages)}
                         className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border cursor-pointer active:scale-95 ${
                           languages.includes(item)
                           ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                           : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                         }`}
                       >
                         {item}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Row 4: Tech Stack & Difficulty */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">5. Preferred Tech Stack</label>
                     <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] bg-[length:16px]">
                       <option>MERN</option>
                       <option>MEAN</option>
                       <option>React + Firebase</option>
                       <option>Python + Flask</option>
                       <option>Django</option>
                       <option>Node.js</option>
                       <option>Spring Boot</option>
                       <option>Flutter</option>
                     </select>
                   </div>
                   
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">6. Difficulty Level</label>
                     <div className="flex bg-gray-100 p-1 rounded-xl h-11 border border-gray-200">
                        {['Easy', 'Medium', 'Advanced'].map(level => (
                          <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`flex-1 rounded-lg text-sm font-bold transition-all duration-200 ${
                              difficulty === level 
                              ? 'bg-white text-gray-900 shadow-sm' 
                              : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                     </div>
                   </div>
                 </div>

                 {/* Row 5: Team Size */}
                 <div>
                   <div className="flex justify-between items-center mb-3">
                     <label className="block text-sm font-bold text-gray-700">7. Team Size</label>
                     <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{teamSize} Students</span>
                   </div>
                   <input 
                     type="range" 
                     min="1" 
                     max="6" 
                     value={teamSize}
                     onChange={(e) => setTeamSize(e.target.value)}
                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                   />
                   <div className="flex justify-between text-xs font-semibold text-gray-400 mt-2 px-1">
                     <span>1</span>
                     <span>6</span>
                   </div>
                 </div>

                 {/* Row 6: Project Category */}
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-3">8. Project Category</label>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {categoryOptions.map(cat => (
                       <button
                         key={cat.title}
                         onClick={() => setCategory(cat.title)}
                         className={`text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                           category === cat.title
                           ? 'border-blue-600 bg-blue-50/50'
                           : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                         }`}
                       >
                         <div className="flex justify-between items-start mb-1">
                           <h4 className={`text-sm font-bold ${category === cat.title ? 'text-blue-700' : 'text-gray-900'}`}>
                             {cat.title}
                           </h4>
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                             category === cat.title ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-300'
                           }`}>
                             {category === cat.title && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                           </div>
                         </div>
                         <p className="text-xs text-gray-500 font-medium pr-6">{cat.desc}</p>
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Row 7: Additional Requirements */}
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">9. Additional Requirements</label>
                   <textarea 
                     rows="4" 
                     className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium resize-none placeholder-gray-400"
                     placeholder='"I want an AI-based healthcare project using Python and React with moderate difficulty."'
                   ></textarea>
                 </div>

               </div>
            </div>
          </div>

          {/* RIGHT SIDE (35%) */}
          <div className="w-full lg:w-[35%] space-y-6">
            
            {/* AI Illustration Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 rounded-[20px] p-8 shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
               {/* Decorative background vectors */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
               <div className="absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[80px] -top-32 -left-32"></div>
               <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[60px] bottom-0 right-0"></div>
               
               <div className="relative z-10 w-32 h-32 mb-8">
                 <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl animate-pulse"></div>
                 <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-center justify-center shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <BrainCircuit className="w-16 h-16 text-white mb-2 relative z-10 animate-bounce-slow" />
                 </div>
                 
                 {/* Floating accents */}
                 <div className="absolute -top-4 -right-4 w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg border border-indigo-400 animate-float" style={{ animationDelay: '0.4s' }}>
                   <Cpu className="w-5 h-5 text-white" />
                 </div>
                 <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg border border-blue-400 animate-float" style={{ animationDelay: '1.2s' }}>
                   <Database className="w-6 h-6 text-white" />
                 </div>
               </div>
               
               <h3 className="text-xl font-bold text-white mb-2 relative z-10 text-center">AI Recommendation Engine</h3>
               <p className="text-blue-100/80 text-sm text-center relative z-10 font-medium">
                 Our proprietary ML model dynamically cross-references your profile against thousands of verified projects.
               </p>
            </div>

            {/* Glowing Checklist Card */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-150 border-t-[4px] border-t-blue-600 relative">
               <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-[4px] bg-blue-400 blur-sm"></div>
               <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                 <Layers className="w-5 h-5 text-blue-600" />
                 Recommendation Process
               </h3>
               
               <div className="space-y-4">
                 {checklistItems.map((item, idx) => {
                   const isActive = idx === checklistStep % checklistItems.length;
                   const isPast = idx < checklistStep % checklistItems.length;
                   
                   return (
                     <div key={idx} className="flex items-start gap-3 transition-opacity duration-300" style={{ opacity: isPast || isActive ? 1 : 0.4 }}>
                       <div className="mt-0.5 relative flex-shrink-0">
                         {isPast ? (
                           <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                         ) : (
                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-blue-500 box-border' : 'border-gray-200'}`}>
                             {isActive && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>}
                           </div>
                         )}
                       </div>
                       <p className={`text-sm font-semibold transition-colors duration-300 ${
                         isPast ? 'text-gray-900' : isActive ? 'text-blue-700' : 'text-gray-500'
                       }`}>
                         {item}
                       </p>
                     </div>
                   )
                 })}
               </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50 flex items-center justify-between shadow-sm">
               <div className="flex flex-col">
                 <span className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Estimated Time</span>
                 <span className="text-sm font-medium text-gray-600">Generating in <span className="font-bold text-gray-900">5-10 seconds</span></span>
               </div>
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                 <Sparkles className="w-5 h-5 text-blue-500 animate-spin-slow" />
               </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up pb-8">
           <button 
             onClick={handleGenerate}
             className="w-full sm:w-auto py-4 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold transition-all duration-200 shadow-[0_4px_14px_0_rgb(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 active:scale-95 group hover:-translate-y-0.5"
           >
             Generate AI Recommendations
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
           
           <button 
             className="w-full sm:w-auto py-4 px-8 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-2xl text-base font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 hover:bg-gray-50"
           >
             <RefreshCw className="w-4 h-4" />
             Reset Form
           </button>
        </div>

      </div>
    </main>
  );
}
