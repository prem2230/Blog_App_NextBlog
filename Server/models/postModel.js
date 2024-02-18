const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    story:{
        type:String,
        required:true,
    },
    picture:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images', 
        required: true,
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    
} ,
{timestamps:true}
)

module.exports = mongoose.model('posts',postSchema)