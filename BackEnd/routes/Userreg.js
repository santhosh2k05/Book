import express from "express";
import AdminPage from "../models/Admin.js"; 
import UserPage from "../models/User.js";

const Ureg = express.Router();
Ureg.use(express.json())

Ureg.post('/', async(req, res) => {
    try {
        // Check if email already exists
        const existingUser = await UserPage.findOne({ StudentEmail: req.body.StudentEmail });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered. Please use a different email."
            });
        }

        // Update required fields validation
        const requiredFields = [
            'StudentName',
            'StudentRegNo',
            'StudentEmail',
            'StudentPassword',
            'StudentDEPT',
            'StudentCGPA',
            'StudentSkills',
            'StudentPhone',
            'StudentAddress',
            'StudentDOB',
            'StudentGender',
            'StudentYear',
            'StudentSemester',
            'StudentSection',
            'StudentBatch'
        ];

        // Check for missing required fields
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            console.log('Missing fields:', missingFields);
            return res.status(400).send({
                message: "Please fill in all required fields",
                missingFields: missingFields
            });
        }

        // Validate placement info
        const isPlaced = req.body.StudentPlacedInfo === true || req.body.StudentPlacedInfo === 'true';
        if (isPlaced && !req.body.StudentCompany) {
            return res.status(400).send({
                message: "Company name is required for placed students"
            });
        }

        // Create new student with all fields
        const student = new UserPage({
            ...req.body,
            StudentPlacedInfo: isPlaced,
            StudentCompany: isPlaced ? req.body.StudentCompany : null
        });

        const Users = await UserPage.create(student);

        return res.status(201).json({
            message: "Student registered successfully!",
            student: Users
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            error: error.message
        });
    }
});

export default Ureg;
