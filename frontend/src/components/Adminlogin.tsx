import React, { useState, useEffect } from "react";
import './Adminlogin.css';
import { Link } from "react-router-dom";

interface Student {
  regNo: string;
  name: string;
  dob: string;
  email: string;
  password: string;
  cgpa: number;
  department: string;
  platform: string;
  isPlaced: boolean;
  skills: string[];
}

const Adminlogin: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState<number | "">("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students
    .filter((student) => {
      const matchesSkill = skillFilter
        ? student.skills.some((skill) =>
            skill.toLowerCase().includes(skillFilter.toLowerCase())
          )
        : true;

      const matchesCgpa = cgpaFilter ? student.cgpa >= cgpaFilter : true;
      const matchesDepartment = departmentFilter
        ? student.department.toLowerCase() === departmentFilter.toLowerCase()
        : true;

      return matchesSkill && matchesCgpa && matchesDepartment;
    })
    .sort((a, b) => b.cgpa - a.cgpa);

  const placedStudents = filteredStudents.filter((student) => student.isPlaced);
  const notPlacedStudents = filteredStudents.filter(
    (student) => !student.isPlaced
  );

  return (
    <div className="bg-black min-h-screen p-10">
  {/* Title and Logout Button */}
  <div className="flex justify-between items-center mb-6">
    {/* Title */}
    <h1 className="text-3xl text-white font-bold whitespace-nowrap">Admin Dashboard</h1>
    
    {/* Logout Button */}
    <Link to="/logout">
      <button
        className="text-lg px-4 py-2 font-semibold text-white border border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-transform duration-300"
      >
        Logout
      </button>
    </Link>
  </div>


      {/* Filters Section */}
      <div className="bg-black border border-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl text-white font-semibold mb-4">Filter Students</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="skillFilter" className="block text-sm text-white font-semibold mb-2">
              Filter by Skill:
            </label>
            <input
              type="text"
              id="skillFilter"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md"
              placeholder="Enter skill (e.g., React)"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="cgpaFilter" className="block text-sm text-white font-semibold mb-2">
              Filter by CGPA:
            </label>
            <input
              type="number"
              id="cgpaFilter"
              value={cgpaFilter}
              onChange={(e) => setCgpaFilter(Number(e.target.value) || "")}
              className="w-full p-2.5 border border-gray-300 rounded-md"
              placeholder="Enter minimum CGPA"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="departmentFilter" className="block text-sm text-white font-semibold mb-2">
              Filter by Department:
            </label>
            <select
              id="departmentFilter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Placed Students Table */}
      <div className="bg-black border border-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl text-white font-semibold mb-4">Placed Students</h2>
        {placedStudents.length > 0 ? (
          <StudentTable students={placedStudents} />
        ) : (
          <p className="text-center text-white">No placed students found.</p>
        )}
      </div>

      {/* Not Placed Students Table */}
      <div className="bg-black border border-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-4">Not Placed Students</h2>
        {notPlacedStudents.length > 0 ? (
          <StudentTable students={notPlacedStudents} />
        ) : (
          <p className="text-center text-white">No not placed students found.</p>
        )}
      </div>
    </div>
  );
};

const StudentTable: React.FC<{ students: Student[] }> = ({ students }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Reg. No</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">DOB</th>
          <th className="border border-gray-300 p-2">CGPA</th>
          <th className="border border-gray-300 p-2">Department</th>
          <th className="border border-gray-300 p-2">Skills</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.regNo}>
            <td className="border border-gray-300 p-2">{student.regNo}</td>
            <td className="border border-gray-300 p-2">{student.name}</td>
            <td className="border border-gray-300 p-2">{student.email}</td>
            <td className="border border-gray-300 p-2">{student.dob}</td>
            <td className="border border-gray-300 p-2">{student.cgpa}</td>
            <td className="border border-gray-300 p-2">{student.department}</td>
            <td className="border border-gray-300 p-2">
              {student.skills.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Adminlogin;
