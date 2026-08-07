import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import RecommendationResults from './pages/RecommendationResults';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import RoleSelection from './pages/RoleSelection';
import FacultyDashboard from './pages/FacultyDashboard';
import CCFacultyDashboard from './pages/CCFacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/recommendation-results" element={<RecommendationResults />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/cc-faculty-dashboard" element={<CCFacultyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/project-details" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
