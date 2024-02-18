const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
    storage:storage,
    limits:{
        fileSize:30*1024*1024
    },
    fileFilter:(req,file,cb)=>{

        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb(new Error('Invalid file type. Only images are allowed'))
        }
    }
});

const multerMiddleware = upload.single('file')

module.exports = multerMiddleware