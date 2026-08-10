import { useState } from 'react';
import { 
  Globe, Link as LinkIcon, Bell, Palette, Shield, 
  Download, Trash2, LogOut, Mail,
  ExternalLink, Info, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');

  // State for General
  const [language, setLanguage] = useState('english');
  const [timeZone, setTimeZone] = useState('asia/kolkata');
  const [country, setCountry] = useState('india');
  const [defaultDashboard, setDefaultDashboard] = useState('student');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');

  // State for Notifications
  const [notifProjects, setNotifProjects] = useState(true);
  const [notifCourses, setNotifCourses] = useState(true);
  const [notifInternships, setNotifInternships] = useState(true);
  const [notifDeadlines, setNotifDeadlines] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);

  // State for Appearance
  const [theme, setTheme] = useState('light');

  // State for Connected Accounts
  const [connectedGithub, setConnectedGithub] = useState(true);
  const [connectedLinkedin, setConnectedLinkedin] = useState(false);
  const [connectedGoogle, setConnectedGoogle] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'accounts', label: 'Connected Accounts', icon: LinkIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account Management', icon: Shield },
  ];

  const renderToggle = (label, checked, onChange) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button 
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  const renderSelect = (label, value, options, onChange) => (
    <div className="flex flex-col py-3">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            )})}
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="animate-fade-in-up">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-500" /> General
                    </h2>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {renderSelect('Language', language, [
                        { value: 'english', label: 'English' },
                        { value: 'hindi', label: 'Hindi' },
                        { value: 'gujarati', label: 'Gujarati' },
                        { value: 'spanish', label: 'Spanish' }
                      ], setLanguage)}
                      
                      {renderSelect('Time Zone', timeZone, [
                        { value: 'asia/kolkata', label: 'India Standard Time (IST)' },
                        { value: 'america/new_york', label: 'Eastern Time (ET)' },
                        { value: 'europe/london', label: 'Greenwich Mean Time (GMT)' }
                      ], setTimeZone)}

                      {renderSelect('Country / Region', country, [
                        { value: 'india', label: 'India' },
                        { value: 'usa', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'canada', label: 'Canada' }
                      ], setCountry)}

                      {renderSelect('Default Dashboard', defaultDashboard, [
                        { value: 'student', label: 'Student Dashboard' },
                        { value: 'recommendations', label: 'Recommendations Page' },
                        { value: 'projects', label: 'Projects Explorer' }
                      ], setDefaultDashboard)}

                      {renderSelect('Date Format', dateFormat, [
                        { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY (e.g., 25/12/2026)' },
                        { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY (e.g., 12/25/2026)' }
                      ], setDateFormat)}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      {renderToggle('Automatic Recommendation Refresh', autoRefresh, setAutoRefresh)}
                      <p className="text-xs text-gray-500 mt-1">If disabled, you will need to manually refresh to see new AI recommendations.</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Help & Support</h3>
                        <div className="space-y-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                            <Info className="w-4 h-4" /> FAQs
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Contact Support
                          </button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">About Platform</h3>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>Version: 2.4.1 (Stable)</p>
                          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-1">
                            Terms of Service <ExternalLink className="w-3 h-3" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-1">
                            Privacy Policy <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Connected Accounts */}
              {activeTab === 'accounts' && (
                <div className="animate-fade-in-up">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-gray-500" /> Connected Accounts
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">GitHub</p>
                          <p className="text-xs text-gray-500">Sync projects and code activity</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setConnectedGithub(!connectedGithub)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          connectedGithub 
                            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {connectedGithub ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">LinkedIn</p>
                          <p className="text-xs text-gray-500">Import experience and skills</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setConnectedLinkedin(!connectedLinkedin)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          connectedLinkedin 
                            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {connectedLinkedin ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                           <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Google Account</p>
                          <p className="text-xs text-gray-500">Sign in and import drive documents</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setConnectedGoogle(!connectedGoogle)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          connectedGoogle 
                            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {connectedGoogle ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="animate-fade-in-up">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-gray-500" /> Notifications
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2 mb-8">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Platform Alerts</h3>
                      {renderToggle('New Project Recommendations', notifProjects, setNotifProjects)}
                      {renderToggle('Course Recommendations', notifCourses, setNotifCourses)}
                      {renderToggle('Internship Alerts', notifInternships, setNotifInternships)}
                      {renderToggle('Deadline Reminders', notifDeadlines, setNotifDeadlines)}
                    </div>
                    <div className="space-y-2 pt-6 border-t border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Delivery Methods</h3>
                      {renderToggle('Email Notifications', notifEmail, setNotifEmail)}
                      {renderToggle('Push Notifications', notifPush, setNotifPush)}
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeTab === 'appearance' && (
                <div className="animate-fade-in-up">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-gray-500" /> Appearance
                    </h2>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Theme Preference</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="w-full h-20 bg-gray-100 rounded-lg mb-3 shadow-inner flex flex-col p-2 gap-1.5">
                          <div className="w-full h-3 bg-white rounded-md"></div>
                          <div className="w-2/3 h-2 bg-white rounded-md"></div>
                          <div className="w-full h-8 bg-white rounded-md mt-auto"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          Light Mode
                          {theme === 'light' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        </span>
                      </button>

                      <button 
                        onClick={() => setTheme('dark')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="w-full h-20 bg-gray-900 rounded-lg mb-3 shadow-inner flex flex-col p-2 gap-1.5 border border-gray-800">
                          <div className="w-full h-3 bg-gray-800 rounded-md"></div>
                          <div className="w-2/3 h-2 bg-gray-800 rounded-md"></div>
                          <div className="w-full h-8 bg-gray-800 rounded-md mt-auto"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          Dark Mode
                          {theme === 'dark' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Management */}
              {activeTab === 'account' && (
                <div className="animate-fade-in-up">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-500" /> Account Management
                    </h2>
                  </div>
                  <div className="p-6 space-y-8">
                    
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Data & Privacy</h3>
                      <p className="text-sm text-gray-500 mb-4">You can download a copy of all the data associated with your account.</p>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                        <Download className="w-4 h-4" /> Download My Data
                      </button>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 mb-2">Session</h3>
                      <p className="text-sm text-gray-500 mb-4">Log out of your current session on this device.</p>
                      <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>

                    <div className="pt-6 border-t border-red-100">
                      <h3 className="text-sm font-bold text-red-600 mb-2">Danger Zone</h3>
                      <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center gap-2 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete Account
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
