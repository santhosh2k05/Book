import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PlacementDashboard = () => {
  const [placementData, setPlacementData] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [sortedDepartments, setSortedDepartments] = useState([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // Mock API call to fetch CGPA data
        const response = await fetch("/api/StudentCGPA"); // Replace with your actual API endpoint
        const data = await response.json();

        // Example fetched data structure: [{ department: 'CSE', cgpa: 8.5 }, { department: 'ECE', cgpa: 7.9 }]
        const departmentCounts = {};

        // Count students per department
        data.forEach((student) => {
          const { department } = student;
          if (!departmentCounts[department]) {
            departmentCounts[department] = 0;
          }
          departmentCounts[department] += 1;
        });

        // Transform data into an array
        const transformedData = Object.entries(departmentCounts).map(
          ([department, count]) => ({ department, count })
        );

        setPlacementData(transformedData);

        // Prepare data for the Pie Chart
        const departments = transformedData.map((item) => item.department);
        const counts = transformedData.map((item) => item.count);
        setPieChartData({
          labels: departments,
          datasets: [
            {
              label: "Placed Students",
              data: counts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });

        // Sort departments by count
        const sorted = transformedData.sort((a, b) => b.count - a.count);
        setSortedDepartments(sorted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      {/* Pie Chart */}
      <div style={{ width: "50%" }}>
        <h2>Department-wise Placement Count</h2>
        <Pie data={pieChartData} />
      </div>

      {/* Table */}
      <div style={{ width: "50%" }}>
        <h2>Most Placed Students by Department</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Department
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDepartments.map((dept, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {dept.department}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {dept.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementDashboard;
