import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Network, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Brain, 
  Laptop,
  FolderOpen
} from 'lucide-react';

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (roleTitle) => {
    navigate('/login', { state: { role: roleTitle } });
  };

  const roles = [
    {
      title: "Student",
      icon: GraduationCap,
      description: "Access AI-powered project recommendations, manage your profile, bookmark projects, upload documents, and track your final year project progress.",
      features: ["AI Recommendations", "Saved Projects", "Project Timeline", "Progress Tracking"],
      buttonText: "Continue as Student",
    },
    {
      title: "Faculty Guide",
      icon: Users,
      description: "Review assigned student projects, approve recommendations, monitor milestones, provide feedback, and evaluate progress.",
      features: ["Student Monitoring", "Project Approval", "Feedback System", "Reports"],
      buttonText: "Continue as Faculty",
    },
    {
      title: "CC Faculty",
      icon: Network,
      description: "Manage departments, oversee faculty assignments, monitor project approvals, and generate departmental analytics.",
      features: ["Faculty Allocation", "Project Monitoring", "Department Analytics", "Approval Workflow"],
      buttonText: "Continue as CC Faculty",
    },
    {
      title: "Administrator",
      icon: ShieldCheck,
      description: "Manage the complete AI ProjectHub platform, users, departments, AI recommendation settings, permissions, and system reports.",
      features: ["User Management", "Department Management", "AI Configuration", "Analytics Dashboard"],
      buttonText: "Continue as Admin",
    }
  ];

  return (
    <main className="flex-grow pt-24 pb-20 relative overflow-hidden bg-slate-50/30 min-h-screen flex flex-col items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Floating Academic/AI Illustrations (Subtle & Low Opacity) */}
      <div className="absolute top-40 left-32 opacity-10 animate-float pointer-events-none">
        <Brain className="w-24 h-24 text-blue-600" />
      </div>
      <div className="absolute bottom-52 left-20 opacity-10 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <Laptop className="w-20 h-20 text-indigo-600" />
      </div>
      <div className="absolute top-32 right-32 opacity-10 animate-float pointer-events-none" style={{ animationDelay: '1s' }}>
        <GraduationCap className="w-28 h-28 text-blue-600" />
      </div>
      <div className="absolute bottom-40 right-40 opacity-10 animate-float pointer-events-none" style={{ animationDelay: '3s' }}>
        <FolderOpen className="w-16 h-16 text-indigo-600" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Choose Your Role
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Select how you want to access AI ProjectHub. Each role has personalized features and a dedicated dashboard.
          </p>
        </div>

        {/* MAIN SECTION: Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div 
                key={idx}
                onClick={() => handleRoleSelect(role.title)}
                className="group flex flex-col bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-150 transition-all duration-300 hover:shadow-[0_20px_50px_rgb(37,99,235,0.1)] hover:-translate-y-1 hover:border-blue-400 cursor-pointer overflow-hidden relative"
              >
                {/* Active Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                      <Icon className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {role.title}
                    </h2>
                  </div>

                  <p className="text-gray-500 font-medium text-[15px] leading-relaxed mb-8 flex-grow">
                    {role.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8">
                    {role.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="text-sm font-semibold text-gray-700 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-auto py-3.5 px-6 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 group-hover:shadow-[0_4px_14px_0_rgb(37,99,235,0.39)]">
                    {role.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SECTION: Secure Info Box */}
        <div className="flex justify-center w-full">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[20px] p-6 max-w-2xl w-full shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-gray-200">
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                Secure Role-Based Access
              </h4>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Each user role has secure authentication and personalized access to features based on responsibilities within the Final Year Project Management System.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
