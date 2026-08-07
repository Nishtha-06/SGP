import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Brain, Menu, X, ArrowRight, Bell, Settings, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncAuthState = () => setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    window.addEventListener('auth-change', syncAuthState);
    window.addEventListener('storage', syncAuthState);
    return () => {
      window.removeEventListener('auth-change', syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.dispatchEvent(new Event('auth-change'));
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b ${
      isScrolled ? 'border-gray-200/80 shadow-xs backdrop-blur-md bg-white/90' : 'border-gray-150'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div 
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-md shadow-blue-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight transition-colors duration-200 group-hover:text-blue-600">
              AI ProjectHub
            </span>
          </div>

          {/* Center: Desktop Navigation NavLinks */}
          <div className="hidden md:flex space-x-9 items-center">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `text-sm font-medium transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-transform after:duration-300 ${isActive ? 'text-blue-600 after:scale-x-100' : 'text-gray-500 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/recommendations" 
                  className={({ isActive }) => `text-sm font-medium transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-transform after:duration-300 ${isActive ? 'text-blue-600 after:scale-x-100' : 'text-gray-500 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  Recommendations
                </NavLink>
                <NavLink 
                  to="/projects" 
                  className={({ isActive }) => `text-sm font-medium transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-transform after:duration-300 ${isActive ? 'text-blue-600 after:scale-x-100' : 'text-gray-500 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  Projects
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `text-sm font-medium transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:transition-transform after:duration-300 ${isActive ? 'text-blue-600 after:scale-x-100' : 'text-gray-500 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100'}`}
                >
                  Home
                </NavLink>
                <a 
                  href="/#features" 
                  className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  Features
                </a>
                <a 
                  href="/#about" 
                  className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  About
                </a>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Notifications Button */}
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative cursor-pointer">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                
                {/* Profile Avater with Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-700 font-bold hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 transition-all cursor-pointer focus:outline-none"
                  >
                    SN
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in-up origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                        <p className="text-sm font-bold text-gray-900">Student Name</p>
                        <p className="text-xs text-gray-500 truncate">student@college.edu</p>
                      </div>
                      
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors">
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors">
                        <User className="w-4 h-4" />
                        Change Password
                      </button>
                      
                      <div className="border-t border-gray-50 mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <NavLink to="/role-selection" className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-250 cursor-pointer rounded-lg hover:bg-gray-50 hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all duration-200">
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center gap-3">
            {isAuthenticated && (
              <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6 block" /> : <Menu className="h-6 w-6 block" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-gray-100 ${
          isOpen ? 'max-h-[500px] opacity-100 bg-white py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 space-y-2 pb-3">
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 mb-2 flex items-center gap-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-700 font-bold flex items-center justify-center">
                  SN
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-900">Student Name</p>
                   <p className="text-xs text-gray-500">student@college.edu</p>
                </div>
              </div>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/recommendations"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Recommendations
              </NavLink>
              <NavLink
                to="/projects"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Projects
              </NavLink>
              <div className="pt-2 mt-2 border-t border-gray-100 space-y-1">
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
                  <User className="w-5 h-5" /> My Profile
                </button>
                <button className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
                  <Settings className="w-5 h-5" /> Settings
                </button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 flex items-center gap-3">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Features
              </a>
              <a
                href="#recommendations"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                Recommendations
              </a>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                About
              </a>
              <div className="pt-4 border-t border-gray-100 px-4">
                <NavLink to="/role-selection" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all duration-150">
                  Login
                  <ArrowRight className="ml-2 w-4 h-4" />
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
