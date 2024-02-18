const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')



app.use((req,res,next)=>{
    console.log('path'+req.path+'method'+req.method)
    next()
})

app.use(express.json())
app.use(cors())

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log(`DB connected successfully and server running on PORT ${process.env.PORT}`)
        })
    }catch(error){
        console.error("error connecting database",error)
    }
}

connectDB()


app.use('/',userRoutes)
