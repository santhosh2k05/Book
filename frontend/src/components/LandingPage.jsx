import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-black text-white">

      <h1 className="text-4xl font-bold mb-6 text-white" >PLACEMENT CONNECT</h1>


      <div className="space-y-4">
        
        <Link to="/login?type=student">
          <Button
            gradientDuoTone="blackTowhite"
            className="w-full text-lg px-8 py-3 mb-3 font-extrabold"
          >
            Student Login
          </Button>
        </Link>

        <Link to="/login?type=admin">
          <Button
            gradientDuoTone="blackTowhite"
            className="w-full text-xl px-8 py-3 font-extrabold "
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
