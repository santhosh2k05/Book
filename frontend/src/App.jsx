import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';  // Add other components as needed
import AdminDashboard from './components/AdminDashboard';
import LandingPage from "./components/LandingPage";
import AdminRegister from "./components/AdminRegister";
import StudentList from "./components/Studentlogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminRegister" element={<AdminRegister/>}/>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/StudentDashboard" element={<StudentList />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
