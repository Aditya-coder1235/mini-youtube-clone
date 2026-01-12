const User=require('../models/userSchema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
require('dotenv').config()


exports.SignupUser=async(req,res)=>{
    let {name,email,password,role} =req.body
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exists"});
        }

        let hashPassword=await bcrypt.hash(password,13);

        let newUser=new User({name,email,password:hashPassword});

        await newUser.save()

        res.status(200).json({message:"user signup successfully",user:newUser});

    }catch(err){
        res.status(400).json("Error during signup");
        console.error(err)
    }
}

exports.LoginUser=async(req,res)=>{
    let {  email, password } = req.body
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        let isMatched=await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(400).json({message:"Invalid Password"});
        }

        let token=jwt.sign(
            {id:user._id,role:user.role,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict", 
            maxAge: 60 * 60 * 1000
        });


        res.status(200).json({message:"user login successfully",user:user,token:token});

    } catch (err) {
        res.status(400).json("Error during login");
        console.error(err)
    }
}

exports.Logout=(req,res)=>{
    try {

        res.clearCookie('token',{
            httpOnly:true
        });

        res.status(200).json({message:"user logout successfully"});

    } catch (err) {
        res.status(400).json("Error during logout");
        console.error(err)
    }
}
