import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import apiRequest from './api/apiRequest';
import { FaUserPen } from "react-icons/fa6";

const Post = () => {
    
    const API_URL = 'https://nextblog-d739.onrender.com/'
    const {id} = useParams()
    const [post,setPost] = useState(null)
    const navigate = useNavigate()
    const {accountDetails} = useContext(DataContext)
    

    useEffect(()=>{
        if(id){
        const fetchPostDetail = async()=>{
            try{
                const response = await fetch(`${API_URL}getpost/${id}`)
                const data = await response.json()
                setPost(data)
            }catch(error){
                console.error('error fetching post detail',error)
            }
        }
        fetchPostDetail()
    }
    },[id])

    const handleDelete = async () => {
      try{
        const imageId = post.picture;
        if (imageId) {
            const deleteImageOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const deleteImageUrl = `${API_URL}deleteimage/${imageId}`;
            const { error: imageError } = await apiRequest(deleteImageUrl, deleteImageOptions);

            if (imageError) {
                console.error('Error deleting image:', imageError);
                window.alert('Error deleting image. Please try again.');
                return;
            }
        }
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },

      } 
      const reqUrl =  `${API_URL}deletepost/${id}`
        const {data,error} = await apiRequest(reqUrl,deleteOptions)
        if (error) {
          console.error('Error deleting post:', error);
          window.alert('Error deleting post. Please try again.');
          return;
        }
       
          console.log(data.message)
          navigate('/');
      }catch(error){
          console.error('Post deletion failed:');
          window.alert('Post deletion failed. Please try again.');
        }
  }

    const formatCreatedAt = (createdAt) => {
        const date = new Date(createdAt);
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };

    if(!post) return <div style={{color:'#EDEDED',fontSize:'30px',textAlign:'center',margin:'50px 0'}}>Loading post . . .</div>

  return (
    <div>
        <div className="singlePostContainer">
            <div className='ImageBox'> 
                 <img src={`${API_URL}getimage/${post.picture}?${Date.now()}`} alt={post.title} />
                 
            </div>
            <div className="details">
                <div className='head'> 
                     <h2>{post.title}</h2>
                     <h5><FaUserPen/> {post.username}</h5>
                </div>
                <div>
                     <p className='story'>{post.story}</p>
                </div>
                  <div className='time'>
                     <p>- {formatCreatedAt(post.createdAt)}</p>
                  </div>
            </div> 
      </div>
      {post.username === accountDetails.username &&(
        <div className='editDelete'>
            <Link to={`/editpost/${id}`}>
                <button className='editBtn'> <CiEdit/> Edit Post</button>
            </Link>
            <button onClick={()=>handleDelete()} className='deleteBtn'> <MdDelete/> Delete Post</button>
        </div>
      )}
      
    </div>
  )
}

export default Post
