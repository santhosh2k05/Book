import React, { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  personalInfo: string;               
  skills: string[];
  cgpa: number;
  isPlaced: boolean;
  placementLink?: string;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

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

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Student List</h1>
      {students.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Personal Info</th>
              <th className="border border-gray-300 p-2">Skills</th>
              <th className="border border-gray-300 p-2">CGPA</th>
              <th className="border border-gray-300 p-2">Placement Status</th>
              <th className="border border-gray-300 p-2">Placement Link</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">{student.email}</td>
                <td className="border border-gray-300 p-2">{student.personalInfo}</td>
                <td className="border border-gray-300 p-2">
                  {student.skills.join(", ")}
                </td>
                <td className="border border-gray-300 p-2">{student.cgpa}</td>
                <td className="border border-gray-300 p-2">
                  {student.isPlaced ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2">
                  {student.placementLink ? (
                    <a
                      href={student.placementLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black-500 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}
    </div>
  );
};

export default StudentList;