import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';  
import PlacementOpportunities from "./components/Placementopp";
import AdminDashboard from './components/AdminDashboard';
import LandingPage from "./components/LandingPage";
import AdminRegister from "./components/AdminRegister";
import ProfileChecker from "./components/Profile";
import StudentList from   "./components/Studentlogin"
import Adminlogin from  "./components/Adminlogin";
const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminRegister" element={<AdminRegister/>}/>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/logout" element={<LandingPage/>} />
        <Route path="/PlacementOppurtunities" element={<PlacementOpportunities/>}/>
        <Route path="/ProfileChecker" element={<ProfileChecker/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/view-profile" element={<StudentList/>}/>
        <Route path="/manage-students" element={<Adminlogin />}/>
      </Routes>
    </Router>
  )
}

export default App;
