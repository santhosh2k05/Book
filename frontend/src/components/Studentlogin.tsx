import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Student {
  id: string;
  StudentName: string;
  StudentRegNo: string;
  StudentDOB: string;
  StudentEmail: string;
  StudentPassword: string;
  StudentCGPA: number;
  StudentDEPT: string;
  StudentPlatform: string;
  StudentPlacedInfo: boolean;
  StudentSkills: string[];
  placementLink?: string;
}

const StudentDetails = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [placementLink, setPlacementLink] = useState<string>("");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized access. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch all students' data
        const response = await fetch("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }

        const data: Student[] = await response.json();
        setStudents(data);

        // Fetch the current student's details
        const currentStudentResponse = await fetch(
          "http://localhost:5000/api/students/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!currentStudentResponse.ok) {
          throw new Error("Failed to fetch current student data.");
        }

        const currentStudentData: Student = await currentStudentResponse.json();
        setCurrentStudent(currentStudentData);

        // Pre-fill placement link if available
        if (currentStudentData.placementLink) {
          setPlacementLink(currentStudentData.placementLink);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  const handlePlacementLinkSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/students/updatePlacementLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ placementLink }),
      });

      if (!response.ok) {
        throw new Error("Failed to update placement link.");
      }

      alert("Placement link updated successfully!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update placement link.");
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!currentStudent) {
    return <div className="text-center text-white">No student data available.</div>;
  }

  // Calculate rank based on CGPA
  const sortedStudents = [...students].sort((a, b) => b.StudentCGPA - a.StudentCGPA);
  const rank = sortedStudents.findIndex((student) => student.id === currentStudent.id) + 1;

  return (
    <div className="bg-black min-h-screen p-10">
      <div className="flex justify-between items-center mb-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white whitespace-nowrap">
          Welcome, {currentStudent.StudentName}
        </h1>
        
        {/* Logout Button */}
        <Link to="/logout">
          <button
            className="text-lg px-8 py-3 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Name</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentName}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Registration Number</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentRegNo}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Date of Birth</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentDOB}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Email</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentEmail}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Department</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentDEPT}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Platform</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentPlatform}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Skills</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentSkills.join(", ")}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">CGPA</td>
            <td className="border border-gray-300 p-2">{currentStudent.StudentCGPA}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold">Rank</td>
            <td className="border border-gray-300 p-2">{rank}</td>
          </tr>
        </tbody>
      </table>

      {currentStudent.StudentPlacedInfo && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-2">Upload Placement Video Link</h2>
          <input
            type="text"
            value={placementLink}
            onChange={(e) => setPlacementLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Paste video link here"
          />
          <button
            onClick={handlePlacementLinkSubmit}
            className="w-full text-lg px-8 py-3 mb-5 font-extrabold text-white border-2 border-white hover:shadow-lg hover:shadow-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
