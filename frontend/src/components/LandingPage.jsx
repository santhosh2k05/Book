import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-black text-white">
      {/* Header Section */}
      <h1 className="text-4xl font-bold mb-6 text-white" >PLACEMENT CONNECT</h1>

      {/* Buttons Section */}
      <div className="space-y-4">
        {/* Student Login Button */}
        <Link to="/login?type=student">
          <Button
            gradientDuoTone="cyanToBlue"
            className="w-full text-lg px-8 py-3 mb-3"
          >
            Student Login
          </Button>
        </Link>

        {/* Admin Login Button */}
        <Link to="/login?type=admin">
          <Button
            gradientDuoTone="cyanToBlue"
            className="w-full text-lg px-8 py-3"
          >
            Admin Login
          </Button>
        </Link>

        </div>
      </div>
      </>
    );
};

export default LandingPage;
