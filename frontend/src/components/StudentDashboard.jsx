import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r bg-black text-white px-8 pt-12">
      <h1 className="text-5xl font-bold mb-6 text-center text-rose-600">PLACEMENT CONNECT</h1>
      
      <p className="text-lg mb-8 text-center max-w-lg">
        Welcome to the student dashboard! Choose from the following options to view placement opportunities,update your profile or logout.
      </p>
      
      <div className="space-y-6 w-full max-w-md">
        <Link to="/PlacementOppurtunities" className="w-full" aria-label="View Placement Opportunities">
          <Button  className="w-full text-lg px-8 py-3 mb-5 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300">
            View Placement Opportunities
          </Button>
        </Link>

        <Link to="/view-profile" className="w-full">
          <Button className="w-full text-lg px-8 py-3 mb-5 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300">
            View Profile
          </Button>
        </Link>

        <Link to="/logout" className="w-full">
          <Button className="w-full text-lg px-8 py-3 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300">
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
