import { useState, useEffect, useCallback } from 'react';
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
  Target,
  RefreshCw,
  Users,
  Code,
  BookOpen,
  Award
} from 'lucide-react';
import { getAdminAnalytics, getAiRules, updateAiRules } from '../services/adminApi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Institution Analytics');
  
  // Analytics API State
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = useCallback(() => {
    setLoading(true);
    setError('');
    getAdminAnalytics()
      .then((data) => setAnalytics(data))
      .catch((err) => setError(err.message || 'Failed to load institution analytics.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let ignore = false;
    getAdminAnalytics()
      .then((data) => {
        if (!ignore) {
          setAnalytics(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message || 'Failed to load institution analytics.');
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  // AI Rule State
  const [prioritizeInterdisciplinaryTeams, setPrioritizeInterdisciplinaryTeams] = useState(false);
  const [includeSocialImpactScore, setIncludeSocialImpactScore] = useState(false);
  const [allowExternalProblemStatements, setAllowExternalProblemStatements] = useState(false);
  const [maxRecommendations, setMaxRecommendations] = useState(3);
  const [savingRules, setSavingRules] = useState(false);
  const [ruleMessage, setRuleMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    let ignore = false;
    getAiRules()
      .then((data) => {
        if (!ignore && data?.rules) {
          if (data.rules.prioritizeInterdisciplinaryTeams !== undefined) setPrioritizeInterdisciplinaryTeams(data.rules.prioritizeInterdisciplinaryTeams);
          if (data.rules.includeSocialImpactScore !== undefined) setIncludeSocialImpactScore(data.rules.includeSocialImpactScore);
          if (data.rules.allowExternalProblemStatements !== undefined) setAllowExternalProblemStatements(data.rules.allowExternalProblemStatements);
          if (data.rules.maxRecommendations !== undefined) setMaxRecommendations(data.rules.maxRecommendations);
        }
      })
      .catch((err) => console.error("Failed to load AI rules", err));
    return () => { ignore = true; };
  }, []);

  const handleSaveRules = async () => {
    setSavingRules(true);
    setRuleMessage({ type: '', text: '' });
    try {
      let maxRec = Number(maxRecommendations);
      if (isNaN(maxRec) || maxRec < 1) maxRec = 1;
      if (maxRec > 10) maxRec = 10;
      await updateAiRules({
        prioritizeInterdisciplinaryTeams,
        includeSocialImpactScore,
        allowExternalProblemStatements,
        maxRecommendations: maxRec
      });
      setRuleMessage({ type: 'success', text: 'AI configuration saved successfully.' });
      setTimeout(() => setRuleMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setRuleMessage({ type: 'error', text: err.message || 'Failed to save rules.' });
    } finally {
      setSavingRules(false);
    }
  };

  const stats = [
    {
      label: 'Total Projects',
      value: loading ? '—' : (analytics?.totals?.projects ?? 0),
      icon: Database,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Participating Depts',
      value: loading ? '—' : (analytics?.totals?.departments ?? 0),
      icon: Building,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100'
    },
    {
      label: 'AI Rule Status',
      value: 'Configured',
      icon: Zap,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    },
    {
      label: 'Repeat Prevented',
      value: 'N/A',
      icon: Shield,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
  ];

  const archiveProjects = [
    { id: 1, year: '2024-2025', title: 'Smart Parking System', dept: 'Computer Science', tech: ['IoT', 'Python', 'React'] },
    { id: 2, year: '2023-2024', title: 'Hospital Management System', dept: 'Information Tech', tech: ['Java', 'MySQL'] },
    { id: 3, year: '2023-2024', title: 'E-Commerce Chatbot', dept: 'Computer Science', tech: ['NLP', 'Node.js'] },
    { id: 4, year: '2022-2023', title: 'Attendance via Face Rec.', dept: 'Artificial Intelligence', tech: ['OpenCV', 'Python'] },
  ];

  // Derived metrics for visualizations
  const depts = analytics?.projectsByDepartment || [];
  const maxDeptCount = depts.reduce((max, d) => Math.max(max, d.count || 0), 0) || 1;

  const techList = analytics?.technologyPopularity || [];
  const totalTechMentions = techList.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const pillColors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-slate-100 text-slate-800 border-slate-200',
  ];

  const diffList = analytics?.difficultyDistribution || [];
  const totalDiffCount = diffList.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const diffColorMap = {
    Easy: { bar: 'bg-emerald-400' },
    Medium: { bar: 'bg-amber-400' },
    Advanced: { bar: 'bg-rose-400' },
  };

  const approvalRate = analytics?.approvalStatistics?.approvalRate ?? 0;
  const approvedCount = analytics?.approvalStatistics?.approved ?? 0;
  const totalProjectsCount = analytics?.approvalStatistics?.total ?? 0;
  const pendingCount = analytics?.approvalStatistics?.pending ?? 0;
  const revisionsCount = analytics?.approvalStatistics?.revisions ?? 0;

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
                <p className={`text-2xl font-bold ${stat.value === 'Configured' ? 'text-emerald-600' : 'text-gray-900'}`}>{stat.value}</p>
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
                <button 
                  onClick={fetchAnalytics} 
                  disabled={loading}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>

              {/* Error Message with Retry */}
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                  <button
                    onClick={fetchAnalytics}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Retry
                  </button>
                </div>
              )}

              {/* Loading State */}
              {loading && !analytics && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-3" />
                  <p className="text-sm font-semibold">Loading analytics...</p>
                </div>
              )}

              {/* Analytics Grid */}
              {(!loading || analytics) && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department-wise Projects */}
                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Department-wise Projects</h3>
                        <span className="text-xs font-semibold text-gray-500">{depts.length} Department{depts.length === 1 ? '' : 's'}</span>
                      </div>
                      {depts.length === 0 ? (
                        <p className="text-sm text-gray-400 py-6 text-center">No department project data available.</p>
                      ) : (
                        <div className="space-y-4">
                          {depts.map((item) => (
                            <div key={item.department}>
                              <div className="flex justify-between text-sm mb-1.5">
                                <span className="font-semibold text-gray-700 truncate pr-2">{item.department}</span>
                                <span className="text-gray-500 font-medium shrink-0">{item.count}</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                                  style={{ width: `${Math.round(((item.count || 0) / maxDeptCount) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Popularity */}
                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tech Stack Popularity</h3>
                        <span className="text-xs font-semibold text-gray-500">{techList.length} Technolog{techList.length === 1 ? 'y' : 'ies'}</span>
                      </div>
                      {techList.length === 0 ? (
                        <p className="text-sm text-gray-400 py-6 text-center">No technology popularity data available.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {techList.map((item, idx) => {
                            const pct = totalTechMentions > 0 ? Math.round(((item.count || 0) / totalTechMentions) * 100) : 0;
                            return (
                              <span 
                                key={item.technology} 
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${pillColors[idx % pillColors.length]}`}
                                title={`${item.count} project mention(s)`}
                              >
                                {item.technology} <span className="font-normal opacity-75">({pct}%)</span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Difficulty Distribution */}
                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Difficulty Distribution</h3>
                        <span className="text-xs font-semibold text-gray-500">{totalDiffCount} Project{totalDiffCount === 1 ? '' : 's'}</span>
                      </div>
                      {diffList.length === 0 ? (
                        <p className="text-sm text-gray-400 py-6 text-center">No difficulty distribution data available.</p>
                      ) : (
                        <div className="flex items-end justify-around h-32 gap-3 mt-4 px-4">
                          {diffList.map((item) => {
                            const pct = totalDiffCount > 0 ? Math.round(((item.count || 0) / totalDiffCount) * 100) : 0;
                            const style = diffColorMap[item.difficulty] || { bar: 'bg-blue-400' };
                            return (
                              <div key={item.difficulty} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
                                <span className="text-xs font-bold text-gray-700">{pct}%</span>
                                <div 
                                  className={`w-full ${style.bar} rounded-t-md transition-all duration-500`}
                                  style={{ height: `${Math.max(pct, 6)}%` }}
                                  title={`${item.difficulty}: ${item.count} project(s)`}
                                ></div>
                                <span className="text-xs font-semibold text-gray-600 truncate max-w-full text-center">
                                  {item.difficulty} <span className="text-gray-400">({item.count})</span>
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Global Approval Rate */}
                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors flex flex-col justify-center items-center">
                      <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider w-full text-left">Global Approval Rate</h3>
                      <div className="relative w-32 h-32 flex items-center justify-center my-1">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="9" className="text-gray-200" fill="transparent" />
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            stroke="currentColor"
                            strokeWidth="9"
                            strokeDasharray={2 * Math.PI * 38}
                            strokeDashoffset={2 * Math.PI * 38 * (1 - Math.min(Math.max(approvalRate, 0), 100) / 100)}
                            strokeLinecap="round"
                            className="text-blue-600 transition-all duration-700"
                            fill="transparent"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold text-gray-900">{approvalRate}%</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Approval</span>
                        </div>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-2 space-y-0.5">
                        <p><span className="font-semibold text-emerald-600">{approvedCount} approved</span> of <span className="font-semibold text-gray-700">{totalProjectsCount} total</span></p>
                        <p className="text-gray-400">{pendingCount} pending • {revisionsCount} revisions</p>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Review Statistics */}
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" /> Faculty Review Statistics
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        {(analytics?.facultyReviewStatistics || []).length} Active Reviewers
                      </span>
                    </div>

                    {(!analytics?.facultyReviewStatistics || analytics.facultyReviewStatistics.length === 0) ? (
                      <p className="text-sm text-gray-400 py-6 text-center">No faculty review activity recorded yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase bg-gray-100/60">
                              <th className="py-2.5 px-4 rounded-l-lg">Faculty Reviewer</th>
                              <th className="py-2.5 px-4 text-center">Total Reviews</th>
                              <th className="py-2.5 px-4 text-center">Approved</th>
                              <th className="py-2.5 px-4 text-center">Revisions Required</th>
                              <th className="py-2.5 px-4 text-center rounded-r-lg">Avg Marks</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {analytics.facultyReviewStatistics.map((stat) => (
                              <tr key={stat.facultyId} className="hover:bg-white/80 transition-colors">
                                <td className="py-3 px-4 font-semibold text-gray-800">{stat.facultyName}</td>
                                <td className="py-3 px-4 text-center font-bold text-gray-700">{stat.totalReviews}</td>
                                <td className="py-3 px-4 text-center">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {stat.approved}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    {stat.revisions}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center font-semibold text-gray-700">
                                  {stat.averageMarks !== null && stat.averageMarks !== undefined ? `${stat.averageMarks} / 100` : 'N/A'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Student Interest Trends */}
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 hover:border-blue-100 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-600" /> Student Interest Trends
                      </h3>
                      <span className="text-xs text-gray-500 font-medium">Aggregated from student profiles</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Tech Interests */}
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-xs">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-blue-600" /> Technology Interests
                        </h4>
                        {(!analytics?.studentInterestTrends?.technologies || analytics.studentInterestTrends.technologies.length === 0) ? (
                          <p className="text-xs text-gray-400 py-3 text-center">No data</p>
                        ) : (
                          <div className="space-y-2">
                            {analytics.studentInterestTrends.technologies.map((item) => (
                              <div key={item.interest} className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-gray-700 truncate pr-2">{item.interest}</span>
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold border border-blue-200">
                                  {item.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Areas of Interest */}
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-xs">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Areas of Interest
                        </h4>
                        {(!analytics?.studentInterestTrends?.areas || analytics.studentInterestTrends.areas.length === 0) ? (
                          <p className="text-xs text-gray-400 py-3 text-center">No data</p>
                        ) : (
                          <div className="space-y-2">
                            {analytics.studentInterestTrends.areas.map((item) => (
                              <div key={item.interest} className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-gray-700 truncate pr-2">{item.interest}</span>
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-bold border border-indigo-200">
                                  {item.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-xs">
                        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-600" /> Skills
                        </h4>
                        {(!analytics?.studentInterestTrends?.skills || analytics.studentInterestTrends.skills.length === 0) ? (
                          <p className="text-xs text-gray-400 py-3 text-center">No data</p>
                        ) : (
                          <div className="space-y-2">
                            {analytics.studentInterestTrends.skills.map((item) => (
                              <div key={item.interest} className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-gray-700 truncate pr-2">{item.interest}</span>
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-200">
                                  {item.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                
                {/* Toggles */}
                <div className="space-y-6 p-6 border border-gray-100 rounded-xl bg-gray-50/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Prioritize Interdisciplinary Teams</h3>
                      <p className="text-xs text-gray-500 mt-1">Favor project recommendations that cross multiple domains.</p>
                    </div>
                    <button onClick={() => setPrioritizeInterdisciplinaryTeams(!prioritizeInterdisciplinaryTeams)}>
                      {prioritizeInterdisciplinaryTeams ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                    </button>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Include Social Impact Score</h3>
                      <p className="text-xs text-gray-500 mt-1">Factor in societal benefit when generating recommendations.</p>
                    </div>
                    <button onClick={() => setIncludeSocialImpactScore(!includeSocialImpactScore)}>
                      {includeSocialImpactScore ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                    </button>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">Allow External Problem Statements</h3>
                      <p className="text-xs text-gray-500 mt-1">Permit students to bring problems from industry sponsors.</p>
                    </div>
                    <button onClick={() => setAllowExternalProblemStatements(!allowExternalProblemStatements)}>
                      {allowExternalProblemStatements ? <ToggleRight className="w-10 h-10 text-emerald-500" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                    </button>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-6 p-6 border border-gray-100 rounded-xl bg-gray-50/30">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-2">Max Recommendations</h3>
                    <p className="text-xs text-gray-500 mb-3">Number of project ideas to generate (1 to 10).</p>
                    <input 
                      type="number" 
                      min="1" max="10" 
                      value={maxRecommendations}
                      onChange={(e) => setMaxRecommendations(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-4 items-center gap-4">
                {ruleMessage.text && (
                  <span className={`text-sm font-semibold ${ruleMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {ruleMessage.text}
                  </span>
                )}
                <button 
                  onClick={handleSaveRules}
                  disabled={savingRules}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2"
                >
                  {savingRules ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Target className="w-4 h-4" />
                  )}
                  {savingRules ? 'Saving...' : 'Save Configuration'}
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
