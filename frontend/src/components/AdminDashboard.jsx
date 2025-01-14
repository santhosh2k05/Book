import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black to-purple-500 text-white p-8"
    >
      <h1 className="text-6xl font-bold mb-6 text-rose-600">Admin Dashboard</h1>
      <p className="text-lg mb-12 text-center">
        Manage students and placement statistics.
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
        <Link to="/manage-students">
          <Button
            className="w-full text-lg px-8 py-3 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
          >
            Manage Students
          </Button>
        </Link>
        <Link to="/view-statistics">
          <Button
            gradientDuoTone="purpleToBlue"
            className="w-full text-lg px-8 py-3 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
          >
            View Statistics
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
