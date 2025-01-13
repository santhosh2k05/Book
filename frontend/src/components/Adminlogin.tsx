import React, { useState, useEffect } from "react";
import './Adminlogin.css';

interface Student {
  id: string;
  name: string;
  email: string;
  skills: string[];
  cgpa: number;
  isPlaced: boolean;
}

const Adminlogin: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [cgpaFilter, setCgpaFilter] = useState<number | "">("");

  // Fetch data from MongoDB via the backend API
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

  // Filtered students
  const filteredStudents = students.filter((student) => {
    const matchesSkill = skillFilter
      ? student.skills.some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        )
      : true;

    const matchesCgpa = cgpaFilter ? student.cgpa >= cgpaFilter : true;

    return matchesSkill && matchesCgpa;
  });

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Students</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Skill Filter */}
          <div className="flex-1">
            <label htmlFor="skillFilter" className="block text-sm font-semibold mb-2">
              Filter by Skill:
            </label>
            <input
              type="text"
              id="skillFilter"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter skill (e.g., React)"
            />
          </div>
          {/* CGPA Filter */}
          <div className="flex-1">
            <label htmlFor="cgpaFilter" className="block text-sm font-semibold mb-2">
              Filter by CGPA:
            </label>
            <input
              type="number"
              id="cgpaFilter"
              value={cgpaFilter}
              onChange={(e) => setCgpaFilter(Number(e.target.value) || "")}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter minimum CGPA"
            />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Student Details</h2>
        {filteredStudents.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Skills</th>
                <th className="border border-gray-300 p-2">CGPA</th>
                <th className="border border-gray-300 p-2">Placement Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="border border-gray-300 p-2">{student.name}</td>
                  <td className="border border-gray-300 p-2">{student.email}</td>
                  <td className="border border-gray-300 p-2">
                    {student.skills.join(", ")}
                  </td>
                  <td className="border border-gray-300 p-2">{student.cgpa}</td>
                  <td className="border border-gray-300 p-2">
                    {student.isPlaced ? "Placed" : "Not Placed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Adminlogin; 