import mongoose, { Schema } from "mongoose";
const   user = mongoose.Schema({
    StudentName :{
        type: String ,
        required: true
    },
    Studentpassword :{
            type : String,
            required : true 
    },
    StudentRegNo :{
            type : String,
            required : true
    },
    StudentEmail : {
        type: String,
        required : true
    },
    CGPA :{
            type : String,
            required : false
    },
    DOB  :{
        type : String ,
        required : false 
    },
    placedInfo    :{
        type : String,
        required : false 
    }   ,


},{
    Timestamps : true
})

const UserPage = mongoose.model('User', user)
export default UserPage;