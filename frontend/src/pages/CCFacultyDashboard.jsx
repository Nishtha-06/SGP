import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Clock, 
  Building,
  Search,
  Filter,
  ChevronRight,
  FileBadge,
  Eye,
  Download,
  Activity,
  History,
  Lock
} from 'lucide-react';

export default function CCFacultyDashboard() {
  const [activeTab, setActiveTab] = useState('Monitored Projects');

  const stats = [
    { label: 'Assigned Groups', value: '18', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Documents Vault', value: '42', icon: FileBadge, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Evaluations Logged', value: '24', icon: History, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const monitoredProjects = [
    { id: 1, title: 'AI-Based Traffic Management', domain: 'AI & ML', phase: 'Development', members: ['Alice S.', 'Bob M.'], guide: 'Dr. Sarah Jenkins' },
    { id: 2, title: 'Blockchain Voting System', domain: 'Blockchain', phase: 'Design', members: ['Charlie K.', 'Diana P.'], guide: 'Prof. Davis' },
    { id: 3, title: 'IoT Smart Farm', domain: 'IoT & Embedded', phase: 'Testing', members: ['Eve R.', 'Frank T.'], guide: 'Dr. Sarah Jenkins' },
  ];

  const documentVault = [
    { id: 101, group: 'AI-Based Traffic Management', document: 'SRS Document v2', submitted: '2 days ago', type: 'PDF' },
    { id: 102, group: 'Blockchain Voting System', document: 'Architecture Diagram', submitted: '5 days ago', type: 'PNG' },
    { id: 103, group: 'IoT Smart Farm', document: 'Mid-term Report', submitted: '1 week ago', type: 'PDF' },
  ];

  const evaluationLogs = [
    { id: 201, project: 'AI-Based Traffic Management', evaluator: 'Dr. Sarah Jenkins', date: '2 days ago', marks: '85/100', comments: 'Solid architecture, but needs more detail on the computer vision models.', document: 'SRS Document v2' },
    { id: 202, project: 'Blockchain Voting System', evaluator: 'Prof. Davis', date: '4 days ago', marks: 'Pending', comments: 'Requested revision for smart contract security analysis.', document: 'Design Proposal' },
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CC Faculty Dashboard</h1>
            </div>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <Building className="w-4 h-4" /> Welcome back, Prof. Alan Turing
            </p>
          </div>
        </div>

        {/* READ-ONLY MONITORING BANNER */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-8 flex items-start gap-3 shadow-sm animate-fade-in-up">
          <div className="p-2 bg-indigo-100 rounded-lg shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-indigo-900 mb-1">Read-Only Monitoring Access</h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              As a CC Faculty member, you have administrative viewing privileges to monitor group progress, view uploaded documents, and track primary faculty evaluations. <strong>You cannot approve projects or edit marks.</strong>
            </p>
          </div>
        </div>

        {/* STATS SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            {['Monitored Projects', 'Document Vault', 'Evaluation Logs'].map((tab) => (
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
          
          {/* MONITORED PROJECTS TAB */}
          {activeTab === 'Monitored Projects' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900">Monitored Student Groups</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search projects..." className="w-full sm:w-auto pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {monitoredProjects.map(project => (
                  <div key={project.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-[0_4px_20px_rgb(37,99,235,0.05)] transition-all bg-gray-50/30 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-base font-bold text-gray-900 max-w-[70%]">{project.title}</h3>
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                        {project.phase}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-5 flex-grow">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Members:</span> {project.members.join(', ')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Primary Guide:</span> {project.guide}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Activity className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Domain:</span> {project.domain}
                      </div>
                    </div>
                    
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold transition-colors mt-auto">
                      View Project Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENT VAULT TAB */}
          {activeTab === 'Document Vault' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-bold text-gray-900">Document Vault (Read-Only)</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      <th className="py-4 px-5">Document Name</th>
                      <th className="py-4 px-5">Project Group</th>
                      <th className="py-4 px-5">Submission Date</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {documentVault.map((doc) => (
                      <tr key={doc.id} className="border-b last:border-b-0 border-gray-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                              <FileText className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="font-bold text-gray-900">{doc.document}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{doc.type}</span>
                          </div>
                        </td>
                        <td className="py-4 px-5 text-gray-600 font-medium">{doc.group}</td>
                        <td className="py-4 px-5 text-gray-500">{doc.submitted}</td>
                        <td className="py-4 px-5">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="View Document">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EVALUATION LOGS TAB */}
          {activeTab === 'Evaluation Logs' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Faculty Evaluation Logs</h2>
              
              <div className="space-y-4">
                {evaluationLogs.map(log => (
                  <div key={log.id} className="border border-gray-100 rounded-xl p-5 hover:border-blue-100 transition-all bg-gray-50/30">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-base font-bold text-gray-900">{log.project}</h3>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Evaluated: {log.document}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Evaluator: <span className="font-semibold text-gray-700">{log.evaluator}</span></span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {log.date}</span>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                          <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Faculty Feedback</h4>
                          <p className="text-sm text-gray-600 italic">"{log.comments}"</p>
                        </div>
                      </div>
                      
                      <div className="md:w-32 flex flex-col items-end shrink-0 pt-2 md:pt-0">
                        <div className="text-right">
                          <p className="text-xs font-semibold text-gray-500 mb-1">Marks Assigned</p>
                          <p className={`text-xl font-bold ${log.marks === 'Pending' ? 'text-amber-600' : 'text-blue-600'}`}>
                            {log.marks}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
