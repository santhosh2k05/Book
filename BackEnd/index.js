import express from "express"
import { port , mongodb} from "./config.js"
import mongoose  from "mongoose"
import Admin from "./routes/AdminLogin.js"
import User from "./routes/UserLogin.js"
import cors from "cors";
import Areg from "./routes/Adminreg.js"
import Ureg from "./routes/Userreg.js"

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
app.use('/UserRegistration',Ureg)
app.use('/AdminRegistration',Areg)
app.use('/api/Admin' , Admin)
app.use('/User', User)

