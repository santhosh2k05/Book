import express from "express"
import { port , mongodb} from "./config.js"
import mongoose  from "mongoose"
import AdminPage from "./models/Admin.js"
import UserPage from "./models/User.js"
mongoose
    .connect(mongodb)
    .then(()=>{
        console.log("database connected")
        app.get('/',(req,res)=> { 
            console.log(req)
            return res.status(234).send("welcome")
        })
    })
    .catch(()=>{ 
        console.log("error")
    })
const app =  express()
app.use(express.json())
app.listen(port,()=>{
    console.log(`app listening to port : ${port}`)
})
app.post('/UserRegistration', async(req,res)=>{
     try{
        if(
            !req.body.StudentName||
            !req.body.Studentpassword || 
            !req.body.StudentRegNo||
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
app.post('/adminRegistration', async(req ,res)=>{
    try {
    if(
        !req.body.AdminName ||
        !req.body.AdminPassword ||
        !req.body.AdminEmail||
        !req.body.AdminPhone
    ){
        return res.status(404).send({
            message : "Message All Fields"  
        })
    }
    const  Admin  ={
        AdminName : req.body.AdminName,
        AdminPassword : req.body.AdminPassword,
        AdminEmail : req.body.AdminEmail,
        AdminPhone : req.body.AdminPhone
    }
    const Admins = await AdminPage.create(Admin)
    return res.status(201).send(Admins)
}
catch(error){
   console.log("error")
   res.status(500).send({message :error.message})
}
})
const AdminLoginR =  require('./routes/AdminLogin.jsx')
const UserLoginR  = require('./routes/UserLogin.js')
app.use('/AdminLogin' , AdminLoginR)
app.use('/UserLogin', UserLoginR)

