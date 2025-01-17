import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const AdminManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    placementStatus: "",
    searchQuery: ""
  });

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Add query parameters for filters
        const queryParams = new URLSearchParams();
        if (filters.department) queryParams.append('department', filters.department);
        if (filters.year) queryParams.append('year', filters.year);
        if (filters.placementStatus) {
          queryParams.append('placed', filters.placementStatus === 'placed');
        }

        const response = await fetch(`/api/students?${queryParams}`);
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [filters]); // Add filters as dependency

  // Apply filters
  useEffect(() => {
    let result = [...students];

    if (filters.department) {
      result = result.filter(student => 
        student.StudentDEPT.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.year) {
      result = result.filter(student => 
        student.StudentYear === filters.year
      );
    }

    if (filters.placementStatus) {
      result = result.filter(student => {
        if (filters.placementStatus === 'placed') {
          return student.StudentPlacedInfo;
        } else {
          return !student.StudentPlacedInfo;
        }
      });
    }

    if (filters.searchQuery) {
      result = result.filter(student =>
        student.StudentName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        student.StudentRegNo.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [filters, students]);

  // Get unique departments and years for filters
  const departments = [...new Set(students.map(student => student.StudentDEPT))];
  const years = ["1", "2", "3", "4"]; // Or use the dynamic version if you prefer

  return (
    <Layout title="Student Management">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Student Management
          </h1>
          <p className="text-lg text-gray-400">
            View and filter student profiles
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Placement Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Placement Status
                </label>
                <select
                  value={filters.placementStatus}
                  onChange={(e) => setFilters({ ...filters, placementStatus: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                >
                  <option value="">All Students</option>
                  <option value="placed">Placed</option>
                  <option value="not_placed">Not Placed</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  placeholder="Search by name or reg. no"
                  className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.StudentRegNo}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {student.StudentName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{student.StudentName}</h3>
                    <p className="text-gray-400 text-sm">{student.StudentRegNo}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Department</span>
                    <span>{student.StudentDEPT}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year</span>
                    <span>{student.StudentYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CGPA</span>
                    <span>{student.StudentCGPA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      student.StudentPlacedInfo 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {student.StudentPlacedInfo ? 'Placed' : 'Not Placed'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {/* Add view details functionality */}}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminManagement; 