import express from "express";
import UserPage from "../models/User.js";

const studentDash = express.Router();

// GET route to fetch student dashboard data
studentDash.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await UserPage.findOne({ StudentRegNo: studentId });
    
    if (!student) {
      return res.status(404).json({ 
        message: "Student not found" 
      });
    }

    // Get application and interview counts (you'll need to add these models/collections later)
    // For now using placeholder data
    const dashboardData = {
      studentInfo: {
        name: student.StudentName,
        regNo: student.StudentRegNo,
        cgpa: student.StudentCGPA,
        department: student.StudentDEPT,
        email: student.StudentEmail,
        skills: student.StudentSkills,
        isPlaced: student.StudentPlacedInfo
      },
      stats: {
        applications: 0, // You'll need to implement this
        interviews: 0,   // You'll need to implement this
        upcomingInterviews: [] // You'll need to implement this
      }
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    res.status(500).json({ 
      message: "Failed to fetch dashboard data" 
    });
  }
});

export default studentDash;
