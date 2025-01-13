import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
      <h1 className="text-4xl font-bold mb-6">Placement Management System</h1>
      <div className="space-y-4">
        <Link to="/login?type=student">
          <Button
            gradientDuoTone="blueToGreen"
            className="w-full text-lg px-8 py-3"
          >
            Student Login
          </Button>
        </Link>
        <Link to="/login?type=admin">
          <Button
            gradientDuoTone="cyanToBlue"
            className="w-full text-lg px-8 py-3"
          >
            Admin Login
          </Button>
        </Link>
        <Button
          gradientDuoTone="purpleToBlue"
          className="text-lg px-8 py-3"
          onClick={() => alert("Hello from Flowbite!")}
        >
          Example Button
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
