import express from "express"
import { port , mongodb} from "./config.js"
import mongoose  from "mongoose"
import Admin from "./routes/AdminLogin.js"
import User from "./routes/UserLogin.js"
import cors from "cors";
import Areg from "./routes/Adminreg.js"
import Ureg from "./routes/Userreg.js"
import uVist from "./routes/viewprofile.js"
import studentDash from "./routes/studentdash.js"

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
app.use(cors({
    origin:"http://localhost:5173",
    methods:'GET,POST,PUT,DELETE',
    allowedHeaders:'Content-Type,Authorization'
}))
app.use(express.json())
app.listen(port,()=>{
    console.log(`app listening to port : ${port}`)
})
app.use('/api/UserRegistration',Ureg)
app.use('/api/AdminRegistration',Areg)
app.use('/api/Admin' , Admin)
app.use('/api/User', User)
app.use('/api/students',uVist)
app.use('/api/student-dashboard', studentDash)

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  res.status(500).json({
    message: "An error occurred",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Add global error handling
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    message: "An error occurred",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

