import { useState } from 'react';
import { 
  Bot, 
  FileText, 
  Calendar, 
  Users, 
  FileCheck, 
  Bell, 
  Plus, 
  Video, 
  Upload, 
  CalendarDays,
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Welcome Back, Student Name 👋
          </h1>
          <p className="text-gray-500 font-medium">
            Track your final year project journey from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* MAIN CONTENT - left 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Tabs Navigation */}
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
              {['Overview', 'Group Status', 'Documents'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'Overview' && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Progress Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-900">Current Phase</h3>
                    <span className="text-sm font-semibold text-blue-600">Phase 1: Ideation</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Active Proposal Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 border border-indigo-100">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Active Proposal</h3>
                    <p className="text-base font-semibold text-blue-600 mb-3 truncate">Smart Campus Navigation</p>
                    
                    <div className="space-y-4 mb-6 flex-grow text-sm">
                      <div className="flex justify-between items-center text-gray-600">
                        <span className="font-medium">Status</span>
                        <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Reviewing</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600">
                        <span className="font-medium">Faculty Guide</span>
                        <span className="font-semibold text-gray-900">Dr. Smith</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1 text-gray-600">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 rounded-xl text-sm font-semibold text-gray-700 transition-colors duration-200 flex items-center justify-center gap-2">
                      View Proposal
                    </button>
                  </div>

                  {/* Next Milestone Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-100">
                      <Calendar className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Next Milestone</h3>
                    <p className="text-base font-semibold text-emerald-600 mb-4">Phase 1 Submission</p>
                    
                    <div className="space-y-3 mb-6 flex-grow text-sm">
                      <div className="flex justify-between items-center text-gray-600">
                        <span className="font-medium">Due Date</span>
                        <span className="font-semibold text-gray-900">Oct 15, 2026</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-600">
                        <span className="font-medium">Remaining</span>
                        <span className="font-bold text-red-500 bg-red-50 px-2.5 py-0.5 rounded-full text-xs">5 Days</span>
                      </div>
                      <div className="pt-2">
                         <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                            <AlertCircle className="w-4 h-4" />
                            Almost there! Keep it up.
                         </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 rounded-xl text-sm font-semibold text-gray-700 transition-colors duration-200 flex items-center justify-center gap-2">
                      View Timeline
                    </button>
                  </div>

                  {/* Notifications Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center border border-rose-100">
                        <Bell className="w-6 h-6 text-rose-600" />
                      </div>
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                    
                    <div className="space-y-3 mb-6 flex-grow">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm">
                        <p className="font-semibold text-gray-900 mb-0.5">Faculty Feedback</p>
                        <p className="text-gray-500 text-xs">Dr. Smith reviewed your proposal outline.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm">
                        <p className="font-semibold text-gray-900 mb-0.5">Upcoming Deadline</p>
                        <p className="text-gray-500 text-xs">Phase 1 submission is due in 5 days.</p>
                      </div>
                    </div>
                    
                    <button className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-gray-300 rounded-xl text-sm font-semibold text-gray-700 transition-colors duration-200 flex items-center justify-center gap-2">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Group Status' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Group Status</h3>
                        <p className="text-sm text-gray-500">Manage your project team</p>
                      </div>
                    </div>
                    <button className="py-2 px-4 bg-purple-50 hover:bg-purple-600 text-purple-600 hover:text-white rounded-xl text-sm font-semibold transition-colors duration-200 flex items-center gap-2 self-start sm:self-auto">
                      <Plus className="w-4 h-4" />
                      Invite Members
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">A</div>
                        <div>
                          <p className="font-semibold text-gray-900">Alice Brown</p>
                          <p className="text-gray-500 text-xs">alice.brown@example.com</p>
                        </div>
                      </div>
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Leader</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">S</div>
                        <div>
                          <p className="font-semibold text-gray-900">Student Name</p>
                          <p className="text-gray-500 text-xs">student@example.com</p>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Member</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
                      <span className="text-gray-500 font-medium">Available Slot</span>
                      <span className="text-gray-400 text-xs font-semibold">Pending Invite</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
                      <span className="text-gray-500 font-medium">Available Slot</span>
                      <span className="text-gray-400 text-xs font-semibold">Empty</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-gray-600 text-sm">
                      <span className="font-medium">Faculty Guide</span>
                      <span className="font-semibold text-gray-900">Dr. Smith</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Documents' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100">
                      <FileCheck className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Documents & Submissions</h3>
                      <p className="text-sm text-gray-500">Manage all your project files</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-teal-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-teal-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Project Proposal v1.2</h4>
                          <p className="text-xs text-gray-500 flex items-center gap-2">
                            Submitted Sep 28, 2026 
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-green-600 font-semibold flex items-center gap-1"><FileCheck className="w-3 h-3" /> Approved</span>
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-blue-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">Literature Review Draft</h4>
                          <p className="text-xs text-gray-500 flex items-center gap-2">
                            Last modified 2 days ago
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-amber-600 font-semibold">Draft</span>
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOTTOM: Recent Activity Timeline */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CalendarDays className="w-6 h-6 text-blue-600" />
                Recent Activity Timeline
              </h3>
              
              <div className="relative border-l-2 border-gray-100 ml-3 md:ml-4 space-y-8 pb-4">
                
                {/* Item 1 */}
                <div className="relative pl-6 md:pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-900">Meeting Scheduled</h4>
                    <span className="text-xs font-semibold text-gray-400">Today, 10:00 AM</span>
                  </div>
                  <p className="text-sm text-gray-500">Virtual meeting with Dr. Smith via Google Meet.</p>
                </div>
                
                {/* Item 2 */}
                <div className="relative pl-6 md:pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-900">Recommendation Generated</h4>
                    <span className="text-xs font-semibold text-gray-400">Yesterday, 02:30 PM</span>
                  </div>
                  <p className="text-sm text-gray-500">AI generated 5 new project ideas based on 'Machine Learning'.</p>
                </div>

                {/* Item 3 */}
                <div className="relative pl-6 md:pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-white"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-900">Guide Approved</h4>
                    <span className="text-xs font-semibold text-gray-400">Sep 25, 2026</span>
                  </div>
                  <p className="text-sm text-gray-500">Dr. Smith accepted your request to be the guide.</p>
                </div>

                {/* Item 4 */}
                <div className="relative pl-6 md:pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 ring-4 ring-white"></span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-gray-900">Proposal Submitted</h4>
                    <span className="text-xs font-semibold text-gray-400">Sep 20, 2026</span>
                  </div>
                  <p className="text-sm text-gray-500">Initial project proposal document uploaded successfully.</p>
                </div>

              </div>
            </div>
            
          </div>

          {/* RIGHT SIDEBAR - Quick Actions */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8">
            <div className="sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Plus className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">Create New Proposal</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                      <Video className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">Book Meeting</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                      <Upload className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">Upload Document</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <CalendarDays className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">View Calendar</span>
                  </div>
                </button>
              </div>

              {/* Info Widget */}
              <div className="mt-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
                <h4 className="font-bold mb-2 relative z-10">Need Help?</h4>
                <p className="text-blue-100 text-sm mb-4 relative z-10 leading-relaxed">
                  Stuck with something? Check out our quick guides or reach out to support.
                </p>
                <button className="bg-white text-blue-600 text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors relative z-10 w-full">
                  Help Center
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
