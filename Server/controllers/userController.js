const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const token = require('../models/token')



const signUpUser = async(req,res)=>{
    try{
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        if(!email || !username || !password){
            return res.status(400).json({success:false, msg:'Please fill in all fields '})
        }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        if(!emailRe.test(email)){
            return res.status(400).json({success:false,msg:'Please enter a valid email address'})
        }
        const emailExists = await userModel.findOne({email})
        const userExists = await userModel.findOne({username})
        if(emailExists){
            return res.status(400).json({success:false, msg:'Email already exists'})
        }
        if(userExists){
            return res.status(400).json({success:false, msg:'username already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({email,username,password:hashedPassword})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_SECRET_KEY, {expiresIn: '2h'});
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_SECRET_KEY, {expiresIn: '2h'});
};
const loginUser = async(req,res)=>{
    try{

   
        const user = await userModel.findOne({username:req.body.username})

        if(!user) {
            return res.status(400).json({success:false,msg:'username does not exists'})
        }
            const match = await bcrypt.compare(req.body.password,user.password)
            if(match){
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
                const expirationTime = new Date();
                expirationTime.setHours(expirationTime.getHours() + 2);

                const Token = await token.create({token:refreshToken, expirationTime: expirationTime})
                console.log('Tokens generated:', { accessToken, refreshToken });
                res.json({
                    success:true,
                    accessToken:accessToken,
                    refreshToken:refreshToken, 
                    email:user.email,
                    username:user.username, 
                })
            }else{
                res.status(400).json({success:false, msg:'Password does not match'})
            }
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({success:false,error:'Internal Server Error'})

    }
}

const forgotPassword = async(req,res)=>{
    const {email} = req.body

    try{
        const emailExists = await userModel.findOne({email})
        if(!emailExists){
            return res.status(400).json({success:false,message:'Email not found'})
        }else{
           return res.status(200).json({success:true,message:'Email verified successfully'})
        }
    }catch(error){
        console.error('Error checking email',error)
        res.status(500).json({success:false,error:'Internal server error'})
    }

}
const resetPassword = async(req,res)=>{
    const {email,newPassword} = req.body

    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:'Email not found'})
        } 

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await userModel.updateOne({email},{password:hashedPassword})

        return res.status(200).json({success:true,message:'Password reset successfully'})
    }catch(error){
        console.error('Error resetting password ',error)
        return res.status(500).json({success:false,error:'Internal server error'})
    }
    
}



module.exports = {signUpUser, loginUser,forgotPassword,resetPassword}