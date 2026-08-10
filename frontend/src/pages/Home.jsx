import { useState } from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Brain, Workflow, UserCheck, Sparkles, Search, BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample projects data for the interactive recommendation engine
  const databaseProjects = [
    {
      id: 1,
      title: "Self-Optimizing Smart Traffic Management System",
      domain: "AI & ML",
      difficulty: "Advanced",
      duration: "6 Months",
      description: "Utilizes reinforcement learning and computer vision to coordinate traffic light sync lines based on real-time vehicle density.",
      skills: ["Python", "PyTorch", "OpenCV", "Reinforcement Learning"]
    },
    {
      id: 2,
      title: "Decentralized University Credential Verifier",
      domain: "Blockchain",
      difficulty: "Medium",
      duration: "4 Months",
      description: "A secure digital ledger portal for issuing and verifying academic transcripts, certs, and student achievement badges.",
      skills: ["Solidity", "React", "Web3JS", "Cryptography"]
    },
    {
      id: 3,
      title: "Real-time Patient Monitoring Wearable Dashboard",
      domain: "IoT & Embedded",
      difficulty: "Medium",
      duration: "5 Months",
      description: "Collects pulse, temperature, and ECG telemetry from IoT modules, plotting live charts with threshold alerts.",
      skills: ["Raspberry Pi", "Node.js", "WebSockets", "MQTT"]
    },
    {
      id: 4,
      title: "Autonomous Code Vulnerability Scanner & Patcher",
      domain: "Cybersecurity",
      difficulty: "Advanced",
      duration: "6 Months",
      description: "An LLM-driven assistant that scans code repositories, flags OWASP Top 10 exploits, and submits auto-generated fix PRs.",
      skills: ["AI Models", "Git API", "Python", "Static Analysis"]
    },
    {
      id: 5,
      title: "Collaborative Agile Kanban with Built-in CI/CD Simulator",
      domain: "Software Engineering",
      difficulty: "Easy",
      duration: "3 Months",
      description: "A task tracking application geared towards student scrum teams, complete with integrated virtual deploy pipelines.",
      skills: ["React", "Tailwind", "Express.js", "Docker"]
    },
    {
      id: 6,
      title: "Multimodal AI Study Companion & Note Distiller",
      domain: "AI & ML",
      difficulty: "Medium",
      duration: "4 Months",
      description: "Ingests lecture audio/PDF notes, producing structured summaries, flashcards, and answering contextual queries.",
      skills: ["Next.js", "Gemini API", "Pinecone VectorDB", "Python"]
    }
  ];

  const domains = ['All', 'AI & ML', 'Software Engineering', 'Cybersecurity', 'IoT & Embedded', 'Blockchain'];

  // Filtering recommendation logic
  const filteredProjects = databaseProjects.filter(project => {
    const matchesDomain = selectedDomain === 'All' || project.domain === selectedDomain;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <main className="flex-grow pt-16">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Feature Section */}
      <section id="features" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 text-sm font-semibold tracking-wider uppercase bg-blue-50 px-3 py-1.5 rounded-full">
              Core Capabilities
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
              Designed to Streamline Your Project Journey
            </h2>
            <p className="mt-4 text-lg text-gray-500 font-normal">
              Everything university students and faculty coordinators need to collaborate from ideation to final submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: AI Matching */}
            <FeatureCard 
              title="AI Matching" 
              description="Matching AI technology with student skills to recommend suitable projects."
            >
              <Brain className="w-6 h-6" />
            </FeatureCard>

            {/* Card 2: Workflow Tracking */}
            <FeatureCard 
              title="Workflow Tracking" 
              description="Track project progress, milestones, and development workflow."
            >
              <Workflow className="w-6 h-6" />
            </FeatureCard>

            {/* Card 3: Faculty Review */}
            <FeatureCard 
              title="Faculty Review" 
              description="Faculty members review proposals and guide project development."
            >
              <UserCheck className="w-6 h-6" />
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* 4. Interactive Live Recommendations Hub */}
      <section id="explore" className="py-20 bg-slate-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold tracking-wider uppercase bg-blue-50 px-3 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Interactive Hub</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
              Find Your Masterpiece Project
            </h2>
            <p className="mt-4 text-lg text-gray-500 font-normal">
              Filter by domains or perform searches keying in your skills to view AI curated proposals instantly.
            </p>
          </div>

          {/* Controller Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white p-4 rounded-xl border border-gray-150 shadow-xs">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedDomain === domain
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>

            {/* Search Bar Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search skills e.g., React, Python..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Recommendation Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                  <div>
                    {/* Badge Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {project.domain}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    
                    {/* Project Title */}
                    <h4 className="text-[17px] font-bold text-gray-900 leading-snug hover:text-blue-600 cursor-pointer transition-colors mb-2">
                      {project.title}
                    </h4>
                    
                    {/* Project Description */}
                    <p className="text-sm font-medium text-gray-500 line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center text-[12px] font-semibold text-gray-650 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                          <Tag className="w-2.5 h-2.5 mr-1 text-gray-400" />
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* CTA Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className={`text-[12px] font-bold ${
                        project.difficulty === 'Advanced' ? 'text-red-500 bg-red-50' : 
                        project.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'
                      } px-2.5 py-1 rounded-md`}>
                        {project.difficulty}
                      </span>
                      
                      <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer">
                        <span>Submit Proposal</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-gray-800">No project proposals found</h4>
              <p className="text-sm text-gray-500 mt-1">Try tweaking filters or searching for alternative key skills.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
