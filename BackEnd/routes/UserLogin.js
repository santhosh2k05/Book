import express from "express";
import UserPage from "../models/User.js"; 

const User = express.Router();

User.post("/", async (req, res) => {
  try {
    const { StudentName, StudentPassword } = req.body;

    // Find student by StudentName
    const student = await UserPage.findOne({ StudentName });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Check password
    if (StudentPassword !== student.StudentPassword) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // Send all necessary user data
    const userData = {
      StudentName: student.StudentName,
      StudentEmail: student.StudentEmail,
      StudentRegNo: student.StudentRegNo,
      StudentDEPT: student.StudentDEPT,
      StudentCGPA: student.StudentCGPA,
      StudentPlacedInfo: student.StudentPlacedInfo,
      StudentCompany: student.StudentCompany,
      // Add other fields you want to send
    };

    res.status(200).json({
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "An error occurred during login"
    });
  }
});

export default User;
