import express from "express";
import UserPage from "../models/User.js"; 
 
const Ureg = express.Router();
Ureg.post('/', async(req,res)=>{
    try{
       if(
           !req.body.StudentName||
           !req.body.Studentpassword || 
           !req.body.StudentRegNo||
           !req.body.StudentEmail||
           !req.body.CGPA ||
           !req.body.DOB||
           !req.body.placedInfo
            ){
           return res.status(404).send({
               message :"send all fields   "
           })
       }
       const student ={
           StudentName: req.body.StudentName,
           Studentpassword : req.body.Studentpassword,
           StudentRegNo : req.body.StudentRegNo,
           StudentEmail : req.body.StudentEmail,
           StudentCGPA : req.body.CGPA,
           StudentDOB : req.body.DOB,
           StudentplacedInfo : req.body.placedInfo

       }
       const students= await UserPage.create(student)
       return res.status(201).send(students)
    }
    catch(error){
       console.log("error")
       res.status(500).send({message :error.message})
    }

})
export default Ureg;
