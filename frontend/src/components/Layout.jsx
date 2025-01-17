import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './ui/Footer';

const Layout = ({ children, title, showLogout = true }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative">
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

      <main className="container mx-auto px-4 py-8 pb-16">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 