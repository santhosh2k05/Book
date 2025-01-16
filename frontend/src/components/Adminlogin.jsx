import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./ui/Card";
import Button from "./ui/Button";

const Adminlogin = () => {
  const [students, setStudents] = useState([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async (filters) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.skill) params.append('skill', filters.skill);
      if (filters.cgpa) params.append('cgpa', filters.cgpa);
      if (filters.department) params.append('department', filters.department);

      const response = await fetch(`/api/students?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError(error.message);
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
        department: departmentFilter
      });
    }, 500); // Wait 500ms after last change before fetching

    return () => clearTimeout(debounceTimeout);
  }, [skillFilter, cgpaFilter, departmentFilter]);

  const placedStudents = students.filter(
    (student) => student.StudentPlacedInfo
  );
  const notPlacedStudents = students.filter(
    (student) => !student.StudentPlacedInfo
  );

  return (
    <Layout title="Student Management">
      <div className="max-w-7xl mx-auto">
        {/* Filters Section */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
            Filter Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Skill
              </label>
              <input
                type="text"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                placeholder="Enter skill (e.g., React)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minimum CGPA
              </label>
              <input
                type="number"
                value={cgpaFilter}
                onChange={(e) => setCgpaFilter(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-gray-800 rounded-lg 
                         focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                placeholder="Enter minimum CGPA"
                step="0.1"
                min="0"
                max="10"
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
          </div>
        </Card>

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
            <Card className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Placed Students
                </h2>
                <span className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                  {placedStudents.length} Students
                </span>
              </div>
              <StudentTable students={placedStudents} />
            </Card>

            {/* Not Placed Students */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                  Not Placed Students
                </h2>
                <span className="px-4 py-1 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
                  {notPlacedStudents.length} Students
                </span>
              </div>
              <StudentTable students={notPlacedStudents} />
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

const StudentTable = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-black/40">
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Reg. No</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Name</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Email</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">DOB</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">CGPA</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Department</th>
            <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-800">Skills</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr 
              key={student.StudentRegNo}
              className="hover:bg-gray-900/40 transition-colors"
            >
              <td className="p-4 border-b border-gray-800">{student.StudentRegNo}</td>
              <td className="p-4 border-b border-gray-800">{student.StudentName}</td>
              <td className="p-4 border-b border-gray-800">{student.StudentEmail}</td>
              <td className="p-4 border-b border-gray-800">{student.StudentDOB}</td>
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
                  {Array.isArray(student.StudentSkills) ? 
                    student.StudentSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                      >
                        {skill}
                      </span>
                    )) : 
                    <span className="text-gray-400">No skills listed</span>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminlogin;