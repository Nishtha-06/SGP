import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  ShieldAlert, 
  Building,
  Check,
  X,
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  FileBadge,
  AlertCircle
} from 'lucide-react';

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('Proposal Approvals');
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const stats = [
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Active Groups', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Documents to Grade', value: '8', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Approved Projects', value: '45', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const pendingProposals = [
    { id: 1, title: 'AI-Based Traffic Management', domain: 'AI & ML', techStack: ['Python', 'OpenCV', 'TensorFlow'], members: ['Alice S.', 'Bob M.'], submitted: '2 days ago' },
    { id: 2, title: 'Blockchain Voting System', domain: 'Blockchain', techStack: ['Solidity', 'React', 'Node.js'], members: ['Charlie K.', 'Diana P.'], submitted: '3 days ago' },
  ];

  const departmentGroups = [
    { id: 101, name: 'Group Alpha', project: 'AI-Based Traffic Management', phase: 'Development', progress: 65, mentor: 'Dr. Sarah Jenkins' },
    { id: 102, name: 'Group Beta', project: 'Blockchain Voting System', phase: 'Design', progress: 30, mentor: 'Prof. Davis' },
    { id: 103, name: 'Group Gamma', project: 'IoT Smart Farm', phase: 'Testing', progress: 85, mentor: 'Dr. Sarah Jenkins' },
  ];

  const documentReviews = [
    { id: 201, group: 'Group Alpha', document: 'SRS Document v2', submitted: '1 day ago', status: 'Pending Review' },
    { id: 202, group: 'Group Gamma', document: 'Mid-term Report', submitted: '4 hours ago', status: 'Pending Review' },
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
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Faculty Dashboard</h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <ShieldAlert className="w-3.5 h-3.5" />
                Department View Restricted: Computer Science
              </span>
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Building className="w-4 h-4" /> Welcome back, Dr. Sarah Jenkins
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
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto hide-scrollbar">
            {['Proposal Approvals', 'Department Groups', 'Document Reviews'].map((tab) => (
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
          
          {/* PROPOSAL APPROVALS TAB */}
          {activeTab === 'Proposal Approvals' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900">Pending Project Proposals</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search proposals..." className="w-full sm:w-auto pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {pendingProposals.map(proposal => (
                <div key={proposal.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-[0_4px_20px_rgb(37,99,235,0.05)] transition-all bg-white">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-base font-bold text-gray-900">{proposal.title}</h3>
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">{proposal.domain}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {proposal.members.join(', ')}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Submitted {proposal.submitted}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proposal.techStack.map(tech => (
                          <span key={tech} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-200">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 lg:flex-col lg:justify-center shrink-0">
                      <button className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 border border-emerald-200 rounded-lg text-sm font-semibold transition-colors">
                        <Check className="w-4 h-4" /> Approve Project
                      </button>
                      <button 
                        onClick={() => { setSelectedProposal(proposal); setIsRevisionModalOpen(true); }}
                        className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300 border border-amber-200 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" /> Request Revision
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DEPARTMENT GROUPS TAB */}
          {activeTab === 'Department Groups' && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Active Department Groups</h2>
                <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
                  View All Analytics <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      <th className="py-4 px-5">Group Name</th>
                      <th className="py-4 px-5">Project Title</th>
                      <th className="py-4 px-5">Assigned Mentor</th>
                      <th className="py-4 px-5">Current Phase</th>
                      <th className="py-4 px-5">Overall Progress</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {departmentGroups.map((group) => (
                      <tr key={group.id} className="border-b last:border-b-0 border-gray-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5 font-bold text-gray-900">{group.name}</td>
                        <td className="py-4 px-5 text-gray-600 font-medium">{group.project}</td>
                        <td className="py-4 px-5 text-gray-600">{group.mentor}</td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            {group.phase}
                          </span>
                        </td>
                        <td className="py-4 px-5 min-w-[150px]">
                          <div className="flex items-center gap-3">
                            <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${group.progress}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-gray-700 w-8">{group.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DOCUMENT REVIEWS TAB */}
          {activeTab === 'Document Reviews' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Document Reviews</h2>
              
              {documentReviews.map(doc => (
                <div key={doc.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 transition-all bg-gray-50/30">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    
                    <div className="flex-grow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                          <FileBadge className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{doc.document}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">Submitted by <span className="font-semibold text-gray-700">{doc.group}</span> &bull; {doc.submitted}</p>
                        </div>
                      </div>
                      
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Assign Marks (Optional)</label>
                          <input type="number" placeholder="e.g. 85" className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Status Action</label>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">Approve</button>
                            <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">Revise</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Feedback / Suggestions</label>
                        <textarea rows="2" placeholder="Enter grading comments here..." className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                      </div>
                    </div>
                    
                    <div className="md:w-48 flex flex-col justify-end shrink-0 pt-4 md:pt-0">
                      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-semibold transition-colors mb-3">
                        View Document <ChevronRight className="w-4 h-4" />
                      </button>
                      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                        Submit Evaluation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* REVISION MODAL */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" /> Request Revision
              </h3>
              <button onClick={() => setIsRevisionModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Please provide detailed feedback for <span className="font-bold text-gray-900">{selectedProposal?.title}</span>. The group will be notified to make changes and resubmit.
              </p>
              <textarea 
                rows="4" 
                placeholder="What needs to be revised?" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              ></textarea>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button onClick={() => setIsRevisionModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsRevisionModalOpen(false)} className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
