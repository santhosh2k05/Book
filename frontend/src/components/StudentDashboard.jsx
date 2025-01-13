import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import PlacementOpportunities from "./Placementopp";

const StudentDashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8">
      <h1 className="text-5xl font-bold mb-6">PLACEMENT CONNECT</h1> {/* Header */}
      
      <p className="text-lg mb-6 text-left max-w-lg">
        Welcome to the student dashboard! Choose from the following options to view placement opportunities, check your application status, or update your profile.
      </p>
      
      <div className="space-y-6 w-full max-w-lg">
        {/* Placement Opportunities Button */}
        <Link to={{pathname: "/PlacementOppurtunities"}} className="w-full" aria-label="View Placement Opportunities">
          <Button gradientDuoTone="cyanToBlue" className="w-full py-4 text-lg mb-4">
            View Placement Opportunities
          </Button>
        </Link>

<<<<<<< HEAD
      {/* Application Status Button */}
      <Link to="/application-status" className="w-full">
        <Button gradientDuoTone="cyanToBlue" className="w-full py-4 text-lg">
          Check Application Status
        </Button>
      </Link>

      {/* View Profile Button */}
      <Link to={{pathname: "/StudentDashboard"}} className="w-full">
        <Button gradientDuoTone="purpleToBlue" className="w-full py-4 text-lg" >
          View Profile
        </Button>
      </Link>
=======
        {/* View Profile Button */}
        <Link to="/profile" className="w-full" aria-label="View Profile">
          <Button gradientDuoTone="cyanToBlue" className="w-full py-4 text-lg">
            View Profile
          </Button>
        </Link>
      </div>
>>>>>>> c83620820b42748d7e2f281949878aa5a3eef150
    </div>
  );
};

export default StudentDashboard;
