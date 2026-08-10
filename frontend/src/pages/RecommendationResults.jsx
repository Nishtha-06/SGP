import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bot, CheckCircle2, Clock, Cloud, Search, Sparkles, Users, X, Zap } from 'lucide-react';
import { generateRecommendations } from '../services/recommendationApi';

const categories = ['All', 'AI / ML', 'Web', 'Cloud', 'IoT', 'Blockchain', 'Cyber Security'];
const projectIcons = [Bot, Cloud, Zap];
const categoryTerms = {
  'AI / ML': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'computer vision', 'nlp'],
  Web: ['web', 'react', 'node', 'javascript', 'frontend', 'backend', 'mern'],
  Cloud: ['cloud', 'aws', 'azure', 'firebase', 'serverless'],
  IoT: ['iot', 'internet of things', 'sensor', 'arduino', 'raspberry pi'],
  Blockchain: ['blockchain', 'web3', 'ethereum', 'smart contract'],
  'Cyber Security': ['cyber', 'security', 'encryption', 'authentication', 'network'],
};
const defaultPreferences = {
  groupSize: 4,
  preferredTech: { stack: 'MERN', languages: [] },
  difficultyLevel: 'Medium',
  projectDomain: ['Social Impact'],
  previouslyApprovedProjects: [],
};

export default function RecommendationResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const preferences = location.state?.preferences || defaultPreferences;

  useEffect(() => {
    const controller = new AbortController();
    generateRecommendations(preferences, controller.signal)
      .then((generatedProjects) => {
        setProjects(generatedProjects);
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [preferences]);

  const visibleProjects = projects.filter((project) => {
    const query = searchQuery.trim().toLowerCase();
    const searchableText = [
      project.title,
      project.problemStatement,
      project.objective,
      project.difficultyLevel,
      ...(project.recommendedTechnologies || []),
      ...(project.expectedOutcomes || []),
    ].filter(Boolean).join(' ').toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const categoryText = [
      project.title,
      project.problemStatement,
      project.objective,
      ...(project.recommendedTechnologies || []),
    ].filter(Boolean).join(' ').toLowerCase();
    const matchesCategory = activeTab === 'All' || categoryTerms[activeTab]?.some((term) => categoryText.includes(term));
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-grow pt-24 pb-12 min-h-screen bg-slate-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">AI Project Recommendations</h1>
          <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-4xl mb-4">
            Live recommendations generated from your group preferences and approved-project history.
          </p>
          {!isLoading && !error && (
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-4 py-2 border border-gray-200 rounded-full w-fit shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {visibleProjects.length} Personalized Recommendations Found
            </div>
          )}
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
            <h2 className="text-lg font-bold text-gray-900">Generating your recommendations...</h2>
            <p className="mt-2 text-sm text-gray-500">Groq is matching your preferences with socially impactful project ideas.</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-red-100 text-center">
            <h2 className="text-lg font-bold text-gray-900">Recommendations could not be generated</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <button onClick={() => navigate('/recommendations')} className="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700">
              Update Preferences
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search title, technology, objective..." className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {searchQuery && <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"><X className="h-4 w-4" /></button>}
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button key={category} onClick={() => setActiveTab(category)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {visibleProjects.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <p className="text-gray-500 font-medium">No generated projects match this search or category.</p>
                {(searchQuery || activeTab !== 'All') && <button onClick={() => { setSearchQuery(''); setActiveTab('All'); }} className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">Clear filters</button>}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((project, index) => {
                  const ProjectIcon = projectIcons[index % projectIcons.length];
                  return (
                    <article key={`${project.title}-${index}`} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                          <ProjectIcon className="w-7 h-7 text-indigo-600" />
                        </div>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">AI Generated</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{project.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">{project.difficultyLevel}</span>
                        {project.recommendedTechnologies?.slice(0, 4).map((technology) => (
                          <span key={technology} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{technology}</span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mb-5 flex-grow leading-relaxed">{project.problemStatement}</p>
                      <div className="space-y-3 border-t border-gray-100 pt-4 mb-5">
                        <div>
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Objective</p>
                          <p className="text-sm text-gray-700 mt-1">{project.objective}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700"><Clock className="w-4 h-4 text-blue-600" />{project.estimatedTimeline}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-700"><Users className="w-4 h-4 text-blue-600" />Group of {preferences.groupSize}</div>
                      </div>
                      <button onClick={() => navigate('/project-details', { state: { project, groupSize: preferences.groupSize } })} className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all">
                        View Details
                      </button>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="bg-blue-900 text-white rounded-2xl p-8 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-blue-200" />
              <h2 className="text-2xl font-bold mb-2">Need More Ideas?</h2>
              <p className="text-blue-200 mb-6">Adjust your preferences to generate a fresh set of unique projects.</p>
              <button onClick={() => navigate('/recommendations')} className="bg-white text-blue-700 hover:bg-blue-50 py-3 px-6 rounded-xl font-bold">Generate New Recommendations</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
