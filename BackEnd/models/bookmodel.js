import mongoose, { Schema } from "mongoose";
const   bookschema = mongoose.Schema({
    title:{
        type : string,
        required : true
    },
    author:{
        type: string,
        required : true
    },
    publishyear :{
        type: Number,
        required: true
    }
},{
    Timestamps : true
})
export const book  = mongoose.model('cat', bookschema)