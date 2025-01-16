import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

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
    <div className="flex justify-center">
      <Button to={to} variant="primary" className="w-1/2">
        View Details
      </Button>
    </div>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    notPlacedStudents: 0
  });
  const [unplacedStudents, setUnplacedStudents] = useState([]);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update how we get admin data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const adminName = userData.AdminName || 'Admin';

  // Add company list state
  const [companies, setCompanies] = useState([
    {
      id: 1,
      company: "Google",
      role: "Software Development Engineer",
      date: "May 15, 2024",
      package: "₹25-40 LPA",
      eligibility: "CGPA > 8.0",
      status: "Open",
      website: "https://careers.google.com"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Full Stack Developer",
      date: "May 20, 2024",
      package: "₹20-35 LPA",
      eligibility: "CGPA > 7.5",
      status: "Open",
      website: "https://careers.microsoft.com"
    },
    {
      id: 3,
      company: "Amazon",
      role: "Software Engineer",
      date: "May 25, 2024",
      package: "₹18-32 LPA",
      eligibility: "CGPA > 7.0",
      status: "Coming Soon",
      website: "https://amazon.jobs"
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/students/stats');
        if (!statsResponse.ok) throw new Error('Failed to fetch statistics');
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch unplaced students
        const unplacedResponse = await fetch('/api/students?placed=false');
        if (!unplacedResponse.ok) throw new Error('Failed to fetch unplaced students');
        const unplacedData = await unplacedResponse.json();
        setUnplacedStudents(unplacedData);

        // Fetch placed students
        const placedResponse = await fetch('/api/students?placed=true');
        if (!placedResponse.ok) throw new Error('Failed to fetch placed students');
        const placedData = await placedResponse.json();
        setPlacedStudents(placedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Layout title="Admin Dashboard">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500 border-r-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Admin Dashboard">
        <Card className="text-center py-8">
          <p className="text-rose-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Welcome, {adminName}
          </h1>
          <p className="text-lg text-gray-400">
            Manage students and monitor placement activities
          </p>
        </div>

        {/* Quick Stats - Now only 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/10 to-purple-500/10">
            <div className="text-center">
              <h3 className="text-gray-400 mb-2">Placed Students</h3>
              <p className="text-3xl font-bold text-white">{stats.placedStudents}</p>
            </div>
          </Card>
        </div>

        {/* Main Actions - Now only 1 card */}
        <div className="mb-12">
          <DashboardCard
            title="Manage Students"
            description="View and manage student profiles, track their progress and placement status"
            to="/admin-management"
            icon={UsersIcon}
            stats={stats.totalStudents}
          />
        </div>

        {/* Placed Students Section */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Placed Students
            </h2>
            <span className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
              {stats.placedStudents} Students
            </span>
          </div>

          {placedStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/40">
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Name</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Reg. No</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">CGPA</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Department</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Skills</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {placedStudents.slice(0, 5).map((student) => (
                    <tr 
                      key={student.StudentRegNo}
                      className="hover:bg-gray-900/40 transition-colors"
                    >
                      <td className="p-4 border-b border-gray-800">{student.StudentName}</td>
                      <td className="p-4 border-b border-gray-800">{student.StudentRegNo}</td>
                      <td className="p-4 border-b border-gray-800">
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full">
                          {student.StudentCGPA}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-800">
                        <span className="px-2 py-1 bg-rose-500/10 text-rose-500 rounded-full">
                          {student.StudentDEPT}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-800">
                        <div className="flex flex-wrap gap-2">
                          {student.StudentSkills.split(',').map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 border-b border-gray-800">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                          {student.StudentCompany || 'Not Available'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {placedStudents.length > 5 && (
                <div className="text-center mt-4">
                  <Button 
                    to="/admin-management" 
                    variant="secondary"
                  >
                    View All Placed Students ({placedStudents.length})
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-400">No placed students found.</p>
          )}
        </Card>

        {/* Unplaced Students Section */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Unplaced Students
            </h2>
            <span className="px-4 py-1 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
              {stats.notPlacedStudents} Students
            </span>
          </div>

          {unplacedStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/40">
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Name</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Reg. No</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">CGPA</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Department</th>
                    <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {unplacedStudents.slice(0, 5).map((student) => (
                    <tr 
                      key={student.StudentRegNo}
                      className="hover:bg-gray-900/40 transition-colors"
                    >
                      <td className="p-4 border-b border-gray-800">{student.StudentName}</td>
                      <td className="p-4 border-b border-gray-800">{student.StudentRegNo}</td>
                      <td className="p-4 border-b border-gray-800">
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full">
                          {student.StudentCGPA}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-800">
                        <span className="px-2 py-1 bg-rose-500/10 text-rose-500 rounded-full">
                          {student.StudentDEPT}
                        </span>
                      </td>
                      <td className="p-4 border-b border-gray-800">
                        <div className="flex flex-wrap gap-2">
                          {student.StudentSkills.split(',').map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {unplacedStudents.length > 5 && (
                <div className="text-center mt-4">
                  <Button 
                    to="/admin-management" 
                    variant="secondary"
                  >
                    View All Unplaced Students ({unplacedStudents.length})
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-400">No unplaced students found.</p>
          )}
        </Card>

        {/* Company List Section */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Active Company Drives
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
                {companies.map((company) => (
                  <tr 
                    key={company.id}
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
                        onClick={() => window.open(company.website, '_blank')}
                      >
                        Visit Career Site
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-gray-800"
              >
                <div className="p-2 rounded-full bg-rose-500/10">
                  <activity.icon className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

// Icons
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

const CheckIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BellIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// Sample recent activities data
const recentActivities = [
  {
    icon: CheckIcon,
    title: "New student placement at Google",
    time: "2 minutes ago"
  },
  {
    icon: BellIcon,
    title: "Microsoft recruitment drive scheduled",
    time: "1 hour ago"
  },
  {
    icon: UsersIcon,
    title: "15 new student profiles updated",
    time: "3 hours ago"
  }
];

export default AdminDashboard;
