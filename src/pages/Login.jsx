import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, Sparkles, GraduationCap, Network, Bot, LayoutTemplate } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'Student';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  
  // Validation states
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Simulate login and profile check
    setLoading(true);
    setLoadingPhase('Authenticating...');
    
    setTimeout(() => {
      setLoadingPhase('Checking your profile...');
      
      setTimeout(() => {
        setLoadingPhase('Loading AI Recommendation Engine...');
        
        setTimeout(() => {
          if (role === 'Student') {
            // Mock checking if user is new (random choice for demo)
            const isFirstTime = Math.random() > 0.5;
            if (isFirstTime) {
              navigate('/profile-setup');
            } else {
              navigate('/dashboard');
            }
          } else if (role === 'Faculty Guide') {
            navigate('/faculty-dashboard');
          } else if (role === 'CC Faculty') {
            navigate('/cc-faculty-dashboard');
          } else if (role === 'Administrator') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const features = [
    "Personalized AI Recommendations",
    "Save Favorite Projects",
    "Track Recommendation History",
    "Compare Project Ideas",
    "Download Project Reports",
    "Secure Student Profile"
  ];

  return (
    <main className="flex-grow pt-16 min-h-screen bg-slate-50/50 relative overflow-hidden flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* LEFT SIDE (55%) - Illustration & Content */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center animate-fade-in-up">
            
            <div className="inline-flex items-center gap-2 text-blue-700 text-sm font-semibold tracking-wider uppercase bg-blue-100/60 px-4 py-2 rounded-full mb-6 w-fit border border-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Secure Student Portal</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Access Personalized AI<br/>Project Recommendations
            </h1>
            
            <p className="text-lg text-gray-500 font-medium mb-10 max-w-xl leading-relaxed">
              Sign in to your student account to receive AI-powered final year project recommendations based on your department, interests, skills, and career goals.
            </p>

            {/* Illustration Graphic - Abstract representation using floating elements */}
            <div className="relative w-full max-w-lg mb-10 h-40">
               {/* Center Node */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 z-10 animate-bounce-slow">
                 <Bot className="w-10 h-10 text-white" />
               </div>
               
               {/* Connected Nodes */}
               <div className="absolute top-2 left-10 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100 z-10 animate-float">
                 <GraduationCap className="w-6 h-6 text-indigo-500" />
               </div>
               <div className="absolute bottom-2 left-1/4 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100 z-10 animate-float" style={{ animationDelay: '1s' }}>
                 <Network className="w-5 h-5 text-blue-500" />
               </div>
               <div className="absolute top-8 right-12 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100 z-10 animate-float" style={{ animationDelay: '2s' }}>
                 <Sparkles className="w-7 h-7 text-yellow-500" />
               </div>
               <div className="absolute bottom-4 right-1/4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100 z-10 animate-float" style={{ animationDelay: '1.5s' }}>
                 <LayoutTemplate className="w-6 h-6 text-purple-500" />
               </div>
               
               {/* Abstract connecting lines (SVG) */}
               <svg className="absolute inset-0 w-full h-full text-blue-200/50 pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="85%" y2="30%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="70%" y2="75%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE (45%) - Login Card */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            
            <div className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-150 w-full max-w-[430px] relative transition-transform duration-300 hover:shadow-[0_12px_45px_rgb(0,0,0,0.08)]">
              
              {loading ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">Authenticating...</h3>
                    <p className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full animate-pulse">{loadingPhase}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-500 font-medium">Login to continue your project journey.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Input */}
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl text-sm transition-all font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2`}
                          placeholder="Enter your college email"
                        />
                      </div>
                      {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-500 ml-1">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`block w-full pl-11 pr-12 py-3.5 bg-gray-50 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'} rounded-xl text-sm transition-all font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2`}
                          placeholder="Enter your password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      {errors.password && <p className="mt-1.5 text-xs font-semibold text-red-500 ml-1">{errors.password}</p>}
                    </div>

                    {/* Checkbox and Forgot Password */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-gray-600 cursor-pointer">
                          Remember Me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-bold text-blue-600 hover:text-blue-500">
                          Forgot Password?
                        </a>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)] text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  {/* Divider */}
                  <div className="my-8 relative flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                      OR
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>

                  {/* Google Login */}
                  <div>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center py-3.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="mt-8 text-center text-sm font-semibold text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                      Create Account
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Security Box */}
            <div className="w-full max-w-[430px] mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-blue-900 leading-relaxed">
                Your information is securely encrypted and used only to generate personalized AI project recommendations.
              </p>
            </div>
            
          </div>

        </div>
      </div>
    </main>
  );
}
