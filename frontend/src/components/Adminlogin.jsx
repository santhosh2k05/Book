import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const calculateYear = (batch) => {
  if (!batch) return '';
  const currentYear = new Date().getFullYear();
  const batchYear = parseInt(batch);
  const yearOfStudy = currentYear - batchYear;
  
  if (yearOfStudy >= 1 && yearOfStudy <= 4) {
    return yearOfStudy.toString();
  }
  return '';
};

const Adminlogin = () => {
  const [students, setStudents] = useState([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async (filters) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      // Add filters only if they have values
      if (filters.skill?.trim()) {
        params.append('skill', filters.skill.trim());
      }

      if (filters.cgpa && !isNaN(parseFloat(filters.cgpa))) {
        params.append('cgpa', filters.cgpa);
      }

      if (filters.department) {
        params.append('department', filters.department);
      }

      console.log("Sending filters:", Object.fromEntries(params));

      const response = await fetch(`/api/students?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

        const data = await response.json();
      console.log("Received students:", data);

      // Process and filter students
      let filteredData = data.map(student => ({
        ...student,
        calculatedYear: calculateYear(student.StudentBatch)
      }));

      // Apply year filter
      if (filters.year) {
        filteredData = filteredData.filter(student => 
          student.calculatedYear === filters.year
        );
        console.log(`Filtered to ${filteredData.length} students in year ${filters.year}`);
      }

      // Apply CGPA filter
      if (filters.cgpa) {
        const minCGPA = parseFloat(filters.cgpa);
        filteredData = filteredData.filter(student => {
          const studentCGPA = parseFloat(student.StudentCGPA);
          return !isNaN(studentCGPA) && studentCGPA >= minCGPA;
        });
      }

      // Apply skills filter
      if (filters.skill?.trim()) {
        const searchSkill = filters.skill.trim().toLowerCase();
        filteredData = filteredData.filter(student =>
          student.StudentSkills?.toLowerCase().includes(searchSkill)
        );
      }

      setStudents(filteredData);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch students. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStudents({});
  }, []);

  // Debounced filter function
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchStudents({
        skill: skillFilter,
        cgpa: cgpaFilter,
        department: departmentFilter,
        year: yearFilter
      });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [skillFilter, cgpaFilter, departmentFilter, yearFilter]);

  // Separate placed and unplaced students after filtering
  const placedStudents = students.filter(student => student.StudentPlacedInfo);
  const notPlacedStudents = students.filter(student => !student.StudentPlacedInfo);

  // Update the filter handlers
  const handleSkillFilter = (value) => {
    setSkillFilter(value);
  };

  const handleCGPAFilter = (value) => {
    // Only allow valid CGPA values
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 10)) {
      setCgpaFilter(value);
    }
  };

  const handleYearFilter = (value) => {
    console.log("Setting year filter to:", value);
    setYearFilter(value);
  };

  return (
    <Layout title="Student Management">
      <div className="max-w-7xl mx-auto">
      {/* Filters Section */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
          Filter Students
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Skill
            </label>
            <input
              type="text"
              value={skillFilter}
                onChange={(e) => handleSkillFilter(e.target.value)}
                placeholder="Enter skills (e.g., React)"
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum CGPA
            </label>
            <input
              type="number"
              value={cgpaFilter}
                onChange={(e) => handleCGPAFilter(e.target.value)}
                placeholder="Minimum CGPA"
                step="0.1"
                min="0"
                max="10"
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <select
                value={yearFilter}
                onChange={(e) => handleYearFilter(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                           focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              >
                <option value="">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Display total count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-400">
            Total Students: {students.length} 
            (Placed: {placedStudents.length}, Not Placed: {notPlacedStudents.length})
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500 border-r-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading students data...</p>
      </div>
        ) : error ? (
          <Card className="text-center py-8">
            <p className="text-rose-500">{error}</p>
            <Button onClick={() => fetchStudents({})} className="mt-4">
              Retry
            </Button>
          </Card>
        ) : (
          <>
            {/* Placed Students */}
            {placedStudents.length > 0 && (
              <Card className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                    Placed Students
                  </h2>
                  <span className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                    {placedStudents.length} Students
                  </span>
                </div>
                <StudentTable 
                  students={placedStudents} 
                  showPlacementInfo={true}
                />
              </Card>
            )}

            {/* Not Placed Students */}
            {notPlacedStudents.length > 0 && (
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
          Not Placed Students
        </h2>
                  <span className="px-4 py-1 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
                    {notPlacedStudents.length} Students
                  </span>
                </div>
                <StudentTable 
                  students={notPlacedStudents}
                  showPlacementInfo={false}
                />
              </Card>
            )}

            {/* Show message if no students found */}
            {students.length === 0 && (
              <Card className="text-center py-8">
                <p className="text-gray-400">No students found matching the filters.</p>
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

const StudentTable = ({ students, showPlacementInfo }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
      <thead>
          <tr className="bg-black/40">
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Name</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Reg No</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Department</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Year</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">CGPA</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Skills</th>
            {showPlacementInfo && (
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Company</th>
            )}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
            <tr key={student.StudentRegNo} className="hover:bg-gray-800/30">
              <td className="p-4 border-b border-gray-800">{student.StudentName}</td>
              <td className="p-4 border-b border-gray-800">{student.StudentRegNo}</td>
              <td className="p-4 border-b border-gray-800">{student.StudentDEPT}</td>
              <td className="p-4 border-b border-gray-800">
                {student.calculatedYear ? `${student.calculatedYear}${getYearSuffix(student.calculatedYear)} Year` : 'N/A'}
              </td>
              <td className="p-4 border-b border-gray-800">{student.StudentCGPA}</td>
              <td className="p-4 border-b border-gray-800">
                <div className="flex flex-wrap gap-1">
                  {student.StudentSkills?.split(',').map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </td>
              {showPlacementInfo && (
                <td className="p-4 border-b border-gray-800">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full">
                    {student.StudentCompany}
                  </span>
            </td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

// Helper function to add correct suffix to year
const getYearSuffix = (year) => {
  const num = parseInt(year);
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
};

export default Adminlogin;