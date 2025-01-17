import express from "express";
import UserPage from "../models/User.js";

const uVist = express.Router();

// GET route to fetch students with filters
uVist.get("/", async (req, res) => {
  try {
    const { skill, cgpa, department, batch } = req.query;
    let filter = {};

    // Build MongoDB query
    if (department && department !== 'undefined' && department !== '') {
      filter.StudentDEPT = department;
    }

    if (batch && batch !== 'undefined' && batch !== '') {
      filter.StudentBatch = batch;
    }

    if (cgpa && cgpa !== 'undefined' && cgpa !== '') {
      const cgpaNumber = parseFloat(cgpa);
      if (!isNaN(cgpaNumber)) {
        // Use $gte (greater than or equal) operator for CGPA
        filter.StudentCGPA = { $gte: cgpaNumber.toString() };
      }
    }

    if (skill && skill !== 'undefined' && skill !== '') {
      // Case-insensitive search for skills
      filter.StudentSkills = {
        $regex: skill.trim(),
        $options: 'i'
      };
    }

    console.log("Applied filters:", filter);

    const students = await UserPage.find(filter);
    console.log(`Found ${students.length} students`);

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message
    });
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

    console.log("Received update request:", { regNo, updates }); // Debug log

    // Find the student first
    const student = await UserPage.findOne({ StudentRegNo: regNo });

    if (!student) {
      console.log("Student not found:", regNo);
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Update fields
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        student[key] = updates[key];
      }
    });

    // Handle placement info specifically
    if (updates.StudentPlacedInfo !== undefined) {
      student.StudentPlacedInfo = Boolean(updates.StudentPlacedInfo);
      if (student.StudentPlacedInfo && updates.StudentCompany) {
        student.StudentCompany = updates.StudentCompany;
      } else if (!student.StudentPlacedInfo) {
        student.StudentCompany = null;
      }
    }

    // Save the updated student
    await student.save();

    console.log("Student updated successfully:", student);

    res.status(200).json({
      message: "Profile updated successfully",
      student
    });

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
});

// Add error handling middleware
uVist.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({
    message: "An error occurred",
    error: err.message
  });
});

export default uVist;