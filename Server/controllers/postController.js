const mongoose = require('mongoose')
const postModel = require('../models/postModel')

const createPost=async(req,res)=>{
    try{
        const {title,story,picture,username} = req.body;
        if(!title){
            return res.status(400).json({error:'Title is required'})
        }
        if(!story){
            return res.status(400).json({error:'Please share some story about this'})
        }
        if(!picture){
            return res.status(400).json({error:'Kindly add an image'})
        }
        const post = await postModel.create({title,story,picture,username})
        res.status(200).json(post)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getPosts = async(req,res)=>{
    try{
        const posts = await postModel.find().sort({createdAt:-1})
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error:'Internal server error'})
    }
}

const getOnePost = async(req,res)=>{
    try{
        const postId  = req.params.postId

        const post = await postModel.findById(postId)

        if(!post){
            return res.status(404).json({error:'Post Not Found'})
        }
        res.status(200).json(post)
    }catch(error){
        console.error('Error fetching post:',error)
        res.status(500).json({error:'Internal server error'})
    }
}

const updatePost =async(req,res)=>{
    try{
        const postId = req.params.postId;
        const {title,story,picture} = req.body

        const updatePost = await postModel.findByIdAndUpdate(postId,{title,story,picture},{new:true})

        if(!updatePost){
            return res.status(404).json({error:'Post not found'})
        }

        res.status(200).json(updatePost);
    }catch(error){
        console.error('Error updating post',error)
        res.status(500).json({error:'Internal Server Error'})

    }
}

const deletePost=async(req,res)=>{
    try{
        const postId = req.params.postId

        const deletedPost = await postModel.findByIdAndDelete(postId)

        if(!deletedPost){
            return res.status(404).json({error:'Post not found'})
        }

        res.status(200).json({message:'Post deleted successfully'})
    }catch(error){
        console.error('error deleting post',error)
        res.status(500).json({error:'Internal server error'})

    }
}


module.exports = {createPost,getPosts,getOnePost,updatePost,deletePost}