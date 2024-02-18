const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    data:{
        type:Buffer,
        required:true,
    },
    contentType:{
        type:String,
        required:true,
    },
},{timestamps:true}
)


module.exports = mongoose.model('images',imageSchema)