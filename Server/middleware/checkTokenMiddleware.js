const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token')
require('dotenv').config()

const checkTokenExpiration = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Authorization header missing' });
        }
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ success: false, message: 'Access token missing' });
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)


        if(decoded.exp < Date.now()/1000){
            return res.status(401).json({success:false, message:'Access token has expired'})
        }

        const refreshToken = await tokenModel.findOne({token: accessToken })
        if(!refreshToken || refreshToken.expirationTime < Date.now()){
            return res.status(401).json({success:false, message:'Refresh token not found or has expired'})
        }
        next()

    }catch(error){ 
        console.error('Error during token verification:', error);
        res.status(401).json({success:false, message:'Invalid token'})

    }
}

module.exports = checkTokenExpiration;