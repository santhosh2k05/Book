import express from "express";
import AdminPage from "../models/Admin.js"; 

const Areg = express.Router();
Areg.post('/', async(req ,res)=>{
    try {
        // Check if email already exists
        const existingAdmin = await AdminPage.findOne({ AdminEmail: req.body.AdminEmail });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Email already registered. Please use a different email."
            });
        }

        const admin = new AdminPage(req.body);
        const Admins = await AdminPage.create(admin);

        return res.status(201).json({
            message: "Admin registered successfully!",
            admin: Admins
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            error: error.message
        });
    }
})
export default Areg;