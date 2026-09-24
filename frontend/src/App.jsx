import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import RecommendationResults from './pages/RecommendationResults';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import RoleSelection from './pages/RoleSelection';
import FacultyDashboard from './pages/FacultyDashboard';
import CCFacultyDashboard from './pages/CCFacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
        <Route path="/recommendation-results" element={<ProtectedRoute><RecommendationResults /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['STUDENT']}><Dashboard /></ProtectedRoute>} />
        <Route path="/faculty-dashboard" element={<ProtectedRoute allowedRoles={['FACULTY']}><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/cc-faculty-dashboard" element={<ProtectedRoute allowedRoles={['CC_FACULTY']}><CCFacultyDashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/project-details" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}
