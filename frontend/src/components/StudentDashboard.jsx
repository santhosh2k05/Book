import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Student Dashboard</h1>
      <p className="text-lg mb-8">
        View placement opportunities and application status.
      </p>
      <div className="space-y-4 w-full max-w-lg">
        <Link to="/placement-opportunities">
          <Button gradientDuoTone="blueToGreen" className="w-full py-3 text-lg">
            View Placement Opportunities
          </Button>
        </Link>
        <Link to="/application-status">
          <Button gradientDuoTone="cyanToBlue" className="w-full py-3 text-lg">
            Check Application Status
          </Button>
        </Link>
        <Link to="/profile">
          <Button gradientDuoTone="purpleToBlue" className="w-full py-3 text-lg">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
