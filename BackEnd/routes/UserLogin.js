import express from "express";
import bcrypt from "bcrypt";
import UserPage from "../models/User.js"; 

const User = express.Router();


User.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const { StudentName, Studentpassword } = req.body;
   
    if (!StudentName || !Studentpassword) { 
      return res.status(400).send({ message: "StudentName and Studentpassword are required" });
    }

   
    const user = await UserPage.findOne({ StudentName });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!Studentpassword == user.Studentpassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.status(200).send({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during user login:", error.message);
    res.status(500).send({ message: error.message });
  }
});

export default User;
