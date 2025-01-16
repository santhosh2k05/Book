import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children, title, showLogout = true }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored tokens/data
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {title}
          </h1>
          {showLogout && (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-lg border border-rose-500 hover:bg-rose-500/10 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 