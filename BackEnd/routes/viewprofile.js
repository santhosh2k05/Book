import express from "express";
import UserPage from "../models/User.js";

const uVist = express.Router();

// GET route to fetch students based on placement status
uVist.get("/", async (req, res) => {
  try {
    const { placed } = req.query;
    const filter = placed ? { StudentPlacedInfo: placed === 'true' } : {};
    
    const students = await UserPage.find(filter);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// GET route to fetch dashboard statistics
uVist.get("/stats", async (req, res) => {
  try {
    const totalStudents = await UserPage.countDocuments();
    const placedStudents = await UserPage.countDocuments({ StudentPlacedInfo: true });
    const notPlacedStudents = await UserPage.countDocuments({ StudentPlacedInfo: false });

    res.status(200).json({
      totalStudents,
      placedStudents,
      notPlacedStudents
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics." });
  }
});

// PUT route to update student profile
uVist.put("/update/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;
    const updates = req.body;

    // Log the incoming request
    console.log("Update Request:", {
      regNo,
      updates
    });

    // Validate required fields
    if (!updates.StudentName || !updates.StudentEmail || !updates.StudentRegNo) {
      return res.status(400).json({
        message: "Required fields cannot be empty"
      });
    }

    // Find the student first
    let student = await UserPage.findOne({ StudentRegNo: regNo });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Update each field individually
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && value !== null) {
        student[key] = value;
      }
    }

    // Save with error handling
    try {
      await student.save();
      console.log("Student updated successfully");
      
      res.status(200).json({
        message: "Profile updated successfully",
        student
      });
    } catch (saveError) {
      console.error("Error saving student:", saveError);
      res.status(500).json({
        message: "Error saving updates",
        error: saveError.message
      });
    }

  } catch (error) {
    console.error("Update route error:", error);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
});

export default uVist;