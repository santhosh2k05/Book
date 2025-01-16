import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';  
import PlacementOpportunities from "./components/Placementopp";
import AdminDashboard from './components/AdminDashboard';
import LandingPage from "./components/LandingPage";
import AdminRegister from "./components/AdminRegister";
import StudentProfile from "./components/StudentProfile";
import AdminManagement from "./components/Adminlogin";
import PlacementStatistics from "./components/statistics";
import PlacementVideos from "./components/PlacementVideos";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/placement-opportunities" element={<PlacementOpportunities />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/placement-statistics" element={<PlacementStatistics />} />
        <Route path="/placement-videos" element={<PlacementVideos />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
