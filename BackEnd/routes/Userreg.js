import express from "express";
import AdminPage from "../models/Admin.js"; 

const Areg = express.Router();

Areg.post('/', async(req ,res)=>{
    try {
        // Validation to ensure all fields are provided
        if(
            !req.body.AdminName ||
            !req.body.AdminPassword ||
            !req.body.AdminEmail ||
            !req.body.AdminPhone ||
            !req.body.AdminDEPT
        ){
            return res.status(400).send({
                message: "Please fill in all fields"
            });
        }

        // Creating an admin object from the request body
        const Admin = {
            AdminName: req.body.AdminName,
            AdminPassword: req.body.AdminPassword,
            AdminEmail: req.body.AdminEmail,
            AdminPhone: req.body.AdminPhone,
            AdminDEPT: req.body.AdminDEPT
        };

        const newAdmin = await AdminPage.create(Admin);

        return res.status(201).send({
            message: "Admin registered successfully!",
            admin: newAdmin
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "An error occurred",
            error: error.message
        });
    }
});

export default Areg;
