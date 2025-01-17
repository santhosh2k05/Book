import React from "react";
import { Link } from "react-router-dom";
import Footer from "./ui/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Placement Connect
          </h1>
          
          <p className="text-xl mb-12 text-gray-300">
            Your gateway to career opportunities and placement success
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link 
              to="/login?type=student"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative w-full px-8 py-4 bg-black rounded-lg border border-rose-500 hover:border-purple-500 transition duration-200">
                <span className="text-xl font-bold">Student Login</span>
              </button>
            </Link>

            <Link 
              to="/login?type=admin"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-rose-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative w-full px-8 py-4 bg-black rounded-lg border border-purple-500 hover:border-rose-500 transition duration-200">
                <span className="text-xl font-bold">Admin Login</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
