import express from "express";
import AdminPage from "../models/Admin.js";

const Admin = express.Router();

Admin.post("/", async (req, res) => {
  try {
    const { AdminName, AdminPassword } = req.body;

    // Validate required fields
    if (!AdminName || !AdminPassword) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    // Find admin by AdminName
    const admin = await AdminPage.findOne({ AdminName });

    // If admin not found
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    // Check password
    if (AdminPassword !== admin.AdminPassword) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // If login successful, return admin data (excluding sensitive info)
    const adminData = {
      AdminName: admin.AdminName,
      // Add other fields you want to return
    };

    res.status(200).json({
      message: "Login successful",
      admin: adminData
    });

  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({
      message: "An error occurred during login. Please try again later."
    });
  }
});

export default Admin;
