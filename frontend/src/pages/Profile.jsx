import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BriefcaseBusiness, Calendar, Edit3, Mail, Save } from 'lucide-react';
import { getStoredUser, getStudentProfile, updateFacultyProfile } from '../services/authApi';

const facultyDomains = ['AI / ML', 'Machine Learning', 'Web Development', 'Data Science', 'Cloud', 'IoT', 'Blockchain', 'Cyber Security'];

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser);
  const [studentProfile, setStudentProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [designation, setDesignation] = useState(user?.designation || 'Faculty Guide');
  const [domains, setDomains] = useState(user?.domains || []);
  const [technologies, setTechnologies] = useState(user?.technologies || []);
  const [technologyInput, setTechnologyInput] = useState('');

  const isFaculty = user?.role === 'FACULTY';

  useEffect(() => {
    if (!isFaculty) getStudentProfile().then(({ user: profileUser, profile }) => { setUser(profileUser); setStudentProfile(profile); }).catch((error) => setMessage(error.message));
  }, [isFaculty]);

  const initials = (user?.name || 'User').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  const addTechnology = () => { const value = technologyInput.trim(); if (value && !technologies.includes(value)) setTechnologies([...technologies, value]); setTechnologyInput(''); };
  const saveFacultyProfile = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updated = await updateFacultyProfile({ domains, technologies, designation, maxProjectCapacity: user?.maxProjectCapacity || 10 });
      setUser(updated);
      setEditing(false);
      setMessage('Faculty profile updated successfully.');
    } catch (error) { setMessage(error.message); } finally { setSaving(false); }
  };

  return <main className="min-h-screen flex-1 bg-slate-50/70 px-4 py-12 pt-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="h-32 bg-gradient-to-r from-blue-700 to-slate-950" /><div className="relative px-6 pb-8 sm:px-8"><div className="-mt-16 mb-6 flex items-end justify-between"><div className="grid h-32 w-32 place-items-center rounded-full border-4 border-white bg-blue-100 text-3xl font-black text-blue-700 shadow-md">{initials}</div>{isFaculty ? <button onClick={() => setEditing(!editing)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600"><Edit3 className="h-4 w-4" />{editing ? 'Cancel editing' : 'Edit profile'}</button> : <button onClick={() => navigate('/profile-setup')} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-600"><Edit3 className="h-4 w-4" />Edit profile</button>}</div><div><h1 className="text-3xl font-black text-slate-950">{user?.name || 'Your profile'}</h1><p className="mt-2 flex items-center gap-2 text-lg text-slate-500"><Mail className="h-5 w-5" />{user?.email || 'Email not available'}</p><div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-slate-600"><span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5"><BookOpen className="h-4 w-4" />{user?.department || 'Department not set'}</span>{isFaculty && <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5"><BriefcaseBusiness className="h-4 w-4" />{user?.designation || 'Faculty Guide'}</span>}{!isFaculty && <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5"><Calendar className="h-4 w-4" />{studentProfile?.semester ? `Semester ${studentProfile.semester}` : 'Academic year not set'}</span>}</div></div>{message && <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">{message}</p>}

{isFaculty ? <FacultyProfile editing={editing} designation={designation} setDesignation={setDesignation} domains={domains} setDomains={setDomains} technologies={technologies} setTechnologies={setTechnologies} technologyInput={technologyInput} setTechnologyInput={setTechnologyInput} addTechnology={addTechnology} save={saveFacultyProfile} saving={saving} capacity={user?.maxProjectCapacity || 10} assigned={user?.currentAssignedProjects || 0} /> : <StudentProfile profile={studentProfile} />}</div></section></div></main>;
}

function FacultyProfile({ editing, designation, setDesignation, domains, setDomains, technologies, setTechnologies, technologyInput, setTechnologyInput, addTechnology, save, saving, capacity, assigned }) {
  return <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 lg:grid-cols-2"><section><h2 className="text-xl font-black">Faculty information</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Info label="Faculty name" value={getStoredUser()?.name} /><Info label="Department" value={getStoredUser()?.department} /><label className="text-xs font-black uppercase tracking-wider text-slate-400">Designation<input disabled={!editing} value={designation} onChange={(event) => setDesignation(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-800 disabled:bg-slate-50" /></label><Info label="Maximum project capacity" value={`${capacity} projects`} /><Info label="Current assigned projects" value={`${assigned} projects`} /></div></section><section><h2 className="text-xl font-black">Expertise and technologies</h2><p className="mt-2 text-sm leading-6 text-slate-500">Used for AI-based project-to-faculty matching.</p><p className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">Areas of expertise</p><div className="mt-3 flex flex-wrap gap-2">{facultyDomains.map((domain) => <button disabled={!editing} type="button" key={domain} onClick={() => setDomains(domains.includes(domain) ? domains.filter((item) => item !== domain) : [...domains, domain])} className={`rounded-full border px-3 py-2 text-xs font-bold disabled:cursor-default ${domains.includes(domain) ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600'}`}>{domains.includes(domain) ? '☑ ' : '☐ '}{domain}</button>)}</div><p className="mt-5 text-xs font-black uppercase tracking-wider text-slate-400">Technologies / skills</p><div className="mt-3 flex flex-wrap gap-2">{technologies.map((technology) => <button disabled={!editing} type="button" key={technology} onClick={() => setTechnologies(technologies.filter((item) => item !== technology))} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 disabled:cursor-default">{technology} {editing && '×'}</button>)}</div>{editing && <div className="mt-3 flex gap-2"><input value={technologyInput} onChange={(event) => setTechnologyInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && (event.preventDefault(), addTechnology())} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Python, Java, React, TensorFlow" /><button type="button" onClick={addTechnology} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold">Add</button></div>}{editing && <button onClick={save} disabled={saving || !domains.length} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save changes'}</button>}</section></div>;
}

function StudentProfile({ profile }) { return <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 sm:grid-cols-2"><Info label="University" value={profile?.university || 'Not set'} /><Info label="Student ID" value={profile?.studentId || 'Not set'} /><Tag label="Skills" values={profile?.skills} /><Tag label="Technology interests" values={profile?.techInterests} /><Tag label="Areas of interest" values={profile?.areasOfInterest} /><Info label="Career goal" value={profile?.careerGoal || 'Not set'} /></div>; }
function Info({ label, value }) { return <div><p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 text-sm font-bold text-slate-800">{value || 'Available in account data'}</p></div>; }
function Tag({ label, values = [] }) { return <div><p className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</p><div className="mt-2 flex flex-wrap gap-2">{values?.length ? values.map((value) => <span key={value} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700">{value}</span>) : <span className="text-sm font-semibold text-slate-400">Not set</span>}</div></div>; }

