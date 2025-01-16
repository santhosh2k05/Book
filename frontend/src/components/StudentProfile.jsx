import React from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  // Get student data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Layout title="Student Profile">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-lg text-gray-400">
            View and manage your professional details
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8">
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                {userData.StudentName?.charAt(0) || 'S'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {userData.StudentName}
                </h2>
                <p className="text-gray-400">
                  Registration No: {userData.StudentRegNo}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Contact Information
                </h3>
                <div className="p-4 rounded-lg bg-black/40">
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="font-medium text-white">{userData.StudentEmail}</p>
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Academic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-black/40">
                    <p className="text-gray-400 text-sm mb-1">Department</p>
                    <p className="font-medium text-white">{userData.StudentDEPT}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-black/40">
                    <p className="text-gray-400 text-sm mb-1">CGPA</p>
                    <p className="font-medium text-white">{userData.StudentCGPA}</p>
                  </div>
                </div>
              </div>

              {/* Professional Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Professional Links
                </h3>
                <div className="p-4 rounded-lg bg-black/40">
                  <div className="flex flex-wrap gap-2">
                    {userData.StudentLinkedIn && (
                      <span
                        className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      >
                        LinkedIn
                      </span>
                    )}
                    {userData.StudentGitHub && (
                      <span
                        className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      >
                        GitHub
                      </span>
                    )}
                    {userData.StudentPortfolio && (
                      <span
                        className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      >
                        Portfolio
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Skills
                </h3>
                <div className="p-4 rounded-lg bg-black/40">
                  <div className="flex flex-wrap gap-2">
                    {userData.StudentSkills?.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Placement Status */}
              <div>
                <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Placement Status
                </h3>
                <div className="p-4 rounded-lg bg-black/40">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      userData.StudentPlacedInfo
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {userData.StudentPlacedInfo ? 'Placed' : 'Not Placed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="gradient"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile; 