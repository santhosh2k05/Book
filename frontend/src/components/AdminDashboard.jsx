import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8"
    >
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg mb-8">
        Manage students, companies, and placement statistics.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link to="/manage-students">
          <Button gradientDuoTone="blueToGreen" className="w-full py-4 text-lg">
            Manage Students
          </Button>
        </Link>
        <Link to="/manage-companies">
          <Button gradientDuoTone="cyanToBlue" className="w-full py-4 text-lg">
            Manage Companies
          </Button>
        </Link>
        <Link to="/view-statistics">
          <Button gradientDuoTone="purpleToBlue" className="w-full py-4 text-lg">
            View Statistics
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
