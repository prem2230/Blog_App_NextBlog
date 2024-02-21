const express = require('express')
const router = express.Router()
const {signUpUser,loginUser,forgotPassword, resetPassword} = require('../controllers/userController')
const {createPost,getPosts,getOnePost,updatePost,deletePost} = require('../controllers/postController')
const {uploadImage,getImage,updateImage,deleteImage} = require('../controllers/imageController')
const multerMiddleware = require('../middleware/multerMiddleware')
const checkTokenExpiration= require('../middleware/checkTokenMiddleware')

router.route('/signup').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').patch(resetPassword)

router.get('/protected/resource', checkTokenExpiration, (req, res) => {
    res.json({ message: 'Protected resource accessed successfully' });
  });

router.route('/createpost').post(createPost)
router.route('/upload').post(multerMiddleware, uploadImage)

router.route('/getposts').get(getPosts)
router.route('/getimage/:imageId').get(getImage)
router.route('/getpost/:postId').get(getOnePost)

router.route('/updatepost/:postId').patch(multerMiddleware,updatePost)
router.route('/updateimage/:imageId').patch(multerMiddleware,updateImage)
router.route('/deletepost/:postId').delete(deletePost)
router.route('/deleteimage/:imageId').delete(deleteImage)

router.use('*',(req,res)=>{
    res.status(404).send('404 Page Not Found')
})



module.exports = router