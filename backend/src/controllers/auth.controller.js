import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup=async (req,res)=>{
    const {email,name,password}=req.body;

    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"}
            )
        }

        //
        const user =await User.findOne({email})

        if(user) {
            return  res.status(400).json({message:"Email already exists"})
        }

        //hash 
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //
        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            //generate jwtoken
            generateToken(newUser._id,res)
            await newUser.save()

            return res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            })

        }else{
            return res.status(400).json({message:"invalid user data"});
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"internal server error "})
    }
}


export const login=async (req,res)=>{
    const {email, password}=req.body;

    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid credentials"});
        }
        //compare paswords 
       const isPasswordCorrect= await bcrypt.compare(password,user.password)

       if(!isPasswordCorrect){
        return res.status(400).json({message:"incoreect password"})
       }

       generateToken(user._id,res)
       res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
       })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({message:"internal server error "})
        
    }
}


export const logout=(req,res)=>{
    try {
        res.cookie("jwt", "",{maxAge:0})
    res.status(200).json({message:"logged out succesfully"})

    } catch (error) {
         console.log("error in logout controller",error.message);
        res.status(500).json({message:"internal server error "})
        
    }
}