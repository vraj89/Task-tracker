const User=require('../models/User')
const becrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config();

exports.signup=async(req,res)=>{
   try{
    const[email,password]=req.body;
    if(!email||!password){
        return res.status(400).json({message:"please provide a email and password"})

    }

         const userExisits=await User.findOne({email});
         if(userExisits){
            return res.status(400).json({message:"User already exisit"})
         }

         const newUser= await User.create({email,password})

         const token=jwt.sign({userId:newUser._id},'JWT_SECRET_KEY',{expiresIn:'1d'});

         res.status(201).json({
            message:"User register successfully",
            token,
            user:newUser._id
         })
   }
   catch(err){
       res.status(500).json({message:err.message});
   }
      

}

exports.login=async(req,res)=>{
    try{
        const[email,password]=req.body;

        const isUserExist= await User.findOne({email})
        if(!isUserExist) res.status(400).json({message:'Invalid credentials'})

        const isMatch=await becrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials '})
        
        const token=jwt.sign({userId:user._id},'JWT_SECRET_KEY',{expiresIn:'1d'})

        res.status(200).json({token,id: existingUser._id,message:"Login successfull"})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};