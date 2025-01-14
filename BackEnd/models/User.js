import mongoose, { Schema } from "mongoose";
const   user = mongoose.Schema({
    StudentName :{
        type: String ,
        required: true
    },
    StudentRegNo  :{
        type : String ,
        required : true
    },
    StudentDOB: {
        type : String,
        required : true
    },
    StudentEmail : {
        type: String,
        required : true
    },
    StudentPassword :{
            type : String,
            required : true 
    },
    StudentCGPA :{
            type : String,
            required : true
    },
    StudentDEPT :{
        type : String,
        required : true
    },
    StudentPlatform: {
        type : String ,
        required : true
    },
    StudentPlacedInfo :{
        type : String,
        required : true
    },
    StudentSkills:{
            type : String,
            required : true
    },
  


},{
    Timestamps : true
})

const UserPage = mongoose.model('User', user)
export default UserPage;