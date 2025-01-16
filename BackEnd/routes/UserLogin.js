import express from "express";
import UserPage from "../models/User.js"; 

const User = express.Router();

User.post("/", async (req, res) => {
  try {
    const { StudentName, StudentPassword } = req.body;
   
    // Validate required fields
    if (!StudentName || !StudentPassword) { 
      return res.status(400).send({ 
        message: "Username and password are required" 
      });
    }

    // Find user by StudentName
    const user = await UserPage.findOne({ StudentName });
    
    // If user not found
    if (!user) {
      return res.status(404).send({ 
        message: "User not found"  
      });
    }

    // Check password
    if (StudentPassword !== user.StudentPassword) {
      return res.status(401).send({ 
        message: "Invalid credentials" 
      });
    }

    // Send user data without sensitive information
    const userData = {
      StudentName: user.StudentName,
      StudentRegNo: user.StudentRegNo,
      StudentEmail: user.StudentEmail,
      StudentCGPA: user.StudentCGPA,
      StudentDEPT: user.StudentDEPT,
      StudentSkills: user.StudentSkills,
      StudentPlacedInfo: user.StudentPlacedInfo
    };

    res.status(200).send({ 
      message: "Login successful",
      user: userData 
    });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default User;
