const mongoose = require('mongoose')
const imageModel = require('../models/imageModel')
const multerMiddleware = require('../middleware/multerMiddleware')

const uploadImage = async(req,res)=>{
    try{
        const file = req.file

        const buffer = file.buffer

        const image = await imageModel.create({data:buffer,contentType:file.mimetype,})
        
        res.status(200).json(image)
    }catch(error){
        res.status(500).json({error:'Internal server error'})
    }
}
const getImage = async (req, res) => {
    try {
      const imageId = req.params.imageId;
  
     
      const image = await imageModel.findById(imageId);
  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.set('Content-Type', image.contentType);
  
      res.send(image.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateImage = async(req,res)=>{
    try {
      const imageId = req.params.imageId;

      const file = req.file;
      
      const buffer = file.buffer
  
      const updatedImage = await imageModel.findByIdAndUpdate(imageId,{ data:buffer, contentType: file.mimetype,  },{ new: true });
      res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Content-Type': updatedImage.contentType
      });
  
      if (!updatedImage) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.status(200).json(updatedImage);
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.imageId;

        const deletedImage = await imageModel.findByIdAndDelete(imageId);

        if (!deletedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {uploadImage,getImage,updateImage,deleteImage}