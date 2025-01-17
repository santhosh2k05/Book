import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";
import getGreeting from "../utils/getGreeting";

const DashboardCard = ({ title, description, to, icon: Icon, stats }) => (
  <Card className="flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-lg bg-rose-500/10">
        <Icon className="w-6 h-6 text-rose-500" />
      </div>
      {stats && (
        <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
          {stats}
        </span>
      )}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
    <Button to={to} variant="primary" className="w-full">
      View Details
    </Button>
  </Card>
);

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get student data from localStorage - Fix the data access
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const studentRegNo = userData.admin?.StudentRegNo || userData.StudentRegNo;
  const studentName = userData.admin?.StudentName || userData.StudentName;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/student-dashboard/${studentRegNo}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (studentRegNo) {
      fetchDashboardData();
    }
  }, [studentRegNo]);

  if (isLoading) {
  return (
      <Layout title="Student Dashboard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500 border-r-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Student Dashboard">
        <Card className="text-center py-8">
          <p className="text-rose-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </Card>
      </Layout>
    );
  }

  const studentData = {
    name: studentName || dashboardData?.studentInfo.name || 'Student',
    regNo: studentRegNo || dashboardData?.studentInfo.regNo || 'N/A',
    cgpa: userData.StudentCGPA || dashboardData?.studentInfo.cgpa || 'N/A',
    department: userData.StudentDEPT || dashboardData?.studentInfo.department || 'N/A',
    skills: userData.StudentSkills || dashboardData?.studentInfo.skills || 'N/A'
  };

  // Sample company data (later you can fetch this from backend)
  const upcomingCompanies = [
    {
      company: "Google",
      role: "Software Development Engineer",
      date: "May 15, 2024",
      package: "₹25-40 LPA",
      eligibility: "CGPA > 8.0",
      status: "Open"
    },
    {
      company: "Microsoft",
      role: "Full Stack Developer",
      date: "May 20, 2024",
      package: "₹20-35 LPA",
      eligibility: "CGPA > 7.5",
      status: "Open"
    },
    {
      company: "Amazon",
      role: "Software Engineer",
      date: "May 25, 2024",
      package: "₹18-32 LPA",
      eligibility: "CGPA > 7.0",
      status: "Coming Soon"
    }
  ];

  return (
    <Layout title="Student Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Add placement status indicator below header */}
        <div className="flex justify-end mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            userData.StudentPlacedInfo 
              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
          }`}>
            {userData.StudentPlacedInfo ? 'Placed' : 'Not Placed'}
          </span>
        </div>

        {/* Welcome Section */}
        <div className="mb-12">
          <p className="text-2xl font-semibold mb-2 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            {getGreeting()},
          </p>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Welcome, {studentData.name}
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Track your placement journey and explore opportunities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">CGPA</h3>
              <p className="text-3xl font-bold text-white">{studentData.cgpa}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">Department</h3>
              <p className="text-3xl font-bold text-white">{studentData.department}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {studentData.skills.split(',').map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-sm bg-black/40 text-gray-300 rounded-full"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">Reg. No</h3>
              <p className="text-3xl font-bold text-white">{studentData.regNo}</p>
            </div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <DashboardCard
            title="Placement Opportunities"
            description="Explore available job opportunities and company profiles"
            to="/placement-opportunities"
            icon={BriefcaseIcon}
            stats={upcomingCompanies.length}
          />
          
          <DashboardCard
            title="Your Profile"
            description="View and update your professional profile and resume"
            to="/student-profile"
            icon={UserIcon}
            stats="85%"
          />
          
          <DashboardCard
            title={userData.StudentPlacedInfo ? "Share Your Success" : "Interview Tips"}
            description={
              userData.StudentPlacedInfo 
                ? "Share your placement journey to help other students"
                : "Watch placement success stories and interview tips"
            }
            to="/placement-videos"
            icon={VideoIcon}
            stats="New"
          />
        </div>

        {/* Upcoming Drives */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Upcoming Placement Drives</h2>
          <div className="space-y-4">
            {upcomingDrives.map((drive, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800"
              >
                <div className="p-2 rounded-full bg-rose-500/10">
                  <BuildingIcon className="w-5 h-5 text-rose-500" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{drive.company}</p>
                  <p className="text-sm text-gray-400">{drive.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-rose-500">{drive.date}</p>
                  <p className="text-sm text-gray-400">{drive.package}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Companies Section */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Upcoming Companies
            </h2>
            <Button 
              variant="secondary"
              size="sm"
              to="/placement-opportunities"
            >
              View All Opportunities
          </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/40">
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Company</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Role</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Package</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Date</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Eligibility</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Status</th>
                  <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingCompanies.map((company, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-900/40 transition-colors"
                  >
                    <td className="p-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/40">
                          <BuildingIcon className="w-5 h-5 text-rose-500" />
                        </div>
                        <span className="font-medium">{company.company}</span>
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-800">{company.role}</td>
                    <td className="p-4 border-b border-gray-800">
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full">
                        {company.package}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-800">{company.date}</td>
                    <td className="p-4 border-b border-gray-800">
                      <span className="px-2 py-1 bg-rose-500/10 text-rose-500 rounded-full">
                        {company.eligibility}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-800">
                      <span className={`px-2 py-1 rounded-full ${
                        company.status === 'Open' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-800">
                      <Button
                        variant="secondary"
                        size="sm"
                        to="/placement-opportunities"
                      >
                        View Details
          </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

// Icons
const BriefcaseIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UserIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const UsersIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BuildingIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// Add new VideoIcon
const VideoIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
    />
  </svg>
);

// Sample upcoming drives data
const upcomingDrives = [
  {
    company: "Google",
    role: "Software Development Engineer",
    date: "May 15, 2024",
    package: "₹25-40 LPA"
  },
  {
    company: "Microsoft",
    role: "Full Stack Developer",
    date: "May 20, 2024",
    package: "₹20-35 LPA"
  },
  {
    company: "Amazon",
    role: "Software Engineer",
    date: "May 25, 2024",
    package: "₹18-32 LPA"
  }
];

export default StudentDashboard;
