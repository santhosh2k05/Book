import express from "express";
import AdminPage from "../models/Admin.js"; 
import UserPage from "../models/User.js";

const  Ureg = express.Router();
Ureg.use(express.json())

Ureg.post('/', async(req ,res)=>{
    try {
        // Validation to ensure all fields are provided
        if(
            !req.body.StudentName ||
            !req.body.StudentRegNo ||
            !req.body.StudentDOB||
            !req.body.StudentEmail ||
            !req.body.StudentPassword||
            !req.body.StudentCGPA||
            !req.body.StudentDEPT||
            !req.body.StudentPlatform ||
            !req.body.StudentPlacedInfo||
            !req.body.StudentSkills
            
        ){
            console.log(req.body)
            return res.status(400).send({
                message: "Please fill in all fields"
            });
        }

        // Creating an admin object from the request body
        const User = {
            StudentName :req.body.StudentName,
            StudentRegNo : req.body.StudentRegNo,
            StudentDOB: req.body.StudentDOB,
            StudentEmail :req.body.StudentEmail ,
            StudentPassword : req.body.StudentPassword,   
            StudentCGPA :req.body.StudentCGPA,
            StudentDEPT :req.body. StudentDEPT,
            StudentPlatform: req.body.StudentPlatform,
            StudentPlacedInfo:req.body.StudentPlacedInfo,
            StudentSkills :req.body.StudentSkills
        };
 
        const Users = await UserPage.create(User);

        return res.status(201).send({
            message: "Student registered successfully!",
            admin: Users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "An error occurred",
            error: error.message
        });
    }
});

export default Ureg;
