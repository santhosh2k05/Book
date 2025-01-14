import mongoose, { Schema } from "mongoose";
const   Admin = mongoose.Schema({
    AdminName :{
        type : String,
        required : true
    },
    AdminPassword:{
        type: String,
        required : true
    },
  
    AdminEmail :{
        type : String,
        required : true 
    },
    AdminPhone  :{
        type : String ,
        required : true     
    },
    AdminDEPT :{
        type : String,
        required : true
    }


},{
    Timestamps : true
})

const AdminPage = mongoose.model('Admin', Admin)
export default AdminPage;