import mongoose, { Schema } from "mongoose"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
},{
    timestamps:true,
})


//create a model 
const User=mongoose.model("User",userSchema)

export default User;