import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-black text-white">
        <div className="border border-white p-8 rounded-lg" >
          <h1 className="text-4xl font-bold mb-16 text-center text-white">
            PLACEMENT CONNECT
          </h1>

          <div className="flex space-x-4">
            <Link to="/login?type=student" className="flex-1">
              <Button
                gradientDuoTone="blackTowhite"
                className="w-full text-lg px-8 py-3 font-extrabold border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
              >
                Student Login
              </Button>
            </Link>

            <Link to="/login?type=admin" className="flex-1">
              <Button
                gradientDuoTone="blackTowhite"
                className="w-full text-lg px-8 py-3 font-extrabold border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
