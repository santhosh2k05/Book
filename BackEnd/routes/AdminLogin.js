import express from "express";
import bcrypt from "bcrypt";
import AdminPage from "../models/Admin.js"; 

const Admin = express.Router();


Admin.post("/", async (req, res) => {
  try {
    const { AdminName, AdminPassword } = req.body;


    if (!AdminName || !AdminPassword) {
      return res.status(400).send({ message: "AdminName and AdminPassword are required" });
    }

    const admin = await AdminPage.findOne({ AdminName });
    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    if (AdminPassword!== admin.AdminPassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.status(200).send({ message: "Login successful", admin });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    res.status(500).send({ message: error.message });
  }
});

export default Admin;
