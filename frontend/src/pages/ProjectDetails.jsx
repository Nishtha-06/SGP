import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2, CircleDot, Clock3, Layers3, Sparkles, Target, Users } from 'lucide-react';
import { submitProjectProposal } from '../services/recommendationApi';

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const project = state?.project;
  const groupSize = state?.groupSize;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await submitProjectProposal(project);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.message);
      setSubmitting(false);
    }
  };

  if (!project) {
    return (
      <main className="flex-grow min-h-screen bg-slate-50 pt-28 pb-12 px-4">
        <section className="mx-auto max-w-xl rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <Sparkles className="mx-auto h-10 w-10 text-blue-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">No project selected</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Choose a recommendation first to see its complete project brief.</p>
          <button onClick={() => navigate('/recommendation-results')} className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">View recommendations</button>
        </section>
      </main>
    );
  }

  const outcomes = Array.isArray(project.expectedOutcomes) ? project.expectedOutcomes : [];
  const technologies = Array.isArray(project.recommendedTechnologies) ? project.recommendedTechnologies : [];

  return (
    <main className="relative min-h-screen flex-grow overflow-hidden bg-slate-50/50 pb-14 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600">
          <ArrowLeft className="h-4 w-4" /> Back to recommendations
        </button>

        <section className="overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-200"><Sparkles className="h-3.5 w-3.5" /> AI-generated project brief</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200">{project.difficultyLevel || 'Medium'} level</span>
          </div>
          <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">{project.problemStatement}</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-200">
            <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-blue-300" /> {project.estimatedTimeline || 'Timeline to be defined'}</span>
            {groupSize && <span className="flex items-center gap-2"><Users className="h-4 w-4 text-blue-300" /> Team of {groupSize}</span>}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_.75fr]">
          <div className="space-y-6">
            <DetailCard icon={Target} title="Project objective" iconClass="text-rose-600 bg-rose-50">
              <p className="text-sm leading-7 text-slate-600">{project.objective || 'Define measurable goals for this project during planning.'}</p>
            </DetailCard>

            <DetailCard icon={CheckCircle2} title="Expected outcomes" iconClass="text-emerald-600 bg-emerald-50">
              {outcomes.length ? <ul className="space-y-3">{outcomes.map((outcome, index) => <li key={`${outcome}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{outcome}</li>)}</ul> : <p className="text-sm text-slate-500">Expected outcomes will be finalized with your faculty mentor.</p>}
            </DetailCard>

            <DetailCard icon={Layers3} title="Suggested implementation plan" iconClass="text-blue-600 bg-blue-50">
              <ol className="grid gap-3 sm:grid-cols-3">{['Research & scope the problem', 'Build and test the solution', 'Measure results & present'].map((step, index) => <li key={step} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700"><span className="mb-2 grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-xs text-white">{index + 1}</span>{step}</li>)}</ol>
            </DetailCard>
          </div>

          <aside className="space-y-6">
            <DetailCard icon={CircleDot} title="Recommended tech stack" iconClass="text-violet-600 bg-violet-50">
              <div className="flex flex-wrap gap-2">{technologies.length ? technologies.map((technology) => <span key={technology} className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700">{technology}</span>) : <span className="text-sm text-slate-500">Not specified</span>}</div>
            </DetailCard>
            <DetailCard icon={CalendarDays} title="Project snapshot" iconClass="text-amber-600 bg-amber-50">
              <dl className="space-y-4 text-sm"><div className="flex items-center justify-between gap-4"><dt className="text-slate-500">Difficulty</dt><dd className="font-bold text-slate-800">{project.difficultyLevel || 'Medium'}</dd></div><div className="flex items-center justify-between gap-4"><dt className="text-slate-500">Estimated timeline</dt><dd className="font-bold text-slate-800">{project.estimatedTimeline || 'TBD'}</dd></div><div className="flex items-center justify-between gap-4"><dt className="text-slate-500">Technologies</dt><dd className="font-bold text-slate-800">{technologies.length}</dd></div></dl>
            </DetailCard>
            {error && <p className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button onClick={handleSubmit} disabled={submitting} className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Submitting proposal...' : 'Select and submit proposal'}</button>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailCard({ icon: Icon, title, iconClass, children }) {
  return <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}><Icon className="h-5 w-5" /></span><h2 className="font-bold text-slate-900">{title}</h2></div>{children}</section>;
}
