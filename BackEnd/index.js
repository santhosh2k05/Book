import express from "express"
import { port , mongodb} from "./config.js"
import mongoose  from "mongoose"
const app =  express()

app.listen(port,()=>{
    console.log(`app listening to port : ${port}`)
})
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