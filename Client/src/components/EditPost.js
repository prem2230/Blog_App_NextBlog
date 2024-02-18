import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'
import { LuFileEdit } from "react-icons/lu";
import { RxUpdate } from "react-icons/rx";
import { GiCancel } from "react-icons/gi";


const EditPost = () => {
  const API_URL = 'https://nextblog-d739.onrender.com/'
  const {id}=useParams()
  const [post,setPost] = useState({title:'',story:'',picture:'',username:''})
  const [image,setImage] = useState(null)
  const [previewImg,setPreviewImg] = useState(null)
  const navigate = useNavigate()
  const [ fetchError,setFetchError] = useState(null)
  const {accountDetails} = useContext(DataContext)

  useEffect(() => {
    if (id) {
      const fetchPostDetail = async () => {
        try {
          const response = await fetch(`${API_URL}getpost/${id}`);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching post detail', error);
        }
      };
      fetchPostDetail();
    }
  }, [id]);
  const handleCancel = () => {
    navigate(`/post/${id}`)
  };
  const handleImageChange=(e)=>{
    const selectedFile = e.target.files[0]
    if(selectedFile){
      setImage(selectedFile)
      setPreviewImg(URL.createObjectURL(selectedFile))
    }
  }
  const handleUpdate = async () => {
    
    if(post.title.length > 50){
      setFetchError('Title is too big')
      return
    }
    try{
        const response = await fetch(`${API_URL}updatepost/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(post)
        })
        if(!response.ok){
          setFetchError('Failed to update post, Try Again')
          return
        }
        if(image){
          const formData = new FormData()
          formData.append('file',image)

          const imageResponse = await fetch(`${API_URL}updateimage/${post.picture}`,{
          method:'PATCH',
          body:formData,
        })
        if(!imageResponse.ok){
          setFetchError('Failed to update image, Try Again')
          return
        }
        }
        
        navigate(`/post/${id}`)
      
     
    }catch(error){
      console.error('Error updating post',error)
        setFetchError('Error updating post, Try Again?')

    }

  }
  return (
    <div>
        <div className="editPostContainer">
        <div className="postImg" >
           <img src={previewImg?previewImg:`${API_URL}getimage/${post.picture}?${Date.now()}`} alt={post.title} /> 
        </div>
        <div className="fileInput">
            <label htmlFor="file"><LuFileEdit/><br /><p>Add Image</p></label>
            <input 
            type="file" 
            accept='image/' 
            id='file'
            onChange={(e)=>handleImageChange(e)}
            />
        </div>

        <div className="text">
            <input type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />

          <textarea value={post.story} cols="30" 
          rows="10" onChange={(e) => setPost({ ...post, story: e.target.value })}></textarea>

          
        </div>
      </div>
      <div className='error'>
        {fetchError && <div>{fetchError}</div>}
        </div>
      {post.username === accountDetails.username && (
        <div className="editDel">
          
          <button className='cancel' onClick={()=>handleCancel()}>
            <GiCancel/>Cancel
          </button>
          <button className='update' onClick={()=>handleUpdate()}>
          <RxUpdate/>Update
          </button>
        </div>
      )}
    </div>
  )
}

export default EditPost
