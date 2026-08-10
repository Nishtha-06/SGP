import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Lock, Mail, User } from 'lucide-react';
import { registerUser } from '../services/authApi';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'Student';
  const roleMap = { Student: 'STUDENT', 'Faculty Guide': 'FACULTY', 'CC Faculty': 'CC_FACULTY', Administrator: 'ADMIN' };
  const destinations = { STUDENT: '/profile-setup', FACULTY: '/faculty-dashboard', CC_FACULTY: '/cc-faculty-dashboard', ADMIN: '/admin-dashboard' };
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', domains: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await registerUser({ ...form, domains: form.domains.split(',').map((domain) => domain.trim()).filter(Boolean), role: roleMap[role] || 'STUDENT' });
      navigate(destinations[user.role] || '/dashboard');
    } catch (requestError) {
      setError(requestError.message);
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-24 pb-20 min-h-screen bg-slate-50/50 flex items-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-150">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center"><GraduationCap className="w-7 h-7" /></div>
            <h1 className="text-2xl font-bold text-gray-900">Create your {role.toLowerCase()} account</h1>
            <p className="mt-2 text-sm text-gray-500">Set up secure access to your ProjectHub workspace.</p>
          </div>
          {error && <p className="mb-5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Full name
              <div className="relative mt-2"><User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><input name="name" required value={form.name} onChange={updateField} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" /></div>
            </label>
            <label className="block text-sm font-semibold text-gray-700">College email
              <div className="relative mt-2"><Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><input name="email" type="email" required value={form.email} onChange={updateField} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@college.edu" /></div>
            </label>
            <label className="block text-sm font-semibold text-gray-700">Department
              <select name="department" required value={form.department} onChange={updateField} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="">Select department</option><option>Computer Science</option><option>Computer Engineering</option><option>Information Technology</option><option>AI &amp; DS</option><option>Electronics</option><option>Mechanical</option></select>
            </label>
            {role === 'Faculty Guide' && <label className="block text-sm font-semibold text-gray-700">Assigned domains
              <input name="domains" required value={form.domains} onChange={updateField} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="AI / ML, IoT" />
            </label>}
            <label className="block text-sm font-semibold text-gray-700">Password
              <div className="relative mt-2"><Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" /><input name="password" type="password" minLength="8" required value={form.password} onChange={updateField} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="At least 8 characters" /></div>
            </label>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating account...' : 'Create Account'} {!loading && <ArrowRight className="h-4 w-4" />}</button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <button type="button" onClick={() => navigate('/login', { state: { role: location.state?.role || 'Student' } })} className="font-bold text-blue-600 hover:underline cursor-pointer">Log in</button></p>
        </div>
      </div>
    </main>
  );
}