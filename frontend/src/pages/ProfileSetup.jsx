import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, GraduationCap, Target, ArrowRight } from 'lucide-react';
import { getStudentProfile, saveStudentProfile } from '../services/authApi';

export default function ProfileSetup() {
  const navigate = useNavigate();

  // State
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [account, setAccount] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getStudentProfile()
      .then(({ user, profile }) => {
        if (!active) return;
        setAccount(user);
        setFullName(user.name || '');
        setDepartment(user.department || '');
        setUniversity(profile.university || '');
        setStudentId(profile.studentId || '');
        setSemester(profile.semester || '');
        setCareerGoal(profile.careerGoal || '');
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoadingProfile(false));
    return () => { active = false; };
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await saveStudentProfile({ university, studentId, semester, careerGoal });
      navigate('/recommendations');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="flex-grow pt-24 pb-20 relative overflow-hidden bg-slate-50/30">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 shadow-sm border border-blue-200">
            <UserCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Your Student Profile
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            Your details are loaded from your signed-in ProjectHub account.
          </p>
        </div>

        {/* PROFILE FORM */}
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-150">

          <form onSubmit={handleSaveProfile} className="space-y-10">
            {loadingProfile && <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">Loading your profile…</p>}
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
            {account && <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm"><p className="font-bold text-gray-900">{account.email}</p><p className="mt-1 text-gray-600">{account.role.replace('_', ' ')} · {account.department}</p></div>}

            {/* Section 1: Academic Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Academic Information
              </h3>

              {/* Row 1: Full Name + University */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">University / College</label>
                  <input
                    type="text"
                    required
                    disabled={loadingProfile}
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                    placeholder="Enter your institution name"
                  />
                </div>
              </div>

              {/* Row 2: Student ID + Department + Semester */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    required
                    disabled={loadingProfile}
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                    placeholder="Enter your student ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <select
                    required
                    disabled
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & DS">AI &amp; DS</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Semester</label>
                  <select
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Semester</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Project Preferences */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Target className="w-5 h-5 text-blue-600" />
                Project Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Career Goal</label>
                  <select
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-700"
                  >
                    <option value="" disabled>Select Career Goal</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="AI Researcher">AI Researcher</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Save Profile &amp; Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
