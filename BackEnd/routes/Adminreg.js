import express from "express";
import AdminPage from "../models/Admin.js"; 

const Areg = express.Router();
Areg.post('/', async(req ,res)=>{
    try {
    if(
        !req.body.AdminName ||
        !req.body.AdminPassword ||
        !req.body.AdminEmail||
        !req.body.AdminPhone|
        !req.body.AdminDEPT
    ){
        return res.status(404).send({
            message : "Message All Fields"  
        })
    }
    const  Admin  ={
        AdminName : req.body.AdminName,
        AdminPassword : req.body.AdminPassword,
        AdminEmail : req.body.AdminEmail,
        AdminPhone : req.body.AdminPhone,
        AdminDEPT : req.body.AdminDEPT

    }
    const Admins = await AdminPage.create(Admin)
    return res.status(201).send(Admins)
}
catch(error){
   console.log("error")
   res.status(500).send({message :error.message})
}
})
export default Areg;